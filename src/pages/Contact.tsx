import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Basic X icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/run_avondale?igsh=MTljNHJldWhjeWtjMA%3D%3D" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584201706585" },
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
                    or want to learn more about the Avondale Adventist Athletics Club, we are here to help. Reach out to us through
                    any of the following channels.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="card-elevated p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
                      <EmailIcon className="w-5 h-5 text-primary-foreground" />
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
                        <PhoneIcon className="w-5 h-5 text-primary-foreground" />
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
                      <LocationOnIcon className="w-5 h-5 text-primary-foreground" />
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
                        Send Message <SendIcon className="!w-4 !h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Join CTA */}
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <CheckCircleIcon className="!w-5 !h-5" />
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
