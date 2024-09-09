"use client";
import { Bar, Cell, ComposedChart, ErrorBar, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer
} from "@/components/ui/chart";

import toRelativeValues from "./to_relative_values";
import { StockPrice } from "@/database/custom_types";

interface props {
  data: Array<StockPrice>;
}

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// };

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
    <ChartContainer className="min-h[200px]" config={chartConfig}>
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
                fill={
                  entry?.isPositive ? "hsl(var(--win))" : "hsl(var(--loss))"
                }
              />
            );
          })}
        </Bar>
      </ComposedChart>
    </ChartContainer>
  );
}
