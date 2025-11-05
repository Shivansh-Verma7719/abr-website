import { Card, CardBody, CardFooter, Chip, Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`${basePath}/${edition.id}`}>
                <Card
                    isPressable
                    isHoverable
                    className="h-full hover:scale-105 transition-transform duration-300"
                >
                    <CardBody className="p-0">
                        <Image
                            src={
                                edition.cover_image ||
                                "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=800&q=80"
                            }
                            alt={edition.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                {edition.issue_number && (
                                    <Chip color="primary" variant="flat" size="sm">
                                        Issue #{edition.issue_number}
                                    </Chip>
                                )}
                                <Chip color="success" variant="flat" size="sm">
                                    {edition.articleCount || 0} {edition.articleCount === 1 ? "Article" : "Articles"}
                                </Chip>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{edition.title}</h3>
                            {edition.subtitle && (
                                <p className="text-lg text-gray-600 mb-2">{edition.subtitle}</p>
                            )}
                            {edition.description && (
                                <p className="text-gray-500 line-clamp-2">{edition.description}</p>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0 px-6 pb-6">
                        {edition.publication_date && (
                            <p className="text-sm text-gray-500">
                                {new Date(edition.publication_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        )}
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}
