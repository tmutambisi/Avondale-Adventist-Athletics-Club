import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppModal from "@/components/WhatsAppModal";
import { WhatsAppIcon } from "@/components/layout/Footer";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/run_avondale?igsh=MTljNHJldWhjeWtjMA%3D%3D" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584201706585" },
  { icon: XIcon, label: "X", href: "https://x.com/run_avondale?s=21&t=wprRJAxPidiazndvXPOTwQ" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/263772272348" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="Contact Us"
          subtitle="Ready to join? Have questions? We'd love to hear from you!"
        />

        {/* Contact Content */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
                    Get in <span className="text-gradient">Touch</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Whether you're interested in joining the club, have questions about our events,
                    or want to learn more about AAAC, we're here to help. Reach out to us through
                    any of the following channels.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="card-elevated p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-0.5">Email</h3>
                      <p className="text-muted-foreground">info@aaac.club</p>
                    </div>
                  </div>

                  <div
                    className="card-elevated p-5 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-all group"
                    onClick={() => setIsWhatsAppModalOpen(true)}
                  >
                    <div className="flex -space-x-4">
                      <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0 border-2 border-background z-10 transition-transform group-hover:-translate-x-1">
                        <Phone className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0 border-2 border-background transition-transform group-hover:translate-x-1">
                        <WhatsAppIcon className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-0.5 group-hover:text-primary transition-colors">Phone / WhatsApp</h3>
                      <p className="text-muted-foreground">+263 772 272 348</p>
                    </div>
                  </div>

                  <div className="card-elevated p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-0.5">Location</h3>
                      <p className="text-muted-foreground">Avondale, Harare, Zimbabwe</p>
                    </div>
                  </div>
                </div>

                {/* Social Links - Modern Round Icons */}
                <div>
                  <h3 className="font-display font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <button
                        key={social.label}
                        onClick={() => {
                          if (social.label === "WhatsApp") {
                            setIsWhatsAppModalOpen(true);
                          } else {
                            window.open(social.href, "_blank");
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-white shadow-md ring-1 ring-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg text-primary"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card-elevated p-6 md:p-8">
                <h2 className="font-display font-bold text-2xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+263..."
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="rounded-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Join CTA */}
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Ready to Join?</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Select "Membership Inquiry" as your subject and we'll guide you through the process!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
};

export default Contact;
