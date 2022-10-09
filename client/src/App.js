import { Route, Routes } from "react-router-dom";
import FinalScreen from "./pages/FinalScreen";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/final" element={<FinalScreen />} />
    </Routes>
  );
}

export default App;

