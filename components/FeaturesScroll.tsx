"use client";

import { useEffect } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const FEAT_DATA = [
    {
        eyebrow: "Image Quality",
        title: "Full-Frame\nBSI CMOS",
        body: "A 24.2MP full-frame back-side illuminated sensor captures extraordinary detail in every frame — from cinematic shadow depth to blazing highlights — with minimal noise even in the most demanding low-light conditions.",
        img: `${BASE_PATH}/project5/1.jpg`,
    },
    {
        eyebrow: "Stabilisation",
        title: "5-Axis\nDual I.S. 2",
        body: "With up to 6.5 stops of compensation, the S1H's in-body stabilisation works in concert with compatible lenses to virtually eliminate camera shake — freeing you to shoot handheld with cinema-grade steadiness.",
        img: `${BASE_PATH}/project5/2.png`,
    },
    {
        eyebrow: "Cinema",
        title: "6K Cinema\n4:2:2 10-bit",
        body: "Shoot 6K, V-Log, 4:2:2 10-bit internally with no recording limit. A rich colour depth gives colourists the latitude they need to sculpt the final look — from commercial precision to arthouse expression.",
        img: `${BASE_PATH}/project5/3.png`,
    },
    {
        eyebrow: "Viewfinder",
        title: "OLED EVF\n5.76M-dot",
        body: "A class-leading 5.76-million-dot OLED viewfinder delivers a crystal-clear, lag-free preview that behaves like optical glass. A tilting 3.0\" touchscreen ensures framing freedom in any orientation.",
        img: `${BASE_PATH}/project5/4.jpg`,
    },
    {
        eyebrow: "Build",
        title: "Weather-Sealed\nMagnesium Alloy",
        body: "Machined from a full magnesium alloy chassis and sealed against dust and splash, the S1H operates in temperatures down to –10°C. Built for productions that don't stop for weather.",
        img: `${BASE_PATH}/project5/5.png`,
    },
];

const N = FEAT_DATA.length;

export default function FeaturesScroll() {
    useEffect(() => {
        const outer = document.getElementById("feat-outer") as HTMLElement;
        const track = document.getElementById("feat-track") as HTMLElement;
        const slides = Array.from(
            document.querySelectorAll(".feat-slide")
        ) as HTMLElement[];

        if (!outer || !track) return;

        let lastActive = -1;
        let rafPending = false;

        function update() {
            const rect = outer.getBoundingClientRect();
            const scrolled = -rect.top;
            const total = outer.offsetHeight - window.innerHeight;
            const p = Math.min(Math.max(scrolled / total, 0), 1);

            // Translate track horizontally — compositor-only, no layout
            const tx = p * (N - 1) * 100;
            track.style.transform = `translateX(-${tx}vw)`;

            // Determine active slide
            const activeIdx = Math.round(p * (N - 1));

            if (activeIdx !== lastActive) {
                lastActive = activeIdx;

                slides.forEach((slide, i) => {
                    const img = slide.querySelector(".feat-img") as HTMLElement;
                    const content = slide.querySelector(".feat-content") as HTMLElement;
                    const eyebrow = slide.querySelector(".feat-eyebrow") as HTMLElement;
                    const title = slide.querySelector(".feat-title") as HTMLElement;
                    const body = slide.querySelector(".feat-body") as HTMLElement;
                    const counter = slide.querySelector(".feat-counter") as HTMLElement;

                    if (i === activeIdx) {
                        // Activate: image zooms in subtly, text slides up
                        if (img) {
                            img.style.transform = "scale(1)";
                            img.style.transition = "transform 1.1s cubic-bezier(0.16,1,0.3,1)";
                        }
                        if (content) {
                            content.style.opacity = "1";
                            content.style.transform = "translateY(0)";
                            content.style.transition =
                                "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
                        }
                        if (eyebrow) {
                            eyebrow.style.opacity = "1";
                            eyebrow.style.transform = "translateY(0)";
                            eyebrow.style.transition =
                                "opacity 0.6s 0.05s cubic-bezier(0.16,1,0.3,1), transform 0.6s 0.05s cubic-bezier(0.16,1,0.3,1)";
                        }
                        if (title) {
                            title.style.opacity = "1";
                            title.style.transform = "translateY(0)";
                            title.style.transition =
                                "opacity 0.75s 0.15s cubic-bezier(0.16,1,0.3,1), transform 0.75s 0.15s cubic-bezier(0.16,1,0.3,1)";
                        }
                        if (body) {
                            body.style.opacity = "1";
                            body.style.transform = "translateY(0)";
                            body.style.transition =
                                "opacity 0.8s 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.28s cubic-bezier(0.16,1,0.3,1)";
                        }
                        if (counter) {
                            counter.style.opacity = "1";
                            counter.style.transition = "opacity 0.6s 0.4s ease";
                        }
                    } else {
                        // Reset: image slightly scaled out, text invisible & shifted down
                        if (img) {
                            img.style.transform = "scale(1.06)";
                            img.style.transition = "none";
                        }
                        if (content) {
                            content.style.opacity = "0";
                            content.style.transform = "translateY(32px)";
                            content.style.transition = "none";
                        }
                        if (eyebrow) {
                            eyebrow.style.opacity = "0";
                            eyebrow.style.transform = "translateY(16px)";
                            eyebrow.style.transition = "none";
                        }
                        if (title) {
                            title.style.opacity = "0";
                            title.style.transform = "translateY(24px)";
                            title.style.transition = "none";
                        }
                        if (body) {
                            body.style.opacity = "0";
                            body.style.transform = "translateY(24px)";
                            body.style.transition = "none";
                        }
                        if (counter) {
                            counter.style.opacity = "0";
                            counter.style.transition = "none";
                        }
                    }
                });
            }
        }

        function onScroll() {
            if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(() => {
                    update();
                    rafPending = false;
                });
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        update(); // run once on mount for first slide
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            id="feat-outer"
            style={{
                position: "relative",
                // Extra height at start and end so track eases in/out smoothly
                height: `${N * 100 + 50}vh`,
                background: "#060606",
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    background: "#060606",
                }}
            >
                {/* Horizontal track — GPU composited */}
                <div
                    id="feat-track"
                    style={{
                        display: "flex",
                        width: `${N * 100}vw`,
                        height: "100%",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                    }}
                >
                    {FEAT_DATA.map((item, idx) => (
                        <div
                            key={idx}
                            className="feat-slide"
                            style={{
                                position: "relative",
                                width: "100vw",
                                height: "100vh",
                                flexShrink: 0,
                                overflow: "hidden",
                            }}
                        >
                            {/* Background image — GPU composited, starts scaled out */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="feat-img"
                                src={item.img}
                                alt={item.eyebrow}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transform: idx === 0 ? "scale(1)" : "scale(1.06)",
                                    transformOrigin: "center center",
                                    willChange: "transform",
                                    backfaceVisibility: "hidden",
                                }}
                            />

                            {/* Dark gradient overlay — bottom and left for text */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 70%), linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 55%)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Text content block — bottom left */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:px-14 md:pb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0 z-10">
                                {/* Left: eyebrow + title + body */}
                                <div style={{ maxWidth: "480px" }}>
                                    <p
                                        className="feat-eyebrow"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            color: "#4da3ff",
                                            letterSpacing: "0.20em",
                                            textTransform: "uppercase",
                                            margin: "0 0 12px 0",
                                            opacity: idx === 0 ? 1 : 0,
                                            transform: idx === 0 ? "translateY(0)" : "translateY(16px)",
                                        }}
                                    >
                                        {item.eyebrow}
                                    </p>
                                    <h3
                                        className="feat-title"
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(26px, 3.2vw, 52px)",
                                            fontWeight: 700,
                                            color: "rgba(255,255,255,0.95)",
                                            letterSpacing: "-0.03em",
                                            lineHeight: 1.1,
                                            margin: "0 0 16px 0",
                                            whiteSpace: "pre-line",
                                            opacity: idx === 0 ? 1 : 0,
                                            transform: idx === 0 ? "translateY(0)" : "translateY(24px)",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="feat-body"
                                        style={{
                                            fontFamily: "var(--font-text)",
                                            fontSize: "clamp(14px, 1.5vw, 16px)",
                                            color: "rgba(255,255,255,0.58)",
                                            lineHeight: 1.7,
                                            margin: 0,
                                            maxWidth: "420px",
                                            opacity: idx === 0 ? 1 : 0,
                                            transform: idx === 0 ? "translateY(0)" : "translateY(24px)",
                                        }}
                                    >
                                        {item.body}
                                    </p>
                                </div>

                                {/* Right: slide counter */}
                                <div
                                    className="feat-content"
                                    style={{
                                        textAlign: "right",
                                        opacity: idx === 0 ? 1 : 0,
                                        transform: idx === 0 ? "translateY(0)" : "translateY(32px)",
                                    }}
                                >
                                    <p
                                        className="feat-counter"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "12px",
                                            color: "rgba(255,255,255,0.30)",
                                            letterSpacing: "0.12em",
                                            margin: "0 0 8px 0",
                                            opacity: idx === 0 ? 1 : 0,
                                        }}
                                    >
                                        {String(idx + 1).padStart(2, "0")} /{" "}
                                        {String(N).padStart(2, "0")}
                                    </p>
                                    {/* Dot indicators */}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "6px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        {FEAT_DATA.map((_, di) => (
                                            <div
                                                key={di}
                                                style={{
                                                    width: di === idx ? "20px" : "6px",
                                                    height: "6px",
                                                    borderRadius: "3px",
                                                    background:
                                                        di === idx
                                                            ? "rgba(255,255,255,0.85)"
                                                            : "rgba(255,255,255,0.20)",
                                                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
