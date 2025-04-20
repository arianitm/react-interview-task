import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory/:jobsiteId" element={<Inventory />} />
    </Routes>
  );
}
