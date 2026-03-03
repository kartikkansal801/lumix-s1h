"use client";

import React from "react";

export default function Footer() {
    return (
        <footer style={{
            background: '#060606',
            padding: '80px 64px 40px',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Top grid — 4 columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '48px',
                    margin: '0 0 64px 0',
                }}>
                    {[
                        {
                            heading: 'Shop',
                            links: ['Lumix S1H', 'Lumix S5 II', 'Lumix GH6', 'All Cameras', 'Lenses', 'Accessories'],
                        },
                        {
                            heading: 'Support',
                            links: ['Online Help', 'Warranty', 'Firmware Updates', 'Find a Service Centre', 'Contact Us'],
                        },
                        {
                            heading: 'Learn',
                            links: ['Tutorials', 'Sample Gallery', 'Press Kit', 'Comparison', 'FAQ'],
                        },
                        {
                            heading: 'Company',
                            links: ['About Panasonic', 'Newsroom', 'Careers', 'Sustainability', 'Privacy Policy'],
                        },
                    ].map(col => (
                        <div key={col.heading}>
                            <p style={{
                                fontFamily: "'SF Pro Display',sans-serif",
                                fontSize: '13px', fontWeight: '700',
                                color: 'rgba(255,255,255,0.88)',
                                margin: '0 0 20px 0',
                                letterSpacing: '-0.01em',
                            }}>{col.heading}</p>
                            {col.links.map(link => (
                                <a key={link} href="#" style={{
                                    display: 'block',
                                    fontFamily: "'SF Pro Text',sans-serif",
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.40)',
                                    textDecoration: 'none',
                                    marginBottom: '12px',
                                    transition: 'color 0.2s',
                                }}
                                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.80)'}
                                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.40)'}
                                >{link}</a>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Bottom row — legal */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '24px',
                }}>
                    {/* Left — legal notes*/}
                    <div style={{ maxWidth: '600px' }}>
                        {[
                            '* Quoted MRP is inclusive of all applicable taxes. Prices subject to change without notice.',
                            '* Actual product appearance may differ slightly from illustrations provided.',
                            '* Features, specifications, weight and price are subject to change without prior notice.',
                            '* Netflix approval applies to specific firmware versions. Consult Panasonic for current status.',
                            '* Battery life estimates based on CIPA standard measurements. Actual results may vary.',
                        ].map((note, i) => (
                            <p key={i} style={{
                                fontFamily: "'SF Pro Text',sans-serif",
                                fontSize: '11px',
                                color: 'rgba(255,255,255,0.22)',
                                lineHeight: 1.7, margin: '0 0 4px 0',
                            }}>{note}</p>
                        ))}
                    </div>

                    {/* Right — copyright + social */}
                    <div style={{ textAlign: 'right' }}>
                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginBottom: '20px' }}>
                            <a href="#" style={{ color: 'rgba(255,255,255,0.40)', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.40)'}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="#" style={{ color: 'rgba(255,255,255,0.40)', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.40)'}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                            </a>
                            <a href="#" style={{ color: 'rgba(255,255,255,0.40)', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.40)'}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div>
                        <p style={{
                            fontFamily: "'SF Pro Text',sans-serif",
                            fontSize: '11px', color: 'rgba(255,255,255,0.22)',
                            margin: 0,
                        }}>Copyright © 2025 Panasonic Corporation. All rights reserved.</p>
                        <p style={{
                            fontFamily: "'SF Pro Text',sans-serif",
                            fontSize: '11px', color: 'rgba(255,255,255,0.22)',
                            margin: '4px 0 0 0',
                        }}>
                            <a href="#" style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}>Terms of Use</a>
                            {' · '}
                            <a href="#" style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}>Privacy Policy</a>
                            {' · '}
                            <a href="#" style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}>Cookie Settings</a>
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
