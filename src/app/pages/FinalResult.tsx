import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { saveAttempt, resolveSubject, type ShuffledQuestion } from "../data/questions";
import { logExamAttempt } from "../lib/db";
import { Moon } from "../components/BurtonDecorations";
import { FloatingStars } from "../components/BurtonDecorations";
import {
  RotateCcw,
  Home,
  Trophy,
  Music,
  ExternalLink,
  Clock,
  BookOpen,
  Star,
  PartyPopper,
  Heart,
  Rocket,
  CheckCircle2,
  XCircle,
  ClipboardList,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface FinalResultState {
  subjectId: string;
  questions: ShuffledQuestion[];
  answers: (number | null)[];
  correct: number;
  total: number;
  timeUsedSeconds: number;
  timeExpired: boolean;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function getGradeMessage(pct: number): { Icon: LucideIcon; title: string; msg: string } {
  if (pct === 100)
    return { Icon: Trophy, title: "¡Perfección total!", msg: "¡Increíble, Angela! Obtuviste el puntaje perfecto. ¡Eres una la numero 1, the best!" };
  if (pct >= 90)
    return { Icon: Star, title: "¡Excelente!", msg: "¡Qué resultado tan impresionante! Estás dominando el tema." };
  if (pct >= 75)
    return { Icon: PartyPopper, title: "¡Muy bien!", msg: "¡Eso estuvo muy bien! Con un poco más de práctica llegarás al 100%." };
  if (pct >= 60)
    return { Icon: Heart, title: "¡Buen intento!", msg: "Vas por buen camino. Repasa las explicaciones y vuelve a intentarlo." };
  if (pct >= 40)
    return { Icon: Moon, title: "Sigue practicando", msg: "No te desanimes. Cada intento es una oportunidad de aprender." };
  return { Icon: Rocket, title: "¡A estudiar se ha dicho!", msg: "El camino al éxito empieza con un primer paso. ¡Tú puedes, Angela:)!" };
}

function getScoreColor(pct: number): string {
  if (pct >= 75) return "#22c55e";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function FinalResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as FinalResultState | null;
  const savedRef = useRef(false);

  useEffect(() => {
    if (!state) {
      navigate("/menu");
      return;
    }
    if (!savedRef.current) {
      savedRef.current = true;
      saveAttempt(state.subjectId, state.correct, state.total, state.timeUsedSeconds);
      logExamAttempt({
        subjectId: state.subjectId,
        correct: state.correct,
        total: state.total,
        timeUsedSeconds: state.timeUsedSeconds,
        completed: !state.timeExpired,
      }).catch(() => {
        /* si la base de datos falla, el progreso ya quedó guardado en localStorage */
      });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { subjectId, questions, answers, correct, total, timeUsedSeconds, timeExpired } = state;
  const subject = resolveSubject(subjectId);
  const percentage = Math.round((correct / total) * 100);
  const incorrect = total - correct;
  const grade = getGradeMessage(percentage);
  const scoreColor = getScoreColor(percentage);

  const handleRetry = () => {
    navigate(`/quiz/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-4 overflow-hidden relative">
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-20" />
      <Moon className="absolute top-8 right-8 w-20 h-20 opacity-60" />

      <div className="max-w-2xl mx-auto relative z-10 pb-12">
        {/* ─── Alerta de tiempo agotado ─── */}
        {timeExpired && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-red-900/40 border border-red-400/40 text-red-300 text-center text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Clock size={16} className="flex-shrink-0" />
            Se agotó el tiempo — así quedó tu resultado
          </motion.div>
        )}

        {/* ─── Ícono animado ─── */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: scoreColor + "1a", border: `2px solid ${scoreColor}40` }}
          >
            <grade.Icon size={48} style={{ color: scoreColor }} />
          </motion.div>
        </motion.div>

        {/* ─── Calificación principal ─── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 mb-4 border-2 border-purple-500/30"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <h1 className="text-3xl text-white text-center font-bold mb-1">{grade.title}</h1>
          <p className="text-purple-200 text-center text-sm mb-5">{grade.msg}</p>

          {/* Porcentaje grande */}
          <div className="text-center mb-5">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-7xl font-extrabold"
              style={{ color: scoreColor, textShadow: `0 0 20px ${scoreColor}60` }}
            >
              {percentage}%
            </motion.span>
          </div>

          {/* Barra de puntaje */}
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}99)` }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <Trophy size={28} className="text-yellow-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-xs text-purple-300">Total</div>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <CheckCircle2 size={28} className="text-green-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-400">{correct}</div>
              <div className="text-xs text-purple-300">Correctas</div>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <XCircle size={28} className="text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-400">{incorrect}</div>
              <div className="text-xs text-purple-300">Incorrectas</div>
            </div>
          </div>

          {/* Tiempo usado */}
          <div className="mt-3 flex items-center justify-center gap-2 text-purple-300/60 text-sm">
            <Clock size={14} />
            <span>Tiempo usado: {formatTime(timeUsedSeconds)}</span>
          </div>
        </motion.div>

        {/* ─── Resumen por pregunta ─── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/40 rounded-2xl p-5 mb-4 border-2 border-purple-500/20"
        >
          <h2 className="text-purple-200 font-bold mb-4 text-lg flex items-center gap-2">
            <ClipboardList size={18} /> Resumen por pregunta
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrectAns = userAns !== null && userAns === q.shuffledCorrectIndex;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                    isCorrectAns ? "bg-green-900/20 border border-green-500/20" : "bg-red-900/20 border border-red-500/20"
                  }`}
                >
                  <span className="flex-shrink-0">
                    {isCorrectAns ? (
                      <CheckCircle2 size={18} className="text-green-400" />
                    ) : (
                      <XCircle size={18} className="text-red-400" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-xs leading-tight truncate">
                      P{i + 1}: {q.question.slice(0, 80)}{q.question.length > 80 ? "…" : ""}
                    </p>
                    {!isCorrectAns && (
                      <p className="text-green-300 text-xs mt-0.5">
                        Correcta: {q.hasImages
                          ? `Gráfica ${q.shuffledImageNums?.[q.shuffledCorrectIndex] ?? ""}`
                          : q.shuffledOptions[q.shuffledCorrectIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Playlist recomendada ─── */}
        {subject?.playlistUrl && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-5 mb-6 border-2 border-purple-400/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <Music size={24} className="text-purple-400" />
              <div>
                <h3 className="text-purple-200 font-bold">Esto te puede ayudar a tener un mejor resultado</h3>
                <p className="text-purple-300/70 text-xs">Si quieres un mayor repaso aqui esta playlist que te puede ayudar</p>
              </div>
            </div>
            <a
              href={subject.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-300 text-sm"
              style={{ boxShadow: "0 4px 0 #991b1b" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {subject.playlistTitle ?? "Ver playlist en YouTube"}
              <ExternalLink size={14} />
            </a>
          </motion.div>
        )}

        {/* ─── Botones finales ─── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <button
            onClick={handleRetry}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            style={{ boxShadow: "0 6px 0 #6b21a8, 0 10px 20px rgba(0,0,0,0.4)", border: "2px solid #4a1d6f" }}
          >
            <RotateCcw size={20} />
            Volver a presentar el examen
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => navigate(`/study/${subjectId}`)}
              className="py-3 bg-indigo-900/40 hover:bg-indigo-800/40 text-indigo-300 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-1 text-sm border border-indigo-500/30"
            >
              <BookOpen size={16} />
              Estudiar
            </button>
            <button
              onClick={() => navigate("/progress")}
              className="py-3 bg-gray-700/50 hover:bg-gray-600/50 text-purple-200 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-1 text-sm"
            >
              <Trophy size={16} />
              Progreso
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="py-3 bg-gray-700/50 hover:bg-gray-600/50 text-purple-200 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-1 text-sm"
            >
              <Home size={16} />
              Menú
            </button>
          </div>
        </motion.div>

        {/* Mensaje final */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-purple-300/40 italic text-xs mt-8 flex items-center justify-center gap-1.5"
        >
          <Sparkles size={12} className="flex-shrink-0" />
          "La constancia es la clave del éxito" — ¡Sigue así, Angela!
        </motion.p>
      </div>
    </div>
  );
}
