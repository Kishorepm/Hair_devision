"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Honour reduced-motion: hold on the poster frame instead of looping.
    if (prefersReducedMotion) videoRef.current?.pause();

    // 1. Kinetic Text Entrance Animation (split words and rise up)
    if (titleRef.current && !prefersReducedMotion) {
      const text = titleRef.current.innerHTML;
      const words = text.split("<br>");
      const wrappedWords = words.map(line => {
        return line.split(" ").map(word => {
          if (word.startsWith("<em>") || word.endsWith("</em>")) {
            return `<span class="word-wrapper" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;color:var(--sage);font-style:italic;">${word.replace(/<\/?em>/g, "")}</span></span>`;
          }
          return `<span class="word-wrapper" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;">${word}</span></span>`;
        }).join(" ");
      }).join("<br>");

      titleRef.current.innerHTML = wrappedWords;

      // Animate split words
      gsap.fromTo(titleRef.current.querySelectorAll(".word"), 
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out", stagger: 0.08, delay: 2.2 }
      );
      
      // Animate secondary copy and buttons
      gsap.fromTo([copyRef.current, containerRef.current?.querySelectorAll(".btn")],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 2.8 }
      );
    } else {
      // Fallback
      gsap.set([titleRef.current, copyRef.current], { opacity: 1 });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero" id="main-content">
      {/* Eucalyptus video backdrop — drifting leaf-shadow on a warm wall */}
      <video
        ref={videoRef}
        className="hero-video"
        poster="/assets/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-copy">
        <span className="eyebrow">Hair salon · North Shore, Auckland</span>
        <h1 ref={titleRef} className="display">
          Beautiful hair,<br /><em>thirty years</em><br />in the making.
        </h1>
        <p ref={copyRef}>
          Hair Division is Raine&apos;s Takapuna salon, providing expert cut, colour and care in a calm, unhurried space, with Wella&apos;s premium range.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#visit">Book an appointment</a>
          <a className="btn btn--ghost" href="#services">View services</a>
        </div>
      </div>
      
      {/* Empty right column in the grid layout to showcase the slender eucalyptus tree on the right background */}
      <div className="hero-media-spacer" />
    </section>
  );
}
