import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The New American Codex",
  description:
    "The philosophical foundations of the New American Codex: The Magical Child, Tikkun Olam, and American Dynamism.",
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        {/* Page header */}
        <p className="label-text mb-3">
          Philosophy
        </p>
        <h1 className="fluid-h1 font-heading font-bold uppercase text-black mb-6">
          What We Believe
        </h1>
        <p className="fluid-body-lg text-text-secondary/70 mb-16 max-w-2xl">
          The New American Codex rests on three philosophical foundations. They
          aren&apos;t decorative — they shape every lesson we write, every
          activity we design, and every conversation we encourage families to
          have.
        </p>

        {/* The Magical Child */}
        <section className="mb-16">
          <h2 className="fluid-h2 font-heading font-bold uppercase text-black mb-6">
            The Magical Child
          </h2>
          <div className="space-y-4 text-base text-text-primary/80 leading-relaxed">
            <p>
              Joseph Chilton Pearce wrote that children are not empty vessels
              waiting to be filled — they are unfolding intelligences with their
              own developmental logic. Each child has a biological timetable for
              learning that cannot be hurried without damage.
            </p>
            <p>
              The Codex takes this seriously. We design for readiness, not
              deadlines. A four-year-old learns through sensory experience and
              play, not worksheets. A nine-year-old learns through building
              things and exploring, not sitting still. A fifteen-year-old learns
              through real-world projects and genuine responsibility, not
              simulated problems.
            </p>
            <p>
              This means our curriculum uses a &ldquo;no behind, only not
              yet&rdquo; philosophy. Children move through stages when they are
              ready, guided by parents and mentors who know them — not by
              standardized timelines designed for institutional convenience.
            </p>
            <p>
              The magical child is the one whose natural intelligence is honored,
              whose curiosity is protected, and whose development unfolds in its
              own extraordinary time.
            </p>
          </div>
        </section>

        {/* Tikkun Olam */}
        <section className="mb-16">
          <h2 className="fluid-h2 font-heading font-bold uppercase text-black mb-6">
            Tikkun Olam
          </h2>
          <div className="space-y-4 text-base text-text-primary/80 leading-relaxed">
            <p>
              Tikkun Olam — repairing the world — is a concept from Jewish
              tradition that has transcended its origins to become a universal
              ethical imperative. It means that each of us has a responsibility
              to leave the world better than we found it.
            </p>
            <p>
              In the Codex, service is not extracurricular. It is one of the
              eight pillars. Children don&apos;t just learn about civic
              responsibility in a textbook — they practice it. They organize tool
              libraries for their neighbors. They plant community gardens. They
              mentor younger children. They see themselves as stewards of
              something larger than themselves.
            </p>
            <p>
              Moral courage is developed through action, not instruction. The
              Codex creates structured opportunities for children to do the right
              thing — especially when it is difficult, especially when no one is
              watching. This is how character is built: not in a lecture hall, but
              in the gap between what is easy and what is right.
            </p>
            <p>
              We teach children that they are not just passengers in the world.
              They are participants in its repair.
            </p>
          </div>
        </section>

        {/* American Dynamism */}
        <section className="mb-16">
          <h2 className="fluid-h2 font-heading font-bold uppercase text-black mb-6">
            American Dynamism
          </h2>
          <div className="space-y-4 text-base text-text-primary/80 leading-relaxed">
            <p>
              America is not a finished project. It is an ongoing experiment in
              self-governance, individual liberty, and the audacious idea that
              ordinary people can build extraordinary things. The Codex is rooted
              in this tradition.
            </p>
            <p>
              We teach the founding documents not as relics but as living
              arguments. We study the Constitution&apos;s debates because they
              mirror the debates we still have today. We learn about the builders
              and inventors — not just the famous ones, but the local ones, the
              overlooked ones, the ones who saw a problem and made something to
              fix it.
            </p>
            <p>
              Free markets, entrepreneurship, and civic responsibility are not
              abstract concepts in the Codex. Children run real lemonade stands,
              build real products, understand real budgets. They learn that
              creating value for others is one of the most powerful things a
              person can do.
            </p>
            <p>
              American dynamism is not nostalgia. It is the belief that the best
              is still ahead — and that our children will be the ones to build
              it. We raise builders, not consumers. Citizens, not spectators.
              People who make things, not people who wait for permission.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="border-t border-card-border pt-12">
          <h2 className="fluid-h3 font-heading font-bold uppercase text-black mb-6">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                value: "Independence",
                desc: "The capacity to think, act, and provide for oneself. Not isolation — but the confidence that comes from genuine capability.",
              },
              {
                value: "Creativity",
                desc: "The ability to see what doesn't exist yet and bring it into being. Creativity is not a talent — it is a practice, and it can be cultivated.",
              },
              {
                value: "Curiosity",
                desc: "The drive to understand how things work, why things are the way they are, and what might be possible. We protect this above almost everything else.",
              },
              {
                value: "Confidence",
                desc: "Not arrogance — but the quiet knowledge that you can handle what the world throws at you, because you've done hard things before.",
              },
              {
                value: "Strength",
                desc: "Physical, mental, and moral. The ability to endure, to push through, and to stand up for what is right even when it costs you something.",
              },
            ].map((item) => (
              <div key={item.value}>
                <h3 className="font-heading font-bold uppercase text-lg text-black mb-2">
                  {item.value}
                </h3>
                <p className="text-sm text-text-secondary/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
