"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: fd.get("password") }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-noir flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-carbon border border-gold/30 p-8">
        <p className="font-display text-2xl text-ivory text-center">
          GiGi <span className="text-gold">L</span> — Admin
        </p>
        <span className="gold-rule mx-auto my-5" />
        <label className="block">
          <span className="sr-only">Mot de passe</span>
          <input
            name="password"
            type="password"
            required
            autoFocus
            placeholder="Mot de passe"
            className="field"
          />
        </label>
        {error && (
          <p className="text-red-400 text-sm mt-3" role="alert">
            Mot de passe incorrect.
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-gold w-full mt-5 disabled:opacity-60">
          {loading ? "…" : "Connexion"}
        </button>
      </form>
    </main>
  );
}
