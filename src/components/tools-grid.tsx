

import { Button } from "@/components/ui/button";

const toolCategories = [
    {
        name: "AI & Machine Learning",
        description: "Build intelligent apps with the modern AI stack.",
        tools: [
            "OpenAI", "LangChain", "Supabase", "HuggingFace", "Pinecone", "ChromaDB",
            "LlamaIndex", "Anthropic", "Midjourney", "Stable Diffusion", "TensorFlow", "PyTorch",
            "Scikit-learn", "Keras", "Jupyter", "Colab", "LangFuse", "Vercel AI SDK",
        ]
    },
    {
        name: "Frontend Development",
        description: "Craft beautiful user interfaces.",
        tools: [
            "React", "Next.js", "Vue", "Nuxt", "Svelte", "Angular",
            "Tailwind CSS", "Shadcn/ui", "Framer Motion", "GSAP", "Three.js", "Vite",
            "Webpack", "Babel", "TypeScript", "Storybook", "Cypress", "Jest"
        ]
    },
    {
        name: "Backend & Database",
        description: "Power your applications with robust infrastructure.",
        tools: [
            "Node.js", "Express", "NestJS", "FastAPI", "Django", "Spring Boot",
            "PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle",
            "GraphQL", "Apollo", "Socket.io", "Kafka", "RabbitMQ", "Firebase"
        ]
    },
     {
        name: "DevOps & Cloud",
        description: "Deploy, scale, and monitor.",
        tools: [
            "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "Vercel",
            "Netlify", "Heroku", "Terraform", "Ansible", "Jenkins", "GitHub Actions",
            "GitLab CI", "Prometheus", "Grafana", "ELK Stack", "Nginx", "Cloudflare"
        ]
    },
    {
        name: "Productivity & Design",
        description: "Tools to speed up your workflow.",
        tools: [
            "VS Code", "Figma", "Notion", "Linear", "Slack", "Discord",
            "Postman", "Insomnia", "Swagger", "Jira", "Trello", "Asana",
            "Obsidian", "Raycast", "Warp", "Oh My Zsh", "Homebrew", "NPM"
        ]
    }
];

export function ToolsGrid() {
    return (
        <section className="max-w-7xl mx-auto py-24 px-6 border-t border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-black/20">
            <div className="text-center mb-16 space-y-4">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl text-navy-900 dark:text-white">
                    100+ Developer Tools Library
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Master the industry-standard toolchain. We teach you how to use the exact tools used by top tech companies.
                </p>
            </div>

            <div className="space-y-12">
                {toolCategories.map((category, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-navy-800 pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-navy-900 dark:text-white">{category.name}</h3>
                                <p className="text-muted-foreground">{category.description}</p>
                            </div>
                            <Button variant="outline" className="w-fit">View All {category.name} Tools</Button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {category.tools.map((tool, tIdx) => (
                                <div key={tIdx} className="
                                    group flex items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-navy-800 
                                    bg-white dark:bg-navy-900/40 hover:border-black dark:hover:border-white hover:shadow-md transition-all cursor-pointer
                                ">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                                        {tool}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
             <div className="mt-16 text-center">
                  <Button size="lg" className="bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-900 font-bold h-12 px-8">
                    Explore Full Tool Directory
                  </Button>
             </div>
        </section>
    );
}
