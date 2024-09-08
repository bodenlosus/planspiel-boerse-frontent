"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface props {}

export default function IntervallPicker({}: props) {
  interface IntervallType {
    name: string;
    display: string;
  }
  const intervallTemplates: Array<IntervallType> = [
    { name: "24h", display: "24 hours" },
    { name: "7d", display: "7 days" },
    { name: "30d", display: "30 days" },
    { name: "quarter", display: "quarter" },
    { name: "year", display: "year" },
    { name: "4years", display: "4 years" },
  ];

  const [selected, setSelected] = useState(intervallTemplates[0]);

  return (
    <span>
      <Select
        value={selected.name}
        onValueChange={(value) => {
          const s = intervallTemplates.find(
            (intervall) => intervall.name === value
          );
          setSelected(s === undefined ? intervallTemplates[0] : s);
        }}
      >
        <SelectTrigger>
          <div className="flex flex-row gap-1">
            <div>Last</div>
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
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
