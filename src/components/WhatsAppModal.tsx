import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/layout/Footer"; // I'll move this to a shared location if needed, for now I'll define a local one or import if exported

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WhatsAppModal = ({ isOpen, onClose }: WhatsAppModalProps) => {
    const [message, setMessage] = useState(
        "Good day, I am reaching out from the Avondale Adventist Athletics Club Website, and I would like to enquire more about how I can join the club."
    );
    const [contact, setContact] = useState("263772272348");

    const handleSend = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${contact}?text=${encodedMessage}`, "_blank");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-[#25D366]">Contact</span> Avondale Athletics
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        Send a WhatsApp message to our team to enquire about membership and club activities.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Select Contact
                        </label>
                        <Select value={contact} onValueChange={setContact}>
                            <SelectTrigger className="w-full h-12 bg-muted/50 border-border focus:ring-[#25D366]">
                                <SelectValue placeholder="Select a contact" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="263772272348">Elder Kondo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Your Message
                        </label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[120px] bg-muted/50 border-border focus:ring-[#25D366] resize-none leading-relaxed"
                            placeholder="Type your message here..."
                        />
                    </div>

                    <Button
                        onClick={handleSend}
                        className="w-full h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Send via WhatsApp
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WhatsAppModal;
