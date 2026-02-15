import { TransferForm } from "@/components/transfer/TransferForm";

export function TransferPage() {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">Transfer</h2>
      <p className="mt-1 text-sm text-slate-500">Send assets between wallets with validation.</p>

      <div className="mt-6">
        <TransferForm />
      </div>
    </section>
  );
}
