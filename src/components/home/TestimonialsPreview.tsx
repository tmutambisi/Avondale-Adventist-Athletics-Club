import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import familyImg from "@/assets/gallery/family-mbiriri.jpg";
import random1Img from "@/assets/gallery/random1.jpg";

const testimonials = [
  {
    id: 1,
    name: "Club Member",
    image: familyImg,
    testimony: "AAAC isn't just a running club—it's a family. The encouragement I receive every Saturday morning keeps me motivated throughout the week.",
  },
  {
    id: 2,
    name: "Grace Mutasa",
    image: random1Img,
    testimony: "Being recognized for my achievements was a highlight. This club celebrates every milestone, big or small!",
  },
];

const TestimonialsPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            What Members <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-elevated overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="p-8">
                <FormatQuoteIcon className="!w-10 !h-10 text-primary/20 mb-4" />
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  "{testimonial.testimony}"
                </p>
                <span className="font-display font-semibold">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <Link to="/testimonials">Read More Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
