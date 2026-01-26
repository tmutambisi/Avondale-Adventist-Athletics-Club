import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import LoopIcon from '@mui/icons-material/Loop';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ParticipantListProps {
    event: {
        id: string;
        name: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ParticipantList({ event, isOpen, onClose }: ParticipantListProps) {
    const [participants, setParticipants] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && event) {
            fetchParticipants();
        }
    }, [isOpen, event]);

    const fetchParticipants = async () => {
        if (!event) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("event_registrations")
                .select("*")
                .eq("event_id", event.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setParticipants(data || []);
        } catch (error: any) {
            console.error("Error fetching participants:", error);
            toast.error("Failed to load participants");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this participant?")) return;

        try {
            const { error } = await supabase
                .from("event_registrations")
                .delete()
                .eq("id", id);

            if (error) throw error;
            setParticipants(participants.filter(p => p.id !== id));
            toast.success("Participant removed");
        } catch (error: any) {
            toast.error("Failed to delete participant");
        }
    };

    const exportToCSV = () => {
        if (participants.length === 0) {
            toast.error("No data to export");
            return;
        }

        const headers = ["Full Name", "Email", "Phone", "Club Name", "Registration Date"];
        const rows = participants.map(p => [
            p.full_name,
            p.email,
            `\t${p.phone}`, // Prepend with a tab to force Excel to treat as text exactly as it is
            p.club_name || "",
            new Date(p.created_at).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        // Add UTF-8 BOM for Excel to recognize encoding and leading tabs correctly
        const blob = new Blob(["\ufeff", csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${event?.name.replace(/\s+/g, '_')}_participants.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("List exported successfully");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader className="pb-4 border-b flex flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        Participants: <span className="text-primary">{event?.name}</span>
                    </DialogTitle>
                    {participants.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-xs h-8"
                            onClick={exportToCSV}
                        >
                            <DownloadIcon className="!w-3.5 !h-3.5" />
                            Export Excel
                        </Button>
                    )}
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pt-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <LoopIcon className="!w-8 !h-8 animate-spin text-primary" />
                            <p className="text-sm text-slate-500">Loading registrations...</p>
                        </div>
                    ) : participants.length === 0 ? (
                        <div className="text-center py-20 text-slate-400 italic">
                            No participants have registered for this event yet.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {participants.map((p) => (
                                <div
                                    key={p.id}
                                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/50 pb-1 mb-2">
                                            <PersonIcon className="!w-4 !h-4 text-primary" />
                                            {p.full_name}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <EmailIcon className="!w-3.5 !h-3.5 text-slate-400" />
                                                <a href={`mailto:${p.email}`} className="hover:text-primary transition-colors">{p.email}</a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <PhoneIcon className="!w-3.5 !h-3.5 text-slate-400" />
                                                <a href={`tel:${p.phone}`} className="hover:text-primary transition-colors">{p.phone}</a>
                                            </div>
                                            {p.club_name && (
                                                <div className="flex items-center gap-2 md:col-span-2">
                                                    <CorporateFareIcon className="!w-3.5 !h-3.5 text-slate-400" />
                                                    <span className="font-medium">{p.club_name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        <DeleteIcon className="!w-4 !h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t text-right mt-auto">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                        Total Registrations: {participants.length}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
