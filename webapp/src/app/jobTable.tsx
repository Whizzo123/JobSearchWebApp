"use client"


import {ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import React, {useState } from "react";
import { Input } from "@/components/ui/input";
import { Filter, FilterBox } from "./filterBox";
import { Job } from "./job";
import { jobColumns } from "./column";

/**
 * Create JSX Element containing filters and table displaying job listings
 * @param jobListings - Array of job type to populate table with
 * @returns JSX content for filters and table
 */
export function JobTable({jobListings}: {jobListings: Job[]}){
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const distinctJobTypes = Array.from(new Set(jobListings.map((job: Job) => { return job.job_type; })));
    const[jobTypeFilters, setJobTypeFilters] = useState<Filter[]>(distinctJobTypes.map((filterName: string) => {return {name: filterName, use: true}}));

    const jobTypeFilterChanged = (filters: Filter[], id: number) => {
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

    const jobTypeFilterBox = <FilterBox title="JobType" filters={jobTypeFilters} onChanged={jobTypeFilterChanged}/>;

    const table = useReactTable({
      data: jobListings,
      columns: jobColumns,
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
                    colSpan={jobColumns.length}
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