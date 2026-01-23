import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

import awardImg from "@/assets/gallery/award.jpg";
import comradesImg from "@/assets/gallery/comrades.jpeg";
import random3Img from "@/assets/gallery/random3.jpg";

const stories = [
  {
    id: 1,
    name: "SDA Avondale",
    image: awardImg,
    achievement: "Corporate Team of the Year",
    story: "Awarded at the Zimbabwe Road Running Awards 2025 for outstanding dedication and teamwork.",
  },
  {
    id: 2,
    name: "The Comrades Pioneers",
    image: comradesImg,
    achievement: "The Ultimate Human Race",
    story: "Our first batch of runners—all novices—who successfully conquered the 90km Comrades Marathon in South Africa.",
  },
  /*
  {
    id: 3,
    name: "Michael Ndlovu",
    image: random3Img,
    achievement: "From Couch to Comrades",
    story: "Started running at 45 and completed the world's toughest ultra-marathon with AAAC's support.",
  },
*/
];

const StoriesPreview = () => {
  return (
    <section className="py-20 lg:py-28 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Be inspired by the journeys of our amazing club members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="card-elevated overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">{story.achievement}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{story.name}</h3>
                <p className="text-muted-foreground text-sm italic">"{story.story}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <Link to="/stories">Read More Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StoriesPreview;
