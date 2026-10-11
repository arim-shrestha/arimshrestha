import type { Metadata } from "next";
import Providers from "./Providers";
import "./globals.css";
import { themeInitScript } from "@/lib/themeMode";
import home from "@/data/home.json";

export const metadata: Metadata = {
  title: `${home.name} · ${home.title}`,
  description:
    `Portfolio of ${home.name}, a ${home.title} building web, e-commerce, native mobile, desktop, and Adobe creative-tool software.`,
  keywords: [
    home.name,
    home.title,
    "React",
    "React Native",
    "SwiftUI",
    "Electron",
    "Next.js",
    "Node.js",
    "WordPress",
    "Shopify",
    "Adobe UXP",
    "Adobe CEP",
    "portfolio",
    "web developer Nepal",
  ],
  authors: [{ name: home.name }],
  icons: {
    // Bump ?v= when the icon changes so browsers drop their cached copy
    icon: [{ url: "/favicon.ico?v=2", sizes: "any" }],
    shortcut: ["/favicon.ico?v=2"],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
  openGraph: {
    title: home.name,
    description:
      "Full stack development across web, e-commerce, native mobile, desktop, and Adobe creative tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      data-theme="light"
      style={{
        colorScheme: "light",
        ["--font-poppins" as string]: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        ["--font-display" as string]: '"Clash Display", "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        ["--font-mono" as string]: '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
      }}
      suppressHydrationWarning
    >
      <head>
        <meta name="emotion-insertion-point" content="" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers initialMode="light">{children}</Providers>
      </body>
    </html>
  );
}
