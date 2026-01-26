import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
                        <WhatsAppIcon className="!w-6 !h-6 mr-2" />
                        Send via WhatsApp
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WhatsAppModal;
