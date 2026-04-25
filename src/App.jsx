import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><div>Dashboard</div></AppLayout>} />
    </Routes>
  );
}