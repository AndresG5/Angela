import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  subjects,
  getProgress,
  clearExamSession,
  loadExamSession,
  buildGeneralSubject,
  GENERAL_EXAM_ID,
} from "../data/questions";
import { Moon, CurvedSpiral, FloatingStars } from "../components/BurtonDecorations";
import { SubjectIcon } from "../components/SubjectIcon";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  NewSectionBanner,
  shouldShowSecretDoorNotice,
  markSecretDoorNoticeSeen,
} from "../components/NewSectionBanner";
import {
  ArrowLeft,
  Trophy,
  Play,
  BookOpen,
  Workflow,
  Compass,
  RotateCcw,
  GraduationCap,
  DoorClosed,
  Moon as MoonIcon,
} from "lucide-react";

export default function MainMenu() {
  const navigate = useNavigate();
  const allProgress = getProgress();
  const generalSubject = buildGeneralSubject();

  // Cada materia (y el Examen General) guarda su propio progreso por
  // separado, así que puede haber varios exámenes a medias al mismo tiempo
  // sin que uno le borre el progreso a otro.
  const findActiveSubjectId = (id: string) => !!loadExamSession(id);

  const handleStartExam = (subjectId: string) => {
    // Quiz.tsx retoma automáticamente el examen a medias de esta materia si
    // existe, o empieza uno nuevo si no. No hace falta limpiar nada aquí.
    navigate(`/quiz/${subjectId}`);
  };

  const [pendingRestart, setPendingRestart] = useState<string | null>(null);

  const handleRestartExam = (subjectId: string) => {
    setPendingRestart(subjectId);
  };

  // Aviso de "Puerta Secreta disponible": aparece solo cuando ya
  // llegó la fecha objetivo y todavía no se ha visto/cerrado.
  const [showDoorNotice, setShowDoorNotice] = useState(shouldShowSecretDoorNotice);

  const dismissDoorNotice = () => {
    markSecretDoorNoticeSeen();
    setShowDoorNotice(false);
  };

  const openSecretDoor = () => {
    markSecretDoorNoticeSeen();
    setShowDoorNotice(false);
    navigate("/carta");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-5 overflow-hidden relative">
      {/* Decoraciones */}
      <FloatingStars className="absolute top-0 right-0 w-64 h-64 opacity-20" />
      <Moon className="absolute top-8 right-8 w-20 h-20 opacity-70" />
      <CurvedSpiral className="absolute bottom-12 left-8 w-24 h-24 opacity-50" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl text-purple-300 transition-all"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={openSecretDoor}
              className="relative flex items-center gap-2 px-3.5 py-2.5 bg-pink-500/20 hover:bg-pink-500/30 rounded-2xl text-pink-200 transition-all text-sm font-semibold"
            >
              <DoorClosed size={20} />
              <span className="hidden sm:inline">Puerta Secreta</span>
              {showDoorNotice && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-400 border-2 border-[#1a1625]"
                  style={{ boxShadow: "0 0 8px rgba(96,165,250,0.8)" }}
                />
              )}
            </button>
            <button
              onClick={() => navigate("/progress")}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-purple-600/30 hover:bg-purple-500/40 rounded-2xl text-yellow-300 transition-all text-sm font-semibold"
            >
              <Trophy size={20} />
              <span className="hidden sm:inline">Mi progreso</span>
            </button>
          </div>
        </div>

        <NewSectionBanner
          visible={showDoorNotice}
          onDismiss={dismissDoorNotice}
          onOpen={openSecretDoor}
        />

        {/* Título */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-10"
        >
          <h1
            className="text-4xl text-purple-200 font-bold mb-2"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
          >
            Elige tu materia
          </h1>
          <p className="text-purple-300/70">¿Qué quieres practicar hoy, Angela?</p>
        </motion.div>

        {/* Examen General — todas las materias combinadas */}
        {(() => {
          const gp = allProgress.find((p) => p.subjectId === GENERAL_EXAM_ID);
          const hasAttempts = (gp?.attempts ?? 0) > 0;
          const bestScore = gp?.bestScore ?? 0;
          const inProgress = findActiveSubjectId(GENERAL_EXAM_ID);
          return (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="relative rounded-3xl overflow-hidden mb-6"
              style={{
                backgroundColor: generalSubject.color + "18",
                border: `2px solid ${generalSubject.color}55`,
                boxShadow: `0 6px 0 ${generalSubject.color}35, 0 10px 24px rgba(0,0,0,0.4)`,
              }}
            >
              <div className="p-5 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: generalSubject.color + "22" }}
                  >
                    <SubjectIcon icon={generalSubject.icon} size={28} className="text-yellow-200" />
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-2xl text-white font-bold"
                      style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {generalSubject.name}
                    </h2>
                    <p className="text-purple-300/70 text-sm">
                      {generalSubject.questions.length} preguntas · todas las materias juntas, como el examen real
                    </p>
                  </div>
                  {hasAttempts && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-purple-300/60 mb-0.5">Mejor</div>
                      <div className="text-2xl font-extrabold" style={{ color: "#facc15" }}>
                        {bestScore}%
                      </div>
                    </div>
                  )}
                </div>

                {inProgress ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStartExam(GENERAL_EXAM_ID)}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: generalSubject.color + "cc",
                        border: `2px solid ${generalSubject.color}`,
                        boxShadow: `0 4px 0 ${generalSubject.color}60`,
                      }}
                    >
                      <Play size={17} />
                      Continuar examen
                    </button>
                    <button
                      onClick={() => handleRestartExam(GENERAL_EXAM_ID)}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-purple-200 font-bold text-sm bg-gray-800/50 border border-purple-500/25 hover:bg-gray-700/50 transition-all"
                    >
                      <RotateCcw size={15} />
                      Empezar de nuevo
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartExam(GENERAL_EXAM_ID)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: generalSubject.color + "cc",
                      border: `2px solid ${generalSubject.color}`,
                      boxShadow: `0 4px 0 ${generalSubject.color}60`,
                    }}
                  >
                    <GraduationCap size={17} />
                    {hasAttempts ? "Nuevo intento" : "Comenzar examen general"}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* Tarjetas de materias */}
        <div className="space-y-5">
          {subjects.map((subject, index) => {
            const sp = allProgress.find((p) => p.subjectId === subject.id);
            const hasAttempts = (sp?.attempts ?? 0) > 0;
            const bestScore = sp?.bestScore ?? 0;
            const scoreColor =
              bestScore >= 75 ? "#22c55e" : bestScore >= 50 ? "#f59e0b" : "#a855f7";

            return (
              <motion.div
                key={subject.id}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, type: "spring", stiffness: 180 }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: subject.color + "15",
                  border: `2px solid ${subject.color}40`,
                  boxShadow: `0 6px 0 ${subject.color}30, 0 10px 24px rgba(0,0,0,0.4)`,
                }}
              >
                {/* Brillo decorativo */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${subject.color}, transparent)` }}
                />

                <div className="p-5 relative z-10">
                  {/* Fila superior: icono + nombre + puntaje */}
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: subject.color + "22" }}
                      animate={{ rotate: [0, -8, 8, -8, 0], y: [0, -4, 0, -4, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <SubjectIcon icon={subject.icon} size={26} className="text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h2
                        className="text-2xl text-white font-bold"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
                      >
                        {subject.name}
                      </h2>
                      <p className="text-purple-300/70 text-sm">
                        {subject.questions.length} preguntas · {Math.floor(subject.timeLimitSeconds / 3600)}h límite
                      </p>
                    </div>

                    {hasAttempts && (
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-purple-300/60 mb-0.5">Mejor</div>
                        <div className="text-2xl font-extrabold" style={{ color: scoreColor }}>
                          {bestScore}%
                        </div>
                        <div className="text-xs text-purple-300/50">
                          {sp!.attempts} intento{sp!.attempts !== 1 ? "s" : ""}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Barra de mejor puntaje */}
                  {hasAttempts && (
                    <div className="mb-4">
                      <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bestScore}%` }}
                          transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: scoreColor }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Comenzar / Nuevo intento / Continuar */}
                    {findActiveSubjectId(subject.id) ? (
                      <button
                        onClick={() => handleStartExam(subject.id)}
                        className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: subject.color + "cc",
                          border: `2px solid ${subject.color}`,
                          boxShadow: `0 4px 0 ${subject.color}60`,
                        }}
                      >
                        <Play size={17} />
                        Continuar examen
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartExam(subject.id)}
                        className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: subject.color + "cc",
                          border: `2px solid ${subject.color}`,
                          boxShadow: `0 4px 0 ${subject.color}60`,
                        }}
                      >
                        <Play size={17} />
                        {hasAttempts ? "Nuevo intento" : "Comenzar"}
                      </button>
                    )}

                    {/* Guía de estudio */}
                    <button
                      onClick={() => navigate(`/guide/${subject.id}`)}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-purple-200 font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 bg-indigo-900/40 border border-indigo-500/30 hover:bg-indigo-800/40"
                    >
                      <BookOpen size={17} />
                      Estudiar
                    </button>
                  </div>

                  {/* Accesos rápidos: mapa conceptual y recursos */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.035, y: -1 }}
                      whileTap={{ scale: 0.96, y: 0 }}
                      onClick={() => navigate(`/concept-map/${subject.id}`)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-indigo-100 text-xs font-bold transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.20) 100%)",
                        border: "1.5px solid rgba(129,140,248,0.45)",
                        boxShadow: "0 3px 0 rgba(79,70,229,0.4), 0 4px 10px rgba(0,0,0,0.25)",
                      }}
                    >
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: "rgba(129,140,248,0.3)" }}
                      >
                        <Workflow size={12} />
                      </span>
                      Mapa conceptual
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.035, y: -1 }}
                      whileTap={{ scale: 0.96, y: 0 }}
                      onClick={() => navigate(`/study/${subject.id}`)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-emerald-100 text-xs font-bold transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(16,185,129,0.24) 0%, rgba(45,212,191,0.18) 100%)",
                        border: "1.5px solid rgba(52,211,153,0.45)",
                        boxShadow: "0 3px 0 rgba(5,150,105,0.4), 0 4px 10px rgba(0,0,0,0.25)",
                      }}
                    >
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: "rgba(52,211,153,0.28)" }}
                      >
                        <Compass size={12} />
                      </span>
                      Ver recursos
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mensaje motivacional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center text-purple-300/50 italic text-sm flex items-center justify-center gap-1.5"
        >
          "Cada pregunta es un paso más cerca del exito tu puedes Angela"
          <MoonIcon size={14} className="flex-shrink-0" />
        </motion.p>
      </div>

      <ConfirmDialog
        open={!!pendingRestart}
        title="Empezar de nuevo"
        message="Perderás el progreso del intento actual de esta materia. ¿Quieres continuar?"
        danger
        confirmLabel="Sí, empezar de nuevo"
        onConfirm={() => {
          if (pendingRestart) {
            clearExamSession(pendingRestart);
            navigate(`/quiz/${pendingRestart}`);
          }
          setPendingRestart(null);
        }}
        onCancel={() => setPendingRestart(null)}
      />
    </div>
  );
}
