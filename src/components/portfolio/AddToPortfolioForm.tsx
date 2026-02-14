import { useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";
import type { Coin } from "@/api/crypto";

type Props = {
  coins: Coin[];
  onAdd: (item: PortfolioItem) => void;
};

export function AddToPortfolioForm({ coins, onAdd }: Props) {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const coin = coins.find((c) => c.id === selectedId);
    if (!coin || !amount) return;

    onAdd({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      amount: Number(amount),
      price: coin.current_price,
    });

    setAmount("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-3 rounded-xl border bg-white p-4 shadow"
    >
      <h2 className="font-semibold">Add to Portfolio</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="rounded border p-2"
      >
        <option value="">Select coin</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-black p-2 text-white"
      >
        Add
      </button>
    </form>
  );
}
