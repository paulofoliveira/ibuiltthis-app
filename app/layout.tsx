import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBuiltThis - Share Your Creations, Discover New Launches",
  description: "A community platform for creators to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, real builders, genuine feedback.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"
      className={`${outfit.className} antialiased`}>
      <body className="min-h-full flex flex-col">
        <header>iBuiltThis</header>
        {children}
        <footer>iBuiltThis Inc. All rights reserved.</footer>
      </body>
    </html>
  );
}
