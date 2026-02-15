import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoins } from "@/api/crypto";
import { AddToPortfolioForm } from "@/components/portfolio/AddToPortfolioForm";
import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
import { Card } from "@/components/ui/card";
import type { PortfolioItem } from "@/types/portfolio";

export function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
  });

  function handleAdd(item: PortfolioItem) {
    setPortfolio((prev) => [...prev, item]);
  }

  if (isLoading) {
    return (
      <section className="space-y-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Portfolio</h2>
        <Card className="h-36 animate-pulse rounded-2xl bg-slate-100" />
        <Card className="h-56 animate-pulse rounded-2xl bg-slate-100" />
      </section>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border-rose-200 bg-rose-50 p-6 text-rose-700">
        Failed to load coins for portfolio.
      </Card>
    );
  }

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-slate-900">Portfolio</h2>
      <AddToPortfolioForm coins={data ?? []} onAdd={handleAdd} />
      <PortfolioTable items={portfolio} />
    </section>
  );
}
