// TiggerMotivation.tsx
// Tigger aparece en la esquina de StudyResources con una imagen y un mensaje.
// Cada sección de estudio muestra una imagen y frase diferente.

export interface TiggerPrompt {
  id: 1 | 2 | 3 | 4;
  image: string;          // ruta a /images/TiggerN.png
  lines: string[];
}

export const TIGGER_PROMPTS: TiggerPrompt[] = [
  {
    id: 1,
    image: "/images/Tigger1.png",
    lines: [
      "¡Ooooh, Angelaaa! ¡Tú puedes con estooo!",
      "¡Los días difíciles también se rebotan! ¡Boing boing!",
      "A veces el cerebro se cansa, pero eso no significa que no seas increíble.",
      "¡Paso a paso, rebote a rebote, sigues avanzando!",
    ],
  },
  {
    id: 2,
    image: "/images/Tigger2.png",
    lines: [
      "¡Nada de rendirse ahora!",
      "Cada intento cuenta, cada esfuerzo suma y cada poquito que haces hoy ayuda al 'Angela del futuro'.",
      "¡Y eso es suuuper importante!",
    ],
  },
  {
    id: 3,
    image: "/images/Tigger3.png",
    lines: [
      "¡Respira, estírate y sigue adelante!",
      "No necesitas hacerlo perfecto, solo seguir brincando hacia adelante.",
      "¡Porque las personas valientes no son las que nunca se cansan… son las que siguen aunque estén cansadas! ¡Boing!",
    ],
  },
  {
    id: 4,
    image: "/images/Tigger4.png",
    lines: [
      "¡Angelaaa, confía en ti!",
      "Puede que hoy se sienta pesado, pero mira todo lo que ya has logrado.",
      "¡Eres más fuerte de lo que crees y más capaz de lo que imaginas!",
      "Hasta los grandes rebotadores descansan un poquito antes del siguiente salto.",
      "¡Así que sigue adelante con energía, sonrisas y un súper rebote de victoriaaa!",
    ],
  },
];
