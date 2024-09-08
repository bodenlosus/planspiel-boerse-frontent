import { Database } from "@/database/supabase_types";

type priceRow = Database["public"]["Tables"]["StockPrices"]["Row"];
export default function toRelativeValues(data: Array<priceRow>) {
  return data.map((price) => {
    if (!price.open || !price.close || !price.high || !price.low) {
      return;
    }

    const offset = Math.max(price.close - price.open, 0);

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
    };
  });
}
