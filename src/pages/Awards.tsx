import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Crown, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Leadership/Committee Images
import ElderKondo from "@/assets/leadership/ElderKondo.jpg";
import DavidMagwaza from "@/assets/leadership/DavidMagwaza.jpeg";
import VimbaiMakamure from "@/assets/leadership/Vimbai.jpeg";
import AmandaEKujeke from "@/assets/leadership/AmandaEKujeke.jpeg";

// Awards Specific Images
import NyaryMoyoImg from "@/assets/Awards/NyaryMoyo.jpg";
import MudzengiImg from "@/assets/Awards/Mudzengi.jpg";
import TheWilliamsImg from "@/assets/Awards/TheWilliams.jpg";
import VictorImg from "@/assets/Awards/Victor.jpg";
import WaterPointImg from "@/assets/Awards/WaterPoint.jpg";
import TineyiJuruImg from "@/assets/Awards/TineyiJuru.jpg";
import DavidMboweniImg from "@/assets/Awards/DavidMboweni.jpg";
import PsMangwendeImg from "@/assets/Awards/Ps Mangwende.jpg";
import TonderaiShonhiwaImg from "@/assets/Awards/TonderaiShonhiwa.jpg";
import NgorimaImg from "@/assets/Awards/Ngorima.jpg";
import AdminImg from "@/assets/Awards/Admin.jpg";
import LisaImg from "@/assets/Awards/Lisa.jpg";
import TinotendaZinjivaImg from "@/assets/Awards/TinotendaZinjiva.jpg";
import AnesuBMkungumaImg from "@/assets/Awards/AnesuBMkunguna.jpg";
import ShyleenMudangaImg from "@/assets/Awards/Shyleen.jpg";
import SesedzaiChigumiraImg from "@/assets/Awards/SesedzaiChigumira.jpg";
import PatrickNdowaImg from "@/assets/Awards/PatrickNdowa.jpeg";
import EmmanuelMandeyaImg from "@/assets/Awards/EmmanuelMandeya.jpg";
import PoliteNsimbaImg from "@/assets/Awards/PoliteNsimba.jpg";
import VivianImg from "@/assets/Awards/Vivian.jpg";
import AmandaKujekeImg from "@/assets/Awards/AmandaKujeke.jpg";
import MicheleNyandoro from "@/assets/Awards/MichelleNyandoro.jpg";
import PatienceImg from "@/assets/Awards/Patience.jpeg";


interface Winner {
    name: string;
    image?: string;
}

interface AwardItem {
    title: string;
    description: string;
    winners: Winner[];
    category?: string;
}

const mainAwards: AwardItem[] = [
    {
        title: "Most Consistent Member",
        description: "Celebrating dedication and regular participation in club activities.",
        winners: [{ name: "David Mboweni", image: DavidMboweniImg }],
        category: "Consistency"
    },
    {
        title: "Club Spirit Award",
        description: "Honoring the individual who best embodies the values and joy of our club.",
        winners: [{ name: "Ps Mangwende", image: PsMangwendeImg }],
        category: "Inspiration"
    },
    {
        title: "Most Supportive Member",
        description: "Recognising the person who goes above and beyond to help fellow runners.",
        winners: [{ name: "Nyary Moyo", image: NyaryMoyoImg }],
        category: "Service"
    },
    {
        title: "Runner of the Year",
        description: "The top performer who has shown exceptional skill and discipline.",
        winners: [{ name: "Tonderai Shonhiwa", image: TonderaiShonhiwaImg }],
        category: "Performance"
    },
    {
        title: "Most Improved Runner",
        description: "Celebrating significant progress and growth throughout the season.",
        winners: [{ name: "David Magwaza", image: DavidMagwaza }],
        category: "Growth"
    },
    {
        title: "Fastest Time Award",
        description: "Rewarding the most impressive speed and course records.",
        winners: [{ name: "Edson Nyadembera" }],
        category: "Speed"
    },
    {
        title: "Volunteer of the Year",
        description: "Gratitude for the selfless service behind the scenes.",
        winners: [
            { name: "Vivian Kujeke", image: VivianImg },
            { name: "Amanda Kujeke", image: AmandaKujekeImg }
        ],
        category: "Volunteerism"
    },
    {
        title: "Hydration & Cheer Award",
        description: "The energy and support that keeps us all moving forward. Thank you to the incredible Water Point team!",
        winners: [
            { name: "Water Point Team", image: WaterPointImg },
            { name: "Vimbai D. Makamure", image: VimbaiMakamure },
            { name: "Amanda E. Kujeke", image: AmandaEKujeke },
            { name: "Shyleen Mudanga", image: ShyleenMudangaImg },
            { name: "Methembe A. Ndhlovu" },
            { name: "Anesu B. Mkunguma", image: AnesuBMkungumaImg },
            { name: "Albert T. Gadimwa" },
            { name: "Anthony Gadimwa" },
            { name: "Ezra T. Kamphanda" },
            { name: "Sesedzai Chigumira", image: SesedzaiChigumiraImg },
            { name: "Michelle N. Nyandoro", image: MicheleNyandoro },
            { name: "Tinotenda N. Zinjiva", image: TinotendaZinjivaImg }
        ],
        category: "Community"
    },
    {
        title: "People's Choice Award",
        description: "Voted by the community for their favoritism and impact on others.",
        winners: [
            { name: "Lisa Williams", image: LisaImg },
            { name: "Robert Ngorima", image: NgorimaImg }
        ],
        category: "Popularity"
    },
    {
        title: "Most Inspirational Couple",
        description: "Inspiring us through their shared journey and partnership.",
        winners: [{ name: "The Williams", image: TheWilliamsImg }],
        category: "Inspiration"
    },
    {
        title: "Perseverance Award",
        description: "Honoring the grit and determination shown in the face of challenges.",
        winners: [
            { name: "Tineyi Juru", image: TineyiJuruImg },
            { name: "Victor Gurwe", image: VictorImg }
        ],
        category: "Grit"
    },
    {
        title: "Administrator of the Year",
        description: "Recognizing exceptional organizational leadership and support.",
        winners: [{ name: "Itai Chimwala", image: AdminImg }],
        category: "Leadership"
    },
    {
        title: "Most Loyal Member",
        description: "Honoring steadfast dedication and long-term commitment to the club.",
        winners: [{ name: "Patience Millanzi", image: PatienceImg }],
        category: "Loyalty"
    },
    {
        title: "Leadership Award",
        description: "Celebrating visionary leadership that guides our community forward.",
        winners: [{ name: "Anesu Kondo", image: ElderKondo }],
        category: "Leadership"
    }
];

const comradesPioneers = [
    { name: "Elder Kondo", image: ElderKondo },
    { name: "Ps Mudzengi", image: MudzengiImg },
    { name: "Ps Ngorima", image: NgorimaImg },
    { name: "Ps Mangwende", image: PsMangwendeImg },
    { name: "David Magwaza", image: DavidMagwaza },
    { name: "Patrick Ndowa", image: PatrickNdowaImg },
    { name: "Emmanuel Mandeya", image: EmmanuelMandeyaImg },
];

const AwardCard = ({ award }: { award: AwardItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Required distance for a swipe to be registered
    const minSwipeDistance = 50;

    const nextWinner = () => {
        setCurrentIndex((prev) => (prev + 1) % award.winners.length);
    };

    const prevWinner = () => {
        setCurrentIndex((prev) => (prev - 1 + award.winners.length) % award.winners.length);
    };

    const currentWinner = award.winners[currentIndex];

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextWinner();
        } else if (isRightSwipe) {
            prevWinner();
        }
    };

    return (
        <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Image Container with Slider for multiple winners */}
            <div
                className="relative h-80 overflow-hidden bg-slate-900 touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {currentWinner.image ? (
                    <div className="w-full h-full relative overflow-hidden">
                        <img
                            src={currentWinner.image}
                            alt={currentWinner.name}
                            key={currentIndex}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 animate-fade-in"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-12 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-[100px] animate-pulse" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 mb-3">Honoree</span>
                            <div className="font-display font-black text-4xl text-white tracking-tighter max-w-[200px] leading-[0.9]">
                                {currentWinner.name}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Arrows for Multiple Winners */}
                {award.winners.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); prevWinner(); }}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-primary transition-colors shadow-lg active:scale-95"
                            aria-label="Previous recipient"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextWinner(); }}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-primary transition-colors shadow-lg active:scale-95"
                            aria-label="Next recipient"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* Counter for Multiple Winners */}
                {award.winners.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {award.winners.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all rounded-full ${i === currentIndex ? 'w-4 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'w-1 bg-white/30'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/20 flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-800">
                            {award.category}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-10 flex flex-col flex-1 relative bg-white">
                <h3 className="font-display font-bold text-2xl mb-3 text-slate-900 group-hover:text-primary transition-colors leading-tight">
                    {award.title}
                </h3>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed flex-1 font-medium italic">
                    "{award.description}"
                </p>

                <div className="mt-auto pt-8 border-t border-slate-100">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-black block mb-4">
                        {award.winners.length > 1 ? "Award Recipient" : "Honoree"}
                    </span>
                    <div className="flex items-center gap-4 group/name">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/30 rounded-full" />
                        <span className="font-display font-black text-3xl text-slate-900 tracking-tighter">
                            {currentWinner.name}
                        </span>
                    </div>
                    {award.winners.length > 1 && (
                        <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                            Recipient {currentIndex + 1} of {award.winners.length}
                        </p>
                    )}
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-tl-full -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        </div>
    );
};

const Awards = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">
                <PageHero
                    title="Awards & Recognition"
                    subtitle="Celebrating excellence, consistency, and the spirit of the Avondale Athletics community"
                />

                {/* Main Awards Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Recognition</span>
                            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
                                Annual <span className="text-gradient">Club Awards</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Celebrating the runners, volunteers, and leaders who make our community exceptional.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mainAwards.map((award, index) => (
                                <AwardCard key={index} award={award} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Special Recognition Section - Comrades Marathon Honors */}
                <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
                    {/* Rich Dark Background Accents */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-150" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-8">
                                <span>The Hall of Excellence</span>
                            </div>
                            <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 tracking-tight text-white">
                                Comrades Marathon <span className="text-amber-500 italic block md:inline font-serif">Honors</span>
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                                A tribute to those who conquered the ultimate human race and the pioneers who led the way for our community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                            {/* Comrades Queen Highlight */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse"></div>
                                <div className="relative bg-[#0d2138] border border-white/10 p-10 md:p-14 rounded-[2.8rem] overflow-hidden shadow-2xl">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative w-48 h-48 mb-10 group-hover:scale-105 transition-transform duration-500">
                                            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping opacity-25" />
                                            <div className="relative w-full h-full rounded-full border-4 border-amber-500/50 p-2 overflow-hidden shadow-2xl shadow-amber-500/20">
                                                <img
                                                    src={PoliteNsimbaImg}
                                                    alt="Polite Nsimba"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-900 p-3 rounded-full shadow-lg">
                                                <Crown className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <h3 className="font-display font-bold text-3xl md:text-4xl mb-6 tracking-tight text-white">Comrades Queen Award</h3>
                                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-10" />

                                        <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md font-light">
                                            Recognising exceptional endurance, speed, and grace as our most distinguished female performer in South Africa's legendary ultramarathon.
                                        </p>

                                        <div className="relative w-full">
                                            <span className="text-[11px] uppercase tracking-[0.4em] text-amber-500/80 font-bold block mb-4">Reigning Champion</span>
                                            <div className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter drop-shadow-lg">
                                                Polite Nsimba
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comrades Pioneers List */}
                            <div className="lg:pl-8">
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-12 h-[1px] bg-amber-500/50" />
                                    <h3 className="font-display font-bold text-2xl uppercase tracking-[0.2em] text-white/90 underline-offset-8">Club Pioneers</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {comradesPioneers.map((pioneer, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20"
                                        >
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-500/50 transition-colors shadow-lg">
                                                {pioneer.image ? (
                                                    <img src={pioneer.image} alt={pioneer.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500">
                                                        {pioneer.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between mb-1">
                                                    <span className="font-display font-bold text-xl text-slate-100 group-hover:text-amber-500 transition-colors">{pioneer.name}</span>
                                                    <span className="text-[10px] text-slate-500 group-hover:text-amber-500/70 font-mono">#{index + 1}</span>
                                                </div>
                                                <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 to-transparent transition-all duration-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/5 italic text-slate-400 font-light text-center relative overflow-hidden">
                                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/5 -rotate-12" />
                                    "To the pioneers who lead with discipline and finished with pride, inspiring every member of Avondale Athletics to reach for their own Comrades victory."
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Motivational Quote */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto py-20 px-10 rounded-[4rem] bg-slate-50 border border-slate-100 relative shadow-inner">
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-8 leading-tight italic">
                                "The difference between who you are and who you want to be is what you do."
                            </h2>

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-1 bg-primary rounded-full" />
                                <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm">
                                    Avondale Athletics Community
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

export default Awards;
