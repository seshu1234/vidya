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
    // --- 1. CS Fundamentals ---
    { 
        id: "cs-dsa", title: "Data Structures & Algorithms (DSA)", slug: "dsa-fundamentals", subtitle: "Crack the Top Tech Interviews", 
        level: "Beginner", duration: "12 Weeks", lessons: 80, category: "CS Fundamentals", rating: 4.9, students: 25000, price: "Free", 
        description: "Master the building blocks of efficient software. From arrays to graphs, we cover it all with Hinglish analogies.",
        syllabus: [
            { week: 1, title: "Time & Space Complexity", topics: ["Big O Notation", "Analysis of Loops", "Best/Worst Case"] },
            { week: 2, title: "Array & Strings", topics: ["Sliding Window", "Two Pointers", "String Manipulation"] },
        ],
        features: ["Interview-focused", "Mock Interview Questions", "Language agnostic logic"]
    },
    { id: "cs-os", title: "Operating Systems (OS)", slug: "operating-systems", subtitle: "Inside the Machine", level: "Intermediate", duration: "10 Weeks", lessons: 45, category: "CS Fundamentals", rating: 4.8, students: 11000, price: "Free", description: "Process Management, Threads, Deadlocks, and Memory.", syllabus: [], features: [] },
    { id: "cs-dbms", title: "Database Management Systems (DBMS)", slug: "dbms-mastery", subtitle: "ACID, Normalization, SQL", level: "Intermediate", duration: "10 Weeks", lessons: 50, category: "CS Fundamentals", rating: 4.8, students: 13000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-cn", title: "Computer Networks", slug: "computer-networks", subtitle: "TCP/IP, OSI Model", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "CS Fundamentals", rating: 4.7, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-coa", title: "Computer Organization & Architecture (COA)", slug: "coa", subtitle: "CPU & Memory", level: "Intermediate", duration: "8 Weeks", lessons: 35, category: "CS Fundamentals", rating: 4.6, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-toc", title: "Theory of Computation (TOC)", slug: "toc", subtitle: "Automata & Logic", level: "Advanced", duration: "10 Weeks", lessons: 40, category: "CS Fundamentals", rating: 4.7, students: 4000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-discrete", title: "Discrete Mathematics", slug: "discrete-math", subtitle: "Math for Engineers", level: "Intermediate", duration: "12 Weeks", lessons: 50, category: "CS Fundamentals", rating: 4.8, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-compiler", title: "Compiler Design", slug: "compiler-design", subtitle: "Parsing & Code Gen", level: "Advanced", duration: "10 Weeks", lessons: 45, category: "CS Fundamentals", rating: 4.7, students: 3000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-se", title: "Software Engineering & SDLC", slug: "soft-eng", subtitle: "Agile & Patterns", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "CS Fundamentals", rating: 4.8, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cs-digital", title: "Digital Logic Design", slug: "digital-logic", subtitle: "Gates & Circuits", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "CS Fundamentals", rating: 4.7, students: 8000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 2. Programming ---
    { 
        id: "prog-c", title: "C Programming Masterclass", slug: "c-programming", subtitle: "The Mother of All Languages", 
        level: "Beginner", duration: "10 Weeks", lessons: 60, category: "Programming", rating: 4.8, students: 15000, price: "Free", 
        description: "Start your coding journey with C, the language that powers operating systems and embedded devices.",
        syllabus: [
            { week: 1, title: "Introduction to C", topics: ["History", "Hello World", "Variables"] },
        ],
        features: ["Master Pointers", "Build a Text Editor"]
    },
    { id: "prog-cpp", title: "C++ with STL", slug: "cpp-with-stl", subtitle: "Competitive Coding", level: "Intermediate", duration: "12 Weeks", lessons: 75, category: "Programming", rating: 4.9, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-java", title: "Java Masterclass", slug: "java-masterclass", subtitle: "Core + Advanced", level: "Intermediate", duration: "14 Weeks", lessons: 80, category: "Programming", rating: 4.7, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-python", title: "Python Zero to Hero", slug: "python-zero-to-hero", subtitle: "Scripting to AI", level: "Beginner", duration: "8 Weeks", lessons: 55, category: "Programming", rating: 4.9, students: 25000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-csharp", title: "C# .NET Core", slug: "csharp-net-core", subtitle: "Enterprise Apps", level: "Advanced", duration: "10 Weeks", lessons: 65, category: "Programming", rating: 4.6, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-golang", title: "Go (Golang)", slug: "golang", subtitle: "High Performance", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Programming", rating: 4.7, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-rust", title: "Rust Programming", slug: "rust", subtitle: "Systems Programming", level: "Advanced", duration: "10 Weeks", lessons: 50, category: "Programming", rating: 4.8, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-r", title: "R for Data Science", slug: "r-stats", subtitle: "Statistical Computing", level: "Beginner", duration: "6 Weeks", lessons: 35, category: "Programming", rating: 4.5, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-ts", title: "TypeScript Professional", slug: "typescript", subtitle: "Typed JavaScript", level: "Advanced", duration: "6 Weeks", lessons: 30, category: "Programming", rating: 4.9, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "prog-oops", title: "OOPs in Java", slug: "java-oops", subtitle: "Concepts & Patterns", level: "Intermediate", duration: "4 Weeks", lessons: 25, category: "Programming", rating: 4.8, students: 12000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 3. Web Development ---
    { id: "web-html", title: "HTML5 Mastery", slug: "html5-mastery", subtitle: "Semantic Web", level: "Beginner", duration: "3 Weeks", lessons: 20, category: "Web Development", rating: 4.8, students: 30000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-css", title: "CSS3 & Tailwind", slug: "css3-tailwind", subtitle: "Modern Styling", level: "Beginner", duration: "5 Weeks", lessons: 30, category: "Web Development", rating: 4.9, students: 28000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-js", title: "JavaScript Deep Dive", slug: "javascript-deep-dive", subtitle: "ES6+ Features", level: "Intermediate", duration: "8 Weeks", lessons: 50, category: "Web Development", rating: 4.8, students: 22000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-react", title: "React.js Hooked", slug: "react-js-hooked", subtitle: "Component Logic", level: "Intermediate", duration: "8 Weeks", lessons: 45, category: "Web Development", rating: 4.9, students: 20000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-nextjs", title: "Next.js 15 Full Stack", subtitle: "Unified Ecosystem", slug: "nextjs-15", level: "Advanced", duration: "10 Weeks", lessons: 60, category: "Web Development", rating: 4.9, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-vue", title: "Vue.js & Nuxt", slug: "vue-nuxt", subtitle: "Progressive Path", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Web Development", rating: 4.7, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-node", title: "Node.js & Express", slug: "nodejs-express", subtitle: "Backend Scalability", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Web Development", rating: 4.7, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-nestjs", title: "NestJS Enterprise", slug: "nestjs-enterprise", subtitle: "Grade Node.js", level: "Advanced", duration: "10 Weeks", lessons: 55, category: "Web Development", rating: 4.8, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-graphql", title: "GraphQL & Apollo", slug: "graphql-apollo", subtitle: "Modern API Design", level: "Advanced", duration: "6 Weeks", lessons: 30, category: "Web Development", rating: 4.7, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "web-sysdesign", title: "Frontend System Design", slug: "frontend-sysdesign", subtitle: "Scaling UI", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Web Development", rating: 4.9, students: 8000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 4. AI & GenAI ---
    { id: "ai-saas", title: "Build GenAI SaaS", slug: "genai-saas", subtitle: "Next.js + Gemini", level: "Advanced", duration: "1 Week", lessons: 15, category: "AI & GenAI", rating: 4.9, students: 12000, price: "Free", description: "Build a complete SaaS in 7 days.", syllabus: [], features: [] },
    { id: "ai-cursor", title: "AI-Assisted Engineering", slug: "ai-engineering", subtitle: "Cursor & v0", level: "Intermediate", duration: "2 Weeks", lessons: 10, category: "AI & GenAI", rating: 4.8, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-rag", title: "RAG Architect", slug: "rag-architect", subtitle: "Knowledge-Aware Bots", level: "Advanced", duration: "4 Weeks", lessons: 20, category: "AI & GenAI", rating: 4.9, students: 7000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-prompt", title: "Prompt Engineering", slug: "prompt-engineering", subtitle: "For SDEs", level: "Beginner", duration: "2 Weeks", lessons: 12, category: "AI & GenAI", rating: 4.7, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-agents", title: "Autonomous Agents", slug: "ai-agents", subtitle: "LangChain", level: "Advanced", duration: "5 Weeks", lessons: 25, category: "AI & GenAI", rating: 4.8, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-vector", title: "Vector Databases", slug: "vector-db", subtitle: "Pinecone & Supabase", level: "Intermediate", duration: "3 Weeks", lessons: 15, category: "AI & GenAI", rating: 4.8, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-finetune", title: "Fine-Tuning LLMs", slug: "llm-finetuning", subtitle: "Custom Job Bots", level: "Advanced", duration: "4 Weeks", lessons: 20, category: "AI & GenAI", rating: 4.7, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-python", title: "Python for GenAI", slug: "python-genai", subtitle: "LLM Apps", level: "Intermediate", duration: "6 Weeks", lessons: 30, category: "AI & GenAI", rating: 4.8, students: 14000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-lowcode", title: "Low-Code to Pro-Code", slug: "low-to-pro", subtitle: "Rapid Prototyping", level: "Beginner", duration: "3 Weeks", lessons: 15, category: "AI & GenAI", rating: 4.6, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ai-multiagent", title: "Multi-Agent Systems", slug: "multi-agent", subtitle: "Orchestrating AI", level: "Advanced", duration: "4 Weeks", lessons: 20, category: "AI & GenAI", rating: 4.9, students: 4000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 5. Data Science ---
    { id: "ds-stats", title: "Statistics & Probability", slug: "ds-stats", subtitle: "For Data Science", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "Data Science", rating: 4.7, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-sql", title: "SQL Mastery", slug: "sql-mastery-ds", subtitle: "Queries & Joins", level: "Intermediate", duration: "6 Weeks", lessons: 35, category: "Data Science", rating: 4.8, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-viz", title: "Data Visualization", slug: "data-viz", subtitle: "Power BI & Tableau", level: "Beginner", duration: "5 Weeks", lessons: 25, category: "Data Science", rating: 4.8, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-pandas", title: "Pandas & NumPy", slug: "pandas-numpy", subtitle: "Python Data Analysis", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Data Science", rating: 4.9, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-ml", title: "Machine Learning", slug: "ml-fundamentals", subtitle: "Scikit-Learn", level: "Intermediate", duration: "10 Weeks", lessons: 50, category: "Data Science", rating: 4.8, students: 14000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-dl", title: "Deep Learning", slug: "deep-learning", subtitle: "TF & PyTorch", level: "Advanced", duration: "12 Weeks", lessons: 60, category: "Data Science", rating: 4.9, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-bigdata", title: "Big Data Systems", slug: "big-data", subtitle: "Spark & Hadoop", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Data Science", rating: 4.7, students: 7000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-etl", title: "Data Pipelines (ETL)", slug: "etl-pipelines", subtitle: "Data Engineering", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Data Science", rating: 4.8, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-predictive", title: "Predictive Modeling", slug: "predictive-modeling", subtitle: "Job Markets", level: "Advanced", duration: "6 Weeks", lessons: 25, category: "Data Science", rating: 4.7, students: 5000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "ds-nlp", title: "NLP Mastery", slug: "nlp", subtitle: "Text & Speech", level: "Advanced", duration: "10 Weeks", lessons: 45, category: "Data Science", rating: 4.8, students: 8000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 6. Cloud & DevOps ---
    { id: "cloud-aws", title: "AWS Solutions Architect", slug: "aws-architect", subtitle: "Certified Path", level: "Intermediate", duration: "20 Weeks", lessons: 100, category: "Cloud & DevOps", rating: 4.9, students: 20000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-docker", title: "Docker Containerization", slug: "docker", subtitle: "For Developers", level: "Intermediate", duration: "4 Weeks", lessons: 20, category: "Cloud & DevOps", rating: 4.8, students: 16000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-k8s", title: "Kubernetes Mastery", slug: "kubernetes", subtitle: "Orchestration at Scale", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Cloud & DevOps", rating: 4.9, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-cicd", title: "CI/CD Pipelines", slug: "cicd-actions", subtitle: "GitHub Actions", level: "Intermediate", duration: "5 Weeks", lessons: 25, category: "Cloud & DevOps", rating: 4.8, students: 11000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-iac", title: "Infrastructure as Code", slug: "terraform-ansible", subtitle: "Terraform & Ansible", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Cloud & DevOps", rating: 4.9, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-linux", title: "Linux Administration", slug: "linux-admin", subtitle: "For Developers", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "Cloud & DevOps", rating: 4.7, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-serverless", title: "Serverless Computing", slug: "aws-lambda", subtitle: "AWS Lambda", level: "Advanced", duration: "6 Weeks", lessons: 30, category: "Cloud & DevOps", rating: 4.8, students: 7000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-monitoring", title: "Monitoring & Logging", slug: "grafana-elk", subtitle: "Grafana & ELK", level: "Advanced", duration: "6 Weeks", lessons: 30, category: "Cloud & DevOps", rating: 4.7, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-gcp", title: "GCP Fundamentals", slug: "gcp", subtitle: "Google Cloud", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Cloud & DevOps", rating: 4.8, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "cloud-azure", title: "Azure Cloud Architect", slug: "azure", subtitle: "Microsoft Path", level: "Intermediate", duration: "16 Weeks", lessons: 80, category: "Cloud & DevOps", rating: 4.8, students: 10000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 7. Mobile Dev ---
    { id: "mob-android", title: "Android App Dev", slug: "android-kotlin", subtitle: "Kotlin & Jetpack", level: "Intermediate", duration: "16 Weeks", lessons: 80, category: "Mobile Dev", rating: 4.8, students: 15000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-ios", title: "iOS App Dev", slug: "ios-swift", subtitle: "Swift & SwiftUI", level: "Intermediate", duration: "16 Weeks", lessons: 80, category: "Mobile Dev", rating: 4.8, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-flutter", title: "Flutter Hybrid", slug: "flutter", subtitle: "One Codebase", level: "Beginner", duration: "12 Weeks", lessons: 60, category: "Mobile Dev", rating: 4.9, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-reactnative", title: "React Native", slug: "react-native", subtitle: "Mobile with React", level: "Intermediate", duration: "10 Weeks", lessons: 50, category: "Mobile Dev", rating: 4.8, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-uiux", title: "Mobile UI/UX Design", slug: "mobile-uiux", subtitle: "Fundamentals", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "Mobile Dev", rating: 4.7, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "mob-aso", title: "App Store Optimization", slug: "aso-deployment", subtitle: "Growth & Deployment", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Mobile Dev", rating: 4.6, students: 5000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 8. Cybersecurity ---
    { id: "sec-hacking", title: "Ethical Hacking", slug: "ethical-hacking", subtitle: "Penetration Testing", level: "Beginner", duration: "10 Weeks", lessons: 50, category: "Cybersecurity", rating: 4.9, students: 14000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "sec-network", title: "Network Security", slug: "network-security", subtitle: "Cryptography", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Cybersecurity", rating: 4.8, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "sec-web", title: "Web App Security", slug: "web-security", subtitle: "OWASP Top 10", level: "Intermediate", duration: "6 Weeks", lessons: 30, category: "Cybersecurity", rating: 4.8, students: 11000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "sec-cloud", title: "Cloud Security", slug: "cloud-security", subtitle: "Governance", level: "Advanced", duration: "6 Weeks", lessons: 30, category: "Cybersecurity", rating: 4.7, students: 6000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "sec-forensics", title: "Incident Response", slug: "digital-forensics", subtitle: "Digital Evidance", level: "Advanced", duration: "8 Weeks", lessons: 40, category: "Cybersecurity", rating: 4.7, students: 5000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 9. Career & Productivity ---
    { id: "career-hinglish", title: "The Hinglish Interview", slug: "hinglish-interview", subtitle: "Technical Prep", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Career & Productivity", rating: 4.9, students: 25000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "career-portfolio", title: "GitHub Portfolio", slug: "github-portfolio", subtitle: "Get Hired", level: "Beginner", duration: "3 Weeks", lessons: 15, category: "Career & Productivity", rating: 4.8, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "career-freelance", title: "Freelance Fundas", slug: "freelancing", subtitle: "Global Clients", level: "Beginner", duration: "5 Weeks", lessons: 25, category: "Career & Productivity", rating: 4.7, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "career-startup", title: "Startup MVP", slug: "startup-mvp", subtitle: "0 to Production", level: "Intermediate", duration: "4 Weeks", lessons: 20, category: "Career & Productivity", rating: 4.8, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "career-aptitude", title: "Aptitude for Tech", slug: "tech-aptitude", subtitle: "SSC to SDE Bridge", level: "Beginner", duration: "6 Weeks", lessons: 30, category: "Career & Productivity", rating: 4.7, students: 14000, price: "Free", description: "", syllabus: [], features: [] },

    // --- 10. Game Development (NEW) ---
    { 
        id: "game-unity", title: "Unity Game Dev Starter", slug: "unity-starter", subtitle: "C# to 3D", 
        level: "Beginner", duration: "20 Weeks", lessons: 80, category: "Game Development", rating: 4.8, students: 7000, price: "Free", 
        description: "Your journey from C# basics to publishing 3D games.", 
        syllabus: [
            { week: 1, title: "C# Basics", topics: ["Variables", "Loops", "Functions"] },
            { week: 2, title: "Unity Interface", topics: ["Scene View", "Inspector", "Game Objects"] },
        ], 
        features: ["Build 2D & 3D Games", "Mobile Optimization"]
    },
    { id: "game-mobile", title: "Mobile Game Developer", slug: "mobile-game-dev", subtitle: "Ad Integration", level: "Intermediate", duration: "16 Weeks", lessons: 60, category: "Game Development", rating: 4.7, students: 5000, price: "Free", description: "Monetization and Play Store analytics.", syllabus: [], features: [] },
    { id: "game-unreal", title: "Unreal Engine Pro", slug: "unreal-engine", subtitle: "C++ & Blueprints", level: "Advanced", duration: "24 Weeks", lessons: 100, category: "Game Development", rating: 4.9, students: 4000, price: "Free", description: "High-end VFX and Level Design.", syllabus: [], features: [] },

    // --- 11. Data Engineering (NEW) ---
    { id: "de-bigdata", title: "Big Data Engineer", slug: "big-data-engineer", subtitle: "Spark & Kafka", level: "Intermediate", duration: "24 Weeks", lessons: 90, category: "Data Engineering", rating: 4.8, students: 6000, price: "Free", description: "Hadoop, Spark, and ETL Pipelines.", syllabus: [], features: [] },
    { id: "de-realtime", title: "Real-Time Data Pipelines", slug: "realtime-data", subtitle: "Kafka & Flink", level: "Advanced", duration: "16 Weeks", lessons: 60, category: "Data Engineering", rating: 4.9, students: 4000, price: "Free", description: "Streaming and Data Lakes.", syllabus: [], features: [] },
    { id: "de-modern", title: "Modern Data Stack", slug: "modern-data-stack", subtitle: "dbt & Snowflake", level: "Intermediate", duration: "16 Weeks", lessons: 60, category: "Data Engineering", rating: 4.7, students: 5000, price: "Free", description: "Fivetran, Snowflake, Looker.", syllabus: [], features: [] },

    // --- 12. Product Management & No-Code (NEW) ---
    { id: "pm-path", title: "Product Manager Path", slug: "product-manager", subtitle: "Roadmaps & Agile", level: "Beginner", duration: "20 Weeks", lessons: 70, category: "Product Management & No-Code", rating: 4.8, students: 8000, price: "Free", description: "User Research and Metrics.", syllabus: [], features: [] },
    { id: "pm-nocode", title: "No-Code Builder", slug: "nocode-builder", subtitle: "Bubble & Webflow", level: "Beginner", duration: "12 Weeks", lessons: 45, category: "Product Management & No-Code", rating: 4.9, students: 10000, price: "Free", description: "Launch products without coding.", syllabus: [], features: [] },
    { id: "pm-lowcode", title: "Low-Code Developer", slug: "lowcode-dev", subtitle: "Retool & PowerApps", level: "Beginner", duration: "16 Weeks", lessons: 55, category: "Product Management & No-Code", rating: 4.7, students: 6000, price: "Free", description: "Internal Tools & Automation.", syllabus: [], features: [] },

    // --- 13. System Design (NEW) ---
    { id: "sd-fund", title: "System Design Fundamentals", slug: "system-design-basics", subtitle: "Scalability & Caching", level: "Intermediate", duration: "16 Weeks", lessons: 60, category: "System Design", rating: 4.9, students: 15000, price: "Free", description: "Load Balancing and CDNs.", syllabus: [], features: [] },
    { id: "sd-dist", title: "Distributed Systems", slug: "distributed-systems", subtitle: "CAP Theorem", level: "Advanced", duration: "20 Weeks", lessons: 80, category: "System Design", rating: 4.8, students: 9000, price: "Free", description: "Microservices & Message Queues.", syllabus: [], features: [] },
    { id: "sd-interview", title: "Interview System Design", slug: "system-design-interview", subtitle: "Netflix & WhatsApp", level: "Advanced", duration: "12 Weeks", lessons: 40, category: "System Design", rating: 4.9, students: 12000, price: "Free", description: "Real-world mock interviews.", syllabus: [], features: [] },

    // --- 14. UI/UX Design (NEW) ---
    { id: "ux-bootcamp", title: "UI/UX Designer Bootcamp", slug: "uiux-bootcamp", subtitle: "Figma to Portfolio", level: "Beginner", duration: "24 Weeks", lessons: 100, category: "UI/UX Design", rating: 4.9, students: 12000, price: "Free", description: "Design Thinking and Prototyping.", syllabus: [], features: [] },
    { id: "ux-figma", title: "Advanced Figma", slug: "advanced-figma", subtitle: "Auto Layout & Plugins", level: "Intermediate", duration: "12 Weeks", lessons: 45, category: "UI/UX Design", rating: 4.8, students: 9000, price: "Free", description: "Components and Design Systems.", syllabus: [], features: [] },
    { id: "ux-research", title: "UX Research & Strategy", slug: "ux-research", subtitle: "User Interviews", level: "Intermediate", duration: "16 Weeks", lessons: 50, category: "UI/UX Design", rating: 4.7, students: 7000, price: "Free", description: "A/B Testing and IA.", syllabus: [], features: [] },

    // --- 15. Testing & QA (NEW) ---
    { id: "qa-auto", title: "QA Automation Engineer", slug: "qa-automation", subtitle: "Selenium & Cypress", level: "Beginner", duration: "16 Weeks", lessons: 65, category: "Testing & QA", rating: 4.8, students: 11000, price: "Free", description: "API Testing and CI/CD.", syllabus: [], features: [] },
    { id: "qa-perf", title: "Performance Testing", slug: "performance-testing", subtitle: "JMeter & Load", level: "Intermediate", duration: "12 Weeks", lessons: 40, category: "Testing & QA", rating: 4.7, students: 6000, price: "Free", description: "Stress Testing and Metrics.", syllabus: [], features: [] },

    // --- 16. Emerging Tech (NEW) ---
    { id: "et-arvr", title: "AR/VR Development", slug: "ar-vr", subtitle: "Unity & Meta Quest", level: "Advanced", duration: "20 Weeks", lessons: 75, category: "Emerging Tech", rating: 4.8, students: 4000, price: "Free", description: "Spatial Computing fundamentals.", syllabus: [], features: [] },
    { id: "et-iot", title: "IoT Developer", slug: "iot", subtitle: "Raspberry Pi & MQTT", level: "Intermediate", duration: "16 Weeks", lessons: 60, category: "Emerging Tech", rating: 4.7, students: 5000, price: "Free", description: "Edge Computing and Sensors.", syllabus: [], features: [] },
    { id: "et-quantum", title: "Quantum Computing", slug: "quantum", subtitle: "Qiskit & Algorithms", level: "Advanced", duration: "16 Weeks", lessons: 50, category: "Emerging Tech", rating: 4.9, students: 3000, price: "Free", description: "Future of Computation.", syllabus: [], features: [] },

    // --- Special Tracks ---
    { id: "sp-ssc", title: "Computer Awareness", slug: "ssc-computer", subtitle: "SSC/Banking Special", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Government Exams", rating: 4.8, students: 15000, price: "Free", description: "Specialized for SSC and Banking exams.", syllabus: [], features: [] },
    { id: "sp-it", title: "IT Officer Preparation", slug: "it-officer", subtitle: "Specialist Officer", level: "Intermediate", duration: "10 Weeks", lessons: 50, category: "Government Exams", rating: 4.7, students: 8000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "sp-nic", title: "NIC/NIELIT Exam Prep", slug: "nic-nielit", subtitle: "Govt Tech Jobs", level: "Intermediate", duration: "12 Weeks", lessons: 60, category: "Government Exams", rating: 4.8, students: 6000, price: "Free", description: "", syllabus: [], features: [] },

    { id: "free-web", title: "Freelance Web Developer", slug: "freelance-web", subtitle: "Go Independent", level: "Intermediate", duration: "8 Weeks", lessons: 40, category: "Freelancing", rating: 4.9, students: 10000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "free-upwork", title: "Upwork & Fiverr Success", slug: "upwork-fiverr", subtitle: "Global Markets", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Freelancing", rating: 4.8, students: 12000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "free-client", title: "Client Management", slug: "client-mgmt", subtitle: "Soft Skills for Pro", level: "Intermediate", duration: "4 Weeks", lessons: 15, category: "Freelancing", rating: 4.6, students: 5000, price: "Free", description: "", syllabus: [], features: [] },

    { id: "soft-comm", title: "Tech Interview Comm", slug: "interview-comm", subtitle: "Soft Skills", level: "Beginner", duration: "4 Weeks", lessons: 20, category: "Soft Skills", rating: 4.9, students: 25000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "soft-resume", title: "Resume Building", slug: "resume-build", subtitle: "ATS Friendly", level: "Beginner", duration: "2 Weeks", lessons: 10, category: "Soft Skills", rating: 4.8, students: 20000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "soft-linkedin", title: "LinkedIn for Tech", slug: "linkedin-tech", subtitle: "Personal Branding", level: "Beginner", duration: "3 Weeks", lessons: 12, category: "Soft Skills", rating: 4.9, students: 18000, price: "Free", description: "", syllabus: [], features: [] },
    { id: "soft-salary", title: "Salary Negotiation", slug: "salary-negotiation", subtitle: "Get What You Worth", level: "Intermediate", duration: "1 Week", lessons: 5, category: "Soft Skills", rating: 4.7, students: 9000, price: "Free", description: "", syllabus: [], features: [] },
];

export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
export const getCoursesByCategory = (category: string) => courses.filter((c) => c.category === category);
export const getAllCategories = () => Array.from(new Set(courses.map(c => c.category)));
