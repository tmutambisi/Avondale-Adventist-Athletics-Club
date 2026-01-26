import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import SecurityIcon from '@mui/icons-material/Security';

import familyImg from "@/assets/events/awards2.jpg";
import PsMudzengi from "@/assets/gallery/mudzengi.jpg";

const objectives = [
  {
    icon: TrackChangesIcon,
    title: "Develop Athletics",
    description: "Foster and develop athletics, including running and walking activities for all fitness levels.",
  },
  {
    icon: PeopleIcon,
    title: "Encourage Participation",
    description: "Encourage participation in local and international athletic events and competitions.",
  },
  {
    icon: ShareIcon,
    title: "Share Knowledge",
    description: "Share knowledge, resources, and best practices among members to promote continuous improvement.",
  },
  {
    icon: SecurityIcon,
    title: "Protect Interests",
    description: "Protect and promote the interests of our members within the athletics community.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="About Avondale Adventist Athletics Club"
          subtitle="A community committed to promoting healthy lifestyles through running."
        />

        {/* Main Content */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Mission Section with Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="card-elevated p-8">
                  <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The Avondale Adventist Athletics Club (AAAC) is dedicated to encouraging a healthy lifestyle and supporting personal development through running. We strive to create strong bonds among members, nurturing a welcoming and inclusive community where everyone—no matter their running background or experience—feels respected and valued.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={familyImg}
                    alt="AAAC family at an event"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
                Our <span className="text-gradient">Objectives</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {objectives.map((obj, index) => (
                  <div
                    key={obj.title}
                    className="card-elevated p-6 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0">
                        <obj.icon className="!w-6 !h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg mb-2">{obj.title}</h3>
                        <p className="text-muted-foreground">{obj.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comrades Achievement Image */}
              <div className="relative rounded-2xl overflow-hidden mb-16 shadow-lg">
                <img
                  src={PsMudzengi}
                  alt="Ps Mudzengi being given an award"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="card-elevated p-8 md:p-12">
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Membership</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Membership to The Avondale Adventist Athletics Club (AAAC) is open to anyone who shares our passion for running and healthy living.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Admission is through our Executive Committee. Simply reach out through our contact page,
                  and we will be happy to guide you through the joining process.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
