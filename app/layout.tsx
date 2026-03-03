import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Panasonic Lumix S1H | Cinematic Setup",
    description: "A high-end, cinematic product reveal for the Panasonic Lumix S1H.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth bg-[#060606]">
            <body className={`${dmSans.variable} ${jetbrainsMono.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased text-white bg-[#060606]`}>
                <Providers>
                    <div className="film-grain" />
                    <Navbar />
                    <CartSidebar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
