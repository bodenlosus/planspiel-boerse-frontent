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
        "flex min-w-fit flex-col h-lvh w-fit items-start justify-between p-2",
        className
      )}
    >
      <div className="flex flex-col gap-3">
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
