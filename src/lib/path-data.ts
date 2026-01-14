import { Layers, Globe, Shield, Smartphone, Brain, BarChart, Link, Cog, LucideIcon } from "lucide-react";

export interface Path {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon; 
    color: string;
    courses: number;
    duration: string;
    role: string;
    salary: string; // e.g. "₹12L - ₹24L"
    companies: string[];
    syllabus: {
        title: string;
        description: string;
    }[];
}

export const paths: Path[] = [
    {
        id: "1",
        slug: "full-stack-master",
        title: "Full Stack Master",
        description: "From HTML to Scalable Systems. Master React, Node.js, and Databases.",
        icon: Layers,
        color: "bg-blue-500",
        courses: 8,
        duration: "6 Months",
        role: "Full Stack Developer",
        salary: "₹8L - ₹18L",
        companies: ["Zomato", "Swiggy", "Paytm"],
        syllabus: [
            { title: "Frontend Foundations", description: "HTML, CSS, JS, React" },
            { title: "Backend Engineering", description: "Node.js, Express, APIs" },
            { title: "Database Management", description: "SQL, MongoDB, Redis" },
            { title: "System Design", description: "Scalability, Caching, Microservices" }
        ]
    },
    {
        id: "2",
        slug: "ai-architect",
        title: "AI Architect",
        description: "Build Next-Gen AI Apps. LLMs, Vector DBs, and LangChain.",
        icon: Brain,
        color: "bg-purple-500",
        courses: 6,
        duration: "5 Months",
        role: "AI Engineer",
        salary: "₹12L - ₹30L",
        companies: ["Google", "Microsoft", "Ola Electric"],
        syllabus: [
            { title: "Python & Data Structures", description: "Core Python, NumPy, Pandas" },
            { title: "Machine Learning Basics", description: "Regression, Classification, Scikit-learn" },
            { title: "Deep Learning & NLP", description: "PyTorch, Transformers, LLMs" },
            { title: "AI Deployment", description: "FastAPI, Docker, HuggingFace" }
        ]
    },
    {
        id: "3",
        slug: "cloud-native",
        title: "Cloud Native Master",
        description: "Scale with AWS & Kubernetes. Docker, CI/CD, and Microservices.",
        icon: Globe,
        color: "bg-orange-500",
        courses: 7,
        duration: "5 Months",
        role: "DevOps Engineer",
        salary: "₹10L - ₹25L",
        companies: ["Amazon", "Flipkart", "Razorpay"],
        syllabus: [
            { title: "Linux & Networking", description: "Shell Scripting, TCP/IP" },
            { title: "Docker & Containers", description: "Images, Volumes, Compose" },
            { title: "Kubernetes Orchestration", description: "Pods, Services, Helm" },
            { title: "AWS Cloud Infrastructure", description: "EC2, S3, VPC, Lambda" }
        ]
    },
     {
        id: "4",
        slug: "cyber-security",
        title: "Cyber Security Specialist",
        description: "Protect digital assets. Ethical Hacking, Network Security, and SOC.",
        icon: Shield,
        color: "bg-red-500",
        courses: 6,
        duration: "6 Months",
        role: "Security Analyst",
        salary: "₹10L - ₹22L",
        companies: ["Palo Alto", "Cisco", "Infosys"],
        syllabus: [
            { title: "Network Security", description: "Firewalls, VPNs, Wireshark" },
            { title: "Ethical Hacking", description: "Penetration Testing, Kali Linux" },
            { title: "Web App Security", description: "OWASP Top 10, SQL Injection" },
            { title: "SOC Operations", description: "SIEM, Incident Response" }
        ]
    },
    {
        id: "5",
        slug: "data-scientist",
        title: "Data Scientist",
        description: "Turn data into insights. Python, SQL, Statistics, and PowerBI.",
        icon: BarChart,
        color: "bg-green-500",
        courses: 8,
        duration: "7 Months",
        role: "Data Scientist",
        salary: "₹12L - ₹28L",
        companies: ["Fractal", "MuSigma", "Accenture"],
        syllabus: [
            { title: "Data Wrangling", description: "Pandas, SQL Advanced" },
             { title: "Statistical Analysis", description: "Probability, Hypothesis Testing" },
            { title: "Data Visualization", description: "PowerBI, Tableau, Matplotlib" },
            { title: "Predictive Modeling", description: "Regression, Time Series" }
        ]
    },
     {
        id: "6",
        slug: "mobile-wizard",
        title: "Mobile App Wizard",
        description: "Build iOS and Android apps. React Native, Flutter, and Swift.",
        icon: Smartphone,
        color: "bg-indigo-500",
        courses: 5,
        duration: "4 Months",
        role: "Mobile Developer",
        salary: "₹8L - ₹20L",
        companies: ["Cred", "Uber", "Swiggy"],
        syllabus: [
            { title: "React Native Core", description: "Components, Navigation, State" },
            { title: "Native Features", description: "Camera, Maps, Sensors" },
            { title: "Flutter Development", description: "Widgets, Dart, Bloc" },
            { title: "App Store Deployment", description: "Play Store, App Store Guidelines" }
        ]
    },
     {
        id: "7",
        slug: "blockchain-dev",
        title: "Blockchain Developer",
        description: "Decentralized Future. Solidity, Web3.js, and Smart Contracts.",
        icon: Link,
        color: "bg-yellow-500",
        courses: 5,
        duration: "5 Months",
        role: "Blockchain Dev",
        salary: "₹15L - ₹35L",
        companies: ["Polygon", "CoinDCX", "Binance"],
        syllabus: [
            { title: "Blockchain Fundamentals", description: "Hashing, Consensus, Mining" },
            { title: "Smart Contracts", description: "Solidity, Remix, Security" },
            { title: "DApp Development", description: "Web3.js, Ethers.js, React" },
            { title: "DeFi Protocols", description: "Tokens, DEXs, Lending" }
        ]
    },
    {
        id: "8",
        slug: "automation-expert",
        title: "Automation Expert",
        description: "Automate boring stuff. Python Scripting, Selenium, and Zapier.",
        icon: Cog,
        color: "bg-slate-500",
        courses: 4,
        duration: "3 Months",
        role: "Automation Engineer",
        salary: "₹8L - ₹18L",
        companies: ["Late", "UiPath", "Postman"],
        syllabus: [
             { title: "Python Scripting", description: "File Handling, APIs, Cron" },
            { title: "Web Scraping", description: "BeautifulSoup, Selenium" },
            { title: "Workflow Automation", description: "Zapier, n8n, Webhooks" },
            { title: "Testing Automation", description: "PyTest, CI Pipelines" }
        ]
    }
];

export function getPathBySlug(slug: string) {
    return paths.find(p => p.slug === slug);
}
