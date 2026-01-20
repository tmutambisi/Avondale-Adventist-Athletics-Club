import { useState } from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Calendar as CalendarIcon,
    MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { EventForm } from "@/components/admin/EventForm";
import { ParticipantList } from "@/components/admin/ParticipantList";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Loader2, Users } from "lucide-react";



export default function EventManager() {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [viewingParticipantsEvent, setViewingParticipantsEvent] = useState<any>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*, event_registrations(count)')
                .order('date', { ascending: false });

            if (error) throw error;

            const eventsWithCount = data?.map(event => ({
                ...event,
                registrations: event.event_registrations?.[0]?.count || 0
            }));

            setEvents(eventsWithCount || []);
        } catch (error: any) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch events");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setEvents(events.filter(e => e.id !== id));
            toast.success("Event deleted successfully");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleFormSubmit = async (data: any) => {
        try {
            if (editingEvent) {
                const { error } = await supabase
                    .from('events')
                    .update(data)
                    .eq('id', editingEvent.id);

                if (error) throw error;
                toast.success("Event updated successfully");
            } else {
                const { error } = await supabase
                    .from('events')
                    .insert([data]);

                if (error) throw error;
                toast.success("Event created successfully");
            }

            fetchEvents();
            setIsFormOpen(false);
            setEditingEvent(null);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const openEditForm = (event: any) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Event Management</h1>
                    <p className="text-slate-500 mt-1">Create, edit and manage your club events.</p>
                </div>
                <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
                    <Plus className="w-4 h-4" /> Add New Event
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Event Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Date & Location</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Registrations</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                        <p className="text-sm text-slate-500 mt-2">Loading events...</p>
                                    </td>
                                </tr>
                            ) : filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No events found.
                                    </td>
                                </tr>
                            ) : filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-900">{event.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[100px] font-mono">ID: {event.id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CalendarIcon className="w-4 h-4" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {event.registrations || 0} participants
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    onClick={() => window.open(`/events`, '_blank')}
                                                >
                                                    <Eye className="w-4 h-4" /> View Public
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    onClick={() => {
                                                        setViewingParticipantsEvent(event);
                                                        setIsParticipantsOpen(true);
                                                    }}
                                                >
                                                    <Users className="w-4 h-4" /> View Participants
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer"
                                                    onClick={() => openEditForm(event)}
                                                >
                                                    <Edit2 className="w-4 h-4" /> Edit Event
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                                                    onClick={() => handleDelete(event.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete Event
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EventForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingEvent(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={editingEvent}
            />

            <ParticipantList
                isOpen={isParticipantsOpen}
                onClose={() => {
                    setIsParticipantsOpen(false);
                    setViewingParticipantsEvent(null);
                }}
                event={viewingParticipantsEvent}
            />
        </div>
    );
}
