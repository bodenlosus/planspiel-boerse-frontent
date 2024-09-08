import { Database } from "./supabase_types";

export type StockPrice = Database["public"]["Tables"]["StockPrices"]["Row"];
export type Stock = Database["public"]["Tables"]["StockInfo"]["Row"];