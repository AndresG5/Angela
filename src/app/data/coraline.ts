// ─────────────────────────────────────────────
//  Escenas de Coraline para la Puerta Secreta.
//  Cada intento fallido de contraseña avanza a la siguiente escena.
// ─────────────────────────────────────────────

export interface CoralineStep {
  image: string;
  text: string;
  /** 0 = extremo derecho (recién llega) · 1 = centro-izquierda, junto a la puerta */
  align: number;
  /** Intensidad del ambiente (glow, partículas) que despierta este paso */
  intensity: number;
}

const BASE = "/images/coraline";

export const CORALINE_STEPS: CoralineStep[] = [
  { image: `${BASE}/coraline_1.png`, text: "¿Vas a intentar abrirla?", align: 0, intensity: 0 },
  { image: `${BASE}/coraline_2.png`, text: "Hmm... esa no parece ser la contraseña.", align: 0.28, intensity: 0.15 },
  { image: `${BASE}/coraline_3.png`, text: "¿En serio? Creo que tendrás que pensar un poquito más.", align: 0.55, intensity: 0.35 },
  { image: `${BASE}/coraline_4.png`, text: "Oye... deja de probar contraseñas al azar.", align: 0.78, intensity: 0.6 },
  { image: `${BASE}/coraline_5.png`, text: "Tal vez deberías preguntarte qué hay realmente detrás de esa puerta...", align: 1, intensity: 1 },
];

export const CORALINE_POST_FIVE_LINES = [
  "¿Todavía sigues intentando?",
  "Ya te lo advertí...",
  "Creo que esa puerta no quiere abrirse para ti.",
  "¿Estás seguro de que quieres cruzar?",
  "Quizá sea mejor dejarla cerrada...",
  "Hay cosas que es mejor no descubrir.",
];

/** Devuelve la escena de Coraline correspondiente al número de intento fallido (1, 2, 3...). */
export function getCoralineStep(attempt: number): CoralineStep {
  if (attempt <= 0) return CORALINE_STEPS[0];
  if (attempt <= 5) return CORALINE_STEPS[attempt - 1];
  const extraIndex = (attempt - 6) % CORALINE_POST_FIVE_LINES.length;
  return { ...CORALINE_STEPS[4], text: CORALINE_POST_FIVE_LINES[extraIndex] };
}
