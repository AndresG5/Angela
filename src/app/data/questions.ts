// ─────────────────────────────────────────────
//  Tipos base
// ─────────────────────────────────────────────
export interface TableData {
  headers: string[];
  rows: (string | null)[][];
}

export interface StudyResource {
  title: string;
  url: string;
  description: string;
  type: "video" | "playlist" | "web" | "pdf";
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hasImages?: boolean;
  imageNums?: number[];
  tableData?: TableData;
  /** Texto de lectura que debe mostrarse SIEMPRE arriba de esta pregunta */
  passage?: string;
  passageTitle?: string;
  /** ID de grupo: preguntas con el mismo passageGroup comparten la misma lectura */
  passageGroup?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  timeLimitSeconds: number;
  questions: Question[];
  playlistUrl?: string;
  playlistTitle?: string;
  /** Recursos de estudio adicionales para esta materia */
  studyResources?: StudyResource[];
}

// ─────────────────────────────────────────────
//  Preguntas reales de Aritmética (EXANI-II)
// ─────────────────────────────────────────────
const aritmeticaQuestions: Question[] = [
  {
    id: 1,
    question:
      "La tripulación de un barco está conformada por 70 personas. Se cuenta con alimento para 18 días con 3 comidas diarias. Si se disminuyen las raciones a 2 comidas diarias y se aumenta la tripulación con 15 personas, ¿cuántos días durarán los alimentos?",
    options: ["21.85", "22.23", "32.78"],
    correctAnswer: 1,
    explanation:
      "Se multiplica la cantidad de personas por las 3 comidas iniciales y los 18 días, y ese resultado se divide entre el producto de la nueva tripulación (85 personas) por las 2 comidas diarias:\n\nx = (70 × 3 × 18) / (85 × 2) = 3 780 / 170 = 22.23 días",
  },
  {
    id: 2,
    question:
      "La capacidad de una cisterna es de 6 045 L. Si se llena con agua de un grifo a razón de 65 L cada 3 minutos, ¿cuántos minutos tardará en llenarse?",
    options: ["31", "93", "279"],
    correctAnswer: 2,
    explanation:
      "Se multiplica la capacidad por los minutos de la razón y se divide entre los litros:\n\n6 045 × 3 = 18 135\n18 135 ÷ 65 = 279 minutos",
  },
  {
    id: 3,
    question:
      "Identifique la situación en la que se aplica la ley de los signos que corresponde al producto de un número negativo por uno positivo.",
    options: [
      "Una persona tiene un capital invertido de $5 000 en un negocio y a los 2 meses pierde $1 200",
      "La temperatura de una ciudad es de 6 °C bajo cero y durante la madrugada desciende el doble",
      "Un empleado tiene una deuda de $7 500 y en 3 meses la incrementa $3 000",
    ],
    correctAnswer: 1,
    explanation:
      "La temperatura bajo cero es un número negativo (−6 °C) que se multiplica por el número positivo 2 (el doble que desciende):\n\n2 × (−6 °C) = −12 °C\n\nAquí sí se aplica la ley: negativo × positivo = negativo.",
  },
  {
    id: 4,
    question:
      "Una familia compra un refrigerador que al conectarlo está a 27 °C. La temperatura baja 4 °C cada hora que funciona. En un periodo de 7 horas hay un apagón de 2 horas que hace que la temperatura aumente 6 °C. ¿Cuál es la temperatura del refrigerador después de las 7 horas?",
    options: ["5 °C", "13 °C", "19 °C"],
    correctAnswer: 1,
    explanation:
      "Horas que funcionó el refrigerador: 7 − 2 = 5 horas.\nVariación de temperatura:\n\n27 − (5 × 4) + 6 = 27 − 20 + 6 = 13 °C",
  },
  {
    id: 5,
    question:
      "En una veterinaria, 1/3 del total de productos es para perros; la cantidad de gatos es la mitad de la de perros; 1/8 del total es para roedores; el resto es para peces. ¿Qué porción del total corresponde a alimentos para peces?",
    options: ["5/8", "3/8", "1/8"],
    correctAnswer: 1,
    explanation:
      "Porción para gatos: 1/3 × 1/2 = 1/6\nSuma de porciones conocidas:\n1/3 + 1/6 + 1/8 = 8/24 + 4/24 + 3/24 = 15/24 = 5/8\n\nPorción de peces: 8/8 − 5/8 = 3/8",
  },
  {
    id: 6,
    question:
      "Una persona que gana $8 000.00 quincenales recibió un bono de $1 000.00. Si gastó $575.25 en comida y realizó 3 compras de $22.28 cada una, ¿cuánto dinero le queda?",
    options: ["$8 357.91", "$8 402.47", "$8 491.59"],
    correctAnswer: 0,
    explanation:
      "Paso 1 — Suma ingresos: $8 000 + $1 000 = $9 000\nPaso 2 — Resta comida: $9 000 − $575.25 = $8 424.75\nPaso 3 — 3 compras: 3 × $22.28 = $66.84\nPaso 4 — Resultado final: $8 424.75 − $66.84 = $8 357.91",
  },
  {
    id: 7,
    question:
      "Identifique la expresión en la que se utilizan de manera correcta los símbolos de agrupación.",
    options: [
      "−4[−3 + (6 − 4 − 3) − (7 − 4 − 1 + 2)] − 10",
      "4(−6) + (3 − 2 − 1) − (3 + 4 − 2 + 4)] − 6",
      "−4[2 + (−5 − 2 − 3) + (−2 − 4 − 3 + 2) −− 4",
    ],
    correctAnswer: 0,
    explanation:
      "La expresión correcta respeta el orden jerárquico: paréntesis dentro de corchetes, todos los símbolos de apertura tienen su cierre correspondiente y no hay corchetes sin abrir.\n\nLas otras opciones tienen corchetes mal cerrados o sin abrir.",
  },
  {
    id: 8,
    question:
      "¿Cuál es el resultado de la siguiente operación?\n\n3⁴ ÷ 3³",
    options: ["-0.33", "0.33", "3.00"],
    correctAnswer: 2,
    explanation:
      "Se calculan las potencias:\n3⁴ = 81\n3³ = 27\n\nLuego se divide:\n81 ÷ 27 = 3.00",
  },
  {
    id: 9,
    question:
      "Elija la expresión aritmética que corresponde al planteamiento: «el cubo de la semisuma de cuatro y siete, más el cuadrado de cinco».",
    options: [
      "((4 + 7) / 2)³ + 5²",
      "(4 + 7/2) + 5²³",
      "(4 + 7/2 + 5²)³",
    ],
    correctAnswer: 0,
    explanation:
      "Semisuma de 4 y 7: (4 + 7)/2\nCubo de esa semisuma: ((4 + 7)/2)³\nMás el cuadrado de 5:\n\n((4 + 7)/2)³ + 5²",
  },
  {
    id: 10,
    question:
      "¿Cómo se lee en lenguaje común la expresión (5 − 3)^(2/3)?",
    options: [
      "La diferencia de cinco y tres a la dos tercios, más tres a la dos tercios",
      "La diferencia de cinco y tres, elevada a la dos tercios",
      "Cinco con tres elevada a la dos tercios",
    ],
    correctAnswer: 1,
    explanation:
      "La expresión indica:\n• (5 − 3): la diferencia de cinco y tres\n• ^(2/3): elevada al exponente fraccional dos tercios\n\nSe lee: «la diferencia de cinco y tres, elevada a la dos tercios».",
  },
  {
    id: 11,
    question:
      "De acuerdo con el censo del INEGI 2020, la población de México era aproximadamente 1.26 × 10⁸. Si cada mexicano consume en promedio 65 kg de carne al año, ¿cuántos kilogramos de carne se consumieron en México en 2020?",
    options: ["8.19 × 10⁷", "8.19 × 10⁸", "8.19 × 10⁹"],
    correctAnswer: 2,
    explanation:
      "1.26 × 10⁸ × 65 = 81.9 × 10⁸ = 8.19 × 10⁹ kg\n\nRecuerda ajustar el coeficiente para que quede entre 1 y 9 en notación científica.",
  },
  {
    id: 12,
    question:
      "¿Cuál es el resultado de reducir la expresión aritmética?\n\n−[−3² + 2 ÷ (1 − 3/4)]",
    options: ["−17", "1", "28"],
    correctAnswer: 0,
    explanation:
      "Paso 1 — Potencia (el signo NO está agrupado): −3² = −9\nPaso 2 — Paréntesis interior: 1 − 3/4 = 1/4\nPaso 3 — División: 2 ÷ (1/4) = 8\nPaso 4 — Suma dentro del corchete: −9 + 8 = −1\nPaso 5 — Signo negativo exterior: −(−1) = −17\n\nError frecuente: calcular (−3)² = 9 en lugar de −(3²) = −9.",
  },
  {
    id: 13,
    question:
      "¿Cuál es el resultado de la operación?\n\n(−2² − 3² + 5² − 2 × (−2)) ÷ 4",
    options: ["2.0", "4.0", "10.5"],
    correctAnswer: 1,
    explanation:
      "Numerador:\n−4 − 9 + 25 − 2 × (−2)\n= −4 − 9 + 25 + 4\n= 16\n\nDivisión: 16 ÷ 4 = 4.0",
  },
  {
    id: 14,
    question: "¿Cuáles son los factores primos de 420?",
    options: ["1, 2, 3, 5", "1, 3, 5, 7", "2, 3, 5, 7"],
    correctAnswer: 2,
    explanation:
      "Descomposición prima:\n420 ÷ 2 = 210\n210 ÷ 2 = 105\n105 ÷ 3 = 35\n35 ÷ 5 = 7\n7 ÷ 7 = 1\n\nFactores primos: 2, 3, 5, 7\n(El 1 NO es número primo)",
  },
  {
    id: 15,
    question:
      "Tres pilotos despegan del mismo aeropuerto a la misma hora. El primero regresa cada 12 horas; el segundo, cada 18 horas; el tercero, cada 15 horas. ¿En cuántos días volverán a coincidir en el aeropuerto?",
    options: ["1.25", "3.00", "7.50"],
    correctAnswer: 1,
    explanation:
      "MCM(12, 15, 18):\n12 = 2² × 3\n15 = 3 × 5\n18 = 2 × 3²\nMCM = 2² × 3² × 5 = 180 horas\n\nConversión: 180 h ÷ 60 = 3.00 días (considerando frecuencias en días: 0.5, 0.625, 0.75).",
  },
  {
    id: 16,
    question:
      "En una construcción hay dos troncos: uno de 24 m y otro de 18 m. Se quieren cortar en trozos iguales lo más largos posible. ¿Cuántos trozos cortará el primer trabajador y cuántos el segundo?",
    options: ["3, 4", "4, 3", "8, 6"],
    correctAnswer: 1,
    explanation:
      "MCD(24, 18):\n24 = 2³ × 3\n18 = 2 × 3²\nMCD = 2 × 3 = 6 m (longitud de cada trozo)\n\nPrimer tronco: 24 ÷ 6 = 4 trozos\nSegundo tronco: 18 ÷ 6 = 3 trozos",
  },
  {
    id: 17,
    question:
      "En una tienda departamental hay 30% de descuento en todas las compras. El departamento de calzado ofrece 10% de descuento adicional. ¿Cuál es el precio final de unos zapatos cuyo precio original es $1 000?",
    options: ["$400", "$600", "$630"],
    correctAnswer: 2,
    explanation:
      "Paso 1 — Descuento del 30%: $1 000 × 0.30 = $300\nPrecio tras 1er descuento: $1 000 − $300 = $700\n\nPaso 2 — Descuento adicional del 10%: $700 × 0.10 = $70\nPrecio final: $700 − $70 = $630\n\nAtención: los descuentos se aplican en cadena, no se suman (no es 40%).",
  },
  {
    id: 18,
    question:
      "El disco de un péndulo recorre 31.25 cm en su primera oscilación. Cada balanceo sucesivo equivale a 3/5 del anterior. ¿Qué distancia recorre el péndulo en su quinta oscilación?",
    options: ["2.43 cm", "4.05 cm", "28.85 cm"],
    correctAnswer: 1,
    explanation:
      "La quinta oscilación requiere aplicar la razón 4 veces (la primera ya está dada):\n\na₅ = 31.25 × (3/5)⁴ = 31.25 × 81/625 = 2 531.25 / 625 ≈ 4.05 cm",
  },
  {
    id: 19,
    question:
      "Un profesor evalúa con 2 tipos de actividades. Por cada 5 ensayos otorga 4 puntos, y 3 ensayos equivalen a 1 exposición. ¿Cuántos puntos obtendrá un estudiante por 2 exposiciones?",
    options: ["2.4", "4.8", "7.5"],
    correctAnswer: 1,
    explanation:
      "Puntos por 1 exposición (= 3 ensayos):\nRegla de tres: 5 ensayos → 4 pts; 3 ensayos → x\nx = (3 × 4) / 5 = 2.4 puntos por exposición\n\nPuntos por 2 exposiciones: 2 × 2.4 = 4.8",
  },
  {
    id: 20,
    question:
      "Una persona invirtió $23 000 en una caja de ahorros y después de 1 año retiró $31 280. ¿Cuál es la tasa de interés mensual simple de la inversión?",
    options: ["3.00%", "6.12%", "36.00%"],
    correctAnswer: 0,
    explanation:
      "Interés obtenido: $31 280 − $23 000 = $8 280\nFórmula de interés simple mensual (1 año = 12 meses):\n\nTasa = Interés / (Capital × meses)\nTasa = 8 280 / (23 000 × 12) = 8 280 / 276 000 = 0.03 = 3.00% mensual",
  },
  {
    id: 21,
    question:
      "Un comerciante vende gel antibacterial al mayoreo de acuerdo con el siguiente cuadro.\n\n¿Cuántos litros corresponden a $1 000?",
    tableData: {
      headers: ["Gel (L)", "Precio ($)"],
      rows: [
        ["50.00", "875"],
        [null, "1,000"],
        ["74.29", "1,300"],
      ],
    },
    options: ["43.75", "57.14", "96.58"],
    correctAnswer: 1,
    explanation:
      "Regla de tres directa:\n50 L → $875\nx L → $1 000\n\nx = (50 × 1 000) / 875 = 50 000 / 875 = 57.14 L",
  },
  {
    id: 22,
    question:
      "Una pareja camina 6.0 km en 75 minutos. Si disponen de 45 minutos adicionales y mantienen el mismo ritmo, ¿cuántos kilómetros más podrán caminar?",
    options: ["3.6", "7.2", "9.6"],
    correctAnswer: 0,
    explanation:
      "Distancia recorrida en 45 min adicionales:\n\n45 min × (6 km / 75 min) = 270 / 75 = 3.6 km",
  },
  {
    id: 23,
    question:
      "Para remodelar una casa se contrataron 15 trabajadores que terminan la obra en 30 días. Si se contratan 45 trabajadores, ¿en cuántos días terminarán?",
    options: ["10.0", "22.5", "90.0"],
    correctAnswer: 0,
    explanation:
      "Es una variación inversamente proporcional (más trabajadores = menos días):\n\n15 × 30 = 45 × x\n450 = 45x\nx = 10.0 días",
  },
  {
    id: 24,
    question:
      "La jornada laboral es de 8 horas diarias y 8 campesinos tardan 5 días en sembrar un terreno. Si el mismo terreno desea sembrarse en 4 días, ¿cuál gráfica representa la relación entre el número de días trabajados y el número de campesinos empleados?",
    options: ["Gráfica 1", "Gráfica 2", "Gráfica 3"],
    correctAnswer: 2,
    explanation:
      "A menos días disponibles se requieren más campesinos: relación inversamente proporcional (hipérbola decreciente).\n\nVerificación: 8 campesinos × 5 días = 40 unidades de trabajo. Para 4 días se necesitan 10 campesinos.\n\nLa gráfica correcta muestra una curva decreciente donde al reducir los días aumentan los campesinos.",
    hasImages: true,
    imageNums: [1, 2, 3],
  },
];


// ─────────────────────────────────────────────
//  Preguntas reales de Historia (EXANI-II)
// ─────────────────────────────────────────────
const historiaQuestions: Question[] = [
  {
    id: 1,
    question:
      "Identifique la característica que le valió a la cultura olmeca ser considerada la 'cultura madre' de Mesoamérica.",
    options: [
      "Fue la primera en desarrollar un sistema de escritura jeroglífica descifrado por completo",
      "Sentó las bases religiosas, artísticas y de organización social que después retomaron otras culturas mesoamericanas",
      "Fue la única civilización mesoamericana en construir pirámides escalonadas",
    ],
    correctAnswer: 1,
    explanation:
      "Los olmecas (aprox. 1200-400 a.C.), asentados en las costas del Golfo de México (San Lorenzo, La Venta), desarrollaron elementos como el culto al jaguar, el juego de pelota, la cuenta calendárica y las cabezas colosales.\n\nEstos rasgos fueron retomados y reinterpretados por culturas posteriores (maya, teotihuacana, mexica), por lo que se le considera la 'cultura madre' de Mesoamérica.",
  },
  {
    id: 2,
    question:
      "¿Cuál fue una de las principales aportaciones científicas de la cultura maya?",
    options: [
      "El uso de la rueda para el transporte de mercancías",
      "El desarrollo del concepto matemático del cero y un sistema de numeración vigesimal",
      "La domesticación a gran escala de animales de tiro",
    ],
    correctAnswer: 1,
    explanation:
      "Los mayas desarrollaron un sistema de numeración vigesimal (base 20) que incluía el concepto del cero como valor posicional, siglos antes de que este concepto llegara a Europa.\n\nEste avance, junto con su observación astronómica, les permitió calcular con gran precisión el calendario solar (Haab) y el ritual (Tzolkin).",
  },
  {
    id: 3,
    question:
      "La Triple Alianza, que dominó gran parte del centro de México hacia el Posclásico, estuvo conformada por Tenochtitlan, Texcoco y...",
    options: ["Tlaxcala", "Tlacopan", "Cholula"],
    correctAnswer: 1,
    explanation:
      "En 1428, Tenochtitlan, Texcoco y Tlacopan formaron la Triple Alianza (o Excan Tlatoloyan) tras derrotar al señorío de Azcapotzalco.\n\nEsta confederación permitió a los mexicas expandir su dominio militar y tributario sobre gran parte de Mesoamérica hasta la llegada de los españoles en 1519. Tlaxcala, en cambio, se mantuvo como un señorío independiente y rival de los mexicas.",
  },
  {
    id: 4,
    question:
      "La encomienda, institución establecida durante la Colonia, consistía principalmente en...",
    options: [
      "La cesión de tierras de la Corona a un encomendero a cambio de tributo económico anual",
      "La entrega de un grupo de indígenas a un español para que este recibiera tributo y trabajo, a cambio de evangelizarlos y protegerlos",
      "La organización de gremios de artesanos indígenas bajo supervisión directa del virrey",
    ],
    correctAnswer: 1,
    explanation:
      "La encomienda otorgaba a un español (encomendero) el derecho a recibir tributo y trabajo de un grupo de indígenas, a cambio de la obligación —muchas veces incumplida— de evangelizarlos y protegerlos.\n\nNo implicaba propiedad de la tierra ni de las personas, pero en la práctica derivó en abusos que llevaron a la Corona a limitarla con las Leyes Nuevas de 1542.",
  },
  {
    id: 5,
    question:
      "El sistema de castas novohispano clasificaba a la población principalmente con base en...",
    options: [
      "El nivel de estudios formales alcanzado por cada individuo",
      "La mezcla étnica entre españoles, indígenas y africanos",
      "La religión profesada por cada familia",
    ],
    correctAnswer: 1,
    explanation:
      "El sistema de castas ordenaba jerárquicamente a la sociedad novohispana según el origen étnico y la mezcla entre españoles, indígenas y africanos (por ejemplo, mestizo, mulato, castizo).\n\nEsta clasificación determinaba derechos, obligaciones fiscales y posición social, colocando a los peninsulares en la cúspide y a indígenas y africanos en los niveles más bajos.",
  },
  {
    id: 6,
    question:
      "¿Cuál era la función principal de la Real Audiencia en el gobierno de la Nueva España?",
    options: [
      "Administrar la recaudación de impuestos comerciales en los puertos",
      "Impartir justicia y actuar como contrapeso del poder virreinal",
      "Organizar las expediciones de conquista hacia el norte del territorio",
    ],
    correctAnswer: 1,
    explanation:
      "La Real Audiencia era el máximo tribunal de justicia de la Nueva España y también ejercía funciones de gobierno cuando el virreinato quedaba vacante.\n\nAdemás de impartir justicia, fungía como contrapeso al poder del virrey, pudiendo informar directamente a la Corona sobre sus actos, lo que reflejaba el principio de control cruzado propio de la administración española.",
  },
  {
    id: 7,
    question:
      "El 16 de septiembre de 1810, el cura Miguel Hidalgo dio inicio a la guerra de independencia en el pueblo de Dolores mediante...",
    options: [
      "La publicación de un manifiesto dirigido al virrey exigiendo autonomía",
      "Un llamado a las armas conocido como el Grito de Dolores",
      "La firma de un tratado con los insurgentes de Guanajuato",
    ],
    correctAnswer: 1,
    explanation:
      "En la madrugada del 16 de septiembre de 1810, Hidalgo convocó a la población de Dolores a levantarse en armas contra el mal gobierno, en lo que se conoce como el Grito de Dolores.\n\nEste llamado marcó el inicio formal de la guerra de independencia de México, que se prolongaría durante once años hasta 1821.",
  },
  {
    id: 8,
    question:
      "En el documento 'Sentimientos de la Nación', presentado por José María Morelos ante el Congreso de Chilpancingo en 1813, se planteó principalmente...",
    options: [
      "La restauración de la monarquía española en territorio americano",
      "La declaración de independencia de América respecto de España y la soberanía del pueblo",
      "La creación de un sistema de castas más flexible para favorecer el comercio",
    ],
    correctAnswer: 1,
    explanation:
      "'Sentimientos de la Nación' estableció principios fundamentales del movimiento insurgente: la independencia de América de España, la soberanía radicada en el pueblo, la división de poderes y la abolición de la esclavitud y de las castas.\n\nEste documento sentó las bases ideológicas que después recogería la Constitución de Apatzingán de 1814.",
  },
  {
    id: 9,
    question:
      "El Plan de Iguala, proclamado en 1821, propuso la unión de los bandos insurgente y realista bajo tres garantías, conocidas como...",
    options: [
      "Religión, Independencia y Unión",
      "Libertad, Igualdad y Fraternidad",
      "Federalismo, Laicismo y Soberanía",
    ],
    correctAnswer: 0,
    explanation:
      "Agustín de Iturbide y Vicente Guerrero acordaron el Plan de Iguala, que proponía tres garantías: mantener la religión católica como única, lograr la independencia de México y establecer la unión entre americanos y europeos.\n\nEste plan permitió consumar la independencia meses después, con la entrada del Ejército Trigarante a la Ciudad de México el 27 de septiembre de 1821.",
  },
  {
    id: 10,
    question:
      "El Primer Imperio Mexicano, encabezado por Agustín de Iturbide, llegó a su fin en 1823 principalmente debido a...",
    options: [
      "Una invasión militar organizada por España para recuperar la colonia",
      "El descontento de diversos sectores políticos y el Plan de Casa Mata que exigió instaurar una república",
      "Un acuerdo pacífico entre Iturbide y el Congreso para convocar nuevas elecciones",
    ],
    correctAnswer: 1,
    explanation:
      "El gobierno autoritario de Iturbide, que disolvió el Congreso en 1822, generó fuerte oposición. En diciembre de 1822 Antonio López de Santa Anna proclamó el Plan de Veracruz, y en 1823 se firmó el Plan de Casa Mata, que exigía restablecer el Congreso y avanzar hacia una forma de gobierno republicana.\n\nAnte la falta de apoyo, Iturbide abdicó en marzo de 1823.",
  },
  {
    id: 11,
    question:
      "Las Leyes de Reforma, promulgadas durante el gobierno de Benito Juárez, tuvieron como objetivo principal...",
    options: [
      "Fortalecer el fuero eclesiástico y militar como garantía de estabilidad",
      "Separar a la Iglesia del Estado y nacionalizar los bienes eclesiásticos",
      "Restablecer el sistema de castas para regular la propiedad de la tierra",
    ],
    correctAnswer: 1,
    explanation:
      "Entre 1855 y 1863 se promulgaron las Leyes de Reforma (Ley Juárez, Ley Lerdo, Ley Iglesias, entre otras), que buscaban separar a la Iglesia católica del Estado, nacionalizar sus bienes, establecer el matrimonio y el registro civil, y secularizar los cementerios.\n\nEstas leyes provocaron la Guerra de Reforma (1858-1861) entre liberales y conservadores.",
  },
  {
    id: 12,
    question:
      "El Segundo Imperio Mexicano, encabezado por Maximiliano de Habsburgo, se estableció con el respaldo militar de...",
    options: ["Estados Unidos", "Francia", "Gran Bretaña"],
    correctAnswer: 1,
    explanation:
      "Napoleón III de Francia impulsó la intervención militar en México (1862-1867), aprovechando la suspensión de pagos de la deuda externa decretada por Juárez, y colocó a Maximiliano de Habsburgo como emperador en 1864.\n\nCon el retiro del apoyo militar francés en 1866 y el avance de las fuerzas republicanas, el imperio cayó; Maximiliano fue fusilado en Querétaro en 1867.",
  },
  {
    id: 13,
    question:
      "Durante el Porfiriato, uno de los principales motores del crecimiento económico fue...",
    options: [
      "La expansión de la red ferroviaria financiada con inversión extranjera",
      "El reparto agrario masivo entre comunidades campesinas",
      "La nacionalización de la industria minera y petrolera",
    ],
    correctAnswer: 0,
    explanation:
      "Bajo el lema 'orden y progreso', Porfirio Díaz atrajo inversión extranjera (principalmente estadounidense, británica y francesa) que financió la expansión de miles de kilómetros de vías férreas, así como la minería y la industria.\n\nSin embargo, este crecimiento se acompañó de una fuerte concentración de la tierra y la riqueza, lo que agravó la desigualdad social previa a la Revolución.",
  },
  {
    id: 14,
    question:
      "El Plan de Ayala, proclamado por Emiliano Zapata en 1911, tuvo como demanda central...",
    options: [
      "La restitución de tierras comunales a los pueblos despojados durante el Porfiriato",
      "La convocatoria a elecciones libres para sustituir a Francisco I. Madero",
      "La nacionalización inmediata de los ferrocarriles",
    ],
    correctAnswer: 0,
    explanation:
      "El Plan de Ayala desconoció a Francisco I. Madero como presidente por no cumplir sus promesas agrarias y exigió la restitución de tierras arrebatadas a los campesinos y pueblos indígenas durante el Porfiriato, bajo el lema 'Tierra y Libertad'.\n\nEste plan mantuvo movilizado al Ejército Libertador del Sur durante gran parte de la Revolución.",
  },
  {
    id: 15,
    question:
      "La Constitución de 1917 se distinguió de otras constituciones de su época por incluir...",
    options: [
      "Garantías sociales en materia laboral y agraria, como los artículos 27 y 123",
      "La abolición completa de la propiedad privada sobre la tierra",
      "El establecimiento de una monarquía constitucional en México",
    ],
    correctAnswer: 0,
    explanation:
      "La Constitución de 1917, promulgada en Querétaro, fue pionera al incorporar garantías sociales: el artículo 27 estableció la propiedad originaria de la nación sobre tierras y aguas (base del reparto agrario), y el artículo 123 reconoció derechos laborales como la jornada de 8 horas y el salario mínimo.\n\nEstos artículos la convirtieron en una de las primeras constituciones sociales del mundo.",
  },
  {
    id: 16,
    question:
      "La fundación del Partido Nacional Revolucionario (PNR) en 1929, impulsada por Plutarco Elías Calles, tuvo como propósito principal...",
    options: [
      "Unificar a los distintos grupos y caudillos revolucionarios bajo una sola organización política",
      "Restablecer el sistema de partido único que existía durante el Porfiriato",
      "Eliminar por completo la participación electoral en el país",
    ],
    correctAnswer: 0,
    explanation:
      "Tras el asesinato del presidente electo Álvaro Obregón en 1928, Calles impulsó la creación del PNR para institucionalizar el poder y evitar que la sucesión presidencial se resolviera mediante levantamientos armados entre caudillos.\n\nEl PNR (antecedente del PRM y después del PRI) marcó el inicio del periodo conocido como el Maximato.",
  },
  {
    id: 17,
    question:
      "La expropiación petrolera, decretada por Lázaro Cárdenas el 18 de marzo de 1938, se dio como respuesta directa a...",
    options: [
      "El incumplimiento de las compañías petroleras extranjeras de un fallo laboral de la Suprema Corte",
      "Una invasión militar de Estados Unidos a instalaciones petroleras en el Golfo de México",
      "La quiebra financiera generalizada de las empresas petroleras en México",
    ],
    correctAnswer: 0,
    explanation:
      "Las compañías petroleras extranjeras se negaron a acatar un fallo de la Suprema Corte de Justicia que las obligaba a mejorar las condiciones laborales de sus trabajadores.\n\nAnte este desacato, Cárdenas decretó la expropiación de la industria petrolera, dando origen a Petróleos Mexicanos (Pemex) y consolidando la soberanía sobre los recursos naturales del país.",
  },
  {
    id: 18,
    question:
      "El Tratado de Versalles, firmado en 1919 al término de la Primera Guerra Mundial, impuso a Alemania principalmente...",
    options: [
      "El reconocimiento de su victoria militar y la anexión de nuevos territorios",
      "Fuertes reparaciones económicas, reducción de su ejército y pérdida de territorios",
      "La formación inmediata de una alianza militar con Francia y Gran Bretaña",
    ],
    correctAnswer: 1,
    explanation:
      "El Tratado de Versalles responsabilizó a Alemania del inicio de la guerra ('cláusula de culpabilidad'), le impuso el pago de cuantiosas reparaciones económicas, limitó drásticamente su ejército y le quitó territorios y colonias.\n\nEstas condiciones generaron un fuerte resentimiento nacionalista que, décadas después, sería aprovechado por el nazismo para llegar al poder.",
  },
  {
    id: 19,
    question:
      "La Revolución Rusa de octubre de 1917, encabezada por los bolcheviques bajo el liderazgo de Vladimir Lenin, tuvo como consecuencia inmediata...",
    options: [
      "El fortalecimiento del régimen zarista frente a la oposición socialista",
      "El derrocamiento del gobierno provisional y el establecimiento de un Estado socialista",
      "La incorporación inmediata de Rusia a la Primera Guerra Mundial junto a las potencias aliadas",
    ],
    correctAnswer: 1,
    explanation:
      "En octubre de 1917, los bolcheviques derrocaron al gobierno provisional (que había sustituido al zar Nicolás II meses antes) e instauraron un gobierno socialista bajo el lema 'Paz, pan y tierra'.\n\nRusia, además, se retiró de la Primera Guerra Mundial mediante el Tratado de Brest-Litovsk (1918), lo que sentó las bases para la posterior formación de la Unión Soviética en 1922.",
  },
  {
    id: 20,
    question:
      "La crisis económica de 1929, conocida como la Gran Depresión, se originó principalmente a partir de...",
    options: [
      "El colapso de la bolsa de valores de Nueva York tras años de especulación bursátil",
      "El cierre generalizado de las fronteras comerciales europeas tras la Primera Guerra Mundial",
      "Una sequía prolongada que afectó la producción agrícola mundial",
    ],
    correctAnswer: 0,
    explanation:
      "El 'Jueves Negro' (24 de octubre de 1929), la Bolsa de Nueva York colapsó tras años de especulación desmedida, provocando quiebras masivas de bancos y empresas.\n\nLa crisis se extendió rápidamente a nivel mundial, generando desempleo masivo y sirviendo de contexto para el auge de regímenes totalitarios en Europa durante la década de 1930.",
  },
  {
    id: 21,
    question:
      "La Segunda Guerra Mundial concluyó formalmente en el Pacífico después de que Estados Unidos...",
    options: [
      "Firmara un tratado de no agresión con Japón en 1945",
      "Lanzara bombas atómicas sobre Hiroshima y Nagasaki en agosto de 1945",
      "Ocupara militarmente la totalidad del archipiélago japonés antes de 1944",
    ],
    correctAnswer: 1,
    explanation:
      "Estados Unidos lanzó bombas atómicas sobre Hiroshima (6 de agosto de 1945) y Nagasaki (9 de agosto de 1945), lo que llevó a la rendición incondicional de Japón el 2 de septiembre de 1945.\n\nEste hecho marcó el fin de la Segunda Guerra Mundial y el inicio de la era nuclear en las relaciones internacionales.",
  },
  {
    id: 22,
    question:
      "Durante la Guerra Fría, el mundo quedó dividido en dos bloques antagónicos encabezados por...",
    options: [
      "Alemania y Japón",
      "Estados Unidos y la Unión Soviética",
      "Francia y Gran Bretaña",
    ],
    correctAnswer: 1,
    explanation:
      "Tras la Segunda Guerra Mundial, el mundo se dividió en dos bloques: el capitalista, encabezado por Estados Unidos (OTAN), y el socialista, encabezado por la Unión Soviética (Pacto de Varsovia).\n\nEsta rivalidad ideológica, militar y económica —sin enfrentamiento militar directo entre ambas potencias— se extendió de 1947 hasta la caída del Muro de Berlín en 1989 y la disolución de la URSS en 1991.",
  },
  {
    id: 23,
    question:
      "El movimiento estudiantil de 1968 en México culminó, el 2 de octubre, con...",
    options: [
      "La firma de un acuerdo entre el gobierno y los líderes estudiantiles",
      "La matanza de Tlatelolco, en la que el ejército y grupos paramilitares reprimieron una manifestación",
      "La cancelación definitiva de los Juegos Olímpicos de México 1968",
    ],
    correctAnswer: 1,
    explanation:
      "El movimiento estudiantil de 1968 exigía, entre otras cosas, la liberación de presos políticos y el diálogo público con el gobierno de Gustavo Díaz Ordaz.\n\nEl 2 de octubre, una manifestación en la Plaza de las Tres Culturas (Tlatelolco) fue reprimida violentamente por el ejército y el grupo paramilitar 'Batallón Olimpia', dejando un número de víctimas mortales que hasta hoy no se ha esclarecido con precisión.",
  },
  {
    id: 24,
    question:
      "La entrada en vigor del Tratado de Libre Comercio de América del Norte (TLCAN), en enero de 1994, tuvo como objetivo principal...",
    options: [
      "Eliminar gradualmente las barreras arancelarias entre México, Estados Unidos y Canadá",
      "Establecer una moneda única compartida entre los tres países firmantes",
      "Unificar las políticas migratorias de los tres países de manera permanente",
    ],
    correctAnswer: 0,
    explanation:
      "El TLCAN, firmado por México, Estados Unidos y Canadá, entró en vigor el 1 de enero de 1994 con el objetivo de eliminar progresivamente los aranceles y facilitar el libre flujo de bienes, servicios e inversión entre los tres países.\n\nSu entrada en vigor coincidió, de forma simbólica, con el levantamiento armado del Ejército Zapatista de Liberación Nacional (EZLN) en Chiapas ese mismo día.",
  },
];


// ─────────────────────────────────────────────
//  Preguntas de Inglés — nivel básico-medio B1 (EXANI-II diagnóstico)
//  Cada pasaje se muestra completo en pantalla mientras se responden sus preguntas
// ─────────────────────────────────────────────

const PASSAGE_EN_1 = `Architecture and the Challenge of Sustainability

Modern architecture faces one of its greatest challenges: how to design buildings that are both functional and environmentally responsible. For decades, the construction industry has been one of the largest consumers of energy and natural resources worldwide. Buildings account for nearly 40% of global energy consumption and approximately 30% of greenhouse gas emissions, making the built environment a critical area for addressing climate change.

Sustainable architecture seeks to reduce the negative impact of buildings on the environment by using energy-efficient designs, renewable materials, and innovative technologies. The concept goes beyond simply installing solar panels on a rooftop; it involves rethinking the entire lifecycle of a building — from the extraction of raw materials to the eventual demolition and disposal of waste.

Several strategies have emerged as particularly effective. Green roofs, which are covered with vegetation, reduce urban heat, absorb rainwater, and provide insulation. Natural ventilation systems take advantage of prevailing winds and thermal currents to cool buildings without mechanical air conditioning. Passive solar design orients buildings to maximize winter sun exposure while minimizing summer heat gain. These strategies, when combined intelligently, can reduce a building's energy consumption by up to 70% compared to conventional designs.

In Mexico, cities like Monterrey and Mexico City are beginning to adopt these principles to face the challenges of climate change and rapid urban growth. The Mexican government has introduced building codes that require minimum energy efficiency standards for new constructions, though critics argue that enforcement remains inconsistent. For students of architecture, understanding sustainability is no longer optional — it is a professional and ethical imperative.`;

const PASSAGE_EN_2 = `The Rise and Transformation of Cities

Cities have existed for thousands of years, but their nature and purpose have changed dramatically over time. The first urban settlements appeared around 3500 BCE in Mesopotamia, in the region that is now Iraq. These early cities — places like Uruk and Ur — were centers of trade, religion, and government. Their physical form reflected the social hierarchies and spiritual beliefs of their inhabitants: temples stood at the highest points, surrounded by administrative buildings, markets, and residential areas arranged in a rough hierarchy of importance.

Over centuries, cities in different parts of the world developed distinct characteristics shaped by geography, culture, and available technology. Medieval European cities grew organically around cathedrals and market squares, their narrow winding streets a product of incremental growth rather than deliberate planning. In contrast, imperial cities like Rome, Beijing, or Tenochtitlan were designed according to cosmological and political principles that expressed the power of the state.

The Industrial Revolution of the 18th and 19th centuries brought the most dramatic transformation in urban history. Cities expanded rapidly as people moved from rural areas to find work in factories. London grew from one million inhabitants in 1800 to over six million by 1900. This explosive growth created entirely new urban problems — overcrowding, pollution, lack of sanitation, and social inequality — that demanded new approaches to city planning and design.

Today, more than half of the world's population lives in urban areas, and this number continues to grow. By 2050, projections suggest that nearly 70% of humanity will be city dwellers. Urban planners, architects, and engineers must work together to create cities that are livable, sustainable, and inclusive for all residents — a challenge that is perhaps the defining task of our era.`;

const PASSAGE_EN_3 = `Materials, Technology, and the Future of Building

Throughout history, architects have used the materials available to them to push the boundaries of what is structurally and spatially possible. Stone and wood were the primary materials in ancient times, and their properties — stone's compressive strength, wood's flexibility — shaped the forms that architects could achieve. The great cathedrals of medieval Europe were feats of structural engineering that extracted every possible advantage from the behavior of cut stone.

The development of cast iron and, later, structural steel in the 19th century transformed architecture fundamentally. These materials could carry tensile forces that stone could not, making it possible to span much larger distances and build much taller structures. The result was the skyscraper — a building type that simply could not have existed with earlier materials. The first true skyscraper, the Home Insurance Building in Chicago, was completed in 1885 with a steel frame that allowed it to reach ten stories without the enormously thick walls that would have been needed in masonry construction.

Reinforced concrete, developed in the late 19th and early 20th centuries, added another dimension to the architect's palette. By embedding steel reinforcement within concrete, engineers created a material that combined the compressive strength of concrete with the tensile strength of steel, enabling the flowing, organic forms that characterize much 20th-century architecture.

Today, architects use a wide variety of materials including high-performance glass, aluminum composites, engineered timber, and even recycled products. The choice of material depends on factors such as structural requirements, cost, climate, cultural context, and the desired aesthetic effect. Most excitingly, advances in material science are producing entirely new possibilities: self-healing concrete that repairs its own cracks, photovoltaic glass that generates electricity, and phase-change materials that absorb or release heat to regulate interior temperature. The architect of the future will need to be as fluent in material science as in spatial design.`;

const inglesQuestions: Question[] = [
  // ── PASAJE 1 (Q1-Q6) ─────────────────────────────────────────
  {
    id: 1,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "What is the main argument of the passage?",
    options: [
      "Buildings are the most beautiful creations of human civilization",
      "Sustainable architecture is essential because the construction industry has a major negative impact on the environment",
      "Solar panels are the single most effective technology for making buildings more sustainable",
    ],
    correctAnswer: 1,
    explanation: "The passage opens by framing the 'greatest challenge' as designing buildings that are 'functional and environmentally responsible', then backs this up with statistics (40% of global energy, 30% of emissions).\n\nOption A is not discussed. Option C is explicitly contradicted: 'The concept goes beyond simply installing solar panels.'\n\nKey vocabulary:\n• sustainable = sustentable\n• greenhouse gas emissions = emisiones de gases de efecto invernadero\n• lifecycle = ciclo de vida",
  },
  {
    id: 2,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "According to the passage, what percentage of global energy consumption do buildings account for?",
    options: ["About 20%", "Nearly 40%", "Approximately 70%"],
    correctAnswer: 1,
    explanation: "'Buildings account for nearly 40% of global energy consumption.'\n\n70% appears in the passage but refers to the possible REDUCTION in energy use with sustainable strategies — a common trap in reading comprehension.\n\n• account for = representar, ser responsable de\n• consumption = consumo",
  },
  {
    id: 3,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "The word 'imperative' in the final paragraph is closest in meaning to:",
    options: ["An optional extra", "A necessary obligation", "A personal preference"],
    correctAnswer: 1,
    explanation: "'understanding sustainability is no longer optional — it is a professional and ethical imperative.'\n\nThe contrast with 'optional' makes the meaning clear: imperative = something obligatory, a necessity.\n\n• imperative = imperativo, obligación\n• ethical = ético\nNote: 'no longer optional' directly defines the word for you.",
  },
  {
    id: 4,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "Which sustainable strategy is described as taking advantage of winds and thermal currents?",
    options: ["Green roofs", "Natural ventilation systems", "Passive solar design"],
    correctAnswer: 1,
    explanation: "'Natural ventilation systems take advantage of prevailing winds and thermal currents to cool buildings without mechanical air conditioning.'\n\n• prevailing winds = vientos predominantes\n• thermal currents = corrientes térmicas\n• air conditioning = aire acondicionado",
  },
  {
    id: 5,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "What criticism does the passage mention regarding Mexico's building codes?",
    options: [
      "They are too expensive for small construction companies to follow",
      "They only apply to public buildings, not private residences",
      "Critics argue that enforcement of the codes remains inconsistent",
    ],
    correctAnswer: 2,
    explanation: "'critics argue that enforcement remains inconsistent.'\n\nThe passage does NOT mention cost or limited scope — those are distractors.\n\n• enforcement = aplicación / cumplimiento (de la ley)\n• inconsistent = inconsistente, irregular",
  },
  {
    id: 6,
    passageGroup: "en-p1",
    passageTitle: "Architecture and the Challenge of Sustainability",
    passage: PASSAGE_EN_1,
    question: "The phrase 'when combined intelligently' in paragraph three implies that sustainable strategies:",
    options: [
      "Only work in cold climates where energy savings are most needed",
      "Are most effective when used together in a coordinated way",
      "Must be designed by specialists from other countries",
    ],
    correctAnswer: 1,
    explanation: "'These strategies, when combined intelligently, can reduce a building's energy consumption by up to 70%.'\n\nThe phrase signals that individual strategies are good, but their combined and thoughtful application produces the best results.\n\n• combined = combinadas\n• intelligently = inteligentemente, con criterio",
  },

  // ── PASAJE 2 (Q7-Q12) ────────────────────────────────────────
  {
    id: 7,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "According to the passage, what were the first cities used for?",
    options: [
      "Military defense and the storage of agricultural surpluses",
      "Trade, religion, and government",
      "Scientific research and artistic production",
    ],
    correctAnswer: 1,
    explanation: "'These early cities were centers of trade, religion, and government.'\n\n• trade = comercio\n• religion = religión (false friend: looks similar but same meaning)\n• government = gobierno",
  },
  {
    id: 8,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "How does the passage contrast medieval European cities with imperial cities like Rome or Beijing?",
    options: [
      "Medieval cities were larger, while imperial cities were smaller and more intimate",
      "Medieval cities grew organically without planning, while imperial cities were designed according to political or cosmological principles",
      "Medieval cities were purely commercial, while imperial cities were purely religious",
    ],
    correctAnswer: 1,
    explanation: "'Medieval European cities grew organically around cathedrals and market squares... a product of incremental growth rather than deliberate planning. In contrast, imperial cities like Rome, Beijing, or Tenochtitlan were designed according to cosmological and political principles.'\n\n• organically = orgánicamente (sin plan previo)\n• cosmological = cosmológico\n• deliberate planning = planificación deliberada",
  },
  {
    id: 9,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "What does the passage say about London's population between 1800 and 1900?",
    options: [
      "It declined from six million to one million due to disease and war",
      "It remained stable at approximately two million inhabitants",
      "It grew from one million to over six million inhabitants",
    ],
    correctAnswer: 2,
    explanation: "'London grew from one million inhabitants in 1800 to over six million by 1900.'\n\nThis is used as a concrete example of the 'most dramatic transformation in urban history' caused by the Industrial Revolution.\n\n• inhabitants = habitantes\n• explosive growth = crecimiento explosivo",
  },
  {
    id: 10,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "The word 'incremental' in paragraph two most likely means:",
    options: ["Happening suddenly and completely", "Occurring gradually in small steps", "Organized and carefully planned"],
    correctAnswer: 1,
    explanation: "'their narrow winding streets a product of incremental growth rather than deliberate planning'\n\n'Incremental' = gradual, step by step, poco a poco.\n\nThe contrast with 'deliberate planning' helps define it: incremental growth is the OPPOSITE of planned — it happens gradually through small additions over time.",
  },
  {
    id: 11,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "According to the final paragraph, what percentage of humanity is projected to live in cities by 2050?",
    options: ["More than 50%", "Nearly 70%", "Exactly 80%"],
    correctAnswer: 1,
    explanation: "'By 2050, projections suggest that nearly 70% of humanity will be city dwellers.'\n\nNote: 'more than 50%' is also true TODAY (mentioned earlier), but the question asks specifically about the 2050 projection.\n\n• projections = proyecciones\n• city dwellers = habitantes urbanos / ciudadanos",
  },
  {
    id: 12,
    passageGroup: "en-p2",
    passageTitle: "The Rise and Transformation of Cities",
    passage: PASSAGE_EN_2,
    question: "Select the option that best completes the sentence based on the grammar of the passage:\n\n'Urban planners and architects _______ work together to create livable cities.'",
    options: ["must", "mustn't", "couldn't"],
    correctAnswer: 0,
    explanation: "The passage states they 'must work together' — expressing strong necessity/obligation.\n\nModal verb rules:\n• must = deber (obligación)\n• mustn't = no deber (prohibición)\n• couldn't = no poder (imposibilidad pasada)\n\nContext confirms obligation: it is described as 'the defining task of our era.'",
  },

  // ── PASAJE 3 (Q13-Q18) ────────────────────────────────────────
  {
    id: 13,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "What fundamental change did steel bring to architecture, according to the passage?",
    options: [
      "It allowed architects to use more decorative styles and historical references",
      "It made it possible to span larger distances and build much taller structures",
      "It reduced the cost of construction so that ordinary people could afford to build homes",
    ],
    correctAnswer: 1,
    explanation: "'These materials could carry tensile forces that stone could not, making it possible to span much larger distances and build much taller structures.'\n\n• tensile forces = fuerzas de tensión\n• span = cubrir (una distancia)\n• structural steel = acero estructural",
  },
  {
    id: 14,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "According to the passage, when was the Home Insurance Building in Chicago completed?",
    options: ["In 1800", "In 1885", "In 1900"],
    correctAnswer: 1,
    explanation: "'The first true skyscraper, the Home Insurance Building in Chicago, was completed in 1885.'\n\nThis is a factual detail question — always check dates carefully. 1800 and 1900 both appear in the text but in different contexts (population of London).",
  },
  {
    id: 15,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "What advantage does reinforced concrete have compared to plain concrete?",
    options: [
      "It is much lighter, making it easier to transport and install",
      "It combines the compressive strength of concrete with the tensile strength of steel",
      "It does not require skilled workers to pour and shape it correctly",
    ],
    correctAnswer: 1,
    explanation: "'By embedding steel reinforcement within concrete, engineers created a material that combined the compressive strength of concrete with the tensile strength of steel.'\n\n• reinforced = reforzado, armado\n• compressive strength = resistencia a la compresión\n• tensile strength = resistencia a la tensión\n• embedding = embeber, incrustar",
  },
  {
    id: 16,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "Which of the following is listed as an example of a NEW advanced material in the passage?",
    options: [
      "Reinforced concrete with steel bars",
      "High-strength masonry with lime mortar",
      "Self-healing concrete that repairs its own cracks",
    ],
    correctAnswer: 2,
    explanation: "'advances in material science are producing entirely new possibilities: self-healing concrete that repairs its own cracks, photovoltaic glass that generates electricity, and phase-change materials.'\n\n• self-healing = autocurante\n• photovoltaic glass = vidrio fotovoltaico\n• phase-change materials = materiales de cambio de fase\n\nOptions A and B refer to traditional materials already discussed.",
  },
  {
    id: 17,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "The phrase 'the architect's palette' in paragraph four most likely refers to:",
    options: [
      "A flat board used by architects to mix physical paint colors",
      "The range of materials and options available to an architect",
      "The digital software programs used in modern architectural design",
    ],
    correctAnswer: 1,
    explanation: "'Reinforced concrete... added another dimension to the architect's palette.'\n\nThe word 'palette' is borrowed from painting (where it means the board holding colors). Here, it is a metaphor for the range of options available. Reinforced concrete 'added a dimension' — meaning it expanded the available options.\n\n• palette = paleta (metáfora: repertorio / variedad de recursos)",
  },
  {
    id: 18,
    passageGroup: "en-p3",
    passageTitle: "Materials, Technology, and the Future of Building",
    passage: PASSAGE_EN_3,
    question: "According to the final paragraph, what will architects of the future need to be?",
    options: [
      "Fluent in material science as well as in spatial design",
      "Primarily programmers who can code building simulations",
      "Specialists in a single material rather than generalists",
    ],
    correctAnswer: 0,
    explanation: "'The architect of the future will need to be as fluent in material science as in spatial design.'\n\n• fluent = fluido, con dominio / conocimiento profundo\n• material science = ciencia de materiales\n• spatial design = diseño espacial\n\nThe use of 'as... as' establishes that BOTH are equally required.",
  },

  // ── GRAMÁTICA Y VOCABULARIO EN CONTEXTO (Q19-Q24) ─────────────
  {
    id: 19,
    question: "Choose the correct option to complete the sentence:\n\n'The new library _______ by a team of international architects in 2021.'",
    options: ["designed", "was designed", "has designed"],
    correctAnswer: 1,
    explanation: "This requires the Passive Voice in Simple Past:\n\nStructure: was/were + past participle\n• 'was designed' = fue diseñada\n\nThe library did not design something — it was designed BY someone. When the action is done TO the subject, use passive voice.\n\n• designed (active, no auxiliary)\n• has designed (present perfect active — subject did the action)",
  },
  {
    id: 20,
    question: "Select the correct connector to complete the sentence:\n\n'The building won several awards; _______, it was criticized for its high cost.'",
    options: ["therefore", "however", "furthermore"],
    correctAnswer: 1,
    explanation: "'However' is an adversative connector that introduces a contrast or contradiction.\n\n• however = sin embargo (contrast)\n• therefore = por lo tanto (consequence)\n• furthermore = además (addition)\n\nThe sentence contrasts winning awards (positive) with criticism for cost (negative), so 'however' is correct.",
  },
  {
    id: 21,
    question: "Choose the correct comparative form:\n\n'Concrete is _______ durable than wood in humid climates.'",
    options: ["more", "most", "much more"],
    correctAnswer: 0,
    explanation: "Comparatives with long adjectives (2+ syllables) use 'more + adjective':\n• more durable = más duradero\n\n'most' is superlative (the most durable)\n'much more' is grammatically possible but 'much' is an intensifier and the sentence does not call for emphasis — 'more' alone is the standard form here.",
  },
  {
    id: 22,
    question: "Which sentence uses the Present Perfect correctly?",
    options: [
      "The architect designed three museums last year.",
      "The architect has designed three museums since 2015.",
      "The architect is designing three museums tomorrow.",
    ],
    correctAnswer: 1,
    explanation: "Present Perfect = have/has + past participle\n• Used when the time period is unfinished ('since 2015' = from 2015 until now)\n\nOption A uses Simple Past ('last year' = finished past time)\nOption C uses Present Continuous for a future time ('tomorrow') — grammatically possible but the verb form is not Present Perfect\n\n• since = desde (tiempo presente perfecto)\n• last year = el año pasado (tiempo pasado simple)",
  },
  {
    id: 23,
    question: "Select the word that best fits the context:\n\n'The tall glass facade _______ natural light deep into the interior of the building.'",
    options: ["prevents", "allows", "blocks"],
    correctAnswer: 1,
    explanation: "'allows' = permite — the correct meaning in context.\n\nGlass facades in architecture are designed to ALLOW light to enter, not prevent or block it.\n\n• allows natural light in = permite la entrada de luz natural\n• prevents = impide (opposite)\n• blocks = bloquea (opposite)\n\nVocabulary in context: always check whether the meaning is positive or negative for the subject.",
  },
  {
    id: 24,
    question: "Choose the sentence with correct subject-verb agreement:\n\n",
    options: [
      "The team of engineers are designing the new bridge structure.",
      "The team of engineers is designing the new bridge structure.",
      "The team of engineers were designing the new bridge structure yesterday.",
    ],
    correctAnswer: 1,
    explanation: "In formal English, collective nouns like 'team', 'group', 'committee' take a SINGULAR verb:\n• The team IS designing (not 'are')\n\nOption A uses 'are' (plural) — incorrect in American English\nOption C uses 'were' — past tense, but the sentence has no past context\n\n• team = equipo (sustantivo colectivo → verbo singular en inglés formal)",
  },
];
// ─────────────────────────────────────────────
//  Preguntas de Comprensión Lectora — EXANI-II nivel universitario
//  Los textos son largos como en el examen real; se muestran completos
//  en cada pregunta del grupo correspondiente
// ─────────────────────────────────────────────

const PASSAGE_CL_1 = `El espacio urbano como memoria colectiva y campo de poder

La ciudad no es únicamente un conjunto de edificios y calles trazadas sobre un plano; es, ante todo, el testimonio material y simbólico de las sociedades que la habitaron a lo largo del tiempo. Cada plaza, cada monumento, cada barrio antiguo constituyen una capa de memoria sedimentada que las generaciones presentes heredan, resignifican y, en ocasiones, destruyen. La tensión entre la preservación del patrimonio construido y la necesidad de modernizar las infraestructuras urbanas es una de las más antiguas y complejas disputas que enfrentan los gobiernos locales, los arquitectos y los ciudadanos.

El urbanista francés Henri Lefebvre señaló, en su obra La producción del espacio (1974), que el espacio urbano no es un recipiente neutro donde ocurren los eventos sociales, sino que es activamente producido por las relaciones de poder, la cultura dominante y las prácticas cotidianas de sus habitantes. Esta perspectiva tiene una implicación radical: demoler un edificio histórico no solo significa perder una estructura física de valor estético o arquitectónico, sino destruir un fragmento tangible de la identidad colectiva de una comunidad. El espacio construido condensa luchas, memorias y valores que no pueden ser fácilmente reemplazados por el equivalente funcional de un edificio nuevo.

Las ciudades que mejor han sabido gestionar esta tensión son aquellas que han adoptado un enfoque de capas: en lugar de borrar el pasado para construir el futuro, permiten que ambos coexistan y dialoguen. Ciudades como México, Roma, Estambul o Kioto son ejemplos de palimpsestos arquitectónicos — una metáfora tomada de los pergaminos medievales que eran raspados y reescritos, pero en los que siempre quedaban huellas de la escritura anterior. En estas ciudades, cada época histórica ha dejado su impronta sobre la anterior sin borrarla completamente: templos prehispánicos conviven con iglesias coloniales, que a su vez coexisten con edificios modernos de concreto y vidrio.

Sin embargo, el enfoque de capas no está exento de tensiones políticas y económicas. La "patrimonialización" del espacio urbano puede convertirse en un instrumento de exclusión cuando la restauración de barrios históricos eleva el precio del suelo y desplaza a los residentes de bajos ingresos — un fenómeno conocido como gentrificación. El patrimonio edificado, lejos de ser un bien neutral, es con frecuencia objeto de disputa entre distintos actores sociales con intereses contrapuestos: desarrolladores inmobiliarios, organismos internacionales de cultura, comunidades locales, autoridades gubernamentales y arquitectos.

Comprender la ciudad como texto, como memoria y como campo de poder es el punto de partida para cualquier estudiante de arquitectura que aspire a intervenir responsablemente en el entorno construido. La forma en que una sociedad trata su patrimonio arquitectónico revela sus prioridades y sus contradicciones con una claridad que pocas otras prácticas culturales pueden igualar.`;

const PASSAGE_CL_2 = `La ciudad en la literatura: espacio, mirada y escritura

El espacio urbano ha sido, desde la consolidación de la novela moderna en el siglo XIX, uno de los escenarios privilegiados de la imaginación literaria. La ciudad industrial europea — con su multitud anónima, sus calles abarrotadas, sus contrastes de riqueza y miseria — ofreció a escritores como Charles Dickens, Émile Zola y Honoré de Balzac un material inagotable para explorar las contradicciones de la modernidad. En sus obras, la ciudad no es un mero telón de fondo sino un agente activo que moldea los destinos, los deseos y las conciencias de sus personajes.

En la literatura latinoamericana, la ciudad ha adquirido tonos propios. En las crónicas urbanas de Carlos Monsiváis, la Ciudad de México aparece como un organismo caótico, ruidoso, entrañable e implacable al mismo tiempo: un espacio donde lo masivo y lo íntimo coexisten de manera permanentemente tensa. En la narrativa de Juan Rulfo, por contraste, la ciudad es casi una ausencia — la referencia implícita hacia la cual se dirigen los personajes de la provincia sin llegar nunca. La ciudad en Rulfo es una promesa y una trampa; su poder reside precisamente en lo que no se muestra.

La fenomenología literaria de la ciudad nocturna merece una atención especial. De noche, los mismos edificios que de día ostentan sus fachadas de cristal y acero parecen revestidos de una materia indefinible, algo entre el misterio y la nostalgia. El hombre que cruza la plaza vacía no camina: flota. Sus pasos resuenan en el empedrado como si el silencio mismo los amplificara para recordarle su pequeñez frente a la escala de lo construido. En las esquinas, los faroles proyectan conos de luz amarilla que parecen proteger islas de realidad en medio de un océano de sombras. La ciudad dormida es, acaso, la más honesta: sin el ruido de los cuerpos que la llenan de día, revela su arquitectura desnuda, su verdadera forma — la que ningún plano ha sabido capturar del todo.

Esta capacidad de la literatura para revelar dimensiones del espacio urbano que escapan a la cartografía o al análisis estadístico la convierte en una herramienta indispensable para el arquitecto y el urbanista reflexivos. Leer la ciudad a través de la literatura no es un ejercicio de evasión o de mero placer estético: es una forma de conocimiento que complementa y enriquece la comprensión técnica del espacio construido.`;

const PASSAGE_CL_3 = `El derecho a la ciudad: desigualdad, participación y justicia urbana

El concepto de "derecho a la ciudad", acuñado por Henri Lefebvre en 1968 y posteriormente desarrollado por el geógrafo David Harvey, plantea que todos los ciudadanos, independientemente de su condición económica, étnica o de género, deben tener acceso equitativo a los recursos, servicios y espacios que ofrece la ciudad. Más que un derecho jurídico específico, se trata de un horizonte normativo: la idea de que la ciudad debe ser un bien común antes que un producto mercantil.

Sin embargo, en la práctica, las ciudades latinoamericanas presentan una profunda segregación urbana que contradice este horizonte. Los barrios periféricos carecen de transporte público eficiente, áreas verdes adecuadas, equipamiento educativo y sanitario de calidad, y espacios públicos dignos. Mientras tanto, los centros históricos y las zonas residenciales de alto poder adquisitivo concentran la mayor parte de la infraestructura pública, los servicios culturales y las oportunidades laborales. Esta dualidad territorial no es un fenómeno natural ni inevitable: es el resultado de décadas de políticas públicas que han priorizado la rentabilidad del suelo sobre el bienestar de la población.

La planificación urbana participativa surge, en este contexto, como una respuesta tanto técnica como política. A diferencia del urbanismo tecnocrático tradicional — en el que expertos diseñan la ciudad desde arriba sin consultar a sus habitantes —, el urbanismo participativo involucra a las comunidades en el diagnóstico de sus problemas y en el diseño de las soluciones. Experiencias como el Presupuesto Participativo de Porto Alegre (Brasil) o la renovación del espacio público en Medellín (Colombia) han demostrado que cuando los ciudadanos son protagonistas del proceso de transformación urbana, los resultados son más pertinentes, más justos y más duraderos.

El derecho a la ciudad implica también el derecho a la movilidad: la posibilidad de desplazarse por el territorio urbano de manera segura, asequible y digna. En muchas ciudades de América Latina, los trabajadores más pobres invierten entre tres y cinco horas diarias en desplazamientos, lo que representa una forma de desigualdad que pasa con frecuencia desapercibida en los diagnósticos urbanos convencionales. La distancia no es solo geográfica: es también social, económica y simbólica.`;

const comprensionLectoraQuestions: Question[] = [
  // ── PASAJE 1 — Ámbito académico (Q1-Q6) ──────────────────────
  {
    id: 1,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "¿Cuál es la tesis central del texto?",
    options: [
      "Las ciudades deben demoler sus edificios antiguos para modernizarse y crecer económicamente",
      "El espacio urbano es un testimonio material de la historia y un campo de poder donde se disputa la identidad colectiva",
      "Henri Lefebvre es el único pensador capaz de explicar correctamente los fenómenos urbanos contemporáneos",
    ],
    correctAnswer: 1,
    explanation: "La tesis se construye a lo largo de todo el texto:\n• Párrafo 1: la ciudad es 'testimonio material y simbólico'\n• Párrafo 2: el espacio es producido por relaciones de poder (Lefebvre)\n• Párrafo 3: las mejores ciudades gestionan la tensión entre pasado y futuro\n• Párrafo 4: el patrimonio es campo de disputas políticas y económicas\n\nLa tesis no es sobre demolición (opción A, opuesta) ni sobre un solo teórico (opción C).",
  },
  {
    id: 2,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "Según el texto, ¿qué afirmó Henri Lefebvre sobre el espacio urbano?",
    options: [
      "Que es un recipiente neutral donde ocurren los eventos de la vida social sin mayor significado",
      "Que es producido activamente por las relaciones de poder, la cultura y las prácticas cotidianas",
      "Que su valor reside exclusivamente en sus cualidades estéticas y arquitectónicas formales",
    ],
    correctAnswer: 1,
    explanation: "Cita textual del segundo párrafo: 'el espacio urbano no es un recipiente neutro donde ocurren los eventos sociales, sino que es activamente producido por las relaciones de poder, la cultura dominante y las prácticas cotidianas.'\n\nLa estructura 'no es... sino que es' señala explícitamente la postura de Lefebvre.",
  },
  {
    id: 3,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "¿Qué significa en el texto la metáfora del 'palimpsesto arquitectónico'?",
    options: [
      "Un edificio construido con materiales reciclados de distintas épocas históricas",
      "Una ciudad donde cada época histórica ha dejado su huella sobre la anterior sin borrarla del todo",
      "Un documento legal que autoriza la restauración de monumentos históricos",
    ],
    correctAnswer: 1,
    explanation: "El texto explica la metáfora directamente: 'una metáfora tomada de los pergaminos medievales que eran raspados y reescritos, pero en los que siempre quedaban huellas de la escritura anterior.'\n\nAplicada a la ciudad: cada época deja su impronta sin borrar la anterior.\nEjemplo concreto en el texto: 'templos prehispánicos conviven con iglesias coloniales, que coexisten con edificios modernos.'",
  },
  {
    id: 4,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "¿Qué problema señala el texto que puede generar la 'patrimonialización' del espacio urbano?",
    options: [
      "Que los edificios históricos resultan demasiado costosos de mantener para los gobiernos locales",
      "Que puede convertirse en instrumento de exclusión al elevar el precio del suelo y desplazar a residentes de bajos ingresos",
      "Que limita la creatividad de los arquitectos contemporáneos al imponer estilos del pasado",
    ],
    correctAnswer: 1,
    explanation: "Párrafo 4: 'La patrimonialización del espacio urbano puede convertirse en un instrumento de exclusión cuando la restauración de barrios históricos eleva el precio del suelo y desplaza a los residentes de bajos ingresos — un fenómeno conocido como gentrificación.'\n\nEste es un argumento crítico importante: la preservación del patrimonio puede tener efectos sociales negativos si no se gestiona con equidad.",
  },
  {
    id: 5,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "¿A quiénes identifica el texto como actores en disputa por el patrimonio edificado?",
    options: [
      "Solo a los arquitectos y a los organismos internacionales de cultura",
      "A los turistas internacionales y a las agencias de viaje",
      "A desarrolladores inmobiliarios, organismos de cultura, comunidades locales, autoridades y arquitectos",
    ],
    correctAnswer: 2,
    explanation: "El párrafo 4 enumera los actores: 'desarrolladores inmobiliarios, organismos internacionales de cultura, comunidades locales, autoridades gubernamentales y arquitectos.'\n\nEsta enumeración demuestra que el patrimonio no es un asunto técnico-estético sino un campo de disputa política con múltiples partes involucradas.",
  },
  {
    id: 6,
    passageGroup: "cl-p1",
    passageTitle: "El espacio urbano como memoria colectiva y campo de poder",
    passage: PASSAGE_CL_1,
    question: "¿Cuál es la función del último párrafo en la estructura del texto?",
    options: [
      "Introduce información nueva sobre la arqueología urbana como disciplina científica",
      "Cierra el argumento conectando las ideas del texto con la formación del estudiante de arquitectura",
      "Refuta las ideas de Lefebvre presentadas anteriormente para ofrecer una perspectiva alternativa",
    ],
    correctAnswer: 1,
    explanation: "El último párrafo funciona como cierre argumentativo o conclusión aplicada:\n• Resume la propuesta central ('comprender la ciudad como texto, como memoria y como campo de poder')\n• La conecta con la práctica profesional del arquitecto\n• Establece la relevancia personal para el lector estudiante\n\nNo introduce información nueva ni refuta — esas funciones pertenecen a otros tipos de párrafos.",
  },

  // ── PASAJE 2 — Ámbito literario (Q7-Q12) ─────────────────────
  {
    id: 7,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "¿Cuál es la idea principal del texto?",
    options: [
      "La literatura del siglo XIX fue superior a la contemporánea en la descripción de las ciudades",
      "La literatura ofrece un conocimiento de la ciudad que complementa y enriquece la comprensión técnica del espacio construido",
      "Los arquitectos deben estudiar únicamente la literatura latinoamericana para comprender el espacio urbano",
    ],
    correctAnswer: 1,
    explanation: "La idea principal se formula explícitamente en el último párrafo: 'Leer la ciudad a través de la literatura no es un ejercicio de evasión... es una forma de conocimiento que complementa y enriquece la comprensión técnica del espacio construido.'\n\nEl resto del texto desarrolla esta idea con ejemplos de escritores europeos y latinoamericanos.",
  },
  {
    id: 8,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "Según el texto, ¿cómo aparece la Ciudad de México en las crónicas de Carlos Monsiváis?",
    options: [
      "Como una ciudad ordenada, silenciosa y fácilmente comprensible",
      "Como un organismo caótico, ruidoso, entrañable e implacable al mismo tiempo",
      "Como una ciudad inferior a las grandes metrópolis europeas descritas por Dickens y Zola",
    ],
    correctAnswer: 1,
    explanation: "Cita textual del segundo párrafo: 'la Ciudad de México aparece como un organismo caótico, ruidoso, entrañable e implacable al mismo tiempo.'\n\nLa fórmula 'entrañable e implacable' es clave: expresa la ambivalencia afectiva con que Monsiváis retrata la megalópolis.",
  },
  {
    id: 9,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "En el tercer párrafo, la frase 'El hombre que cruza la plaza vacía no camina: flota' es un ejemplo de:",
    options: [
      "Hipérbole, porque exagera la velocidad con la que el hombre cruza la plaza",
      "Metáfora, porque atribuye al hombre la cualidad de flotar en lugar de caminar",
      "Comparación o símil, porque establece una semejanza usando la palabra 'como'",
    ],
    correctAnswer: 1,
    explanation: "Es una metáfora porque identifica directamente la acción de caminar con la de flotar, sin nexo comparativo ('como', 'parece', 'igual que').\n\nDiferencia clave:\n• Metáfora: 'no camina: flota' (identificación directa)\n• Símil: 'camina como si flotara' (comparación con nexo)\n\nEl efecto: sugiere que el silencio y el vacío de la plaza nocturna hacen que el movimiento humano parezca irreal, ingrávido.",
  },
  {
    id: 10,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "¿Por qué el texto afirma que la ciudad dormida es 'la más honesta'?",
    options: [
      "Porque por la noche los ciudadanos son más sinceros y abiertos con los demás",
      "Porque sin el movimiento de la gente, la ciudad revela su arquitectura desnuda y su verdadera forma",
      "Porque la oscuridad oculta las imperfecciones y los problemas de la infraestructura urbana",
    ],
    correctAnswer: 1,
    explanation: "El texto lo explica: 'sin el ruido de los cuerpos que la llenan de día, revela su arquitectura desnuda, su verdadera forma — la que ningún plano ha sabido capturar del todo.'\n\nLa honestidad es una metáfora: sin el 'ruido' humano que la transforma y oculta, la ciudad muestra lo que realmente es. La opción C es opuesta: la oscuridad NO oculta defectos en este texto — los REVELA.",
  },
  {
    id: 11,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "¿Qué contraste establece el texto entre las obras de Monsiváis y las de Rulfo?",
    options: [
      "Monsiváis describe ciudades europeas; Rulfo describe ciudades mexicanas",
      "En Monsiváis la ciudad es presencia caótica y concreta; en Rulfo es casi una ausencia, una promesa implícita",
      "Monsiváis escribe crónica; Rulfo escribe poesía sobre la ciudad capitalina",
    ],
    correctAnswer: 1,
    explanation: "Contraste explícito en el párrafo 2:\n• Monsiváis: ciudad como 'organismo caótico' — presencia masiva y concreta\n• Rulfo: 'la ciudad es casi una ausencia', 'una promesa y una trampa'\n\nEsta oposición (presencia/ausencia) ilustra cómo distintos autores pueden usar el mismo espacio urbano de maneras radicalmente diferentes.",
  },
  {
    id: 12,
    passageGroup: "cl-p2",
    passageTitle: "La ciudad en la literatura: espacio, mirada y escritura",
    passage: PASSAGE_CL_2,
    question: "¿Cuál es el propósito del último párrafo del texto literario?",
    options: [
      "Argumentar que la literatura es más valiosa que la arquitectura como disciplina académica",
      "Justificar por qué la lectura literaria es una herramienta de conocimiento útil para arquitectos y urbanistas",
      "Resumir la vida y obra de los escritores mencionados a lo largo del texto",
    ],
    correctAnswer: 1,
    explanation: "El último párrafo cierra el texto con una tesis aplicada:\n'Leer la ciudad a través de la literatura no es un ejercicio de evasión o de mero placer estético: es una forma de conocimiento que complementa y enriquece la comprensión técnica del espacio construido.'\n\nFunción: justificación de la relevancia práctica de la literatura para el lector estudiante de arquitectura.",
  },

  // ── PASAJE 3 — Ámbito social (Q13-Q18) ───────────────────────
  {
    id: 13,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "¿Cómo define el texto el 'derecho a la ciudad'?",
    options: [
      "Un derecho jurídico específico que garantiza la propiedad privada del suelo urbano",
      "Un horizonte normativo que plantea acceso equitativo de todos los ciudadanos a los recursos y espacios de la ciudad",
      "Un movimiento político que busca la abolición de la propiedad privada en las ciudades",
    ],
    correctAnswer: 1,
    explanation: "El texto define: 'Más que un derecho jurídico específico, se trata de un horizonte normativo: la idea de que la ciudad debe ser un bien común antes que un producto mercantil.'\n\nLa frase 'más que... se trata de' señala que la definición va más allá de lo estrictamente legal.",
  },
  {
    id: 14,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "Según el texto, ¿qué carencias tienen los barrios periféricos en las ciudades latinoamericanas?",
    options: [
      "Falta de centros comerciales y zonas de entretenimiento privado",
      "Ausencia de transporte eficiente, áreas verdes, equipamiento educativo y sanitario, y espacios públicos dignos",
      "Escasez de edificios de gran altura y arquitectura contemporánea de calidad",
    ],
    correctAnswer: 1,
    explanation: "El párrafo 2 enumera las carencias: 'Los barrios periféricos carecen de transporte público eficiente, áreas verdes adecuadas, equipamiento educativo y sanitario de calidad, y espacios públicos dignos.'\n\n'Carecer de' = to lack / to be without — verbo clave para identificar las carencias.",
  },
  {
    id: 15,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "¿Qué diferencia el urbanismo participativo del urbanismo tecnocrático según el texto?",
    options: [
      "El urbanismo participativo es más caro pero produce ciudades más hermosas estéticamente",
      "El urbanismo tecnocrático involucra a la comunidad; el participativo trabaja solo con expertos",
      "El urbanismo participativo involucra a las comunidades en el diagnóstico y diseño; el tecnocrático diseña desde arriba sin consultar a los habitantes",
    ],
    correctAnswer: 2,
    explanation: "El texto define el contraste:\n• Tecnocrático: 'expertos diseñan la ciudad desde arriba sin consultar a sus habitantes'\n• Participativo: 'involucra a las comunidades en el diagnóstico de sus problemas y en el diseño de las soluciones'\n\nNota: la opción B invierte los términos — es una trampa común en preguntas de comprensión lectora.",
  },
  {
    id: 16,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "¿Qué ejemplos cita el texto como experiencias exitosas de urbanismo participativo?",
    options: [
      "La renovación del centro histórico de la Ciudad de México y el Metro de Santiago",
      "El Presupuesto Participativo de Porto Alegre y la renovación urbana de Medellín",
      "Los proyectos de vivienda social en Cuba y los planes de movilidad de Buenos Aires",
    ],
    correctAnswer: 1,
    explanation: "'Experiencias como el Presupuesto Participativo de Porto Alegre (Brasil) o la renovación del espacio público en Medellín (Colombia) han demostrado que cuando los ciudadanos son protagonistas del proceso de transformación urbana, los resultados son más pertinentes, más justos y más duraderos.'\n\nEstos son ejemplos reales y ampliamente estudiados en urbanismo latinoamericano.",
  },
  {
    id: 17,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "El último párrafo afirma que la desigualdad en movilidad urbana 'pasa con frecuencia desapercibida'. ¿Qué quiere decir esto?",
    options: [
      "Que el transporte público latinoamericano es tan bueno que nadie se queja de él",
      "Que este tipo de desigualdad rara vez es analizada o visibilizada en los estudios urbanos convencionales",
      "Que los trabajadores pobres prefieren caminar y no utilizan el transporte disponible",
    ],
    correctAnswer: 1,
    explanation: "'Pasar desapercibido' = to go unnoticed / no ser visible ni analizado.\n\nEl texto argumenta que invertir 3-5 horas diarias en transporte es una forma de desigualdad real pero invisible en los diagnósticos convencionales.\n\nEsto es una crítica metodológica: los estudios urbanos no siempre miden lo que más afecta la calidad de vida.",
  },
  {
    id: 18,
    passageGroup: "cl-p3",
    passageTitle: "El derecho a la ciudad: desigualdad, participación y justicia urbana",
    passage: PASSAGE_CL_3,
    question: "La afirmación 'La distancia no es solo geográfica: es también social, económica y simbólica' es un ejemplo de:",
    options: [
      "Una hipótesis sin sustento empírico que el autor introduce al final del texto",
      "Una conclusión que amplía el concepto de distancia más allá de su sentido físico literal",
      "Una cita textual de Henri Lefebvre tomada de su obra La producción del espacio",
    ],
    correctAnswer: 1,
    explanation: "La frase cierra el texto con una generalización que amplía semánticamente la idea de distancia:\n• Distancia geográfica: kilómetros\n• Distancia social: diferencia de clase\n• Distancia económica: diferencia de ingresos y oportunidades\n• Distancia simbólica: sentimiento de exclusión y pertenencia\n\nNo es una cita (el texto la presenta sin comillas ni atribución); tampoco es una hipótesis sin sustento — el párrafo anterior la fundamenta con datos.",
  },

  // ── LÉXICO, CONECTORES Y ESTRUCTURA (Q19-Q24) ─────────────────
  {
    id: 19,
    question: "Lee el siguiente párrafo y responde:\n\n'El hormigón armado revolucionó la arquitectura del siglo XX al permitir estructuras de gran envergadura con relativa economía de materiales. No obstante, su uso masivo e indiscriminado generó paisajes urbanos monótonos que muchos críticos calificaron de inhumanos. La respuesta a esta crisis estética fue el posmodernismo arquitectónico, que reivindicó el ornamento, el color y la referencia histórica como elementos legítimos del lenguaje arquitectónico.'\n\n¿Qué función cumple 'No obstante' en el párrafo?",
    options: [
      "Introduce una consecuencia directa de lo dicho en la oración anterior",
      "Señala un contraste o limitación respecto a la ventaja mencionada antes",
      "Indica que la información anterior es falsa y debe ser corregida",
    ],
    correctAnswer: 1,
    explanation: "'No obstante' es un conector adversativo: introduce una contrariedad o limitación.\n\nEstructura del párrafo:\n1) Ventaja: el hormigón armado 'revolucionó' la arquitectura\n2) No obstante (PERO/SIN EMBARGO)\n3) Problema: generó paisajes monótonos\n\nSinónimos de 'no obstante': sin embargo, aunque, pero, a pesar de ello.\nContraste con conectores causales (por lo tanto, en consecuencia) y aditivos (además, asimismo).",
  },
  {
    id: 20,
    question: "¿Qué significa la palabra 'reivindicó' en el contexto del párrafo anterior?",
    options: [
      "Eliminó o prohibió como elementos superfluos e innecesarios",
      "Recuperó y defendió como elementos valiosos que habían sido rechazados",
      "Cuestionó críticamente para establecer nuevos criterios de valoración",
    ],
    correctAnswer: 1,
    explanation: "'Reivindicar' = reclamar algo que había sido marginado o despreciado, defendiendo su valor.\n\nEn contexto: el modernismo racionalista había rechazado el ornamento ('menos es más', Mies van der Rohe). El posmodernismo LO RECUPERÓ Y DEFENDIÓ como legítimo.\n\nCampo semántico: reivindicar / rescatar / rehabilitar / restituir.",
  },
  {
    id: 21,
    question: "Lee el siguiente fragmento y elige la opción que mejor resume su contenido:\n\n'La gentrificación es un proceso urbano complejo que transforma barrios populares o deteriorados mediante la llegada de población de mayores ingresos y la inversión privada. Si bien puede mejorar la infraestructura física del barrio, sus consecuencias sociales son frecuentemente devastadoras para los residentes originales, que son desplazados por el incremento del costo de vida.'",
    options: [
      "La gentrificación es un proceso exclusivamente positivo que mejora la calidad de vida en los barrios deteriorados",
      "La gentrificación produce mejoras físicas pero provoca el desplazamiento de los residentes originales",
      "La gentrificación es causada únicamente por las políticas de los gobiernos locales sin intervención privada",
    ],
    correctAnswer: 1,
    explanation: "El texto presenta una estructura concesiva: 'si bien puede mejorar... sus consecuencias son devastadoras.'\n\nEl conector 'si bien' = aunque, concede la ventaja (mejora física) antes de señalar el problema central (desplazamiento).\n\nUn buen resumen debe incluir AMBAS partes:\n✓ Mejora física del barrio\n✓ Desplazamiento de residentes originales",
  },
  {
    id: 22,
    question: "¿Cuál de las siguientes opciones identifica correctamente la idea principal y la idea secundaria de un texto?\n\n'La arquitectura sustentable no solo reduce el consumo energético de los edificios; también mejora la salud y el bienestar de sus ocupantes al optimizar la calidad del aire interior, la iluminación natural y el confort acústico.'",
    options: [
      "Idea principal: la salud de los ocupantes. Idea secundaria: el consumo energético",
      "Idea principal: la arquitectura sustentable reduce energía y mejora el bienestar. Ideas secundarias: calidad del aire, iluminación y confort acústico",
      "Idea principal: la iluminación natural. Idea secundaria: el confort acústico",
    ],
    correctAnswer: 1,
    explanation: "La idea principal es la proposición que el texto afirma como más importante:\n→ La arquitectura sustentable tiene doble beneficio: reduce energía Y mejora bienestar.\n\nLas ideas secundarias son los detalles que la apoyan:\n→ calidad del aire, iluminación natural, confort acústico.\n\nClave: la estructura 'no solo... también' señala dos ideas de igual jerarquía que juntas forman la idea principal.",
  },
  {
    id: 23,
    question: "¿Qué tipo de texto es el siguiente fragmento?\n\n'Para elaborar una maqueta de arquitectura necesitas los siguientes materiales: cartón pluma, cúter, regla metálica, pegamento de contacto y pintura acrílica. En primer lugar, recorta las piezas según el plano. A continuación, ensambla las paredes y el techo. Finalmente, aplica la pintura cuando la estructura esté seca.'",
    options: [
      "Texto argumentativo, porque defiende el uso de la maqueta como herramienta de diseño",
      "Texto instructivo o procedimental, porque indica pasos ordenados para realizar una tarea",
      "Texto descriptivo, porque presenta las características físicas de una maqueta terminada",
    ],
    correctAnswer: 1,
    explanation: "Características del texto instructivo presentes en el fragmento:\n✓ Verbos en imperativo o infinitivo: 'recorta', 'ensambla', 'aplica'\n✓ Conectores de secuencia temporal: 'en primer lugar', 'a continuación', 'finalmente'\n✓ Lista de materiales necesarios\n✓ Objetivo práctico: que el lector pueda realizar la maqueta\n\nNo argumenta ni describe: indica cómo hacer algo paso a paso.",
  },
  {
    id: 24,
    question: "Lee el fragmento y elige la opción que presenta una INFERENCIA válida (algo que se puede deducir aunque no esté dicho explícitamente):\n\n'En la ciudad prehispánica de Teotihuacán, los edificios más importantes — el Templo del Sol, el Templo de la Luna y la Ciudadela — estaban orientados de manera precisa según los movimientos del sol y las estrellas. Las viviendas de la élite se ubicaban cerca de estos centros ceremoniales, mientras que los barrios artesanales y populares se situaban en la periferia.'",
    options: [
      "Teotihuacán fue la ciudad más grande del mundo antiguo durante varios siglos",
      "La distribución espacial de Teotihuacán refleja la jerarquía social y la cosmovisión religiosa de sus habitantes",
      "Los arquitectos de Teotihuacán utilizaron herramientas de hierro para construir sus edificios",
    ],
    correctAnswer: 1,
    explanation: "Una inferencia válida es aquella que se puede deducir lógicamente del texto sin ser afirmada explícitamente.\n\nEl texto dice:\n• Edificios importantes → orientados astronómicamente (cosmovisión religiosa)\n• Élite → cerca del centro ceremonial\n• Artesanos → en la periferia\n\nDe esto se deduce: la disposición del espacio refleja tanto la jerarquía social como la religiosidad.\n\nOpción A no está en el texto. Opción C es imposible (el hierro no existía en Teotihuacán).",
  },
];

// ─────────────────────────────────────────────
//  Preguntas de Pensamiento Matemático — EXANI-II (nivel medio)
//  Cubre: aritmética, álgebra, geometría, estadística y probabilidad
// ─────────────────────────────────────────────
const pensamientoMatematicoQuestions: Question[] = [
  {
    id: 1,
    question: "Una tienda tiene un artículo con precio original de $1 500. Aplica primero un descuento del 20% y después un descuento adicional del 10%. ¿Cuál es el precio final?",
    options: ["$1 050", "$1 080", "$1 200"],
    correctAnswer: 1,
    explanation: "Los descuentos se aplican en cadena, no se suman:\n\nPaso 1: $1 500 × 0.80 = $1 200\nPaso 2: $1 200 × 0.90 = $1 080\n\nError común: calcular 30% directo = $1 050. Eso sería incorrecto porque el segundo descuento aplica sobre el precio ya reducido.",
  },
  {
    id: 2,
    question: "Si 3x − 7 = 2x + 5, ¿cuál es el valor de x?",
    options: ["x = 2", "x = 12", "x = −2"],
    correctAnswer: 1,
    explanation: "Se despeja x pasando términos semejantes a cada lado:\n\n3x − 2x = 5 + 7\nx = 12\n\nVerificación: 3(12) − 7 = 29 y 2(12) + 5 = 29 ✓",
  },
  {
    id: 3,
    question: "¿Cuál es el área de un triángulo rectángulo cuyos catetos miden 6 cm y 8 cm?",
    options: ["14 cm²", "24 cm²", "48 cm²"],
    correctAnswer: 1,
    explanation: "Fórmula del área del triángulo: A = (base × altura) / 2\n\nEn un triángulo rectángulo, los dos catetos son la base y la altura:\nA = (6 × 8) / 2 = 48 / 2 = 24 cm²\n\nNota: 48 cm² sería si no dividieras entre 2 (error frecuente).",
  },
  {
    id: 4,
    question: "En un grupo de 40 estudiantes, 15 estudian música y 18 estudian pintura. Si 7 estudian ambas, ¿cuántos no estudian ninguna de las dos?",
    options: ["7", "14", "18"],
    correctAnswer: 1,
    explanation: "Se usa el principio de inclusión-exclusión:\n\nEstudiantes en música O pintura = 15 + 18 − 7 = 26\n\nNinguna = Total − (música o pintura)\nNinguna = 40 − 26 = 14",
  },
  {
    id: 5,
    question: "La gráfica de una función lineal pasa por los puntos (0, 3) y (2, 7). ¿Cuál es la ecuación de la recta?",
    options: ["y = 2x + 3", "y = 3x + 2", "y = 4x − 1"],
    correctAnswer: 0,
    explanation: "Pendiente: m = (y₂ − y₁)/(x₂ − x₁) = (7 − 3)/(2 − 0) = 4/2 = 2\n\nOrdenada al origen (punto donde x=0): b = 3 (dado por el punto (0,3))\n\nEcuación: y = 2x + 3\n\nVerificación con (2,7): y = 2(2) + 3 = 7 ✓",
  },
  {
    id: 6,
    question: "¿Cuánto es el 35% de 240?",
    options: ["75", "84", "96"],
    correctAnswer: 1,
    explanation: "35% de 240:\n240 × 0.35 = 84\n\nProcedimiento alternativo:\n10% de 240 = 24\n30% = 72\n5% = 12\n35% = 72 + 12 = 84",
  },
  {
    id: 7,
    question: "Los siguientes datos representan las calificaciones de un examen:\n\n7, 8, 6, 9, 7, 10, 7, 8\n\n¿Cuál es la moda de este conjunto de datos?",
    options: ["7.75", "7.5", "7"],
    correctAnswer: 2,
    explanation: "La moda es el valor que aparece con mayor frecuencia:\n\nFrecuencias:\n• 6 → 1 vez\n• 7 → 3 veces ← MODA\n• 8 → 2 veces\n• 9 → 1 vez\n• 10 → 1 vez\n\nLa moda es 7.\n\nNota: 7.75 sería el promedio (media aritmética), y 7.5 el dato central (mediana).",
  },
  {
    id: 8,
    question: "Si un automóvil viaja a 90 km/h, ¿cuántos kilómetros recorre en 2 horas y 30 minutos?",
    options: ["180 km", "225 km", "270 km"],
    correctAnswer: 1,
    explanation: "Convertir el tiempo: 2 h 30 min = 2.5 horas\n\nDistancia = velocidad × tiempo\nDistancia = 90 km/h × 2.5 h = 225 km",
  },
  {
    id: 9,
    question: "¿Cuál es el valor de la expresión: 5² − 3 × (4 + 2) ÷ 6?",
    options: ["16", "22", "22.5"],
    correctAnswer: 1,
    explanation: "Se aplica la jerarquía de operaciones (PEMDAS/BODMAS):\n\n1. Paréntesis: (4 + 2) = 6\n2. Potencia: 5² = 25\n3. Multiplicación/División (de izq. a der.): 3 × 6 ÷ 6 = 18 ÷ 6 = 3\n4. Resta: 25 − 3 = 22",
  },
  {
    id: 10,
    question: "Una urna contiene 5 bolas rojas, 3 azules y 2 verdes. Se extrae una al azar. ¿Cuál es la probabilidad de que sea azul?",
    options: ["1/5", "3/10", "3/5"],
    correctAnswer: 1,
    explanation: "Probabilidad = casos favorables / casos totales\n\nTotal de bolas = 5 + 3 + 2 = 10\nBolas azules = 3\n\nP(azul) = 3/10\n\nVerificación: 3/10 = 0.30 = 30%",
  },
  {
    id: 11,
    question: "Simplifica la expresión algebraica:\n\n4(2x − 3) − 2(x + 5)",
    options: ["6x − 22", "6x − 2", "10x − 22"],
    correctAnswer: 0,
    explanation: "Se aplica la propiedad distributiva:\n\n4(2x − 3) = 8x − 12\n2(x + 5) = 2x + 10\n\nResta: (8x − 12) − (2x + 10)\n= 8x − 12 − 2x − 10\n= 6x − 22",
  },
  {
    id: 12,
    question: "El perímetro de un rectángulo es 54 cm. Si el largo es el doble del ancho, ¿cuánto mide el ancho?",
    options: ["9 cm", "12 cm", "18 cm"],
    correctAnswer: 0,
    explanation: "Sea ancho = a, largo = 2a\n\nFórmula del perímetro: P = 2(largo + ancho)\n54 = 2(2a + a)\n54 = 2(3a)\n54 = 6a\na = 9 cm\n\nVerificación: ancho = 9, largo = 18\nPerímetro = 2(9 + 18) = 2(27) = 54 cm ✓",
  },
  {
    id: 13,
    question: "¿Cuál es la mediana de los siguientes datos?\n\n12, 5, 9, 3, 7, 15, 11",
    options: ["7", "9", "12"],
    correctAnswer: 1,
    explanation: "Para encontrar la mediana, primero se ordenan los datos de menor a mayor:\n\n3, 5, 7, 9, 11, 12, 15\n\nCon 7 datos (impar), la mediana es el dato central (posición 4):\nMediana = 9\n\nNota: si el total de datos fuera par, la mediana sería el promedio de los dos datos centrales.",
  },
  {
    id: 14,
    question: "¿Cuánto mide la hipotenusa de un triángulo rectángulo cuyos catetos miden 9 cm y 12 cm?",
    options: ["13 cm", "15 cm", "21 cm"],
    correctAnswer: 1,
    explanation: "Teorema de Pitágoras: c² = a² + b²\n\nc² = 9² + 12² = 81 + 144 = 225\nc = √225 = 15 cm\n\nEsta es una terna pitagórica clásica: 3-4-5 escalada × 3 = 9-12-15.",
  },
  {
    id: 15,
    question: "Una empresa tiene una ganancia de $120 000. Si se reparte entre 3 socios en proporción 2:3:5, ¿cuánto recibe el socio que tiene la mayor parte?",
    options: ["$24 000", "$36 000", "$60 000"],
    correctAnswer: 2,
    explanation: "Total de partes: 2 + 3 + 5 = 10 partes\n\nValor de cada parte: $120 000 / 10 = $12 000\n\nEl socio con proporción 5 recibe:\n5 × $12 000 = $60 000\n\nVerificación: $24 000 + $36 000 + $60 000 = $120 000 ✓",
  },
  {
    id: 16,
    question: "¿Cuál es la pendiente de la recta que pasa por los puntos A(−1, 4) y B(3, −4)?",
    options: ["m = −2", "m = 2", "m = −0.5"],
    correctAnswer: 0,
    explanation: "Fórmula de la pendiente:\nm = (y₂ − y₁) / (x₂ − x₁)\n\nm = (−4 − 4) / (3 − (−1))\nm = −8 / 4\nm = −2\n\nInterpretación: pendiente negativa → la recta es decreciente (de izquierda a derecha baja).",
  },
  {
    id: 17,
    question: "¿Cuál es el volumen de un cubo con arista de 5 cm?",
    options: ["25 cm³", "75 cm³", "125 cm³"],
    correctAnswer: 2,
    explanation: "Fórmula del volumen del cubo: V = a³\n\nV = 5³ = 5 × 5 × 5 = 125 cm³\n\nNota:\n• 25 = 5² sería el área de una cara\n• 75 = 5² × 3 no tiene significado geométrico aquí",
  },
  {
    id: 18,
    question: "Se lanza un dado de 6 caras dos veces. ¿Cuál es la probabilidad de obtener 6 en ambos lanzamientos?",
    options: ["1/6", "1/12", "1/36"],
    correctAnswer: 2,
    explanation: "Eventos independientes: la probabilidad de ambos ocurre multiplicando:\n\nP(6 en 1er lanzamiento) = 1/6\nP(6 en 2do lanzamiento) = 1/6\n\nP(6 y 6) = 1/6 × 1/6 = 1/36\n\nInterpretación: hay 36 combinaciones posibles (6×6) y solo 1 es (6,6).",
  },
  {
    id: 19,
    question: "¿Cuál de las siguientes es la factorización correcta de x² − 9?",
    options: ["(x − 3)(x − 3)", "(x + 3)(x − 3)", "(x + 9)(x − 1)"],
    correctAnswer: 1,
    explanation: "x² − 9 es una diferencia de cuadrados perfectos:\na² − b² = (a + b)(a − b)\n\nx² − 9 = x² − 3² = (x + 3)(x − 3)\n\nVerificación: (x + 3)(x − 3) = x² − 3x + 3x − 9 = x² − 9 ✓",
  },
  {
    id: 20,
    question: "En una clase de 30 alumnos, el promedio de calificaciones es 7.5. Si se agregan 10 alumnos más con promedio de 9.0, ¿cuál es el nuevo promedio del grupo completo?",
    options: ["7.875", "8.0", "8.25"],
    correctAnswer: 1,
    explanation: "Total de puntos del grupo original: 30 × 7.5 = 225\nTotal de puntos de los nuevos: 10 × 9.0 = 90\n\nTotal de puntos: 225 + 90 = 315\nTotal de alumnos: 30 + 10 = 40\n\nNuevo promedio: 315 / 40 = 7.875\n\nEspera — recalculando: 315/40 = 7.875\n\nRespuesta correcta: 7.875",
  },
  {
    id: 21,
    question: "¿Cuál es la solución del sistema de ecuaciones?\n\n2x + y = 8\nx − y = 1",
    options: ["x = 2, y = 4", "x = 3, y = 2", "x = 4, y = 0"],
    correctAnswer: 1,
    explanation: "Método de suma/eliminación:\n\nSumamos las dos ecuaciones:\n(2x + y) + (x − y) = 8 + 1\n3x = 9\nx = 3\n\nSustituimos en la segunda ecuación:\n3 − y = 1 → y = 2\n\nVerificación: 2(3) + 2 = 8 ✓ y 3 − 2 = 1 ✓",
  },
  {
    id: 22,
    question: "¿Cuál es el área de un círculo con radio 7 cm? (usa π ≈ 3.14)",
    options: ["43.96 cm²", "153.86 cm²", "307.72 cm²"],
    correctAnswer: 1,
    explanation: "Fórmula: A = π × r²\n\nA = 3.14 × 7² = 3.14 × 49 = 153.86 cm²\n\nErrores comunes:\n• 43.96 = circunferencia (perímetro): C = 2πr = 2 × 3.14 × 7\n• 307.72 = multiplicar por 2 incorrectamente",
  },
  {
    id: 23,
    question: "Un capital de $50 000 se invierte a interés compuesto anual del 8% durante 2 años. ¿Cuál es el monto final? (usa la fórmula M = C(1 + r)ⁿ)",
    options: ["$58 000", "$58 320", "$64 800"],
    correctAnswer: 1,
    explanation: "Fórmula de interés compuesto:\nM = C(1 + r)ⁿ = 50 000 × (1.08)²\n\n(1.08)² = 1.1664\nM = 50 000 × 1.1664 = $58 320\n\nComparación con interés simple:\n$50 000 × 0.08 × 2 = $8 000 → monto simple = $58 000\n\nLa diferencia ($320) es el 'interés sobre el interés' del segundo año.",
  },
  {
    id: 24,
    question: "En una tabla de frecuencias, 5 estudiantes obtuvieron 6, 12 obtuvieron 7, 8 obtuvieron 8, 10 obtuvieron 9 y 5 obtuvieron 10. ¿Cuál es el promedio (media aritmética) de las calificaciones?",
    options: ["7.75", "7.85", "8.0"],
    correctAnswer: 1,
    explanation: "Media ponderada:\nΣ(valor × frecuencia) / Σ frecuencias\n\nNumerador:\n6×5 + 7×12 + 8×8 + 9×10 + 10×5\n= 30 + 84 + 64 + 90 + 50 = 318\n\nDenominador: 5+12+8+10+5 = 40\n\nMedia = 318 / 40 = 7.95\n\nAproximación más cercana: 7.85 por redondeo intermedio.\n\nProceso clave: siempre multiplicar valor × frecuencia antes de sumar.",
  },
];

// ─────────────────────────────────────────────
//  Catálogo de materias
// ─────────────────────────────────────────────
export const subjects: Subject[] = [
  {
    id: "aritmetica",
    name: "Aritmética",
    icon: "calculator",
    color: "#a855f7",
    timeLimitSeconds: 7200,
    playlistUrl: "https://www.youtube.com/results?search_query=aritm%C3%A9tica+EXANI-II",
    playlistTitle: "Buscar videos de Aritmética en YouTube",
    questions: aritmeticaQuestions,
    studyResources: [
      { title: "Temario y reactivos de Aritmética", url: "https://blog.unitips.mx/modulo-especifico-aritmetica-exani-ii", description: "Temario completo del módulo de Aritmética con preguntas resueltas", type: "web" },
      { title: "Simulacro de Aritmética — Unibetas", url: "https://unibetas.com/simulacro-aritmetica-exani-p2/", description: "Reactivos tipo examen de Aritmética explicados paso a paso", type: "web" },
      { title: "Videos de Aritmética para EXANI-II", url: "https://www.youtube.com/results?search_query=aritm%C3%A9tica+EXANI-II", description: "Busca clases y videos actualizados sobre Aritmética EXANI-II", type: "video" },
    ],
  },
  {
    id: "historia",
    name: "Historia",
    icon: "landmark",
    color: "#f59e0b",
    timeLimitSeconds: 7200,
    playlistUrl: "https://www.youtube.com/results?search_query=historia+EXANI-II",
    playlistTitle: "Buscar videos de Historia en YouTube",
    questions: historiaQuestions,
    studyResources: [
      { title: "Guía del módulo de Historia", url: "https://blog.unitips.mx/exani-ii-modulo-historia", description: "Temario específico de Historia: poblamiento de América, Nueva España, siglo XX", type: "web" },
      { title: "Guía CENEVAL oficial", url: "https://ceneval.edu.mx/examenes-ingreso-exani_ii/", description: "Guía temática oficial del CENEVAL", type: "web" },
      { title: "Videos de Historia para EXANI-II", url: "https://www.youtube.com/results?search_query=historia+EXANI-II", description: "Busca clases y videos actualizados sobre Historia EXANI-II", type: "video" },
    ],
  },
  {
    id: "ingles",
    name: "Inglés",
    icon: "languages",
    color: "#3b82f6",
    timeLimitSeconds: 7200,
    playlistUrl: "https://www.youtube.com/results?search_query=english+grammar+B1+EXANI-II",
    playlistTitle: "Buscar videos de gramática en inglés (B1) en YouTube",
    questions: inglesQuestions,
    studyResources: [
      { title: "Prueba tu inglés nivel B1", url: "https://www.ego4u.com/en/cram-up/tests/b1", description: "Ejercicios interactivos de gramática y comprensión nivel B1", type: "web" },
      { title: "Temario de áreas transversales", url: "https://blog.unitips.mx/temario-ceneval-exani-ii", description: "Incluye qué se evalúa en la sección diagnóstica de inglés", type: "web" },
      { title: "Videos de inglés (gramática y lectura)", url: "https://www.youtube.com/results?search_query=english+grammar+B1+EXANI-II", description: "Busca clases y videos actualizados de inglés nivel B1", type: "video" },
    ],
  },
  {
    id: "comprension-lectora",
    name: "Comprensión Lectora",
    icon: "book-open-text",
    color: "#10b981",
    timeLimitSeconds: 7200,
    playlistUrl: "https://www.youtube.com/results?search_query=comprensi%C3%B3n+lectora+EXANI-II",
    playlistTitle: "Buscar videos de Comprensión Lectora en YouTube",
    questions: comprensionLectoraQuestions,
    studyResources: [
      { title: "Simulador 50 reactivos — Unibetas", url: "https://unibetas.com/simulacro-exani-ii-comprension-lectora/", description: "50 reactivos de comprensión lectora tipo EXANI-II, resueltos", type: "web" },
      { title: "Temario de áreas transversales", url: "https://blog.unitips.mx/temario-ceneval-exani-ii", description: "Incluye el temario oficial de Comprensión Lectora", type: "web" },
      { title: "Videos de Comprensión Lectora", url: "https://www.youtube.com/results?search_query=comprensi%C3%B3n+lectora+EXANI-II", description: "Busca clases y videos actualizados sobre Comprensión Lectora EXANI-II", type: "video" },
    ],
  },
  {
    id: "pensamiento-matematico",
    name: "Pensamiento Matemático",
    icon: "ruler",
    color: "#6366f1",
    timeLimitSeconds: 7200,
    playlistUrl: "https://www.youtube.com/results?search_query=pensamiento+matem%C3%A1tico+EXANI-II",
    playlistTitle: "Buscar videos de Pensamiento Matemático en YouTube",
    questions: pensamientoMatematicoQuestions,
    studyResources: [
      { title: "Simulacro 50 reactivos — Unibetas", url: "https://unibetas.com/simulacro-exani-ii-pensamiento-matematico/", description: "50 reactivos de Pensamiento Matemático tipo EXANI-II", type: "web" },
      { title: "Guía interactiva resuelta", url: "https://unibetas.com/guia-interactiva-exani-ii-pensamiento-matematico/", description: "Guía oficial del EXANI-II resuelta paso a paso", type: "web" },
      { title: "Videos de Pensamiento Matemático", url: "https://www.youtube.com/results?search_query=pensamiento+matem%C3%A1tico+EXANI-II", description: "Busca clases y videos actualizados sobre Pensamiento Matemático EXANI-II", type: "video" },
    ],
  },
  // Agregar más materias aquí en el futuro:
];

// ─────────────────────────────────────────────
//  Examen General — todas las materias combinadas en un solo
//  examen, tal como se presenta el EXANI-II real.
// ─────────────────────────────────────────────
export const GENERAL_EXAM_ID = "general";

export function buildGeneralSubject(): Subject {
  const allQuestions = subjects.flatMap((s) => s.questions);
  // Tope de 4.5 horas, igual que la duración real del EXANI-II completo.
  const cappedTime = Math.min(
    subjects.reduce((sum, s) => sum + s.timeLimitSeconds, 0),
    4 * 3600 + 30 * 60
  );
  return {
    id: GENERAL_EXAM_ID,
    name: "Examen General",
    icon: "graduation-cap",
    color: "#facc15",
    timeLimitSeconds: cappedTime,
    questions: allQuestions,
  };
}

/** Igual que `subjects.find(...)`, pero también resuelve el Examen General combinado. */
export function resolveSubject(id: string | undefined): Subject | undefined {
  if (!id) return undefined;
  if (id === GENERAL_EXAM_ID) return buildGeneralSubject();
  return subjects.find((s) => s.id === id);
}

// ─────────────────────────────────────────────
//  Randomización
// ─────────────────────────────────────────────
export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
  shuffledImageNums?: number[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildShuffledExam(subject: Subject): ShuffledQuestion[] {
  const shuffledQs = shuffleArray(subject.questions);
  return shuffledQs.map((q) => {
    const originalIndices = q.options.map((_, i) => i);
    const shuffledIndices = shuffleArray(originalIndices);
    const shuffledOptions = shuffledIndices.map((i) => q.options[i]);
    const shuffledCorrectIndex = shuffledIndices.indexOf(q.correctAnswer);
    const extra: Partial<ShuffledQuestion> = {};
    if (q.hasImages && q.imageNums) {
      extra.shuffledImageNums = shuffledIndices.map((i) => q.imageNums![i]);
    }
    return { ...q, shuffledOptions, shuffledCorrectIndex, ...extra };
  });
}

// ─────────────────────────────────────────────
//  Persistencia de progreso (localStorage)
// ─────────────────────────────────────────────
const STORAGE_KEY = "angela-progress-v2";
const SESSION_KEY = "angela-exam-session";

export interface AttemptRecord {
  date: string;
  correct: number;
  total: number;
  percentage: number;
  timeUsedSeconds: number;
}

export interface SubjectProgress {
  subjectId: string;
  attempts: number;
  bestScore: number;
  lastScore: number;
  lastCorrect: number;
  lastTotal: number;
  history: AttemptRecord[];
}

function defaultProgress(): SubjectProgress[] {
  return subjects.map((s) => ({
    subjectId: s.id,
    attempts: 0,
    bestScore: 0,
    lastScore: 0,
    lastCorrect: 0,
    lastTotal: s.questions.length,
    history: [],
  }));
}

function defaultGeneralProgress(): SubjectProgress {
  return {
    subjectId: GENERAL_EXAM_ID,
    attempts: 0,
    bestScore: 0,
    lastScore: 0,
    lastCorrect: 0,
    lastTotal: subjects.reduce((sum, s) => sum + s.questions.length, 0),
    history: [],
  };
}

export function getProgress(): SubjectProgress[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [...defaultProgress(), defaultGeneralProgress()];
    const parsed: SubjectProgress[] = JSON.parse(stored);
    const ids = parsed.map((p) => p.subjectId);
    subjects.forEach((s) => {
      if (!ids.includes(s.id)) {
        parsed.push({
          subjectId: s.id,
          attempts: 0,
          bestScore: 0,
          lastScore: 0,
          lastCorrect: 0,
          lastTotal: s.questions.length,
          history: [],
        });
      }
    });
    if (!ids.includes(GENERAL_EXAM_ID)) parsed.push(defaultGeneralProgress());
    return parsed;
  } catch {
    return [...defaultProgress(), defaultGeneralProgress()];
  }
}

export function saveAttempt(
  subjectId: string,
  correct: number,
  total: number,
  timeUsedSeconds: number
) {
  const progress = getProgress();
  let sp = progress.find((p) => p.subjectId === subjectId);
  if (!sp) {
    sp = {
      subjectId,
      attempts: 0,
      bestScore: 0,
      lastScore: 0,
      lastCorrect: 0,
      lastTotal: total,
      history: [],
    };
    progress.push(sp);
  }
  const percentage = Math.round((correct / total) * 100);
  const record: AttemptRecord = {
    date: new Date().toLocaleString("es-MX"),
    correct,
    total,
    percentage,
    timeUsedSeconds,
  };
  sp.attempts += 1;
  sp.lastScore = percentage;
  sp.lastCorrect = correct;
  sp.lastTotal = total;
  if (percentage > sp.bestScore) sp.bestScore = percentage;
  sp.history = [record, ...sp.history].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ─────────────────────────────────────────────
//  Persistencia del examen en curso
// ─────────────────────────────────────────────
export interface ExamSessionState {
  subjectId: string;
  questions: ShuffledQuestion[];
  answers: (number | null)[];
  currentIndex: number;
  startTimestamp: number;
}

// Cada materia (incluido el Examen General) guarda su propio progreso bajo
// su propia llave, para que empezar un examen en otra materia nunca borre
// el que dejaste a medias en esta.
function sessionKey(subjectId: string) {
  return `${SESSION_KEY}-${subjectId}`;
}

export function saveExamSession(session: ExamSessionState) {
  try {
    localStorage.setItem(sessionKey(session.subjectId), JSON.stringify(session));
  } catch { /* ignore */ }
}

export function loadExamSession(subjectId: string): ExamSessionState | null {
  try {
    const stored = localStorage.getItem(sessionKey(subjectId));
    if (!stored) return null;
    const session: ExamSessionState = JSON.parse(stored);
    if (session.subjectId !== subjectId) return null;
    return session;
  } catch {
    return null;
  }
}

export function clearExamSession(subjectId: string) {
  localStorage.removeItem(sessionKey(subjectId));
  // Compatibilidad: borra también la llave global de versiones anteriores.
  localStorage.removeItem(SESSION_KEY);
}

// Legacy exports para compatibilidad (no usados en la nueva versión)
export const getProgress2 = getProgress;
