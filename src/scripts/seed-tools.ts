
import * as dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Service Role Key in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'vidya' }
});

interface ToolGroup {
    name: string;
    mappedCategory: string;
    description: string;
    tools: string[];
}

const toolCategories: ToolGroup[] = [
    {
        name: "AI & Machine Learning",
        mappedCategory: "AI & GenAI",
        description: "Build intelligent apps with the modern AI stack.",
        tools: [
            "OpenAI", "LangChain", "Supabase", "HuggingFace", "Pinecone", "ChromaDB",
            "LlamaIndex", "Anthropic", "Midjourney", "Stable Diffusion", "TensorFlow", "PyTorch",
            "Scikit-learn", "Keras", "Jupyter", "Colab", "LangFuse", "Vercel AI SDK",
        ]
    },
    {
        name: "Frontend Development",
        mappedCategory: "Web Development",
        description: "Craft beautiful user interfaces.",
        tools: [
            "React", "Next.js", "Vue", "Nuxt", "Svelte", "Angular",
            "Tailwind CSS", "Shadcn/ui", "Framer Motion", "GSAP", "Three.js", "Vite",
            "Webpack", "Babel", "TypeScript", "Storybook", "Cypress", "Jest"
        ]
    },
    {
        name: "Backend & Database",
        mappedCategory: "Web Development",
        description: "Power your applications with robust infrastructure.",
        tools: [
            "Node.js", "Express", "NestJS", "FastAPI", "Django", "Spring Boot",
            "PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle",
            "GraphQL", "Apollo", "Socket.io", "Kafka", "RabbitMQ", "Firebase"
        ]
    },
    {
        name: "DevOps & Cloud",
        mappedCategory: "Cloud & DevOps",
        description: "Deploy, scale, and monitor.",
        tools: [
            "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "Vercel",
            "Netlify", "Heroku", "Terraform", "Ansible", "Jenkins", "GitHub Actions",
            "GitLab CI", "Prometheus", "Grafana", "ELK Stack", "Nginx", "Cloudflare"
        ]
    },
    {
        name: "Productivity & Design",
        mappedCategory: "Career & Productivity",
        description: "Tools to speed up your workflow.",
        tools: [
            "VS Code", "Figma", "Notion", "Linear", "Slack", "Discord",
            "Postman", "Insomnia", "Swagger", "Jira", "Trello", "Asana",
            "Obsidian", "Raycast", "Warp", "Oh My Zsh", "Homebrew", "NPM"
        ]
    }
];

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

async function seedTools() {
    console.log("🚀 Seeding tools...");

    // Get all categories to match IDs
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name');

    if (catError) {
        console.error("Error fetching categories:", catError);
        return;
    }

    if (!categories) {
        console.error("No categories found");
        return;
    }

    const categoryMap = new Map(categories.map((c: { name: string; id: string }) => [c.name, c.id]));

    for (const group of toolCategories) {
        const categoryId = categoryMap.get(group.mappedCategory);
        if (!categoryId) {
            console.warn(`Category not found: ${group.mappedCategory}. Skipping group ${group.name}`);
            continue;
        }

        console.log(`Processing group: ${group.name} -> ${group.mappedCategory}`);

        for (const toolName of group.tools) {
            const slug = slugify(toolName);
            
            const { error: insertError } = await supabase
                .from('tools')
                .upsert({
                    name: toolName,
                    slug: slug,
                    category_id: categoryId,
                    category_name: group.mappedCategory,
                    metadata: { group_name: group.name, description: group.description }
                }, { onConflict: 'slug' });

            if (insertError) {
                console.error(`Error inserting tool ${toolName}:`, insertError);
            } else {
                console.log(`✅ Upserted tool: ${toolName}`);
            }
        }
    }

    console.log("✨ Seeding complete!");
}

seedTools();
