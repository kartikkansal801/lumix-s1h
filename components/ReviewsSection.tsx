import { Star, StarHalf, ThumbsUp, ChevronDown, CheckCircle2 } from "lucide-react";

export default function ReviewsSection() {
    return (
        <div className="max-w-[1200px] mx-auto px-16 pb-24 text-white">
            <h2 className="font-sans text-[24px] font-bold tracking-tight text-white/90 mb-8 pb-6">
                Customer Reviews
            </h2>

            {/* Ratings Overview Section */}
            <div className="flex flex-col md:flex-row gap-16 mb-12">

                {/* Left: Star Ratings Bars */}
                <div className="flex-1 max-w-[360px]">
                    <h3 className="font-sans text-[15px] font-medium text-white/70 mb-4">Rating Snapshot</h3>
                    <div className="space-y-2.5">
                        {[
                            { stars: '5', count: 1840, percent: '88%' },
                            { stars: '4', count: 431, percent: '10%' },
                            { stars: '3', count: 28, percent: '1%' },
                            { stars: '2', count: 12, percent: '0.5%' },
                            { stars: '1', count: 5, percent: '0.5%' },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="font-sans text-[13px] text-white/50 w-10 shrink-0">{row.stars} Stars</span>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#004FD4] rounded-full" style={{ width: row.percent }} />
                                </div>
                                <span className="font-sans text-[12px] text-white/40 w-10 text-right shrink-0">{row.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle: Average Rating */}
                <div className="flex flex-col items-center justify-center px-12 border-x border-white/10">
                    <p className="font-sans text-[14px] text-white/50 mb-1">Average Rating</p>
                    <h1 className="font-sans text-[64px] font-bold text-white/90 leading-none mb-2">4.8</h1>
                    <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4].map(n => <Star key={n} fill="#FACC15" stroke="none" size={18} />)}
                        <StarHalf fill="#FACC15" stroke="none" size={18} />
                    </div>
                    <p className="font-sans text-[12px] text-white/40">From 2,316 customer reviews</p>
                </div>

                {/* Right: Subcategory Ratings */}
                <div className="flex-1">
                    <h3 className="font-sans text-[15px] font-medium text-white/70 mb-4">Feature Ratings</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Video Quality', score: '4.9', width: '95%' },
                            { label: 'Stabilisation (IBIS)', score: '4.8', width: '90%' },
                            { label: 'Build Quality', score: '5.0', width: '100%' },
                            { label: 'Autofocus', score: '4.2', width: '75%' },
                        ].map((feature, i) => (
                            <div key={i} className="flex justify-between items-center text-[13px] font-sans">
                                <span className="text-white/60">{feature.label}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-[100px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white/50 rounded-full" style={{ width: feature.width }} />
                                    </div>
                                    <span className="text-white/80 font-medium w-6 text-right">{feature.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(n => <Star key={n} fill="#FACC15" stroke="none" size={14} />)}
                    </div>
                    <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">
                        The ultimate Netflix Approved workhorse
                    </h4>
                    <p className="font-sans text-[12px] text-white/40 mb-3">David P. — Verified Buyer</p>
                    <p className="font-sans text-[14px] text-white/60 line-clamp-3 mb-4 leading-relaxed">
                        I upgraded from the GH5 and the full frame leap is massive. The 6K 24p mode holds so much detail, and the V-Log color science makes matching to Arri/RED cameras incredibly easy. Having a proper cooling fan means I never have to worry about overheating on long shoots.
                    </p>
                    <div className="flex items-center gap-2 text-[12px] font-sans text-[#004FD4] cursor-pointer hover:underline">
                        <ThumbsUp size={14} /> 124 people found this helpful
                    </div>
                </div>

                <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4].map(n => <Star key={n} fill="#FACC15" stroke="none" size={14} />)}
                        <Star fill="none" stroke="#FACC15" size={14} />
                    </div>
                    <h4 className="font-sans text-[16px] font-semibold text-white/90 mb-2">
                        Incredible image, but it's heavy
                    </h4>
                    <p className="font-sans text-[12px] text-white/40 mb-3">Sarah T. — Verified Buyer</p>
                    <p className="font-sans text-[14px] text-white/60 line-clamp-3 mb-4 leading-relaxed">
                        The image quality and dual native ISO blow me away every time I use it. However, this is not a lightweight hybrid camera. It's essentially a cinema camera in a mirrorless body. The weight is considerable if you're flying it on a standard gimbal.
                    </p>
                    <div className="flex items-center gap-2 text-[12px] font-sans text-white/40 cursor-pointer hover:text-white/60">
                        <ThumbsUp size={14} /> 89 people found this helpful
                    </div>
                </div>
            </div>

            {/* Sub-Header Filters */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-8">
                <div className="flex items-center gap-3">
                    <span className="font-sans text-[14px] font-medium text-white/80">Filter reviews</span>
                    <div className="border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white/40">
                        <span className="font-sans text-[13px] text-white/60">Rating</span>
                        <ChevronDown size={14} className="text-white/40" />
                    </div>
                    <div className="border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white/40">
                        <span className="font-sans text-[13px] text-white/60">Contains Media</span>
                        <ChevronDown size={14} className="text-white/40" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-sans text-[13px] text-white/50">Sort by:</span>
                    <div className="border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white/40">
                        <span className="font-sans text-[13px] text-white/80">Most Helpful</span>
                        <ChevronDown size={14} className="text-white/40" />
                    </div>
                </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-10">
                {[
                    {
                        title: "Game changer for indie filmmakers",
                        text: "This camera bridged the gap between my DSLR days and stepping up to true production cinema bodies. The IBIS is so good I rarely use a gimbal for documentary work anymore. The robust codec options make post-production an absolute breeze.",
                        stars: 5, author: "James K.", date: "2 months ago", helpful: 312
                    },
                    {
                        title: "Best mirrorless for video, bar none",
                        text: "I shoot commercial real estate and events. The 10-bit color depth and lack of a recording limit are the reasons I switched from Sony. No more worrying during a 3-hour conference recording. Menus are also the best out of any brand I've used.",
                        stars: 5, author: "Alex R.", date: "4 months ago", helpful: 145
                    },
                    {
                        title: "Autofocus is just okay",
                        text: "If you pull focus manually, this is a 5-star camera. But if you rely on continuous autofocus during run-and-gun shoots, the DFD contrast-detect AF will hunt occasionally. It's totally fine for studio work, but tracking fast subjects isn't its strong suit.",
                        stars: 3, author: "Chris M.", date: "6 months ago", helpful: 201
                    }
                ].map((review, i) => (
                    <div key={i} className="border-b border-white/5 pb-10">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex gap-0.5 mb-2">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} fill={idx < review.stars ? "#FACC15" : "none"} stroke={idx < review.stars ? "none" : "#555"} size={14} />
                                    ))}
                                </div>
                                <h4 className="font-sans text-[16px] font-semibold text-white/90">{review.title}</h4>
                            </div>
                            <span className="font-sans text-[12px] text-white/30">{review.date}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-sans text-[13px] font-medium text-white/60">{review.author}</span>
                            <div className="flex items-center gap-1 text-[11px] text-[#004FD4] bg-[#004FD4]/10 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={12} /> Verified Buyer
                            </div>
                        </div>

                        <p className="font-sans text-[14px] text-white/70 leading-relaxed max-w-[900px] mb-6">
                            {review.text}
                        </p>

                        <div className="flex items-center gap-4">
                            <span className="font-sans text-[12px] text-white/40">Was this helpful?</span>
                            <button className="flex items-center gap-1.5 border border-white/15 rounded-full px-3 py-1 text-[12px] font-sans text-white/60 hover:text-white hover:border-white/30 transition-colors">
                                <ThumbsUp size={14} /> Yes ({review.helpful})
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <button className="border border-white/20 rounded-full px-8 py-3 font-sans text-[14px] font-medium text-white/80 hover:bg-white/[0.05] transition-colors">
                    Load More Reviews
                </button>
            </div>
        </div>
    );
}
