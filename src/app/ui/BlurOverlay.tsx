import React, { useEffect, useState } from "react";

interface BlurOverlayProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  isBlurring: boolean;
}

const MAX_BLUR = 16;
const MIN_BLUR = 4;

export default function BlurOverlay({ scrollRef, isBlurring }: BlurOverlayProps) {
  const [blurAmount, setBlurAmount] = useState(MIN_BLUR);
  const [lastScroll, setLastScroll] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const now = Date.now();
          const scrollTop = container.scrollTop;
          const delta = Math.abs(scrollTop - lastScroll);
          const dt = now - lastTime;
          const speed = dt > 0 ? delta / dt : 0;
          let blur = MIN_BLUR + Math.min(MAX_BLUR, speed * 80);
          blur = Math.max(MIN_BLUR, Math.min(MAX_BLUR, blur));
          setBlurAmount(blur);
          setLastScroll(scrollTop);
          setLastTime(now);
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef, lastScroll, lastTime]);

  if (!isBlurring) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        transition: "backdrop-filter 0.2s cubic-bezier(.4,2,.6,1), background 0.2s cubic-bezier(.4,2,.6,1)",
      }}
    />
  );
}
