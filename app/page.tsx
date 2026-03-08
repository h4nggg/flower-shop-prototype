"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Star, Truck } from "lucide-react";
import { products } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const bestSellers = products.filter((p) => p.tags.includes("Best Seller"));
  const newArrivals = products.filter((p) => p.tags.includes("New Arrival"));

  const scrollCarousel = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[70vh] min-h-[400px] max-h-[800px]">
        <Image
          src="https://images.unsplash.com/photo-1558350315-8aa00e8e4590?q=80&w=2664&auto=format&fit=crop"
          alt="Beautiful flower arrangement"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </section>

      {/* ═══ FEATURED COLLECTION ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-3">
              Collections
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-brand-text">
              Featured Flowers
            </h2>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-brand-text text-brand-text text-sm tracking-wider uppercase rounded-full hover:bg-brand-text hover:text-brand-neutral transition-all hover:-translate-y-0.5"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BEST SELLERS CAROUSEL ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-3">
                Most Loved
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-text">
                Best Sellers
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2.5 border border-brand-border rounded-full hover:border-brand-text transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2.5 border border-brand-border rounded-full hover:border-brand-text transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ BRAND STORY ═══ */}
      <section id="story" className="py-20 md:py-28 bg-brand-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=800&q=80"
                alt="Our story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-text mb-6 leading-tight">
                Handpicked Quality,
                <br />
                Inspired by Seoul
              </h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  At Ambiance Garden, we believe every space deserves the beauty
                  of nature — without the maintenance. Our flowers are sourced
                  from Korea&apos;s finest artisans who specialize in creating
                  botanically accurate, breathtakingly beautiful artificial
                  blooms.
                </p>
                <p>
                  Each stem is individually handcrafted, with petals that mirror
                  the soft gradient of real flowers and leaves that feel
                  remarkably lifelike. From the bustling flower markets of Seoul
                  to the serene gardens of Busan, our collection captures
                  Korea&apos;s rich floral heritage.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-brand-border">
                {[
                  {
                    icon: Star,
                    label: "Premium Quality",
                  },
                  {
                    icon: Leaf,
                    label: "Eco-Friendly",
                  },
                  {
                    icon: Truck,
                    label: "Free Shipping",
                  },
                ].map((feature) => (
                  <div key={feature.label} className="text-center">
                    <feature.icon
                      size={24}
                      strokeWidth={1.5}
                      className="mx-auto mb-2 text-brand-primary"
                    />
                    <p className="text-xs text-brand-muted tracking-wide">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-3">
              Just Arrived
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-brand-text">
              New Arrivals
            </h2>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-brand-text text-brand-text text-sm tracking-wider uppercase rounded-full hover:bg-brand-text hover:text-brand-neutral transition-all hover:-translate-y-0.5"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
