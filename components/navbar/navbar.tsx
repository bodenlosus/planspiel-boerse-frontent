"use client";

import { HandCoins, Home, Settings } from "lucide-react";

import { ModeToggle } from "./mode_toggle";
import { NavBarPageButton } from "./page_button";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "./profile";

export function NavBar() {
  return (
    <nav className="flex flex-row w-fit min-w-fit h-min sm:flex-col sm:h-lvh sm:w-fit sm:min-w-fit items-start justify-between p-2 max-sm:m-3 max-sm:rounded-lg ">
      <div className="flex flex-row max-sm:space-x-3 sm:flex-col sm:space-y-3 max-sm:grow max-sm:justify-around w-full">
        {/* User Profile */}
        <UserProfile userName="Johannes Schmidt" />

        <Separator className="hidden sm:block" />

        <NavBarPageButton usePath title="Oveview" link="/">
          <Home className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton
          usePath
          title="Recent Transactions"
          link="/transactions"
        >
          <HandCoins className="size-5 max-sm:size-6" />
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
