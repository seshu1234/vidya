"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface Tool {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category_id: string | null;
    category_name: string | null;
    course?: {
        slug: string;
    } | null;
    metadata: {
        group_name?: string;
        description?: string;
    };
}

interface ToolsGridClientProps {
    initialTools: Tool[];
}

export function ToolsGridClient({ initialTools }: ToolsGridClientProps) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

    // Extract unique categories from tools for filtering
    const categories = useMemo(() => {
        const catMap = new Map<string, string>();
        initialTools.forEach(tool => {
            if (tool.category_id && tool.category_name) {
                catMap.set(tool.category_id, tool.category_name);
            }
        });
        return Array.from(catMap.entries()).map(([id, name]) => ({ id, name })).sort((a,b) => a.name.localeCompare(b.name));
    }, [initialTools]);

    // Group tools by group_name for display
    const filteredTools = useMemo(() => {
        if (selectedCategoryId === "all") return initialTools;
        return initialTools.filter(t => t.category_id === selectedCategoryId);
    }, [initialTools, selectedCategoryId]);

    const groups = useMemo(() => {
        const g: Record<string, { name: string; description: string; tools: Tool[] }> = {};
        filteredTools.forEach((tool) => {
            const groupName = tool.metadata?.group_name || "Other";
            const groupDesc = tool.metadata?.description || "";
            
            if (!g[groupName]) {
                g[groupName] = {
                    name: groupName,
                    description: groupDesc,
                    tools: []
                };
            }
            g[groupName].tools.push(tool);
        });
        return Object.values(g);
    }, [filteredTools]);

    return (
        <section className="max-w-7xl mx-auto py-24 px-6 border-t border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-black/20" id="tools">
            <div className="text-center mb-16 space-y-4">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl text-navy-900 dark:text-white">
                    100+ Developer Tools Library
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Master the industry-standard toolchain. We teach you how to use the exact tools used by top tech companies.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
                <Button 
                    variant={selectedCategoryId === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategoryId("all")}
                    className={cn("rounded-full", selectedCategoryId === "all" ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900" : "")}
                >
                    All Tools
                </Button>
                {categories.map((cat) => (
                    <Button 
                        key={cat.id}
                        variant={selectedCategoryId === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={cn("rounded-full", selectedCategoryId === cat.id ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900" : "")}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>

            <div className="space-y-12">
                {groups.map((category, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-navy-800 pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-navy-900 dark:text-white">{category.name}</h3>
                                <p className="text-muted-foreground">{category.description}</p>
                            </div>
                            <Button variant="outline" className="w-fit">View {category.name} Docs</Button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {category.tools.map((tool) => {
                                const Content = (
                                    <div className="
                                        group flex items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-navy-800 
                                        bg-white dark:bg-navy-900/40 hover:border-black dark:hover:border-white hover:shadow-md transition-all cursor-pointer
                                        h-full
                                    ">
                                        <span className={cn(
                                            "font-semibold text-slate-700 dark:text-slate-300 transition-colors",
                                            tool.course ? "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" : "group-hover:text-black dark:group-hover:text-white"
                                        )}>
                                            {tool.name}
                                        </span>
                                    </div>
                                );

                                if (tool.course?.slug) {
                                    return (
                                        <Link key={tool.id} href={`/learn/${tool.course.slug}`} className="block h-full">
                                            {Content}
                                        </Link>
                                    );
                                }

                                return <div key={tool.id} className="block h-full">{Content}</div>;
                            })}
                        </div>
                    </div>
                ))}
                {groups.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No tools found for this category.
                    </div>
                )}
            </div>
            
             <div className="mt-16 text-center">
                  <Button size="lg" className="bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-900 font-bold h-12 px-8">
                    Explore Full Tool Directory
                  </Button>
             </div>
        </section>
    );
}
