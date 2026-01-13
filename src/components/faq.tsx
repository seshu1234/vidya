"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is this completely free?",
        answer: "Yes! Vidya (NextGovJob) is currently free for all learners. Our mission is to democratize tech education in India."
    },
    {
        question: "Is it really in Hinglish?",
        answer: "Bilkul! 100%. We use a mix of Hindi and English just like we speak in daily life. No complex 'shudh' Hindi, no heavy British English. Just simple, conversational language."
    },
    {
        question: "Do I get a certificate?",
        answer: "Yes, after completing a course and passing the final quiz, you will receive a verified certificate that you can share on LinkedIn."
    },
    {
        question: "Can I learn on my phone?",
        answer: "Absolutely. Our platform is mobile-first, meaning it works perfectly on ANY smartphone browser. No app download needed."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="max-w-3xl mx-auto py-24 px-6">
            <div className="text-center mb-16 space-y-4">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl text-navy-900 dark:text-white">
                    Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-lg">
                    Kuch sawal? Humare paas jawab hai.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="border border-slate-200 dark:border-navy-800 rounded-xl overflow-hidden bg-white dark:bg-navy-950/50 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="flex w-full items-center justify-between p-6 text-left"
                        >
                            <span className="font-semibold text-lg text-navy-900 dark:text-slate-100">
                                {faq.question}
                            </span>
                            <span className="shrink-0 ml-4 text-black dark:text-white">
                                {openIndex === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                            </span>
                        </button>
                        <div 
                            className={`px-6 text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                                openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
