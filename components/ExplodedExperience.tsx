"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES_S2 = 147;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ExplodedExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beatARef = useRef<HTMLDivElement>(null);
    const beatBRef = useRef<HTMLDivElement>(null);
    const beatCRef = useRef<HTMLDivElement>(null);
    const beatDRef = useRef<HTMLDivElement>(null);
    const isActiveRef = useRef(false);

    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoadingOut, setShowLoadingOut] = useState(false);
    const hasFilledBackground = useRef(false);

    // Canvas drawing state
    const framesRef = useRef<HTMLImageElement[]>([]);
    const targetFrameRef = useRef(0);
    const currentFrameFloatRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Keep track of scroll manually for the canvas lerp and text beats
    useEffect(() => {
        const unsub = scrollYProgress.on("change", (p) => {
            targetFrameRef.current = Math.round(p * (TOTAL_FRAMES_S2 - 1));

            // Visibility logic - Adjusted thresholds based on project3 visual story
            // 0 - 0.25: Initial rotation
            // 0.25 - 0.50: Disassembly begins / lens pops
            // 0.50 - 0.75: Full exploded system
            // 0.75 - 1.00: Re-assembly / closing
            const showBeat = (ref: React.RefObject<HTMLDivElement | null>, visible: boolean, hiddenX: string, visibleX: string) => {
                if (!ref?.current) return;
                ref.current.style.opacity = visible ? '1' : '0';
                ref.current.style.transform = visible ? `translateX(${visibleX})` : `translateX(${hiddenX})`;
            };

            showBeat(beatARef, p >= 0.00 && p < 0.25, '-40px', '0px');
            showBeat(beatBRef, p >= 0.25 && p < 0.55, '-40px', '0px');
            showBeat(beatCRef, p >= 0.55 && p < 0.80, '-40px', '0px');
            showBeat(beatDRef, p >= 0.80 && p <= 1.00, '40px', '0px');
        });

        const container = containerRef.current;
        if (container) {
            const obs = new IntersectionObserver(entries => {
                isActiveRef.current = entries[0].isIntersecting;
            }, { rootMargin: '100% 0px' });
            obs.observe(container);
            return () => { unsub(); obs.disconnect(); };
        }
        return () => unsub();
    }, [scrollYProgress]);

    // Preloading
    useEffect(() => {
        // initialize array
        framesRef.current = new Array(TOTAL_FRAMES_S2);
        let loaded = 0;

        for (let i = 0; i < TOTAL_FRAMES_S2; i++) {
            const img = new Image();
            const paddedIndex = String(i + 1).padStart(3, '0');
            img.src = `${BASE_PATH}/project3/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                framesRef.current[i] = img;
                loaded++;
                setLoadedCount(loaded);
                if (loaded >= Math.floor(TOTAL_FRAMES_S2 * 0.85)) {
                    // If 85% loaded, start hiding loading screen
                    setShowLoadingOut(true);
                    setTimeout(() => setIsLoaded(true), 600);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load: ${BASE_PATH}/project3/ezgif-frame-${paddedIndex}.jpg`);
                // increment anyway to prevent load halt
                loaded++;
                setLoadedCount(loaded);
                if (loaded >= Math.floor(TOTAL_FRAMES_S2 * 0.85)) {
                    // Start hiding loading screen even if some failed
                    setShowLoadingOut(true);
                    setTimeout(() => setIsLoaded(true), 600);
                }
            };
        }
    }, []);

    // Canvas Render Loop
    useEffect(() => {
        if (!isLoaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill background black immediately
        if (!hasFilledBackground.current) {
            ctx.fillStyle = '#060606';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            hasFilledBackground.current = true;
        }

        let animFrameId: number;
        let lastDrawnIndex = -1;

        const renderLoop = () => {
            if (isActiveRef.current) {
                currentFrameFloatRef.current += (targetFrameRef.current - currentFrameFloatRef.current) * 0.10;
                const frameIndex = Math.min(Math.round(currentFrameFloatRef.current), TOTAL_FRAMES_S2 - 1);

                if (frameIndex !== lastDrawnIndex && framesRef.current[frameIndex]) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Draw image to cover
                    const img = framesRef.current[frameIndex];
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    lastDrawnIndex = frameIndex;
                }
            }

            animFrameId = requestAnimationFrame(renderLoop);
        };

        animFrameId = requestAnimationFrame(renderLoop);
        return () => cancelAnimationFrame(animFrameId);
    }, [isLoaded]);

    // Window Resize
    useEffect(() => {
        const fitCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas || !framesRef.current[0]) return;
            const img = framesRef.current[0];

            const imgRatio = img.naturalWidth / img.naturalHeight;
            const winRatio = window.innerWidth / window.innerHeight;

            if (winRatio > imgRatio) {
                canvas.width = window.innerWidth;
                canvas.height = Math.round(window.innerWidth / imgRatio);
            } else {
                canvas.height = window.innerHeight;
                canvas.width = Math.round(window.innerHeight * imgRatio);
            }

            canvas.style.position = 'absolute';
            canvas.style.left = Math.round((window.innerWidth - canvas.width) / 2) + 'px';
            canvas.style.top = Math.round((window.innerHeight - canvas.height) / 2) + 'px';

            // Re-fill background if not drawing immediately
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#060606';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Redraw current frame after resize
                const drawIndex = Math.min(Math.round(currentFrameFloatRef.current), TOTAL_FRAMES_S2 - 1);
                if (framesRef.current[drawIndex]) {
                    ctx.drawImage(framesRef.current[drawIndex], 0, 0, canvas.width, canvas.height);
                }
            }
        };

        if (isLoaded) {
            fitCanvas();
            window.addEventListener('resize', fitCanvas);
            return () => window.removeEventListener('resize', fitCanvas);
        }
    }, [isLoaded]);

    const loadProgress = loadedCount / TOTAL_FRAMES_S2;

    // Beat C - Technical annotations over canvas
    const annotationsOpacity = useTransform(scrollYProgress, [0.60, 0.65, 0.80, 0.85], [0, 0.3, 0.3, 0]);

    return (
        <section className="relative bg-[#0B0B0E] text-white border-t border-white/5">
            {!isLoaded && (
                <div className={`absolute inset-0 z-50 bg-[#0B0B0E] flex flex-col items-center justify-center transition-opacity duration-600 ${showLoadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-4">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#004FD4] transition-all duration-100 ease-out"
                            style={{ width: `${loadProgress * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div ref={containerRef} id="section2-sticky-wrapper" className="relative h-[500vh] bg-[#060606]" style={{ willChange: 'transform' }}>
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#060606]" style={{ transform: 'translateZ(0)' }}>

                    {/* Full-screen canvas */}
                    <canvas ref={canvasRef} id="section2-canvas" className="absolute z-20"></canvas>

                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,79,212,0.04)_0%,transparent_70%)] pointer-events-none z-10" />

                    {/* Text overlays on top of canvas */}
                    <div className="absolute inset-0 pointer-events-none z-30 layout-container">

                        {/* Beat A — SECTION INTRO */}
                        <div
                            ref={beatARef}
                            style={{ opacity: 0, transform: 'translateX(-40px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
                            className="absolute bottom-12 left-6 right-6 md:left-16 md:right-auto text-left md:max-w-[480px]"
                            id="s2-beat-a"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">CINEMATIC PROFILE</div>
                            <h2 className="text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6">
                                Form meets<br />uncompromising function.
                            </h2>
                            <p className="text-white/55 text-[13px] md:text-[14px]">
                                Every angle of the Lumix S1H is built for the professional.<br />
                                A robust magnesium alloy body ready for any rig,<br />
                                designed to dissipate heat and endure the elements.
                            </p>
                        </div>

                        {/* Beat B — DISASSEMBLY BEGINS */}
                        <div
                            ref={beatBRef}
                            style={{ opacity: 0, transform: 'translateX(-40px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
                            className="absolute bottom-12 left-6 right-6 md:left-16 md:right-auto text-left md:max-w-[480px]"
                            id="s2-beat-b"
                        >
                            <div className="text-[#F0A500] font-mono text-[12px] tracking-widest mb-4 uppercase">OPTICAL PERFECTION</div>
                            <h2 className="text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6">
                                The heart of<br />the image.
                            </h2>
                            <p className="text-white/55 text-[13px] md:text-[14px]">
                                Exposing the L-Mount ecosystem and the massive<br />
                                full-frame sensor beneath. A clear, direct path<br />
                                for light to hit the BSI CMOS surface.
                            </p>
                        </div>

                        {/* Beat C — PEAK EXPLODED VIEW */}
                        <div
                            ref={beatCRef}
                            style={{ opacity: 0, transform: 'translateX(-40px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
                            className="absolute bottom-12 left-6 right-6 md:left-16 md:right-auto text-left md:max-w-[480px]"
                            id="s2-beat-c"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">EXPANDED ARCHITECTURE</div>
                            <h2 className="text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6">
                                Layered for<br />absolute performance.
                            </h2>
                            <p className="text-white/55 text-[13px] md:text-[14px] mb-4">
                                Stripping back the layers reveals the thermal management<br />
                                system and sensor-shift stabilization.
                            </p>
                            <p className="text-white/55 text-[13px] md:text-[14px]">
                                Unlimited recording time. Zero compromises. This is how<br />
                                the S1H delivers 6K without breaking a sweat.
                            </p>
                        </div>

                        {/* Beat D — CLOSING / HOLD */}
                        <div
                            ref={beatDRef}
                            style={{ opacity: 0, transform: 'translateX(40px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
                            className="absolute bottom-12 left-6 right-6 md:left-auto md:right-16 text-right flex flex-col items-end md:max-w-[480px]"
                            id="s2-beat-d"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">INTEGRATED POWER</div>
                            <h2 className="text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6">
                                Unified.<br />Unstoppable.
                            </h2>
                            <p className="text-white/55 text-[13px] md:text-[14px]">
                                The internal architecture collapses back into a cohesive,<br />
                                weather-sealed form. A complete cinema tool.
                            </p>
                        </div>

                        {/* Technical Annotations (Beat C) */}
                        <motion.div style={{ opacity: annotationsOpacity }} className="absolute inset-0 pointer-events-none hidden md:block z-30 max-w-[1200px] mx-auto w-full">
                            <div className="absolute top-[35%] left-[25%] text-[11px] font-mono text-white/30">L-MOUNT RING</div>
                            <div className="absolute top-[48%] left-[45%] text-[11px] font-mono text-white/30">BSI CMOS</div>
                            <div className="absolute bottom-[35%] left-[55%] text-[11px] font-mono text-white/30">IBIS MODULE</div>
                            <div className="absolute top-[30%] right-[25%] text-[11px] font-mono text-white/30 text-right">Venus Engine</div>
                            <div className="absolute bottom-[20%] right-[30%] text-[11px] font-mono text-white/30">THERMAL DISSIPATION</div>
                            <div className="absolute top-[60%] right-[15%] text-[11px] font-mono text-white/30 text-right">DUAL NATIVE ISO</div>
                            <div className="absolute bottom-[45%] left-[35%] text-[11px] font-mono text-[#F0A500]">FPC RIBBON</div>
                        </motion.div>
                    </div>

                </div>
            </div>

        </section>
    );
}
