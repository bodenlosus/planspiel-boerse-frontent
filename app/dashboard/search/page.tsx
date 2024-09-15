"use server";

import SearchBar, { SearchBarPopOut } from "../../../components/search_bar";
import {
  TgetStockFromSearchString,
  getStockFromSearchString,
} from "@/database/search_stock";

import { StockList } from "./stock_list";
import { urlSchema } from "./url_scheme";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  let urlParams;
  try {
    urlParams = urlSchema().parse({ ...searchParams });
  } catch (error) {
    console.error("Invalid URL parameters:");
    return <h1>Invalid URL parameters:</h1>;
  }

  const { stocks, error, success }: TgetStockFromSearchString = urlParams.query
    ? await getStockFromSearchString(urlParams.query, 5)
    : { stocks: [], error: null, success: false };

  if (error) {
    return (
      <h1 className="text-destructive">Failed to fetch data from database</h1>
    );
  }

  return (
    <main className="w-full h-full overflow-hidden">
      <div className="w-full flex justify-center">
        <SearchBar className="w-full bg-background" doRedirect/>
      </div>
      <StockList stocks={stocks}></StockList>
    </main>
  );
}
