'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from 'lucide-react';
import { Button, Chip, Spinner } from '@heroui/react';
import { formatDate } from '@/utils/date';
import { fetchArticleBySlug, ArticleData } from './helpers';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const [article, setArticle] = useState<ArticleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedParams.slug]);

    const loadArticle = async () => {
        try {
            const data = await fetchArticleBySlug(resolvedParams.slug);
            setArticle(data);
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share && article) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt || '',
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" label="Loading article..." />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        {error || "The article you're looking for doesn't exist or has been removed."}
                    </p>
                    <Button as={Link} href="/" color="primary" size="lg">
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header with Back Button */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Button
                        as={Link}
                        href={article.edition?.publication?.id === 1 ? '/magazine' : article.edition?.publication?.id === 2 ? '/monocle' : '/'}
                        variant="flat"
                        startContent={<ArrowLeft className="w-4 h-4" />}
                    >
                        Back
                    </Button>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Category Badge */}
                {article.category && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <Chip
                            style={{ backgroundColor: article.category.color || '#3B82F6' }}
                            className="text-white"
                            size="lg"
                            startContent={<Tag className="w-4 h-4" />}
                        >
                            {article.category.name}
                        </Chip>
                    </motion.div>
                )}

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight"
                >
                    {article.title}
                </motion.h1>

                {/* Excerpt */}
                {article.excerpt && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-8 leading-relaxed"
                    >
                        {article.excerpt}
                    </motion.p>
                )}

                {/* Meta Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b"
                >
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        {article.author?.profile_image ? (
                            <Image
                                src={article.author.profile_image}
                                alt={article.author.full_name || 'Author'}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-abr-red/10 flex items-center justify-center">
                                <User className="w-6 h-6 text-abr-red" />
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-gray-500">Written by</p>
                            <p className="font-semibold text-foreground">
                                {article.author?.full_name || 'Unknown Author'}
                            </p>
                        </div>
                    </div>

                    {/* Published Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(article.published_at || article.created_at || '')}</span>
                    </div>

                    {/* Read Time */}
                    {article.read_time && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-5 h-5" />
                            <span>{article.read_time} min read</span>
                        </div>
                    )}

                    {/* Share Button */}
                    <Button
                        isIconOnly
                        variant="flat"
                        onPress={handleShare}
                        className="ml-auto"
                    >
                        <Share2 className="w-5 h-5" />
                    </Button>
                </motion.div>

                {/* Featured Image */}
                {article.featured_image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12"
                    >
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                )}

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-gray-700 prose-a:text-abr-red prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Edition Info */}
                {article.edition && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12 p-6 bg-gray-50 rounded-2xl"
                    >
                        <p className="text-sm text-gray-500 mb-2">Published in</p>
                        <p className="text-lg font-semibold text-foreground">
                            {article.edition.publication?.name} - {article.edition.title}
                            {article.edition.issue_number && ` (Issue ${article.edition.issue_number})`}
                        </p>
                    </motion.div>
                )}
            </article>
        </div>
    );
}
