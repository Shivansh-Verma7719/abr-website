"use client";
import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from '@/components/team/TeamCard';
import { TeamDepartment } from './helpers';

interface TeamPageWrapperProps {
    departments: TeamDepartment[];
}

export default function TeamPageWrapper({ departments }: TeamPageWrapperProps) {
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
                                    <div className="inline-block bg-abr-red text-white px-8 py-4 rounded-2xl mb-4 shadow-lg">
                                        <h2 className="text-3xl font-bold">
                                            {department.name}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                        {department.description}
                                    </p>
                                </div>

                                {/* Department Members - Center Aligned by Position */}
                                <div className="space-y-8">
                                    {/* Editor-in-Chief / Presidents - Center Aligned */}
                                    {department.members.filter(m =>
                                        m.position === "Editor-in-Chief" ||
                                        m.position === "President"
                                    ).length > 0 && (
                                            <div className="flex justify-center gap-6 flex-wrap">
                                                {department.members
                                                    .filter(m => m.position === "Editor-in-Chief" || m.position === "President")
                                                    .map((member, memberIndex) => (
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
                                        )}

                                    {/* Managing Editor / Vice Presidents - Center Aligned */}
                                    {department.members.filter(m =>
                                        m.position === "Managing Editor" ||
                                        m.position === "Vice President"
                                    ).length > 0 && (
                                            <div className="flex justify-center gap-6 flex-wrap">
                                                {department.members
                                                    .filter(m => m.position === "Managing Editor" || m.position === "Vice President")
                                                    .map((member, memberIndex) => (
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
                                        )}

                                    {/* All Other Positions - Center Aligned */}
                                    {department.members.filter(m =>
                                        m.position !== "Editor-in-Chief" &&
                                        m.position !== "President" &&
                                        m.position !== "Managing Editor" &&
                                        m.position !== "Vice President"
                                    ).length > 0 && (
                                            <div className="flex justify-center gap-6 flex-wrap">
                                                {department.members
                                                    .filter(m =>
                                                        m.position !== "Editor-in-Chief" &&
                                                        m.position !== "President" &&
                                                        m.position !== "Managing Editor" &&
                                                        m.position !== "Vice President"
                                                    )
                                                    .map((member, memberIndex) => (
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
                                        )}
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
