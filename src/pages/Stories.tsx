import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Award, Calendar, ChevronDown, ChevronUp } from "lucide-react";

import awardImg from "@/assets/gallery/award.jpg";
import Williams from "@/assets/testimonials/williams.jpeg";
import Marandure from "@/assets/testimonials/marandure.jpeg";
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

  {
    id: 3,
    name: "The Marandure Family",
    image: Marandure,
    achievement: "Running Together as a Couple",
    // event: "Zimbabwe National Championships",
    // date: "September 2025",
    story: "The advantages of running together or participating in athletic races as a couple are numerous, unique, and invaluable. This is how Mr. and Mrs. Marandure began their journey as a couple. Mr. Marandure had a longstanding passion for physical training, while Mrs. Marandure was a dedicated netball player who engaged in a lot of training, including running. However, after they got married, Mrs. Marandure eased off on her training and eventually stopped running, while Mr. Marandure continued with his physical training.Over time, a challenge arose, as running often requires a bit of motivation. After eight years of marriage, the spark for running was reignited following a heartfelt conversation. Running together soon became a priority on their list of goals. Their first practice wasn't easy, as Mrs. Marandure preferred to walk a kilometer; however, simply getting out of bed early in the morning for that walk was a significant accomplishment and marked the beginning of the joy they now experience. They found that spending quality time together while training allowed for conversations and planning, all while sharing a common struggle. This shared experience kept them aligned, as they endured similar challenges during and after their training sessions or races. Having a mutual interest in their sport created common topics for discussion. They also found joy in achieving physical fitness together, celebrating positive changes along the way. Crossing the finish line and earning a medal, even while sweaty and exhausted, offered a sense of accomplishment and a milestone to celebrate together. Their physical connection grew stronger, making it easier to handle misunderstandings and negative emotions, as they developed greater tolerance for one another. Mr. Marandure even adjusted to a 10km run to match Mrs. Marandure's pace, gradually increasing both of their distances and speeds as they progressed.",
  },
  {
    id: 4,
    name: "The Williams Family",
    initials: "TW",
    image: Williams,
    achievement: "Running Together as a Family",
    // event: "Family Running Challenge",
    // date: "2025",
    story: "We are the Williams, and running together has become our favorite way to love each other. Our dates look like long runs — three-hour adventures where we talk, laugh, take photos, or simply share the sound of our loud, tired breathing. When one of us doesn’t feel like getting up, the other stepping out of bed is all the motivation we need. Comparing our mileage keeps us pushing, growing, and showing up. Running has become our family hobby — we travel, cheer each other on, and nothing beats knowing that the person you love will be waiting for you at the finish line. We don’t just run miles — we run life side by side",
  },
  /*
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

const StoryCard = ({ story, index }: { story: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250; // Stories are usually longer, so we give more initial text
  const isLong = story.story.length > maxLength;

  const displayStory = isExpanded
    ? story.story
    : story.story.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <div
      className="card-elevated overflow-hidden opacity-0 animate-fade-up h-full flex flex-col"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {story.image && (
        <div className="aspect-square overflow-hidden relative group border-b border-border/50">
          <img
            src={story.image}
            alt={story.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-start gap-4 mb-4 flex-shrink-0">
          {!story.image && story.initials && (
            <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-xl text-primary-foreground">
                {story.initials}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl mb-1">{story.name}</h3>
            <div className="flex items-center gap-2 text-accent mb-1">
              <Award className="w-4 h-4" />
              <span className="font-medium">{story.achievement}</span>
            </div>
            {story.event && story.date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{story.event} • {story.date}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-wrap">
            "{displayStory}"
          </p>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 mb-4 transition-colors"
            >
              {isExpanded ? (
                <>Read Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
              {stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
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
