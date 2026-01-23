import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { ChevronDown, ChevronUp } from "lucide-react";
import ElderKondo from "@/assets/leadership/ElderKondo.jpg";
import NyaryMoyo from "@/assets/leadership/Nyary.jpeg";
import VimbaiMakamure from "@/assets/leadership/Vimbai.jpeg";
import IttaiChimwala from "@/assets/leadership/InnocentChimwala.jpeg";
import TonderaiSena from "@/assets/leadership/T.Sena.jpeg";
import StanWilliams from "@/assets/leadership/Stan.jpeg";
import AmandaKujeke from "@/assets/leadership/AmandaEKujeke.jpeg";
import ThomasMabuzwe from "@/assets/leadership/tom.jpg";
import DavidMagwaza from "@/assets/leadership/DavidMagwaza.jpeg";
import ObertMudzengi from "@/assets/leadership/Obert.jpeg";

interface CommitteeMember {
  id: number;
  role: string;
  name: string;
  initials: string;
  image?: string;
  shortBio: string;
  fullBio: string;
}

const committeeMembers: CommitteeMember[] = [
  {
    id: 1,
    role: "Chairperson",
    name: "Elder Kondo",
    initials: "EK",
    image: ElderKondo,
    shortBio: "Leads the club with vision and dedication, bringing years of experience in community leadership.",
    fullBio: "Anesu Kondo is an endurance athlete with a strong passion for extreme sports. He has successfully completed the Comrades Ultramarathon and summited Mount Kilimanjaro, among other endurance challenges. A committed student of the Bible, he serves as an elder in the Seventh-day Adventist Church. Professionally, he is an accountant and sits on several corporate boards. A natural administrator, Anesu actively encourages others to embrace running as a lifestyle and is committed to establishing efficient structures that strengthen club management and long-term sustainability.",
  },
  {
    id: 2,
    role: "Vice Chairperson (Sponsorship & Fundraising)",
    name: "Nyary Dhliwayo Moyo",
    initials: "NDM",
    image: NyaryMoyo,
    shortBio: "Drives partnerships and funding initiatives to support club activities and member development.",
    fullBio: "Nyaradzo Dhliwayo Moyo is an award-winning entrepreneur, creative designer and restaurateur whose life and leadership are anchored in her passion for running. An avid social runner, she draws discipline, endurance, and mental clarity from the sport values that shape her journey as Founder and CEO of Yanaya Lifestyle, Zimbabwe’s first healthy food bar concept. What began as a one woman vision has grown into a multi award winning nutrition brand known for physician approved, health focused meals and innovative dairy free products. A passionate reader and devoted Pastor’s wife in the Adventist Church, Nyaradzo continues to run her race of faith, wellness, and purpose with consistency and intention.",
  },
  {
    id: 3,
    role: "Secretary (Waterpoint & Cheering)",
    name: "Vimbai Makamure",
    initials: "VM",
    image: VimbaiMakamure,
    shortBio: "Manages club communications and coordinates support activities during events.",
    fullBio: "Vimbai Dorothea Makamure is a compassionate Medical Assistant at Orthocare Bone and Joint Surgery, where she brings dedication and care to every patient interaction. When not in scrubs, this energetic cheerleader can be found at the hydration station, enthusiastically supporting athletes and fueling their passions. With a heart for nurturing young minds and a love for travel and cooking, Vimbai embodies positivity and service, making a difference one smile at a time.",
  },
  {
    id: 4,
    role: "Treasurer",
    name: "Ittai Chimwala",
    initials: "IC",
    image: IttaiChimwala,
    shortBio: "Oversees club finances with transparency and ensures sustainable resource management.",
    fullBio: "Ittai Innocent Chimwala is a results-driven Chartered Accountant with a proven track record in the accounting and finance field. He brings strong analytical ability, sound decision-making, and strategic thinking to every role he undertakes. Known for his integrity and leadership skills, Ittai consistently contributes to efficient financial management and organizational growth.Beyond his professional career, Ittai is an active leader in the Seventh-day Adventist Church, serving as a young elder and demonstrating a strong commitment to service, mentorship, and ethical leadership. He is also a passionate runner who values discipline, wellness, and teamwork, and actively builds meaningful connections within the athletics community. Ittai combines professional excellence, faith-based leadership, and a healthy lifestyle to positively impact both the workplace and the wider community.",
  },
  {
    id: 5,
    role: "Parliamentarian",
    name: "Tonderai Sena",
    initials: "TS",
    image: TonderaiSena,
    shortBio: "Ensures proper governance and adherence to club constitution and procedures.",
    fullBio: "Tonderai Sena is partner at ChimukaMafunga Commercial Attorneys, a premier advisory firm in Harare and an elder in the Adventist church. Within the club he serves as the Parliamentarian. His duties primarily involve ensuring the club operates within the bounds of the law, managing legal risks, and handling all legal documentation. He has a keen interest in endurance sports and trail running.",
  },
  {
    id: 6,
    role: "Logistics",
    name: "Stan Williams",
    initials: "SW",
    image: StanWilliams,
    shortBio: "Coordinates equipment, venues, and operational requirements for all club activities.",
    fullBio: "Stanford William is a committed social runner and active member of the Avondale Adventist Athletics Club. He supports the club as a logistician, helping ensure smooth coordination for training sessions and events. He enjoys being part of the team and contributing to the sport’s growth.Outside running, Stanford is a graphic designer and founder of Design Booth Graphics in Harare, where he applies creativity and practical problem‑solving to his work. He is also an Elder in the Adventist Church.",
  },
  {
    id: 7,
    role: "Events Coordinator",
    name: "Amanda Kujeke",
    initials: "AK",
    image: AmandaKujeke,
    shortBio: "Plans and executes all club events, from weekly runs to major competitions.",
    fullBio: "Amanda E. Kujeke is an entrepreneur and graphic designer specializing in visual branding and digital design. She combines creativity with strategy to create impactful, clean designs for growing brands. Beyond her work, she is passionate about exploring new places through running, embracing both creativity and adventure in her personal and professional journey.",
  },
  {
    id: 8,
    role: "Security",
    name: "Thomas Mabuzwe",
    initials: "TM",
    image: ThomasMabuzwe,
    shortBio: "Ensures safety and security protocols are followed during all club activities.",
    fullBio: "Thomas Mabuzwe is a passionate runner who believes in the power of discipline, endurance, and consistency, values that guide both his athletic and professional life. He is an ordained and serving Elder in the Seventh-day Adventist Church. He holds a Diploma in Accounting and Business with ACCA and is currently pursuing a Chartered Accountancy (CA) qualification. He is currently the Managing Director at Errand Runner Pvt Ltd a company in the Transport and Logistics sector.",
  },
  /*
  {
    id: 9,
    role: "Marketing / PR / Communication",
    name: "TBA",
    initials: "TBA",
    shortBio: "Position currently open. We're looking for someone passionate about spreading the AAAC message.",
    fullBio: "This important role involves managing AAAC's public image, social media presence, and communication with media outlets. The ideal candidate will help share our success stories, promote events, and grow our community presence. If you're interested in this position, please contact the Executive Committee.",
  },
  */
  {
    id: 10,
    role: "Chaplain",
    name: "Ps Obert Mudzengi",
    initials: "OM",
    image: ObertMudzengi,
    shortBio: "Provides spiritual guidance and pastoral care to club members.",
    fullBio: "Obert Mudzengi is a developing long-distance runner who has successfully completed one Comrades Ultramarathon. He is a committed student of the Bible and currently serves the North Zimbabwe Conference as the Stewardship and Church Development Director. Prior to this role, he served the church in various capacities, including as a pastor, administrator, and university lecturer. He is driven by a passion to help place the dreams of others within reach.",
  },
  {
    id: 11,
    role: "Co-opted Club Captain",
    name: "David Magwaza",
    initials: "DM",
    image: DavidMagwaza,
    shortBio: "Leads training sessions and motivates members during runs and competitions.",
    fullBio: "David Magwaza. A disciplined endurance athlete and respected club Captain. David is a competetive runner whose leadership blends athletic excellence with strategic mentoship, inspiring high standards, resilience and collective success within the club. Began his running journey as the tortoise of the club, and through relentless commitment, consistency and resilience rose to become one of the fastest runners in the club. Within a few months of training, he ran his first Comrades Ultramarathon in 2025 and finished. Leading through example, perseverance, unwavering pursuit of excellence, and his ability to attack uphill courses and any terrain with ease he gained the name Turbo!",
  },
];

const MemberCard = ({ member }: { member: CommitteeMember }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center flex-shrink-0 overflow-hidden">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-display font-bold text-xl text-primary-foreground">
                {member.initials}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
            <h3 className="font-display font-bold text-xl mb-2">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.shortBio}</p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <p className="text-muted-foreground leading-relaxed">{member.fullBio}</p>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const Committee = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Compact Hero */}
        <PageHero
          title="Executive Committee"
          subtitle="Meet the dedicated leaders who guide AAAC forward"
        />

        {/* Committee Grid */}
        <section className="py-16 section-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {committeeMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <MemberCard member={member} />
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

export default Committee;
