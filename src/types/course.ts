export type Course = {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    lessons: number;
    category: string;
    rating: number;
    students: number;
    price: string;
    description: string;
    syllabus: {
        week: number;
        title: string;
        topics: string[];
        // Content map: topic title -> markdown content
        content?: Record<string, string>; 
    }[];
    features: string[];
};
