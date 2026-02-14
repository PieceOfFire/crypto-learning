type CryptoCardProps = {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
};

export function CryptoCard({
  name,
  symbol,
  price,
  change24h,
  image,
}: CryptoCardProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="w-full max-w-sm rounded-xl border bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="h-10 w-10" />

        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 uppercase">{symbol}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-xl font-bold">
          ${price.toLocaleString()}
        </p>

        <p
          className={`text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
