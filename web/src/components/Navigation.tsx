"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      <div 
        className={`scrim ${menuOpen ? "open" : ""}`} 
        onClick={closeMenu} 
        id="scrim"
      />
      <header className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <a className="brand" href="#top" onClick={closeMenu}>
          <Image 
            src="/assets/logo.png" 
            alt="Hair Division logo" 
            width={44} 
            height={44} 
            className="nav-mark" 
          />
          <span className="brand-text">
            <b>Hair Division</b>
            <i>Takapuna</i>
          </span>
        </a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} id="menu">
          <a className="link" href="#services" onClick={closeMenu}>Services</a>
          <a className="link" href="#atmosphere" onClick={closeMenu}>Atmosphere</a>
          <a className="link" href="#team" onClick={closeMenu}>Team</a>
          <a className="link" href="#visit" onClick={closeMenu}>Visit</a>
          <a className="nav-book" href="#visit" onClick={closeMenu}>Book</a>
        </nav>
        <button 
          className={`burger ${menuOpen ? "open" : ""}`} 
          id="burger" 
          aria-label="Menu" 
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </header>
    </>
  );
}
