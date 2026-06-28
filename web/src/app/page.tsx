"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navigation from "@/components/Navigation";
import Hero3D from "@/components/Hero3D";
import Calculator from "@/components/Calculator";
import Atmosphere from "@/components/Atmosphere";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Fade up animation for the core promise statement
    if (statementRef.current) {
      const eyebrow = statementRef.current.querySelector(".eyebrow");
      const text = statementRef.current.querySelector(".display");
      
      gsap.timeline({
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 80%",
        }
      })
      .from(eyebrow, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(text, {
        y: 35,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.4");
    }

    // 2. Batch reveal helper class `.reveal` across all sections
    const reveals = gsap.utils.toArray(".reveal") as Element[];
    if (reveals.length > 0) {
      ScrollTrigger.batch(reveals, {
        onEnter: batch => gsap.to(batch, { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out", 
          stagger: 0.15,
          overwrite: "auto"
        }),
        start: "top 80%",
        once: true
      });
    }

  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      <Navigation />
      
      <main id="top">
        <Hero3D />
        
        {/* The Promise Statement Section */}
        <section ref={statementRef} className="statement" aria-label="Our promise">
          <span className="eyebrow">The Promise</span>
          <p className="display">
            A small salon with a simple promise: you leave looking and feeling your best, <em>every</em> visit.
          </p>
        </section>

        <Calculator />
        
        <Atmosphere />
        
        <Team />
        
        <Footer />
      </main>
    </div>
  );
}
