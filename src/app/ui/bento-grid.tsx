import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "bento-grid mx-auto grid max-w-7xl grid-cols-3 gap-0 auto-rows-[400px] md:grid-cols-3",
                className,
            )}
            style={{
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <style>{`
                @media (max-width: 768px) {
                    .bento-grid {
                        grid-template-columns: 1fr !important;
                        auto-rows: 320px !important;
                        gap: 1.5rem !important;
                        max-width: 100vw !important;
                        padding: 0 0.5rem !important;
                    }
                    .bento-grid-item {
                        min-width: 0 !important;
                        width: 100% !important;
                        height: 320px !important;
                        border-radius: 16px !important;
                        padding: 1rem !important;
                    }
                    .contact-section {
                        justify-content: center !important;
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .contact-section .contact-text {
                        font-size: 1.25rem !important;
                        font-weight: 600 !important;
                        letter-spacing: 0.02em !important;
                        font-family: 'Caveat', Arial, Helvetica, sans-serif !important;
                    }
                }
            `}</style>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 col-span-1 flex flex-col justify-between items-center rounded-xl bg-white p-0 w-full h-full transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                className,
            )}
            style={{
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
            }}
        >
            {header}
            <div className="w-full h-full flex flex-col items-center justify-center">
                {icon}
                <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
                    {title}
                </div>
                <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};
