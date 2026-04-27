import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    // <div className="px-4 lg:px-24">
    //   <Header />
    //   <div className="h-16"></div>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/pricing" element={<Pricing />}></Route>
    //     <Route path="/about" element={<About />}></Route>
    //   </Routes>
    // </div>

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
