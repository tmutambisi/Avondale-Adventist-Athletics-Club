import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Upcoming <span className="text-gradient">Event</span>
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
              className="card-elevated overflow-hidden opacity-0 animate-fade-up md:col-start-2 lg:col-start-2"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-full overflow-hidden aspect-video">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-4">{event.name}</h3>
                <div className="space-y-3 mb-4">
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
                <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
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
    </section>
  );
};

export default EventsPreview;

