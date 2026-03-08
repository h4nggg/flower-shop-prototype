"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    Minus,
    Plus,
    ShoppingBag,
    Heart,
    Share2,
    ChevronDown,
} from "lucide-react";
import { products, Variant } from "@/lib/mockData";
import { useCartStore, useUIStore } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { slug } = use(params);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<string | null>(
        "description"
    );
    const addItem = useCartStore((s) => s.addItem);
    const { addToast } = useUIStore();

    const product = products.find((p) => p.slug === slug);

    // Variant selection — default to first variant
    const [selectedVariantId, setSelectedVariantId] = useState<string>(
        product?.variants[0]?.id ?? ""
    );

    if (!product) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="font-heading text-2xl mb-4">Product Not Found</h1>
                <p className="text-brand-muted mb-6">
                    The product you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/shop"
                    className="px-6 py-3 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    const selectedVariant =
        product.variants.find((v) => v.id === selectedVariantId) ??
        product.variants[0];

    const handleSelectVariant = (variant: Variant) => {
        setSelectedVariantId(variant.id);
        setQuantity(1);
        // If variant has its own image, switch to it
        if (variant.image_url) {
            const idx = product.images.indexOf(variant.image_url);
            if (idx >= 0) setSelectedImage(idx);
        }
    };

    const handleAddToCart = () => {
        addItem(product, selectedVariant, quantity);
        addToast({
            message: `Added ${quantity > 1 ? `${quantity}x ` : ""}to cart`,
            productName: `${product.name} — ${selectedVariant.type}`,
            image: selectedVariant.image_url || product.images[0],
        });
    };

    const hasDiscount = selectedVariant.original_price !== null;
    const discountPercent = hasDiscount
        ? Math.round(
            ((selectedVariant.original_price! - selectedVariant.price) /
                selectedVariant.original_price!) *
            100
        )
        : 0;

    const relatedProducts = products
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    const accordionSections = [
        {
            id: "description",
            title: "Description",
            content: product.description,
        },
        {
            id: "dimensions",
            title: "Dimensions",
            content: product.details.dimensions,
        },
        {
            id: "care",
            title: "Care Instructions",
            content: product.details.care,
        },
    ];

    return (
        <div className="pt-20 md:pt-24">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Link href="/" className="hover:text-brand-text transition-colors">
                        Home
                    </Link>
                    <ChevronRight size={12} />
                    <Link
                        href="/shop"
                        className="hover:text-brand-text transition-colors"
                    >
                        Shop
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-brand-text">{product.name}</span>
                </nav>
            </div>

            {/* ═══ PRODUCT DETAIL ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* ═══ LEFT: Image Gallery ═══ */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded-full ${tag === "Best Seller"
                                            ? "bg-brand-primary text-white"
                                            : "bg-brand-text text-white"
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {hasDiscount && (
                                    <span className="px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded-full bg-brand-sale text-white">
                                        -{discountPercent}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i
                                            ? "border-brand-primary"
                                            : "border-transparent hover:border-brand-border"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ═══ RIGHT: Product Info ═══ */}
                    <div className="lg:py-4">
                        {/* Variant type tag */}
                        <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-3">
                            {selectedVariant.type}
                        </p>

                        {/* Title */}
                        <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-brand-text leading-tight mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl font-heading text-brand-text">
                                ${selectedVariant.price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-lg text-brand-muted line-through">
                                        ${selectedVariant.original_price!.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-brand-sale font-medium">
                                        Save $
                                        {(
                                            selectedVariant.original_price! - selectedVariant.price
                                        ).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* ═══ VARIANT SELECTOR ═══ */}
                        {product.variants.length > 1 && (
                            <div className="mb-6">
                                <label className="text-xs tracking-[0.2em] uppercase text-brand-muted block mb-3">
                                    Type
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => handleSelectVariant(variant)}
                                            className={`px-4 py-2.5 text-sm rounded-full border transition-all duration-200 ${selectedVariant.id === variant.id
                                                ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                                : "bg-brand-neutral text-brand-text border-brand-border hover:border-brand-primary/50"
                                                } ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={variant.stock === 0}
                                        >
                                            {variant.type.replace("Single ", "")} (${variant.price.toFixed(0)})
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock */}
                        <div className="flex items-center gap-2 mb-6">
                            <span
                                className={`w-2 h-2 rounded-full ${selectedVariant.stock > 0
                                    ? "bg-green-500"
                                    : "bg-brand-muted"
                                    }`}
                            />
                            <span className="text-sm text-brand-muted">
                                {selectedVariant.stock > 0
                                    ? `In Stock (${selectedVariant.stock})`
                                    : "Sold Out"}
                            </span>
                        </div>

                        {/* Quantity + Add to Cart */}
                        {selectedVariant.stock > 0 && (
                            <div className="space-y-4 mb-8">
                                {/* Quantity */}
                                <div>
                                    <label className="text-xs tracking-[0.2em] uppercase text-brand-muted block mb-2">
                                        Quantity
                                    </label>
                                    <div className="inline-flex items-center border border-brand-border rounded-full">
                                        <button
                                            onClick={() =>
                                                setQuantity(Math.max(1, quantity - 1))
                                            }
                                            className="p-3 text-brand-muted hover:text-brand-text transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-5 text-sm font-medium min-w-[3rem] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 text-brand-muted hover:text-brand-text transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 py-3.5 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={16} strokeWidth={1.5} />
                                        Add to Cart
                                    </button>
                                    <button className="p-3.5 border border-brand-border rounded-full text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-all">
                                        <Heart size={18} strokeWidth={1.5} />
                                    </button>
                                    <button className="p-3.5 border border-brand-border rounded-full text-brand-muted hover:text-brand-text hover:border-brand-text transition-all">
                                        <Share2 size={18} strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Accordion */}
                        <div className="border-t border-brand-border">
                            {accordionSections.map((section) => (
                                <div key={section.id} className="border-b border-brand-border">
                                    <button
                                        onClick={() =>
                                            setOpenAccordion(
                                                openAccordion === section.id ? null : section.id
                                            )
                                        }
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="text-sm font-medium tracking-wide text-brand-text">
                                            {section.title}
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className={`text-brand-muted transition-transform duration-200 ${openAccordion === section.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openAccordion === section.id
                                            ? "max-h-96 pb-4"
                                            : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-sm text-brand-muted leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ RELATED PRODUCTS ═══ */}
            {relatedProducts.length > 0 && (
                <section className="bg-white py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-2xl md:text-3xl text-brand-text text-center mb-10">
                            You Might Also Love
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ STICKY MOBILE ADD TO CART ═══ */}
            {selectedVariant.stock > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-4 lg:hidden z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="font-heading text-sm line-clamp-1">
                                {product.name}
                            </p>
                            <p className="text-lg font-heading text-brand-primary">
                                ${selectedVariant.price.toFixed(2)}
                            </p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-3 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all flex items-center gap-2"
                        >
                            <ShoppingBag size={16} strokeWidth={1.5} />
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
