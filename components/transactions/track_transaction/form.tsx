"use client";

import {
  CategorieContext,
  CategorieProvider,
} from "@/lib/categories/categorie_provider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { DatePickerWithPresets } from "./timestamp_picker";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectTransactionCategorie } from "./categorie_select";
import { ToastAction } from "@/components/ui/toast";
import Transaction from "@/lib/transactions/transaction";
import TransactionCategorie from "@/lib/categories/categorie";
import { TransactionContext } from "@/lib/transactions/transaction_provider";
import uniqueID from "@/lib/generate_unique_id";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title should not be empty" })
    .max(120, { message: "Title is too long" }),
  timestamp: z.date(),
  categorie: z.instanceof(TransactionCategorie),
  amount: z.coerce.number().safe({ message: "Amount is not valid" }),
});

export function TrackTransactionForm() {
  const { toast } = useToast();
  const transactions = useContext(TransactionContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timestamp: new Date(Date.now()),
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const new_t: Transaction = new Transaction(
      uniqueID(transactions.items.map((t: Transaction) => t.id)),
      values.title,
      values.timestamp,
      values.categorie,
      values.amount
    );

    transactions.add([new_t]);

    toast({
      title: `Transaction tracked`,
      description: `${values.title}: ${values.amount}€`,
      action: (
        <ToastAction
          onClick={() => transactions.remove(new_t.id)}
          altText="Undo"
        >
          Undo
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New Car" {...field} />
              </FormControl>
              <FormDescription>
                Brief self explanatory title of the Payment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Timestamp</FormLabel>
              <DatePickerWithPresets field={field}></DatePickerWithPresets>
              <FormDescription>Time the Payment was done</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Categorie</FormLabel>
              <CategorieProvider>
                <SelectTransactionCategorie
                  field={field}
                  onSelect={(categorie: TransactionCategorie) =>
                    form.setValue("categorie", categorie)
                  }
                ></SelectTransactionCategorie>
              </CategorieProvider>
              <FormDescription>
                Categorie of the Payment e.g. Groceries
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ammount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  defaultValue={0}
                  max={Number.MAX_SAFE_INTEGER}
                  min={Number.MIN_SAFE_INTEGER}
                  {...field}
                />
              </FormControl>
              <FormDescription>The amount of the transaction</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">Track</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
