"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 147;

export default function SequenceExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoadingOut, setShowLoadingOut] = useState(false);

    // Canvas drawing state
    const framesRef = useRef<HTMLImageElement[]>([]);
    const targetFrameRef = useRef(0);
    const currentFrameFloatRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Keep track of scroll manually for the canvas lerp
    useEffect(() => {
        const unsub = scrollYProgress.on("change", (v) => {
            targetFrameRef.current = Math.round(v * (TOTAL_FRAMES - 1));
        });
        return () => unsub();
    }, [scrollYProgress]);

    // Preloading
    useEffect(() => {
        // initialize array
        framesRef.current = new Array(TOTAL_FRAMES);
        let loaded = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            const paddedIndex = String(i + 1).padStart(3, '0');
            img.src = `/project1/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                framesRef.current[i] = img;
                loaded++;
                setLoadedCount(loaded);
                if (loaded >= Math.floor(TOTAL_FRAMES * 0.85)) {
                    // If 85% loaded, start hiding loading screen
                    setShowLoadingOut(true);
                    setTimeout(() => setIsLoaded(true), 600);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load: /project1/ezgif-frame-${paddedIndex}.jpg`);
                // increment anyway to prevent load halt
                loaded++;
                setLoadedCount(loaded);
                if (loaded >= Math.floor(TOTAL_FRAMES * 0.85)) {
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

        let animFrameId: number;
        let lastDrawnIndex = -1;

        const renderLoop = () => {
            currentFrameFloatRef.current += (targetFrameRef.current - currentFrameFloatRef.current) * 0.10;
            const frameIndex = Math.min(Math.round(currentFrameFloatRef.current), TOTAL_FRAMES - 1);

            if (frameIndex !== lastDrawnIndex && framesRef.current[frameIndex]) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(framesRef.current[frameIndex], 0, 0, canvas.width, canvas.height);
                lastDrawnIndex = frameIndex;
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

            // Redraw current frame after resize
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const drawIndex = Math.min(Math.round(currentFrameFloatRef.current), TOTAL_FRAMES - 1);
                if (framesRef.current[drawIndex]) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    const loadProgress = loadedCount / TOTAL_FRAMES;

    // Animation values for beats
    // Beat 1: 0-15%
    const beat1Opacity = useTransform(scrollYProgress, [0, 0.10, 0.15, 0.18], [1, 1, 0, 0]);
    const beat1Y = useTransform(scrollYProgress, [0.10, 0.18], [0, -20]);

    // Beat 2: 15-30%
    const beat2Opacity = useTransform(scrollYProgress, [0.12, 0.18, 0.28, 0.35], [0, 1, 1, 0]);
    const beat2X = useTransform(scrollYProgress, [0.12, 0.18, 0.28, 0.35], [-48, 0, 0, -48]);

    // Beat 3: 30-45%
    const beat3Opacity = useTransform(scrollYProgress, [0.30, 0.35, 0.42, 0.48], [0, 1, 1, 0]);
    const beat3X = useTransform(scrollYProgress, [0.30, 0.35, 0.42, 0.48], [48, 0, 0, 48]);

    // Beat 4: 45-65%
    const beat4Opacity = useTransform(scrollYProgress, [0.45, 0.50, 0.60, 0.68], [0, 1, 1, 0]);
    const beat4X = useTransform(scrollYProgress, [0.45, 0.50, 0.60, 0.68], [-48, 0, 0, -48]);

    // Beat 5: 65-80%
    const beat5Opacity = useTransform(scrollYProgress, [0.62, 0.68, 0.76, 0.82], [0, 1, 1, 0]);
    const beat5X = useTransform(scrollYProgress, [0.62, 0.68, 0.76, 0.82], [48, 0, 0, 48]);

    // Beat 6: 80-100%
    const beat6Opacity = useTransform(scrollYProgress, [0.78, 0.85, 1], [0, 1, 1]);
    const beat6Y = useTransform(scrollYProgress, [0.78, 0.85], [20, 0]);

    // Annotations (active in beat 3-4, 30%-65%)
    const annotationsOpacity = useTransform(scrollYProgress, [0.30, 0.35, 0.60, 0.68], [0, 0.35, 0.35, 0]);

    // Ambient radial glow for hero (Beat 1 & 6)
    const glowOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.75, 0.85, 1], [1, 1, 0, 0, 1, 1]);

    // Grid background opacity (Peak explosion, Beat 4)
    const gridOpacity = useTransform(scrollYProgress, [0.45, 0.50, 0.60, 0.68], [0, 0.04, 0.04, 0]);

    return (
        <>
            {!isLoaded && (
                <div className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-600 ${showLoadingOut ? "opacity-0" : "opacity-100"}`}>
                    <div className="text-white font-medium text-lg tracking-widest mb-8 uppercase">LUMIX</div>
                    <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-4">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#004FD4] transition-all duration-100 ease-out"
                            style={{ width: `${loadProgress * 100}%` }}
                        />
                    </div>
                    <div className="text-[12px] font-mono text-white/30">Loading experience... {Math.round(loadProgress * 100)}%</div>
                </div>
            )}

            <div ref={containerRef} id="sticky-section" className="relative h-[500vh]" style={{ willChange: 'transform' }}>
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#060606]" style={{ transform: 'translateZ(0)' }}>

                    {/* Ambient Glow */}
                    <motion.div
                        style={{ opacity: glowOpacity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,79,212,0.06)_0%,transparent_70%)] pointer-events-none z-10"
                    />

                    {/* Canvas */}
                    <canvas ref={canvasRef} id="sequence-canvas" className="z-20"></canvas>

                    {/* Grid Overlay for Beat 4 */}
                    <motion.div style={{ opacity: gridOpacity }} className="crosshair-grid" />

                    {/* Storytelling Overlays */}
                    <div className="absolute inset-0 z-30 pointer-events-none layout-container flex flex-col justify-center px-8 md:px-16 lg:px-24">

                        {/* Beat 1: Hero */}
                        <motion.div
                            style={{ opacity: beat1Opacity, y: beat1Y }}
                            className="absolute left-4 right-4 md:left-0 md:right-0 bottom-8 md:bottom-[8%] flex flex-col items-center text-center"
                        >
                            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4">PANASONIC LUMIX S1H</motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="text-[38px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-6">Cinema in your hands.</motion.h1>
                            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }} className="text-white/55 text-[13px] md:text-[16px] lg:text-[18px] max-w-xl">
                                Full-frame mirrorless. 6K Cinema 4:2:2 10-bit.<br /> Built for filmmakers who refuse to compromise.
                            </motion.p>
                        </motion.div>

                        {/* Beat 2: Engineering Reveal */}
                        <motion.div
                            style={{ opacity: beat2Opacity, x: beat2X }}
                            className="absolute left-6 right-6 md:left-[10%] md:right-auto bottom-8 md:bottom-[8%] md:max-w-md"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">BODY ARCHITECTURE</div>
                            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold leading-[1.1] mb-6">Engineered for the<br /> uncompromising frame.</h2>
                            <p className="text-white/55 text-[14px] md:text-[17px] mb-4">
                                A precision-machined magnesium alloy chassis.<br />
                                Dust, splash, and freeze-resistant to –10°C.<br />
                                Built to survive the conditions your story demands.
                            </p>
                        </motion.div>

                        {/* Beat 3: Internal Systems Reveal */}
                        <motion.div
                            style={{ opacity: beat3Opacity, x: beat3X }}
                            className="absolute left-6 right-6 md:left-auto md:right-[10%] bottom-8 md:bottom-[8%] md:max-w-md text-right flex flex-col items-end"
                        >
                            <div className="text-[#F0A500] font-mono text-[12px] tracking-widest mb-4 uppercase">INTERNAL SYSTEMS</div>
                            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold leading-[1.1] mb-6">Every component,<br /> a deliberate choice.</h2>
                            <p className="text-white/55 text-[14px] md:text-[17px]">
                                Phase-hybrid autofocus wired directly into the sensor.<br />
                                Dual native ISO for shadow depth without penalty.<br />
                                A Venus Engine processor that never falls behind.
                            </p>
                        </motion.div>

                        {/* Beat 4: Peak Exploded */}
                        <motion.div
                            style={{ opacity: beat4Opacity, x: beat4X }}
                            className="absolute left-6 right-6 md:left-[10%] md:right-auto bottom-8 md:bottom-[8%] md:max-w-md"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">SENSOR TECHNOLOGY</div>
                            <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#C0C8D6]">
                                47.3 megapixels.<br /> Full-frame. Full truth.
                            </h2>
                            <p className="text-white/55 text-[11px] md:text-[13px] lg:text-[14px]">
                                A back-illuminated full-frame CMOS sensor with phase-hybrid AF covering the entire frame. 14 stops of dynamic range. Every shadow. Every highlight.<br /><br />
                                From 6K Cinema RAW to V-Log L — the S1H captures the world as your eye does.
                            </p>
                        </motion.div>

                        {/* Beat 5: AF & IBIS */}
                        <motion.div
                            style={{ opacity: beat5Opacity, x: beat5X }}
                            className="absolute left-6 right-6 md:left-auto md:right-[10%] bottom-8 md:bottom-[8%] md:max-w-md text-right flex flex-col items-end"
                        >
                            <div className="text-[#004FD4] font-mono text-[12px] tracking-widest mb-4 uppercase">INTELLIGENT AF · IBIS</div>
                            <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-bold leading-[1.1] mb-6">Autofocus that<br /> reads the scene.</h2>
                            <p className="text-white/55 text-[11px] md:text-[13px] lg:text-[14px] mb-4">
                                Phase-hybrid AF detects human eyes, animals, and moving subjects in real time — no hunting, no hesitation.
                            </p>
                            <p className="text-white/55 text-[11px] md:text-[13px] lg:text-[14px]">
                                5-axis Dual I.S. 2 — up to 6.5 stops of stabilization. Camera and lens working as one system.
                            </p>
                        </motion.div>

                        {/* Beat 6: Reassembly CTA */}
                        <motion.div
                            style={{ opacity: beat6Opacity, y: beat6Y }}
                            className="absolute left-4 right-4 md:left-0 md:right-0 bottom-8 md:bottom-[8%] flex flex-col items-center text-center pointer-events-auto"
                        >
                            <h2 className="text-[35px] md:text-[44px] lg:text-[52px] font-bold leading-tight mb-4">See everything.<br /> Miss nothing.</h2>
                        </motion.div>

                        {/* Beat 6: Floating Explore Button */}
                        <motion.div
                            style={{ opacity: beat6Opacity }}
                            className="fixed bottom-6 right-6 md:bottom-[32px] md:right-[32px] z-50 pointer-events-auto"
                        >
                            <div style={{ padding: '1px' }} className="rounded-full bg-gradient-to-r from-[#004FD4] to-[#0077FF] group cursor-pointer hover:shadow-[0_0_20px_rgba(0,119,255,0.4)] transition-all">
                                <a
                                    href="/specs"
                                    className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <span className="relative z-10 text-[14px] md:text-base text-white">Explore the Lumix S1H</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Technical Annotations (Beat 3 & 4) */}
                        <motion.div style={{ opacity: annotationsOpacity }} className="absolute inset-0 max-w-[1200px] mx-auto w-full pointer-events-none hidden md:block">
                            <div className="absolute top-[25%] left-[20%] text-[11px] font-mono text-white">MAIN PCB · Venus Engine <span className="block w-8 h-[1px] bg-white/20 mt-1" /></div>
                            <div className="absolute top-[30%] right-[20%] text-[11px] font-mono text-white text-right"><span className="block w-8 h-[1px] bg-white/20 mb-1 ml-auto" /> AF PROCESSOR</div>
                            <div className="absolute top-[50%] left-[10%] text-[11px] font-mono text-white">L-MOUNT SYSTEM <span className="block w-16 h-[1px] bg-white/20 mt-1" /></div>
                            <div className="absolute top-[50%] right-[10%] text-[11px] font-mono text-white text-right"><span className="block w-16 h-[1px] bg-white/20 mb-1 ml-auto" /> L-MOUNT SYSTEM</div>
                            <div className="absolute bottom-[40%] left-[30%] text-[11px] font-mono text-[#F0A500]">FPC RIBBON · BSI CMOS LINK</div>
                            <div className="absolute top-[45%] left-[42%] text-[11px] font-mono text-[#C0C8D6]">BSI CMOS · Full-Frame 35mm</div>
                            <div className="absolute bottom-[20%] left-[45%] text-[11px] font-mono text-white">TRIPOD MOUNT · 1/4&quot; ARCA</div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </>
    );
}
