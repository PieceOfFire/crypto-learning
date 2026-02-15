import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TransferForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const isValid = from.trim() !== "" && to.trim() !== "" && Number(amount) > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setOpen(true);
  }

  function reset() {
    setFrom("");
    setTo("");
    setAmount("");
  }

  return (
    <>
      <Card className="max-w-md rounded-2xl border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <h3 className="mb-5 text-base font-semibold text-slate-900">Transfer funds</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-wallet">From</Label>
            <Input
              id="from-wallet"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              placeholder="Wallet ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-wallet">To</Label>
            <Input
              id="to-wallet"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              placeholder="Wallet ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Amount</Label>
            <Input
              id="transfer-amount"
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
            />
          </div>

          <Button type="submit" disabled={!isValid} className="w-full">
            Send
          </Button>
        </form>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer completed</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-sm text-slate-700">
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Amount: {amount}</p>
          </div>

          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
