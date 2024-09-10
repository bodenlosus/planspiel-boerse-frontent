import {
  CandlestickChart as CandleStickIcon,
  LineChart as LinechartIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AreaChart from "./area";
import CandleStickChart from "./candle_stick";
import { props } from "./chart_props";

export default function ChartContainer({ data }: props) {
  return (
    <Tabs
      defaultValue="line"
      className="w-full border rounded-md overflow-hidden"
    >
      <TabsContent value="candlestick">
        <CandleStickChart data={data} />
      </TabsContent>
      <TabsContent value="line">
        <AreaChart data={data} />
      </TabsContent>
      <div className="w-full bg-muted/50 rounded-sm">
        <TabsList className="bg-transparent">
          <TabsTrigger className="data-[state=active]" value="candlestick">
            <CandleStickIcon className="size-5 stroke-2" />
          </TabsTrigger>
          <TabsTrigger value="line">
            <LinechartIcon className="size-5 stroke-2"/>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
}
