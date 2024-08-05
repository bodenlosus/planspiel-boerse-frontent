"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { CategorieContext } from "@/lib/categories/categorie_provider";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import TransactionCategorie from "@/lib/categories/categorie";
import { cn } from "@/lib/utils";
import uniqueID from "@/lib/generate_unique_id";
import {z} from "zod"

interface props {
  field: ControllerRenderProps<any>;
  onSelect: Function;
}

export function SelectTransactionCategorie({ field, onSelect }: props) {
  const categories = useContext(CategorieContext)

  const categorieText = z.coerce.string().trim()

  const [searchText, setSearchText] = useState("")

  function newCategorie(display: string){
    const new_categorie = new TransactionCategorie(
      uniqueID(
        categories.items.map((c) => c.name
      )), 
      display
    )
    categories.add(Array(new_categorie))

    return(new_categorie)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? categories.items.find((categorie) => categorie.name === field.value.name)
                  ?.display
              : "Select categorie"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput 
            onValueChange={(val) => setSearchText(categorieText.parse(val))}
            placeholder="Search categorie" className="h-9" />
          <CommandList>
            <CommandEmpty>
              {searchText === "" ? "Add categorie by typing":
              <Button
                onClick={() => {
                  onSelect(
                    newCategorie(searchText)
                  )
                }}
                variant="link">
                  Add {searchText} ?
              </Button>}
            </CommandEmpty>
            <CommandGroup>
              {categories.items.map((categorie) =>(
                  <CommandItem
                    value={categorie.display}
                    key={categorie.display}
                    onSelect={() => {
                      onSelect(categorie);
                    }}
                  >
                    {categorie.display}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        categorie.name === field.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
