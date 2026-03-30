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
    <section id="signup" className="bg-card-bg section-padding">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="label-text mb-4">Stay Updated</p>
        <h2 className="fluid-h3 font-heading font-bold text-black mb-3">
          Join the Codex Community
        </h2>
        <p className="text-base text-text-secondary mb-8 leading-relaxed font-body">
          Get updates as the curriculum grows. No spam, no noise &mdash; just
          meaningful progress on building something better for our kids.
        </p>

        {state === "success" ? (
          <div className="bg-green-50 border border-green-200 p-6">
            <p className="text-green-700 font-semibold font-body">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-8 py-3.5 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              {state === "loading" ? "Joining..." : "Get Updates"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p className="text-red text-sm mt-3 font-body">{message}</p>
        )}
      </div>
    </section>
  );
}
