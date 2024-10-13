import "@/app/globals.css";

import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = FontSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyTrail",
  description: "MoneyTrail",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={cn(
          "h-dvh bg-background font-sans antialiased flex flex-col-reverse sm:flex-row w-full",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
