"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCartStore, useUIStore } from "@/lib/store";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const itemCount = useCartStore((s) => s.itemCount());
    const { openCart, openMobileMenu, isMobileMenuOpen, closeMobileMenu } =
        useUIStore();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-sm" : "bg-transparent"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Left: Hamburger (mobile) */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={openMobileMenu}
                                className="p-2 -ml-2 text-brand-text hover:text-brand-primary transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu size={22} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-sm tracking-wide text-brand-muted hover:text-brand-text transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/gallery"
                                className="text-sm tracking-wide text-brand-muted hover:text-brand-text transition-colors"
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/shop"
                                className="text-sm tracking-wide text-brand-muted hover:text-brand-text transition-colors"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/services"
                                className="text-sm tracking-wide text-brand-muted hover:text-brand-text transition-colors"
                            >
                                Services
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm tracking-wide text-brand-muted hover:text-brand-text transition-colors"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Center: Logo */}
                        <Link href="/" className="flex flex-col items-center">
                            <span className="font-heading text-xl md:text-2xl tracking-[0.15em] text-brand-text">
                                AMBIANCE
                            </span>
                            <span className="font-heading text-[10px] md:text-xs tracking-[0.3em] text-brand-muted -mt-1">
                                GARDEN
                            </span>
                        </Link>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <button
                                className="p-2 text-brand-muted hover:text-brand-text transition-colors hidden md:block"
                                aria-label="Search"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <button
                                className="p-2 text-brand-muted hover:text-brand-text transition-colors hidden md:block"
                                aria-label="Account"
                            >
                                <User size={20} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={openCart}
                                className="p-2 text-brand-muted hover:text-brand-text transition-colors relative"
                                aria-label="Cart"
                            >
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-white text-[10px] font-medium w-4.5 h-4.5 flex items-center justify-center rounded-full">
                                        {itemCount > 9 ? "9+" : itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        </>
    );
}
