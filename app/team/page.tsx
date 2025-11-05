"use client";
import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from '@/components/team/TeamCard';

// Mock data - replace with actual data fetching from Supabase
const mockTeamMembers = [
    {
        id: 1,
        name: "Sarah Johnson",
        position: "Editor-in-Chief",
        department: "Editorial",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=400&h=400&fit=crop&crop=faces",
        description: "Economics major with a passion for business journalism. Leading ABR with a vision to bridge academia and industry through insightful content and innovative storytelling.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/sarahjohnson" },
            { platform: "email" as const, url: "sarah.johnson@ashoka.edu.in" },
            { platform: "instagram" as const, url: "https://instagram.com/sarahjohnson" }
        ]
    },
    {
        id: 2,
        name: "Michael Chen",
        position: "Managing Editor",
        department: "Editorial",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
        description: "Business and Philosophy student focused on long-form journalism. Oversees editorial strategy and ensures quality across all publications.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/michaelchen" },
            { platform: "email" as const, url: "michael.chen@ashoka.edu.in" }
        ]
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        position: "Design Director",
        department: "Design",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
        description: "Visual Arts and Media Studies major specializing in editorial design. Creates stunning visual experiences that bring our stories to life.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/emmarodriguez" },
            { platform: "email" as const, url: "emma.rodriguez@ashoka.edu.in" },
            { platform: "instagram" as const, url: "https://instagram.com/emmarodriguez" }
        ]
    },
    {
        id: 4,
        name: "David Park",
        position: "Senior Writer",
        department: "Content",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
        description: "Economics and Political Science student specializing in market analysis and business trends. Writes in-depth features on emerging industries.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/davidpark" },
            { platform: "email" as const, url: "david.park@ashoka.edu.in" }
        ]
    },
    {
        id: 5,
        name: "Lisa Wang",
        position: "Research Analyst",
        department: "Content",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces",
        description: "Mathematics and Economics student with expertise in data analysis. Provides research support and fact-checking for all publications.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/lisawang" },
            { platform: "email" as const, url: "lisa.wang@ashoka.edu.in" }
        ]
    },
    {
        id: 6,
        name: "Alex Thompson",
        position: "Digital Editor",
        department: "Digital",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
        description: "Computer Science and Media Studies major focused on digital publishing. Manages online content and develops digital strategies.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/alexthompson" },
            { platform: "email" as const, url: "alex.thompson@ashoka.edu.in" },
            { platform: "website" as const, url: "https://alexthompson.dev" }
        ]
    },
    {
        id: 7,
        name: "Priya Sharma",
        position: "Social Media Manager",
        department: "Digital",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
        description: "Marketing and Psychology student dedicated to building ABR's online community. Creates engaging content that amplifies our stories.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/priyasharma" },
            { platform: "email" as const, url: "priya.sharma@ashoka.edu.in" },
            { platform: "instagram" as const, url: "https://instagram.com/priyasharma" }
        ]
    },
    {
        id: 8,
        name: "James Wilson",
        position: "Photography Lead",
        department: "Design",
        imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces",
        description: "Visual Arts major with a keen eye for storytelling through images. Captures compelling visuals that enhance our editorial content.",
        socialLinks: [
            { platform: "linkedin" as const, url: "https://linkedin.com/in/jameswilson" },
            { platform: "email" as const, url: "james.wilson@ashoka.edu.in" },
            { platform: "instagram" as const, url: "https://instagram.com/jameswilson" }
        ]
    }
];

const departments = [
    {
        id: "editorial",
        name: "Editorial",
        description: "Leading our content strategy and editorial vision",
        color: "from-blue-600 to-purple-600",
        members: mockTeamMembers.filter(m => m.department === "Editorial")
    },
    {
        id: "content",
        name: "Content",
        description: "Creating insightful stories and research-driven articles",
        color: "from-purple-600 to-pink-600",
        members: mockTeamMembers.filter(m => m.department === "Content")
    },
    {
        id: "design",
        name: "Design",
        description: "Crafting beautiful visual experiences",
        color: "from-pink-600 to-red-600",
        members: mockTeamMembers.filter(m => m.department === "Design")
    },
    {
        id: "digital",
        name: "Digital",
        description: "Building our digital presence and online community",
        color: "from-red-600 to-orange-600",
        members: mockTeamMembers.filter(m => m.department === "Digital")
    }
];

export default function TeamPage() {
    return (
        <div className="min-h-screen w-full bg-background">
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-abr-red to-red-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Meet the ABR Team
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            A passionate group of student journalists, writers, and designers dedicated to
                            delivering exceptional business insights and thought leadership.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Members by Department */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {departments.map((department, deptIndex) => (
                            <motion.div
                                key={department.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: deptIndex * 0.1 }}
                                className="mb-20 last:mb-0"
                            >
                                {/* Department Header */}
                                <div className="text-center mb-12">
                                    <div className={`inline-block bg-gradient-to-r ${department.color} text-white px-8 py-4 rounded-2xl mb-4 shadow-lg`}>
                                        <h2 className="text-3xl font-bold">
                                            {department.name}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                        {department.description}
                                    </p>
                                </div>

                                {/* Department Members Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {department.members.map((member, memberIndex) => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: memberIndex * 0.05 }}
                                            viewport={{ once: true }}
                                        >
                                            <TeamCard
                                                member={member}
                                                index={memberIndex}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Want to Join ABR?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            We&apos;re always looking for talented writers, editors, and designers to join our team.
                            If you&apos;re passionate about business journalism, reach out to us!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-abr-red text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-abr-red/90 transition-all duration-300"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
