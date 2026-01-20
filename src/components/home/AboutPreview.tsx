import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Trophy } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Healthy Living",
    description: "Promoting physical wellness and encouraging an active lifestyle for all members.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building lasting friendships and support networks through our running family.",
  },
  {
    icon: Trophy,
    title: "Achievement",
    description: "Celebrating personal growth and milestones at every level of ability.",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-20 lg:py-32 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            About <span className="text-gradient">Avondale Adventist Athletics Club</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Avondale Adventist Athletics Club (AAAC) is committed to promoting a healthy lifestyle, encouraging personal growth through running, and building camaraderie among members. We foster an inclusive environment where everyone feels welcome and valued, regardless of running experience or background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elevated p-8 text-center opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">Read More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
