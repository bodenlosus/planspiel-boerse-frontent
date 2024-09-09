"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getStockPagePath } from "../../../../lib/get_stock_path";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
  value: number;
  onValueChange: (value: number) => void;
}

export default function IntervallPicker({ onValueChange, value }: props) {
  interface IntervallType {
    name: string;
    display: string;
    days: number;
  }
  const intervallTemplates: Array<IntervallType> = [
    { name: "7d", display: "7 days", days: 7 },
    { name: "30d", display: "30 days", days: 30 },
    { name: "quarter", display: "quarter", days: 92 },
    { name: "year", display: "year", days: 365 },
    { name: "5years", display: "5 years", days: 365 * 5 },
  ];

  console.log(value);

  const [selected, setSelected] = useState({
    name: `${value}d`,
    display: `${value}days`,
    days: value,
  });

  return (
    <span>
      <Select
        value={selected.name}
        onValueChange={(value) => {
          const s = intervallTemplates.find(
            (intervall) => intervall.name === value
          );
          const result = s === undefined ? intervallTemplates[0] : s;
          onValueChange(result.days);
          setSelected(result);
        }}
      >
        <SelectTrigger>
          <div className="flex flex-row gap-1">
            <div>Last</div>
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem key={-1} value={selected.name}>
              {selected.display}
            </SelectItem> */}
          {intervallTemplates.map((item, index) => (
            <SelectItem key={index} value={item.name}>
              {item.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </span>
  );
}

interface containerProps {
  defaultValue: number;
  id: number;
}
export function IntervallContainer({ defaultValue, id }: containerProps) {
  const router = useRouter();
  return (
    <IntervallPicker
      value={defaultValue}
      onValueChange={(value) => router.push(getStockPagePath(id, value))}
    />
  );
}
