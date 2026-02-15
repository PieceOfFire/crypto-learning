import { Card } from "@/components/ui/card";
import type { PortfolioItem } from "@/types/portfolio";

type Props = {
  items: PortfolioItem[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function PortfolioTable({ items }: Props) {
  const totalValue = items.reduce((sum, item) => sum + item.amount * item.price, 0);

  return (
    <Card className="mt-6 rounded-2xl border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-slate-900">My Portfolio</h3>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
          No assets yet. Add your first coin above.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="px-2 py-2 text-left font-medium">Coin</th>
                  <th className="px-2 py-2 text-right font-medium">Amount</th>
                  <th className="px-2 py-2 text-right font-medium">Price</th>
                  <th className="px-2 py-2 text-right font-medium">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-slate-50/70">
                    <td className="px-2 py-3 font-medium text-slate-900">
                      {item.name} <span className="text-slate-500">({item.symbol.toUpperCase()})</span>
                    </td>

                    <td className="px-2 py-3 text-right text-slate-700">{item.amount}</td>

                    <td className="px-2 py-3 text-right text-slate-700">{currencyFormatter.format(item.price)}</td>

                    <td className="px-2 py-3 text-right font-semibold text-slate-900">
                      {currencyFormatter.format(item.amount * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 border-t pt-4 text-right text-base font-semibold text-slate-900">
            Total: {currencyFormatter.format(totalValue)}
          </div>
        </>
      )}
    </Card>
  );
}
