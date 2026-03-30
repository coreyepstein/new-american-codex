import type { Metadata } from "next";
import { SupporterForm } from "@/components/SupporterForm";

export const metadata: Metadata = {
  title: "Get Involved — The New American Codex",
  description:
    "Join the New American Codex — share your name, background, and how you want to help build an open-source curriculum for the next generation.",
};

export default function GetInvolvedPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <p className="label-text mb-3">Join the Movement</p>
        <h1 className="fluid-h1 font-heading font-bold uppercase text-black mb-6">
          Get Involved
        </h1>
        <p className="fluid-body-lg text-text-secondary/70 mb-12 max-w-2xl">
          The New American Codex is built by people who believe education should
          be free, open, and rooted in real capability. Whether you&apos;re a
          parent, educator, builder, or just someone who cares — we want to hear
          from you.
        </p>

        <SupporterForm />

        {/* What we're building */}
        <section className="mt-16 mb-16">
          <h2 className="font-heading text-xl font-bold uppercase text-black mb-6">
            Ways to Get Involved
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Curriculum Development",
                desc: "Help research, write, and field-test lessons across the eight pillars.",
              },
              {
                title: "Community Building",
                desc: "Connect with other families using the Codex and share what's working.",
              },
              {
                title: "Technical Contributions",
                desc: "Improve the website, tools, and infrastructure that make the curriculum accessible.",
              },
              {
                title: "Spread the Word",
                desc: "Share the project with families, educators, and communities who might benefit.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-heading font-bold uppercase text-base text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission statement */}
        <section className="border-t border-card-border pt-12 text-center">
          <blockquote className="font-body text-xl md:text-2xl text-black font-medium italic leading-relaxed max-w-xl mx-auto">
            &ldquo;The test of a civilization is in the way it cares for its
            helpless members — and in the way it prepares its young to be
            anything but helpless.&rdquo;
          </blockquote>
          <p className="text-sm text-text-secondary/50 mt-6">
            Thank you for believing in this work.
          </p>
        </section>
      </div>
    </div>
  );
}
