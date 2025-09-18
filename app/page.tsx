'use client';
import { Input, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Globe, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleCard from '@/components/abr/ArticleCard';
import { Article } from '@/types/abr';

// Sample featured articles data
const featuredArticles: Article[] = [
  {
    id: 1,
    title: "The Future of Sustainable Business Practices",
    excerpt: "Exploring how companies are adapting to environmental challenges and creating value through sustainability initiatives.",
    author: "Sarah Chen",
    publishDate: "2024-03-15",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/articles/sustainable-business",
    category: "Sustainability"
  },
  {
    id: 2,
    title: "Digital Transformation in Financial Services",
    excerpt: "How fintech innovations are reshaping traditional banking and creating new opportunities for financial inclusion.",
    author: "Michael Rodriguez",
    publishDate: "2024-03-12",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/articles/fintech-transformation",
    category: "Technology"
  },
  {
    id: 3,
    title: "Emerging Markets: The Next Growth Frontier",
    excerpt: "An analysis of investment opportunities and challenges in developing economies across Asia, Africa, and Latin America.",
    author: "Priya Sharma",
    publishDate: "2024-03-10",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/articles/emerging-markets",
    category: "Markets"
  }
];

const stats = [
  { icon: BookOpen, label: "Articles Published", value: "500+" },
  { icon: Users, label: "Global Readers", value: "50K+" },
  { icon: Globe, label: "Countries Reached", value: "25+" },
  { icon: Award, label: "Industry Awards", value: "10+" }
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-abr-red/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                The <span className="text-abr-red">Ashoka</span>
                <br />
                Business Review
              </h1>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 bg-abr-red rounded-full"></div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your premier destination for cutting-edge business insights, market analysis,
              and thought leadership from the brightest minds in commerce.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/articles" className="group">
                <div className="bg-abr-red text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-abr-red/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Explore Articles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/about" className="group">
                <div className="border-2 border-abr-red text-abr-red px-8 py-4 rounded-full font-semibold text-lg hover:bg-abr-red hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Learn More
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-abr-red/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-abr-red" />
                </div>
                <div className="text-3xl font-bold text-abr-red mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured <span className="text-abr-red">Articles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest insights and analysis on the most pressing business topics of today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/articles" className="group">
              <div className="inline-flex items-center gap-2 text-abr-red font-semibold text-lg hover:gap-3 transition-all duration-300">
                View All Articles
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Where Business
                <br />
                <span className="text-abr-red">Meets Innovation</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The Ashoka Business Review is more than just a publication—it&apos;s a platform for
                forward-thinking business leaders, entrepreneurs, and academics to share insights
                that shape the future of commerce.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-abr-red rounded-full"></div>
                  <span className="text-gray-700">In-depth market analysis and trends</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-abr-red rounded-full"></div>
                  <span className="text-gray-700">Expert opinions from industry leaders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-abr-red rounded-full"></div>
                  <span className="text-gray-700">Cutting-edge business strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-abr-red rounded-full"></div>
                  <span className="text-gray-700">Global perspectives on commerce</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Business meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-abr-red/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-abr-red rounded-2xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-abr-red rounded-full opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-abr-red to-abr-red/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive the latest business insights,
              market analysis, and exclusive content delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                size="lg"
                radius="full"
                variant="flat"
                classNames={{
                  base: "flex-1",
                  input: "text-lg placeholder:text-gray-500",
                  inputWrapper: "h-14 px-6 bg-white border-0 focus-within:!bg-white shadow-sm"
                }}
              />
              <Button
                size="lg"
                radius="full"
                className="bg-white text-abr-red px-8 h-14 font-semibold hover:bg-gray-50 transition-colors duration-300"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
