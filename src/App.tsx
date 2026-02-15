import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CryptoPage } from "./pages/CryptoPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { TransferPage } from "./pages/TransferPage";
import { ChartPage } from "./pages/ChartPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const location = useLocation();
  const isCardsPage = location.pathname === "/coins" || location.pathname === "/";

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      isActive
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
        : "text-muted-foreground hover:bg-secondary/75 hover:text-foreground",
    ].join(" ");

  return (
    <div className={["relative min-h-screen overflow-hidden px-4 sm:px-6", isCardsPage ? "pb-6" : "py-6"].join(" ")}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-24 top-8 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-16 top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <header className="relative z-40 mx-auto mb-8 mt-6 flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-border bg-background/95 px-4 py-4 shadow-xl shadow-black/25 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Crypto Dashboard
          </h1>
          <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">Менеджер ваших инвестиций.</p>
        </div>

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

      <main className="relative z-10 mx-auto w-full max-w-6xl pb-8">
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
