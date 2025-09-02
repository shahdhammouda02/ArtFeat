import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_EVENTS } from "@/data/eventsData";

export default function UpcomingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = ALL_EVENTS.find((e) => e.id === Number(id));

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event || event.status !== "Upcoming") {
    return <Navigate to="/events" replace />;
  }

  const similarEvents = ALL_EVENTS.filter(
    (e) => e.status === "Upcoming" && e.id !== Number(id)
  ).slice(0, 3);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-1 p-0 text-gray-700 hover:text-sky-600 transition-colors duration-200 hover:bg-transparent"
        >
          <ChevronLeft size={20} className="flex-shrink-0" />
          <span className="leading-none">Back to Events</span>
        </Button>

        {/* Event Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="aspect-[4/3] w-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <Badge
              variant="default"
              className="w-fit bg-sky-400 text-white hover:bg-sky-500 p-1"
            >
              Upcoming Event
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold">{event.title}</h1>
            <div className="flex flex-wrap gap-4 items-center text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>9:00 AM - 6:00 PM Daily</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {event.tags.map((tag, index) => {
                const tagColors: Record<string, string> = {
                  "Paintings": "bg-pink-200 text-pink-800 border-pink-300",
                  "Abstract Art": "bg-purple-200 text-purple-800 border-purple-300",
                  "Sculpture": "bg-yellow-200 text-yellow-800 border-yellow-300",
                  "Crafts": "bg-orange-200 text-orange-800 border-orange-300",
                  "Illustration": "bg-blue-200 text-blue-800 border-blue-300",
                  "Nature Art": "bg-emerald-200 text-emerald-800 border-emerald-300",
                  "Photography": "bg-indigo-200 text-indigo-800 border-indigo-300",
                };

                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`px-3 py-1 ${tagColors[tag] || "bg-gray-200 text-gray-700 border-gray-300"}`}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* About + Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 lg:items-start">
          {/* About Section */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            <div className="bg-white p-6 rounded-lg border h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">About the Event</h2>
              <div className="flex-grow">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {event.excerpt ||
                    "A mesmerizing exhibition featuring dynamic and vibrant abstract artworks from emerging talents."}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Explore more details about this upcoming exhibition, including
                  featured artists, special workshops, and interactive
                  experiences designed to immerse visitors in the world of
                  contemporary abstract art.
                </p>
              </div>
              <Link
                to=""
                className="w-fit text-sky-600 mt-4 flex items-center gap-1 hover:underline self-start"
              >
                Read More
                <ArrowRight className="h-4 w-4 mt-1" />
              </Link>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex flex-col gap-6 lg:self-start">
            <div className="bg-gray-50 p-6 rounded-lg border space-y-4 lg:sticky lg:top-4">
              <h3 className="font-medium text-lg">Event Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Similar Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map((relatedEvent) => (
                <div
                  key={relatedEvent.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/upcoming/${relatedEvent.id}`)}
                >
                  <div className="aspect-[3/2] w-full bg-gray-100">
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">
                      {relatedEvent.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{relatedEvent.date}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {relatedEvent.tags.slice(0, 2).map((tag, index) => {
                        const tagColors: Record<string, string> = {
                          "Paintings": "bg-pink-200 text-pink-800 border-pink-300",
                          "Abstract Art": "bg-purple-200 text-purple-800 border-purple-300",
                          "Sculpture": "bg-yellow-200 text-yellow-800 border-yellow-300",
                          "Crafts": "bg-orange-200 text-orange-800 border-orange-300",
                          "Illustration": "bg-blue-200 text-blue-800 border-blue-300",
                          "Nature Art": "bg-emerald-200 text-emerald-800 border-emerald-300",
                          "Photography": "bg-indigo-200 text-indigo-800 border-indigo-300",
                        };

                        return (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`px-2 py-0.5 text-xs ${tagColors[tag] || "bg-gray-200 text-gray-700 border-gray-300"}`}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
