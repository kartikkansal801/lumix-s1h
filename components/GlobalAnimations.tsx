"use client";
import { useEffect } from "react";

export default function GlobalAnimations() {
    useEffect(() => {
        // 1. Scatter Text (Assemble from random offsets)
        document.querySelectorAll('.scatter-text').forEach(el => {
            if (el.classList.contains('scatter-init')) return;
            el.classList.add('scatter-init');

            const text = el.textContent || '';
            const words = text.trim().split(/\s+/);

            el.innerHTML = words.map((w, i) => {
                const rx = (Math.random() - 0.5) * 50;
                const ry = (Math.random() - 0.5) * 30;
                return `<span style="display: inline-block; opacity: 0; transform: translate(${rx}px, ${ry}px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s;">${w}&nbsp;</span>`;
            }).join('');

            const obs = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    el.querySelectorAll('span').forEach(s => {
                        (s as HTMLElement).style.opacity = '1';
                        (s as HTMLElement).style.transform = 'translate(0,0)';
                    });
                    obs.disconnect();
                }
            }, { threshold: 0.3 });
            obs.observe(el);
        });

        // 2. Reveal Up (Slide Up Reveal) — IntersectionObserver only, no scroll listener
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    // No setTimeout — apply immediately, CSS transition handles timing
                    (e.target as HTMLElement).classList.add('visible');
                    revealObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal-up').forEach(el => {
            if (!el.classList.contains('reveal-init')) {
                el.classList.add('reveal-init');
                revealObs.observe(el);
            }
        });

        // 3. Count Up (Optional persistence from past implementation)
        const countObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const target = parseFloat(el.dataset.target || "0");
                    const duration = 1200;
                    const start = performance.now();
                    const tick = (now: number) => {
                        const p = Math.min((now - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 4);
                        el.textContent = (target * ease).toFixed(target % 1 ? 1 : 0);
                        if (p < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    countObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.count-up').forEach(el => {
            if (!el.classList.contains('count-init')) {
                el.classList.add('count-init');
                countObs.observe(el);
            }
        });

    }, []);

    return null;
}
