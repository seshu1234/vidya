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

export const courses: Course[] = [
    // ... (other courses remain unchanged, keep them)

     // Programming
    { 
        id: "prog-1", title: "C Programming Masterclass", slug: "c-programming", subtitle: "The Mother of All Languages", 
        level: "Beginner", duration: "10 Weeks", lessons: 60, category: "Programming", rating: 4.8, students: 15000, price: "Free", 
        description: "Start your coding journey with C, the language that powers operating systems and embedded devices. Understand memory management, pointers, and data structures from the ground up.",
        syllabus: [
            { 
                week: 1, 
                title: "Introduction to C", 
                topics: ["History & Importance", "Setting up Environment", "Hello World", "Variables & Data Types"],
                content: {
                    "History & Importance": `
# History & Importance of C

C is a general-purpose programming language created by **Dennis Ritchie** at the Bell Laboratories in 1972. It is a very popular language, despite being old.

## Why Learn C?
- **Foundation for other languages**: C++ and Java are based on C.
- **Understand the Machine**: C gives you control over memory.
- **Operating Systems**: Unix, Linux, and Windows are written in C.

> "C is quirky, flawed, and an enormous success." — Dennis Ritchie

## Where is C used?
1. Embedded Systems (Microwaves, Cameras)
2. Operating Systems
3. New Programming Languages (Python compiler is written in C)
                    `,
                    "Setting up Environment": `
# Setting up your C Environment

To write C code, you need a **Compiler**. The most common one is GCC (GNU Compiler Collection).

## Installing on Mac
\`\`\`bash
xcode-select --install
\`\`\`

## Installing on Windows
Install **MinGW** or use **WSL (Windows Subsystem for Linux)**.

## Your First IDE
We recommend using **VS Code** with the C/C++ Extension for the best experience.
                    `,
                    "Hello World": `
# Your First C Program

Let's write the classic "Hello, World!" program.

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

## Breaking it down
- \`#include <stdio.h>\`: Include the Standard Input/Output library.
- \`int main()\`: The entry point of every C program.
- \`printf()\`: Function to print text to the screen.
- \`return 0;\`: Indicates that the program finished successfully.
                    `
                }
            },
            { week: 2, title: "Control Flow", topics: ["If-Else Statements", "Switch Case", "Loops (For, While, Do-While)", "Break & Continue"] },
            { week: 3, title: "Functions & Recursion", topics: ["Function Declaration", "Parameters & Return Values", "Recursion Basics", "Stack Memory"] },
            { week: 4, title: "Pointers & Memory", topics: ["Pointer Syntax", "Pointer Arithmetic", "Call by Value vs Reference", "Dynamic Memory (malloc/free)"] },
            { week: 5, title: "Arrays & Strings", topics: ["1D & 2D Arrays", "String Handling", "Pointers with Arrays", "Buffer Overflow Risks"] },
        ], 
        features: ["Master Pointers & Memory Management", "Build a Text Editor from Scratch", "Understand How Computers Work", "Prepare for Embedded Systems"] 
    },
    // ... (rest of the file)
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
