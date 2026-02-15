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
    <Card className="mt-6 rounded-2xl border-border/70 bg-card/85 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <h3 className="mb-4 text-base font-semibold text-foreground">My Portfolio</h3>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border/70 bg-background/50 px-4 py-6 text-center text-sm text-muted-foreground">
          No assets yet. Add your first coin above.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="px-2 py-2 text-left font-medium">Coin</th>
                  <th className="px-2 py-2 text-right font-medium">Amount</th>
                  <th className="px-2 py-2 text-right font-medium">Price</th>
                  <th className="px-2 py-2 text-right font-medium">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-secondary/40">
                    <td className="px-2 py-3 font-medium text-foreground">
                      {item.name}{" "}
                      <span className="text-muted-foreground">({item.symbol.toUpperCase()})</span>
                    </td>

                    <td className="px-2 py-3 text-right text-muted-foreground">{item.amount}</td>

                    <td className="px-2 py-3 text-right text-muted-foreground">
                      {currencyFormatter.format(item.price)}
                    </td>

                    <td className="px-2 py-3 text-right font-semibold text-foreground">
                      {currencyFormatter.format(item.amount * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 border-t pt-4 text-right text-base font-semibold text-foreground">
            Total: {currencyFormatter.format(totalValue)}
          </div>
        </>
      )}
    </Card>
  );
}
