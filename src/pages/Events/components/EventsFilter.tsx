import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Filter, ChevronDown, Search } from "lucide-react";
import { TYPES } from "@/data/eventsData";

interface EventsFilterProps {
  type: string;
  setType: (type: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({
  type,
  setType,
  searchTerm,
  setSearchTerm,
  resetFilters,
  applyFilters,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        {/* فلترة حسب النوع */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 px-3 text-xs xs:text-sm w-full max-w-[280px] mx-auto sm:w-36 md:w-44 justify-between"
            >
              <span className="inline-flex items-center gap-1 xs:gap-2">
                <Filter size={14} className="xs:size-4" />
                {type}
              </span>
              <ChevronDown size={14} className="xs:size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[280px] xs:w-36 md:w-44"
          >
            {TYPES.map((t) => (
              <DropdownMenuItem
                key={t}
                onClick={() => setType(t)}
                className="text-xs xs:text-sm"
              >
                {t}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* مربع البحث */}
        <div className="relative w-full max-w-[280px] mx-auto sm:max-w-[200px] md:max-w-[320px] xl:max-w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 xs:size-4"
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Event Name, Category, or Tag"
            className="pl-8 xs:pl-9 h-9 text-xs xs:text-sm w-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
        <Button
          variant="default"
          onClick={applyFilters}
          className="bg-sky-500 hover:bg-sky-500/90 text-xs xs:text-sm"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="text-xs xs:text-sm"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default EventsFilter;
