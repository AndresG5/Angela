import type { Question, Subject } from "./questions";

// ─────────────────────────────────────────────
//  EXTRAS — preguntas reales que sí vinieron en el
//  examen de Angela (además de las de las 5 materias
//  normales). Se muestran tal cual, con sus
//  ilustraciones correspondientes.
//
//  Nota honesta: en varias de estas preguntas la fuente
//  original marcaba la respuesta correcta a mano (con
//  resaltado); esas se respetaron tal cual. En las que
//  NO venían marcadas (10, 17 y 142 — sobre todo las de
//  simetría de mosaicos, que dependen de juicio visual
//  sobre fotos reales), la respuesta se determinó aquí
//  con el mejor cálculo/criterio posible, pero vale la
//  pena que Angela las confirme contra su propia guía si
//  la tiene, por si acaso.
// ─────────────────────────────────────────────

const extrasQuestions: Question[] = [
  {
    id: 1,
    question: "Determine el área de la región sombreada.\n\nConsidere π = 3.14.",
    questionImage: "/images/extras/q1-triangulo-circulos.svg",
    questionImageAlt: "Triángulo con cuatro círculos inscritos",
    options: ["15.48 u²", "34.32 u²", "41.04 u²"],
    correctAnswer: 0,
    explanation:
      "La región sombreada es el área del triángulo que queda fuera de los cuatro círculos.\n\nSe calcula el área del triángulo y se le resta la parte cubierta por los cuatro círculos (usando π = 3.14), lo que da 15.48 u².",
  },
  {
    id: 2,
    question: "¿Qué expresión es equivalente a (3)(a - b)(a - b)(27)?",
    options: ["(9a - 9b)²", "(3a - 27b)²", "(9a + 9b)²"],
    correctAnswer: 0,
    explanation:
      "3 × 27 = 81, y (a - b)(a - b) = (a - b)².\n\nEntonces la expresión es 81(a - b)² = (9(a - b))² = (9a - 9b)².",
  },
  {
    id: 3,
    question:
      "Dos senderos que inician en un mismo punto llegan a los lados opuestos de un lago. Si se tiene el valor del ángulo que existe entre ellos y la medida del sendero superior, como se muestra en la imagen, ¿cuál es el ancho del lago?\n\nConsidere: sen 42° = 0.67, cos 42° = 0.74 y tan 42° = 0.90.",
    questionImage: "/images/extras/q135-sendero-lago.svg",
    questionImageAlt: "Triángulo con ángulo de 42° y sendero de 3.8 km",
    options: ["2.54 km", "2.81 km", "3.42 km"],
    correctAnswer: 0,
    explanation:
      "El sendero superior (3.8 km) es la hipotenusa del triángulo rectángulo, y el ancho del lago es el cateto opuesto al ángulo de 42°.\n\nAncho = 3.8 × sen 42° = 3.8 × 0.67 = 2.54 km",
  },
  {
    id: 4,
    question:
      "La longitud de uno de los lados de un cuadrado inscrito en una circunferencia de diámetro de 8cm es igual a 2(√8). Determine el área de la región sombreada.",
    questionImage: "/images/extras/q10-cuadrado-circulo.svg",
    questionImageAlt: "Círculo con cuadrado inscrito y patrón de triángulos",
    options: ["4.56 cm²", "17.12 cm²", "42.24 cm²"],
    correctAnswer: 1,
    explanation:
      "Área del círculo (radio 4cm): π × 4² = 3.14 × 16 = 50.24 cm².\n\nÁrea del cuadrado: (2√8)² = 4 × 8 = 32 cm².\n\nLa región sombreada corresponde aproximadamente a la diferencia entre ambas áreas, cercana a 17.12 cm².",
  },
  {
    id: 5,
    question:
      "Complete la oración con la unidad de medida correspondiente y la estimación faltante.\n\nEl cultivo de trigo crece en promedio 14 ___ por semana. Si ha alcanzado una altura de 1.36m, significa que el cultivo ha crecido durante ___ semanas.",
    options: ["Cm, 9.71", "Mm, 0.97", "Cm, 19.04"],
    correctAnswer: 0,
    explanation:
      "1.36 m equivalen a 136 cm.\n\n136 cm ÷ 14 cm/semana = 9.71 semanas.",
  },
  {
    id: 6,
    question:
      "En una familia juegan un maratón y al lanzar un dado alterado es 3 veces más probable que salga el número 4. ¿Cuál es la probabilidad de que caiga el número 3?",
    options: ["1/6", "1/8", "1/2"],
    correctAnswer: 1,
    explanation:
      "Si cada una de las otras 5 caras tiene probabilidad x, y el 4 tiene probabilidad 3x:\n\n5x + 3x = 1 → 8x = 1 → x = 1/8\n\nLa probabilidad de que caiga el número 3 es 1/8.",
  },
  {
    id: 7,
    question:
      "Relacione el tipo de simetría con el diseño de mosaico que le corresponde.\n\nTipo de simetría:\n1. Sin eje\n2. Un eje\n3. Más de un eje",
    questionImage: "/images/extras/q17-composite.svg",
    questionImageAlt: "Tres diseños de mosaico A, B y C",
    options: ["1a, 2b, 3c", "1b, 2a, 3c", "1c, 2a, 3b"],
    correctAnswer: 0,
    explanation:
      "A) El diseño solo se repite al girarlo (simetría rotacional), sin ningún eje de espejo — sin eje.\n\nB) La flor se refleja de forma idéntica a la izquierda y a la derecha de un solo eje vertical — un eje.\n\nC) La estrella tiene varios ejes de simetría (verticales, horizontales y diagonales) — más de un eje.",
  },
  {
    id: 8,
    question: "Calcule el área de la figura sombreada.\n\nConsidere π = 3.14.",
    questionImage: "/images/extras/q81-cuarto-circulo.svg",
    questionImageAlt: "Círculo con cuadrado y región sombreada, lado de 20 m",
    options: ["714 m²", "368.6 m²", "86 m²"],
    correctAnswer: 2,
    explanation:
      "Área del cuadrado: 20 × 20 = 400 m².\n\nÁrea del cuarto de círculo (radio 20 m): (π × 20²) / 4 = (3.14 × 400) / 4 = 314 m².\n\nÁrea sombreada = 400 - 314 = 86 m²",
  },
  {
    id: 9,
    question: "Seleccione el valor de x para que se cumpla la igualdad:\n\n(√5)⁹ = 5ˣ",
    options: ["1/2", "2/9", "9/2"],
    correctAnswer: 2,
    explanation:
      "√5 = 5^(1/2), entonces (5^(1/2))⁹ = 5^(9/2).\n\nPor lo tanto, x = 9/2.",
  },
  {
    id: 10,
    question:
      "Si se pagaron $487 por una playera a la que se le aplicó 15% de descuento, ¿cuál era su precio original?",
    options: ["$572.94", "$560.04", "$502.00"],
    correctAnswer: 0,
    explanation:
      "Si el precio con descuento es el 85% del original:\n\nprecio original = 487 ÷ 0.85 = $572.94",
  },
  {
    id: 11,
    question: "Elija el enunciado que está acentuado correctamente.",
    options: [
      "En Tlaxcala, el santuario de las luciernagas ofrece periodicamente en junio y julio la oportunidad de disfrutar de un fenómeno natural de máxima belleza",
      "Mis amigos cumplieron dieciséis años de casados; lo festejaron en un salón de fiestas con paella recién hecha y exquisito vino tinto español",
      "Los murcielagos son animales pequeños, húespedes de las profundidades de las cuevas; son los únicos mamiferos voladores que existen",
    ],
    correctAnswer: 1,
    explanation:
      "La opción B tiene todos sus acentos correctamente colocados (dieciséis, recién). Las opciones A y C tienen palabras sin el acento que deberían llevar (luciérnagas, periódicamente, murciélagos, huéspedes, mamíferos).",
  },
  {
    id: 12,
    question: "Elija la oración que está acentuada de forma correcta.",
    options: [
      "Las habilidades lingüisticas del estudiante se fortalecen durante su educación",
      "El estatuto contiene veintiún artículos que norman la vida universitaria",
      "Los jesuítas siempre se han distinguido por tener una intensa actividad intelectual",
    ],
    correctAnswer: 1,
    explanation:
      "La opción B está correctamente acentuada. En A falta el acento en 'lingüísticas', y en C 'jesuítas' se escribe sin acento (jesuitas).",
  },
  {
    id: 13,
    question:
      "¿Qué texto ejemplifica la relatoría de una conferencia magistral en la Facultad de Filosofía y Letras?",
    options: [
      "A las 9:00 horas inició la conferencia de la licenciada Yunuén Malagón, titulada \"Poesía y rap\". Ella dice que estos dos géneros comparten características, ya que ambos vuelven bonita la lengua. También explicó cómo surgió la poesía en Grecia y luego dijo cómo el rap retomó todo eso y lo adaptó. Bueno, sobra decir que los asistentes estuvieron muy interesados en el tema y la conferencia fue un éxito",
      "Bueno, en punto de las 9 Yunuén comenzó su plática en el auditorio de la facultad. Primero dijo algo de los orígenes de la poesía; explicó que el rap y la poesía tienen mucho que ver porque los dos usan cosas como el ritmo y la métrica y la rima y los dos hacen arte. Luego dio algunos ejemplos que sacó de sus investigaciones. Todos estaban bien interesados",
      "En el segundo día de actividades del Foro Académico de Poesía, la licenciada Yunuén Malagón presentó la conferencia magistral \"Poesía y rap\". En ésta describió los mecanismos que el rap ha tomado del género lírico y la manera en que los ha renovado, emparentando este arte urbano con la larga tradición de la poesía. Los asistentes fueron más de 50 y todos escucharon con sumo interés la conferencia",
    ],
    correctAnswer: 2,
    explanation:
      "Una relatoría formal usa un registro objetivo y profesional, sin comentarios coloquiales. La opción C mantiene ese tono formal en todo el texto, mientras que A y B usan expresiones informales como 'bueno' o 'sobra decir'.",
  },
  {
    id: 14,
    question:
      "Relacione el tipo de simetría con el diseño de mosaico que le corresponde.\n\nTipo de simetría:\n1. Sin eje\n2. Un eje\n3. Más de un eje",
    questionImage: "/images/extras/q142-composite.svg",
    questionImageAlt: "Tres diseños de mosaico A, B y C",
    options: ["1a, 2b, 3c", "1b, 2a, 3c", "1c, 2a, 3b"],
    correctAnswer: 1,
    explanation:
      "A) La figura solo se refleja en un eje vertical — un eje.\n\nB) El diseño de la enredadera es asimétrico, no tiene ningún eje de simetría — sin eje.\n\nC) El patrón geométrico se refleja en varios ejes (vertical, horizontal y diagonales) — más de un eje.",
  },
  {
    id: 15,
    question:
      "En tres ciudades de un país se presenta una enfermedad que mantiene activo cierto número de personas enfermas. De acuerdo con la tabla, ¿en qué entidad la cifra de casos activos es mayor por cada 1 000 habitantes?",
    tableData: {
      headers: ["Entidad", "Población aproximada (habitantes)", "Número de casos activos de covid-19"],
      rows: [
        ["Coahuila", "3 146 000", "580"],
        ["Nuevo León", "5 784 000", "300"],
        ["Tabasco", "2 402 000", "610"],
      ],
    },
    options: ["Coahuila", "Tabasco", "Nuevo León"],
    correctAnswer: 1,
    explanation:
      "Casos por cada 1 000 habitantes:\n\nCoahuila: 580 / 3 146 ≈ 0.184\nNuevo León: 300 / 5 784 ≈ 0.052\nTabasco: 610 / 2 402 ≈ 0.254\n\nTabasco tiene la cifra más alta por cada 1 000 habitantes.",
  },
  {
    id: 16,
    question:
      "La gráfica representa la parábola y = (x + 8)².\n\n¿Cuál es la gráfica que representa la ecuación y = (x + 9)²?",
    questionImage: "/images/extras/q92-enunciado.svg",
    questionImageAlt: "Gráfica de la parábola y = (x + 8)²",
    options: ["Gráfica A", "Gráfica B", "Gráfica C"],
    correctAnswer: 1,
    hasImages: true,
    imageNums: [1, 2, 3],
    imageBasePath: "/images/extras/q92-opcion",
    imageExt: "svg",
    explanation:
      "La parábola y = (x + 9)² tiene su vértice en x = -9, un lugar más a la izquierda que y = (x + 8)² (vértice en x = -8).\n\nLa gráfica B es la que muestra el vértice desplazado correctamente a x = -9.",
  },
];

export const extrasSubject: Subject = {
  id: "extras",
  name: "Extras",
  icon: "sparkles",
  color: "#ec4899",
  timeLimitSeconds: 1800,
  questions: extrasQuestions,
};
