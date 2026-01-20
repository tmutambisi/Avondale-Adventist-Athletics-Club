import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    club_name: z.string().min(2, "Club name is required"),
});

interface RegistrationFormProps {
    event: {
        id: string;
        name: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export function RegistrationForm({ event, isOpen, onClose }: RegistrationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            phone: "",
            club_name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!event) return;

        try {
            setIsSubmitting(true);
            const { error } = await supabase
                .from("event_registrations")
                .insert([
                    {
                        event_id: event.id,
                        full_name: values.full_name,
                        email: values.email,
                        phone: values.phone,
                        club_name: values.club_name,
                    },
                ]);

            if (error) throw error;

            setIsSuccess(true);
            form.reset();
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Failed to register. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsSuccess(false);
        onClose();
        form.reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                {isSuccess ? (
                    <div className="py-8 flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900">Registration Successful!</h3>
                            <p className="text-slate-500">
                                You've successfully registered for <span className="font-semibold text-primary">{event?.name}</span>.
                                We've sent a confirmation to your email.
                            </p>
                        </div>
                        <Button onClick={handleClose} className="w-full mt-4">
                            Great, thanks!
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Event Registration</DialogTitle>
                            <DialogDescription>
                                Fill in your details to register for <span className="font-semibold text-primary">{event?.name}</span>.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tungamirai Mutambisi" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="tungamirai@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+263 ..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="club_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Club Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Avondale Adventist Athletics" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="pt-4">
                                    <Button type="button" variant="outline" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            "Confirm Registration"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
