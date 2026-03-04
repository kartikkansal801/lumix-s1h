"use client";

import { useRef, useEffect } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const SLIDES = [
    { eyebrow: 'Image Quality', headline: 'Full-Frame\nBSI CMOS', image: `${BASE_PATH}/project5/1.jpg`, description: '24.2MP back-illuminated full-frame sensor. Phase-hybrid AF. 14 stops dynamic range.' },
    { eyebrow: 'Stabilisation', headline: '5-Axis\nDual I.S. 2', image: `${BASE_PATH}/project5/2.png`, description: 'Up to 6.5 stops combined stabilisation. Shoot handheld at any focal length.' },
    { eyebrow: 'Cinema', headline: '6K Cinema\n4:2:2 10-bit', image: `${BASE_PATH}/project5/3.png`, description: 'Unlimited 6K Cinema recording. V-Log L. HLG. No crop. No recording limit.' },
    { eyebrow: 'Viewfinder', headline: 'OLED EVF\n5.76M-dot', image: `${BASE_PATH}/project5/4.jpg`, description: '5.76M-dot OLED EVF 0.78x magnification. Free-angle 3.0 inch touch LCD.' },
    { eyebrow: 'Build', headline: 'Weather-Sealed\nMagnesium Alloy', image: `${BASE_PATH}/project5/5.png`, description: 'Precision magnesium alloy chassis. Dust, splash, freeze-resistant to -10C.' },
];

export default function FeaturesCarousel() {
    const trackRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);
    const eyeRef = useRef<HTMLParagraphElement>(null);
    const headRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const dots = dotsRef.current;
        const eye = eyeRef.current;
        const head = headRef.current;
        const desc = descRef.current;

        if (!track || !dots || !eye || !head || !desc) return;

        // Clear track and dots just to be safe on HMR
        track.innerHTML = '';
        dots.innerHTML = '';

        const isMobile = window.innerWidth < 768;
        const CARD_VW = isMobile ? 85 : 75;
        const PEEK = isMobile ? 40 : 120;
        const GAP = isMobile ? 12 : 20;
        const PAD = isMobile ? 24 : 64;

        track.style.gap = `${GAP}px`;
        track.style.padding = `0 ${PAD}px`;

        let idx = 0, drag = false, x0 = 0, y0 = 0, dx = 0, isScrolling = false;

        // Build cards
        SLIDES.forEach(s => {
            const c = document.createElement('div');
            const sizeCSS = isMobile ? 'aspect-ratio:3/4;' : 'height:60vh;';
            c.style.cssText = `flex:0 0 ${CARD_VW}vw;width:${CARD_VW}vw;${sizeCSS}border-radius:16px;overflow:hidden;position:relative;background:#0a0a0a;flex-shrink:0;box-shadow:0 8px 48px rgba(0,0,0,0.55);`;
            const img = document.createElement('img');
            img.src = s.image;
            img.alt = s.headline;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;';
            c.appendChild(img);
            track.appendChild(c);
        });

        // Build dots
        SLIDES.forEach((_, i) => {
            const d = document.createElement('button');
            d.style.cssText = 'border:none;background:none;padding:0;cursor:pointer;height:6px;border-radius:3px;background:rgba(255,255,255,0.22);transition:width 0.35s cubic-bezier(0.16,1,0.3,1),background 0.35s ease;';
            d.onclick = () => goTo(i);
            dots.appendChild(d);
        });

        const offset = (i: number) => {
            const w = window.innerWidth * (CARD_VW / 100);
            const ctr = (window.innerWidth - w - PEEK) / 2;
            return -(i * (w + GAP)) + ctr - PAD;
        };

        const setTrack = (ex = 0) => { if (track) track.style.transform = `translateX(${offset(idx) + ex}px)`; };

        const updateDots = () => {
            Array.from(dots.children).forEach((d, i) => {
                const btn = d as HTMLButtonElement;
                btn.style.width = i === idx ? '28px' : '6px';
                btn.style.background = i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)';
            });
        };

        let timeoutId: NodeJS.Timeout;
        let autoTimerId: NodeJS.Timeout | null = null;
        let playAuto = true;

        const updateText = () => {
            [eye, head, desc].forEach(el => { el.style.opacity = '0'; });
            head.style.transform = 'translateY(8px)';
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const s = SLIDES[idx];
                eye.textContent = s.eyebrow;
                head.textContent = s.headline;
                desc.textContent = s.description;
                [eye, head, desc].forEach(el => { el.style.opacity = '1'; });
                head.style.transform = 'translateY(0)';
            }, 180);
        };

        function resetAuto() {
            if (autoTimerId) clearInterval(autoTimerId);
            if (!playAuto) return;
            // Disable auto-sliding on mobile viewports
            if (window.innerWidth < 768) return;

            autoTimerId = setInterval(() => {
                goTo((idx + 1) % SLIDES.length);
            }, 3500);
        }

        function goTo(i: number) {
            idx = Math.max(0, Math.min(SLIDES.length - 1, i));
            if (track) track.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
            setTrack();
            updateDots();
            updateText();
            resetAuto();
        }

        const s = (x: number, y: number) => { playAuto = false; resetAuto(); drag = true; x0 = x; y0 = y; dx = 0; isScrolling = false; if (track) { track.style.transition = 'none'; track.style.cursor = 'grabbing'; } };
        const m = (x: number, y: number) => {
            if (!drag) return;
            const curDx = x - x0;
            const curDy = y - y0;
            if (!isScrolling) {
                // Determine if swipe is primarily vertical
                if (Math.abs(curDy) > Math.abs(curDx)) {
                    drag = false;
                    return;
                }
                isScrolling = true;
            }
            dx = curDx;
            setTrack(dx);
        };
        const e = () => {
            if (!drag) {
                playAuto = true;
                resetAuto();
                return;
            }
            drag = false; playAuto = true; resetAuto();
            if (track) track.style.cursor = 'grab';
            if (dx < -60) goTo(idx + 1);
            else if (dx > 60) goTo(idx - 1);
            else goTo(idx);
        };

        const onMouseDown = (ev: MouseEvent) => s(ev.clientX, ev.clientY);
        const onMouseMove = (ev: MouseEvent) => { if (drag) m(ev.clientX, ev.clientY); };
        const onMouseUp = () => e();
        const onTouchStart = (ev: TouchEvent) => s(ev.touches[0].clientX, ev.touches[0].clientY);
        const onTouchMove = (ev: TouchEvent) => m(ev.touches[0].clientX, ev.touches[0].clientY);
        const onTouchEnd = () => e();
        const onKeyDown = (ev: KeyboardEvent) => { playAuto = false; resetAuto(); if (ev.key === 'ArrowRight') goTo(idx + 1); if (ev.key === 'ArrowLeft') goTo(idx - 1); };
        let lastWidth = window.innerWidth;
        const onResize = () => {
            if (window.innerWidth === lastWidth) return;
            lastWidth = window.innerWidth;
            if (track) track.style.transition = 'none';
            setTrack();
        };

        track.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        track.addEventListener('touchstart', onTouchStart, { passive: true });
        track.addEventListener('touchmove', onTouchMove, { passive: true });
        track.addEventListener('touchend', onTouchEnd);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);

        // Initial positioning after layout
        setTimeout(() => goTo(0), 50);

        return () => {
            track.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            track.removeEventListener('touchstart', onTouchStart);
            track.removeEventListener('touchmove', onTouchMove);
            track.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
            if (timeoutId) clearTimeout(timeoutId);
            if (autoTimerId) clearInterval(autoTimerId);
        };
    }, []);

    return (
        <section id="features-carousel" className="relative bg-[#060606] py-16 md:py-[96px] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-16 mb-8 md:mb-10 text-center min-h-[140px] md:min-h-[160px]">
                <p ref={eyeRef} id="c-eye" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', fontWeight: 700, color: '#004FD4', letterSpacing: '0.20em', textTransform: 'uppercase', margin: '0 0 14px 0', transition: 'opacity 0.3s ease' }}></p>
                <h2 ref={headRef} id="c-head" style={{ fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif", fontSize: 'clamp(34px,5vw,68px)', fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0, whiteSpace: 'pre-line', transition: 'opacity 0.3s ease,transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}></h2>
            </div>
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <div ref={trackRef} id="c-track" style={{ display: 'flex', transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}></div>
            </div>
            <div ref={dotsRef} id="c-dots" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '28px' }}></div>
            <p ref={descRef} id="c-desc" className="px-6 md:px-8 min-h-[100px] md:min-h-[80px]" style={{ fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.52)', textAlign: 'center', maxWidth: '560px', margin: '18px auto 0', lineHeight: 1.65, transition: 'opacity 0.3s ease' }}></p>
        </section>
    );
}
