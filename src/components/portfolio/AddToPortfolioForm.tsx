import { useState } from "react";
import type { FormEvent } from "react";
import type { Coin } from "@/api/crypto";
import type { PortfolioItem } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  coins: Coin[];
  onAdd: (item: PortfolioItem) => void;
};

export function AddToPortfolioForm({ coins, onAdd }: Props) {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  const numericAmount = Number(amount);
  const isValid = selectedId !== "" && Number.isFinite(numericAmount) && numericAmount > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const coin = coins.find((item) => item.id === selectedId);
    if (!coin || !isValid) {
      return;
    }

    onAdd({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      amount: numericAmount,
      price: coin.current_price,
    });

    setAmount("");
  }

  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">Add Asset</h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="coin">Coin</Label>
          <select
            id="coin"
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="any"
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!isValid}>
          Add to portfolio
        </Button>
      </form>
    </Card>
  );
}
