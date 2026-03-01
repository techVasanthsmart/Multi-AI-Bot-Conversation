import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/ui/aurora-background";

const inter = Inter({ subsets: ["latin"] });

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const codeFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multi-AI Conversation",
  description: "A chaotic conversation between AI personalities",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${codeFont.variable}`}>
      <body className={inter.className}>
        <AuroraBackground className="min-h-screen w-full bg-slate-50 flex flex-col">
          <div className="relative z-10 w-full flex-1">{children}</div>
          <footer className="relative z-10 w-full py-3 mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-1">
              <p className="text-sm text-slate-600">
                Made with ❤️ by Vasanth Kumar. Open Source for the Community.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <a
                  href="https://vasanthubs.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Portfolio
                </a>
                <span>&bull;</span>
                <a
                  href="https://github.com/techVasanthsmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  GitHub
                </a>
                <span>&bull;</span>
                <a
                  href="https://www.linkedin.com/in/vasanthkumar-s-0995a5185/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </AuroraBackground>
      </body>
    </html>
  );
}
