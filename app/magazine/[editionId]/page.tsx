"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner, Card, CardBody, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { fetchEditionById, fetchArticlesByEdition, type Article, type Edition } from "../helpers";
import ArticleCard from "@/components/abr/ArticleCard";

export default function EditionArticlesPage() {
    const params = useParams();
    const editionId = parseInt(params.editionId as string);
    const [edition, setEdition] = useState<Edition | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [editionData, articlesData] = await Promise.all([
                    fetchEditionById(editionId),
                    fetchArticlesByEdition(editionId),
                ]);
                setEdition(editionData);
                setArticles(articlesData);
            } catch (error) {
                console.error("Error loading edition:", error);
            } finally {
                setLoading(false);
            }
        };

        if (editionId) {
            loadData();
        }
    }, [editionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!edition) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Edition Not Found</h1>
                    <p className="text-gray-600">The edition you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Edition Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Chip color="primary" variant="flat" size="lg">
                            {edition.issue_number ? `Issue #${edition.issue_number}` : "Special Edition"}
                        </Chip>
                        <Chip color="success" variant="flat">
                            {articles.length} {articles.length === 1 ? "Article" : "Articles"}
                        </Chip>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {edition.title}
                    </h1>
                    {edition.description && (
                        <p className="text-xl text-gray-600 max-w-3xl">
                            {edition.description}
                        </p>
                    )}
                    {edition.publication_date && (
                        <p className="text-gray-500 mt-2">
                            Published: {new Date(edition.publication_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    )}
                </motion.div>

                {/* Articles Grid */}
                {articles.length === 0 ? (
                    <Card className="p-8">
                        <CardBody>
                            <p className="text-center text-gray-600">
                                No published articles in this edition yet.
                            </p>
                        </CardBody>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ArticleCard article={article} index={index} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
