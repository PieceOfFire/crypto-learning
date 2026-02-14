import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { CryptoPage } from "./pages/CryptoPage";
import { PortfolioPage } from "./pages/PortfolioPage";

export default function App() {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "bg-white text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Crypto Dashboard</h1>

        <nav className="flex items-center gap-2">
          <NavLink to="/coins" className={linkClassName}>
            Карточки
          </NavLink>

          <NavLink to="/portfolio" className={linkClassName}>
            Портфель
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl">
        <Routes>
          <Route path="/" element={<Navigate to="/coins" replace />} />
          <Route path="/coins" element={<CryptoPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </div>
  );
}