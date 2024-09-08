"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentDate,
  getDateOneWeekAgo,
  toISODateOnly,
} from "@/lib/date_utils";

import { Badge } from "@/components/ui/badge";
import CandleStickChart from "./candlestick/chart";
import { Database } from "@/database/supabase_types";
import PriceTable from "@/components/prices/table/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchStockData } from "@/database/fetch_data";
import { supabase } from "@/database/client";
import { urlSchema } from "./url_scheme";
import { z } from "zod";

interface SupaBaseResponse {
  data: any | null;
  error: Error | null;
}


export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { start: string; end: string };
}) {

  let urlParams
  try {
    urlParams = urlSchema({
      start: toISODateOnly(getCurrentDate()),
      end: toISODateOnly(getDateOneWeekAgo()),
    }).parse({ ...searchParams, ...params });
  } catch (error) {
    console.error("Invalid URL parameters:",);
    return <h1>Invalid URL parameters:</h1>;
  }

  const {info, prices, success} = await fetchStockData(urlParams)

  if (!success) {
    return (
      <h1 className="text-destructive">Failed to fetch data from database</h1>
    );
  }

  return (
    <main className="w-full h-full overflow-hidden grid grid-cols-4 grid-rows-3 gap-5">
      <Card className="col-span-1 row-span-1">
        <CardHeader className="flex-row flex-wrap justify-left gap-x-4 gap-y-1">
          <CardTitle className="text-3xl font-extrabold">
            {info[0].symbol}
          </CardTitle>

          <h1>{info[0].name}</h1>
          <Badge className="w-fit">{info[0].description}</Badge>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3">
          <div></div>
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-2 row-start-2">
        <CardHeader className="flex-col gap-2">
          <CardTitle className="">Graph View</CardTitle>
          {new Date(urlParams.start).toDateString()} -{" "}
          {new Date(urlParams.end).toDateString()}
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3">
          <CandleStickChart data={prices}></CandleStickChart>
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-2 row-start-2">
        <CardHeader className="flex-col gap-2">
          <CardTitle className="">Table View</CardTitle>
          {new Date(urlParams.start).toDateString()} -{" "}
          {new Date(urlParams.end).toDateString()}
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3">
          <ScrollArea className="w-full aspect-video rounded-md border pr-3">
            <PriceTable prices={prices} />
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
