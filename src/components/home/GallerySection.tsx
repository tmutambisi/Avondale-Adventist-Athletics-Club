import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

// Importing images
import comradesImg from "@/assets/gallery/comrades.jpeg";
import zbHeroImg from "@/assets/gallery/zbhero.jpeg";
import awardsImg from "@/assets/gallery/awards2.jpg";
import familyImg from "@/assets/gallery/family-mbiriri.jpg";
import random1Img from "@/assets/gallery/hero-1.jpg";
import runnersSabbathImg from "@/assets/gallery/runners-sabbath.jpg";

const galleryImages = [
    {
        src: comradesImg,
        category: "Marathons",
        caption: "Comrades Marathon",
    },
    {
        src: zbHeroImg,
        category: "Events",
        caption: "ZB Marathon",
    },
    {
        src: awardsImg,
        category: "Awards",
        caption: "Annual Awards Ceremony",
    },
    {
        src: familyImg,
        category: "Community",
        caption: "Family & Fellowship",
    },
    {
        src: random1Img,
        category: "Training",
        caption: "Morning Sessions",
    },
    {
        src: runnersSabbathImg,
        category: "Sabbath",
        caption: "Runners Sabbath",
    },
];

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-accent font-semibold tracking-wider uppercase text-sm">
                            Our Gallery
                        </span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl mt-2 text-primary">
                            Capturing the Spirit of Running
                        </h2>
                    </div>
                    <Link
                        to="/stories"
                        className="group flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                    >
                        View All Stories
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedImage(image.src)}
                        >
                            <img
                                src={image.src}
                                alt={image.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-accent text-sm font-medium mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {image.category}
                                </span>
                                <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.caption}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Gallery preview"
                        className="max-w-full max-h-[90vh] rounded-lg animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
};

export default GallerySection;
