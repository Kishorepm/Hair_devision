"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Asymmetric slide up stagger for team members
    const members = containerRef.current?.querySelectorAll(".member");
    if (members && members.length > 0) {
      gsap.from(members, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section className="team" ref={containerRef} id="team" aria-label="The team">
      <div className="team-head">
        <span className="eyebrow">The Hands Behind Your Hair</span>
        <h2 className="display">Exquisite care, unhurried craft.</h2>
      </div>
      <div className="team-grid">
        <article className="member">
          <div className="arch">
            <Image 
              src="/assets/img_8233.jpg" 
              alt="Raine, owner and senior stylist at Hair Division" 
              width={380} 
              height={440} 
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="eyebrow role">Owner &amp; Senior Stylist</span>
          <h3>Raine</h3>
          <p>Thirty-plus years behind the chair. Raine built Hair Division around unhurried, expert care where you&apos;re listened to, never rushed.</p>
        </article>
        
        <article className="member" style={{ marginTop: "4rem" }}> {/* Asymmetric offset for depth */}
          <div className="arch">
            <Image 
              src="/assets/img_8232.jpg" 
              alt="Ivy, stylist at Hair Division" 
              width={380} 
              height={440} 
              style={{ objectPosition: "50% 16%", objectFit: "cover" }} 
            />
          </div>
          <span className="eyebrow role">Stylist</span>
          <h3>Ivy</h3>
          <p>A fresh eye for modern cut, colour and styling. Book with Raine or Ivy; both take appointments.</p>
        </article>
      </div>
    </section>
  );
}
