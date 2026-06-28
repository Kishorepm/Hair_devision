"use client";

import { useState } from "react";
import styles from "./Calculator.module.css";

type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
};

const SERVICES: Record<string, Service[]> = {
  "Cut & Style": [
    { id: "w-cut", name: "Women's cut", price: 110, duration: "60 mins" },
    { id: "m-cut", name: "Men's cut", price: 65, duration: "45 mins" },
    { id: "blow-wave", name: "Blow wave", price: 55, duration: "45 mins" },
  ],
  "Colour": [
    { id: "regrowth", name: "Regrowth colour", price: 110, duration: "90 mins" },
    { id: "half-head", name: "Half-head foils", price: 142, duration: "120 mins" },
    { id: "full-head", name: "Full-head foils", price: 210, duration: "150 mins" },
  ],
  "Treatments": [
    { id: "filler", name: "Smooth filler treatment", price: 250, duration: "180 mins" },
    { id: "conditioning", name: "Conditioning treatment", price: 35, duration: "15 mins" },
  ]
};

export default function Calculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleService = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelected(newSet);
  };

  const total = Array.from(selected).reduce((acc, id) => {
    for (const cat of Object.values(SERVICES)) {
      const s = cat.find(x => x.id === id);
      if (s) return acc + s.price;
    }
    return acc;
  }, 0);

  return (
    <section className="services reveal" id="services" aria-label="Services and pricing">
      <div className="svc-head">
        <div>
          <span className="eyebrow">Services &amp; Pricing</span>
          <h2 className="display" style={{ marginTop: "1rem" }}>Craft your experience</h2>
        </div>
        <p className="note">
          Build your custom package below for an instant pricing and time estimate. Final menus will be confirmed during consultation.
        </p>
      </div>
      
      <div className={styles.calcGrid}>
        {/* Service selection list */}
        <div className={styles.serviceSelector}>
          {Object.entries(SERVICES).map(([category, items]) => (
            <div className={styles.categoryBlock} key={category}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.categoryList}>
                {items.map(s => {
                  const isActive = selected.has(s.id);
                  return (
                    <div 
                      key={s.id} 
                      className={`${styles.calcRow} ${isActive ? styles.activeRow : ""}`}
                      onClick={() => toggleService(s.id)}
                      role="checkbox"
                      aria-checked={isActive}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleService(s.id); } }}
                    >
                      <div className={styles.rowContent}>
                        <span className={styles.name}>{s.name}</span>
                        <span className={styles.duration}>{s.duration}</span>
                      </div>
                      <div className={styles.rightContent}>
                        <span className={styles.price}>from <b>${s.price}</b></span>
                        <div className={`${styles.checkbox} ${isActive ? styles.checkedCheckbox : ""}`}>
                          {isActive && <div className={styles.checkMark} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sticky luxury summary card */}
        <div className={styles.summaryPanel}>
          <div className={`${styles.summaryInner} glass`}>
            <span className="eyebrow" style={{ color: "var(--gold-dark)" }}>Your Package</span>
            
            <div className={styles.selectedCount}>
              {selected.size} {selected.size === 1 ? "service" : "services"} selected
            </div>
            
            <div className={styles.totalAmount}>
              <span className={styles.currency}>$</span>
              <span className={styles.digits}>{total}</span>
            </div>
            
            <div className={styles.selectedList}>
              {selected.size === 0 ? (
                <div className={styles.empty}>
                  Select services on the left to estimate your customized styling package.
                </div>
              ) : (
                <div className={styles.listContainer}>
                  {Array.from(selected).map(id => {
                    for (const cat of Object.values(SERVICES)) {
                      const s = cat.find(x => x.id === id);
                      if (s) {
                        return (
                          <div key={id} className={styles.summaryItem}>
                            <span>{s.name}</span>
                            <b>${s.price}</b>
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            
            <a 
              className={`btn ${styles.bookBtn}`} 
              href={`tel:+6494889295`}
              style={{ marginTop: '2.5rem', width: '100%', justifyContent: 'center' }}
            >
              Book Selected Package
            </a>
            <span className={styles.consultationNote}>
              Consultation is always free and unhurried.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
