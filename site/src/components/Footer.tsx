import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-parchment/80">
      <div className="max-w-6xl mx-auto px-6 section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Wordmark + tagline */}
          <div>
            <p className="font-serif font-semibold text-xl text-parchment mb-2">
              New American Codex
            </p>
            <p className="text-sm text-parchment/60 leading-relaxed">
              An open-source curriculum for raising capable, self-governing
              humans.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-sm text-parchment/50 uppercase tracking-wider mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/framework"
                className="text-sm hover:text-amber-warm transition-colors"
              >
                Framework
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-amber-warm transition-colors"
              >
                About
              </Link>
              <Link
                href="/donate"
                className="text-sm hover:text-amber-warm transition-colors"
              >
                Donate
              </Link>
              <Link
                href="https://github.com/coreyepstein/new-american-codex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-amber-warm transition-colors"
              >
                GitHub Repository
              </Link>
            </div>
          </div>

          {/* License */}
          <div>
            <p className="font-semibold text-sm text-parchment/50 uppercase tracking-wider mb-4">
              License
            </p>
            <p className="text-sm leading-relaxed">
              Curriculum content:{" "}
              <Link
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-warm hover:text-amber-light transition-colors"
              >
                CC BY-SA 4.0
              </Link>
            </p>
            <p className="text-sm leading-relaxed mt-1">
              Code:{" "}
              <Link
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-warm hover:text-amber-light transition-colors"
              >
                MIT License
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-parchment/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-parchment/40">
            &copy; {new Date().getFullYear()} The New American Codex. Built in
            the open.
          </p>
          <p className="text-xs text-parchment/40">
            Independence. Creativity. Curiosity. Confidence. Strength.
          </p>
        </div>
      </div>
    </footer>
  );
}
