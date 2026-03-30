"use client";

import { useState } from "react";
import type {
  ChildProfileRequest,
  PersonalizeResponse,
} from "@/lib/types/personalize";
import { ChildProfileForm } from "@/components/ChildProfileForm";
import { PersonalizedWeek } from "@/components/PersonalizedWeek";

type PageState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; response: PersonalizeResponse }
  | { kind: "error"; message: string };

export function PersonalizePage() {
  const [state, setState] = useState<PageState>({ kind: "idle" });

  async function handleSubmit(profile: ChildProfileRequest) {
    setState({ kind: "loading" });

    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || `Request failed with status ${res.status}`
        );
      }

      const data: PersonalizeResponse = await res.json();
      setState({ kind: "done", response: data });
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        {state.kind === "idle" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-10">
              <h1 className="font-heading fluid-h2 font-bold text-black uppercase mb-4">
                Personalize Your Week
              </h1>
              <p className="fluid-body-lg text-text-secondary max-w-2xl mx-auto font-body">
                Tell us about your child, and we&rsquo;ll generate a
                personalized week of curriculum themed to their interests.
              </p>
            </div>
            <ChildProfileForm onSubmit={handleSubmit} />
          </div>
        )}

        {state.kind === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            {/* Pulsing book icon */}
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-red/10 flex items-center justify-center animate-pulse">
                <span className="text-4xl" role="img" aria-label="Generating">
                  &#128218;
                </span>
              </div>
              <div className="absolute inset-0 w-20 h-20 border-2 border-red/20 animate-ping" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-black uppercase mb-2">
              Generating your personalized week&hellip;
            </h2>
            <p className="text-sm text-text-secondary font-body mb-6">
              This typically takes 15&ndash;30 seconds.
            </p>
            {/* Skeleton cards */}
            <div className="w-full max-w-2xl space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="industrial-card p-5 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-5 bg-card-bg" />
                    <div className="w-24 h-5 bg-card-bg" />
                  </div>
                  <div className="h-5 bg-card-bg w-3/4 mb-2" />
                  <div className="h-4 bg-card-bg/60 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {state.kind === "done" && (
          <div className="animate-fade-in-up">
            <PersonalizedWeek response={state.response} />
            <div className="text-center mt-10">
              <button
                onClick={() => setState({ kind: "idle" })}
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-red border border-red/30 hover:bg-red/5 transition-colors no-print"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Start Over
              </button>
            </div>
          </div>
        )}

        {state.kind === "error" && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="w-16 h-16 bg-red-50 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="font-heading text-xl font-semibold text-black uppercase mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-text-secondary font-body mb-6 text-center max-w-md">
              {state.message}
            </p>
            <button
              onClick={() => setState({ kind: "idle" })}
              className="px-6 py-3 bg-red text-offwhite font-mono text-xs uppercase tracking-[0.15em] hover:bg-red/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
