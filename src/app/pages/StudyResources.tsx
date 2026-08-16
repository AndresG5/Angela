import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { subjects } from "../data/questions";
import { FloatingStars, Moon, CurvedSpiral } from "../components/BurtonDecorations";
import { SubjectIcon } from "../components/SubjectIcon";
import { ArrowLeft, ExternalLink, PlayCircle, Globe, BookOpen, X, Workflow, DoorClosed, Rocket } from "lucide-react";
import { TIGGER_PROMPTS, type TiggerPrompt } from "../components/TiggerMotivation";

// ── Helpers ────────────────────────────────────────────────────
const iconForType = (type: string) => {
  if (type === "playlist" || type === "video")
    return <PlayCircle size={18} className="text-red-400 flex-shrink-0" />;
  if (type === "web") return <Globe size={18} className="text-indigo-400 flex-shrink-0" />;
  return <BookOpen size={18} className="text-purple-400 flex-shrink-0" />;
};
const labelForType = (type: string) => {
  if (type === "playlist") return "Playlist YouTube";
  if (type === "video") return "Buscar en YouTube";
  if (type === "web") return "Recurso web";
  return "Documento";
};
const colorForType = (type: string) => {
  if (type === "playlist" || type === "video") return "rgba(239,68,68,0.15)";
  if (type === "web") return "rgba(99,102,241,0.15)";
  return "rgba(168,85,247,0.15)";
};

// ── Tigger key en localStorage para rotar mensajes entre secciones ──
const TIGGER_KEY = "angela-tigger-index";
function getNextTiggerIndex(): number {
  try {
    const stored = localStorage.getItem(TIGGER_KEY);
    const current = stored !== null ? parseInt(stored) : -1;
    const next = (current + 1) % TIGGER_PROMPTS.length;
    localStorage.setItem(TIGGER_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

// ── Componente Tigger en esquina ────────────────────────────────
function TiggerCorner({
  prompt,
  onClose,
}: {
  prompt: TiggerPrompt;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.4 }}
          className="fixed bottom-16 right-0 z-40 flex items-end"
          style={{ maxWidth: 270 }}
        >
          {/* Globo de diálogo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 220, damping: 18 }}
            className="relative mr-1 mb-8"
            style={{ maxWidth: 185 }}
          >
            {/* Cola del globo apunta a la derecha → hacia Tigger */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0"
              style={{
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "10px solid rgba(251,146,60,0.55)",
              }}
            />

            <div
              className="px-3 py-3 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,8,38,0.97) 0%, rgba(55,23,97,0.97) 100%)",
                border: "2px solid rgba(251,146,60,0.5)",
                boxShadow:
                  "0 0 20px rgba(251,146,60,0.25), 0 6px 16px rgba(0,0,0,0.5)",
              }}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => { setExpanded(false); onClose(); }}
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gray-800 border border-orange-400/40 flex items-center justify-center"
              >
                <X size={10} className="text-orange-300" />
              </button>

              <div className="space-y-1.5">
                {prompt.lines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="text-white/90 text-xs leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Imagen de Tigger */}
          <motion.div
            animate={{ y: [0, -8, 0, -5, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
            className="flex-shrink-0"
            style={{ width: 88 }}
          >
            <img
              src={prompt.image}
              alt="Tigger motivándote"
              className="w-full"
              style={{
                filter: "drop-shadow(0 4px 10px rgba(251,146,60,0.45))",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Página principal ────────────────────────────────────────────
export default function StudyResources() {
  const { subject: subjectId } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.id === subjectId);
  const [tiggerPrompt, setTiggerPrompt] = useState<TiggerPrompt | null>(null);
  const [tiggerVisible, setTiggerVisible] = useState(true);

  // Al montar la sección, elegir el siguiente Tigger en rotación
  useEffect(() => {
    const idx = getNextTiggerIndex();
    setTiggerPrompt(TIGGER_PROMPTS[idx]);
    setTiggerVisible(true);
  }, [subjectId]); // se re-ejecuta si cambia la sección

  if (!subject) {
    navigate("/menu");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-4 overflow-hidden relative">
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-20" />
      <Moon className="absolute top-8 right-8 w-16 h-16 opacity-50" />
      <CurvedSpiral className="absolute bottom-12 left-8 w-20 h-20 opacity-30" />

      <div className="max-w-2xl mx-auto relative z-10 pb-32">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/menu")}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-purple-300 transition-all flex-shrink-0"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-xl text-white font-bold flex items-center gap-2">
              <SubjectIcon icon={subject.icon} size={20} /> Recursos de Estudio
            </h1>
            <p className="text-purple-300/70 text-sm">{subject.name}</p>
          </div>
        </div>

        {/* Intro */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-900/40 rounded-2xl p-4 mb-6 border border-purple-500/20 text-sm text-purple-200/80 flex items-start gap-2"
        >
          <BookOpen size={16} className="text-purple-300 flex-shrink-0 mt-0.5" />
          <span>
            Estos recursos te ayudarán a repasar los temas de{" "}
            <strong>{subject.name}</strong> antes de presentar el examen.
          </span>
        </motion.div>

        {/* Accesos rápidos: guía, mapa conceptual, puerta secreta */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => navigate(`/guide/${subject.id}`)}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-purple-200 hover:bg-purple-500/20 transition-all"
          >
            <BookOpen size={18} />
            <span className="text-xs font-semibold">Guía</span>
          </button>
          <button
            onClick={() => navigate(`/concept-map/${subject.id}`)}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-200 hover:bg-indigo-500/20 transition-all"
          >
            <Workflow size={18} />
            <span className="text-xs font-semibold">Mapa mental</span>
          </button>
          <button
            onClick={() => navigate("/carta")}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-pink-500/10 border border-pink-500/25 text-pink-200 hover:bg-pink-500/20 transition-all"
          >
            <DoorClosed size={18} />
            <span className="text-xs font-semibold">Puerta Secreta</span>
          </button>
        </div>

        {/* Recursos */}
        <div className="space-y-3">
          {(subject.studyResources ?? []).map((r, i) => (
            <motion.a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 block"
              style={{
                backgroundColor: colorForType(r.type),
                borderColor:
                  r.type === "playlist" || r.type === "video"
                    ? "rgba(239,68,68,0.3)"
                    : r.type === "web"
                    ? "rgba(99,102,241,0.3)"
                    : "rgba(168,85,247,0.3)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colorForType(r.type) }}
              >
                {iconForType(r.type)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">{r.title}</p>
                <p className="text-purple-300/70 text-xs mt-0.5 leading-snug">
                  {r.description}
                </p>
                <span
                  className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: colorForType(r.type),
                    color:
                      r.type === "playlist" || r.type === "video"
                        ? "#fca5a5"
                        : r.type === "web"
                        ? "#a5b4fc"
                        : "#d8b4fe",
                  }}
                >
                  {labelForType(r.type)}
                </span>
              </div>

              <ExternalLink size={16} className="text-purple-300/50 flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* Playlist principal */}
        {subject.playlistUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <p className="text-purple-300/60 text-xs mb-3 text-center flex items-center justify-center gap-1.5">
              <PlayCircle size={14} /> Estudia con esta playlist de fondo
            </p>
            <a
              href={subject.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-300 text-sm"
              style={{ boxShadow: "0 4px 0 #991b1b" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {subject.playlistTitle ?? "Ver playlist en YouTube"}
              <ExternalLink size={14} />
            </a>
          </motion.div>
        )}

        {/* Botón ir al examen */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate(`/quiz/${subject.id}`)}
          className="w-full mt-5 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300"
          style={{
            backgroundColor: subject.color + "cc",
            border: `2px solid ${subject.color}`,
            boxShadow: `0 5px 0 ${subject.color}60`,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Rocket size={18} /> Ir al examen de {subject.name}
          </span>
        </motion.button>
      </div>

      {/* Tigger en la esquina inferior derecha */}
      {tiggerPrompt && tiggerVisible && (
        <TiggerCorner
          prompt={tiggerPrompt}
          onClose={() => setTiggerVisible(false)}
        />
      )}
    </div>
  );
}
