'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, Share2, ThumbsUp } from 'lucide-react';
import { Button, Spinner, Chip } from '@heroui/react';
import { formatDate } from '@/utils/date';
import { fetchArticleBySlug, ArticleData } from './helpers';
import RichTextEditor from '@/components/ui/RichTextEditor';

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

            {/* Hero Section */}
            <section className="pt-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
                        >
                            {article.title}
                        </motion.h1>

                        {/* Featured Image */}
                        {article.featured_image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8"
                            >
                                <Image
                                    src={article.featured_image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>
                        )}
                        {/* Category Badge */}
                        {article.category && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6"
                            >
                                <Chip
                                    color="primary"
                                    variant="solid"
                                    radius="full"
                                    size="lg"
                                    classNames={{
                                        content: "text-white font-medium"
                                    }}
                                >
                                    {article.category.name}
                                </Chip>
                            </motion.div>
                        )}

                        {/* Meta Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-4 mb-8"
                        >
                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-abr-red rounded-full flex items-center justify-center">
                                    {article.author?.profile_image ? (
                                        <Image
                                            src={article.author.profile_image}
                                            alt={article.author.full_name || 'Author'}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-6 h-6 text-white" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {article.author?.full_name || 'Unknown Author'}
                                    </h3>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(article.published_at || article.created_at || '')}</span>
                                        </div>
                                        {article.read_time && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{article.read_time} min read</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Excerpt */}
                            {article.excerpt && (
                                <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {article.excerpt}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <RichTextEditor
                                content={article.content}
                                editable={false}
                                className="border-none"
                            />

                            {/* Social Actions */}
                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            size="md"
                                            radius="full"
                                            variant="flat"
                                            startContent={<ThumbsUp className="w-4 h-4" />}
                                            className="px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                                        >
                                            Like
                                        </Button>
                                    </div>
                                    <Button
                                        size="md"
                                        radius="full"
                                        onPress={handleShare}
                                        startContent={<Share2 className="w-4 h-4" />}
                                        className="px-6 bg-abr-red text-white hover:opacity-90 transition-colors duration-300"
                                    >
                                        Share Article
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Edition Info */}
                        {article.edition && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Published in</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {article.edition.publication?.name} - {article.edition.title}
                                    {article.edition.issue_number && ` (Issue ${article.edition.issue_number})`}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
