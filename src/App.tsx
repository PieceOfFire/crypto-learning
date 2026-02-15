import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { CryptoPage } from "./pages/CryptoPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { TransferPage } from "./pages/TransferPage";
import { ChartPage } from "./pages/ChartPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-200/70",
    ].join(" ");

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      <header className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-4 rounded-2xl border bg-white/85 px-4 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Crypto Dashboard</h1>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/coins" className={linkClassName}>
            Cards
          </NavLink>
          <NavLink to="/portfolio" className={linkClassName}>
            Portfolio
          </NavLink>
          <NavLink to="/transfer" className={linkClassName}>
            Transfer
          </NavLink>
          <NavLink to="/chart" className={linkClassName}>
            Chart
          </NavLink>
          <NavLink to="/login" className={linkClassName}>
            Login
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl pb-8">
        <Routes>
          <Route path="/" element={<Navigate to="/coins" replace />} />
          <Route path="/coins" element={<CryptoPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}
