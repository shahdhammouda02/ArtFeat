import { useMemo, useState } from "react";
import ceramicImg from "@/assets/images/CeramicWonders.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import { ALL_EVENTS, TYPES } from "@/data/eventsData";

export default function Section2() {
  const [type, setType] = useState<string>("All Types");
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      const okType = type === "All Types" || e.tags.includes(type);
      const okSearch =
        searchTerm.trim() === "" ||
        (e.title + " " + e.excerpt + " " + e.tags.join(" "))
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return okType && okSearch;
    });
  }, [type, searchTerm]);

  const toShow = filtered.slice(0, visible);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Art Events</h2>
          <p className="mt-2 text-md sm:text-md text-gray-600">
            Find events tailored to your interests, from exhibitions to
            workshops.
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
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

            {/* Search Input */}
            <div className="relative w-full max-w-[280px] mx-auto sm:max-w-[200px] md:max-w-[320px] xl:max-w-full">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 xs:size-4"
              />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="pl-8 xs:pl-9 h-9 text-xs xs:text-sm w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center sm:justify-end">
            <Button
              variant="default"
              onClick={() => setVisible(6)}
              className="bg-sky-500 hover:bg-sky-500/90 text-xs xs:text-sm"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="text-xs xs:text-sm"
              onClick={() => {
                setType("All Types");
                setSearchTerm("");
                setVisible(6);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {toShow.map((e) => (
            <Card
              key={e.id}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100"
            >
              <div className="relative group">
                <img
                  src={ceramicImg}
                  alt={e.title}
                  className="w-full aspect-[16/8] sm:aspect-[4/2.5] object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 right-3 text-white text-xs font-semibold px-2 py-1 rounded-xl ${
                    e.status === "Upcoming" ? "bg-sky-500" : "bg-red-600"
                  } transition-colors duration-300 group-hover:bg-opacity-90`}
                >
                  {e.status}
                </span>
              </div>

              <CardHeader className="transition-colors duration-300 group-hover:bg-sky-50/50">
                <CardTitle className="group-hover:text-sky-600 transition-colors duration-200">
                  {e.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar
                    size={14}
                    className="group-hover:text-sky-500 transition-colors duration-200"
                  />
                  <span className="group-hover:text-gray-700 transition-colors duration-200">
                    {e.date}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-3 flex flex-wrap gap-2">
                  {e.tags.map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-200"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-200 group-hover:text-gray-700">
                  {e.excerpt}
                </p>
              </CardContent>

              <CardFooter className="transition-colors duration-300 group-hover:bg-sky-50/30">
                <Button
                  variant="default"
                  className="block w-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-sm group-hover:shadow-md group-hover:bg-sky-600"
                >
                  Show More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load more & View less */}
        <div className="mt-8 text-center flex justify-center gap-4">
          {visible > 6 && (
            <Button
              variant="outline"
              className="h-9 px-4 text-sm inline-flex items-center gap-2 justify-center"
              onClick={() => setVisible(6)}
            >
              View Less
              <ChevronUp size={16} />
            </Button>
          )}

          {visible < filtered.length && (
            <Button
              variant="outline"
              className="h-9 px-4 text-sm inline-flex items-center gap-2 justify-center"
              onClick={() => setVisible((v) => v + 6)}
            >
              Load More Events
              <ChevronDown size={16} />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
