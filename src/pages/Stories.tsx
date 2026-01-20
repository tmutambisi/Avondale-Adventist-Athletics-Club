import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Award, Calendar } from "lucide-react";

import awardImg from "@/assets/gallery/award.jpg";
import random1Img from "@/assets/gallery/random1.jpg";
import random3Img from "@/assets/gallery/random3.jpg";
import comradesImg from "@/assets/gallery/comrades.jpeg";

const stories = [
  {
    id: 1,
    name: "SDA Avondale",
    image: awardImg,
    achievement: "Corporate Team of the Year",
    event: "Zimbabwe Road Running Awards 2025",
    date: "November 2025",
    story: "A proud moment for AAAC as we received the prestigious Corporate Team of the Year award at the Zimbabwe Road Running Awards. This recognition reflects the dedication, teamwork, and commitment of all our members who consistently show up, train hard, and support each other at every race. This award belongs to every member of our running family.",
  },
  {
    id: 2,
    name: "Club Members",
    image: comradesImg,
    initials: "PS",
    achievement: "Comrades Marathon Finishers",
    event: "90km Comrades Marathon",
    date: "June 2025",
    story: "PS Ngorima, PS Mangwende, PS Dr Mudzengi, and Elder Kondo completed the legendary 90km Comrades Marathon in South Africa. Their resilience and determination paid off as they crossed the finish line, representing AAAC with pride. Their achievement inspires us all to push beyond our limits.",
  },
  /*
  {
    id: 3,
    name: "Grace Mutasa",
    image: random1Img,
    achievement: "National Half Marathon Finalist",
    event: "Zimbabwe National Championships",
    date: "September 2025",
    story: "I started as a casual jogger who ran alone in my neighborhood. Joining AAAC introduced me to proper training techniques and speed work I never knew existed. The club captain, David, saw potential in me and pushed me to enter competitions. At the national championships, I finished 8th in my age category – something I never dreamed possible when I started running just three years ago.",
  },
  {
    id: 4,
    name: "Tendai Chikwanha",
    initials: "TC",
    achievement: "Overcame Depression Through Running",
    event: "Mental Health Advocacy",
    date: "2025",
    story: "Running with AAAC gave me more than physical fitness – it saved my mental health. During a dark period in my life, the Saturday morning runs became my therapy. The community, the fresh air, the endorphins – they all combined to lift me out of depression. Now I'm an advocate for mental health awareness in our club, sharing how running can heal both body and mind.",
  },
  {
    id: 5,
    name: "Rudo & Tapiwa Gumbo",
    initials: "RG",
    achievement: "Running Together as a Couple",
    event: "Couples Running Challenge",
    date: "2025",
    story: "As a married couple, we struggled to find activities we could enjoy together. AAAC's family-friendly approach welcomed us both. Now we train together, encourage each other, and have completed three half marathons as running partners. Our children have also joined the junior program. Running has become our family bonding activity.",
  },
  {
    id: 6,
    name: "Michael Ndlovu",
    image: random3Img,
    achievement: "From Couch to Comrades",
    event: "Comrades Marathon 2025",
    date: "June 2025",
    story: "The Comrades Marathon – 90km of the world's toughest ultra-marathon – seemed impossible for someone who started running at 45. But with AAAC's ultra-marathon training group and the mental support from experienced members, I crossed that finish line. It took me 11 hours and 42 minutes, but I earned my medal. AAAC proved that age is just a number.",
  },
  */
];

const Stories = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="Success Stories"
          subtitle="Real journeys of transformation and achievement from our members"
        />

        {/* Stories Grid */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="card-elevated overflow-hidden opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  {story.image && (
                    <div className="h-64 overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      {!story.image && story.initials && (
                        <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
                          <span className="font-display font-bold text-xl text-primary-foreground">
                            {story.initials}
                          </span>
                        </div>
                      )}
                      <div className={story.image ? "" : ""}>
                        <h3 className="font-display font-bold text-xl md:text-2xl mb-1">{story.name}</h3>
                        <div className="flex items-center gap-2 text-accent mb-1">
                          <Award className="w-4 h-4" />
                          <span className="font-medium">{story.achievement}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{story.event} • {story.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">"{story.story}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
