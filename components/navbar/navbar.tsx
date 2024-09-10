"use client";

import { Home, Search, Settings, SquarePercent } from "lucide-react";

import { ModeToggle } from "./mode_toggle";
import { NavBarPageButton } from "./page_button";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "./profile";
import { cn } from "@/lib/utils";

interface NavBarProps {
  className: string;
}

export function NavBar({ className }: NavBarProps) {
  return (
    <nav
      className={cn(
        "flex flex-col max-sm:h-min max-sm:flex-row h-lvh w-fit max-sm:w-full items-start justify-between p-2 max-sm:pt-0 max-sm:px-[10%]",
        className
      )}
    >
      <div className="w-full flex flex-col max-sm:flex-row gap-3 max-sm:items-center max-sm:justify-around">
        {/* User Profile */}
        <UserProfile userName="Johannes Schmidt" />

        <Separator className="hidden sm:block" />

        <NavBarPageButton usePath title="Oveview" link="/">
          <Home className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton usePath title="Search" link="/dashboard/search">
          <Search className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton usePath title="Stock" link="/dashboard/stock">
          <SquarePercent className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton usePath title="Settings" link="/settings">
          <Settings className="size-5 max-sm:size-6" />
        </NavBarPageButton>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
