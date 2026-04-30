import React from 'react';

const Marquee = () => {
    return (
        <div className="relative flex overflow-hidden bg-[#3FE56C] py-3 border-y border-[#3FE56C]/20 select-none z-10 w-full">
            <div className="whitespace-nowrap animate-marquee flex items-center">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-black font-['Space_Grotesk'] font-bold uppercase tracking-[0.2em] text-sm md:text-base mx-4">
                        INDUSTRIAL SAFETY ✦ AI-POWERED ✦ REAL TIME ✦ ITS SAFE SOLUTIONS ✦ ZERO COMPROMISE ✦
                    </span>
                ))}
            </div>
            <div className="whitespace-nowrap animate-marquee flex items-center" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-black font-['Space_Grotesk'] font-bold uppercase tracking-[0.2em] text-sm md:text-base mx-4">
                        INDUSTRIAL SAFETY ✦ AI-POWERED ✦ REAL TIME ✦ ITSSAFE SOLUTIONS ✦ ZERO COMPROMISE ✦
                    </span>
                ))}
            </div>
            <style>{`
                .animate-marquee {
                    animation: marquee 69s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
};

export default Marquee;
