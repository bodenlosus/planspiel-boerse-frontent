"use client";
import { Bar, Cell, ComposedChart, ErrorBar, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer
} from "@/components/ui/chart";

import toRelativeValues from "./data_utils";
import { props } from "./chart_props";

export default function CandleStickChart({ data }: props) {
  const chartData = toRelativeValues(data); //data
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

  return (
    <ChartContainer className="min-h[200px] aspect-[4/3]" config={chartConfig}>
      <ComposedChart accessibilityLayer data={chartData}>
        <XAxis dataKey={"date"} interval="equidistantPreserveStart"></XAxis>
        <YAxis
          padding={{ top: 20, bottom: 20 }}
          domain={["min", "max"]}
        ></YAxis>
        <Bar dataKey={"open_close"} fill="hsl(var(--win))">
          <ErrorBar
            dataKey={"high_low"}
            width={2}
            strokeWidth={2}
            stroke="hsl(var(--foreground)/.5)"
          ></ErrorBar>
          {chartData.map((entry, index) => {
            return (
              <Cell
                key={index}
                radius={4}
                stroke={entry?.isPositive ? "hsl(var(--win))" : "hsl(var(--loss))"}
                fill={
                  entry?.isPositive ? "hsl(var(--win), .6)" : "hsl(var(--loss), .6)"
                }
              />
            );
          })}
        </Bar>
      </ComposedChart>
    </ChartContainer>
  );
}
