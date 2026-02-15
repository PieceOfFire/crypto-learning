import { useQuery } from "@tanstack/react-query";
import { getCoins } from "@/api/crypto";
import { CryptoCard } from "@/components/crypto/CryptoCard";
import { Card } from "@/components/ui/card";

export function CryptoPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
  });

  if (isLoading) {
    return (
      <section className="space-y-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Crypto Cards</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border-rose-200 bg-rose-50 p-6 text-rose-700">
        Failed to load coins. Please try again.
      </Card>
    );
  }

  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-slate-900">Crypto Cards</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((coin) => (
          <CryptoCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            change24h={coin.price_change_percentage_24h}
            image={coin.image}
          />
        ))}
      </div>
    </section>
  );
}
