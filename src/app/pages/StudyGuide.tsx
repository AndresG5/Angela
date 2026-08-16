import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { subjects } from "../data/questions";
import { getStudyGuide } from "../data/studyGuides";
import { FloatingStars, Moon, CurvedSpiral } from "../components/BurtonDecorations";
import { SubjectIcon } from "../components/SubjectIcon";
import { ArrowLeft, ChevronDown, Lightbulb, Workflow, BookOpen, DoorClosed, Compass, Rocket } from "lucide-react";

export default function StudyGuide() {
  const { subject: subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.id === subjectId);
  const guide = getStudyGuide(subjectId ?? "");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!subject) {
    navigate("/menu");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#2d1b4e] to-[#1a1625] p-4 overflow-hidden relative">
      <FloatingStars className="absolute top-0 left-0 w-full h-64 opacity-20" />
      <Moon className="absolute top-8 right-8 w-16 h-16 opacity-50" />
      <CurvedSpiral className="absolute bottom-12 left-8 w-20 h-20 opacity-30" />

      <div className="max-w-2xl mx-auto relative z-10 pb-40">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/study/${subject.id}`)}
            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-purple-300 transition-all flex-shrink-0"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-xl text-white font-bold flex items-center gap-2">
              <SubjectIcon icon={subject.icon} size={18} /> Guía de Estudio
            </h1>
            <p className="text-purple-300/70 text-sm">{subject.name}</p>
          </div>
        </div>

        {/* Intro */}
        {guide && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gray-900/40 rounded-2xl p-4 mb-6 border border-purple-500/20 text-sm text-purple-200/80 leading-relaxed flex items-start gap-2.5"
          >
            <Compass size={18} className="text-purple-300 flex-shrink-0 mt-0.5" />
            <span>{guide.intro}</span>
          </motion.div>
        )}

        {!guide && (
          <div className="bg-gray-900/40 rounded-2xl p-6 mb-6 border border-purple-500/20 text-center text-purple-300/70 text-sm">
            Aún no hay una guía de estudio para esta materia.
          </div>
        )}

        {/* Secciones acordeón */}
        <div className="space-y-3">
          {guide?.sections.map((section, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden border"
                style={{
                  backgroundColor: subject.color + "12",
                  borderColor: subject.color + "35",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: subject.color + "30", color: "white" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white font-semibold text-sm leading-tight">
                      {section.title}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="flex-shrink-0 text-purple-300"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2.5">
                        {section.content.map((line, j) => (
                          <p
                            key={j}
                            className="text-purple-100/85 text-sm leading-relaxed flex gap-2"
                          >
                            <span className="text-purple-400 flex-shrink-0">•</span>
                            <span>{line}</span>
                          </p>
                        ))}
                        {section.tip && (
                          <div className="mt-2 flex items-start gap-2 bg-yellow-500/10 border border-yellow-400/25 rounded-xl p-3">
                            <Lightbulb size={16} className="text-yellow-300 flex-shrink-0 mt-0.5" />
                            <p className="text-yellow-100/90 text-xs leading-relaxed">{section.tip}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate(`/concept-map/${subject.id}`)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-sm transition-all duration-300"
            style={{
              backgroundColor: subject.color + "cc",
              border: `2px solid ${subject.color}`,
              boxShadow: `0 5px 0 ${subject.color}60`,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Workflow size={18} />
            Crear mapa conceptual de {subject.name}
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate(`/study/${subject.id}`)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-purple-200 text-sm bg-indigo-900/40 border border-indigo-500/30 hover:bg-indigo-800/40 transition-all"
              whileTap={{ scale: 0.97 }}
            >
              <BookOpen size={16} />
              Más recursos
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={() => navigate("/carta")}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-pink-200 text-sm bg-pink-500/10 border border-pink-500/25 hover:bg-pink-500/20 transition-all"
              whileTap={{ scale: 0.97 }}
            >
              <DoorClosed size={16} />
              Puerta Secreta
            </motion.button>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate(`/quiz/${subject.id}`)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 bg-gray-800/60 border border-purple-500/20 hover:bg-gray-700/60"
            whileTap={{ scale: 0.97 }}
          >
            <Rocket size={18} />
            Ir al examen de {subject.name}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
