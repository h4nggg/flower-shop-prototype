"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, useUIStore } from "@/lib/store";

export function CartDrawer() {
    const { isCartOpen, closeCart } = useUIStore();
    const { items, removeItem, updateQuantity, subtotal, itemCount } =
        useCartStore();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[70]">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-brand-text/30 backdrop-blur-sm"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-brand-neutral shadow-xl slide-in-right flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
                    <div className="flex items-center gap-2">
                        <h2 className="font-heading text-lg tracking-wide">Your Cart</h2>
                        {itemCount() > 0 && (
                            <span className="text-xs text-brand-muted">
                                ({itemCount()} {itemCount() === 1 ? "item" : "items"})
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 -mr-2 text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content */}
                {items.length === 0 ? (
                    /* Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center px-6">
                        <div className="w-24 h-24 rounded-full bg-brand-secondary/50 flex items-center justify-center mb-6">
                            <ShoppingBag
                                size={36}
                                strokeWidth={1}
                                className="text-brand-primary"
                            />
                        </div>
                        <h3 className="font-heading text-lg mb-2">Your cart is empty</h3>
                        <p className="text-sm text-brand-muted text-center mb-6">
                            Discover our curated collection of premium artificial flowers.
                        </p>
                        <Link
                            href="/shop"
                            onClick={closeCart}
                            className="px-8 py-3 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all hover:-translate-y-0.5"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.variant.id}
                                    className="flex gap-4 py-4 border-b border-brand-border last:border-0"
                                >
                                    {/* Image */}
                                    <Link
                                        href={`/shop/${item.product.slug}`}
                                        onClick={closeCart}
                                        className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0 bg-white"
                                    >
                                        <Image
                                            src={item.variant.image_url || item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/shop/${item.product.slug}`}
                                            onClick={closeCart}
                                            className="font-heading text-sm leading-tight hover:text-brand-primary transition-colors line-clamp-1"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <p className="text-xs text-brand-muted mt-0.5">
                                            {item.variant.type}
                                        </p>
                                        <p className="text-sm font-medium mt-1.5">
                                            ${item.variant.price.toFixed(2)}
                                        </p>

                                        {/* Quantity & Remove */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-brand-border rounded-full">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.variant.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-1.5 text-brand-muted hover:text-brand-text transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-3 text-xs font-medium min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.variant.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-1.5 text-brand-muted hover:text-brand-text transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.variant.id)}
                                                className="p-1.5 text-brand-muted hover:text-brand-sale transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-brand-border px-6 py-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-brand-muted">Subtotal</span>
                                <span className="text-lg font-heading">
                                    ${subtotal().toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs text-brand-muted">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <button className="w-full py-3.5 bg-brand-primary text-white text-sm tracking-wider uppercase rounded-full hover:bg-brand-primary-dark transition-all hover:-translate-y-0.5">
                                Checkout
                            </button>
                            <button
                                onClick={closeCart}
                                className="w-full py-2 text-sm text-brand-muted hover:text-brand-text transition-colors text-center"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
