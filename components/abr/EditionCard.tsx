import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar } from 'lucide-react';
import { Database } from "@/types/database.types";

type Edition = Database["public"]["Tables"]["editions"]["Row"] & {
    articleCount?: number;
};

interface EditionCardProps {
    edition: Edition;
    publicationType: "magazine" | "monocle";
    index?: number;
}

export default function EditionCard({
    edition,
    publicationType,
    index = 0,
}: EditionCardProps) {
    const basePath = publicationType === "magazine" ? "/magazine" : "/monocle";

    return (
        <motion.article
            key={edition.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-[1.75rem] shadow-2xl overflow-hidden group cursor-pointer"
        >
            <Link href={`${basePath}/${edition.id}`} className="block">
                {/* Edition Cover Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={
                            edition.cover_image ||
                            "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={edition.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Edition Content */}
                <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{edition.articleCount || 0} {edition.articleCount === 1 ? "Article" : "Articles"}</span>
                        </div>
                        {edition.publication_date && (
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(edition.publication_date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-abr-red transition-colors duration-300">
                        {edition.title}
                    </h3>

                    {/* Subtitle */}
                    {edition.subtitle && (
                        <p className="text-gray-600 mb-2 line-clamp-1 font-medium">
                            {edition.subtitle}
                        </p>
                    )}

                    {/* Description */}
                    {edition.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {edition.description}
                        </p>
                    )}

                    {/* View Edition */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            {publicationType === "magazine" ? "Magazine" : "Monocle"}
                        </span>
                        <div className="flex items-center gap-1 text-abr-red font-medium group-hover:gap-2 transition-all duration-300">
                            <span>View Edition</span>
                            <BookOpen className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
