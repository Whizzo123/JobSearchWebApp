
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Job } from "./job";
import { Button } from "@/components/ui/button";

/**
 * ColumnDef array describing table header and cell layout for Job type
 */
export const jobColumns: ColumnDef<Job>[] = [
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
