"use client";

import { useEffect, useRef } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const IQ_FEATURES = [
    {
        eyebrow: 'Dynamic Range',
        headline: '14+ Stops.\nNothing lost.',
        body: 'V-Log/V-Gamut captures everything from the deepest shadows to blown highlights in a single exposure. <strong>Over 14 stops of dynamic range</strong> — rivalling dedicated cinema cameras like the Panasonic VariCam. Latitude that lets you push the grade as far as you want in post.',
        caption: 'Shot in V-Log L · Lumix S1H',
        image: `${BASE_PATH}/project7/Screenshot 2026-03-03 at 21-48-51 Juvisy - S1H Vincent N.Van Flickr.png`,
        side: 'right', // text left, image right
    },
    {
        eyebrow: 'Low Light',
        headline: 'Dual Native ISO.\nDarkness defeated.',
        body: 'Two dedicated circuits per pixel — <strong>ISO 640 and ISO 4000</strong> as true native bases. Each is clean, noise-free, with full colour fidelity. Push further to ISO 51,200. Extend to 204,800. Shoot in near-darkness without compromise.',
        caption: 'Dual Native ISO · Lumix S1H',
        image: `${BASE_PATH}/project7/Screenshot 2026-03-03 at 21-49-07 Watching the Sunset Zeiss C_Y Sonnar 135mm f_2.8 (@f_8) Mattia Visintini Flickr.png`,
        side: 'left', // image left, text right
    },
    {
        eyebrow: 'Colour Science',
        headline: '1 Billion Colors.\n4:2:2 10-bit.',
        body: 'Internal 4:2:2 10-bit recording delivers <strong>~128× the colour information</strong> of standard 8-bit footage. Every skin tone, every gradient, every subtle shift preserved at the source. Radical colour grading in post — turn daylight into night, summer into winter.',
        caption: '4:2:2 10-bit internal · Lumix S1H',
        image: `${BASE_PATH}/project7/Screenshot 2026-03-03 at 21-50-57 Sunrise Wynnum Pier Wynnum Pier Brisbane Australia Lumi… Flickr.png`,
        side: 'center', // image centered top, text centered below
    },
    {
        eyebrow: 'Cinema Formats',
        headline: '6K Full-Frame.\nEvery aspect ratio.',
        body: '<strong>6K open gate (3:2), 5.9K 16:9, C4K, 4K 4:3 anamorphic</strong> — one camera covers every format and aspect ratio used in professional cinema. No crop. No compromise. Switch formats without changing lenses.',
        caption: '6K Open Gate · Lumix S1H',
        image: `${BASE_PATH}/project7/Screenshot 2026-03-03 at 22-04-18 Casting a shadow by BobR25 ePHOTOzine.png`,
        side: 'right',
    },
    {
        eyebrow: 'High Resolution',
        headline: '96MP stills.\nSensor-shift precision.',
        body: 'Composites 8 sensor-shift exposures into a single <strong>96MP RAW file at 12,000 × 8,000px</strong>. When 24.2MP isn\'t enough — for print, billboard, or fine-art reproduction. No additional lens required.',
        caption: 'High Resolution Mode · Lumix S1H',
        image: `${BASE_PATH}/project7/Screenshot 2026-03-03 at 22-05-01 Cold Winter Morning by Mannographer ePHOTOzine.png`,
        side: 'left',
    },
];

export default function ImageQualityCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // ── REVEAL ANIMATIONS ─────────────────────────────────────────────────────
        const revEls = document.querySelectorAll('#iq-features-section .reveal-up');
        const revObs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        (entry.target as HTMLElement).style.opacity = '1';
                        (entry.target as HTMLElement).style.transform = 'translateY(0)';
                    }, (i % 3) * 80);
                    // CRITICAL FIX: Unobserve immediately to prevent "come and go" re-triggering on iOS scroll
                    revObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revEls.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(24px)';
            (el as HTMLElement).style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            revObs.observe(el);
        });

        // ── IMAGE PARALLAX ────────────────────────────────────────────────────────
        const imgCards = document.querySelectorAll('#iq-features-section img.parallax-img');
        let isMobile = window.innerWidth < 768;

        const onResize = () => {
            isMobile = window.innerWidth < 768;
            if (isMobile) {
                imgCards.forEach(img => {
                    (img as HTMLElement).style.transform = `translateY(0px)`;
                });
            }
        };
        window.addEventListener('resize', onResize, { passive: true });

        const onScroll = () => {
            if (isMobile) return; // Disable parallax on mobile to prevent address bar jitter!

            // Use requestAnimationFrame for smoother parallax
            window.requestAnimationFrame(() => {
                imgCards.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    const center = rect.top + rect.height / 2;
                    const offset = (window.innerHeight / 2 - center) * 0.06;
                    (img as HTMLElement).style.transform = `translateY(${offset}px)`;
                });
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Initial call to set positions
        onScroll();

        return () => {
            revObs.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <section id="iq-features-section" ref={sectionRef} style={{ background: '#060606', padding: '40px 0 120px 0' }}>
            <div id="iq-features-container" className="flex flex-col">
                {IQ_FEATURES.map((feat, i) => {
                    const isLeft = feat.side === 'right'; // text left, image right
                    const isRight = feat.side === 'left'; // image left, text right
                    const isCenter = feat.side === 'center'; // centered

                    if (isCenter) {
                        return (
                            <div key={i} className="iq-block" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: '1200px',
                                margin: '0 auto',
                                padding: '100px 64px'
                            }}>
                                <div style={{ width: '48%', minWidth: '300px' }} className="iq-img-container">
                                    <div style={{
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        background: '#0a0a0a',
                                        aspectRatio: '4/5',
                                        position: 'relative'
                                    }}>
                                        <img className="parallax-img" src={feat.image} alt={feat.headline} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', padding: '0 4px', justifyContent: 'center' }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <circle cx="9" cy="9" r="8.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                                            <circle cx="9" cy="9" r="3.5" fill="rgba(255,255,255,0.45)" />
                                        </svg>
                                        <span style={{ fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.40)' }}>
                                            {feat.caption}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ width: '60%', minWidth: '300px', textAlign: 'center', marginTop: '52px' }} className="iq-text-container">
                                    <p className="iq-eyebrow reveal-up" style={{
                                        fontFamily: "'JetBrains Mono',monospace",
                                        fontSize: '11px', fontWeight: 700,
                                        color: '#004FD4',
                                        letterSpacing: '0.20em', textTransform: 'uppercase',
                                        margin: '0 0 18px 0'
                                    }}>{feat.eyebrow}</p>
                                    <h3 className="reveal-up" style={{
                                        fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                                        fontSize: 'clamp(32px,4vw,54px)', fontWeight: 700,
                                        color: 'rgba(255,255,255,0.92)',
                                        letterSpacing: '-0.04em', lineHeight: 1.08,
                                        margin: '0 0 28px 0', whiteSpace: 'pre-line'
                                    }}>{feat.headline}</h3>
                                    <p className="reveal-up iq-feature-body" style={{
                                        fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif",
                                        fontSize: '17px', color: 'rgba(255,255,255,0.52)',
                                        lineHeight: 1.75, margin: '0 auto', maxWidth: '560px'
                                    }} dangerouslySetInnerHTML={{ __html: feat.body }}></p>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={i} className="iq-block" style={{
                            display: 'flex',
                            flexDirection: isRight ? 'row' : 'row-reverse',
                            alignItems: 'center',
                            gap: '80px',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            padding: '100px 64px'
                        }}>
                            <div style={{ flex: '0 0 48%', width: '48%' }} className="iq-img-container">
                                <div style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    background: '#0a0a0a',
                                    aspectRatio: '4/5',
                                    position: 'relative'
                                }}>
                                    <img className="parallax-img" src={feat.image} alt={feat.headline} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', padding: '0 4px', justifyContent: 'flex-start' }}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <circle cx="9" cy="9" r="8.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                                        <circle cx="9" cy="9" r="3.5" fill="rgba(255,255,255,0.45)" />
                                    </svg>
                                    <span style={{ fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.40)' }}>
                                        {feat.caption}
                                    </span>
                                </div>
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }} className="iq-text-container">
                                <p className="iq-eyebrow reveal-up" style={{
                                    fontFamily: "'JetBrains Mono',monospace",
                                    fontSize: '11px', fontWeight: 700, color: '#004FD4',
                                    letterSpacing: '0.20em', textTransform: 'uppercase', margin: '0 0 18px 0'
                                }}>{feat.eyebrow}</p>
                                <h3 className="reveal-up" style={{
                                    fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                                    fontSize: 'clamp(32px,4vw,54px)', fontWeight: 700,
                                    color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.04em',
                                    lineHeight: 1.08, margin: '0 0 28px 0', whiteSpace: 'pre-line'
                                }}>{feat.headline}</h3>
                                <p className="reveal-up iq-feature-body" style={{
                                    fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif",
                                    fontSize: '17px', color: 'rgba(255,255,255,0.52)',
                                    lineHeight: 1.75, margin: 0, maxWidth: '480px'
                                }} dangerouslySetInnerHTML={{ __html: feat.body }}></p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        /* Strong tags inside IQ feature body text — white highlight */
        #iq-features-section p.iq-feature-body strong {
          color: rgba(255,255,255,0.90);
          font-weight: 600;
        }

        /* Remove bottom border from last block */
        #iq-features-section .iq-block:last-child {
          border-bottom: none !important;
        }

        /* Responsive — stack vertically on mobile */
        @media (max-width: 768px) {
          #iq-features-section .iq-block {
            flex-direction: column !important;
            padding: 64px 24px !important;
            gap: 40px !important;
          }
          #iq-features-section .iq-block > div {
            width: 100% !important;
            flex: unset !important;
          }
          #iq-features-section .iq-text-container {
            margin-top: 0 !important;
            text-align: left !important;
          }
        }
      `}} />
        </section>
    );
}
