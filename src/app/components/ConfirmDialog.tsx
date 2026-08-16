import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, HelpCircle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Estilo de advertencia (rojo) para acciones irreversibles, vs. neutro (morado) para decisiones normales. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Reemplazo temático de window.confirm(): mismo fondo morado degradado,
 * tarjeta redondeada y tipografía que el resto de la app, en vez del
 * cuadro de diálogo genérico del navegador.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Sí, continuar",
  cancelLabel = "Cancelar",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#241b3d] border rounded-3xl p-5 text-center relative overflow-hidden"
            style={{
              borderColor: danger ? "rgba(239,68,68,0.35)" : "rgba(168,85,247,0.3)",
              boxShadow: danger
                ? "0 20px 50px -12px rgba(239,68,68,0.35)"
                : "0 20px 50px -12px rgba(168,85,247,0.35)",
            }}
          >
            {/* Resplandor decorativo de fondo, mismo lenguaje visual que el resto de la app */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: danger ? "rgba(239,68,68,0.18)" : "rgba(168,85,247,0.18)" }}
            />

            <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-purple-300/60 hover:text-purple-200 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.div
              animate={{ rotate: [0, -4, 4, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 relative z-10"
              style={{
                backgroundColor: danger ? "rgba(239,68,68,0.15)" : "rgba(168,85,247,0.15)",
                border: `1px solid ${danger ? "rgba(239,68,68,0.35)" : "rgba(168,85,247,0.35)"}`,
              }}
            >
              {danger ? (
                <AlertTriangle className="text-red-300" size={24} />
              ) : (
                <HelpCircle className="text-purple-300" size={24} />
              )}
            </motion.div>

            {title && (
              <h3 className="text-white font-bold text-base mb-1.5 relative z-10">{title}</h3>
            )}
            <p className="text-purple-200/80 text-sm leading-relaxed mb-5 relative z-10">
              {message}
            </p>

            <div className="flex gap-2.5 relative z-10">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-2xl font-semibold text-purple-200 text-sm bg-gray-800/60 border border-purple-500/25 hover:bg-gray-700/60 transition-all active:scale-95"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                style={{
                  backgroundColor: danger ? "#ef4444cc" : "#a855f7cc",
                  border: `2px solid ${danger ? "#ef4444" : "#a855f7"}`,
                  boxShadow: `0 4px 0 ${danger ? "#ef444460" : "#a855f760"}`,
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
