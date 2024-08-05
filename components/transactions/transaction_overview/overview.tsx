import Transaction from "@/lib/transactions/transaction";
import { TransactionCard } from "./card";
import { TransactionContextInterface } from "@/lib/transactions/transaction_provider";

interface TransactionOverviewProps {
  transactions: TransactionContextInterface
}

export default function TransactionOverview({transactions}:TransactionOverviewProps) {

  return (
    <ul className="m-5 flex flex-col gap-5">
      {transactions.items.map((t: Transaction, index: number) => {
        return (
          <li key={index}>
            <TransactionCard {...t} />
          </li>
        );
      })}
    </ul>
  );
}

