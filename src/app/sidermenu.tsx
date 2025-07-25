'use client';
import { useEffect, useRef, useState } from "react";
import { scrollContainerId } from "./lib/constants";

const lines = [
  { to: "#home", key: 1 },
  { to: "#dannysito_info", key: 2 },
  { to: "#about_dannysito", key: 3 },
  { to: "#contact_me", key: 4 },
];

export default function Menu() {
  const animRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    animRefs.current = animRefs.current.slice(0, lines.length);
  }, []);

  const handleClick = (to: string, idx: number) => {
    window.dispatchEvent(new CustomEvent("scroll-to-section", { detail: { hash: to.replace("#", "") } }));
    setActive(idx);
    const el = animRefs.current[idx];
    if (el) {
      el.animate(
        [
          { transform: "scaleX(1)" },
          { transform: "scaleX(1.5)", background: "#fff" },
          { transform: "scaleX(1)", background: "#fff" },
        ],
        {
          duration: 350,
          easing: "cubic-bezier(.4,2,.6,1)",
        }
      );
    }
  };

  useEffect(() => {
    const syncActiveWithHash = () => {
      const hash = window.location.hash;
      const idx = lines.findIndex((line) => line.to === hash);
      if (idx !== -1) setActive(idx);
    };
    window.addEventListener("hashchange", syncActiveWithHash);
    syncActiveWithHash();
    return () => window.removeEventListener("hashchange", syncActiveWithHash);
  }, []);

  useEffect(() => {
    const container = document.getElementById(scrollContainerId);
    if (!container) return;
    const handleScroll = () => {
      let found = 0;
      lines.forEach((line, idx) => {
        const section = container.querySelector(line.to);
        if (section) {
          const rect = section.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const middle = containerRect.top + containerRect.height / 2;
          if (rect.top <= middle && rect.bottom >= middle) {
            found = idx;
          }
        }
      });
      setActive(found);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="sidermenu-responsive"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: 120,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#A07856",
        backgroundImage: "url('/sidermenu.png')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "360% 119%",
        boxShadow: "2px 0 16px #000000",
        transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
      }}
    >
      <div
        className="sidermenu-inner"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {lines.map((line, idx) => (
          <div
            key={line.key}
            ref={el => { animRefs.current[idx] = el; }}
            onClick={() => handleClick(line.to, idx)}
            style={{
              width: 60,
              height: 5,
              background: active === idx ? "white" : "silver",
              borderRadius: 3,
              cursor: "pointer",
              opacity: 1,
              transition: "background 0.2s, transform 0.3s",
              transform: active === idx ? "scaleX(1.25)" : "scaleX(1)",
              boxShadow: active === idx ? "0 2px 8px rgba(0,0,0,0.18)" : "none",
            }}
          />
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .sidermenu-responsive {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: 56px !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(160,120,86,0.97) !important;
            background-image: none !important;
          }
          .sidermenu-inner {
            width: 100vw !important;
            height: 56px !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-around !important;
            gap: 0 !important;
          }
          .sidermenu-inner > div {
            width: 44px !important;
            height: 5px !important;
            margin: 0 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
