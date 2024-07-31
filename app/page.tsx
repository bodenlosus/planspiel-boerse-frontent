"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import TrackTransactionDialog from "@/components/transactions/track_transaction/track_transaction";
import Transaction from "@/lib/transaction";
import TransactionCategorie from "@/lib/transaction_categorie";
import TransactionOverview from "@/components/transactions/transaction_overview/transaction_overview";

const categories = [
  new TransactionCategorie("red", "groceries", "Groceries"),
  new TransactionCategorie("green", "cosmetics", "Cosmetics"),
];

const transactions = [
  new Transaction(1, "EDEKA BIENEK", new Date(Date.now()), categories[0], 1),
  new Transaction(1, "ROSSMANN", new Date(Date.now()), categories[1], -1),
];

export default function Home() {
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
          <TrackTransactionDialog></TrackTransactionDialog>
          <TransactionOverview transactions={[]}></TransactionOverview>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
