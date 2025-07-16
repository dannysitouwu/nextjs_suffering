import React, { useEffect, useState, useRef } from "react";

interface BlurOverlayProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  isBlurring: boolean;
}

const MAX_BLUR = 10;
const MIN_BLUR = 0.1;
const MAX_OPACITY = 1.15;
const MIN_OPACITY = 0.15;
const BLUR_MULTIPLIER = 15000;
const DECAY_FACTOR = .99;
const DECAY_INTERVAL = 94; 

export default function BlurOverlay({ scrollRef }: Omit<BlurOverlayProps, 'isBlurring'>) {
  const [blurAmount, setBlurAmount] = useState(MIN_BLUR);
  const [opacity, setOpacity] = useState(MIN_OPACITY);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const now = Date.now();
          const scrollTop = container.scrollTop;
          const deltaScroll = Math.abs(scrollTop - lastScrollRef.current);
          const deltaTime = now - lastTimeRef.current;
          const currentVelocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;
          const targetBlur = Math.min(MAX_BLUR, currentVelocity * BLUR_MULTIPLIER);
          const targetOpacity = MIN_OPACITY + (targetBlur / MAX_BLUR) * (MAX_OPACITY - MIN_OPACITY);

          setBlurAmount(targetBlur);
          setOpacity(targetOpacity);

          lastScrollRef.current = scrollTop;
          lastTimeRef.current = now;
          ticking = false;

          animationRef.current = window.setTimeout(decayAnimation, DECAY_INTERVAL);
        });
      }
    };
    const decayAnimation = () => {
      setBlurAmount(prev => {
        const newBlur = prev * DECAY_FACTOR;
        if (newBlur < 0.01) {
          setOpacity(0);
          return 0;
        }
        setOpacity(MIN_OPACITY + (newBlur / MAX_BLUR) * (MAX_OPACITY - MIN_OPACITY));
        animationRef.current = window.setTimeout(decayAnimation, DECAY_INTERVAL);
        return newBlur;
      });
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [scrollRef]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        backdropFilter: `blur(${blurAmount}px)`,
        opacity: opacity,
        transition: "opacity 1.2s cubic-bezier(.4,2,.6,1)",
        zIndex: 9999,
      }}
    />
  );
}