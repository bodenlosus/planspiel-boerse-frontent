import { Minus, Triangle } from "lucide-react";

import { StockPrice } from "@/database/custom_types";
import { cn } from "@/lib/utils";

interface StockStatsProps {
    data: Array<StockPrice>;
}
export default function StockStats({data}: StockStatsProps){
    if(data.length < 2) {
        return <div>Insufficient data.</div>
    }
    const lastTwoRows = data.slice(1)
    
    const stats = [
        {
            name: "Price",
            current: lastTwoRows[0].close, 
            previous: lastTwoRows[1].close
        },
        {
            name: "High",
            current: lastTwoRows[0].high, 
            previous: lastTwoRows[1].high
        },
        {
            name: "Low",
            current: lastTwoRows[0].low, 
            previous: lastTwoRows[1].low
        },
        {
            name: "Volume",
            current: lastTwoRows[0].volume, 
            previous: lastTwoRows[1].volume
        },
    ]
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {stats.map((stat, index) => (<StockStat key={index} name={stat.name} values={stat}/>))}
        </div>
    )
}
interface StockStatProps{
    name: string;
    values: {current: number | null, previous: number | null, };
}
export function StockStat({name, values}: StockStatProps){

    if (!values.current || !values.previous){
        return <div>Insufficient data.</div>  // Display a message if no data is available.
    }
    const relativeChange = (values.current - values.previous) / values.previous * 100
    
    return(
        <div className="w-auto overflow-hidden bg-background rounded-sm shadow-sm border border-border/20 pl-4 py-2">
        <h1 className="text-muted-foreground text-sm">{name}</h1>
        <span className="flex flex-row gap-x-2 gap-y-0 flex-wrap">
            <span className="flex flex-row gap-1">
            <span className="flex align-baseline"><WinLossIndicator sign={relativeChange}></WinLossIndicator></span>
            <span className="text-xl font-semibold">{values.current}</span>
            </span>
            <span className="text-sm font-semibold text-muted-foreground float-right">{(relativeChange > 0) ? "+": "-"}{Math.abs(relativeChange).toFixed(2)}%</span>
            
        </span>
        </div>
    )
}

interface WinLossIndicatorProps{
    sign: number;
}
export function WinLossIndicator({sign}:WinLossIndicatorProps) {
    const className = "size-4 self-center" 
    if (sign > 0){
        return (
            <Triangle className={cn("fill-green stroke-transparent", className)}/>
        )
    }
    else if (sign < 0){
        return (
            <Triangle className={cn("fill-red stroke-transparent -scale-y-100", className)}/>
        )
    }
    return(
        <Minus className={cn("stroke-foreground", className)}></Minus>
    )
}