import { create } from "zustand";
import { Product, Variant } from "./mockData";

// ─── Cart Store ──────────────────────────────────────────────

export interface CartItem {
    product: Product;
    variant: Variant;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, variant: Variant, quantity?: number) => void;
    removeItem: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: () => number;
    subtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (product, variant, quantity = 1) => {
        set((state) => {
            const existing = state.items.find(
                (item) => item.variant.id === variant.id
            );
            if (existing) {
                return {
                    items: state.items.map((item) =>
                        item.variant.id === variant.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }
            return { items: [...state.items, { product, variant, quantity }] };
        });
    },

    removeItem: (variantId) => {
        set((state) => ({
            items: state.items.filter((item) => item.variant.id !== variantId),
        }));
    },

    updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
            get().removeItem(variantId);
            return;
        }
        set((state) => ({
            items: state.items.map((item) =>
                item.variant.id === variantId ? { ...item, quantity } : item
            ),
        }));
    },

    clearCart: () => set({ items: [] }),

    itemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    subtotal: () => {
        return get().items.reduce(
            (total, item) => total + item.variant.price * item.quantity,
            0
        );
    },
}));

// ─── UI Store ──────────────────────────────────────────────

interface ToastData {
    id: string;
    message: string;
    productName: string;
    image?: string;
}

interface UIStore {
    isCartOpen: boolean;
    isMobileMenuOpen: boolean;
    toasts: ToastData[];
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    openMobileMenu: () => void;
    closeMobileMenu: () => void;
    addToast: (toast: Omit<ToastData, "id">) => void;
    removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isCartOpen: false,
    isMobileMenuOpen: false,
    toasts: [],

    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    openMobileMenu: () => set({ isMobileMenuOpen: true }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    addToast: (toast) => {
        const id = Math.random().toString(36).slice(2);
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 3000);
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
}));
