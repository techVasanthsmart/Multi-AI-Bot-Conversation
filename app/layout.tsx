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
        <AuroraBackground className="min-h-screen w-full bg-slate-50">
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </AuroraBackground>
      </body>
    </html>
  );
}
