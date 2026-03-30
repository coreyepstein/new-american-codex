import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://thenewamerican.org"),
  title: "The New American Codex",
  description:
    "An open-source curriculum for raising capable, self-governing humans — from pregnancy through age 18.",
  openGraph: {
    title: "The New American Codex",
    description:
      "An open-source curriculum for raising capable, self-governing humans — from pregnancy through age 18.",
    type: "website",
    locale: "en_US",
    siteName: "The New American Codex",
  },
  twitter: {
    card: "summary_large_image",
    title: "The New American Codex",
    description:
      "An open-source curriculum for raising capable, self-governing humans — from pregnancy through age 18.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
