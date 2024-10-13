"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const {theme, setTheme} = useTheme()
   
    return (
      <span className="inline-flex flex-row gap-4">
        <span className="inline-flex items-center flex-row gap-4 text-sm"><SunIcon/></span>
        <Switch className="bg-red" checked={{light:true, dark:false}[theme ? theme : "dark"]} onCheckedChange={(checked) => setTheme(checked ? "light": "dark")}>
        </Switch>
      </span>
    )
  }