import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import healthyLivingImg from "@/assets/hero/hero-3.jpg";
import communityImg from "@/assets/gallery/firstmutual1.jpeg";
import achievementImg from "@/assets/gallery/awards2.jpg";

const features = [
  {
    image: healthyLivingImg,
    title: "Healthy Living",
    description: "Promoting physical wellness and encouraging an active lifestyle for all members.",
  },
  {
    image: communityImg,
    title: "Community",
    description: "Building lasting friendships and support networks through our running family.",
  },
  {
    image: achievementImg,
    title: "Achievement",
    description: "Celebrating personal growth and milestones at every level of ability.",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-pearl">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            About <span className="text-gradient">Avondale Adventist Athletics Club</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Avondale Adventist Athletics Club (AAAC) is dedicated to encouraging a healthy lifestyle and supporting personal development through running. We strive to create strong bonds among members, nurturing a welcoming and inclusive community where everyone—no matter their running background or experience—feels respected and valued.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elevated overflow-hidden opacity-0 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
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
