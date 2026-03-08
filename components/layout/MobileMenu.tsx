"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] md:hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-brand-text/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Menu panel */}
            <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-brand-neutral slide-in-left">
                <div className="flex items-center justify-between p-4 border-b border-brand-border">
                    <span className="font-heading text-lg tracking-[0.15em]">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                <nav className="p-6 space-y-6">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/gallery", label: "Gallery" },
                        { href: "/shop", label: "Shop" },
                        { href: "/services", label: "Services" },
                        { href: "/contact", label: "Contact" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="block text-lg font-light text-brand-text hover:text-brand-primary transition-colors tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brand-border">
                    <p className="text-xs text-brand-muted tracking-wider">
                        © 2026 Ambiance Garden
                    </p>
                </div>
            </div>
        </div>
    );
}
