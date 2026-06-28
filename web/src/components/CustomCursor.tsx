"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouch || prefersReducedMotion) {
      return;
    }
    
    setHasHover(true);
    document.body.classList.add("hasHover");

    // Initialize GSAP quickTo for high-performance physics lagging
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3.out" });
    
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power2.out" });

    // Initial position center
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    ringX(initialX);
    ringY(initialY);
    dotX(initialX);
    dotY(initialY);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update quickTo positions
      ringX(clientX);
      ringY(clientY);
      dotX(clientX);
      dotY(clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Dynamic hover listeners for CTA magnetic effects & cursor scales
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Expand cursor on links and buttons
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('svc-row') ||
        target.closest('.svc-row')
      ) {
        setIsHovered(true);
      }
      
      // Reveal mode overlay inside Atmosphere container
      if (target.closest('.reveal-container')) {
        setIsReveal(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('svc-row') ||
        target.closest('.svc-row')
      ) {
        setIsHovered(false);
      }
      
      if (target.closest('.reveal-container')) {
        setIsReveal(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("hasHover");
    };
  }, []);

  if (!isClient || !hasHover) return null;

  return (
    <>
      <div 
        ref={ringRef} 
        className={`${styles.customCursorRing} ${isHovered ? styles.hovered : ""} ${isReveal ? styles.reveal : ""}`}
      />
      <div 
        ref={dotRef} 
        className={`${styles.customCursorDot} ${isHovered ? styles.hoveredDot : ""}`} 
      />
    </>
  );
}
