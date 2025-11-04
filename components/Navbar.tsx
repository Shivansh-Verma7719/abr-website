"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ABRLogo from "@/public/images/abr-logo.png";

const CustomNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pages = [
        { name: "About", href: "/about" },
        { name: "Team", href: "/team" },
        { name: "The Monocle", href: "/monocle" },
        { name: "Magazine", href: "/magazine" },
        { name: "Sponsor Us", href: "/sponsor" },
    ];


    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-40 bg-background"
        >
            <nav className="container mx-auto px-4 sm:px-6 py-2">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-row items-center justify-center"
                        >
                            <Image
                                src={ABRLogo}
                                alt="ABR logo"
                                width={75}
                                priority
                                quality={70}
                                height={105}
                                className="h-auto w-auto"
                            />
                        </motion.div>
                    </Link>
                    <div className="hidden md:flex space-x-1">
                        {pages.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-lg px-3 py-1 rounded-md font-semibold transition-colors relative group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full duration-600 h-0.5 bg-abr-red origin-left transform scale-x-0 transition-transform group-hover:scale-x-100"
                                    initial={false}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white py-4 border-t border-gray-100"
                >
                    <div className="container mx-auto px-4 flex flex-col space-y-2">
                        {pages.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default CustomNavbar;