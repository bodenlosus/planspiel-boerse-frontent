"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Stock } from "@/database/custom_types";
import { getStockFromSearchString } from "@/database/search_stock";
import { getStockPagePath } from "./get_stock_path";
import { useRouter } from "next/navigation";

interface props {
    doRedirect: boolean;
}

export default function SearchBar({doRedirect}: props) {
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
    <Command className="border" shouldFilter={false}>
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
        <CommandEmpty>No results found.</CommandEmpty>
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
