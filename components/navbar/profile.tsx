import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Landmark, LogOut, User, Users, WalletMinimal } from "lucide-react";

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