'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@heroui/react';
import EditionCard from '@/components/abr/EditionCard';
import { fetchMonocleEditions, type Edition } from './helpers';

export default function MonoclePage() {
    const [editions, setEditions] = useState<Edition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEditions();
    }, []);

    const loadEditions = async () => {
        try {
            const data = await fetchMonocleEditions();
            setEditions(data);
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
                <Spinner size="lg" label="Loading Monocle editions..." />
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
        <div className="min-h-screen bg-background w-full max-w-5xl">
            {/* Hero Section */}
            <section className="relative py-10 px-6">
                <div className="mx-auto">
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

            {/* Editions Grid */}
            <section className="py-8">
                <div className=" mx-auto">
                    {editions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No editions available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {editions.map((edition, index) => (
                                <EditionCard
                                    key={edition.id}
                                    edition={edition}
                                    publicationType="monocle"
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
