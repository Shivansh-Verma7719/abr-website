import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TeamMember } from '@/types/team';

interface TeamCardProps {
    member: TeamMember;
    index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-64 md:h-72"
        >
            <div className="w-full h-full bg-white border border-abr-red rounded-[1.75rem] shadow-2xl p-6 flex flex-col justify-center items-center">
                {/* Member Image */}
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-abr-red">
                        <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Name and Position */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                        {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {member.position}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
