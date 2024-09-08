"use client";

import { getCurrentDate, getDateCertainDaysAgo, getDateOneWeekAgo, toISODateOnly } from "@/lib/date_utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Stock } from "@/database/custom_types";

interface props {
    stocks: Array<Stock>;
}
export function StockList({ stocks }: props) {
    return (
        <div>
            {stocks.map((stock, index) => (
                <StockEntry key={index} stock={stock}></StockEntry>
            ))}
        </div>
    );
}

function StockEntry({ stock }: { stock: Stock }) {
    const navigationLink = `/dashboard/stock/${stock.id}}`
    return (
        <Link href={navigationLink}>
        <div>
            <h2>{stock.name}</h2>
            <p>{stock.description}</p>
        </div>
        </Link>
    );
}