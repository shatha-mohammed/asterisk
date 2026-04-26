import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

export default function App() {
  return (
    <div className="px-4">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}
