"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Intersection Observer hook for scroll-triggered animations ─── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "-60px" }
        );

        const targets = el.querySelectorAll(".reveal-on-scroll");
        targets.forEach((t) => observer.observe(t));

        return () => observer.disconnect();
    }, []);

    return ref;
}

/* ─── Gallery Item ─── */
function GalleryItem({
    src,
    alt,
    className = "",
    isVideo = false,
}: {
    src: string;
    alt?: string;
    className?: string;
    isVideo?: boolean;
}) {
    return (
        <div
            className={`reveal-on-scroll relative overflow-hidden group ${className}`}
            style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
        >
            {isVideo ? (
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <Image
                    src={src}
                    alt={alt || "Gallery image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
    );
}

/* ─── Text Section ─── */
function TextSection({
    title,
    subtitle,
    align = "center",
}: {
    title: string;
    subtitle: string;
    align?: "center" | "left";
}) {
    return (
        <div
            className={`reveal-on-scroll py-24 px-8 flex flex-col justify-center ${align === "left"
                    ? "items-start text-left"
                    : "items-center text-center"
                }`}
            style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
        >
            <h3 className="font-heading text-4xl md:text-6xl text-brand-text mb-6 leading-tight">
                {title}
            </h3>
            <p className="font-body text-brand-muted max-w-md text-lg font-light leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}

/* ═══════════════ Gallery Page ═══════════════ */
export default function GalleryPage() {
    const containerRef = useScrollReveal();

    return (
        <section className="bg-brand-neutral pb-32" ref={containerRef}>
            {/* ── Header ── */}
            <div className="text-center pt-32 pb-16 px-4">
                <h1
                    className="reveal-on-scroll font-heading text-5xl md:text-7xl text-brand-text mb-4"
                    style={{
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                    }}
                >
                    Gallery
                </h1>
                <p
                    className="reveal-on-scroll font-body text-brand-muted text-lg max-w-lg mx-auto"
                    style={{
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "opacity 0.8s ease-out, transform 0.8s ease-out 0.15s",
                    }}
                >
                    Visual Poetry — A curated look into Ambiance Garden
                </p>
            </div>

            <div className="max-w-[1800px] mx-auto px-4 md:px-8 space-y-24">
                {/* ── SECTION 1: Hero Video + Intro ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <GalleryItem
                        src="/images/gallery/gallery-video.mp4"
                        isVideo
                        className="h-[500px] md:h-[700px] w-full"
                    />
                    <TextSection
                        align="left"
                        title="Cultivating Silence"
                        subtitle="In the quiet corners of our garden, we find a rhythm that resonates with the soul. Every petal tells a story of patience and grace."
                    />
                </div>

                {/* ── SECTION 2: Triptych Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[500px]">
                    <GalleryItem
                        src="/images/gallery/gallery-1.jpg"
                        alt="Gallery 1"
                        className="h-[400px] md:h-full"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-2.jpg"
                        alt="Gallery 2"
                        className="h-[400px] md:h-full mt-0 md:mt-12"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-3.jpg"
                        alt="Gallery 3"
                        className="h-[400px] md:h-full"
                    />
                </div>

                {/* ── SECTION 3: Text Break ── */}
                <div className="bg-white py-32 -mx-4 md:-mx-8 px-4 flex justify-center items-center">
                    <TextSection
                        title="Ephemeral Elegance"
                        subtitle="Capturing the fleeting beauty of the seasons to ground your space in eternal calm. A dialogue between silence and bloom."
                    />
                </div>

                {/* ── SECTION 4: Wide Video + Landscape ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GalleryItem
                        src="/images/gallery/gallery-video-2.mp4"
                        isVideo
                        className="md:col-span-2 h-[400px] md:h-[600px]"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-4.jpg"
                        alt="Gallery 4"
                        className="md:col-span-1 h-[400px] md:h-[600px]"
                    />
                </div>

                {/* ── SECTION 5: Mixed Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    <GalleryItem
                        src="/images/gallery/gallery-5.jpg"
                        alt="Gallery 5"
                        className="md:col-span-1 md:row-span-2"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-6.jpg"
                        alt="Gallery 6"
                        className="md:col-span-2 md:row-span-2"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-7.jpg"
                        alt="Gallery 7"
                        className="md:col-span-1 md:row-span-1"
                    />
                    <GalleryItem
                        src="/images/gallery/gallery-8.jpg"
                        alt="Gallery 8"
                        className="md:col-span-1 md:row-span-1"
                    />
                </div>
            </div>

            {/* ── Global style for reveal animation ── */}
            <style jsx global>{`
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
        </section>
    );
}
