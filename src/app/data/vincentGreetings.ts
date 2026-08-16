/**
 * Frases de bienvenida de Vincent para el Mapa Conceptual. Cada materia
 * tiene 3 frases distintas, a su estilo (narrador tenebroso y elegante,
 * inspirado en el corto "Vincent" de Tim Burton). Van rotando en orden
 * cada vez que Angela entra a esa materia: 1ª visita → frase 1, 2ª visita
 * → frase 2, 3ª visita → frase 3, 4ª visita → frase 1 otra vez, y así.
 */

const GREETINGS_BY_SUBJECT: Record<string, string[]> = {
  aritmetica: [
    "Angela... los números también tienen sombra. Ven, descifremos juntos sus secretos.",
    "De vuelta, mi pequeña calculista tenebrosa. Las cifras esperan pacientes en la penumbra.",
    "Otra vez aquí... excelente. La aritmética, como toda buena historia de terror, se resuelve paso a paso.",
  ],
  historia: [
    "Angela... bienvenida al cementerio del tiempo. Cada fecha es una lápida que aún tiene algo que contarte.",
    "Regresaste. Los fantasmas del pasado están inquietos hoy... y ansiosos de que los recuerdes.",
    "Ah, una vez más entre ruinas y siglos olvidados. La historia, querida Angela, nunca deja de perseguirnos.",
  ],
  ingles: [
    "Angela... las palabras extranjeras susurran entre la niebla. Aprendamos a domesticarlas juntos.",
    "De vuelta al idioma de las sombras inglesas. Cada palabra nueva es un pequeño hechizo.",
    "Otra visita... maravilloso. El inglés, como toda criatura extraña, se vuelve familiar con paciencia.",
  ],
  "comprension-lectora": [
    "Angela... entre estas líneas se esconden pistas, como en toda buena historia de misterio.",
    "Volviste a las páginas. Cada párrafo guarda un secreto esperando ser descifrado.",
    "Una vez más aquí, detective de palabras. Leamos entre sombras lo que el texto no dice.",
  ],
  "pensamiento-matematico": [
    "Angela... la lógica también puede ser hermosa y un poco inquietante. Bienvenida.",
    "De vuelta al laberinto de los números y los patrones. No temas, yo te guío.",
    "Otra vez por aquí... el pensamiento matemático es un rompecabezas exquisito. Resolvámoslo.",
  ],
};

const FALLBACK_GREETINGS = [
  "Angela... bienvenida de nuevo a mis dominios de estudio.",
  "Volviste. Qué grata sorpresa entre tanta oscuridad.",
  "Una vez más aquí... sigamos construyendo tu mapa mental.",
];

function visitKey(subjectId: string) {
  return `angela-vincent-visits-${subjectId}`;
}

/**
 * Cuenta esta visita a la sección de Mapa Conceptual de `subjectId` y
 * devuelve la frase de bienvenida de Vincent que le toca (rotando entre
 * las 3 disponibles para esa materia). Debe llamarse una sola vez por
 * "entrada" a la página (por ejemplo, en un useEffect al montar).
 */
export function getNextVincentGreeting(subjectId: string): string {
  const pool = GREETINGS_BY_SUBJECT[subjectId] ?? FALLBACK_GREETINGS;

  let count = 1;
  try {
    const raw = localStorage.getItem(visitKey(subjectId));
    count = raw ? parseInt(raw, 10) + 1 : 1;
    if (!Number.isFinite(count) || count < 1) count = 1;
    localStorage.setItem(visitKey(subjectId), String(count));
  } catch {
    /* localStorage no disponible: siempre cae en la primera frase */
  }

  const index = (count - 1) % pool.length;
  return pool[index];
}
