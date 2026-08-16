// ─────────────────────────────────────────────
//  Tipos compartidos del mapa conceptual +
//  generador de un mapa de ejemplo por materia,
//  armado a partir de los temas de la guía de estudio.
// ─────────────────────────────────────────────
import { getStudyGuide } from "./studyGuides";

export interface MapNode {
  id: string;
  type: "text" | "image";
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  color?: string;
  imageUrl?: string;
}
export interface MapEdge {
  id: string;
  from: string;
  to: string;
}
export interface MapState {
  nodes: MapNode[];
  edges: MapEdge[];
}

const LEAF_COLOR = "#94a3b8";
const TOPIC_PALETTE = ["#a855f7", "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Genera un mapa conceptual de ejemplo: un nodo central con el nombre de la
 * materia, un nodo por cada tema principal de su guía de estudio (conectado
 * al centro), y en los primeros temas una nota adicional con un dato clave,
 * para mostrar cómo se puede profundizar un tema con sub-notas.
 */
export function getDefaultMap(subjectId: string, subjectName: string, subjectColor: string): MapState {
  const guide = getStudyGuide(subjectId);
  const sections = (guide?.sections ?? []).slice(0, 6);

  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];

  const cx = 1000;
  const cy = 1100;
  const centralId = "central";
  nodes.push({
    id: centralId,
    type: "text",
    x: cx - 100,
    y: cy - 50,
    w: 200,
    h: 100,
    text: subjectName,
    color: subjectColor,
  });

  if (sections.length === 0) {
    return { nodes, edges };
  }

  const radius = 480;
  sections.forEach((section, i) => {
    const angle = -Math.PI / 2 + i * ((2 * Math.PI) / sections.length);
    const topicId = uid("topic");
    const tx = cx + radius * Math.cos(angle) - 105;
    const ty = cy + radius * Math.sin(angle) - 55;
    nodes.push({
      id: topicId,
      type: "text",
      x: Math.round(tx),
      y: Math.round(ty),
      w: 210,
      h: 110,
      text: section.title,
      color: TOPIC_PALETTE[i % TOPIC_PALETTE.length],
    });
    edges.push({ id: uid("edge"), from: centralId, to: topicId });

    // En los primeros 3 temas, agrega una sub-nota de ejemplo con un dato clave
    if (i < 3 && section.content[0]) {
      const leafRadius = radius + 300;
      const lx = cx + leafRadius * Math.cos(angle) - 110;
      const ly = cy + leafRadius * Math.sin(angle) - 65;
      const raw = section.content[0];
      const shortText = raw.length > 120 ? raw.slice(0, 117) + "…" : raw;
      const leafId = uid("leaf");
      nodes.push({
        id: leafId,
        type: "text",
        x: Math.round(lx),
        y: Math.round(ly),
        w: 230,
        h: 130,
        text: shortText,
        color: LEAF_COLOR,
      });
      edges.push({ id: uid("edge"), from: topicId, to: leafId });
    }
  });

  return { nodes, edges };
}
