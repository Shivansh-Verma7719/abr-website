import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IconArrowUpRight } from "@tabler/icons-react";
import "./CardNav.css";
import Image from "next/image";
import useMobile from "@/hooks/useMobile";
import Link from "next/link";
import { motion } from "framer-motion";

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
    icon?: React.ReactNode;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    logo: string;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    logo,
    logoAlt = "Logo",
    items,
    className = "",
    ease = "power3.out",
    menuColor,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isMobile = useMobile();

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 280;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) {
            const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = "visible";
                contentEl.style.pointerEvents = "auto";
                contentEl.style.position = "static";
                contentEl.style.height = "auto";

                // Force reflow to get accurate height measurement
                void contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = React.useCallback(() => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: "hidden" });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease,
        });

        tl.to(
            cardsRef.current,
            { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
            "-=0.1"
        );

        return tl;
    }, [ease]);

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [createTimeline]);

    // Cleanup effect to reset navbar state on navigation
    React.useEffect(() => {
        const handleRouteChange = () => {
            if (isExpanded) {
                setIsHamburgerOpen(false);
                setIsExpanded(false);
                if (tlRef.current) {
                    tlRef.current.eventCallback("onReverseComplete", null);
                    tlRef.current.reverse();
                }
            }
        };

        // Listen for navigation events
        window.addEventListener('beforeunload', handleRouteChange);

        return () => {
            window.removeEventListener('beforeunload', handleRouteChange);
        };
    }, [isExpanded]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isExpanded, createTimeline]);

    const toggleMenu = React.useCallback(() => {
        console.log("Toggling menu");
        const tl = tlRef.current;
        if (!tl) return;

        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
            tl.reverse();
        }
    }, [isExpanded]);

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? "open" : ""}`}
            >
                <div className="card-nav-top flex items-center justify-between">
                    <div className="logo-container">
                        <Link href="/">
                            <Image src={logo} alt={logoAlt} className="logo" height={isMobile ? 20 : 50} width={170} />
                        </Link>
                    </div>

                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? "Close menu" : "Open menu"}
                        tabIndex={0}
                        style={{ color: menuColor || "#000" }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>
                </div>

                <div className="card-nav-content z-50" aria-hidden={!isExpanded}>
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((link, i) => (
                                    <Link
                                        key={`${link.label}-${i}`}
                                        className="nav-card-link group relative"
                                        href={link.href}
                                        aria-label={link.ariaLabel}
                                        prefetch={true}
                                        onClick={() => {
                                            // Don't prevent default for external links or mailto
                                            if (link.href.startsWith('http') || link.href.startsWith('mailto:')) {
                                                return;
                                            }

                                            // For internal navigation, close menu immediately and smoothly
                                            if (isExpanded) {
                                                setIsHamburgerOpen(false);

                                                if (tlRef.current) {
                                                    // Clear any existing callbacks to prevent state conflicts
                                                    tlRef.current.eventCallback("onReverseComplete", null);
                                                    // Reverse the animation
                                                    tlRef.current.reverse();
                                                    // Set state immediately to prevent UI lag
                                                    setTimeout(() => {
                                                        setIsExpanded(false);
                                                    }, 750);
                                                }
                                            }
                                        }}
                                    >
                                        <IconArrowUpRight
                                            className="group-hover:rotate-45 transition-transform duration-600"
                                            aria-hidden="true"
                                        />
                                        {link.icon && <span className="icon">{link.icon}</span>}
                                        {link.label}
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-white transition-transform duration-600 group-hover:scale-x-100"
                                            initial={false}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
