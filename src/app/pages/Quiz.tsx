import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  buildShuffledExam,
  saveExamSession,
  loadExamSession,
  clearExamSession,
  resolveSubject,
  type ShuffledQuestion,
  type ExamSessionState,
} from "../data/questions";
import { CurvedSpiral, FloatingStars } from "../components/BurtonDecorations";
import { SubjectIcon } from "../components/SubjectIcon";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Star,
  Heart,
  Sparkles,
  Rocket,
  Target,
  BookOpen,
  Moon,
  Zap,
  FileText,
  Flag,
  type LucideIcon,
} from "lucide-react";

// ─── Utilidades ───────────────────────────────
function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface MotivationalMsg {
  text: string;
  Icon: LucideIcon;
}

const MOTIVATIONAL_CORRECT: MotivationalMsg[] = [
  { text: "¡Excelente, Angela!", Icon: Star },
  { text: "¡Así se hace!", Icon: Heart },
  { text: "¡Perfecto! Sigue adelante", Icon: Sparkles },
  { text: "¡Muy bien! Vas genial", Icon: Rocket },
  { text: "¡Correcto! Eres increíble", Icon: Target },
];

const MOTIVATIONAL_INCORRECT: MotivationalMsg[] = [
  { text: "¡Casi! Revisa la explicación", Icon: BookOpen },
  { text: "No pasa nada, aprendemos del error", Icon: Heart },
  { text: "¡Sigue intentando! Vas a lograrlo", Icon: Moon },
  { text: "Cada error te hace más fuerte", Icon: Sparkles },
  { text: "¡Revisa bien y a la siguiente!", Icon: Zap },
];


// ─── Componente tabla de pregunta ─────────────
function QuestionTable({ tableData }: { tableData: { headers: string[]; rows: (string | null)[][] } }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse rounded-xl overflow-hidden text-sm">
        <thead>
          <tr>
            {tableData.headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-purple-200 font-bold text-center"
                style={{ backgroundColor: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-center"
                  style={{
                    backgroundColor: cell === null
                      ? "rgba(88,28,135,0.25)"
                      : ri % 2 === 0
                      ? "rgba(0,0,0,0.25)"
                      : "rgba(0,0,0,0.15)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: cell === null ? "rgba(167,139,250,0.5)" : "white",
                    fontStyle: cell === null ? "italic" : "normal",
                  }}
                >
                  {cell === null ? "?" : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Componente de lectura/pasaje ─────────────
function PassageBox({ title, text }: { title?: string; text: string }) {
  return (
    <div
      className="rounded-2xl p-4 mb-4 border-2"
      style={{
        background: "rgba(0,0,0,0.35)",
        borderColor: "rgba(99,102,241,0.35)",
        maxHeight: "52vh",
        overflowY: "auto",
      }}
    >
      {title && (
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <FileText size={13} /> {title}
        </p>
      )}
      <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────
export default function Quiz() {
  const { subject: subjectId } = useParams();
  const navigate = useNavigate();

  // useMemo evita que se reconstruya un objeto nuevo en cada render:
  // resolveSubject arma el Examen General combinado sobre la marcha, y si
  // la referencia cambiara en cada render, el examen se reiniciaría solo.
  const subject = useMemo(() => resolveSubject(subjectId), [subjectId]);

  // ── Estado del examen ──────────────────────
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(subject?.timeLimitSeconds ?? 7200);
  const [startTimestamp, setStartTimestamp] = useState<number>(Date.now());
  const [sessionRestored, setSessionRestored] = useState(false);
  const [motivationalMsg, setMotivationalMsg] = useState<MotivationalMsg | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Redirect si materia no existe ──────────
  useEffect(() => {
    if (!subject) navigate("/menu");
  }, [subject, navigate]);

  // ── Inicializar o restaurar examen ─────────
  useEffect(() => {
    if (!subject) return;

    const saved = loadExamSession(subject.id);
    if (saved) {
      // Restaurar sesión previa
      const elapsed = Math.floor((Date.now() - saved.startTimestamp) / 1000);
      const remaining = Math.max(0, subject.timeLimitSeconds - elapsed);
      setQuestions(saved.questions);
      setAnswers(saved.answers);
      setCurrentIndex(saved.currentIndex);
      setTimeLeft(remaining);
      setStartTimestamp(saved.startTimestamp);
      setSessionRestored(true);
    } else {
      // Nueva sesión
      const shuffled = buildShuffledExam(subject);
      const emptyAnswers = shuffled.map(() => null);
      setQuestions(shuffled);
      setAnswers(emptyAnswers);
      setCurrentIndex(0);
      setTimeLeft(subject.timeLimitSeconds);
      const now = Date.now();
      setStartTimestamp(now);
    }
  }, [subject]);

  // ── Guardar sesión cuando cambia el estado ──
  const persistSession = useCallback(() => {
    if (!subject || questions.length === 0) return;
    const session: ExamSessionState = {
      subjectId: subject.id,
      questions,
      answers,
      currentIndex,
      startTimestamp,
    };
    saveExamSession(session);
  }, [subject, questions, answers, currentIndex, startTimestamp]);

  useEffect(() => {
    persistSession();
  }, [persistSession]);

  // ── Temporizador ────────────────────────────
  const handleTimeUp = useCallback(() => {
    if (!subject || questions.length === 0) return;
    clearExamSession(subject.id);
    const correct = answers.filter((a, i) => a === questions[i].shuffledCorrectIndex).length;
    const timeUsed = subject.timeLimitSeconds;
    navigate("/final-result", {
      state: {
        subjectId: subject.id,
        questions,
        answers,
        correct,
        total: questions.length,
        timeUsedSeconds: timeUsed,
        timeExpired: true,
      },
    });
  }, [subject, questions, answers, navigate]);

  useEffect(() => {
    if (questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questions, handleTimeUp]);

  // ── Helpers ─────────────────────────────────
  if (!subject || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const totalQ = questions.length;
  const progress = ((currentIndex + 1) / totalQ) * 100;
  const isLastQuestion = currentIndex >= totalQ - 1;
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.shuffledCorrectIndex;
  const timerColor = timeLeft < 300 ? "#ef4444" : timeLeft < 900 ? "#f59e0b" : "#a855f7";

  // ── Seleccionar respuesta ───────────────────
  const handleSelect = (idx: number) => {
    if (showingFeedback) return;
    setSelectedAnswer(idx);
  };

  // ── Confirmar respuesta ─────────────────────
  const handleConfirm = () => {
    if (selectedAnswer === null || showingFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setShowingFeedback(true);
    const pool = isCorrect ? MOTIVATIONAL_CORRECT : MOTIVATIONAL_INCORRECT;
    setMotivationalMsg(pool[Math.floor(Math.random() * pool.length)]);
  };

  // ── Siguiente pregunta ──────────────────────
  const handleNext = () => {
    if (isLastQuestion) {
      // Fin del examen
      if (timerRef.current) clearInterval(timerRef.current);
      clearExamSession(subject.id);
      const finalAnswers = [...answers];
      finalAnswers[currentIndex] = selectedAnswer;
      const correct = finalAnswers.filter(
        (a, i) => a === questions[i].shuffledCorrectIndex
      ).length;
      const timeUsed = subject.timeLimitSeconds - timeLeft;
      navigate("/final-result", {
        state: {
          subjectId: subject.id,
          questions,
          answers: finalAnswers,
          correct,
          total: questions.length,
          timeUsedSeconds: timeUsed,
          timeExpired: false,
        },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowingFeedback(false);
      setMotivationalMsg(null);
    }
  };

  // ── Salir del examen (pausa: el progreso ya está guardado) ──
  const handleAbort = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate("/menu");
  };

  // ── Render opción (texto o imagen) ──────────
  const renderOption = (displayIndex: number) => {
    const isImg = !!currentQuestion.hasImages;
    const isSelected = selectedAnswer === displayIndex;
    const showCorrect = showingFeedback && displayIndex === currentQuestion.shuffledCorrectIndex;
    const showWrong = showingFeedback && isSelected && displayIndex !== currentQuestion.shuffledCorrectIndex;

    const borderClass = showCorrect
      ? "border-green-400 bg-green-600/20"
      : showWrong
      ? "border-red-400 bg-red-600/20"
      : isSelected
      ? "border-purple-400 bg-purple-600/20"
      : "border-gray-600/50 bg-gray-800/30 hover:border-purple-500/50 hover:bg-gray-700/30";

    const circleClass = showCorrect
      ? "bg-green-500 text-white"
      : showWrong
      ? "bg-red-500 text-white"
      : isSelected
      ? "bg-purple-500 text-white"
      : "bg-gray-700 text-gray-300";

    const label = String.fromCharCode(65 + displayIndex);

    if (isImg) {
      const imgNum = currentQuestion.shuffledImageNums?.[displayIndex] ?? displayIndex + 1;
      const basePath = currentQuestion.imageBasePath ?? "/images/Aritmetica_Grafica";
      const ext = currentQuestion.imageExt ?? "png";
      return (
        <motion.button
          key={displayIndex}
          whileHover={{ scale: showingFeedback ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(displayIndex)}
          disabled={showingFeedback}
          className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ${borderClass}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${circleClass}`}>
              {label}
            </div>
            {showCorrect && <CheckCircle className="text-green-400" size={20} />}
            {showWrong && <XCircle className="text-red-400" size={20} />}
          </div>
          <img
            src={`${basePath}${imgNum}.${ext}`}
            alt={`Gráfica ${label}`}
            className="w-full max-w-xs mx-auto rounded-lg"
            style={{ maxHeight: "180px", objectFit: "contain" }}
          />
        </motion.button>
      );
    }

    return (
      <motion.button
        key={displayIndex}
        whileHover={{ scale: showingFeedback ? 1 : 1.02, x: showingFeedback ? 0 : 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleSelect(displayIndex)}
        disabled={showingFeedback}
        className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ${borderClass}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 ${circleClass}`}>
            {label}
          </div>
          <span className="text-white text-base leading-snug">
            {currentQuestion.shuffledOptions[displayIndex]}
          </span>
          {showCorrect && <CheckCircle className="text-green-400 ml-auto flex-shrink-0" size={20} />}
          {showWrong && <XCircle className="text-red-400 ml-auto flex-shrink-0" size={20} />}
        </div>
      </motion.button>
    );
  };

  // ── JSX ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-4 overflow-hidden relative">
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-20" />
      <CurvedSpiral className="absolute bottom-12 right-8 w-28 h-28 opacity-20" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleAbort}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-purple-300 transition-all"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-2 text-lg text-purple-200 font-semibold">
            <SubjectIcon icon={subject.icon} size={20} />
            <span className="hidden sm:inline">{subject.name}</span>
          </div>

          {/* Timer */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm"
            style={{
              backgroundColor: timerColor + "20",
              border: `2px solid ${timerColor}60`,
              color: timerColor,
            }}
          >
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* ─── Barra de progreso ─── */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-purple-300/70 mb-1">
            <span>Pregunta {currentIndex + 1} de {totalQ}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="h-2.5 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
            />
          </div>
        </div>

        {/* ─── Aviso de sesión restaurada ─── */}
        {sessionRestored && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-blue-900/30 border border-blue-400/30 text-blue-300 text-sm text-center flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} className="flex-shrink-0" />
            Sesión restaurada — continúas donde lo dejaste
          </motion.div>
        )}

        {/* ─── Tarjeta de pregunta ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-5 mb-4 border-2 border-purple-500/20"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
          >
            {/* Pasaje de lectura — se muestra siempre arriba de la pregunta */}
            {currentQuestion.passage && (
              <PassageBox
                title={currentQuestion.passageTitle}
                text={currentQuestion.passage}
              />
            )}

            <p className="text-white text-base md:text-lg leading-relaxed mb-3 whitespace-pre-line">
              {currentQuestion.question}
            </p>

            {/* Ilustración del enunciado (diagramas, gráficas, etc.) */}
            {currentQuestion.questionImage && (
              <div className="mb-4 rounded-2xl overflow-hidden bg-white/95 p-3 flex justify-center">
                <img
                  src={currentQuestion.questionImage}
                  alt={currentQuestion.questionImageAlt ?? "Ilustración de la pregunta"}
                  className="max-w-full"
                  style={{ maxHeight: "260px", objectFit: "contain" }}
                />
              </div>
            )}

            {/* Tabla de datos si la pregunta la requiere */}
            {currentQuestion.tableData && (
              <QuestionTable tableData={currentQuestion.tableData} />
            )}

            <div className="space-y-3">
              {currentQuestion.shuffledOptions.map((_, idx) => renderOption(idx))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── Feedback ─── */}
        <AnimatePresence>
          {showingFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`rounded-2xl p-5 mb-4 border-2 ${
                isCorrect
                  ? "bg-green-900/30 border-green-500/40"
                  : "bg-red-900/30 border-red-500/40"
              }`}
            >
              {/* Mensaje motivacional */}
              <p
                className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                  isCorrect ? "text-green-300" : "text-red-300"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle size={20} className="flex-shrink-0" />
                ) : (
                  <XCircle size={20} className="flex-shrink-0" />
                )}
                {motivationalMsg && (
                  <span className="flex items-center gap-1.5">
                    <motivationalMsg.Icon size={16} className="flex-shrink-0 opacity-80" />
                    {motivationalMsg.text}
                  </span>
                )}
              </p>

              {/* Respuesta correcta si falló */}
              {!isCorrect && (
                <p className="text-green-300 text-sm mb-3 font-semibold flex items-center gap-1.5">
                  <CheckCircle size={15} className="flex-shrink-0" />
                  Respuesta correcta:{" "}
                  <span className="font-bold">
                    {currentQuestion.hasImages
                      ? `Gráfica ${currentQuestion.shuffledImageNums?.[currentQuestion.shuffledCorrectIndex] ?? ""}`
                      : currentQuestion.shuffledOptions[currentQuestion.shuffledCorrectIndex]}
                  </span>
                </p>
              )}

              {/* Explicación */}
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-purple-300 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <BookOpen size={14} /> Explicación paso a paso:
                </p>
                <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
                  {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Botones de acción ─── */}
        {!showingFeedback ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
              selectedAnswer === null
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
            style={
              selectedAnswer !== null
                ? { boxShadow: "0 6px 0 #6b21a8, 0 10px 20px rgba(0,0,0,0.4)", border: "2px solid #4a1d6f" }
                : {}
            }
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle size={20} /> Confirmar respuesta
            </span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="w-full py-4 rounded-2xl text-lg font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 flex items-center justify-center gap-2"
            style={{ boxShadow: "0 6px 0 #6b21a8, 0 10px 20px rgba(0,0,0,0.4)", border: "2px solid #4a1d6f" }}
          >
            {isLastQuestion ? (
              <>
                <Flag size={20} /> Ver mis resultados
              </>
            ) : (
              "Siguiente pregunta"
            )}
            <ChevronRight size={22} />
          </motion.button>
        )}

        {/* Mini contador de correctas */}
        {currentIndex > 0 && (
          <p className="text-center text-purple-300/50 text-xs mt-3">
            {answers.filter((a, i) => a !== null && a === questions[i].shuffledCorrectIndex).length} correctas
            de {answers.filter((a) => a !== null).length} respondidas
          </p>
        )}
      </div>
    </div>
  );
}
