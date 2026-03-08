import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ambiance Garden — Premium Korean Artificial Flowers",
  description:
    "Curated premium artificial flowers for your sanctuary. Eternal bloom, Korean elegance. Handpicked quality stems, vase arrangements, and wholesale options.",
  keywords: [
    "artificial flowers",
    "Korean flowers",
    "premium",
    "vase arrangement",
    "home decor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-brand-neutral text-brand-text`}
      >
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
