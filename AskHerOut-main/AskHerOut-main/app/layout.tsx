import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask Her Out",
  description: "App created by angelDova",
  icons: [
    {
      url: "/elly-belly1.gif",
      href: "/elly-belly1.gif",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ConfettiProvider />
        {children}
      </body>
    </html>
  );
}
