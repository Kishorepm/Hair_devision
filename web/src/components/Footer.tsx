"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const visitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const items = visitRef.current?.querySelectorAll(".reveal-item");
    if (items && items.length > 0) {
      gsap.from(items, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visitRef.current,
          start: "top 75%",
        }
      });
    }
  }, { scope: visitRef });

  return (
    <>
      <section ref={visitRef} className="visit" id="visit" aria-label="Visit us">
        <div className="reveal-item">
          <span className="eyebrow">Visit Us</span>
          <h2 className="display" style={{ marginTop: "1rem" }}>Find us in Takapuna.</h2>
          <dl>
            <dt>Where</dt>
            <dd>
              <a 
                href="https://maps.google.com/?q=446+Lake+Road,+Takapuna,+Auckland" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                446 Lake Road, Takapuna, Auckland
              </a>
            </dd>
            <dt>Call</dt>
            <dd><a href="tel:+6494889295">09 488 9295</a></dd>
            <dt>Tue–Fri</dt>
            <dd>9:15am – 5:30pm</dd>
            <dt>Thu late</dt>
            <dd>until 7:00pm</dd>
            <dt>Saturday</dt>
            <dd>9:00am – 4:00pm</dd>
          </dl>
          <p className="hours-note">Sun &amp; Mon closed. Hours to be confirmed with Raine.</p>
          <div className="visit-cta">
            <a className="btn" href="tel:+6494889295">Call to book</a>
          </div>
        </div>
        
        <aside className="visit-aside reveal-item">
          <div className="arch">
            <Image 
              src="/assets/img_0057.jpg" 
              alt="Inside Hair Division, Takapuna" 
              fill
              sizes="(max-width: 900px) 100vw, 500px"
              style={{ objectFit: "cover" }} 
              loading="lazy"
            />
          </div>
        </aside>
      </section>
      
      <footer className="foot">
        <div style={{ width: "128px", height: "128px", margin: "0 auto 2rem", borderRadius: "50%", background: "#ffffff", padding: "6px", position: "relative" }}>
          <Image 
            src="/assets/logo.png" 
            alt="Hair Division Takapuna logo" 
            fill 
            sizes="128px"
            style={{ objectFit: "contain", padding: "6px" }} 
            loading="lazy"
          />
        </div>
        <p>446 Lake Road, Takapuna · 09 488 9295</p>
        <p>Tuesday – Saturday by appointment</p>
        <p className="small">Hair Division Takapuna | mockup concept</p>
      </footer>
    </>
  );
}
