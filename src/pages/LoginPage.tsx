import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const emailError = useMemo(() => {
    if (!isSubmitted) {
      return "";
    }

    if (email.trim() === "") {
      return "Email is required";
    }

    if (!isEmailValid(email)) {
      return "Enter a valid email";
    }

    return "";
  }, [email, isSubmitted]);

  const passwordError = useMemo(() => {
    if (!isSubmitted) {
      return "";
    }

    if (password.trim() === "") {
      return "Password is required";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  }, [isSubmitted, password]);

  const isValid = emailError === "" && passwordError === "" && email !== "" && password !== "";

  function resetForm() {
    setEmail("");
    setPassword("");
    setIsSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isEmailValid(email) || password.length < 6) {
      return;
    }

    setIsSuccessOpen(true);
  }

  function handleCloseSuccess() {
    setIsSuccessOpen(false);
    resetForm();
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-sm rounded-2xl border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <Link to="/coins" className="text-sm text-slate-500 transition hover:text-slate-900">
          {"<- Back"}
        </Link>

        <h2 className="mt-4 text-center text-2xl font-semibold tracking-tight text-slate-900">Login</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
            {emailError && <p className="text-sm text-rose-600">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
            {passwordError && <p className="text-sm text-rose-600">{passwordError}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitted && !isValid}>
            Login
          </Button>
        </form>
      </Card>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Login successful!</DialogTitle>
            <DialogDescription>You are now signed in.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleCloseSuccess}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
