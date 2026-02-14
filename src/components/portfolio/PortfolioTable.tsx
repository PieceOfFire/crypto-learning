import type { PortfolioItem } from "@/types/portfolio";

type Props = {
  items: PortfolioItem[];
};

export function PortfolioTable({ items }: Props) {
  const totalValue = items.reduce(
    (sum, item) => sum + item.amount * item.price,
    0
  );

  return (
    <div className="mt-10 rounded-xl border bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        My Portfolio
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th>Coin</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b last:border-0"
            >
              <td className="py-2 font-medium">
                {item.name} ({item.symbol.toUpperCase()})
              </td>

              <td>{item.amount}</td>

              <td>
                ${item.price.toLocaleString()}
              </td>

              <td className="font-semibold">
                $
                {(item.amount * item.price).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right font-bold">
        Total: ${totalValue.toLocaleString()}
      </div>
    </div>
  );
}
