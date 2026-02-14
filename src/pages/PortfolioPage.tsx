import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCoins } from "@/api/crypto";
import { AddToPortfolioForm } from "@/components/portfolio/AddToPortfolioForm";
import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
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
    return <p className="p-6">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-600">Error loading data</p>;
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Список активов</h2>
      <AddToPortfolioForm coins={data ?? []} onAdd={handleAdd} />
      <PortfolioTable items={portfolio} />
    </section>
  );
}