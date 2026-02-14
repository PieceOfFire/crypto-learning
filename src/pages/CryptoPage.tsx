import { useQuery } from "@tanstack/react-query";
import { getCoins } from "@/api/crypto";
import { CryptoCard } from "@/components/crypto/CryptoCard";

export function CryptoPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
  });

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-600">Error loading data</p>;
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Карточки криптовалют</h2>

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