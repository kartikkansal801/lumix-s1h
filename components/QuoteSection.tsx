"use client";

import { useEffect, useRef } from "react";

export default function QuoteSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const quoteSection = sectionRef.current;
        if (!quoteSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quoteSection.style.opacity = '1';
                    quoteSection.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        quoteSection.style.opacity = '0';
        quoteSection.style.transform = 'translateY(24px)';
        quoteSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(quoteSection);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="quote-section" style={{
            width: '100%',
            padding: '48px 32px 32px 32px',
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            {/* Top vertical line accent */}
            <div style={{
                width: '1px',
                height: '32px',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))',
                marginBottom: '24px'
            }}></div>

            {/* Main quote */}
            <p style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: 'clamp(24px, 2.8vw, 40px)',
                fontWeight: 400,
                fontStyle: 'normal',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '820px',
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                margin: 0
            }}>
                &quot;The Lumix S1H isn&apos;t just a camera.<br />It&apos;s a statement.&quot;
            </p>

            {/* Attribution */}
            <p style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginTop: '28px'
            }}>
                Panasonic Lumix S1H — Full-Frame Cinema
            </p>

            {/* Bottom vertical line accent */}
            <div style={{
                width: '1px',
                height: '32px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
                marginTop: '24px'
            }}></div>
        </section>
    );
}
