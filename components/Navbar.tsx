"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const { cartCount, setCartOpen } = useContext(CartContext);
    const [activeSection, setActiveSection] = useState("overview");

    // fade in after 60px scroll (Only applicable perfectly on root layout where hero exists)
    // For other pages, we can just keep it opaque
    const opacityHero = useTransform(scrollY, [0, 60], [0, 1]);
    const opacity = pathname === "/" ? opacityHero : 1;

    useEffect(() => {
        if (pathname !== "/") return;

        const sections = [
            { id: "hero", name: "overview" },
            { id: "features-carousel-section", name: "technology" },
            { id: "iq-video-section", name: "image quality" }
        ];

        const handleScroll = () => {
            let found = false;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If the section is on screen or past it
                    if (rect.top <= window.innerHeight / 3) {
                        setActiveSection(sections[i].name);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) setActiveSection("overview");
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const NAV_ITEMS = [
        { label: "Overview", href: "/#hero", scrollId: "overview" },
        { label: "Technology", href: "/#features-carousel-section", scrollId: "technology" },
        { label: "Image Quality", href: "/#iq-video-section", scrollId: "image quality" },
        { label: "Specs", href: "/specs", scrollId: "specs" },
        { label: "Buy", href: "/order", scrollId: "buy" }
    ];

    return (
        <motion.nav
            style={{ opacity }}
            className={`fixed top-0 left-0 w-full z-40 h-11 flex items-center justify-between px-8 bg-[rgba(6,6,6,0.78)] backdrop-blur-md border-b border-white/5 ${pathname !== '/' ? 'opacity-100' : ''}`}
        >
            <div className="text-white text-[13px] font-medium tracking-[0.15em] uppercase">
                <Link href="/">LUMIX S1H</Link>
            </div>

            <div className="hidden md:flex items-center gap-10 text-[13px] text-white/55">
                {NAV_ITEMS.map((item) => {
                    // Check if active based on path or scroll spy
                    let isActive = false;
                    if (pathname === '/' && activeSection === item.scrollId) isActive = true;
                    if (pathname === '/specs' && item.scrollId === 'specs') isActive = true;
                    if (pathname === '/order' && item.scrollId === 'buy') isActive = true;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`transition-colors relative group ${isActive ? 'text-white' : 'hover:text-white'}`}
                        >
                            {item.label}
                            <span className={`absolute left-0 -bottom-1 w-full h-[1px] bg-[#004FD4] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </Link>
                    )
                })}
            </div>

            <div className="flex items-center gap-4">
                <div style={{ padding: '1px' }} className="rounded-full bg-gradient-to-r from-[#004FD4] to-[#0077FF] group cursor-pointer hover:shadow-[0_0_15px_rgba(0,119,255,0.4)] transition-shadow">
                    <Link href="/order" className="text-[13px] font-medium px-5 py-1 rounded-full bg-[#060606] group-hover:bg-gradient-to-r group-hover:from-[#004FD4] group-hover:to-[#0077FF] transition-colors h-full w-full flex items-center justify-center">
                        <span className="relative z-10 text-white leading-none">Explore the Camera</span>
                    </Link>
                </div>

                {/* Bag icon — right side of navbar */}
                <button
                    onClick={() => setCartOpen(true)}
                    style={{
                        background: 'none', border: 'none',
                        cursor: 'pointer', padding: '8px',
                        display: 'flex', alignItems: 'center',
                        color: 'rgba(255,255,255,0.85)',
                        position: 'relative'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {/* Cart count badge — shown only when items > 0 */}
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '2px', right: '0px',
                            background: '#004FD4', color: '#fff',
                            fontSize: '10px', fontWeight: '700',
                            width: '16px', height: '16px',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{cartCount}</span>
                    )}
                </button>
            </div>
        </motion.nav>
    );
}
