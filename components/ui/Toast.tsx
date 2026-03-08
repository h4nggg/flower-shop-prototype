"use client";

import { createContext, useContext, ReactNode } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { useUIStore } from "@/lib/store";

const ToastContext = createContext({});

export function ToastProvider({ children }: { children: ReactNode }) {
    const { toasts, removeToast } = useUIStore();

    return (
        <ToastContext.Provider value={{}}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-20 right-4 z-[80] space-y-3 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-white rounded-xl shadow-lg border border-brand-border p-4 flex items-center gap-3 fade-in pointer-events-auto"
                    >
                        {/* Product image */}
                        {toast.image && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={toast.image}
                                    alt={toast.productName}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <Check
                                    size={14}
                                    className="text-green-600 flex-shrink-0"
                                    strokeWidth={2.5}
                                />
                                <span className="text-xs text-brand-muted">
                                    {toast.message}
                                </span>
                            </div>
                            <p className="text-sm font-heading text-brand-text truncate">
                                {toast.productName}
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 text-brand-muted hover:text-brand-text transition-colors flex-shrink-0"
                            aria-label="Dismiss"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
