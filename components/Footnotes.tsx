"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Footnotes() {
    const [isExpanded, setIsExpanded] = useState(false);

    const notes = [
        "Quoted MRP is for 1 unit of the product. Prices are subject to change without prior notice.",
        "6K/24p (3:2) and 5.9K/30p (16:9) cinematic video recording requires high-speed V90 SDXC UHS-II or CFexpress Type B memory cards.",
        "Dual Native ISO operates automatically, switching between native ISO 640 and ISO 4000 in V-Log to minimize noise.",
        "14+ stops of dynamic range are achieved when recording in V-Log/V-Gamut. Results may vary depending on lighting conditions via Panasonic's testing standards.",
        "V-Log/V-Gamut features are pre-installed. No additional software upgrade or unlock key is required for the Lumix S1H.",
        "Dust and Splash Resistant does not guarantee that damage will not occur if this camera is subjected to direct contact with dust and water. Weather resistance requires the use of weather-sealed Lumix S Series lenses.",
        "5-axis Dual I.S. 2 can be used with compatible Lumix S Series lenses. Up to 6.5 stops of stabilization is based on the CIPA standard [Yaw/Pitch direction: focusing distance f=105mm when S-R24105 is used].",
        "Continuous recording time is subject to ambient temperature and battery level. Unlimited recording time is possible when the camera is operated within recommended operating temperatures (40°C or lower).",
        "Apple ProRes RAW and Blackmagic RAW recording require an external compatible monitor/recorder connected via HDMI.",
        "Wi-Fi® and Bluetooth® functionality require the Panasonic LUMIX Sync app, available for free on iOS and Android devices.",
        "Firmware updates may be required for certain external recording compatibility and newly introduced lens functions.",
        "Some apps, contents, and/or features may not be available in all countries. Subject to availability and local regulations.",
        "Design, specifications, and features are subject to change without notice to improve performance and usability.",
        "Panasonic, Lumix, and Venus Engine are trademarks or registered trademarks of Panasonic Corporation."
    ];

    return (
        <section className="bg-[#0B0B0E] text-white/40 text-[11px] md:text-[12px] py-12 px-6 md:px-12 lg:px-24 border-t border-white/5 font-sans relative z-10">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider text-[11px] font-medium"
                    >
                        Footnotes
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>

                <div
                    className={`grid gap-3 transition-all duration-700 ease-in-out overflow-hidden`}
                    style={{
                        maxHeight: isExpanded ? "2000px" : "150px",
                        opacity: isExpanded ? 1 : 0.6
                    }}
                >
                    {notes.map((note, idx) => (
                        <div key={idx} className="flex gap-4 leading-[1.6]">
                            <span className="text-white/20 shrink-0 select-none min-w-[20px] font-mono text-[10px] mt-[2px]">{idx + 1}</span>
                            <p>{note}</p>
                        </div>
                    ))}
                </div>

                {!isExpanded && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="text-white/30 hover:text-white transition-colors uppercase tracking-wider text-[10px] font-medium border border-white/10 px-4 py-2 rounded-full"
                        >
                            Show All Footnotes
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
