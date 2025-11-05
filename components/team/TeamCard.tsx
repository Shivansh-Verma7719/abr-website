import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandInstagram,
    IconBrandGithub,
    IconMail,
    IconWorld
} from '@tabler/icons-react';
import { TeamMember, SocialLink } from '@/types/team';

interface TeamCardProps {
    member: TeamMember;
    index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
    const getSocialIcon = (platform: SocialLink['platform']) => {
        const iconProps = { size: 18, className: "text-white transition-colors duration-300" };

        switch (platform) {
            case 'linkedin':
                return <IconBrandLinkedin {...iconProps} />;
            case 'twitter':
                return <IconBrandTwitter {...iconProps} />;
            case 'instagram':
                return <IconBrandInstagram {...iconProps} />;
            case 'github':
                return <IconBrandGithub {...iconProps} />;
            case 'email':
                return <IconMail {...iconProps} />;
            case 'website':
                return <IconWorld {...iconProps} />;
            default:
                return null;
        }
    };

    const getSocialUrl = (link: SocialLink) => {
        if (link.platform === 'email') {
            return `mailto:${link.url}`;
        }
        return link.url;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-64 md:h-72 group cursor-pointer"
            style={{ perspective: '1000px' }}
        >
            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-abr-red rounded-[1.75rem] shadow-2xl p-6 flex flex-col justify-center items-center">
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

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[1.75rem] shadow-2xl p-6 flex flex-col justify-center items-center bg-gradient-to-br from-red-800 to-red-100 text-white border border-abr-red">
                    {/* Description */}
                    <div className="text-center mb-4 flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold mb-3">
                            {member.name}
                        </h3>
                        {member.description && (
                            <p className="text-sm text-white/90 leading-relaxed mb-4">
                                {member.description}
                            </p>
                        )}
                    </div>

                    {/* Social Links */}
                    {member.socialLinks && member.socialLinks.length > 0 && (
                        <div className="flex justify-center gap-3 flex-wrap">
                            {member.socialLinks.map((link, linkIndex) => (
                                <Link
                                    key={`social-link-${linkIndex}`}
                                    href={getSocialUrl(link)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                                    aria-label={`${member.name} on ${link.platform}`}
                                >
                                    {getSocialIcon(link.platform)}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
