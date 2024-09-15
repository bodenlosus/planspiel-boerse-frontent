"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentDate,
  getDateOneWeekAgo,
  getTimeBetweenDates,
  toISODateOnly,
} from "@/lib/date_utils";

import AreaChart from "@/components/charts/area";
import { Badge } from "@/components/ui/badge";
import CandleStickChart from "@/components/charts/candle_stick";
import ChartContainer from "@/components/charts/container";
import { IntervallContainer } from "./pick_intervall";
import PriceTable from "@/components/prices/table/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import StockStats from "./stat";
import { fetchStockData } from "@/database/fetch_data";
import { formatter as formatPrices } from "@/lib/formatter";
import { urlSchema } from "./url_scheme";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { start: string; end: string };
}) {
  let urlParams;
  try {
    urlParams = urlSchema({
      start: toISODateOnly(getDateOneWeekAgo()),
      end: toISODateOnly(getCurrentDate()),
    }).parse({ ...searchParams, ...params });
  } catch (error) {
    console.error("Invalid URL parameters:");
    return <h1>Invalid URL parameters:</h1>;
  }

  console.log(urlParams);

  const { info, prices, success } = await fetchStockData(urlParams);

  if (!success) {
    return (
      <h1 className="text-destructive">Failed to fetch data from database</h1>
    );
  }

  const formattedPrices = formatPrices(prices);

  return (
    <main className="w-full h-full overflow-hidden grid sm:grid-cols-2 md:grid-cols-4 gap-5 grid-rows-[masonry]">
      <Card className="col-span-2">
        <CardHeader className="flex-row flex-wrap justify-left gap-x-4 gap-y-1">
          <CardTitle className="text-3xl font-extrabold">
            {info[0].symbol}
          </CardTitle>

          <h1>{info[0].name}</h1>
          <Badge className="w-fit">{info[0].description}</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          <StockStats data={formattedPrices.slice(1)}></StockStats>
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-1 max-sm:col-span-2">
        <CardHeader className="flex-row gap-2">
          <CardTitle className="">Data options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <h1 className="text-muted-foreground">Pick a period for the data</h1>
          <IntervallContainer
            id={urlParams.id}
            defaultValue={getTimeBetweenDates(
              new Date(urlParams.start),
              new Date(urlParams.end)
            )}
          ></IntervallContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-2 md:row-start-2">
        <CardHeader className="flex-col gap-2">
          <CardTitle className="">Graph View</CardTitle>
          {new Date(urlParams.start).toDateString()} -{" "}
          {new Date(urlParams.end).toDateString()}
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3">
          <ChartContainer data={formattedPrices}></ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-2 md:row-start-2">
        <CardHeader className="flex-col gap-2">
          <CardTitle className="">Table View</CardTitle>
          {new Date(urlParams.start).toDateString()} -{" "}
          {new Date(urlParams.end).toDateString()}
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-3">
          <ScrollArea className="w-full max-md:aspect-[4/3] aspect-video rounded-md border pr-3">
            <PriceTable prices={formattedPrices.reverse()} />
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
