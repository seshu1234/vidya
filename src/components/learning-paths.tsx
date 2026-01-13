import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, GraduationCap, Map, Trophy } from "lucide-react";

const paths = [
    {
        title: "Full Stack Master",
        description: "Zero to Employment-ready Developer. Master MERN stack.",
        duration: "6 Months",
        level: "Beginner to Pro",
        steps: ["HTML/CSS", "JavaScript", "React.js", "Node.js", "MongoDB", "Deployment"],
        color: "bg-blue-500",
        icon: <GraduationCap className="h-6 w-6 text-white" />
    },
    {
        title: "AI Architect",
        description: "Build the future with Python, ML, and Neural Networks.",
        duration: "8 Months",
        level: "Intermediate",
        steps: ["Python", "Data Science", "Machine Learning", "Deep Learning", "GenAI", "MLOps"],
        color: "bg-purple-500",
        icon: <Trophy className="h-6 w-6 text-white" />
    },
    {
        title: "Cloud Native Master",
        description: "Master DevOps, AWS, and Scalable Systems.",
        duration: "5 Months",
        level: "Advanced",
        steps: ["Linux", "Docker", "Kubernetes", "AWS Core", "CI/CD", "Terraform"],
        color: "bg-saffron-500",
        icon: <Map className="h-6 w-6 text-white" />
    },
    {
        title: "GenAI Engineer",
        description: "Specialized path for LLMs, RAG, and Agents.",
        duration: "4 Months",
        level: "Advanced",
        steps: ["LangChain", "Vector DBs", "OpenAI API", "LlamaIndex", "Fine-Tuning", "AI Agents"],
        color: "bg-green-500",
        icon: <GraduationCap className="h-6 w-6 text-white" />
    },
    {
        title: "Cyber Security",
        description: "Defend systems. Ethical Hacking to Network Security.",
        duration: "6 Months",
        level: "Intermediate",
        steps: ["Networking", "Linux", "Ethical Hacking", "Pen Testing", "Cryptography", "SOC"],
        color: "bg-red-500",
        icon: <Trophy className="h-6 w-6 text-white" />
    },
    {
        title: "Data Scientist",
        description: "Turn data into insights. Statistics to Visualization.",
        duration: "7 Months",
        level: "Beginner",
        steps: ["Statistics", "SQL", "Python", "Pandas", "Power BI", "Tableau"],
        color: "bg-yellow-500",
        icon: <Map className="h-6 w-6 text-white" />
    },
    {
        title: "Mobile Wizard",
        description: "Build apps for billions. Android & iOS.",
        duration: "5 Months",
        level: "Intermediate",
        steps: ["Kotlin", "Swift", "React Native", "Flutter", "App Store", "Firebase"],
        color: "bg-indigo-500",
        icon: <GraduationCap className="h-6 w-6 text-white" />
    },
    {
        title: "Blockchain Dev",
        description: "Web3 revolution. Smart Contracts and DApps.",
        duration: "4 Months",
        level: "Advanced",
        steps: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "DeFi", "NFTs"],
        color: "bg-orange-500",
        icon: <Trophy className="h-6 w-6 text-white" />
    },
    {
        title: "Automation Expert",
        description: "Automate everything. Scripts to RPA.",
        duration: "3 Months",
        level: "Beginner",
        steps: ["Python Scripting", "Selenium", "Zapier", "Power Automate", "Airflow", "Bash"],
        color: "bg-teal-500",
        icon: <Map className="h-6 w-6 text-white" />
    }
];

export function LearningPaths() {
    return (
        <section className="max-w-7xl mx-auto py-24 px-6 border-t border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-950">
             <div className="text-center mb-16 space-y-4">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl text-navy-900 dark:text-white">
                    Masters Specializations
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Don&apos;t just watch videos. Follow a structured university-grade roadmap to master a domain.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {paths.map((path, index) => (
                    <div key={index} className="relative group rounded-3xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-900/40 p-8 hover:shadow-2xl transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
                        <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl rounded-tr-3xl ${path.color} shadow-lg group-hover:scale-110 transition-transform`}>
                            {path.icon}
                        </div>
                        
                        <div className="space-y-4 mb-8">
                             <h3 className="text-2xl font-bold text-navy-900 dark:text-white pr-12">{path.title}</h3>
                             <p className="text-muted-foreground leading-relaxed">{path.description}</p>
                             <div className="flex flex-wrap gap-2">
                                 <Badge variant="secondary" className="bg-white dark:bg-navy-800">{path.duration}</Badge>
                                 <Badge variant="secondary" className="bg-white dark:bg-navy-800">{path.level}</Badge>
                             </div>
                        </div>

                        <div className="space-y-3 relative">
                            <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-slate-200 dark:bg-navy-700"></div>
                            {path.steps.map((step, i) => (
                                <div key={i} className="relative flex items-center gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white dark:bg-navy-800 border-2 border-slate-300 dark:border-navy-600 z-10 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{step}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-navy-700">
                            <Button className="w-full bg-navy-900 hover:bg-navy-800 text-white dark:bg-white dark:text-navy-900 dark:hover:bg-slate-200 font-bold group-hover:translate-x-1 transition-all">
                                View Curriculum <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
