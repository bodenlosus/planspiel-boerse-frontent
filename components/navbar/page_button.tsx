import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
  