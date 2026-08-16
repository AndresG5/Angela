import { motion } from "motion/react";

/**
 * Vincent dándole la bienvenida a Angela cuando entra a la sección de
 * Mapa Conceptual. Mismo lenguaje visual que CoralinePanel (retrato +
 * globo de diálogo), pero con acento gris/plata en vez del azul de la
 * Puerta Secreta, para que se sienta como su propio personaje.
 */
export function VincentWelcome({
  message = "Ah, Angela... bienvenida a mis dominios. Aquí cada idea encuentra su lugar en la oscuridad.",
}: {
  message?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end gap-2.5 w-full mb-4"
    >
      {/* Retrato de Vincent */}
      <motion.div
        className="relative flex-shrink-0 rounded-2xl overflow-hidden"
        style={{
          width: 72,
          aspectRatio: "189 / 267",
          border: "2px solid rgba(203,203,213,0.45)",
          boxShadow:
            "0 0 16px rgba(148,148,168,0.35), 0 8px 18px rgba(0,0,0,0.55)",
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/vincent/vincent_bienvenida.png"
          alt="Vincent"
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).style.visibility = "hidden";
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 55%, rgba(120,120,140,0.18) 100%)",
          }}
        />
      </motion.div>

      {/* Globo de diálogo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
        className="relative flex-1 px-3.5 py-2.5 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,18,28,0.95) 0%, rgba(45,41,58,0.95) 100%)",
          border: "1.5px solid rgba(203,203,213,0.4)",
          boxShadow: "0 0 18px rgba(148,148,168,0.22)",
        }}
      >
        <p className="text-gray-100 text-[12px] sm:text-sm italic leading-snug">
          "{message}"
        </p>
        <div
          className="absolute -bottom-1.5 left-4 w-3 h-3 rotate-45"
          style={{
            background: "rgba(45,41,58,0.95)",
            borderLeft: "1.5px solid rgba(203,203,213,0.4)",
            borderBottom: "1.5px solid rgba(203,203,213,0.4)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
