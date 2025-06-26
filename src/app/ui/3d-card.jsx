"use client";
import React, { useRef } from "react";

export function CardContainer({ children, className = "" }) {
    return (
        <div
            className={`[perspective:1000px] flex justify-center items-center ${className}`}
            style={{ perspective: "1000px" }}
        >
            {children}
        </div>
    );
}

export function CardBody({ children, className = "", style = {}, backgroundImage, ...props }) {
    const ref = useRef(null);

    function handleMouseMove(e) {
        const card = ref.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {
        const card = ref.current;
        if (card) card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    const mergedStyle = {
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
        backgroundSize: backgroundImage ? '100% 100%' : undefined,
        boxShadow: '0 8px 32px 4px rgba(0,0,0,0.18)',
        width: '100%',
        height: '100%',
        minWidth: 320,
        minHeight: 320,
        maxWidth: 500,
        maxHeight: 400,
        border: 'none',
        padding: 0,
        margin: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
    };

    return (
        <div
            ref={ref}
            className={`home ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={mergedStyle}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardItem({
    children,
    className = "",
    translateZ = 0,
    rotateX = 0,
    rotateZ = 0,
    translateX = 0,
    as: Tag = "div",
    ...props
}) {
    const style = {
        transform: `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px)`
    };
    return (
        <Tag className={className} style={style} {...props}>
            {children}
        </Tag>
    );
}
