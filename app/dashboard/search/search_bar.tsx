"use client";

import "@/app/globals.css";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Stock } from "@/database/custom_types";
import { cn } from "@/lib/utils";
import { getStockFromSearchString } from "@/database/search_stock";
import { getStockPagePath } from "../../../lib/get_stock_path";
import { useRouter } from "next/navigation";

interface props {
  doRedirect: boolean;
  className?: string;
}

export default function SearchBar({ doRedirect, className }: props) {
  const router = useRouter();
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(stocks, searchQuery);
  useEffect(() => {
    // declare the data fetching function// for debugging purposes, remove
    const fetchStocks = async () => {
      if (searchQuery === "" || !searchQuery) {
        setStocks([]);
        return;
      }
      const { stocks, error, success } = await getStockFromSearchString(
        searchQuery
      ); // for debugging purposes, remove

      if (error) {
        console.error("Failed to fetch data from database", error);
      }

      if (success) {
        setStocks(stocks);
      }
    };

    fetchStocks().catch(console.error);
  }, [searchQuery]);
  return (
    <Command className={cn("border", className)} shouldFilter={false}>
      <CommandList>
        <CommandInput
          value={searchQuery}
          placeholder="Search for a Stock by Symbol, Name, Description"
          onValueChange={setSearchQuery}
          onKeyDown={(event) => {
            if (event.key === "Enter" && doRedirect && searchQuery) {
              router.push(`/dashboard/search?query=${searchQuery}`);
            }
          }}
        />
        <CommandEmpty className="h-min"></CommandEmpty>
        <CommandGroup>
          {stocks.map((stock, index) => (
            <CommandItem key={index}>
              <Link className="w-full h-full" href={getStockPagePath(stock.id)}>
                {stock.symbol} - {stock.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
