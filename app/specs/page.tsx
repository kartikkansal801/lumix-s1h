"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, Truck, MessageCircle } from "lucide-react";

const SPECS = [
    {
        category: 'Sensor',
        items: [
            { label: 'Type', value: '35mm Full-Frame BSI CMOS' },
            { label: 'Resolution', value: '24.2 Megapixels (effective)' },
            { label: 'Aspect Ratio', value: '3:2' },
            { label: 'Sensor Size', value: '35.6 × 23.8mm' },
            { label: 'ISO Range', value: '100–51,200 (extendable to 204,800)' },
            { label: 'Dual Native ISO', value: 'ISO 640 / ISO 4000' },
            { label: 'Dynamic Range', value: '14+ stops (V-Log/V-Gamut)' },
        ]
    },
    {
        category: 'Video',
        items: [
            { label: 'Maximum Resolution', value: '6K (5952 × 3968) at 24/25fps' },
            { label: 'Cinema 4K (C4K)', value: '4096 × 2160 up to 60fps' },
            { label: '4K UHD', value: '3840 × 2160 up to 60fps' },
            { label: 'Slow Motion', value: '180fps at FHD (1080p)' },
            { label: 'Colour Sampling', value: '4:2:2 10-bit (internal)' },
            { label: 'Log Profiles', value: 'V-Log L, HLG (Hybrid Log Gamma)' },
            { label: 'Anamorphic', value: '4K 4:3 (1.33×, 1.5×, 2.0×)' },
            { label: 'Recording Limit', value: 'Unlimited (with cooling)' },
            { label: 'Netflix Approved', value: 'Yes — approved for Netflix Originals' },
        ]
    },
    {
        category: 'Autofocus',
        items: [
            { label: 'System', value: 'DFD (Depth From Defocus) Contrast AF' },
            { label: 'Phase Detection', value: 'Phase-Hybrid AF' },
            { label: 'AF Points', value: '225 areas' },
            { label: 'Eye/Face Detection', value: 'Yes (Human, Animal)' },
            { label: 'AF Speed', value: '0.08 sec (wide)' },
        ]
    },
    {
        category: 'Stabilisation',
        items: [
            { label: 'In-Body (IBIS)', value: '5-Axis Dual I.S. 2' },
            { label: 'Effectiveness', value: 'Up to 6.5 stops' },
            { label: 'Modes', value: 'Normal, Anamorphic 1.1×, 2×, 3×, 4×' },
            { label: 'E-Stabilisation', value: 'Yes (Hybrid stabilisation)' },
        ]
    },
    {
        category: 'Viewfinder & Display',
        items: [
            { label: 'EVF Type', value: 'OLED' },
            { label: 'EVF Resolution', value: '5,760,000 dots' },
            { label: 'EVF Magnification', value: '0.78× (35mm equiv.)' },
            { label: 'Rear Display', value: '3.0" Free-angle TFT touch LCD' },
            { label: 'Display Resolution', value: '1,840,000 dots' },
        ]
    },
    {
        category: 'High Resolution',
        items: [
            { label: 'Mode', value: 'High Resolution Mode (sensor shift)' },
            { label: 'Output Resolution', value: '96MP (12,000 × 8,000px)' },
            { label: 'RAW Output', value: 'Yes (.RW2)' },
            { label: 'Frames Composited', value: '8 frames' },
        ]
    },
    {
        category: 'Connectivity',
        items: [
            { label: 'Card Slots', value: 'Dual UHS-II SD card slots' },
            { label: 'HDMI', value: 'Type-A full-size (6K RAW out)' },
            { label: 'USB', value: 'USB-C 3.1 Gen1 (power delivery)' },
            { label: 'Headphone', value: '3.5mm jack' },
            { label: 'Microphone', value: '3.5mm jack' },
            { label: 'Flash Sync', value: 'PC Sync terminal' },
            { label: 'Wi-Fi', value: '2.4GHz / 5GHz' },
            { label: 'Bluetooth', value: '4.2 LE' },
        ]
    },
    {
        category: 'Build',
        items: [
            { label: 'Body Material', value: 'Magnesium alloy' },
            { label: 'Weather Sealing', value: 'Dust & splash resistant, freeze-proof to –10°C' },
            { label: 'Mount', value: 'L-Mount (Leica / Sigma / Panasonic)' },
            { label: 'Shutter Speeds', value: '60 – 1/8000 sec (mechanical), 1/16000 (electronic)' },
            { label: 'Burst Rate', value: '9fps (AFS), 6fps (AFC)' },
            { label: 'Battery', value: 'DMW-BLJ31 (approx. 360 shots per charge)' },
            { label: 'Weight', value: '1013g (body only, with battery and card)' },
            { label: 'Dimensions', value: '151.0 × 114.2 × 96.0mm' },
        ]
    },
    {
        category: 'In the Box',
        items: [
            { label: 'Included', value: 'Camera body, Battery (DMW-BLJ31), Battery charger (DMW-BTC13), DC coupler (DMW-DCC17), Shoulder strap, Body cap, Hot shoe cover, USB cable' },
        ]
    },
];

export default function SpecsPage() {
    return (
        <div style={{ background: '#060606', minHeight: '100vh', color: '#fff' }}>
            <Navbar />

            {/* Hero header */}
            <div className="pt-24 pb-12 px-6 md:pt-[120px] md:pb-[80px] md:px-[64px] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-[80px]">
                {/* Text Side */}
                <div style={{ flex: 1 }}>
                    <p style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: '11px', fontWeight: '700', color: '#004FD4',
                        letterSpacing: '0.20em', textTransform: 'uppercase',
                        margin: '0 0 16px 0',
                    }}>Technical Specifications</p>
                    <h1 style={{
                        fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                        fontSize: 'clamp(40px,5vw,72px)', fontWeight: '700',
                        letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0,
                        color: 'rgba(255,255,255,0.92)',
                    }}>Lumix S1H</h1>
                    <p style={{
                        fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif",
                        fontSize: '17px', color: 'rgba(255,255,255,0.45)',
                        marginTop: '16px',
                    }}>Cinema Full-Frame Mirrorless Camera</p>
                </div>

                {/* Image Side */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <img
                        src="/project8/8096354313.jpg_1_-removebg-preview(1).png"
                        alt="Lumix S1H Camera"
                        style={{
                            maxWidth: '460px', width: '100%', height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                        }}
                    />
                </div>
            </div>

            {/* Two-column layout: sidebar + content */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-[80px] p-6 md:p-[64px] md:pb-[120px] items-start">

                {/* Sticky sidebar — category jump links */}
                <div className="md:sticky md:top-[80px] flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-6 md:gap-0 pb-4 md:pb-0 hide-scrollbar">
                    {SPECS.map(s => (
                        <a key={s.category} href={`#spec-${s.category.toLowerCase().replace(/\s+/g, '-')}`} className="whitespace-nowrap md:whitespace-normal block font-sans text-[13px] text-white/45 no-underline py-2 md:py-2 md:pl-4 border-b-2 md:border-b-0 md:border-l-2 border-white/10 transition-colors"
                            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; e.currentTarget.style.borderColor = '#004FD4'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        >{s.category}</a>
                    ))}
                </div>

                {/* Spec content */}
                <div>
                    {SPECS.map(section => (
                        <div key={section.category} id={`spec-${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                            style={{ marginBottom: '64px' }}
                        >
                            <h2 style={{
                                fontFamily: "'SF Pro Display','DM Sans',-apple-system,sans-serif",
                                fontSize: '22px', fontWeight: '700',
                                color: 'rgba(255,255,255,0.92)',
                                letterSpacing: '-0.03em', margin: '0 0 24px 0',
                                paddingBottom: '16px',
                            }}>{section.category}</h2>

                            {section.items.map((item, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 py-4">
                                    <span style={{
                                        fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif",
                                        fontSize: '14px', color: 'rgba(255,255,255,0.40)',
                                    }}>{item.label}</span>
                                    <span style={{
                                        fontFamily: "'SF Pro Text','DM Sans',-apple-system,sans-serif",
                                        fontSize: '14px', color: 'rgba(255,255,255,0.82)',
                                        lineHeight: '1.6',
                                    }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Apple-style Support & Buy section */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-16 pb-16 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                    {/* Block 1 */}
                    <div className="flex flex-col items-center">
                        <Store size={36} strokeWidth={1.5} className="text-white/80 mb-4" />
                        <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Ways to buy</h4>
                        <p className="font-sans text-[14px] text-white/60 mb-3 leading-relaxed">
                            Choose the way that&apos;s<br />right for you.
                        </p>
                        <a href="#" className="font-sans text-[13px] text-[#004FD4] hover:underline hover:text-[#005aed] transition-colors">
                            Find a Retailer &gt;
                        </a>
                    </div>

                    {/* Block 2 */}
                    <div className="flex flex-col items-center">
                        <Truck size={36} strokeWidth={1.5} className="text-white/80 mb-4" />
                        <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Free delivery and pickup</h4>
                        <p className="font-sans text-[14px] text-white/60 mb-3 leading-relaxed">
                            Get free delivery or pickup<br />at your local Lumix PRO dealer.
                        </p>
                        <a href="#" className="font-sans text-[13px] text-[#004FD4] hover:underline hover:text-[#005aed] transition-colors">
                            Learn more &gt;
                        </a>
                    </div>

                    {/* Block 3 */}
                    <div className="flex flex-col items-center">
                        <MessageCircle size={36} strokeWidth={1.5} className="text-white/80 mb-4" />
                        <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">Get help buying</h4>
                        <p className="font-sans text-[14px] text-white/60 mb-3 leading-relaxed">
                            Have a question? Call a Specialist<br />or chat online.<br />
                            <span className="text-white/80 mt-1 inline-block">Call 1800 108 1333.</span>
                        </p>
                        <a href="#" className="font-sans text-[13px] text-[#004FD4] hover:underline hover:text-[#005aed] transition-colors">
                            Contact us &gt;
                        </a>
                    </div>
                </div>
            </div>

            {/* Apple-style Final Notes / Fine Print section */}
            <div className="bg-[#0b0b0e] pt-12 pb-16">
                <div className="max-w-[1200px] mx-auto px-6 md:px-16">
                    <p className="font-sans text-[11px] text-[#86868b] leading-[1.6] mb-4">
                        *Listed pricing is Maximum Retail Price (inclusive of all taxes)
                    </p>
                    <ol className="font-sans text-[11px] text-[#86868b] leading-[1.6] list-decimal pl-4 space-y-2">
                        <li>&quot;Unlimited recording&quot; applies when the camera is operated within the recommended temperature range and continuous recording is not interrupted by SD card capacity limits.</li>
                        <li>6K resolution and 10-bit recording require high-speed SDXC UHS-II cards with a Video Speed Class 90 (V90) rating for optimal uninterrupted performance.</li>
                        <li>V-Log/V-Gamut provides 14+ stops of dynamic range, assuming proper exposure and calibration in post-production using Panasonic&apos;s official LUTs.</li>
                        <li>Battery life is approximate. Testing conducted by Panasonic using CIPA standards with the DMW-BLJ31 battery. Actual battery life varies significantly based on configuration, usage, recording formats, and environmental conditions.</li>
                        <li>The phrase &quot;Netflix Approved&quot; means the Lumix S1H meets the strict image capture standards for primary camera use on Netflix Original Productions, as listed on the official Netflix Partner Help center.</li>
                        <li>Weather sealing (splash/dust/freeze resistant) does not guarantee that damage will not occur if this camera is subjected to direct contact with dust and water. Warranty does not cover liquid damage.</li>
                        <li>Firmware updates may add new features or alter existing functionalities. Please ensure you are running the latest firmware version v3.0 or higher for full described performance.</li>
                        <li>All established final assembly supplier sites are third-party verified as Zero Waste by UL LLC. Panasonic requires at least 90% diversion through methods other than waste to energy to achieve Zero Waste to Landfill designations.</li>
                    </ol>
                </div>
            </div>

            <Footer />
        </div>
    );
}
