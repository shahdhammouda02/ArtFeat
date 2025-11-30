import { useMemo, useState } from "react";
import { ALL_EVENTS } from "@/data/eventsData";
import EventsFilter from "./EventsFilter";
import EventsCards from "./EventsCards";

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

  return (
    <section id="art-events" className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Art Events</h2>
          <p className="mt-2 text-md sm:text-md text-gray-600">
            Find events tailored to your interests, from exhibitions to
            workshops.
          </p>
        </div>

        {/* ✅ الفلاتر مع تقليل المسافة */}
        <div className="mb-2">
          <EventsFilter
            type={type}
            setType={setType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            resetFilters={() => {
              setType("All Types");
              setSearchTerm("");
              setVisible(6);
            }}
            applyFilters={() => setVisible(6)}
          />
        </div>

        {/* ✅ بطاقات الأحداث مع margin-top سالب لتقريبها للفلاتر */}
        <div className="-mt-4">
          <EventsCards
            events={filtered}
            visible={visible}
            setVisible={setVisible}
          />
        </div>
      </div>
    </section>
  );
}
