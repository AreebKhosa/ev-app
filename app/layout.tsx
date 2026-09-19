import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volt Studio App",
  description: "Next.js theme with TSX and Tailwind",
};

// ✅ Critical for mobile: prevents zoom-out layout & fixes viewport height issues
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E4E5E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0D" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background Noise Layer */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Main App Content */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}