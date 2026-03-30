"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function SupporterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setState("loading");
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          linkedin: linkedin.trim() || undefined,
          message: note.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setState("success");
        setMessage(data.message || "Thank you! We'll be in touch.");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-green-50 border border-green-200 p-8 text-center">
        <p className="text-green-700 font-semibold font-body text-lg">
          {message}
        </p>
        <p className="text-green-600/70 text-sm mt-2 font-body">
          We appreciate you stepping up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="_trap" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name */}
      <div>
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-text-label mb-2">
          Name <span className="text-red">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
          className="w-full px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-text-label mb-2">
          Email <span className="text-red">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-text-label mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(optional)"
          className="w-full px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-text-label mb-2">
          LinkedIn
        </label>
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/yourname (optional)"
          className="w-full px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-text-label mb-2">
          How do you want to help?
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Tell us about yourself and what you'd like to contribute (optional)"
          className="w-full px-5 py-3.5 bg-offwhite border border-card-border text-black placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red transition-shadow font-body resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full sm:w-auto px-10 py-3.5 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {state === "loading" ? "Submitting..." : "Count Me In"}
      </button>

      {state === "error" && (
        <p className="text-red text-sm font-body">{message}</p>
      )}
    </form>
  );
}
