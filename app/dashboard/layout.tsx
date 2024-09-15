import "@/app/globals.css";
import "./layout.css";

import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { NavBar } from "@/components/navbar/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBarPopOut } from "@/components/search_bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TransactionProvider } from "@/lib/transactions/transaction_provider";
import { cn } from "@/lib/utils";
import { supabase } from "@/database/client";

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
  supabase
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        className={cn(
          "h-dvh font-sans antialiased grid grid-rows-[3rem_auto] max-sm:grid-rows-[calc(100vh-3rem)_3rem] grid-cols-[min-content_auto] max-sm:grid-cols-1 overflow-hidden",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar className="col-start-1 col-end-2 max-sm:col-end-1 max-sm:row-start-2 max-sm:grid-rows-1" />
          <div className="w-auto h-full col-start-2 row-start-1 max-sm:hidden flex items-center justify-between mr-6">
            <div></div>
            <SearchBarPopOut className="" doRedirect />
          </div>
          <div className={
            cn(
              "col-start-2 row-start-2  flex flex-col-reverse mb-2 mr-2 overflow-hidden bg-muted/5 rounded-lg border px-3 pt-8 pb-4", 
              "max-sm:col-start-1 max-sm:row-start-1 max-sm:pb-0 max-sm:px-0 max-sm:mr-0"
          )}>
            
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
