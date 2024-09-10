import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StockPrice } from "@/database/custom_types";
import { cn } from "@/lib/utils";

interface props {
  prices: Array<StockPrice>;
}

export default function PriceTable({ prices }: props) {
  return (
    <Table className="min-h[200px]">
      <TableHeader>
        <TableRow className="bg-muted/30 border-b h-min">
          {["Date", "Open", "Close", "High", "Low", "Volume"].map(
            (header, index) => (
              <TableHead
                key={index}
                className={cn(
                  "h-8",
                  index % 2 ? "" : "bg-muted/30",
                  index == 0 ? "border-r w-fit" : ""
                )}
              >
                {header}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price, index) => (
          <TableRow className="border-r h-min" key={index}>
            {Object.values(price).map((value, columnIndex) => (
              <TableCell className={cn(
                "py-2 px-2 w-fit hyphens-none text-nowrap",
                columnIndex % 2 ? "" : "bg-muted/30",
                columnIndex == 0 ? "border-r" : ""
              )} key={columnIndex}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
