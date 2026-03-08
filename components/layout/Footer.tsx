"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand-text text-brand-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="font-heading text-xl tracking-[0.15em] text-brand-neutral">
                                AMBIANCE
                            </span>
                            <br />
                            <span className="font-heading text-[10px] tracking-[0.3em] text-brand-muted">
                                GARDEN
                            </span>
                        </Link>
                        <p className="text-sm text-brand-muted leading-relaxed mt-2">
                            Curated premium artificial flowers, handpicked from Korea for
                            your sanctuary.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-brand-muted">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { href: "/shop", label: "All Products" },
                                { href: "/shop?category=single-stem", label: "Single Stems" },
                                {
                                    href: "/shop?category=vase-arrangement",
                                    label: "Arrangements",
                                },
                                { href: "/shop?category=wholesale-box", label: "Wholesale" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-brand-muted hover:text-brand-neutral transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-brand-muted">
                            About
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { href: "#", label: "Our Story" },
                                { href: "#", label: "Sustainability" },
                                { href: "#", label: "Press" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-brand-muted hover:text-brand-neutral transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-brand-muted">
                            Stay In Bloom
                        </h4>
                        <p className="text-sm text-brand-muted mb-4 leading-relaxed">
                            Subscribe for exclusive offers and new arrivals.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-center"
                        >
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-transparent border-b border-brand-muted text-sm text-brand-neutral placeholder:text-brand-muted focus:outline-none focus:border-brand-secondary py-2 transition-colors"
                            />
                            <button
                                type="submit"
                                className="p-2 ml-2 text-brand-muted hover:text-brand-secondary transition-colors"
                                aria-label="Subscribe"
                            >
                                <Send size={16} strokeWidth={1.5} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 pt-6 border-t border-brand-muted/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-brand-muted">
                        © 2026 Ambiance Garden. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Privacy", "Terms", "Shipping"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-brand-muted hover:text-brand-neutral transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
