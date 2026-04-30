import React, { useState, useEffect, useCallback } from 'react';
import './TeamCarousel.css';

const teamMembers = [
  { name: "Alexander Vance", role: "Founder", brief: "Visionary leader with 15+ years in industrial safety tech, driving our mission to eliminate preventable accidents globally.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80" },
  { name: "Elena Rostova", role: "Creative Director", brief: "Award-winning designer shaping how humans interface with critical life-saving technology through intuitive, rapid-response UI.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80" },
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
          <div className="flex flex-row gap-8 items-center justify-center hidden md:flex mb-6">
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
            <p className="tc-member-brief transition-opacity duration-300 mt-6 text-[#86868b] max-w-sm mx-auto leading-relaxed text-sm md:text-base">{teamMembers[currentIndex].brief}</p>
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
        </div>

      </div>
    </div>
  );
};

export default TeamCarousel;
