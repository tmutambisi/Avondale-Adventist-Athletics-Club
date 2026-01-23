import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Quote, ChevronDown, ChevronUp } from "lucide-react";
import Ivenyakore from "@/assets/testimonials/makore.jpeg";
import NicholasMangwende from "@/assets/testimonials/nicholasmangwende.jpeg";
import NyashadzasheEGanje from "@/assets/testimonials/NyashadzasheEGanje.jpeg";
import EffortDube from "@/assets/testimonials/effort.jpeg";
import TungamiraiAMutambisi from "@/assets/testimonials/tunga.jpeg";
import WellingtonManwere from "@/assets/testimonials/WellingtonManwere.jpeg";
import Patience from "@/assets/testimonials/Patience.jpeg";
import LindiweNyathi from "@/assets/testimonials/Lindiwe.jpeg";
import AmandaJukes from "@/assets/testimonials/Amanda.jpeg";
const testimonials = [
  {
    id: 1,
    name: "Ps Nicholas Mangwende",
    image: NicholasMangwende,
    role: "Comrades Runner",
    testimony: "Pioneering the Comrades Marathon initiative at Avondale Athletics Club affirmed that endurance is not only physical but spiritual. The journey strengthened our athletes and unified our club around purpose, resilience, and hope.",
  },
  {
    id: 2,
    name: "Tungamirai A Mutambisi",
    image: TungamiraiAMutambisi,
    role: "Member since 2025",
    testimony: "I have been part of several running groups, but AAAC stands out for its values. The spiritual foundation and emphasis on character development alongside physical fitness creates a unique, wholesome environment. It's more than just a running club, it's a family.",
  },
  {
    id: 3,
    name: "Effort Dube",
    image: EffortDube,
    role: "Member since 2024",
    testimony: "AAAC has been inspirational in my running journey. I am happy to be part of a running club that supports my fundamental spiritual beliefs and aligns my health goals with spiritual growth. It’s the kindness and continuous motivation for me that takes the cup on any given day",
  },
  {
    id: 4,
    name: "Nyashadzashe E Ganje",
    image: NyashadzasheEGanje,
    initials: "NG",
    role: "Member since 2024",
    testimony: "Running a full marathon once felt like a distant dream—one I never thought I could realize so soon. However, joining the AAAC club transformed that dream into reality in a timeframe I never imagined possible. The experience ignited a fire within me, not only in running but also in various other areas of my life. Im grateful for such a community",
  },

  {
    id: 5,
    name: "Wellington Manwere",
    image: WellingtonManwere,
    role: "Member since 2024",
    testimony: "Who says peer pressure is necessarily a bad thing?” AAAC pushed me to achieve way more than I was prepared to, 21km in my very first race, where I truly suffered. But one and half years later, and I ran a marathon in exactly 5 hours! I love the influence this club has had on my life, and am so proud to be a member of such, we are changing the world, 1km at a time",
  },

  {
    id: 6,
    name: "Patience Milazi",
    initials: "PM",
    image: Patience,
    role: "Member since 2024",
    testimony: "Before joining AAAC, I struggled to run beyond 21km.But since joining, I've been pushed to go futher-literally! The club's support and guidance have been game changers. I've gained massive confidence in my running, and I'm proud to say I've gone from struggling with 21km to tackling full marathons. Grateful for AAAC impact on my running journey.",
  },
  {
    id: 7,
    name: "Lindiwe Nyathi",
    initials: "LN",
    image: LindiweNyathi,
    role: "Member since 2024",
    testimony: "Grateful to be part of my first ever running club,which has made me keep on wanting to be a better runner,each day. The club comes with inspiration,exposure, motivation and fellowship. I am happy to belong",
  },
  {
    id: 8,
    name: "Amanda Kujeke",
    initials: "AJ",
    image: AmandaJukes,
    role: "Member since 2024",
    testimony: "Running with Avondale Athletic Club has been more than just training—it’s been a family. The encouragement, discipline, and spiritual support I receive at every session push me to be a better runner and a better person. AAAC doesn’t just build strong runners; it builds strong character",
  },

  {
    id: 9,
    name: "Iveny Makore",
    initials: "IM",
    image: Ivenyakore,
    role: "Member since 2023",
    testimony: "Joining Avondale Athletics Club has been one of the best decisions in my running journey. The club provides a welcoming and disciplined environment that motivates runners of all levels to improve consistently. Through structured training sessions, experienced coaches, and supportive teammates, my endurance, pace, and confidence have improved significantly. Beyond performance, the club fosters friendship, accountability, and a strong sense of community. Avondale Athletics Club is more than just a running club—it is a family that pushes you to be your best",
  },

];

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const isLong = testimonial.testimony.length > maxLength;

  const displayTestimony = isExpanded
    ? testimonial.testimony
    : testimonial.testimony.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <div
      className="card-elevated overflow-hidden opacity-0 animate-fade-up h-full flex flex-col"
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
    >
      {testimonial.image && (
        <div className="aspect-square overflow-hidden relative group border-b border-border/50">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <Quote className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0" />
        <div className="flex-grow">
          <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
            "{displayTestimony}"
          </p>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 mb-6 transition-colors"
            >
              {isExpanded ? (
                <>Read Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
          {testimonial.initials && !testimonial.image && (
            <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-primary-foreground">
                {testimonial.initials}
              </span>
            </div>
          )}
          <div>
            <p className="font-display font-semibold line-clamp-1">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-1">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="Testimonials"
          subtitle="Hear what our members have to say about their Avondale Adventist Athletics Club experience"
        />

        {/* Testimonials Grid */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
