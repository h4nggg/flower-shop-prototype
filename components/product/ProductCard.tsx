"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useCartStore, useUIStore } from "@/lib/store";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const { addToast } = useUIStore();

    // Cheapest variant for quick add-to-cart
    const cheapestVariant = product.variants.reduce((min, v) =>
        v.price < min.price ? v : min
    );

    const anyInStock = product.variants.some((v) => v.stock > 0);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, cheapestVariant);
        addToast({
            message: `Added to cart`,
            productName: product.name,
            image: product.images[0],
        });
    };

    return (
        <Link href={`/shop/${product.slug}`} className="group block">
            <div
                className="relative overflow-hidden rounded-lg bg-white"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image container with 3:4 aspect ratio */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-out ${isHovered ? "scale-110" : "scale-100"
                            }`}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Second image on hover */}
                    {product.images[1] && (
                        <Image
                            src={product.images[1]}
                            alt={`${product.name} alternate`}
                            fill
                            className={`object-cover transition-all duration-700 ease-out absolute inset-0 ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    )}

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium rounded-full ${tag === "Best Seller"
                                    ? "bg-brand-primary text-white"
                                    : "bg-brand-text text-white"
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Out of stock overlay */}
                    {!anyInStock && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                            <span className="text-sm tracking-wider uppercase text-brand-muted font-medium">
                                Sold Out
                            </span>
                        </div>
                    )}

                    {/* Add to Cart button - hover (desktop) */}
                    {anyInStock && (
                        <button
                            onClick={handleAddToCart}
                            className={`absolute bottom-3 left-3 right-3 py-2.5 bg-brand-text text-white text-xs tracking-wider uppercase rounded-full
                transition-all duration-300 hover:bg-brand-primary
                flex items-center justify-center gap-2
                md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
                opacity-100`}
                        >
                            <ShoppingBag size={14} strokeWidth={1.5} />
                            Add to Cart
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4">
                    <p className="text-[11px] tracking-wider uppercase text-brand-muted mb-1">
                        {product.variants.length} {product.variants.length === 1 ? "option" : "options"}
                    </p>
                    <h3 className="font-heading text-sm sm:text-base text-brand-text leading-snug mb-1.5 line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="text-[11px] text-brand-muted">From</span>
                        <span className="text-sm font-medium text-brand-text">
                            ${product.base_price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
