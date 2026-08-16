import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { subjects } from "../data/questions";
import { getStudyGuide } from "../data/studyGuides";
import { getDefaultMap, type MapNode, type MapState } from "../data/defaultConceptMaps";
import { loadConceptMapFromDb, saveConceptMapToDb } from "../lib/db";
import { getNextVincentGreeting } from "../data/vincentGreetings";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { SubjectIcon } from "../components/SubjectIcon";
import { VincentWelcome } from "../components/VincentWelcome";
import {
  ArrowLeft,
  Type,
  ImagePlus,
  Link2,
  Trash2,
  BookOpen,
  Pencil,
  X,
  ZoomIn,
  ZoomOut,
  Check,
  Sparkles,
  Map,
} from "lucide-react";

const COLORS = [
  { bg: "rgba(168,85,247,0.22)", border: "#a855f7" },
  { bg: "rgba(99,102,241,0.22)", border: "#6366f1" },
  { bg: "rgba(236,72,153,0.22)", border: "#ec4899" },
  { bg: "rgba(245,158,11,0.22)", border: "#f59e0b" },
  { bg: "rgba(16,185,129,0.22)", border: "#10b981" },
  { bg: "rgba(59,130,246,0.22)", border: "#3b82f6" },
];

const BOARD_W = 2200;
const BOARD_H = 2600;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function storageKey(subjectId: string) {
  return `angela-conceptmap-${subjectId}`;
}

export default function ConceptMap() {
  const { subject: subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.id === subjectId);
  const guide = getStudyGuide(subjectId ?? "");

  const [state, setState] = useState<MapState>({ nodes: [], edges: [] });
  const [hydrated, setHydrated] = useState(false);
  const [showChooser, setShowChooser] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<{
    message: string;
    danger?: boolean;
    action: () => void;
  } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<MapNode | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [showGuidePicker, setShowGuidePicker] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [savedFlash, setSavedFlash] = useState(false);
  const [vincentGreeting, setVincentGreeting] = useState<string | null>(null);

  const boardScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const spawnCount = useRef(0);
  const dragInfo = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);

  // Bienvenida de Vincent: se dispara cada vez que se entra a la sección
  // (no solo la primera vez). Rota entre 3 frases por materia, guardando
  // el conteo de visitas en localStorage, y se oculta sola después de
  // unos segundos (o si Angela la toca).
  useEffect(() => {
    if (!subjectId) return;
    const greeting = getNextVincentGreeting(subjectId);
    setVincentGreeting(greeting);
    const hideTimeout = setTimeout(() => setVincentGreeting(null), 7000);
    return () => clearTimeout(hideTimeout);
  }, [subjectId]);

  // Cargar el mapa. localStorage es la fuente principal (instantánea, no
  // depende de que cargue el WASM de SQLite); si no hay nada ahí, se intenta
  // recuperar desde el respaldo de la base de datos antes de mostrar el
  // diálogo de "mapa de ejemplo o desde cero".
  useEffect(() => {
    if (!subjectId) return;
    let cancelled = false;
    setHydrated(false);
    setShowChooser(false);

    try {
      const raw = localStorage.getItem(storageKey(subjectId));
      if (raw) {
        setState(JSON.parse(raw));
        setHydrated(true);
        return;
      }
    } catch {
      /* localStorage no disponible: seguimos al respaldo de la base de datos */
    }

    setState({ nodes: [], edges: [] });
    setShowChooser(true);

    // En paralelo, revisa si hay un respaldo en SQLite (por ejemplo, si se
    // limpió el localStorage del navegador). Si el usuario ya eligió algo
    // mientras tanto, este resultado se ignora.
    (async () => {
      try {
        const dbData = await loadConceptMapFromDb(subjectId);
        if (dbData && !cancelled) {
          setState(JSON.parse(dbData));
          setHydrated(true);
          setShowChooser(false);
        }
      } catch {
        /* sin respaldo disponible: se queda el diálogo de inicio */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  // Guardar el mapa. Primero, de forma inmediata y síncrona en localStorage
  // (nunca depende de que cargue WASM, así que nunca falla en silencio); y
  // además, en segundo plano, un respaldo adicional en la base de datos SQLite.
  useEffect(() => {
    if (!subjectId || !hydrated) return;
    const json = JSON.stringify(state);
    let flashTimeout: ReturnType<typeof setTimeout> | undefined;

    try {
      localStorage.setItem(storageKey(subjectId), json);
      setSavedFlash(true);
      flashTimeout = setTimeout(() => setSavedFlash(false), 900);
    } catch {
      /* localStorage lleno o no disponible: seguimos intentando con la base de datos */
    }

    saveConceptMapToDb(subjectId, json).catch(() => {
      /* si la base de datos local falla, el mapa ya quedó a salvo en localStorage */
    });

    return () => {
      if (flashTimeout) clearTimeout(flashTimeout);
    };
  }, [state, subjectId, hydrated]);

  const startWithExample = () => {
    if (subject) setState(getDefaultMap(subject.id, subject.name, subject.color));
    setHydrated(true);
    setShowChooser(false);
  };
  const startBlank = () => {
    setState({ nodes: [], edges: [] });
    setHydrated(true);
    setShowChooser(false);
  };
  const loadExampleOver = () => {
    if (!subject) return;
    if (state.nodes.length === 0) {
      setState(getDefaultMap(subject.id, subject.name, subject.color));
      return;
    }
    setPendingConfirm({
      message: "Esto reemplaza tu mapa actual por el de ejemplo. ¿Continuar?",
      danger: false,
      action: () => setState(getDefaultMap(subject.id, subject.name, subject.color)),
    });
  };

  const nextSpawnPos = useCallback(() => {
    const cols = 4;
    const idx = spawnCount.current % 20;
    spawnCount.current += 1;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const scroller = boardScrollRef.current;
    const baseX = (scroller?.scrollLeft ?? 0) + 40 + col * 220;
    const baseY = (scroller?.scrollTop ?? 0) + 40 + row * 160;
    return { x: baseX, y: baseY };
  }, []);

  const addTextNode = (text = "Nueva nota", w = 180, h = 90) => {
    const pos = nextSpawnPos();
    const color = COLORS[state.nodes.length % COLORS.length];
    const node: MapNode = {
      id: uid(),
      type: "text",
      x: pos.x,
      y: pos.y,
      w,
      h,
      text,
      color: color.border,
    };
    setState((s) => ({ ...s, nodes: [...s.nodes, node] }));
    setEditingNode(node);
  };

  const addImageNode = (dataUrl: string) => {
    const pos = nextSpawnPos();
    const node: MapNode = {
      id: uid(),
      type: "image",
      x: pos.x,
      y: pos.y,
      w: 150,
      h: 150,
      imageUrl: dataUrl,
    };
    setState((s) => ({ ...s, nodes: [...s.nodes, node] }));
  };

  const handleFilePicked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") addImageNode(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const updateNode = (id: string, patch: Partial<MapNode>) => {
    setState((s) => ({
      ...s,
      nodes: s.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    }));
  };

  const deleteNode = (id: string) => {
    setState((s) => ({
      nodes: s.nodes.filter((n) => n.id !== id),
      edges: s.edges.filter((e) => e.from !== id && e.to !== id),
    }));
    setSelectedId(null);
  };

  const deleteEdge = (id: string) => {
    setState((s) => ({ ...s, edges: s.edges.filter((e) => e.id !== id) }));
  };

  const clearAll = () => {
    if (state.nodes.length === 0 && state.edges.length === 0) return;
    setPendingConfirm({
      message: "¿Borrar todo el mapa conceptual de esta materia? No se puede deshacer.",
      danger: true,
      action: () => setState({ nodes: [], edges: [] }),
    });
  };

  const handleNodeClick = (node: MapNode) => {
    if (connectMode) {
      if (!connectFrom) {
        setConnectFrom(node.id);
      } else if (connectFrom !== node.id) {
        const exists = state.edges.some(
          (e) =>
            (e.from === connectFrom && e.to === node.id) ||
            (e.from === node.id && e.to === connectFrom)
        );
        if (!exists) {
          setState((s) => ({
            ...s,
            edges: [...s.edges, { id: uid(), from: connectFrom, to: node.id }],
          }));
        }
        setConnectFrom(null);
      } else {
        setConnectFrom(null);
      }
      return;
    }
    setSelectedId((cur) => (cur === node.id ? null : node.id));
  };

  // ── Drag de nodos (pointer events, compatible touch/mouse) ──
  const onNodePointerDown = (e: React.PointerEvent, node: MapNode) => {
    if (connectMode) {
      // En modo "Unir" no hay arrastre: el tap conecta directamente.
      handleNodeClick(node);
      return;
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragInfo.current = {
      id: node.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: node.x,
      origY: node.y,
      moved: false,
    };
  };
  const onNodePointerMove = (e: React.PointerEvent, node: MapNode) => {
    const info = dragInfo.current;
    if (!info || info.id !== node.id) return;
    const dx = (e.clientX - info.startX) / zoom;
    const dy = (e.clientY - info.startY) / zoom;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) info.moved = true;
    if (info.moved) {
      updateNode(node.id, {
        x: Math.max(0, info.origX + dx),
        y: Math.max(0, info.origY + dy),
      });
    }
  };
  const onNodePointerUp = (e: React.PointerEvent, node: MapNode) => {
    const info = dragInfo.current;
    dragInfo.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    if (info && !info.moved) {
      handleNodeClick(node);
    }
  };

  const insertFromGuide = (title: string) => {
    addTextNode(title, 190, 90);
    setShowGuidePicker(false);
  };

  if (!subject) {
    navigate("/menu");
    return null;
  }

  const selectedNode = state.nodes.find((n) => n.id === selectedId) || null;

  return (
    <div className="h-dvh w-full bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 relative z-20 flex-shrink-0">
        <button
          onClick={() => navigate(`/guide/${subject.id}`)}
          className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-purple-300 transition-all flex-shrink-0"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg text-white font-bold flex items-center gap-2 truncate">
            <SubjectIcon icon={subject.icon} size={16} /> Mapa Conceptual
          </h1>
          <p className="text-purple-300/70 text-xs truncate">{subject.name}</p>
        </div>
        <AnimatePresence>
          {savedFlash && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-green-300/80 flex items-center gap-1 flex-shrink-0"
            >
              <Check size={13} /> Guardado
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Bienvenida flotante de Vincent (visitas siguientes, cuando ya
          existe un mapa guardado y el diálogo inicial no aparece) */}
      <AnimatePresence>
        {vincentGreeting && !showChooser && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setVincentGreeting(null)}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm px-1 cursor-pointer"
          >
            <VincentWelcome message={vincentGreeting} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aviso modo conexión */}
      {connectMode && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-2 relative z-20 flex items-center justify-center gap-2 text-center text-xs bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-400/40 text-indigo-100 rounded-2xl py-2.5 px-3 flex-shrink-0 shadow-lg shadow-indigo-950/40"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300" />
          </span>
          {connectFrom
            ? "Toca otra nota para conectarla"
            : "Toca dos notas para unirlas con una línea"}
        </motion.div>
      )}

      {/* Lienzo */}
      <div
        ref={boardScrollRef}
        className="flex-1 min-h-0 overflow-auto relative"
        style={{ touchAction: "pan-x pan-y" }}
        onPointerDown={() => {
          if (!connectMode) setSelectedId(null);
        }}
      >
        <div
          style={{
            width: BOARD_W,
            height: BOARD_H,
            position: "relative",
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            backgroundImage:
              "radial-gradient(circle, rgba(168,85,247,0.28) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            backgroundColor: "rgba(10,7,22,0.35)",
          }}
        >
          {/* Líneas de conexión */}
          <svg
            width={BOARD_W}
            height={BOARD_H}
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="rgba(216,180,254,0.85)" />
              </marker>
            </defs>
            {state.edges.map((edge) => {
              const a = state.nodes.find((n) => n.id === edge.from);
              const b = state.nodes.find((n) => n.id === edge.to);
              if (!a || !b) return null;
              const ax = a.x + a.w / 2;
              const ay = a.y + a.h / 2;
              const bx = b.x + b.w / 2;
              const by = b.y + b.h / 2;
              // Curva suave hacia el punto medio, perpendicular a la línea recta
              const mx = (ax + bx) / 2;
              const my = (ay + by) / 2;
              const dx = bx - ax;
              const dy = by - ay;
              const dist = Math.max(1, Math.hypot(dx, dy));
              const curveStrength = Math.min(60, dist * 0.18);
              const cx = mx - (dy / dist) * curveStrength;
              const cy = my + (dx / dist) * curveStrength;
              return (
                <g key={edge.id}>
                  {/* Trazo invisible más grueso: hace el borrado fácil de tocar */}
                  <path
                    d={`M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`}
                    stroke="transparent"
                    strokeWidth={22}
                    fill="none"
                    style={{ pointerEvents: "stroke", cursor: "pointer" }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      deleteEdge(edge.id);
                    }}
                  />
                  <path
                    d={`M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`}
                    stroke="rgba(216,180,254,0.75)"
                    strokeWidth={2.5}
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    style={{ pointerEvents: "none" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodos */}
          {state.nodes.map((node) => {
            const isSelected = selectedId === node.id;
            const isConnectFrom = connectFrom === node.id;
            if (node.type === "image") {
              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => onNodePointerDown(e, node)}
                  onPointerMove={(e) => onNodePointerMove(e, node)}
                  onPointerUp={(e) => onNodePointerUp(e, node)}
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    width: node.w,
                    height: node.h,
                    touchAction: "none",
                    cursor: "grab",
                    filter: isSelected
                      ? "drop-shadow(0 8px 18px rgba(168,85,247,0.5))"
                      : "drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
                  }}
                  className="rounded-2xl overflow-hidden transition-shadow"
                >
                  <div
                    style={{
                      borderColor: isConnectFrom
                        ? "#facc15"
                        : isSelected
                        ? "#ffffff"
                        : "rgba(168,85,247,0.45)",
                      borderWidth: isSelected || isConnectFrom ? 3 : 2,
                    }}
                    className="w-full h-full border rounded-2xl overflow-hidden bg-black/30"
                  >
                    <img
                      src={node.imageUrl}
                      alt=""
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            }
            return (
              <div
                key={node.id}
                onPointerDown={(e) => onNodePointerDown(e, node)}
                onPointerMove={(e) => onNodePointerMove(e, node)}
                onPointerUp={(e) => onNodePointerUp(e, node)}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  width: node.w,
                  minHeight: node.h,
                  background: `linear-gradient(155deg, ${(node.color ?? "#a855f7")}33, ${(node.color ?? "#a855f7")}14)`,
                  borderColor: isConnectFrom ? "#facc15" : isSelected ? "#ffffff" : (node.color ?? "#a855f7") + "80",
                  borderWidth: isSelected || isConnectFrom ? 2.5 : 1.5,
                  touchAction: "none",
                  cursor: "grab",
                  boxShadow: isSelected
                    ? `0 10px 24px -6px ${node.color ?? "#a855f7"}70, 0 0 0 1px rgba(255,255,255,0.06) inset`
                    : `0 4px 14px -4px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset`,
                }}
                className="rounded-2xl border p-3.5 flex items-center justify-center text-center backdrop-blur-sm transition-shadow"
              >
                <span
                  className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border-2 border-[#1a1330]"
                  style={{ backgroundColor: node.color ?? "#a855f7" }}
                />
                <p className="text-white text-sm font-medium leading-snug whitespace-pre-wrap break-words select-none">
                  {node.text}
                </p>
              </div>
            );
          })}

          {state.nodes.length === 0 && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-center w-72">
              <div className="w-16 h-16 rounded-full bg-purple-500/15 border border-purple-400/30 flex items-center justify-center">
                <Map size={28} className="text-purple-300" />
              </div>
              <p className="text-purple-300/60 text-sm leading-relaxed flex items-center gap-1.5">
                Tu pizarra está vacía. Usa los botones de abajo para agregar notas o imágenes
                <Pencil size={13} className="flex-shrink-0" />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Panel flotante del nodo seleccionado */}
      <AnimatePresence>
        {selectedNode && !connectMode && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-[#1a1330]/95 backdrop-blur border border-purple-500/30 rounded-2xl p-2 shadow-xl shadow-black/40"
          >
            {selectedNode.type === "text" && (
              <button
                onClick={() => setEditingNode(selectedNode)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600/50 hover:bg-indigo-500/60 text-indigo-100 text-xs font-semibold transition-all active:scale-95"
              >
                <Pencil size={14} /> Editar
              </button>
            )}
            <button
              onClick={() => deleteNode(selectedNode.id)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-600/50 hover:bg-red-500/60 text-red-100 text-xs font-semibold transition-all active:scale-95"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de herramientas inferior */}
      <div
        className="relative z-20 flex-shrink-0 px-3 pt-2"
        style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
      >
        <div className="bg-[#160f28]/95 backdrop-blur-md border border-purple-500/25 rounded-3xl px-1.5 py-2 flex items-center gap-0.5 shadow-2xl shadow-black/50 overflow-x-auto">
          <ToolButton icon={<Type size={19} />} label="Nota" onClick={() => addTextNode()} />
          <ToolButton
            icon={<ImagePlus size={19} />}
            label="Imagen"
            onClick={() => fileInputRef.current?.click()}
          />
          <div className="w-px h-8 bg-purple-500/20 flex-shrink-0 mx-0.5" />
          <ToolButton
            icon={<Link2 size={19} />}
            label="Unir"
            active={connectMode}
            onClick={() => {
              setConnectMode((v) => !v);
              setConnectFrom(null);
              setSelectedId(null);
            }}
          />
          {guide && (
            <ToolButton
              icon={<BookOpen size={19} />}
              label="Guía"
              onClick={() => setShowGuidePicker(true)}
            />
          )}
          {guide && (
            <ToolButton icon={<Sparkles size={19} />} label="Ejemplo" onClick={loadExampleOver} />
          )}
          <div className="w-px h-8 bg-purple-500/20 flex-shrink-0 mx-0.5" />
          <ToolButton
            icon={<ZoomOut size={19} />}
            label="Alejar"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
          />
          <ToolButton
            icon={<ZoomIn size={19} />}
            label="Acercar"
            onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
          />
          <ToolButton icon={<Trash2 size={19} />} label="Borrar" danger onClick={clearAll} />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFilePicked}
      />

      {/* Modal editar texto */}
      <AnimatePresence>
        {editingNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 flex items-end sm:items-center justify-center p-4"
            onClick={() => setEditingNode(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#241b3d] border border-purple-500/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm">Editar nota</h3>
                <button onClick={() => setEditingNode(null)} className="text-purple-300">
                  <X size={20} />
                </button>
              </div>
              <textarea
                autoFocus
                defaultValue={editingNode.text}
                rows={4}
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-xl p-3 text-white text-sm resize-none outline-none focus:border-purple-400"
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingNode((n) => (n ? { ...n, text: val } : n));
                }}
              />
              <div className="flex gap-2 mt-3">
                {COLORS.map((c) => (
                  <button
                    key={c.border}
                    onClick={() =>
                      setEditingNode((n) => (n ? { ...n, color: c.border } : n))
                    }
                    style={{
                      backgroundColor: c.border,
                      outline:
                        editingNode.color === c.border ? "2px solid white" : "none",
                      outlineOffset: 2,
                    }}
                    className="w-7 h-7 rounded-full flex-shrink-0"
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  if (editingNode) updateNode(editingNode.id, { text: editingNode.text, color: editingNode.color });
                  setEditingNode(null);
                }}
                className="w-full mt-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
              >
                Guardar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selector: insertar desde guía */}
      <AnimatePresence>
        {showGuidePicker && guide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 flex items-end justify-center"
            onClick={() => setShowGuidePicker(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#241b3d] border-t border-purple-500/30 rounded-t-3xl p-4 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm">Insertar tema de la guía</h3>
                <button onClick={() => setShowGuidePicker(false)} className="text-purple-300">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2 pb-4">
                {guide.sections.map((section) => (
                  <button
                    key={section.title}
                    onClick={() => insertFromGuide(section.title)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-100 text-sm hover:bg-purple-500/20 transition-all"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diálogo inicial: mapa de ejemplo o empezar desde cero */}
      <AnimatePresence>
        {showChooser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-[#241b3d] border border-purple-500/30 rounded-3xl p-5 text-center"
            >
              <VincentWelcome message={vincentGreeting ?? undefined} />
              <h3 className="text-white font-bold text-base mb-1.5">
                Tu primer mapa de {subject.name}
              </h3>
              <p className="text-purple-300/70 text-sm mb-5 leading-relaxed">
                {guide
                  ? "Podemos armarte un mapa de ejemplo con los temas principales, para que veas cómo se conecta todo. Puedes seguirlo, editarlo o empezar en blanco."
                  : "Esta materia aún no tiene guía de estudio, así que puedes empezar tu mapa desde cero."}
              </p>
              <div className="space-y-2.5">
                {guide && (
                  <button
                    onClick={startWithExample}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm transition-all"
                    style={{
                      backgroundColor: subject.color + "cc",
                      border: `2px solid ${subject.color}`,
                      boxShadow: `0 4px 0 ${subject.color}60`,
                    }}
                  >
                    <Sparkles size={16} />
                    Usar mapa de ejemplo
                  </button>
                )}
                <button
                  onClick={startBlank}
                  className="w-full py-3.5 rounded-2xl font-bold text-purple-200 text-sm bg-gray-800/60 border border-purple-500/25 hover:bg-gray-700/60 transition-all"
                >
                  Empezar desde cero
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={!!pendingConfirm}
        message={pendingConfirm?.message ?? ""}
        danger={pendingConfirm?.danger}
        confirmLabel={pendingConfirm?.danger ? "Sí, borrar" : "Sí, continuar"}
        onConfirm={() => {
          pendingConfirm?.action();
          setPendingConfirm(null);
        }}
        onCancel={() => setPendingConfirm(null)}
      />
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
  active,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-2.5 py-2 rounded-2xl flex-shrink-0 min-w-[52px] transition-all active:scale-95"
      style={{
        color: active ? "#facc15" : danger ? "#fca5a5" : "#c4b5fd",
        backgroundColor: active
          ? "rgba(250,204,21,0.14)"
          : danger
          ? "transparent"
          : "transparent",
        boxShadow: active ? "0 0 0 1px rgba(250,204,21,0.35) inset" : "none",
      }}
    >
      {icon}
      <span className="text-[9.5px] font-semibold tracking-wide truncate w-full text-center">
        {label}
      </span>
    </button>
  );
}
