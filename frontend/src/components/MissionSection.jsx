import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
    const textRef = useRef(null);
    const statsRef = useRef([]);

    const text = "We exist to eliminate the gap between human instinct and mechanical danger — in real time.";
    const words = text.split(" ");

    const stats = [
        { value: 500, suffix: '+', label: 'Active Deployments' },
        { value: 99.7, suffix: '%', label: 'Uptime Record' },
        { value: 3, suffix: 'ms', label: 'Alert Response Time' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word opacity animation
            if (textRef.current) {
                const wordElements = textRef.current.querySelectorAll('.word');
                gsap.fromTo(wordElements,
                    { opacity: 0.1 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: true,
                        }
                    }
                );
            }

            // Stats counter animation
            statsRef.current.forEach((statEl, i) => {
                if (statEl) {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: stats[i].value,
                        duration: 2.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: statEl,
                            start: "top 85%",
                        },
                        onUpdate: () => {
                            statEl.innerText = Number.isInteger(stats[i].value)
                                ? Math.floor(obj.val)
                                : obj.val.toFixed(1);
                        }
                    });
                }
            });

        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-black text-white py-32 md:py-48 px-6 md:px-16 lg:px-24 border-t border-white/5 relative overflow-hidden">
            {/* Background Image Layer using requested Brandin AI image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* The image itself provides the vibrant red background */}
                <div className="absolute inset-0 bg-[url('/brandin-ai-bg.webp')] bg-cover bg-center bg-no-repeat opacity-100 md:opacity-90"></div>

                {/* Black Gradient at Top to transition from previous black section */}
                <div className="absolute top-0 left-0 w-full h-[300px] md:h-[500px] bg-gradient-to-b from-black via-black/80 to-transparent z-10" />

                {/* Black Gradient at Bottom to transition into next black section */}
                <div className="absolute bottom-0 left-0 w-full h-[400px] md:h-[600px] bg-gradient-to-t from-black via-black/90 to-transparent z-10" />

                {/* Very subtle noise/darkening layer to ensure text readability */}
                <div className="absolute inset-0 bg-black/30 z-10 flex"></div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col items-center relative z-20">
                {/* Section Header */}
                <div className="w-full mb-16 items-center justify-center flex flex-col overflow-hidden">
                    <span className="text-[#E22E18] bg-white px-5 py-1.5 font-['Space_Grotesk'] font-bold text-lg md:text-xl uppercase tracking-[0.4em] mb-4 block shadow-[0_0_30px_rgba(255,255,255,0.3)]">Our Mission</span>
                </div>

                {/* Mission Text - Reading Effect */}
                <h2
                    ref={textRef}
                    className="text-4xl md:text-6xl lg:text-[5rem] font-['Space_Grotesk'] font-bold text-center leading-[1.1] md:leading-[1.15] tracking-tight max-w-5xl uppercase"
                >
                    {words.map((word, i) => (
                        <span key={i} className="word opacity-10 inline-block mr-2 md:mr-4 mb-2">
                            {word}
                        </span>
                    ))}
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mt-32 w-full">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="flex items-baseline mb-2">
                                <span
                                    ref={el => statsRef.current[i] = el}
                                    className="text-[6rem] md:text-[9rem] font-['Space_Grotesk'] font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] leading-none"
                                >
                                    0
                                </span>
                                <span className="text-4xl md:text-[5rem] font-['Space_Grotesk'] font-bold text-white ml-2 leading-none">
                                    {stat.suffix}
                                </span>
                            </div>
                            <span className="text-sm md:text-base text-white/80 uppercase tracking-[0.4em] font-['Space_Grotesk'] font-bold mt-4">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
