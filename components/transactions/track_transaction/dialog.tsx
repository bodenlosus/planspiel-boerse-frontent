"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { TrackTransactionForm } from "./form";

export default function TrackTransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Track</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track a recent transaction</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <TrackTransactionForm></TrackTransactionForm>
      </DialogContent>
    </Dialog>
  );
}
