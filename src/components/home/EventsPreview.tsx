import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegistrationForm } from "@/components/events/RegistrationForm";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
  is_featured: boolean;
}

const EventsPreview = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerEvent, setRegisterEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('is_featured', { ascending: false })
        .order('date', { ascending: true })
        .limit(1);

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error fetching preview events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleRegisterClick = (event: Event) => {
    setRegisterEvent(event);
    setIsRegistering(true);
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't miss our next major gathering. Join the community!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-center">
          {isLoading ? (
            <div className="col-start-1 md:col-start-1 lg:col-start-2 flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : events.length === 0 ? (
            <div className="col-start-1 md:col-start-1 lg:col-start-2 text-center py-12 text-muted-foreground italic">
              New events coming soon. Check back later!
            </div>
          ) : events.map((event, index) => (
            <div
              key={event.id}
              className="card-elevated overflow-hidden opacity-0 animate-fade-up md:col-start-2 lg:col-start-2 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              onClick={() => handleEventClick(event)}
            >
              <div className="w-full overflow-hidden aspect-video">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-4 group-hover:text-primary transition-colors">{event.name}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">{event.description}</p>
                <Button
                  variant="accent"
                  className="w-full rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/events">View Past Events</Link>
          </Button>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedEvent.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <div className="relative w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
                  <img
                    src={selectedEvent.image_url}
                    alt={selectedEvent.name}
                    className="max-w-full max-h-[500px] object-contain"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Date</span>
                      <span className="text-sm">{new Date(selectedEvent.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Time</span>
                      <span className="text-sm">{selectedEvent.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Location</span>
                      <span className="text-sm">{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 border-b pb-2">About this event</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="pt-6 border-t flex justify-between items-center">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                  <Button
                    variant="accent"
                    className="rounded-full px-8"
                    onClick={() => handleRegisterClick(selectedEvent)}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Form Modal */}
      <RegistrationForm
        event={registerEvent}
        isOpen={isRegistering}
        onClose={() => setIsRegistering(false)}
      />
    </section>
  );
};

export default EventsPreview;
