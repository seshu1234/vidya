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
    }[];
    features: string[];
};

export const courses: Course[] = [
    // Latest Trends
    { 
        id: "lt-1", title: "Remix.js Revolution", slug: "remix-js-revolution", subtitle: "Full Stack React Framework", 
        level: "Advanced", duration: "6 Weeks", lessons: 40, category: "Latest Trends", rating: 4.8, students: 1200, price: "Free",
        description: "Master Remix.js, the full-stack React framework that focuses on web standards and modern UX. Learn loaders, actions, and nested routing.",
        syllabus: [
            { week: 1, title: "Intro to Remix", topics: ["File-based Routing", "Loaders vs useEffect", "Deployment"] },
            { week: 2, title: "Data Mutation", topics: ["Form Actions", "Validation", "Optimistic UI"] }
        ],
        features: ["Build a real SaaS", "SSR mastery", "Hinglish Support"]
    },
    { 
        id: "lt-2", title: "Next.js 14 Mastery", slug: "next-js-14-mastery", subtitle: "App Router & Server Actions", 
        level: "Advanced", duration: "8 Weeks", lessons: 55, category: "Latest Trends", rating: 4.9, students: 8500, price: "Free",
        description: "Deep dive into Next.js 14 App Router, Server Components, and Server Actions. Build scalable web applications.",
        syllabus: [
            { week: 1, title: "App Router Basics", topics: ["Server vs Client Components", "Layouts", "Metadata"] },
            { week: 2, title: "Server Actions", topics: ["Mutations without API", "Zod Validation", "Revalidation"] }
        ],
        features: ["Official Vercel patterns", "Hinglish explanations", "Project: E-commerce"]
    },
    { 
        id: "lt-3", title: "Nuxt.js Power", slug: "nuxt-js-power", subtitle: "Vue Framework on Steroids", 
        level: "Intermediate", duration: "5 Weeks", lessons: 38, category: "Latest Trends", rating: 4.7, students: 3000, price: "Free",
        description: "The ultimate guide to building universal Vue.js applications with Nuxt 3.",
        syllabus: [], features: []
    },
    { id: "lt-4", title: "Vue.js 3 Fundamentals", slug: "vue-js-3-fundamentals", subtitle: "Composition API", level: "Beginner", duration: "4 Weeks", lessons: 30, category: "Latest Trends", rating: 4.6, students: 4000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "lt-5", title: "Express.js Backend", slug: "express-js-backend", subtitle: "Fast & Minimal APIs", level: "Intermediate", duration: "6 Weeks", lessons: 28, category: "Latest Trends", rating: 4.5, students: 5500, price: "Free", description: "", syllabus: [], features: [] },
    { id: "lt-6", title: "Bun Runtime", slug: "bun-runtime", subtitle: "Faster than Node", level: "Advanced", duration: "2 Weeks", lessons: 15, category: "Latest Trends", rating: 4.8, students: 1500, price: "Free", description: "", syllabus: [], features: [] },

    // AI Modules
    { id: "ai-1", title: "LangChain Zero to Hero", slug: "langchain-zero-to-hero", subtitle: "Build LLM Apps", level: "Advanced", duration: "8 Weeks", lessons: 45, category: "AI & Data", rating: 4.9, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-2", title: "Supabase Vector", slug: "supabase-vector", subtitle: "Open Source Firebase", level: "Intermediate", duration: "4 Weeks", lessons: 30, category: "AI & Data", rating: 4.8, students: 3200, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-3", title: "RAG Pipelines", slug: "rag-pipelines", subtitle: "Chat with PDF", level: "Advanced", duration: "5 Weeks", lessons: 35, category: "AI & Data", rating: 4.7, students: 2800, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-4", title: "LangFuse Observability", slug: "langfuse-observability", subtitle: "Debug LLMs", level: "Intermediate", duration: "3 Weeks", lessons: 20, category: "AI & Data", rating: 4.6, students: 1200, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-5", title: "OpenAI GPT-4 API", slug: "openai-gpt-4-api", subtitle: "Prompt Engineering", level: "Beginner", duration: "4 Weeks", lessons: 25, category: "AI & Data", rating: 4.8, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-6", title: "HuggingFace Transformers", slug: "huggingface-transformers", subtitle: "Local Models", level: "Advanced", duration: "6 Weeks", lessons: 50, category: "AI & Data", rating: 4.7, students: 4500, price: "Free", description: "", syllabus: [], features: [] },

     // Programming
    { id: "prog-1", title: "C Programming", slug: "c-programming", subtitle: "Mother of Languages", level: "Beginner", duration: "10 Weeks", lessons: 60, category: "Programming", rating: 4.8, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-2", title: "C++ with STL", slug: "cpp-with-stl", subtitle: "Competitive Coding", level: "Intermediate", duration: "12 Weeks", lessons: 75, category: "Programming", rating: 4.9, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-3", title: "Java Masterclass", slug: "java-masterclass", subtitle: "Core + Advanced", level: "Intermediate", duration: "14 Weeks", lessons: 80, category: "Programming", rating: 4.7, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-4", title: "Python Zero to Hero", slug: "python-zero-to-hero", subtitle: "Scripting to AI", level: "Beginner", duration: "8 Weeks", lessons: 55, category: "Programming", rating: 4.9, students: 25000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-5", title: "C# .NET Core", slug: "csharp-net-core", subtitle: "Enterprise Apps", level: "Advanced", duration: "10 Weeks", lessons: 65, category: "Programming", rating: 4.6, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-6", title: "R for Statistics", slug: "r-for-statistics", subtitle: "Data Analysis", level: "Beginner", duration: "6 Weeks", lessons: 35, category: "Programming", rating: 4.5, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-7", title: "Go (Golang)", slug: "golang", subtitle: "High Performance", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Programming", rating: 4.7, students: 6000, price: "Free", description: "", syllabus: [], features: [] },

    // Web Development
    { id: "web-1", title: "HTML5 Mastery", slug: "html5-mastery", subtitle: "Semantic Web", level: "Beginner", duration: "3 Weeks", lessons: 20, category: "Web Development", rating: 4.8, students: 30000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-2", title: "CSS3 & Tailwind", slug: "css3-tailwind", subtitle: "Modern Styling", level: "Beginner", duration: "5 Weeks", lessons: 30, category: "Web Development", rating: 4.9, students: 28000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-3", title: "JavaScript Deep Dive", slug: "javascript-deep-dive", subtitle: "ES6+ Features", level: "Intermediate", duration: "8 Weeks", lessons: 50, category: "Web Development", rating: 4.8, students: 22000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-4", title: "React.js Hooked", slug: "react-js-hooked", subtitle: "Component Logic", level: "Intermediate", duration: "8 Weeks", lessons: 45, category: "Web Development", rating: 4.9, students: 20000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-5", title: "Angular Enterprise", slug: "angular-enterprise", subtitle: "Scalable Framework", level: "Advanced", duration: "10 Weeks", lessons: 60, category: "Web Development", rating: 4.6, students: 7000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-6", title: "Node.js Internals", slug: "node-js-internals", subtitle: "Event Loop & Streams", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Web Development", rating: 4.7, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    
    // CS Fundamentals
    { id: "cs-1", title: "Operating Systems", slug: "operating-systems", subtitle: "Process, Threads, Deadlocks", level: "Intermediate", duration: "10 Weeks", lessons: 45, category: "CS Fundamentals", rating: 4.8, students: 11000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-2", title: "DBMS Mastery", slug: "dbms-mastery", subtitle: "ACID, Normalization, SQL", level: "Intermediate", duration: "10 Weeks", lessons: 50, category: "CS Fundamentals", rating: 4.8, students: 13000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-3", title: "Computer Networks", slug: "computer-networks", subtitle: "TCP/IP, OSI Model", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "CS Fundamentals", rating: 4.7, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-4", title: "Cyber Security Intro", slug: "cyber-security-intro", subtitle: "Ethical Hacking Basics", level: "Beginner", duration: "6 Weeks", lessons: 35, category: "CS Fundamentals", rating: 4.9, students: 8000, price: "Free", description: "", syllabus: [], features: [] },

    // Mobile
    { id: "mob-1", title: "Android with Kotlin", slug: "android-kotlin", subtitle: "Modern App Dev", level: "Intermediate", duration: "12 Weeks", lessons: 60, category: "Mobile Dev", rating: 4.8, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-2", title: "iOS with Swift", slug: "ios-swift", subtitle: "Apple Ecosystem", level: "Intermediate", duration: "12 Weeks", lessons: 55, category: "Mobile Dev", rating: 4.8, students: 7000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-3", title: "Flutter Hybrid", slug: "flutter-hybrid", subtitle: "One Codebase", level: "Beginner", duration: "10 Weeks", lessons: 45, category: "Mobile Dev", rating: 4.9, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    
    // Databases
    { id: "db-1", title: "SQL Mastery", slug: "sql-mastery", subtitle: "Queries & Joins", level: "Beginner", duration: "6 Weeks", lessons: 35, category: "Databases", rating: 4.8, students: 20000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "db-2", title: "MongoDB NoSQL", slug: "mongodb-nosql", subtitle: "Schema-less Data", level: "Intermediate", duration: "5 Weeks", lessons: 30, category: "Databases", rating: 4.7, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    
    // Cloud
    { id: "cloud-1", title: "AWS Certified", slug: "aws-certified", subtitle: "Cloud Essentials", level: "Intermediate", duration: "12 Weeks", lessons: 50, category: "Cloud & DevOps", rating: 4.9, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-2", title: "Docker Container", slug: "docker-container", subtitle: "Containerization", level: "Intermediate", duration: "4 Weeks", lessons: 25, category: "Cloud & DevOps", rating: 4.8, students: 16000, price: "Free", description: "", syllabus: [], features: [] },
];

export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
export const getCoursesByCategory = (category: string) => courses.filter((c) => c.category === category);
export const getAllCategories = () => Array.from(new Set(courses.map(c => c.category)));
