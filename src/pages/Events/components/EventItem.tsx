import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_EVENTS } from "@/data/eventsData";

export default function EventItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = ALL_EVENTS.find((e) => e.id === Number(id));

  if (!event || event.status !== "Ended") {
    return <Navigate to="/events" replace />;
  }

  const similarEvents = ALL_EVENTS.filter(
    (e) => e.status === "Upcoming" && e.id !== Number(id)
  ).slice(0, 3);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Back to Events
        </Button>

        {/* Event Header */}
        <div className="mb-10">
          <Badge variant="destructive" className="mb-4">
            Event Ended
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {event.title}
          </h1>

          <div className="mt-4 w-full aspect-[3/1] overflow-hidden rounded-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4 items-center text-gray-600 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>9:00 AM - 6:00 PM Daily</span>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                About the Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {event.excerpt}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-medium mb-2">Event Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs sm:text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ALL_EVENTS.slice(0, 6).map(
                  (
                    img // <-- حدد 6 فقط
                  ) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={img.image}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end p-2 sm:p-3">
                        <span className="text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {img.title}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-4 space-y-6">
              {/* Event Status Card */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Event Status</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  This event has already taken place.
                </p>
                <Button variant="outline" className="w-full mt-4" disabled>
                  Event Ended
                </Button>
              </div>

              {/* Related Events */}
              {similarEvents.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Similar Upcoming Events</h3>
                  <div className="space-y-3">
                    {similarEvents.map((relatedEvent) => (
                      <div
                        key={relatedEvent.id}
                        className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border"
                        onClick={() => navigate(`/events/${relatedEvent.id}`)}
                      >
                        <h4 className="font-medium text-sm sm:text-base">
                          {relatedEvent.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-gray-600">
                          <Calendar size={14} />
                          <span>{relatedEvent.date}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {relatedEvent.tags.slice(0, 2).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-[10px] sm:text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
