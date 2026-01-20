import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="py-16 md:py-20 hero-gradient">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
