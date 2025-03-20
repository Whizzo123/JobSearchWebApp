import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

type Checked = DropdownMenuCheckboxItemProps["checked"];

export interface Filter{
    name: string;
    use: boolean;
}

export function FilterBox({title, filters, onChanged}: {title: string, filters: Filter[], onChanged: (filters: Filter[], id: number) => void;}){
 
    const filterItems = filters.map((filter: Filter, id: number) => {
        return <DropdownMenuCheckboxItem key={id}
        checked={filters[id].use}
        onCheckedChange={() =>{onChanged(filters, id)}}
        >
      {filter.name}
    </DropdownMenuCheckboxItem>
    });

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">{title}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filterItems}
      </DropdownMenuContent>
    </DropdownMenu>
    )
}