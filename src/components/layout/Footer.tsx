import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import sdaLogo from "@/assets/sda-logo.png";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/run_avondale?igsh=MTljNHJldWhjeWtjMA%3D%3D" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584201706585" },
  { icon: XIcon, label: "X", href: "https://x.com/run_avondale?s=21&t=wprRJAxPidiazndvXPOTwQ", isCustom: true },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/263772272348" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[hsl(195,70%,95%)] to-[hsl(180,70%,90%)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Main Logo - Round */}
              <div className="w-14 h-14 rounded-full bg-white shadow-md ring-2 ring-primary/20 p-1.5 transition-all hover:ring-primary/40 hover:shadow-lg">
                <img src={logo} alt="AAAC Logo" className="w-full h-full object-contain" />
              </div>
              {/* SDA Logo - Round */}
              <div className="w-14 h-14 rounded-full bg-[#1a5276] shadow-md ring-2 ring-primary/20 p-1.5 transition-all hover:ring-primary/40 hover:shadow-lg">
                <img src={sdaLogo} alt="SDA Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="font-display font-bold text-xl block text-foreground">Avondale Adventist Athletic Club</span>
            <p className="text-muted-foreground leading-relaxed">
              Running Together. Growing Together. A community committed to healthy living and personal growth through running.
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
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>+263 772 272 348</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>Avondale, Harare</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white shadow-md ring-1 ring-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/20 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Avondale Adventist Athletics Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
