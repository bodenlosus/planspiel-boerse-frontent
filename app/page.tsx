"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TransactionContext,
  TransactionProvider,
} from "@/lib/transactions/transaction_provider";

import TrackTransactionDialog from "@/components/transactions/track_transaction/dialog";
import Transaction from "@/lib/transactions/transaction";
import TransactionCategorie from "@/lib/categories/categorie";
import TransactionOverview from "@/components/transactions/transaction_overview/overview";
import { useContext } from "react";

export default function Home() {
  const transactions = useContext(TransactionContext);
  return (
    <main className="grow mt-5 mx-5 max-sm:h[1px] overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Tabs
            defaultValue="day"
            className="w-full h-full flex flex-col max-sm:items-center"
          >
            <TabsList className="w-full justify-stretch">
              <TabsTrigger value="day">Today</TabsTrigger>
              <TabsTrigger value="week">Past Week</TabsTrigger>
              <TabsTrigger value="month">Past Month</TabsTrigger>
              <TabsTrigger value="year">Past Year</TabsTrigger>
            </TabsList>
            <TabsContent
              className="flex w-full grow overflow-y-scroll"
              value="day"
            ></TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <TrackTransactionDialog />

          <TransactionOverview transactions={transactions} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
