"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Textarea, Button } from '@heroui/react';
import { Mail, MapPin, Phone, Send, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen w-full bg-background">
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-abr-red to-red-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            Have a story idea, feedback, or want to contribute to ABR?
                            We&apos;d love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
                            >
                                <h2 className="text-3xl font-bold text-foreground mb-6">
                                    Send Us a Message
                                </h2>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6"
                                    >
                                        Thanks for reaching out! We&apos;ll get back to you soon.
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        type="text"
                                        name="name"
                                        label="Your Name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-2 border-gray-200 hover:border-gray-300 focus-within:!border-abr-red"
                                        }}
                                    />

                                    <Input
                                        type="email"
                                        name="email"
                                        label="Email Address"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-2 border-gray-200 hover:border-gray-300 focus-within:!border-abr-red"
                                        }}
                                    />

                                    <Input
                                        type="text"
                                        name="subject"
                                        label="Subject"
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        variant="bordered"
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-2 border-gray-200 hover:border-gray-300 focus-within:!border-abr-red"
                                        }}
                                    />

                                    <Textarea
                                        name="message"
                                        label="Message"
                                        placeholder="Tell us more..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        minRows={6}
                                        variant="bordered"
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-2 border-gray-200 hover:border-gray-300 focus-within:!border-abr-red"
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        size="lg"
                                        radius="full"
                                        isLoading={isSubmitting}
                                        endContent={!isSubmitting && <Send className="w-5 h-5" />}
                                        className="bg-abr-red text-white px-8 font-semibold hover:bg-abr-red/90 transition-all duration-300 w-full"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground mb-6">
                                        Contact Information
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        Reach out to us through any of these channels. We typically respond within 24-48 hours.
                                    </p>
                                </div>

                                {/* Contact Cards */}
                                <div className="space-y-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4"
                                    >
                                        <div className="bg-abr-red/10 p-3 rounded-xl">
                                            <Mail className="w-6 h-6 text-abr-red" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground mb-1">Email</h3>
                                            <a
                                                href="mailto:abr@ashoka.edu.in"
                                                className="text-gray-600 hover:text-abr-red transition-colors"
                                            >
                                                abr@ashoka.edu.in
                                            </a>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4"
                                    >
                                        <div className="bg-abr-red/10 p-3 rounded-xl">
                                            <MapPin className="w-6 h-6 text-abr-red" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground mb-1">Location</h3>
                                            <p className="text-gray-600">
                                                Ashoka University<br />
                                                Rajiv Gandhi Education City<br />
                                                Sonipat, Haryana 131029
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4"
                                    >
                                        <div className="bg-abr-red/10 p-3 rounded-xl">
                                            <Phone className="w-6 h-6 text-abr-red" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground mb-1">Phone</h3>
                                            <a
                                                href="tel:+911234567890"
                                                className="text-gray-600 hover:text-abr-red transition-colors"
                                            >
                                                +91 123 456 7890
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Social Media */}
                                <div className="bg-gradient-to-br from-abr-red to-red-700 rounded-2xl shadow-lg p-8">
                                    <h3 className="font-semibold text-xl text-white mb-4">
                                        Follow Us
                                    </h3>
                                    <p className="text-white/90 mb-6">
                                        Stay updated with our latest articles and announcements
                                    </p>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://linkedin.com/company/abr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300"
                                        >
                                            <Linkedin className="w-6 h-6 text-white" />
                                        </a>
                                        <a
                                            href="https://instagram.com/abr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300"
                                        >
                                            <Instagram className="w-6 h-6 text-white" />
                                        </a>
                                        <a
                                            href="https://twitter.com/abr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300"
                                        >
                                            <Twitter className="w-6 h-6 text-white" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-2">
                                    How can I contribute to ABR?
                                </h3>
                                <p className="text-gray-600">
                                    We welcome submissions from students and professionals. Send us your article pitch or portfolio via email.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-2">
                                    Do you accept guest writers?
                                </h3>
                                <p className="text-gray-600">
                                    Yes! We actively seek diverse perspectives. Reach out with your article idea and writing samples.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-2">
                                    How often do you publish?
                                </h3>
                                <p className="text-gray-600">
                                    We publish new editions monthly, with regular online articles throughout the month.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-2">
                                    Can I advertise with ABR?
                                </h3>
                                <p className="text-gray-600">
                                    We offer advertising opportunities for relevant businesses. Contact us for our media kit.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
