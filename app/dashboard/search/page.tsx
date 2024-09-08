"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TgetStockFromSearchString, getStockFromSearchString } from "@/database/search_stock";
import {
  getCurrentDate,
  getDateOneWeekAgo,
  toISODateOnly,
} from "@/lib/date_utils";

import { Badge } from "@/components/ui/badge";
import { Database } from "@/database/supabase_types";
import PriceTable from "@/components/prices/table/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "./search_bar";
import { StockList } from "./stock_list";
import { fetchStockData } from "@/database/fetch_data";
import { supabase } from "@/database/client";
import { urlSchema } from "./url_scheme";
import { z } from "zod";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {

  let urlParams
  try {
    urlParams = urlSchema().parse({ ...searchParams});
  } catch (error) {
    console.error("Invalid URL parameters:",);
    return <h1>Invalid URL parameters:</h1>;
  }

  const {stocks, error, success}:TgetStockFromSearchString = (urlParams.query) ? await getStockFromSearchString(urlParams.query): { stocks: [], error: null, success: false }

  if (error) {
    return (
      <h1 className="text-destructive">Failed to fetch data from database</h1>
    );
  }

  return (
    <main className="w-full h-full overflow-hidden">
        <div>
        <SearchBar doRedirect></SearchBar>
        </div>
        <StockList stocks={stocks}></StockList>
    </main>
  );
}

