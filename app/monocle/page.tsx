'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@heroui/react';
import ArticleCard from '@/components/abr/ArticleCard';
import { Article } from '@/types/abr';
import { fetchMonocleArticles } from './helpers';

export default function MonoclePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const data = await fetchMonocleArticles();
            setArticles(data);
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" label="Loading Monocle articles..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-gradient-to-br from-abc-purple/10 to-abc-purple/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                            The Monocle
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Deep dives into business insights and strategic analysis
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {articles.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No articles available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => (
                                <ArticleCard key={article.id} article={article} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
