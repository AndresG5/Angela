import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { FloatingStars, CurvedSpiral } from "../components/BurtonDecorations";
import { CoralinePanel } from "../components/CoralinePanel";
import { PortalSequence } from "../components/PortalSequence";
import { BlueDoor } from "../components/BlueDoor";
import { ConstructionCurtain, hasSeenDoorReveal } from "../components/ConstructionCurtain";
import { VincentDelivery } from "../components/VincentDelivery";
import { getCoralineStep } from "../data/coraline";
import { ArrowLeft, DoorOpen, DoorClosed, Lock, Eye, EyeOff } from "lucide-react";

const PASSWORD = "PanzonaForever02";

export default function Letter() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [portalActive, setPortalActive] = useState(false);
  const [showCurtain, setShowCurtain] = useState(() => !hasSeenDoorReveal());
  const [showVincentDelivery, setShowVincentDelivery] = useState(false);
  const shakeKey = useRef(0);
  const portalTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlocking || portalActive) return;

    if (value !== PASSWORD) {
      shakeKey.current += 1;
      setError(true);
      setValue("");
      const nextAttempt = wrongAttempts + 1;
      setWrongAttempts(nextAttempt);

      // En el intento decisivo, deja que Coraline hable un momento y luego
      // dispara la secuencia cinematográfica de la puerta.
      if (nextAttempt === 5) {
        if (portalTimeout.current) clearTimeout(portalTimeout.current);
        portalTimeout.current = setTimeout(() => setPortalActive(true), 1300);
      }
      return;
    }

    // Contraseña correcta: la lógica de acceso queda exactamente igual,
    // sin tocar el contador ni el estado de Coraline. En vez de saltar
    // directo a la carta, ahora Vincent la entrega primero.
    setError(false);
    setUnlocking(true);
    setTimeout(() => {
      setShowVincentDelivery(true);
    }, 1300);
  };

  const coralineStep = wrongAttempts > 0 ? getCoralineStep(wrongAttempts) : null;
  const ambientIntensity = coralineStep?.intensity ?? 0;

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#050914] via-[#0b1a3d] to-[#040711] p-4 overflow-x-hidden relative flex flex-col">
      {/* Decoraciones — tema Coraline: noche azul profundo */}
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-25" />
      <CurvedSpiral className="absolute bottom-12 left-8 w-20 h-20 opacity-20" />
      <div
        className="absolute top-10 right-10 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.35), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Ambiente que se intensifica con cada intento fallido */}
      {ambientIntensity > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: ambientIntensity * 0.6 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "radial-gradient(circle at 65% 40%, rgba(37,99,235,0.22), transparent 55%), radial-gradient(circle at 25% 65%, rgba(139,92,246,0.14), transparent 55%)",
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-20 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate("/menu")}
          className="p-2 bg-gray-900/50 hover:bg-gray-800/60 rounded-xl text-blue-300 transition-all flex-shrink-0"
        >
          <ArrowLeft size={22} />
        </button>
      </div>

      {/* Contenido central: en flujo normal (nada flotando encima de nada) */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-2">
        <div className="w-full max-w-4xl flex flex-col sm:flex-row-reverse items-center justify-center gap-5 sm:gap-8 px-1">
          {coralineStep && !portalActive && (
            <CoralinePanel step={coralineStep} attemptKey={wrongAttempts} />
          )}

          <motion.div
            key={shakeKey.current}
            initial={{ opacity: 0, y: 20 }}
            animate={
              error
                ? { opacity: 1, y: 0, x: [0, -10, 10, -8, 8, -4, 4, 0] }
                : { opacity: 1, y: 0 }
            }
            transition={error ? { duration: 0.5 } : { duration: 0.4 }}
            className="w-full max-w-sm flex-shrink-0"
          >
            <div
              className="rounded-3xl p-6 backdrop-blur-sm text-center"
              style={{
                background: "rgba(8,14,36,0.55)",
                border: "1px solid rgba(96,165,250,0.28)",
              }}
            >
              <div className="flex justify-center mb-4">
                <BlueDoor
                  width={76}
                  openAmount={unlocking ? 1 : 0}
                  glow={unlocking ? 1 : ambientIntensity * 0.7}
                  idle={!unlocking}
                />
              </div>

              <h1
                className="text-2xl text-white font-bold mb-1.5"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
              >
                Puerta Secreta
              </h1>
              <p className="text-blue-200/70 text-sm mb-6 leading-relaxed">
                Hay algo del otro lado, Angela. Solo tú tienes la contraseña para cruzar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    autoFocus
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Contraseña"
                    className={`w-full bg-gray-900/60 border rounded-xl pl-10 pr-10 py-3.5 text-white outline-none transition-colors ${
                      error
                        ? "border-red-500/60 focus:border-red-400"
                        : "border-blue-500/30 focus:border-blue-400"
                    }`}
                    style={{ fontSize: "16px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-300 text-xs"
                    >
                      Esa no es la contraseña correcta. Inténtalo de nuevo.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={unlocking || value.length === 0}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: "#2563ebcc",
                    border: "2px solid #3b82f6",
                    boxShadow: "0 5px 0 #1d4ed860",
                  }}
                >
                  {unlocking ? (
                    <>
                      <DoorOpen size={16} /> Cruzando...
                    </>
                  ) : (
                    <>
                      <DoorClosed size={16} /> Abrir puerta
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <PortalSequence active={portalActive} onComplete={() => setPortalActive(false)} />

      {showCurtain && (
        <ConstructionCurtain onComplete={() => setShowCurtain(false)} />
      )}

      {showVincentDelivery && (
        <VincentDelivery
          onOpenLetter={() => {
            window.location.href = "/carta-especial/index.html";
          }}
        />
      )}
    </div>
  );
}
