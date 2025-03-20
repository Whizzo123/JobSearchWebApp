"use client"


import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Filter, FilterBox } from "./filterBox";
import { API_URL, JobListings } from "./page";

export type Job = {
    id: number;
    title: string;
    url: string;
    employer_title: string;
    logo: string;
    career_path_sector: {
      id: string;
      title: string;
    };
    locations: string[];
    job_type: string;
    closing_date: string;
    opened_recently: boolean;
    closing_soon: boolean;
    is_remote: boolean;
    description: string;
    employer_url: string;
    salary: string;
}



export function JobTable({jobListings}: {jobListings: Job[]}){
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    let distinctJobTypes = Array.from(new Set(jobListings.map((job: Job) => { return job.job_type; })));
    const[jobTypeFilters, setJobTypeFilters] = useState<Filter[]>(distinctJobTypes.map((filterName: string) => {return {name: filterName, use: true}}));

    let jobTypeFilterChanged = (filters: Filter[], id: number) => {
        const updatedList = filters.map((filter, index) => {
            if (index === id) {
              return { ...filter, use: !filter.use };
            }
            return filter;
          });
          setJobTypeFilters(updatedList); 
          console.log(updatedList);
          setAllowedValuesFilter("job_type", updatedList.filter(f => f.use).map(f => f.name));
    }

    const setAllowedValuesFilter = (columnId: string, allowedValues: string[]) => {
        setColumnFilters((oldFilters) => [
          ...oldFilters.filter((f) => f.id !== columnId),
          { id: columnId, value: allowedValues },
        ]);
      };

    let jobTypeFilterBox = <FilterBox title="JobType" filters={jobTypeFilters} onChanged={jobTypeFilterChanged}/>;

    const columns: ColumnDef<Job>[] = [
        {
          accessorKey: "title",
          header: "Job Title",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
          ),
        },
        {
          accessorKey: "employer_title",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Company
                <ArrowUpDown />
              </Button>
            )
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("employer_title")}</div>,
        },
        {
            accessorKey: "locations",
            header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Locations
                <ArrowUpDown />
              </Button>
            )
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("locations")}</div>,
        },
        {
            accessorKey: "salary",
            header: () => <div className="text-right">Salary</div>,
            cell: ({ row }) => {
            if(row.getValue("salary") === undefined)
            {
                return <div className="text-right font-medium"> Not Given </div>
            }
            const amount = parseFloat(row.getValue("salary"))
     
            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBR",
            }).format(amount)
     
            return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "job_type",
            header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Type
                <ArrowUpDown />
              </Button>
            )
          },
          filterFn: (row, columnId, filterValue) => {
            return filterValue.includes(row.getValue(columnId));
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("job_type")}</div>,
        },
    ];
    

    const table = useReactTable({
      data: jobListings,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
      
    return (
        <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {jobTypeFilterBox}
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => window.open("https://www.brightnetwork.co.uk" + row.original.url, "_blank")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
}