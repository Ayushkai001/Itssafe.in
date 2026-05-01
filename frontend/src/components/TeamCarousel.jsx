import React, { useState, useEffect, useCallback } from 'react';
import './TeamCarousel.css';

const teamMembers = [
  { name: "Ayush K", role: "Co-Founder & CEO", brief: "Executive Head with background of Artificial Intelligence and Business Strategy.", img: "/Ayush.jpg", linkedin: "https://www.linkedin.com/in/ayush-k-6a103b322/" },
  { name: "Rajnish Kumar Singh", role: "Co-Founder & COO", brief: "DGMS Awardee: Safety Innovation in Mining, with background of Electronics and Ergonomics.", img: "/Rajnish.jpeg", linkedin: "https://www.linkedin.com/in/rajnish-kumar-singh-mining/" },
  { name: "Ashish ", role: "Co-Founder & CTO", brief: "Technical Head with background of Software Engineering and System Architecture .", img: "/Ashish.png", linkedin: "https://www.linkedin.com/in/ashish-kumar-abc789/" },
];


const ChevronLeft = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const updateCarousel = useCallback((newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowUp") {
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowDown") {
      updateCarousel(currentIndex + 1);
    }
  }, [currentIndex, updateCarousel]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientY);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
  };

  const getCardClass = (index) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;
    if (offset === 0) return "center";
    if (offset === 1) return "down-1";
    if (offset === 2) return "down-2";
    if (offset === teamMembers.length - 1) return "up-1";
    if (offset === teamMembers.length - 2) return "up-2";
    return "hidden";
  };

  return (
    <div className="tc-container pointer-events-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="tc-main-container">

        <div className="tc-carousel-section">
          <div className="tc-carousel-container">
            <div className="tc-carousel-track">
              {teamMembers.map((member, i) => (
                <div key={i} className={`tc-card ${getCardClass(i)}`} onClick={() => updateCarousel(i)}>
                  <img src={member.img} alt={member.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tc-controls-section">
          {/* Nav arrows — visible on desktop only (touch swipe on mobile) */}
          <div className="hidden md:flex flex-row gap-8 items-center justify-center mb-6">
            <button className="tc-nav-arrow left" onClick={() => updateCarousel(currentIndex - 1)}>
              <ChevronLeft />
            </button>
            <button className="tc-nav-arrow right" onClick={() => updateCarousel(currentIndex + 1)}>
              <ChevronRight />
            </button>
          </div>

          <div className="tc-member-info">
            <h2 className="tc-member-name transition-opacity duration-300">{teamMembers[currentIndex].name}</h2>
            <p className="tc-member-role transition-opacity duration-300">{teamMembers[currentIndex].role}</p>
            <p className="tc-brief-text transition-opacity duration-300 mt-6 text-[#86868b] max-w-sm mx-auto leading-relaxed text-sm md:text-base">{teamMembers[currentIndex].brief}</p>

            {/* LinkedIn Button */}
            <a
              href={teamMembers[currentIndex].linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-['Inter']"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="tc-dots">
            {teamMembers.map((_, i) => (
              <div
                key={i}
                className={`tc-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => updateCarousel(i)}
              />
            ))}
          </div>

          {/* Mobile swipe hint + tap arrows */}
          <div className="flex md:hidden flex-row gap-10 items-center justify-center mt-2">
            <button className="tc-nav-arrow left" onClick={() => updateCarousel(currentIndex - 1)}>
              <ChevronLeft />
            </button>
            <button className="tc-nav-arrow right" onClick={() => updateCarousel(currentIndex + 1)}>
              <ChevronRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamCarousel;
