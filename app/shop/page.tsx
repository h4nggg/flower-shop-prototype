"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

type SortOption = "newest" | "price-asc" | "price-desc";

const PRICE_RANGES = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $100", min: 25, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200+", min: 200, max: Infinity },
];

export default function ShopPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Price filter (based on base_price)
        const range = PRICE_RANGES[selectedPriceRange];
        filtered = filtered.filter(
            (p) => p.base_price >= range.min && p.base_price < range.max
        );

        // Sort
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.base_price - b.base_price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.base_price - a.base_price);
                break;
            case "newest":
                filtered.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
                break;
        }

        return filtered;
    }, [selectedPriceRange, sortBy]);

    const clearFilters = useCallback(() => {
        setSelectedPriceRange(0);
        setSortBy("newest");
    }, []);

    const hasActiveFilters = selectedPriceRange !== 0;

    return (
        <div className="pt-20 md:pt-24">
            {/* Header */}
            <div className="bg-white border-b border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                    <p className="text-xs tracking-[0.3em] uppercase text-brand-primary mb-3">
                        Browse
                    </p>
                    <h1 className="font-heading text-3xl md:text-4xl text-brand-text">
                        All Products
                    </h1>
                    <p className="text-sm text-brand-muted mt-2">
                        {filteredProducts.length}{" "}
                        {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* ═══ SIDEBAR FILTERS (Desktop) ═══ */}
                    <aside className="hidden lg:block w-60 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            {/* Price Range */}
                            <div>
                                <h3 className="text-xs tracking-[0.2em] uppercase text-brand-muted mb-4">
                                    Price Range
                                </h3>
                                <div className="space-y-2">
                                    {PRICE_RANGES.map((range, i) => (
                                        <button
                                            key={range.label}
                                            onClick={() => setSelectedPriceRange(i)}
                                            className={`block w-full text-left text-sm py-1.5 transition-colors ${selectedPriceRange === i
                                                ? "text-brand-primary font-medium"
                                                : "text-brand-muted hover:text-brand-text"
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear All */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-xs text-brand-primary hover:underline tracking-wide"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* ═══ MAIN CONTENT ═══ */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border">
                            {/* Mobile filter button */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-sm text-brand-text"
                            >
                                <SlidersHorizontal size={16} strokeWidth={1.5} />
                                Filters
                                {hasActiveFilters && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                )}
                            </button>

                            <div className="hidden lg:block" />

                            {/* Sort dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors"
                                >
                                    Sort by
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {isSortOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsSortOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-lg border border-brand-border py-1 z-20">
                                            {[
                                                { label: "Newest", value: "newest" as SortOption },
                                                {
                                                    label: "Price: Low → High",
                                                    value: "price-asc" as SortOption,
                                                },
                                                {
                                                    label: "Price: High → Low",
                                                    value: "price-desc" as SortOption,
                                                },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${sortBy === option.value
                                                        ? "text-brand-primary bg-brand-secondary/30"
                                                        : "text-brand-text hover:bg-brand-neutral"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Active filters */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedPriceRange !== 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-secondary/40 text-brand-text text-xs rounded-full">
                                        {PRICE_RANGES[selectedPriceRange].label}
                                        <button
                                            onClick={() => setSelectedPriceRange(0)}
                                            className="hover:text-brand-primary"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        {isLoading ? (
                            <ProductGridSkeleton count={6} />
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="font-heading text-xl text-brand-text mb-2">
                                    No products found
                                </p>
                                <p className="text-sm text-brand-muted mb-6">
                                    Try adjusting your filters to find what you&apos;re looking
                                    for.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2.5 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ MOBILE FILTER DRAWER ═══ */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div
                        className="absolute inset-0 bg-brand-text/30 backdrop-blur-sm"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-neutral rounded-t-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
                            <h3 className="font-heading text-lg">Filters</h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 -mr-2 text-brand-muted"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-6 py-6 space-y-8">
                            {/* Price */}
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-brand-muted mb-4">
                                    Price Range
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {PRICE_RANGES.map((range, i) => (
                                        <button
                                            key={range.label}
                                            onClick={() => setSelectedPriceRange(i)}
                                            className={`px-4 py-2 text-sm rounded-full border transition-all ${selectedPriceRange === i
                                                ? "border-brand-primary bg-brand-primary text-white"
                                                : "border-brand-border text-brand-text hover:border-brand-text"
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-brand-border flex gap-3">
                            <button
                                onClick={clearFilters}
                                className="flex-1 py-3 text-sm text-brand-text border border-brand-border rounded-full hover:bg-white transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="flex-1 py-3 text-sm text-white bg-brand-primary rounded-full hover:bg-brand-primary-dark transition-colors"
                            >
                                Show {filteredProducts.length} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
