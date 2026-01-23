import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import WhatsAppModal from "../WhatsAppModal";
import logo from "@/assets/logo.png";
import sdaLogo from "@/assets/sda-logo.png";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/run_avondale?igsh=MTljNHJldWhjeWtjMA%3D%3D" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584201706585" },
  { icon: XIcon, label: "X", href: "https://x.com/run_avondale?s=21&t=wprRJAxPidiazndvXPOTwQ", isCustom: true },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/263772272348", isCustom: true },
];

const Footer = () => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-[hsl(195,70%,95%)] to-[hsl(180,70%,90%)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Main Logo - Round */}
              <div className="w-14 h-14 rounded-full bg-white shadow-md ring-2 ring-primary/20 p-1.5 transition-all hover:ring-primary/40 hover:shadow-lg overflow-hidden">
                <img src={logo} alt="AAAC Logo" className="w-full h-full object-contain" />
              </div>
              {/* SDA Logo - Round */}
              <div className="w-14 h-14 rounded-full bg-[#1a5276] shadow-md ring-2 ring-primary/20 p-1.5 transition-all hover:ring-primary/40 hover:shadow-lg overflow-hidden">
                <img src={sdaLogo} alt="SDA Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="font-display font-bold text-xl block text-foreground">Avondale Adventist Athletic Club</span>
            <p className="text-muted-foreground leading-relaxed">
              Run, grow, and connect—a community focused on health and personal development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Events", path: "/events" },
                { name: "Committee", path: "/committee" },
                { name: "Success Stories", path: "/stories" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>info@aaac.club</span>
              </div>
              <div
                className="flex items-center gap-3 text-muted-foreground group cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsWhatsAppModalOpen(true)}
              >
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background z-10 transition-transform group-hover:-translate-x-1">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background transition-transform group-hover:translate-x-1">
                    <WhatsAppIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <span>+263 772 272 348</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>Avondale, Harare, Zimbabwe</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">Follow Us</h4>
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

        <div className="mt-12 pt-8 border-t border-primary/20 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Avondale Adventist Athletics Club. All rights reserved. Website developed and mantained by <a href="https://tungasonicweb.vercel.app/" target="_blank" rel="noopener noreferrer">TUNGASONIC</a></p>
        </div>
      </div>
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
