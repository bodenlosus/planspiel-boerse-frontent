"use client";
import { Area, ComposedChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer
} from "@/components/ui/chart";

import { flattenOpenClose } from "./data_utils";
import { props } from "./chart_props";
import { Gradient, gradientInterface } from "./gradients";
import { cn } from "@/lib/utils";

export default function AreaChart({ data , className}: props) {
  const chartData = flattenOpenClose(data); //data
  const chartConfig = {
    open: {
      label: "Open",
    },
    close: {
      label: "Open",
    },
  } satisfies ChartConfig;

  if (data.some((item) => !item)) {
    return <h1>No data found</h1>;
  }

  const gradients: Array<gradientInterface> = [
    {
      id: "fillOpen",
      color: "hsl(var(--win))",
      opacity: { start: 0.8, end: 0.1 },
    },
    {
      id: "fillClose",
      color: "hsl(var(--loss))",
      opacity: { start: 0.8, end: 0.1 },
    },
  ];

  return (
    <ChartContainer className={cn("min-h[200px]", className)} config={chartConfig}>
      <ComposedChart accessibilityLayer data={chartData}>
        <defs>
          {gradients.map((gradient) => (
            <Gradient key={gradient.id} {...gradient} />
          ))}
        </defs>
        <XAxis dataKey={"date"} interval="equidistantPreserveStart"></XAxis>
        <YAxis width={45} padding={{ top: 20 }} domain={["min", "max"]}></YAxis>
        <Area
          dataKey={"value"}
          fillOpacity={0.4}
          type="monotone"
          stroke="hsl(var(--win))"
          fill="url(#fillOpen)"
        />
      </ComposedChart>
    </ChartContainer>
  );
}
