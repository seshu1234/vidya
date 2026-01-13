"use client";

import { useState } from "react";
import { courses, getAllCategories } from "@/lib/course-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", ...getAllCategories()];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              course.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black">
            <Navbar />
            
            <main className="flex-1 pb-24">
                {/* Header */}
                <div className="bg-black text-white py-16 px-6 pt-24">
                    <div className="max-w-7xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Explore Our Catalog
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                           Master the skills of tomorrow. From AI to Full Stack Development, find the perfect course for your career.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto mt-8">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search courses (e.g. React, Python, AI)..." 
                                className="pl-12 h-12 bg-white text-black rounded-full shadow-lg border-0 text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12">
                     {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-64 space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Filter className="h-4 w-4" /> Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                            selectedCategory === category 
                                            ? "bg-black text-white font-semibold dark:bg-white dark:text-black" 
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter (Select) */}
                    <div className="lg:hidden">
                        <select 
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Course Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                                {selectedCategory === "All" ? "All Courses" : `${selectedCategory} Courses`}
                                <span className="ml-2 text-sm font-medium text-muted-foreground">({filteredCourses.length})</span>
                            </h2>
                        </div>

                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                <p>No courses found matching your criteria.</p>
                                <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}>Clear Filters</Button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <Link key={course.id} href={`/courses/${course.category.toLowerCase().replace(/ /g, '-')}/${course.slug}`}>
                                    <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-slate-200 dark:border-navy-800 flex flex-col overflow-hidden p-0 gap-0">
                                            <div className={`h-2 w-full ${
                                                course.level === 'Beginner' ? 'bg-green-500' : 
                                                course.level === 'Intermediate' ? 'bg-blue-500' : 'bg-purple-500'
                                            }`}></div>
                                            <div className="flex flex-col flex-1 p-6">
                                                <CardHeader className="p-0 mb-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                                                            {course.level}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground font-medium">
                                                            <span className="text-yellow-500 mr-1">★</span> {course.rating}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-lg font-bold leading-tight line-clamp-2">
                                                        {course.title}
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-2 mt-2">
                                                        {course.subtitle}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardFooter className="mt-auto pt-0 p-0 text-xs font-medium text-muted-foreground flex items-center gap-4">
                                                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons} Lessons</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                                </CardFooter>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
