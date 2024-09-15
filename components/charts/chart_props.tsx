import { StockPrice } from "@/database/custom_types";

export interface props {
    data: Array<StockPrice>;
    className?: string;
  }