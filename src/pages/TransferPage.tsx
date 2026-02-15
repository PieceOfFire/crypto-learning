import { TransferForm } from "@/components/transfer/TransferForm";

export function TransferPage() {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Transfer</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Send assets between wallets with validation.
      </p>

      <div className="mt-6">
        <TransferForm />
      </div>
    </section>
  );
}
