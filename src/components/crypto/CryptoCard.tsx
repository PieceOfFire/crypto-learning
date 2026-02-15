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
    <Card className="w-full rounded-2xl border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="h-11 w-11 rounded-full bg-slate-100 p-1" />

        <div>
          <h3 className="font-semibold leading-tight text-slate-900">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{symbol}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="text-xl font-bold tracking-tight text-slate-900">{currencyFormatter.format(price)}</p>

        <p
          className={[
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {isPositive ? "+" : ""}
          {change24h.toFixed(2)}%
        </p>
      </div>
    </Card>
  );
}
