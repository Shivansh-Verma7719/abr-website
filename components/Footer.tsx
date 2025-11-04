"use client"
import { IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react"
import useMobile from "@/hooks/useMobile"
import Link from "next/link";
import { motion } from "motion/react";

export function Footer() {
    const isMobile = useMobile();

    const mainLinks = [
        { name: "About Us", href: "#about", color: "hover:text-black", lineColor: "bg-black" },
        { name: "Contact", href: "#contact", color: "hover:text-black", lineColor: "bg-black" },
    ]

    const additionalLinks = [
        { name: "Business Review", href: "#review", color: "hover:text-black", lineColor: "bg-black" },
    ]

    const socialLinks = [
        { name: "Email", icon: IconMail, href: "#", color: "hover:text-black", lineColor: "bg-black" },
        { name: "Instagram", icon: IconBrandInstagram, href: "#", color: "hover:text-pink-500", lineColor: "bg-pink-500" },
        { name: "LinkedIn", icon: IconBrandLinkedin, href: "#", color: "hover:text-blue-700", lineColor: "bg-blue-700" },
        { name: "Twitter", icon: IconBrandX, href: "#", color: "hover:text-black", lineColor: "bg-black" },
    ]

    return (
        <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-background flex justify-center items-center">
            <div className="relative overflow-hidden w-full h-full flex justify-end px-7 md:px-12 text-left items-start py-12 text-abc-blue">
                <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
                    <ul>
                        {mainLinks.map((link, index) => (
                            <li key={index} className="cursor-pointer group relative">
                                <Link href={link.href}>{link.name}</Link>
                                <motion.span
                                        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform ${link.lineColor} transition-transform duration-600 group-hover:scale-x-100`}
                                        initial={false}
                                        transition={{ duration: 0.3 }}
                                    />
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {additionalLinks.map((link, index) => (
                            <li key={index} className="cursor-pointer group relative">
                                <Link href={link.href}>{link.name}</Link>
                                <motion.span
                                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform ${link.lineColor} transition-transform duration-600 group-hover:scale-x-100`}
                                    initial={false}
                                    transition={{ duration: 0.3 }}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-col space-y-2">
                        {socialLinks.map((social, index) => {
                            const IconComponent = social.icon;
                            return (
                                <li key={index} className={`cursor-pointer flex items-center group relative justify-start space-x-2 ${social.color}`}>
                                    <Link href={social.href}>{social.name}</Link>
                                    <IconComponent size={20} />
                                    <motion.span
                                        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform ${social.lineColor} transition-transform duration-600 group-hover:scale-x-100`}
                                        initial={false}
                                        transition={{ duration: 0.3 }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <h2 className="absolute -bottom-0 left-0  translate-y-1/3 text-[135px]  text-abr-red">
                    {isMobile ? "ABR" : "Ashoka Business Review"}
                </h2>
            </div>
        </div>
    )
}
