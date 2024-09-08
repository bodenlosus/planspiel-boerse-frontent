import "@/app/globals.css";
import "./layout.css"

import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { NavBar } from "@/components/navbar/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "./search/search_bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TransactionProvider } from "@/lib/transactions/transaction_provider";
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

export default function DashboardLayout({
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
          "h-dvh font-sans antialiased grid grid-rows-[3rem_auto] grid-cols-[min-content_auto]",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <NavBar className="col-start-1 col-end-2"/>
          <div className="w-auto h-full col-start-2 row-start-1">
          </div>
          <div className="col-start-2 row-start-2 flex flex-col-reverse mb-2 mr-2 overflow-hidden bg-muted/5 rounded-lg border px-3 pt-8 pb-4" >
          <ScrollArea className="grow px-5 gradient-fade-out">
            <TransactionProvider>{children}</TransactionProvider>
            </ScrollArea>
          </div>
          
        
        <Toaster />
        </ThemeProvider>
      </body>
     
    </html>
  );
}
