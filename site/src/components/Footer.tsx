import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-offwhite/80">
      <div className="max-w-6xl mx-auto px-6 section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Wordmark + tagline */}
          <div>
            <p className="font-heading font-bold text-xl uppercase tracking-wider text-offwhite mb-2">
              New American Codex
            </p>
            <p className="text-sm text-offwhite/60 leading-relaxed font-body">
              An open-source curriculum for raising capable, self-governing
              humans.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-offwhite/40 mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/framework"
                className="text-sm hover:text-red transition-colors"
              >
                Framework
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-red transition-colors"
              >
                About
              </Link>
              <Link
                href="/donate"
                className="text-sm hover:text-red transition-colors"
              >
                Donate
              </Link>
              <Link
                href="https://github.com/coreyepstein/new-american-codex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-red transition-colors"
              >
                GitHub Repository
              </Link>
            </div>
          </div>

          {/* License */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-offwhite/40 mb-4">License</p>
            <p className="text-sm leading-relaxed">
              Curriculum content:{" "}
              <Link
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red hover:text-red/80 transition-colors"
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
                className="text-red hover:text-red/80 transition-colors"
              >
                MIT License
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-offwhite/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-offwhite/40">
            &copy; {new Date().getFullYear()} The New American Codex. Built in
            the open.
          </p>
          <p className="text-xs text-offwhite/40">
            Independence. Creativity. Curiosity. Confidence. Strength.
          </p>
        </div>
      </div>

      <div className="accent-bar-bottom" />
    </footer>
  );
}
