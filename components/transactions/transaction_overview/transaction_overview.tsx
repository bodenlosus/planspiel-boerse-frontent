import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import Transaction from "@/lib/transaction";
import TransactionCategorie from "@/lib/transaction_categorie";

interface TransactionOverviewProps {
  transactions: Array<Transaction>
}

export default function TransactionOverview({transactions}:TransactionOverviewProps) {

  return (
    <ul className="m-5 flex flex-col gap-5">
      {transactions.map((t: Transaction, index: number) => {
        return (
          <li key={index}>
            <TransactionCard {...t} />
          </li>
        );
      })}
    </ul>
  );
}

interface TransactionCardProps {
  title: string;
  timestamp: Date;
  categorie: TransactionCategorie;
  amount: number;
  id: number;
}

export function TransactionCard({
  title,
  timestamp,
  categorie,
  amount,
  id,
}: TransactionCardProps) {
  let background_class = "";
  let amount_sign = "";
  switch (Math.sign(amount)) {
    case 1:
      background_class = "text-win";
      amount_sign = "+";
      break;
    case -1:
      background_class = "text-loss";
      amount_sign = "-";
      break;
    case 0:
      background_class = "text-foreground";
      amount_sign = "";
      break;
    default:
      background_class = "text-foreground";
      amount_sign = "";
      break;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{timestamp.toUTCString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className={`${background_class} font-bold text-3xl`}>
            {amount_sign}
            {Math.abs(amount)}€
          </span>
        </CardContent>
        <CardFooter>
          <Badge className="text-base">{categorie.display}</Badge>
        </CardFooter>
      </Card>
    </>
  );
}
