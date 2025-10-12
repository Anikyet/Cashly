import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import SessionProviderWrapper from "./SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cashly",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='14' font-size='16'>💸</text></svg>"
        />
      </head>
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen ">
            <AppbarClient />
            <div className="flex flex-col">
              <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </div>
          </div>
        
        </body>
      </Providers>
    </html>
  );
}