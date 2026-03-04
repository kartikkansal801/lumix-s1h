"use client";

import { useEffect } from "react";

export default function FeaturesIntro() {
    useEffect(() => {
        const featH = document.getElementById('features-headline');
        if (featH) {
            new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    featH.style.opacity = '1';
                    featH.style.transform = 'translateY(0)';
                }
            }, { threshold: 0.3 }).observe(featH);
        }
    }, []);

    return (
        <>
            {/* BLOCK 1 — APPLE-STYLE CENTERED TEXT PARAGRAPH */}
            <section id="product-statement" className="w-full px-6 py-12 md:px-8 md:pt-[72px] md:pb-12 bg-[#060606] flex flex-col items-center text-center mt-10">
                {/* Buy button */}
                <a href="/order" style={{
                    display: 'inline-block',
                    background: '#0071E3',
                    color: '#ffffff',
                    fontFamily: 'var(--font-text)',
                    fontSize: '15px',
                    fontWeight: 500,
                    padding: '10px 24px',
                    borderRadius: '980px',
                    textDecoration: 'none',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                    transition: 'background 0.2s ease'
                }}>Buy</a>

                {/* Price line */}
                <p style={{
                    fontFamily: 'var(--font-text)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '-0.01em',
                    margin: '0 0 20px 0'
                }}>From ₹2,49,990* or ₹41,665/mo. for 6 mo.‡</p>

                {/* Apple-style centered paragraph */}
                <p className="reveal-up" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                    maxWidth: '740px',
                    margin: 0,
                    letterSpacing: '-0.01em'
                }}>
                    The Lumix S1H is the world&apos;s most capable cinema mirrorless — for a lot of reasons.
                    It shoots <strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>6K Cinema 4:2:2 10-bit</strong>
                    {' '}with no recording limit. The
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>full-frame BSI CMOS sensor</strong>
                    {' '}unlocks a whole new level of image quality for cinema and stills.
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>5-Axis Dual I.S. 2</strong>
                    {' '}is built in to help you shoot handheld effortlessly.¹ And it comes in a body sealed
                    against dust, splash, and freeze conditions to –10°C. With the Lumix S1H, you&apos;ll be
                    ready to capture just about anything, anywhere.
                </p>
            </section>

            {/* BLOCK 2 — FEATURES HEADLINE */}
            <section id="features-header" className="w-full py-8 bg-[#060606]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-16">
                    {/* Eyebrow */}
                    <p className="reveal-up" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#004FD4',
                        letterSpacing: '0.20em',
                        textTransform: 'uppercase',
                        margin: '0 0 20px 0'
                    }}>Features</p>

                    {/* Large Apple-style headline */}
                    <h2 id="features-headline" style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(40px, 6vw, 88px)',
                        fontWeight: 700,
                        lineHeight: 1.06,
                        letterSpacing: '-0.04em',
                        maxWidth: '820px',
                        margin: 0,
                        color: 'rgba(255,255,255,0.92)',
                        opacity: 0,
                        transform: 'translateY(28px)',
                        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
                    }}>
                        Built for<br />uncompromising<br />filming.
                    </h2>
                </div>
            </section>
        </>
    );
}
