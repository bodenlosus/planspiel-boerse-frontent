"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { HandCoins, Home, Landmark, LogOut, Settings, User, Users, WalletMinimal } from "lucide-react"
import { HomeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'
import { useTheme } from "next-themes"

export function NavBar() {
  return(
    <nav className="flex flex-row w-fit min-w-fit h-min sm:flex-col sm:h-lvh sm:w-fit sm:min-w-fit items-start justify-between p-2 max-sm:m-3 max-sm:rounded-lg ">
      <div className="flex flex-row max-sm:space-x-3 sm:flex-col sm:space-y-3 max-sm:grow max-sm:justify-around w-full">
        {/* User Profile */}
        <UserProfile userName="Johannes Schmidt"/>

        <Separator className="hidden sm:block"/>
        
        <NavBarPageButton usePath title="Oveview" link="/">
          <Home className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton usePath title="Recent Transactions" link="/transactions">
          <HandCoins className="size-5 max-sm:size-6" />
        </NavBarPageButton>

        <NavBarPageButton usePath title="Settings" link="/settings">
          <Settings className="size-5 max-sm:size-6" />
        </NavBarPageButton>

      </div>
      <div>
        
        <ModeToggle/>
      </div>
    </nav>
  )
}

interface NavBarPageButtonProps {
  /** The text to display inside the button */
  title: string

  /** Whether the button can be interacted with */
  link:string

  usePath?:boolean

  className?:string

  children?:React.ReactNode

}

export function NavBarPageButton(
  {title, link, children, usePath}:NavBarPageButtonProps,
  ){

  const pathname = usePathname()

  const active_util_class:string = "bg-accent"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={link}
            className={`${(usePath === true && pathname === link) ?  active_util_class: ""} flex size-9 max-sm:size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground`}
          >
              {children}
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  
}

interface UserProfileProps{
  userName:string;
}

export function UserProfile({userName}:UserProfileProps){
  return(
    <>
    <div className="hidden sm:block">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-[2.2rem] text-muted-foreground transition-colors hover:text-foreground">
          <AvatarImage src="https://github.com/shaduhcn.png" />
          <AvatarFallback>
            <User className="size-5"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>

        <DropdownMenuSeparator/>
        
        <DropdownMenuItem className="gap-3">
          <Landmark className="size-4 stroke-muted-foreground"/>
          Linked banks
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-3">
          <WalletMinimal className="size-4 stroke-muted-foreground"/>
          Linked services
        </DropdownMenuItem>

        <DropdownMenuSeparator/>

        <DropdownMenuItem className="gap-4">
          <Users className="size-3.5 stroke-muted-foreground"/>
          Switch account
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-4">
          <LogOut className="size-3.5 stroke-muted-foreground"/>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </>
  )
}
 
export function ModeToggle() {
  const {setTheme} = useTheme()
 
  return (
    <div className="hidden sm:block">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}