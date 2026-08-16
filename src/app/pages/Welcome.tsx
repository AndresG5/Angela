import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Moon, TwistedTree, FloatingStars } from "../components/BurtonDecorations";
import { Moon as MoonIcon, Sparkles, Sparkle } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] flex flex-col items-center justify-center p-6 overflow-hidden relative">

      {/* ── Fondo decorativo ── */}
      <FloatingStars className="absolute top-0 left-0 w-full h-full opacity-30" />
      <TwistedTree className="absolute bottom-0 left-4 w-20 h-32 opacity-35" />
      <TwistedTree className="absolute bottom-0 right-8 w-28 h-44 opacity-25 scale-x-[-1]" />
      <Moon className="absolute top-10 right-12 w-20 h-20" />

      {/* Estrellitas flotantes extra */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            backgroundColor: i % 3 === 0 ? "#c4b5fd" : "#818cf8",
            top: `${8 + i * 11}%`,
            left: `${4 + i * 12}%`,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.5, 0.8] }}
          transition={{ duration: 2.2 + i * 0.35, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}

      {/* ── Escena principal: Po + globo ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">

        {/* Contenedor Po + burbuja (en fila) */}
        <div className="flex items-end justify-center w-full mb-2" style={{ minHeight: 200 }}>

          {/* ─ Po ─ */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.1 }}
            className="relative flex-shrink-0"
            style={{ width: 148, zIndex: 2 }}
          >
            {/* Resplandor mágico bajo Po */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-xl"
              style={{ backgroundColor: "#7c3aed" }}
              animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />

            {/* Imagen de Po sin fondo */}
            <motion.img
              src="/images/Po_bienvenida.png"
              alt="Po saludando"
              className="w-full"
              style={{ filter: "drop-shadow(0 0 14px rgba(139,92,246,0.55))" }}
              animate={{
                y: [0, -9, 0, -5, 0],
                rotate: [0, -2.5, 2.5, -1.5, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* ─ Globo de diálogo que sale desde Po ─ */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 15, delay: 0.55 }}
            className="relative mb-10 ml-2 flex-shrink-0"
            style={{ zIndex: 3, maxWidth: 190 }}
          >
            {/* Cola triangular apuntando HACIA ABAJO-IZQUIERDA (desde la boca de Po) */}
            <div
              className="absolute"
              style={{
                bottom: -10,
                left: 18,
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "12px solid rgba(109, 40, 217, 0.7)",
              }}
            />
            {/* Sombra de la cola */}
            <div
              className="absolute"
              style={{
                bottom: -12,
                left: 19,
                width: 0,
                height: 0,
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderTop: "11px solid rgba(0,0,0,0.25)",
                zIndex: -1,
              }}
            />

            {/* Burbuja */}
            <div
              className="relative px-5 py-4 rounded-2xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(13,8,38,0.95) 0%, rgba(55,23,97,0.95) 100%)",
                border: "2px solid rgba(139,92,246,0.6)",
                boxShadow:
                  "0 0 28px rgba(139,92,246,0.4), inset 0 0 18px rgba(88,28,135,0.25), 0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              {/* Fases lunares decorativas */}
              <div className="flex justify-center gap-1 mb-2 opacity-55">
                {[0.25, 0.4, 0.55, 0.7, 0.85].map((op, i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [op * 0.5, 1, op * 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
                  >
                    <MoonIcon size={11} className="text-purple-300" style={{ opacity: op }} />
                  </motion.span>
                ))}
              </div>

              {/* Texto principal */}
              <motion.p
                className="text-white font-extrabold text-xl leading-tight"
                animate={{
                  textShadow: [
                    "0 0 6px rgba(216,180,254,0.4)",
                    "0 0 16px rgba(216,180,254,0.9)",
                    "0 0 6px rgba(216,180,254,0.4)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                ¡Hola, Angela!
              </motion.p>

              {/* Subtexto dentro del globo */}
              <p className="text-purple-300 text-xs mt-1 opacity-80 leading-tight flex items-center justify-center gap-1">
                <span>¡Yo te ayudo a<br />prepararte!</span>
                <Sparkles size={12} className="flex-shrink-0" />
              </p>

              {/* Estrellitas de esquina */}
              <motion.span
                className="absolute top-1.5 right-2 text-purple-400"
                animate={{ rotate: [0, 360], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <Sparkle size={11} />
              </motion.span>
              <motion.span
                className="absolute bottom-1.5 left-2 text-purple-400 opacity-50"
                animate={{ rotate: [360, 0], opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              >
                <Sparkle size={10} />
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Texto de presentación */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="text-center text-purple-200/90 text-sm mb-8 px-2 leading-relaxed"
        >
          Tu compañero de estudio para el{" "}
          <span className="font-bold text-purple-300">EXANI-II</span>
        </motion.p>

        {/* Botón Comenzar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15 }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate("/menu")}
            className="relative px-12 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-3xl transition-all duration-300"
            style={{
              boxShadow: "0 8px 0 #4c1d95, 0 12px 28px rgba(139,92,246,0.45)",
              border: "3px solid #7c3aed",
            }}
          >
            <motion.span
              className="text-2xl font-bold block"
              animate={{
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.2)",
                  "0 0 15px rgba(255,255,255,0.7)",
                  "0 0 5px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ¡Comenzar!
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Frase inferior */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-7 text-xs text-purple-300/50 italic text-center flex items-center justify-center gap-1.5"
        >
          "Estudiar puede ser divertido... ¡y un poco extraño!"
          <Sparkles size={11} className="flex-shrink-0" />
        </motion.p>
      </div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
