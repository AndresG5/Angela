import {
  Calculator,
  Landmark,
  Languages,
  BookOpenText,
  Ruler,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  landmark: Landmark,
  languages: Languages,
  "book-open-text": BookOpenText,
  ruler: Ruler,
  "graduation-cap": GraduationCap,
};

/** Traduce la clave de ícono de una materia (guardada en los datos) a un ícono SVG. */
export function SubjectIcon({
  icon,
  size = 24,
  className,
}: {
  icon: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Calculator;
  return <Icon size={size} className={className} />;
}
