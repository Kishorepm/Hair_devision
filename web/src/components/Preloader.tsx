"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      if (containerRef.current) containerRef.current.style.display = 'none';
      document.body.classList.add('loaded');
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Completely destroy preloader elements from layout for accessibility
        if (containerRef.current) containerRef.current.style.display = 'none';
        document.body.classList.add('loaded');
      }
    });

    // Initial setups
    gsap.set([leftDoorRef.current, rightDoorRef.current], { xPercent: 0 });
    gsap.set(monogramRef.current, { scale: 0.8, opacity: 0, rotation: -10 });
    gsap.set(brandRef.current, { opacity: 0, y: 15 });
    gsap.set(barRef.current, { width: 0 });

    // Cinematic loading sequence
    tl.to(monogramRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "power3.out",
    })
    .to(brandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4")
    .to(barRef.current, {
      width: "100%",
      duration: 1.4,
      ease: "power4.inOut",
    }, "-=0.6")
    .to([monogramRef.current, brandRef.current, barRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
    }, "+=0.3")
    // Split screen reveal (double doors sliding apart)
    .to(leftDoorRef.current, {
      xPercent: -100,
      duration: 1.1,
      ease: "power4.inOut"
    })
    .to(rightDoorRef.current, {
      xPercent: 100,
      duration: 1.1,
      ease: "power4.inOut"
    }, "-=1.1"); // Synced double-door split

  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      {/* Splitting double doors */}
      <div ref={leftDoorRef} className={`${styles.door} ${styles.leftDoor}`} />
      <div ref={rightDoorRef} className={`${styles.door} ${styles.rightDoor}`} />
      
      {/* Monogram and brand graphics */}
      <div className={styles.content}>
        <div ref={monogramRef} className={styles.monogram}>
          <span>H</span>
          <span className={styles.amp}>&amp;</span>
          <span>D</span>
        </div>
        <div ref={brandRef} className={styles.brandTitle}>
          Hair Division
        </div>
        <div className={styles.loadingBarWrapper}>
          <div ref={barRef} className={styles.loadingBar} />
        </div>
      </div>
    </div>
  );
}
