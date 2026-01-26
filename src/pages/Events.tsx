import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoopIcon from '@mui/icons-material/Loop';
import CloseIcon from '@mui/icons-material/Close';
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
  status?: string;
}



const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isEventPast = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    eventDate.setHours(23, 59, 59, 999);
    return eventDate < now;
  };

  const featuredEvents = events.filter(e => e.is_featured && !isEventPast(e.date));
  const upcomingEvents = events.filter(e => !e.is_featured && !isEventPast(e.date));
  const pastEvents = events.filter(e => isEventPast(e.date));

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerEvent, setRegisterEvent] = useState<Event | null>(null);

  const handleRegisterClick = (event: Event) => {
    setRegisterEvent(event);
    setIsRegistering(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="Events"
          subtitle="Join us at our runs, races, and community gatherings"
        />

        {/* Featured Events */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
              Featured <span className="text-gradient">Events</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <LoopIcon className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : featuredEvents.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No featured events at the moment.
                </div>
              ) : featuredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="card-elevated overflow-hidden opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="relative aspect-square">
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl md:text-2xl mb-3">{event.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <CalendarTodayIcon className="!w-4 !h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <AccessTimeIcon className="!w-4 !h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <LocationOnIcon className="!w-4 !h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{event.description}</p>
                    {isEventPast(event.date) ? (
                      <Button variant="outline" className="w-full rounded-full opacity-50 cursor-not-allowed" disabled>
                        Event Concluded
                      </Button>
                    ) : (
                      <Button
                        variant="accent"
                        className="w-full rounded-full"
                        onClick={() => handleEventClick(event)}
                      >
                        Learn More <ArrowForwardIcon className="!w-4 !h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Upcoming Events */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
              More Upcoming <span className="text-gradient">Events</span>
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <LoopIcon className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Stay tuned for more upcoming events!
                </div>
              ) : upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="card-elevated overflow-hidden opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2 hero-gradient" />
                    <div className="p-6 md:p-8 flex-1">
                      <h3 className="font-display font-bold text-xl md:text-2xl mb-4">{event.name}</h3>
                      <div className="grid grid-cols-1 mb-4 gap-2">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <CalendarTodayIcon className="!w-5 !h-5 text-primary" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <AccessTimeIcon className="!w-5 !h-5 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <LocationOnIcon className="!w-5 !h-5 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 line-clamp-3">{event.description}</p>
                      {isEventPast(event.date) ? (
                        <Button variant="outline" className="rounded-full opacity-50 cursor-not-allowed" disabled>
                          Event Concluded
                        </Button>
                      ) : (
                        <Button
                          variant="accent"
                          className="rounded-full"
                          onClick={() => handleRegisterClick(event)}
                        >
                          Register Now <ArrowForwardIcon className="!w-4 !h-4 ml-2" />
                        </Button>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events with Real Images */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
              Past <span className="text-gradient">Events</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <LoopIcon className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : pastEvents.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No past events recorded yet.
                </div>
              ) : pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="card-elevated overflow-hidden opacity-0 animate-fade-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg mb-2">{event.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <CalendarTodayIcon className="!w-4 !h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Event Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedEvent.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                  {/* Image Container - Showing image fully */}
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
                        <CalendarTodayIcon className="!w-5 !h-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Date</span>
                        <span className="text-sm">{new Date(selectedEvent.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <AccessTimeIcon className="!w-5 !h-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Time</span>
                        <span className="text-sm">{selectedEvent.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <LocationOnIcon className="!w-5 !h-5 text-primary" />
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
                    {!isEventPast(selectedEvent.date) && (
                      <Button
                        variant="accent"
                        className="rounded-full px-8"
                        onClick={() => handleRegisterClick(selectedEvent)}
                      >
                        Register Now
                      </Button>
                    )}
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
      </main>
      <Footer />
    </div >
  );
};

export default Events;
