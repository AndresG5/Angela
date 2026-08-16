import { createBrowserRouter } from "react-router";
import Welcome from "./pages/Welcome";
import MainMenu from "./pages/MainMenu";
import Quiz from "./pages/Quiz";
import FinalResult from "./pages/FinalResult";
import Progress from "./pages/Progress";
import StudyResources from "./pages/StudyResources";
import StudyGuide from "./pages/StudyGuide";
import ConceptMap from "./pages/ConceptMap";
import Letter from "./pages/Letter";

export const router = createBrowserRouter([
  { path: "/", Component: Welcome },
  { path: "/menu", Component: MainMenu },
  { path: "/quiz/:subject", Component: Quiz },
  { path: "/final-result", Component: FinalResult },
  { path: "/progress", Component: Progress },
  { path: "/study/:subject", Component: StudyResources },
  { path: "/guide/:subject", Component: StudyGuide },
  { path: "/concept-map/:subject", Component: ConceptMap },
  { path: "/carta", Component: Letter },
]);
