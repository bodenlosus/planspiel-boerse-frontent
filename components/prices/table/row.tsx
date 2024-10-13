import PriceCell, { CellValueTypes } from "./cell";

import { CleanedStockPrice } from "@/database/custom_types";
import { PriceColumnOptions } from "./table";
import { TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface PriceRowProps extends React.ComponentPropsWithoutRef<"div"> {
  price: Record<string, number | string>;
  columns: Record<string, PriceColumnOptions>;
}
export default function PriceRow({ price, columns }: PriceRowProps) {
  return (
    <TableRow className="border-r h-min">
      {Object.entries(columns)
        .map((col, columnIndex) => (
          <PriceCell
            key={columnIndex}
            columnIndex={columnIndex}
            value={price[col[0]]}
            options={col[1]}
          />
        ))
       }
    </TableRow>
  );
}
