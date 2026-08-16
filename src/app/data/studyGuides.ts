// ─────────────────────────────────────────────
//  Guías de estudio por materia (EXANI-II)
//  Generadas a partir de los temas cubiertos en
//  las preguntas de cada examen.
// ─────────────────────────────────────────────

export interface GuideSection {
  /** Título del tema */
  title: string;
  /** Puntos clave / explicación del tema, en formato de párrafos o viñetas */
  content: string[];
  /** Tip rápido o regla mnemotécnica */
  tip?: string;
}

export interface StudyGuide {
  subjectId: string;
  /** Resumen corto de qué evalúa esta materia */
  intro: string;
  sections: GuideSection[];
}

export const studyGuides: StudyGuide[] = [
  // ── ARITMÉTICA ─────────────────────────────
  {
    subjectId: "aritmetica",
    intro:
      "La sección de Aritmética evalúa tu capacidad para resolver problemas con operaciones básicas, proporciones, fracciones, porcentajes y jerarquía de operaciones.",
    sections: [
      {
        title: "Razones y proporciones",
        content: [
          "Una razón compara dos cantidades (a:b). Una proporción dice que dos razones son iguales (a/b = c/d).",
          "Para problemas de 'reparto proporcional' (repartir una cantidad entre varias personas según una proporción), suma las partes de la proporción, divide el total entre esa suma y multiplica por cada parte.",
          "Los problemas de 'regla de tres compuesta' (como la tripulación del barco o la cisterna que se llena) involucran varias magnitudes a la vez: identifica si cada magnitud es directamente o inversamente proporcional antes de armar la ecuación.",
        ],
        tip: "Si al aumentar una cantidad la otra también aumenta → directa. Si al aumentar una la otra disminuye → inversa.",
      },
      {
        title: "Fracciones y operaciones combinadas",
        content: [
          "En problemas de reparto de un total en fracciones (como el ejemplo de la veterinaria), primero calcula cada fracción por separado, súmalas usando un común denominador y resta de 1 (el total) para encontrar lo que falta.",
          "Recuerda: para sumar fracciones necesitas el mismo denominador; para multiplicarlas, multiplica numeradores entre sí y denominadores entre sí.",
        ],
      },
      {
        title: "Ley de los signos",
        content: [
          "Positivo × Positivo = Positivo. Negativo × Negativo = Positivo. Positivo × Negativo = Negativo.",
          "En problemas de contexto (temperatura, dinero, deudas), identifica primero qué cantidad representa un valor negativo (pérdida, deuda, bajo cero) antes de aplicar la operación.",
        ],
      },
      {
        title: "Jerarquía de operaciones y símbolos de agrupación",
        content: [
          "Orden correcto: (1) paréntesis, corchetes y llaves de adentro hacia afuera, (2) potencias y raíces, (3) multiplicaciones y divisiones de izquierda a derecha, (4) sumas y restas de izquierda a derecha.",
          "En expresiones con agrupadores, verifica que cada símbolo de apertura tenga su cierre correspondiente antes de resolver.",
        ],
        tip: "Recuerda el orden: Paréntesis → Exponentes → Multiplicación/División → Suma/Resta (PEMDAS).",
      },
      {
        title: "Potencias, raíces y lenguaje algebraico",
        content: [
          "Para dividir potencias de la misma base, resta los exponentes: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
          "Traducir frases a expresiones: 'semisuma' = (a+b)/2, 'cubo de' = elevar al cubo, 'cuadrado de' = elevar al cuadrado. Arma la expresión de adentro hacia afuera siguiendo el orden en que se leen las operaciones.",
        ],
      },
      {
        title: "Operaciones con dinero",
        content: [
          "En problemas de finanzas personales (ingresos, gastos, bonos), organiza la información en pasos: primero suma todos los ingresos, luego resta cada gasto uno por uno para evitar errores.",
        ],
      },
    ],
  },

  // ── HISTORIA ───────────────────────────────
  {
    subjectId: "historia",
    intro:
      "La sección de Historia evalúa procesos de historia universal y de México, desde la época prehispánica hasta la globalización actual, con énfasis en causas, características y consecuencias de cada proceso.",
    sections: [
      {
        title: "México prehispánico y colonial",
        content: [
          "Identifica los horizontes culturales (preclásico, clásico, posclásico) por sus características: ciudades como Teotihuacán se distinguen por su planeación urbana, orientación astronómica y organización social jerárquica (élite cerca del centro, barrios populares en la periferia).",
          "El cabildo era la institución de gobierno local en la Nueva España, encargada de la administración de las ciudades y villas.",
          "Elementos culturales de los primeros pobladores de América (ruta del Pacífico) incluyen técnicas de pesca, recolección costera y navegación primitiva.",
        ],
      },
      {
        title: "Independencia y México del siglo XIX",
        content: [
          "Las causas externas del movimiento independentista incluyen la invasión napoleónica a España y la crisis de la monarquía española, que debilitó el control sobre las colonias.",
          "El proyecto liberal decimonónico buscaba un Estado laico, división de poderes y un sistema republicano federal, en contraste con el proyecto conservador.",
          "La Constitución de 1824 fue la que estableció el catolicismo como religión oficial y única permitida.",
          "Las intervenciones extranjeras (estadounidense y francesa) tuvieron como consecuencia pérdida territorial y endeudamiento del país.",
        ],
      },
      {
        title: "Revolución Mexicana y reconstrucción nacional",
        content: [
          "Causas políticas de 1910: la reelección indefinida de Porfirio Díaz y la proclamación del Plan de San Luis por Francisco I. Madero, que llamaba al levantamiento armado.",
          "La huelga de Cananea (1906) en una mina de cobre en Sonora es precursora del movimiento obrero previo a la Revolución.",
          "La Secretaría de Educación Pública (SEP), creada en 1921 por José Vasconcelos, se caracterizó por impulsar una educación de alcance nacional y popular (misiones culturales, alfabetización).",
          "El gobierno de Lázaro Cárdenas destacó por el reparto agrario y la expropiación petrolera como parte de la reconstrucción nacional.",
        ],
      },
      {
        title: "Guerras mundiales y siglo XX",
        content: [
          "La Primera Guerra Mundial se detonó por el asesinato del archiduque Francisco Fernando en Sarajevo y enfrentó a Alemania y Austria-Hungría contra Rusia, Francia y Gran Bretaña. Se caracterizó por armamento nuevo como los gases tóxicos y las ametralladoras.",
          "La estrategia militar alemana en la Segunda Guerra Mundial fue la 'guerra relámpago' (Blitzkrieg): ataques rápidos y coordinados de aviación, tanques e infantería.",
          "El descubrimiento de los campos de concentración al final de la Segunda Guerra Mundial llevó a los Juicios de Núremberg, que sentaron el precedente para la Declaración Universal de los Derechos Humanos de la ONU.",
        ],
        tip: "Relaciona siempre 'causa → hecho → consecuencia' al estudiar cada guerra o revolución; muchas preguntas piden identificar uno de estos tres elementos.",
      },
      {
        title: "Descolonización y guerras posteriores",
        content: [
          "La descolonización de la India se caracterizó por la resistencia civil pacífica (liderada por Gandhi) y migraciones masivas de población musulmana e hindú.",
          "Las causas de la Guerra de Vietnam incluyen la expansión del comunismo en el sudeste asiático y la política estadounidense de contención durante la Guerra Fría.",
        ],
      },
      {
        title: "Economía de finales del siglo XX y globalización",
        content: [
          "El 'Milagro mexicano' (1940–1970) se refiere al periodo de crecimiento sostenido del PIB mayor al 6% anual, basado en la industrialización por sustitución de importaciones.",
          "El neoliberalismo trajo como consecuencias económicas la apertura comercial, privatización de empresas estatales y reducción del gasto público.",
          "La globalización generó consecuencias sociales como la homogeneización cultural, migración masiva y aumento de la desigualdad entre países.",
          "La transición política del año 2000 en México se relaciona con la alternancia en la presidencia tras más de 70 años del mismo partido en el poder.",
        ],
      },
    ],
  },

  // ── INGLÉS ─────────────────────────────────
  {
    subjectId: "ingles",
    intro:
      "La sección de Inglés evalúa comprensión de lectura de textos académicos (sobre arquitectura y ciudades) y gramática: tiempos verbales, conectores, voz pasiva y vocabulario en contexto.",
    sections: [
      {
        title: "Estrategias de comprensión lectora",
        content: [
          "Main idea questions ('What is the main argument...'): lee el primer y último párrafo primero; ahí suele estar la tesis central.",
          "Detail questions ('According to the passage, what percentage...'): busca la cifra o dato exacto en el texto, no confíes en la memoria — vuelve a leer esa parte.",
          "Vocabulary-in-context questions ('The word ___ is closest in meaning to'): sustituye la palabra por cada opción y relee la oración completa; la respuesta correcta debe mantener el sentido lógico del párrafo.",
        ],
      },
      {
        title: "Voz pasiva",
        content: [
          "Se forma con: sujeto + to be (conjugado) + participio pasado. Ejemplo: 'The library was designed by a team of architects.'",
          "Se usa cuando el foco está en la acción o en quien la recibe, no en quien la realiza.",
        ],
        tip: "Si ves 'by + alguien' al final de la oración, casi siempre es voz pasiva.",
      },
      {
        title: "Conectores y transición",
        content: [
          "however / nevertheless → contraste u oposición.",
          "therefore / thus → consecuencia o conclusión.",
          "furthermore / moreover → información adicional que refuerza la idea anterior.",
        ],
      },
      {
        title: "Comparativos y modales",
        content: [
          "Comparativo: adjetivo corto + 'er' (bigger) o 'more' + adjetivo largo (more durable). No combines ambas formas.",
          "must → obligación necesaria; mustn't → prohibición; couldn't → incapacidad en pasado. Elige según el sentido lógico de la oración.",
        ],
      },
      {
        title: "Tiempos verbales: Present Perfect",
        content: [
          "Se forma con have/has + participio pasado. Se usa para acciones que empezaron en el pasado y siguen teniendo relevancia en el presente, o experiencias sin tiempo específico.",
          "No se usa con expresiones de tiempo específico como 'last year' — ahí va Simple Past.",
        ],
      },
      {
        title: "Concordancia sujeto-verbo",
        content: [
          "El verbo concuerda con el sujeto real de la oración, no con la palabra más cercana. En 'The team of engineers ___ designing...', el sujeto es 'team' (singular), aunque 'engineers' esté justo antes del verbo.",
        ],
      },
    ],
  },

  // ── COMPRENSIÓN LECTORA ────────────────────
  {
    subjectId: "comprension-lectora",
    intro:
      "Esta sección evalúa la comprensión de textos en español: identificar ideas principales y secundarias, inferencias, función de conectores, tipos de texto y significado de palabras en contexto.",
    sections: [
      {
        title: "Idea principal vs. idea secundaria",
        content: [
          "La idea principal responde '¿de qué trata el texto en general?'. Las ideas secundarias son detalles, ejemplos o datos que apoyan a la principal.",
          "Truco: la idea principal suele funcionar como 'sombrilla' — todas las demás oraciones del párrafo caben debajo de ella.",
        ],
      },
      {
        title: "Inferencias",
        content: [
          "Una inferencia es algo que se puede deducir del texto, aunque no esté dicho explícitamente. No es lo mismo que un dato literal.",
          "Para identificar una inferencia válida, verifica que se apoye directamente en pistas del texto y no en información externa o suposiciones propias.",
        ],
        tip: "Si la respuesta repite casi textualmente una frase del texto, probablemente es un dato literal, no una inferencia.",
      },
      {
        title: "Función de conectores y estructura del texto",
        content: [
          "'No obstante' / 'sin embargo' → introduce un contraste con lo dicho antes.",
          "El función del último párrafo de un texto suele ser: cerrar la idea, plantear una reflexión final o proyectar consecuencias futuras — identifica cuál de estas tres cumple en cada caso.",
        ],
      },
      {
        title: "Tipos de texto",
        content: [
          "Texto instructivo: da pasos a seguir (primero, a continuación, finalmente) — como una receta o manual.",
          "Texto argumentativo: defiende una tesis con razones y evidencia.",
          "Texto narrativo/literario: usa metáforas y lenguaje figurado para crear una atmósfera o transmitir una idea de forma indirecta.",
        ],
      },
      {
        title: "Vocabulario en contexto y figuras retóricas",
        content: [
          "Para el significado de una palabra en contexto, sustitúyela por cada opción y verifica cuál mantiene el sentido lógico del párrafo completo (no solo de la oración).",
          "Metáfora: compara dos cosas sin usar 'como'. Ejemplo: 'no camina: flota' da la sensación de ligereza o irrealidad, no un movimiento literal.",
        ],
      },
      {
        title: "Resumen y síntesis",
        content: [
          "Al resumir un fragmento, la opción correcta debe incluir todos los elementos clave del texto sin agregar información que no aparece ni omitir la idea central.",
        ],
      },
    ],
  },

  // ── PENSAMIENTO MATEMÁTICO ─────────────────
  {
    subjectId: "pensamiento-matematico",
    intro:
      "Esta sección combina álgebra, geometría, probabilidad y estadística. Evalúa tu capacidad de plantear y resolver problemas, no solo de hacer cálculos.",
    sections: [
      {
        title: "Álgebra básica",
        content: [
          "Ecuaciones lineales: agrupa los términos con x de un lado y los números del otro, cambiando el signo al pasar de lado.",
          "Simplificación de expresiones: aplica primero la propiedad distributiva (multiplica el número por cada término dentro del paréntesis) y luego reduce términos semejantes.",
          "Factorización de diferencia de cuadrados: a² − b² = (a + b)(a − b).",
          "Sistemas de ecuaciones: puedes resolver por sustitución (despeja una variable en una ecuación y sustitúyela en la otra) o por suma/resta.",
        ],
      },
      {
        title: "Porcentajes y descuentos sucesivos",
        content: [
          "Para descuentos aplicados uno tras otro (20% y luego 10%), NO se suman los porcentajes. Aplica el primer descuento sobre el precio original, y el segundo descuento sobre el nuevo precio ya reducido.",
          "Para 'el X% de un número', multiplica el número por X/100.",
        ],
        tip: "Descuentos sucesivos de 20% y 10% NO equivalen a un 30% de descuento total — siempre es un poco menos.",
      },
      {
        title: "Geometría: áreas, perímetros y volúmenes",
        content: [
          "Área de triángulo = (base × altura) / 2. En un triángulo rectángulo, los catetos son la base y la altura.",
          "Teorema de Pitágoras: c² = a² + b² (c = hipotenusa). Úsalo para encontrar el lado faltante de un triángulo rectángulo.",
          "Área del círculo = π × r². Perímetro de rectángulo = 2 × (largo + ancho). Volumen del cubo = arista³.",
        ],
      },
      {
        title: "Funciones lineales y pendiente",
        content: [
          "Pendiente entre dos puntos: m = (y₂ − y₁) / (x₂ − x₁).",
          "Ecuación de la recta: y = mx + b, donde b es el punto donde la recta cruza el eje y (cuando x = 0).",
        ],
      },
      {
        title: "Estadística: media, mediana y moda",
        content: [
          "Media (promedio) = suma de todos los datos ÷ cantidad de datos. Para combinar dos grupos con distinto promedio, primero calcula el total de cada grupo (promedio × cantidad de personas) y luego súmalos antes de dividir entre el total de personas.",
          "Mediana: ordena los datos de menor a mayor y toma el valor central (o el promedio de los dos centrales si son pares).",
          "Moda: el valor que más se repite en el conjunto de datos.",
        ],
      },
      {
        title: "Probabilidad",
        content: [
          "Probabilidad de un evento = (casos favorables) / (casos totales).",
          "Para dos eventos independientes que deben ocurrir juntos (como lanzar un dado dos veces), multiplica la probabilidad de cada uno por separado.",
        ],
      },
      {
        title: "Conjuntos y proporciones",
        content: [
          "Problemas de conjuntos que se traslapan (ej. estudiantes que estudian música y pintura): usa la fórmula Total = A + B − (ambos) + (ninguno) para encontrar el valor que falta.",
          "Reparto proporcional (ej. ganancias entre socios): suma las partes de la razón, divide el total entre esa suma para obtener el valor de 'una parte', y multiplica por la proporción de cada quien.",
        ],
      },
    ],
  },
];

export function getStudyGuide(subjectId: string): StudyGuide | undefined {
  return studyGuides.find((g) => g.subjectId === subjectId);
}
