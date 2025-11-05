"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner, Input, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { fetchEditionById, fetchArticlesByEdition, type Article, type Edition } from "../helpers";
import ArticleCard from "@/components/abr/ArticleCard";

export default function EditionArticlesPage() {
    const params = useParams();
    const editionId = parseInt(params.editionId as string);
    const [edition, setEdition] = useState<Edition | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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

    // Get unique categories from articles
    const categories = ["All", ...Array.from(new Set(articles.map(a => a.category)))];

    // Filter articles based on search and category
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background w-full">
            {/* Edition Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Chip color="success" variant="flat" size="lg">
                                    {articles.length} {articles.length === 1 ? "Article" : "Articles"}
                                </Chip>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">
                                {edition.title}
                            </h1>

                            {edition.subtitle && (
                                <p className="text-2xl text-gray-700 mb-4 font-medium">
                                    {edition.subtitle}
                                </p>
                            )}

                            {edition.description && (
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                    {edition.description}
                                </p>
                            )}

                            {edition.publication_date && (
                                <p className="text-gray-500">
                                    Published: {new Date(edition.publication_date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-4">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-12"
                    >
                        {/* Search Bar */}
                        <div className="relative mb-8">
                            <Input
                                type="text"
                                placeholder="Search articles by title, content, or author..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                startContent={<Search className="text-gray-400 w-5 h-5" />}
                                size="lg"
                                radius="full"
                                variant="bordered"
                                classNames={{
                                    base: "w-full",
                                    mainWrapper: "h-full",
                                    input: "text-lg placeholder:text-gray-400",
                                    inputWrapper: "h-16 px-6 border-2 border-gray-200 hover:border-gray-300 focus-within:!border-abr-red data-[hover=true]:border-gray-300 group-data-[focus=true]:border-abr-red bg-white shadow-sm"
                                }}
                            />
                        </div>

                        {/* Category Filter */}
                        {categories.length > 1 && (
                            <div className="flex flex-wrap gap-3 justify-center">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        variant={selectedCategory === category ? "solid" : "flat"}
                                        color={selectedCategory === category ? "default" : "default"}
                                        radius="full"
                                        size="md"
                                        className={selectedCategory === category
                                            ? 'bg-abr-red text-white shadow-lg hover:bg-abr-red/90 font-medium'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
                                        }
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Articles in This Edition
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} {searchQuery || selectedCategory !== "All" ? "found" : "available"}
                        </p>
                    </motion.div>

                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => (
                                <ArticleCard key={article.id} article={article} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
