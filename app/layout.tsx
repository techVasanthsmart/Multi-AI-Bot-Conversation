import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/ui/aurora-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-AI Conversation",
  description: "A chaotic conversation between AI personalities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuroraBackground className="min-h-screen w-full bg-slate-50 flex flex-col">
          <div className="relative z-10 w-full flex-1">
            {children}
          </div>
          <footer className="relative z-10 w-full py-6 mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-2">
              <p className="text-slate-600 font-medium">Made with ❤️ by Vasanth Kumar. Open Source for the Community.</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <a href="https://vasanthubs.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Portfolio</a>
                <span>&bull;</span>
                <a href="https://github.com/techVasanthsmart" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
                <span>&bull;</span>
                <a href="https://www.linkedin.com/in/vasanthkumar-s-0995a5185/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
              </div>
            </div>
          </footer>
        </AuroraBackground>
      </body>
    </html>
  );
}
