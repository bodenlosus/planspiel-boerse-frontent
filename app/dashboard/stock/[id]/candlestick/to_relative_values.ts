import { Database } from "@/database/supabase_types";
import { StockPrice } from "@/database/custom_types";

type priceRow = StockPrice;

interface TtoRelativeValues{
  high_low: [number, number];
  open_close: [number, number];
  date: string;
  isPositive: boolean;
}
export default function toRelativeValues(data: Array<priceRow>): Array<TtoRelativeValues | null>{
  return data.map((price) => {
    if (!price.open || !price.close || !price.high || !price.low) {
      return null;
    }

    return {
      high_low: [
        Math.max(price.open, price.close) - price.low,
        price.high - Math.max(price.open, price.close),
      ],
      open_close: [
        Math.min(price.close, price.open),
        Math.max(price.open, price.close),
      ],
      date: price.timestamp,
      isPositive: price.close > price.open,
    };
  });
}
