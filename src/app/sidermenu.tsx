"use client";
import { useEffect, useRef, useState } from "react";

const lines = [
    { to: "#home", key: 1 },
    { to: "#dannysito_info", key: 2 },
    { to: "#about_dannysito", key: 3 },
    { to: "#contact_me", key: 4 },
];

const scrollContainerId = "main-scroll-container";

export default function Menu() {
    const animRefs = lines.map(() => useRef<HTMLDivElement>(null));
    const [active, setActive] = useState(0);

    // on click
    const handleClick = (to: string, idx: number) => {
        window.dispatchEvent(new CustomEvent("scroll-to-section", { detail: { hash: to.replace('#', '') } }));
        setActive(idx);
        const el = animRefs[idx]?.current;
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

    // sincroniza menu - URL
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
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                height: "100vh",
                width: 120, //140
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#A07856 ",
                backgroundImage: "url('/sidermenu.png')",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "360% 119%",
                boxShadow: "2px 0 16px #000000",
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 40,
                }}>
                {lines.map((line, idx) => (
                    <div
                        key={line.key}
                        ref={animRefs[idx]}
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
                            boxShadow:
                                active === idx ? "0 2px 8px rgba(0,0,0,0.18)" : "none",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}