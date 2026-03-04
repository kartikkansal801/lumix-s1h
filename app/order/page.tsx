"use client";

import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import { BadgePercent, BadgeCheck, Truck, ShieldCheck, ChevronDown, ChevronRight, AlertCircle, Camera, ChevronUp, Film, Aperture, Palette, Wind, Activity, Shield, ChevronLeft } from "lucide-react";

const VARIANTS = [
    { label: 'Body Only', price: 249990, priceDisplay: '₹2,49,990' },
    { label: 'With 24-105mm Lens', price: 379990, priceDisplay: '₹3,79,990' },
];

const ACCESSORIES = [
    { name: 'DMW-BLJ31 Battery', price: 8990, priceDisplay: '₹8,990', image: '/project5/1.jpg' },
    { name: 'DMW-BTC15 Charger', price: 5990, priceDisplay: '₹5,990', image: '/project5/2.png' },
    { name: 'Shoulder Strap DMW-SSDC', price: 2990, priceDisplay: '₹2,990', image: '/project5/3.jpg' },
];

export default function OrderPage() {
    const { addToCart } = useContext(CartContext);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedAccessories, setSelectedAccessories] = useState<typeof ACCESSORIES>([]);

    // Auto-sliding image carousel state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        '/project9/Whisk_0ee58d8ba7a8cc6b275447e55a0ed358dr(1).png',
        '/project9/Whisk_73dc9cfafc2b0c2af284ed9cab39aa42dr(1).png',
        '/project9/Whisk_e4aa15e4d710733a5864df08488af52adr.png'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div style={{ background: '#060606', minHeight: '100vh' }}>
            <Navbar />

            {/* spacer to prevent overlap with sticky nav headers */}
            <div style={{ paddingTop: '64px' }}></div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-16 pt-8 pb-16 md:pt-[100px] md:pb-[120px] grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-[80px] items-start">

                {/* LEFT — Product image carousel */}
                <div className="lg:sticky lg:top-[120px]">

                    <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden group border border-white/5 bg-white/[0.01]">
                        <img
                            src={images[currentImageIndex]}
                            alt="Lumix S1H View"
                            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                        />

                        {/* Manual Controls */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors"
                            >
                                <ChevronLeft size={20} className="mr-0.5" />
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors"
                            >
                                <ChevronRight size={20} className="ml-0.5" />
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-white w-5' : 'bg-white/40 w-1.5 hover:bg-white/60'}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thumbnail strip */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        {images.map((src, i) => (
                            <img
                                key={i}
                                onClick={() => setCurrentImageIndex(i)}
                                src={src}
                                style={{
                                    width: '80px', height: '80px',
                                    borderRadius: '12px', objectFit: 'cover',
                                    border: `1.5px solid ${i === currentImageIndex ? '#004FD4' : 'rgba(255,255,255,0.08)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: i === currentImageIndex ? 1 : 0.6,
                                }}
                                className="hover:opacity-100 bg-white/[0.02]"
                                alt={`Thumbnail ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT — Scrolling config panel */}
                <div>

                    {/* Eyebrow */}
                    <p style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: '11px', fontWeight: 700, color: '#004FD4',
                        letterSpacing: '0.20em', textTransform: 'uppercase',
                        margin: '0 0 12px 0',
                    }}>Panasonic</p>

                    {/* Product name */}
                    <h1 style={{
                        fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                        fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700,
                        color: 'rgba(255,255,255,0.92)',
                        letterSpacing: '-0.04em', lineHeight: 1.06,
                        margin: '0 0 8px 0',
                    }}>Lumix S1H</h1>

                    <p style={{
                        fontFamily: "'SF Pro Text',sans-serif",
                        fontSize: '14px', color: 'rgba(255,255,255,0.40)',
                        margin: '0 0 32px 0',
                    }}>Cinema Full-Frame Mirrorless</p>

                    {/* Price */}
                    <p style={{
                        fontFamily: "'SF Pro Display',sans-serif",
                        fontSize: '28px', fontWeight: 700,
                        color: 'rgba(255,255,255,0.92)',
                        letterSpacing: '-0.03em',
                        margin: '0 0 32px 0',
                    }}>
                        {VARIANTS[selectedVariant].priceDisplay}
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 400, marginLeft: '8px' }}>
                            incl. taxes
                        </span>
                    </p>

                    {/* Other Offers Section */}
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 mb-8">
                        <div className="flex items-center gap-2.5 mb-4">
                            <BadgePercent className="text-[#c83728] shrink-0 fill-[#c83728]/20" size={20} />
                            <h3 className="font-sans text-[17px] font-semibold text-[#c83728] m-0">
                                Other Offers
                            </h3>
                        </div>
                        <ul className="list-disc pl-5 m-0 space-y-3 text-white/75 font-sans text-[14px] leading-[1.6] marker:text-[#c83728]">
                            <li>
                                Avail Low Cost EMI on select Credit Cards for orders above ₹5000. <a href="#" className="text-[#004FD4] hover:underline underline-offset-2">To Know More !</a>
                            </li>
                            <li>
                                2 Years Standard Warranty + 1 Year Additional Warranty only upon registration at <a href="https://panasonic.com/in/support" target="_blank" rel="noreferrer" className="text-[#004FD4] hover:underline underline-offset-2">panasonic.com/in/support</a>
                            </li>
                        </ul>
                    </div>

                    {/* Variant selector */}
                    <div style={{ marginBottom: '28px' }}>
                        <p style={{
                            fontFamily: "'SF Pro Text',sans-serif",
                            fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                            textTransform: 'uppercase', letterSpacing: '0.12em',
                            margin: '0 0 12px 0',
                        }}>Configuration</p>
                        {VARIANTS.map((v, i) => (
                            <div key={i} onClick={() => setSelectedVariant(i)} style={{
                                padding: '14px 18px',
                                border: `1.5px solid ${selectedVariant === i ? '#004FD4' : 'rgba(255,255,255,0.10)'}`,
                                borderRadius: '12px', cursor: 'pointer',
                                marginBottom: '10px',
                                background: selectedVariant === i ? 'rgba(0,79,212,0.08)' : 'transparent',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                transition: 'border-color 0.2s, background 0.2s',
                            }}>
                                <span style={{ fontFamily: "'SF Pro Text',sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                                    {v.label}
                                </span>
                                <span style={{ fontFamily: "'SF Pro Display',sans-serif", fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                                    {v.priceDisplay}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Delivery Details */}
                    <div className="mb-10">
                        <h3 className="font-sans text-[18px] font-semibold text-white/90 mb-4">Delivery Details</h3>
                        <div className="flex items-center justify-between border border-white/15 rounded-xl p-4 bg-white/[0.02] cursor-text hover:border-white/30 transition-colors">
                            <span className="font-sans text-[15px] text-white/40">Enter PIN Code</span>
                            <ChevronRight className="text-white/40" size={20} />
                        </div>
                    </div>

                    {/* Exchange Option */}
                    <div className="mb-10">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-sans text-[18px] font-semibold text-white/90">Exchange</h3>
                            <button className="text-[13px] font-sans font-medium text-white/60 hover:text-white underline underline-offset-2 transition-colors">Learn more</button>
                        </div>
                        <p className="font-sans text-[14px] text-white/50 mb-5">
                            Get up to ₹45,000.00* additional value when you exchange your old camera or lens
                        </p>

                        {/* Alert Box */}
                        <div className="bg-[#004FD4]/10 border border-[#004FD4]/20 rounded-lg py-2.5 px-3.5 flex items-center gap-2 mb-4">
                            <AlertCircle className="text-[#004FD4]" size={16} />
                            <span className="font-sans text-[13px] font-medium tracking-wide text-[#004FD4]">Please choose an option</span>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] cursor-pointer hover:border-white/30 transition-colors flex flex-col justify-between min-h-[85px] relative">
                                <span className="font-sans text-[15px] text-white/90 font-medium">Yes, please</span>
                                <div className="text-right flex flex-col items-end absolute bottom-3 right-4">
                                    <span className="font-sans text-[11px] text-white/40 uppercase tracking-widest mb-0.5">Save up to</span>
                                    <span className="font-sans text-[14px] text-[#004FD4] font-medium tracking-wide leading-none">₹45,000.00</span>
                                </div>
                            </div>
                            <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] cursor-pointer hover:border-white/30 transition-colors flex items-center min-h-[85px]">
                                <span className="font-sans text-[15px] text-white/90 font-medium">No, thanks</span>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004FD4] to-[#0077FF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,79,212,0.3)]">
                                <Camera className="text-white" size={18} />
                            </div>
                            <div>
                                <h4 className="font-sans text-[14px] font-medium text-white/90 mb-1.5">How does the trade-in program work?</h4>
                                <p className="font-sans text-[13px] text-white/40 leading-relaxed mb-3">
                                    Our evaluation partners offer a quick and easy way to transfer value from your old gear onto your new Lumix S1H right at your doorstep.
                                </p>
                                <p className="font-sans text-[11px] text-white/30">
                                    *Terms and Conditions apply. Please visit the Trade-In page for more information.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Add to Bag button */}
                    <button onClick={() => addToCart({
                        name: 'Lumix S1H',
                        variant: VARIANTS[selectedVariant].label,
                        price: VARIANTS[selectedVariant].priceDisplay,
                        priceNum: VARIANTS[selectedVariant].price,
                        image: '/project5/1.jpg',
                    })} style={{
                        width: '100%', padding: '17px',
                        background: '#004FD4', color: '#fff',
                        border: 'none', borderRadius: '14px',
                        fontFamily: "'SF Pro Display',sans-serif",
                        fontSize: '17px', fontWeight: 600,
                        cursor: 'pointer', letterSpacing: '-0.01em',
                        marginBottom: '12px',
                        transition: 'background 0.2s ease, transform 0.1s ease',
                    }}
                        onMouseEnter={e => (e.target as HTMLElement).style.background = '#0040a8'}
                        onMouseLeave={e => (e.target as HTMLElement).style.background = '#004FD4'}
                    >Add to Bag</button>

                    {/* Check availability */}
                    <button style={{
                        width: '100%', padding: '17px',
                        background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)',
                        border: '1.5px solid rgba(255,255,255,0.10)', borderRadius: '14px',
                        fontFamily: "'SF Pro Display',sans-serif",
                        fontSize: '17px', fontWeight: 600,
                        cursor: 'pointer', letterSpacing: '-0.01em',
                        transition: 'background 0.2s ease',
                    }}>Find a Retailer</button>

                    {/* EMI note */}
                    <p style={{
                        fontFamily: "'SF Pro Text',sans-serif",
                        fontSize: '12px', color: 'rgba(255,255,255,0.30)',
                        textAlign: 'center', marginTop: '16px', lineHeight: 1.6,
                    }}>
                        From ₹20,832/mo. for 12 months with No Cost EMI.<br />
                        Free delivery on all orders above ₹10,000.
                    </p>

                    {/* Divider */}
                    <div style={{ height: '0px', margin: '28px 0' }} />

                    {/* Add-on accessories */}
                    <p style={{
                        fontFamily: "'SF Pro Text',sans-serif",
                        fontSize: '12px', color: 'rgba(255,255,255,0.45)',
                        textTransform: 'uppercase', letterSpacing: '0.12em',
                        margin: '0 0 16px 0',
                    }}>Add Accessories</p>

                    {ACCESSORIES.map((acc, i) => {
                        const selected = selectedAccessories.some(a => a.name === acc.name);
                        return (
                            <div key={i} onClick={() => {
                                if (selected) setSelectedAccessories(prev => prev.filter(a => a.name !== acc.name));
                                else setSelectedAccessories(prev => [...prev, acc]);
                            }} style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                padding: '12px', borderRadius: '12px',
                                border: `1.5px solid ${selected ? '#004FD4' : 'rgba(255,255,255,0.08)'}`,
                                background: selected ? 'rgba(0,79,212,0.06)' : 'transparent',
                                cursor: 'pointer', marginBottom: '10px',
                                transition: 'border-color 0.2s, background 0.2s',
                            }}>
                                <div style={{
                                    width: '18px', height: '18px',
                                    borderRadius: '50%',
                                    border: `2px solid ${selected ? '#004FD4' : 'rgba(255,255,255,0.25)'}`,
                                    background: selected ? '#004FD4' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {selected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "'SF Pro Text',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.80)', margin: 0 }}>{acc.name}</p>
                                </div>
                                <span style={{ fontFamily: "'SF Pro Display',sans-serif", fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.50)' }}>{acc.priceDisplay}</span>
                            </div>
                        );
                    })}

                    {/* Divider before new sections */}
                    <div className="h-0 my-8" />

                    {/* Warranty Box */}
                    <div className="border border-white/15 rounded-xl p-5 mb-4 bg-white/[0.02]">
                        <p className="font-sans text-[13px] text-white/50 mb-3 border-b border-white/10 pb-3">
                            Warranty
                        </p>
                        <p className="font-sans text-[15px] font-semibold text-white/90 m-0">
                            2 Years warranty provided by the manufacturer from date of purchase
                        </p>
                    </div>

                    {/* Manufacturing & Packaging details collapsible */}
                    <div className="border border-white/15 rounded-xl p-5 mb-8 bg-white/[0.02] flex items-center justify-between cursor-pointer group hover:bg-white/[0.04] transition-colors">
                        <p className="font-sans text-[15px] text-white/80 m-0">
                            Manufacturing & Packaging details
                        </p>
                        <ChevronDown className="text-white/40 group-hover:text-white/80 transition-colors" size={20} />
                    </div>

                    {/* Horizontal Divider */}
                    <div className="h-0 mb-8" />

                    {/* Trust Badges cluster */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col items-center text-center gap-3">
                            <BadgeCheck className="text-white/70" size={32} strokeWidth={1.5} />
                            <p className="font-sans text-[13px] text-white/80 m-0 leading-tight">100% Genuine Product</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <Truck className="text-white/70" size={32} strokeWidth={1.5} />
                            <p className="font-sans text-[13px] text-white/80 m-0 leading-tight">Quick Shipping</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <ShieldCheck className="text-white/70" size={32} strokeWidth={1.5} />
                            <p className="font-sans text-[13px] text-white/80 m-0 leading-tight">100% Secure Payments</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Key Features Full Width */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-16 pb-24">
                <div className="flex justify-between items-center mb-10 pb-6">
                    <h2 className="font-sans text-[24px] font-bold tracking-tight text-white/90 m-0">Key Features</h2>
                    <ChevronUp className="text-white/60 cursor-pointer" size={24} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {/* Feature 1 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Film className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">6K Cinematic Video</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                Uncompromised 6K/24p and 5.9K/30p video recording. Capture more data than ever before with full-frame recording tailored for high-end cinema.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Aperture className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Dual Native ISO</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                A revolutionary sensor design minimises noise and maximises image quality from low to high sensitivity. Experience pristine footage even in extreme low-light.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Palette className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">14+ Stops V-Log</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                Enjoy 14+ stops of dynamic range, rivalling high-end cinema cameras. Capture accurate colour reproduction and subtle gradations from dark to light.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Wind className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Unlimited Recording Time</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                A built-in cooling fan ensures thermal management is never an issue. The S1H supports unlimited video recording in all modes without overheating.
                            </p>
                        </div>
                    </div>

                    {/* Feature 5 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Activity className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">5-Axis Dual I.S. 2</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                Shoot handheld with confidence. Our advanced stabilization system offers up to 6.5 stops of compensation, letting you achieve smooth footage anywhere.
                            </p>
                        </div>
                    </div>

                    {/* Feature 6 */}
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                            <Shield className="text-white/80" strokeWidth={1.5} size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Weather-Sealed Design</h4>
                            <p className="font-sans text-[14px] text-white/50 leading-[1.6]">
                                Built for professionals. The rugged, splash, dust, and freeze-resistant body is designed to withstand the harshest shooting environments down to -10°C.
                            </p>
                        </div>
                    </div>
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-12">
                    <button className="flex items-center gap-2 border border-white/20 rounded-full px-6 py-2.5 hover:bg-white/[0.05] transition-colors">
                        <span className="font-sans text-[13px] font-medium text-white/80">View more</span>
                        <ChevronUp className="text-white/60 rotate-45" size={16} />
                    </button>
                </div>
            </div>

            <ReviewsSection />

            <Footer />
        </div>
    );
}
