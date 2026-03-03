"use client";

import { useRef, useEffect, useState } from "react";

export default function ImageQualityVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const timerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        function formatTime(sec: number) {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60);
            const fr = Math.floor((sec % 1) * 30);
            return [m, s, fr].map(n => String(n).padStart(2, '0')).join(':');
        }

        const onTimeUpdate = () => {
            if (timerRef.current) {
                timerRef.current.textContent = formatTime(video.currentTime);
            }
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        const onEnded = () => {
            video.currentTime = 0;
            video.play().catch(() => { });
        };

        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onEnded);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('ended', onEnded);
            observer.disconnect();
        };
    }, []);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    };

    const stopVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
        if (timerRef.current) {
            timerRef.current.textContent = '00:00:00';
        }
        setIsPlaying(false);
    };

    return (
        <section id="iq-video-section" style={{ background: '#060606', padding: '100px 0 0 0' }}>

            {/* Eyebrow + Headline */}
            <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 32px' }}>
                <p className="reveal-up" style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#004FD4',
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    margin: '0 0 16px 0'
                }}>Image Quality</p>

                <h2 className="reveal-up" style={{
                    fontFamily: "'SF Pro Display', 'DM Sans', -apple-system, sans-serif",
                    fontSize: 'clamp(32px, 5.5vw, 72px)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                    margin: 0
                }}>See everything.<br />Miss nothing.</h2>
            </div>

            {/* Video player — full width, no padding */}
            <div id="iq-player-wrap" style={{ position: 'relative', width: '100%', background: '#000', overflow: 'hidden' }}>
                <video
                    ref={videoRef}
                    id="iq-video"
                    src="/project6/video.mp4"
                    muted
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                />

                {/* Timer pill */}
                <div ref={timerRef} id="iq-timer" style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#004FD4',
                    color: '#ffffff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '6px 18px',
                    borderRadius: '980px',
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>00:00:00</div>

                {/* Right-side control pill */}
                <div style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '48px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}>
                    {/* Stop button */}
                    <button onClick={stopVideo} style={{
                        width: '44px', height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s ease'
                    }} title="Stop"
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="3" y="3" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.9)" />
                        </svg>
                    </button>

                    {/* Play/Pause button */}
                    <button onClick={togglePlayPause} style={{
                        width: '44px', height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s ease'
                    }} title="Play / Pause"
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                    >
                        {isPlaying ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="3" y="2" width="4" height="12" rx="1.5" fill="rgba(255,255,255,0.9)" />
                                <rect x="9" y="2" width="4" height="12" rx="1.5" fill="rgba(255,255,255,0.9)" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <polygon points="4,2 14,8 4,14" fill="rgba(255,255,255,0.9)" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Bottom-right circular play button */}
                <button onClick={togglePlayPause} style={{
                    position: 'absolute',
                    bottom: '20px', right: '24px',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.35)',
                    border: '1.5px solid rgba(255,255,255,0.60)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, transform 0.2s'
                }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; e.currentTarget.style.transform = ''; }}
                >
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="2" y="1" width="4" height="12" rx="1.5" fill="rgba(255,255,255,0.88)" />
                            <rect x="8" y="1" width="4" height="12" rx="1.5" fill="rgba(255,255,255,0.88)" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <polygon points="3,1 13,7 3,13" fill="rgba(255,255,255,0.88)" />
                        </svg>
                    )}
                </button>

                {/* Bottom-left caption */}
                <p style={{
                    position: 'absolute',
                    bottom: '16px', left: '20px',
                    fontFamily: "'SF Pro Text', 'DM Sans', -apple-system, sans-serif",
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.55)',
                    margin: 0,
                    pointerEvents: 'none',
                    letterSpacing: '0.02em'
                }}>Filmed with Lumix S1H &nbsp;<span style={{ color: '#004FD4' }}>#LumixS1H</span></p>

            </div>

            {/* Body copy below video */}
            <div style={{ maxWidth: '680px', margin: '52px auto 100px', padding: '0 32px', textAlign: 'center' }}>
                <p className="reveal-up" style={{
                    fontFamily: "'SF Pro Text', 'DM Sans', -apple-system, sans-serif",
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.75,
                    margin: '0 0 24px 0'
                }}>
                    The Lumix S1H sets a new standard for
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>cinematic mirrorless recording</strong>{' '}
                    — with a full-frame BSI CMOS sensor that captures
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>14+ stops of dynamic range</strong>{' '}
                    and dual native ISO circuits that keep noise invisible, even in near darkness.
                </p>
                <p className="reveal-up" style={{
                    fontFamily: "'SF Pro Text', 'DM Sans', -apple-system, sans-serif",
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.75,
                    margin: 0
                }}>
                    Record unlimited
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>6K Cinema 4:2:2 10-bit</strong>{' '}
                    internally. Grade in V-Log/V-Gamut for a billion possible colours.
                    The only mirrorless camera approved for
                    {' '}<strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>Netflix original production.</strong>
                </p>
            </div>

        </section>
    );
}
