"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Atmosphere() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const slider = sliderRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!container || !overlay) return;

    // 1. Entrance animation (reveal rises gracefully on scroll)
    if (!prefersReducedMotion) {
      gsap.from(container, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });
    }

    if (!isTouch) {
      // Desktop: Circular Mask Peephole following mouse coordinates
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Dynamic scaling circle following hover coordinates
        overlay.style.clipPath = `circle(150px at ${x}px ${y}px)`;
      };

      const handleMouseLeave = () => {
        overlay.style.clipPath = `circle(0px at 50% 50%)`;
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      // Mobile: Horizontal sliding divider bar fallback
      if (instructionRef.current) {
        const sub = instructionRef.current.querySelector('.reveal-sub');
        if (sub) sub.textContent = 'Drag slider to reveal shelves';
      }
      
      // Default center split
      overlay.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
      
      const handleInput = () => {
        if (!slider) return;
        const val = slider.value;
        overlay.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
      };
      
      if (slider) {
        slider.addEventListener("input", handleInput);
        return () => slider.removeEventListener("input", handleInput);
      }
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="atmos-reveal-section" id="atmosphere" aria-label="Inside the salon">
      <div className="atmos-head">
        <span className="eyebrow">Our Space</span>
        <h2 className="display">Atmosphere</h2>
      </div>
      <div className="reveal-container" ref={containerRef}>
        {/* Base Layer: Salon Floor */}
        <div className="reveal-base-layer">
          <Image 
            src="/assets/img_0081.jpg" 
            alt="The Hair Division salon floor in Takapuna" 
            fill 
            sizes="(max-width: 900px) 100vw, 1200px"
            style={{ objectFit: "cover" }} 
            priority
          />
          <div className="reveal-caption base-caption">Calm, light and unhurried.</div>
        </div>
        
        {/* Overlay Layer: Wella Products */}
        <div className="reveal-overlay-layer" ref={overlayRef}>
          <Image 
            src="/assets/img_0066.jpg" 
            alt="Wella product range on the arched shelf" 
            fill 
            sizes="(max-width: 900px) 100vw, 1200px"
            style={{ objectFit: "cover" }} 
          />
          <div className="reveal-caption overlay-caption">The Wella range, in store.</div>
        </div>
        
        {/* Visual Aid Instructions */}
        <div className="reveal-instructions" ref={instructionRef}>
          <span className="reveal-tag">Tactile Detail Reveal</span>
          <span className="reveal-sub">Hover to peek inside the shelves</span>
        </div>
        
        {/* Touch Screen Range Slider fallback */}
        <input 
          type="range" 
          className="reveal-slider" 
          ref={sliderRef} 
          min="0" 
          max="100" 
          defaultValue="50" 
          aria-label="Slide to reveal products" 
        />
      </div>
    </section>
  );
}
