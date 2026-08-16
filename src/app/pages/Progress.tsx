import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { subjects, getProgress, buildGeneralSubject } from "../data/questions";
import { Moon, FloatingStars, CurvedSpiral } from "../components/BurtonDecorations";
import { SubjectIcon } from "../components/SubjectIcon";
import { ArrowLeft, Trophy, RotateCcw, Star, Sparkles, Rocket, Heart, Moon as MoonIcon, type LucideIcon } from "lucide-react";

function getMotivationalMessage(pct: number): { text: string; Icon: LucideIcon } {
  if (pct >= 90) return { text: "¡Eres increíble, Angela!", Icon: Star };
  if (pct >= 70) return { text: "¡Vas por muy buen camino!", Icon: Heart };
  if (pct >= 50) return { text: "¡Sigue practicando, casi llegas!", Icon: MoonIcon };
  if (pct >= 30) return { text: "¡Cada intento cuenta!", Icon: Sparkles };
  return { text: "¡El viaje apenas comienza, no te rindas!", Icon: Rocket };
}

export default function Progress() {
  const navigate = useNavigate();
  const allProgress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-4 overflow-hidden relative">
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-20" />
      <Moon className="absolute top-8 right-8 w-20 h-20 opacity-60" />
      <CurvedSpiral className="absolute bottom-12 left-8 w-20 h-20 opacity-40" />

      <div className="max-w-2xl mx-auto relative z-10 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/menu")}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-purple-300 transition-all"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl text-purple-200 font-bold">Mi Progreso</h1>
          <div className="w-10" />
        </div>

        {/* Por materia */}
        {[...subjects, buildGeneralSubject()].map((subject, sIdx) => {
          const sp = allProgress.find((p) => p.subjectId === subject.id);
          if (!sp) return null;

          const bestColor =
            sp.bestScore >= 75 ? "#22c55e" : sp.bestScore >= 50 ? "#f59e0b" : "#a855f7";

          return (
            <motion.div
              key={subject.id}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: sIdx * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-5 mb-5 border-2"
              style={{ borderColor: subject.color + "40", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              {/* Encabezado de materia */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: subject.color + "22" }}
                >
                  <SubjectIcon icon={subject.icon} size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-white text-xl font-bold">{subject.name}</h2>
                  <p className="text-purple-300/70 text-xs">
                    {sp.attempts} intento{sp.attempts !== 1 ? "s" : ""} realizados
                  </p>
                </div>
                {sp.attempts > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-purple-300/60 mb-0.5">Mejor</div>
                    <div className="text-2xl font-extrabold" style={{ color: bestColor }}>
                      {sp.bestScore}%
                    </div>
                  </div>
                )}
              </div>

              {sp.attempts === 0 ? (
                <div className="text-center py-4">
                  <p className="text-purple-300/60 text-sm mb-3">Aún no has presentado este examen</p>
                  <button
                    onClick={() => navigate(`/quiz/${subject.id}`)}
                    className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: subject.color + "cc", border: `2px solid ${subject.color}` }}
                  >
                    Comenzar examen
                  </button>
                </div>
              ) : (
                <>
                  {/* Barra mejor puntaje */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-purple-300/60 mb-1">
                      <span>Mejor puntaje</span>
                      <span>{sp.bestScore}%</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sp.bestScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bestColor }}
                      />
                    </div>
                    <p className="text-purple-300/60 text-xs mt-2 italic flex items-center gap-1.5">
                      {(() => {
                        const { text, Icon } = getMotivationalMessage(sp.bestScore);
                        return (
                          <>
                            <Icon size={13} className="flex-shrink-0" /> {text}
                          </>
                        );
                      })()}
                    </p>
                  </div>

                  {/* Último resultado */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-white">{sp.lastTotal}</div>
                      <div className="text-xs text-purple-300/60">Total</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-green-400">{sp.lastCorrect}</div>
                      <div className="text-xs text-purple-300/60">Correctas</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold" style={{ color: bestColor }}>
                        {sp.lastScore}%
                      </div>
                      <div className="text-xs text-purple-300/60">Último</div>
                    </div>
                  </div>

                  {/* Historial de intentos */}
                  {sp.history.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-purple-300/80 text-xs font-bold mb-2 flex items-center gap-1">
                        <Star size={12} /> Historial de intentos
                      </h3>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {sp.history.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-1.5 text-xs"
                          >
                            <span className="text-purple-300/60 truncate mr-2">{h.date}</span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-green-400">{h.correct}/{h.total}</span>
                              <span
                                className="font-bold w-10 text-right"
                                style={{
                                  color:
                                    h.percentage >= 75
                                      ? "#22c55e"
                                      : h.percentage >= 50
                                      ? "#f59e0b"
                                      : "#ef4444",
                                }}
                              >
                                {h.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botón reintentar */}
                  <button
                    onClick={() => navigate(`/quiz/${subject.id}`)}
                    className="w-full py-3 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
                    style={{
                      backgroundColor: subject.color + "50",
                      border: `2px solid ${subject.color}`,
                    }}
                  >
                    <RotateCcw size={16} />
                    Volver a presentar
                  </button>
                </>
              )}
            </motion.div>
          );
        })}

        {/* Volver al menú */}
        <button
          onClick={() => navigate("/menu")}
          className="w-full py-3 bg-gray-700/50 hover:bg-gray-600/50 text-purple-200 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Trophy size={18} />
          Volver al menú
        </button>
      </div>
    </div>
  );
}
