"use client";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartSidebar() {
    const { cartItems, setCartItems, cartOpen, setCartOpen } = useContext(CartContext);

    return (
        <>
            {/* Cart sidebar component */}
            <div style={{
                position: 'fixed',
                top: 0, right: cartOpen ? 0 : '-420px',
                width: '420px', height: '100vh',
                background: '#0f0f0f',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                zIndex: 1000,
                transition: 'right 0.45s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', flexDirection: 'column',
                padding: '32px',
                boxSizing: 'border-box',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{
                        fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                        fontSize: '22px', fontWeight: '700',
                        color: 'rgba(255,255,255,0.92)', margin: 0,
                        letterSpacing: '-0.03em',
                    }}>My Bag</h2>
                    <button onClick={() => setCartOpen(false)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.6)', fontSize: '24px', lineHeight: 1,
                    }}>×</button>
                </div>

                {/* Cart items or empty state */}
                {cartItems.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'SF Pro Text',sans-serif", fontSize: '15px', margin: 0 }}>Your bag is empty</p>
                    </div>
                ) : (
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {cartItems.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '16px', alignItems: 'center',
                                padding: '20px 0',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <img src={item.image} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: 'rgba(255,255,255,0.88)', fontFamily: "'SF Pro Display',sans-serif", fontWeight: '600', fontSize: '15px', margin: '0 0 4px 0' }}>{item.name}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'SF Pro Text',sans-serif", fontSize: '13px', margin: 0 }}>{item.variant}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'SF Pro Display',sans-serif", fontWeight: '600', fontSize: '15px', margin: '8px 0 0 0' }}>{item.price}</p>
                                </div>
                                <button onClick={() => setCartItems(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Checkout button */}
                {cartItems.length > 0 && (
                    <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'SF Pro Text',sans-serif", fontSize: '15px' }}>Subtotal</span>
                            <span style={{ color: 'rgba(255,255,255,0.88)', fontFamily: "'SF Pro Display',sans-serif", fontWeight: '600', fontSize: '15px' }}>
                                ₹{cartItems.reduce((sum, item) => sum + item.priceNum, 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <button style={{
                            width: '100%', padding: '16px',
                            background: '#004FD4', color: '#fff',
                            border: 'none', borderRadius: '12px',
                            fontFamily: "'SF Pro Display',sans-serif",
                            fontSize: '16px', fontWeight: '600',
                            cursor: 'pointer', letterSpacing: '-0.01em',
                            transition: 'background 0.2s ease',
                        }}>Checkout</button>
                    </div>
                )}
            </div>

            {/* Overlay behind cart */}
            {cartOpen && (
                <div onClick={() => setCartOpen(false)} style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 999,
                    backdropFilter: 'blur(4px)',
                }} />
            )}
        </>
    );
}
