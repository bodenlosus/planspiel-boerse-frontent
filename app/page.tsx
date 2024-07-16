"use client"

import * as ScrollArea from '@radix-ui/react-scroll-area';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Dot,
  Label,
  LabelList,
  Legend,
  Line,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChevronUp, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import DotEffect from '@/components/dot_effect';
import { NavBar } from '@/components/navbar/navbar';
import { to_display_string } from '@/lib/cash_display_string';
import get_sign from '@/lib/get_sign';
import * as React from 'react';

export default function Home() {
  return (
      <main className="grow mt-5 mx-5 max-sm:h[1px] overflow-hidden">
          <Tabs defaultValue="day" className="w-full h-full flex flex-col max-sm:items-center">
            <TabsList className="w-full justify-stretch">
              <TabsTrigger value="day">Today</TabsTrigger>
              <TabsTrigger value="week">Past Week</TabsTrigger>
              <TabsTrigger value="month">Past Month</TabsTrigger>
              <TabsTrigger value="year">Past Year</TabsTrigger>
            </TabsList>
            <TabsContent className="flex w-full grow overflow-y-scroll" value="day">
              <BentoGrid></BentoGrid>
            </TabsContent>
          </Tabs>
      </main>
  );
}

export function BentoGrid(){
  

  return (
    <div className="m-5 mt-5 h-max w-full grid grid-cols-2 md:grid-cols-6 2xl:grid-cols-8 grid-rows-6 gap-5 overflow-x-hidden">
      <BankBalanceBentoCell/>
      <WinLossBentoCell span={{x:2, y:2}}/>
      <DotEffect>
      <Card className="dotted-background col-span-2 md:col-span-4 row-span-2">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
      </DotEffect>
      <DotEffect>
      <Card className="dotted-background col-span-2 md:col-span-4 row-span-12">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
      </DotEffect>
    </div>
  );
}

interface BentoCellProps{
  span: {x:number, y:number};
}

export function BankBalanceBentoCell(){
  const intervall_profit:number = -13789
  const overall_profit: number = 1234567

  const intervall_start:Date = new Date("08-07-2024")

  const intervall_end:Date = new Date("15-07-2024")

  const profit_indicator: { [key: string]: React.ReactNode } = {
    "+":<span className='self-center font-bold text-3xl text-muted-foreground'>+</span>,
    "-":<span className='self-center font-bold text-3xl text-muted-foreground'>-</span>,
    "":<></>,
  }

  return(
  <DotEffect>
      <Card className="dotted-background col-span-2 row-span-2 line">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Profit</CardTitle>
          <CardDescription>
            {intervall_start.toDateString()} - {intervall_end.toDateString()}
            </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className='flex gap-2'>
            {profit_indicator[get_sign(intervall_profit)]}
            <span className='text-5xl font-bold'>{to_display_string(intervall_profit, 1, true)}</span>
            <span className='text-xl font-semibold text-muted-foreground'>€</span>
          </div>
          <div className="ml-10 flex gap-[0.5]">
            <span className="text-s self-center text-muted-foreground">{get_sign(overall_profit)}</span>
            <span className='text-lg font-medium text-muted-foreground'>
              {to_display_string(overall_profit, 1, true)}
              €
            </span>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      </DotEffect>
  )
}

export function WinLossBentoCell({span}:BentoCellProps){
  let base_data  = [
    {timestamp:new Date("2024-07-10"), gained:134, lost:-56},
    {timestamp:new Date("2024-07-11"), gained:90, lost:-34},
    {timestamp:new Date("2024-07-12"), gained:101, lost:-94},
    {timestamp:new Date("2024-07-13"), gained:130, lost:-50},
    {timestamp:new Date("2024-07-14"), gained:110, lost:-140},
    {timestamp:new Date("2024-07-15"), gained:10, lost:-80},
    {timestamp:new Date("2024-07-16"), gained:10, lost:-80},
  ]

  let total_gain:number = 0;

  let data = base_data.map((day:{timestamp: Date, gained:number, lost:number}) => {
    total_gain += day.gained + day.lost
    return(
      {...day, ...{
        timestamp: day.timestamp.toLocaleDateString(undefined, {month: "numeric", day: "numeric"}), 
        gain:total_gain
      }}
    )
  })

  const chartConfig = {
    gained: {
      label: "Gained",
      color: "hsl(var(--win))",
    },
    lost: {
      label: "Spent",
      color: "hsl(var(--loss))",
    },
    gain: {
      label: "Total Gain",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig

  const grid_size_class = `col-span-${span.x} row-span-${span.y}`

  return (
    <DotEffect>
      <Card className={`dotted-background ${grid_size_class} line`}>

        <CardHeader>
          <CardTitle className="text-xl font-medium">Spent vs. Gained</CardTitle>
          <CardDescription>Money spent and gained per Day from {base_data[0].timestamp.toDateString()} to {base_data[base_data.length - 1].timestamp.toDateString()}
            </CardDescription>
        </CardHeader>

        <CardContent>

        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ComposedChart margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }} accessibilityLayer stackOffset="sign" data={data}>
          
            <CartesianGrid vertical={false} />
            <XAxis angle={90} axisLine={false} dataKey="timestamp" />
            <YAxis width={0} axisLine={false} tick={false} padding={{bottom:30, top:20}}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ReferenceLine y={0} stroke="var(--border)" />
            <Bar dataKey="lost"
              unit="€" 
              barSize={10} 
              stackId="1" radius={4}  
              fill="var(--color-lost)">

              <LabelList dataKey="lost" offset={7} position="top" />

            </Bar>

            <Bar dataKey="gained" 
              unit="€" barSize={10} 
              stackId="1" 
              radius={4} 
              fill="var(--color-gained)">

                <LabelList dataKey="gained" offset={7} position="top" />

            </Bar>

            <Line 
              dataKey="gain" 
              dot={false} 
              type="monotone" 
              stroke="var(--color-gain)" />

            </ComposedChart>
          </ChartContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </DotEffect>
  );
}