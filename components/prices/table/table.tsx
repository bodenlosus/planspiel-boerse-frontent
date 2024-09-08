import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Database } from "@/database/supabase_types";
import { StockPrice } from "@/database/custom_types";

interface props{
    prices: Array<StockPrice>
}

export default function PriceTable({prices}:props) {
    return <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-muted/30 border-b border-r">
          <TableHead className="w-[100px] bg-muted/50 border-r">
            Date
          </TableHead>
          <TableHead>Open</TableHead>
          <TableHead className="bg-muted/30">Close</TableHead>
          <TableHead>High</TableHead>
          <TableHead className="bg-muted/30">Low</TableHead>
          <TableHead>Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price, index) => (
          <TableRow className="border-r" key={index}>
            <TableCell className="bg-muted/40 border-r">
              {new Date(price.timestamp).toLocaleDateString()}
            </TableCell>
            <TableCell>{price.open}€</TableCell>
            <TableCell className="bg-muted/30">
              {price.close}€
            </TableCell>
            <TableCell>{price.high}€</TableCell>
            <TableCell className="bg-muted/30">{price.low}€</TableCell>
            <TableCell>{price.volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>;
  }
  
  