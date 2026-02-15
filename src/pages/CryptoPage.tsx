import { useQuery } from "@tanstack/react-query";
import { getCoins } from "@/api/crypto";
import { CryptoCard } from "@/components/crypto/CryptoCard";
import { Card } from "@/components/ui/card";
import photoMain from "@/components/ui/photo_main.jpg";

export function CryptoPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
  });

  const cards = (data ?? []).slice(0, 6);

  function renderRightColumn() {
    if (isLoading) {
      return (
        <div className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Crypto Cards</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-32 animate-pulse rounded-2xl border-border/60 bg-muted/35" />
            ))}
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <Card className="rounded-2xl border-rose-300/60 bg-rose-900/20 p-6 text-rose-200">
          Failed to load coins. Please try again.
        </Card>
      );
    }

    return (
      <div>
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">Crypto Cards</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((coin) => (
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
      </div>
    );
  }

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen min-h-screen overflow-hidden px-4 sm:px-6">
      <div className="pointer-events-none fixed inset-0 left-0 z-0 w-full lg:w-[44vw]">
        <img src={photoMain} alt="" aria-hidden className="h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/44 to-black/58" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/28" />
        <div className="absolute inset-y-0 right-0 hidden w-44 bg-gradient-to-r from-transparent via-[#0b2a1e]/70 to-[#0b2a1e] lg:block" />
      </div>

      <div className="relative z-10 min-h-screen lg:pl-[44vw]">
        <div className="mx-auto w-full max-w-3xl py-2 pb-8">{renderRightColumn()}</div>
      </div>
    </section>
  );
}
