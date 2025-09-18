'use client'
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { HeroUIProvider } from "@heroui/react";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <>
            <HeroUIProvider>
                <main className="flex mt-20 rounded-b-3xl md:rounded-b-4xl relative z-10 min-h-screen flex-col items-center overflow-hidden bg-background">
                    <Navbar />
                    {children}
                </main>
                <Footer />
            </HeroUIProvider>
        </>
    );
}
