"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, HelpCircle, Lightbulb, Github } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black font-sans">
            <Navbar />
            
            <main className="flex-1 pb-24">
                {/* Hero Section */}
                <div className="bg-white dark:bg-navy-950 border-b border-slate-100 dark:border-navy-800 pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6 text-center text-navy-900 dark:text-white space-y-6">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            How can we help you?
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Find answers, report issues, or suggest new features. We are here to support your learning journey.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
                    {/* Left Column: FAQ & Contact */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                <AccordionItem value="item-1" className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-lg px-4">
                                    <AccordionTrigger className="hover:no-underline font-medium">Is the content strictly in Hinglish?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400">
                                        Yes, our primary mode of instruction is Hinglish (Hindi + English) to make complex topics easier to digest. However, all technical terms are taught in standard English for industry readiness.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-lg px-4">
                                    <AccordionTrigger className="hover:no-underline font-medium">Do I get a certificate?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400">
                                        Absolutely! Upon completing all modules and the final project of any course or path, you will receive a verifiable industry-recognized certificate.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-lg px-4">
                                    <AccordionTrigger className="hover:no-underline font-medium">Can I access on mobile?</AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400">
                                        Yes, our platform is fully responsive. You can learn on your phone, tablet, or laptop. We are also building dedicated Android and iOS apps.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>

                        <section className="bg-slate-100 dark:bg-navy-900/50 p-8 rounded-2xl border border-slate-200 dark:border-navy-800">
                            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5" /> Contact Support
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Can't find what you're looking for? Email our support team directly.
                            </p>
                            <Button className="w-full bg-black text-white hover:bg-slate-800 h-12 text-base font-bold">
                                support@nextgovjob.com
                            </Button>
                        </section>
                    </div>

                    {/* Right Column: Feedback & Features */}
                    <div className="space-y-8">
                        {/* Feature Request */}
                        <Card className="border-slate-200 dark:border-navy-800 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                                    Request a Feature
                                </CardTitle>
                                <CardDescription>
                                    Have an idea to make Vidya better? Let us know!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Feature Title</label>
                                    <Input placeholder="e.g. Dark Mode for Code Editor" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                                    <Textarea placeholder="Explain how this feature would help you..." className="min-h-[100px]" />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                                    Submit Request
                                </Button>
                            </CardContent>
                        </Card>

                        {/* General Feedback */}
                        <Card className="border-slate-200 dark:border-navy-800 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5 text-green-500" />
                                    Report an Issue / Feedback
                                </CardTitle>
                                <CardDescription>
                                    Found a bug or have general feedback?
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea placeholder="Tell us what went wrong or what you like..." className="min-h-[100px]" />
                                <Button variant="outline" className="w-full">
                                    Send Feedback
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
