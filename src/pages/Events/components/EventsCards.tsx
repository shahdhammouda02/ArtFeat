import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ALL_EVENTS } from "@/data/eventsData";
import type { EventItem } from "@/types/eventTypes";

const TAG_COLORS: Record<string, string> = {
  Paintings: "bg-pink-200 text-pink-800",
  "Abstract Art": "bg-purple-200 text-purple-800",
  Sculpture: "bg-yellow-200 text-yellow-800",
  Crafts: "bg-orange-200 text-orange-800",
  Illustration: "bg-blue-200 text-blue-800",
  "Nature Art": "bg-emerald-200 text-emerald-800",
  Photography: "bg-orange-200 text-orange-800",
};

interface EventsCardsProps {
  events?: EventItem[];
  visible?: number;
  setVisible?: React.Dispatch<React.SetStateAction<number>>;
}

const EventsCards: React.FC<EventsCardsProps> = ({
  events = ALL_EVENTS, // 🔹 افتراضيًا يعرض كل الأحداث
  visible: controlledVisible,
  setVisible: controlledSetVisible,
}) => {
  const navigate = useNavigate();

  // لو المستخدم ما مرّر visible من برّة، بنستخدم state داخلي
  const [internalVisible, setInternalVisible] = useState(6);
  const visible = controlledVisible ?? internalVisible;
  const setVisible = controlledSetVisible ?? setInternalVisible;

  const toShow = events.slice(0, visible);

  const handleShowMore = (event: EventItem) => {
    navigate(`/events/${event.id}`);
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان (يظهر فقط لو المكون مستقل) */}
        {!controlledVisible && (
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">Art Events</h2>
            <p className="mt-2 text-md text-gray-600">
              Discover current and upcoming exhibitions, workshops, and art
              fairs.
            </p>
          </div>
        )}

        {/* البطاقات */}
        <div
          className={`${
            toShow.length === 1
              ? "flex justify-center"
              : "grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          } ${toShow.length === 2 ? "lg:justify-items-center lg:grid-cols-2" : ""}`}
        >
          {toShow.length === 0 ? (
            <p className="text-center col-span-full text-lg font-semibold text-gray-500">
              No events found.
            </p>
          ) : (
            toShow.map((e) => (
              <Card
                key={e.id}
                className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100"
              >
                <div className="relative group">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full aspect-[16/8] sm:aspect-[4/2.5] object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 text-white text-xs font-semibold px-2 py-1 rounded-xl ${
                      e.status === "Upcoming" ? "bg-sky-500" : "bg-red-600"
                    }`}
                  >
                    {e.status}
                  </span>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-sky-600 transition-colors duration-200">
                    {e.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar
                      size={14}
                      className="text-sky-500 transition-colors duration-200"
                    />
                    <span>{e.date}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {e.tags.map((t, i) => (
                      <Badge
                        key={i}
                        className={TAG_COLORS[t] || "bg-gray-200 text-gray-700"}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{e.excerpt}</p>
                </CardContent>

                <CardFooter>
                  <Button
                    variant="default"
                    className="block w-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200"
                    onClick={() => handleShowMore(e)}
                  >
                    Show More
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Load More / View Less */}
        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          {visible > 6 && (
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-sky-500 text-sky-600 hover:bg-sky-50"
              onClick={() => setVisible(6)}
            >
              View Less
              <ChevronUp size={20} />
            </Button>
          )}

          {visible < events.length && (
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-sky-500 text-sky-600 hover:bg-sky-50"
              onClick={() => setVisible((v) => v + 6)}
            >
              Load More Events
              <ChevronDown size={20} />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsCards;
