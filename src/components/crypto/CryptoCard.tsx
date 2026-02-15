import { Card } from "@/components/ui/card";

type CryptoCardProps = {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function CryptoCard({
  name,
  symbol,
  price,
  change24h,
  image,
}: CryptoCardProps) {
  const isPositive = change24h >= 0;

  return (
    <Card className="w-full rounded-2xl border-border/70 bg-card/85 p-5 shadow-lg shadow-black/20 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-primary/15">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="h-11 w-11 rounded-full border border-border/80 bg-background/80 p-1" />

        <div>
          <h3 className="font-semibold leading-tight text-foreground">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{symbol}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="text-xl font-bold tracking-tight text-foreground">{currencyFormatter.format(price)}</p>

        <p
          className={[
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            isPositive ? "bg-accent/25 text-accent" : "bg-primary/20 text-primary",
          ].join(" ")}
        >
          {isPositive ? "+" : ""}
          {change24h.toFixed(2)}%
        </p>
      </div>
    </Card>
  );
}
