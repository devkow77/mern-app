import "./App.css";
import { Routes, Route } from "react-router";
import { Home, Faq, Contact } from "./pages/index";
import { ModeToggle } from "./components";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ModeToggle />
    </div>
  );
}
export default App;
