import { Stock, StockPrice } from "./custom_types";

import { Database } from "./supabase_types";
import { supabase } from "./client";

export async function fetchPricesForInterval(
  id: number,
  intervalStart: string,
  intervalEnd: string
) {
  const { data, error } = await supabase.rpc("get_stock_prices_by_interval", {
    p_stock_id: id,
    p_interval_start: intervalStart, // Corrected parameter names
    p_interval_end: intervalEnd,
  });

  if (error) {
    console.error("Error fetching prices:", error);
  } else {
    console.log("Fetched data:", data);
  }
}

interface TfetchLastPrices {
  prices: Array<StockPrice>;
  success: boolean;
}
export async function fetchLastPrices(args: {
    id: number;
    limit: number;
  }): Promise<TfetchLastPrices> {
    // Handle responses and errors individually
    try {
      const priceResponse = await supabase.rpc("get_last_stock_prices", {
          p_stock_id: args.id,
          limit_arg: args.limit,
        }, {count:"estimated"})
  
      // Check if the responses have data
      if (!priceResponse.count) {
        console.error("No data found in the database", )
        return {prices: [], success: false };
      }
  
      return {
        prices: priceResponse.data,
        success: true,
      };
    } catch (error) {
      console.error("Error:", error);
    }
    return {
      prices: [],
      success: false,
    };
  }
  


export interface TfetchStockData {
  info: Array<Stock>;
  prices: Array<StockPrice>;
  success: boolean;
}
export async function fetchStockData(args: {
  id: number;
  start: string;
  end: string;
}): Promise<TfetchStockData> {
  // Handle responses and errors individually
  try {
    const [infoResponse, priceResponse] = await Promise.all([
      supabase.rpc("get_stock_info_by_id", {
        p_stock_id: args.id,
      }, {count:"estimated"}),
      supabase.rpc("get_stock_prices_by_interval", {
        p_stock_id: args.id,
        p_interval_start: args.start,
        p_interval_end: args.end,
      }, {count:"estimated"}),
    ]);

    // Check if the responses have data
    if (!infoResponse.count || !priceResponse.count) {
      console.error("No data found in the database", )
      return { info: [], prices: [], success: false };
    }

    return {
      info: infoResponse.data,
      prices: priceResponse.data,
      success: true,
    };
  } catch (error) {
    console.error("Error:", error);
  }
  return {
    info: [],
    prices: [],
    success: false,
  };
}
