"use client";

import { useState } from "react";

type SignupState = "idle" | "loading" | "success" | "error";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setState("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setState("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="signup" className="bg-cream section-padding">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="fluid-h3 font-serif font-bold text-ink mb-3">
          Join the Codex Community
        </h2>
        <p className="text-base text-slate-deep/70 mb-8 leading-relaxed">
          Get updates as the curriculum grows. No spam, no noise &mdash; just
          meaningful progress on building something better for our kids.
        </p>

        {state === "success" ? (
          <div className="bg-sage/10 border border-sage/30 rounded-lg p-6">
            <p className="text-sage font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 bg-parchment border border-ink/10 rounded-lg text-ink placeholder:text-slate-deep/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm transition-shadow"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-8 py-3.5 bg-amber-warm text-ink font-semibold text-sm rounded-lg hover:bg-amber-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              {state === "loading" ? "Joining..." : "Get Updates"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p className="text-red-600 text-sm mt-3">{message}</p>
        )}
      </div>
    </section>
  );
}
