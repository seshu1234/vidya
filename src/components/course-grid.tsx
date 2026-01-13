import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
    "All",
    "Latest Trends",
    "Programming",
    "Web Development",
    "CS Fundamentals",
    "Mobile Dev",
    "Databases",
    "AI & Data",
    "Cloud & DevOps"
];

// University Scale Mock Data (50+ Courses)
const allCourses = [
    // Latest Trends
    { title: "Remix.js Revolution", subtitle: "Full Stack React", level: "Advanced", lessons: 40, category: "Latest Trends" },
    { title: "Next.js 14 Mastery", subtitle: "App Router & Server Actions", level: "Advanced", lessons: 55, category: "Latest Trends" },
    { title: "Nuxt.js Power", subtitle: "Vue Framework on Steroids", level: "Intermediate", lessons: 38, category: "Latest Trends" },
    { title: "Vue.js 3 Fundamentals", subtitle: "Composition API", level: "Beginner", lessons: 30, category: "Latest Trends" },
    { title: "Express.js Backend", subtitle: "Fast & Minimal APIs", level: "Intermediate", lessons: 28, category: "Latest Trends" },
    { title: "Bun Runtime", subtitle: "Faster than Node", level: "Advanced", lessons: 15, category: "Latest Trends" },

    // AI Modules & Tools (NEW)
    { title: "LangChain Zero to Hero", subtitle: "Build LLM Apps", level: "Advanced", lessons: 45, category: "AI & Data" },
    { title: "Supabase Vector", subtitle: "Open Source Firebase", level: "Intermediate", lessons: 30, category: "AI & Data" },
    { title: "RAG Pipelines", subtitle: "Chat with PDF", level: "Advanced", lessons: 35, category: "AI & Data" },
    { title: "LangFuse Observability", subtitle: "Debug LLMs", level: "Intermediate", lessons: 20, category: "AI & Data" },
    { title: "OpenAI GPT-4 API", subtitle: "Prompt Engineering", level: "Beginner", lessons: 25, category: "AI & Data" },
    { title: "HuggingFace Transformers", subtitle: "Local Models", level: "Advanced", lessons: 50, category: "AI & Data" },

    // Programming
    { title: "C Programming", subtitle: "Mother of Languages", level: "Beginner", lessons: 60, category: "Programming" },
    { title: "C++ with STL", subtitle: "Competitive Coding", level: "Intermediate", lessons: 75, category: "Programming" },
    { title: "Java Masterclass", subtitle: "Core + Advanced", level: "Intermediate", lessons: 80, category: "Programming" },
    { title: "Python Zero to Hero", subtitle: "Scripting to AI", level: "Beginner", lessons: 55, category: "Programming" },
    { title: "C# .NET Core", subtitle: "Enterprise Apps", level: "Advanced", lessons: 65, category: "Programming" },
    { title: "R for Statistics", subtitle: "Data Analysis", level: "Beginner", lessons: 35, category: "Programming" },
    { title: "Go (Golang)", subtitle: "High Performance", level: "Intermediate", lessons: 40, category: "Programming" },

    // Web Development
    { title: "HTML5 Mastery", subtitle: "Semantic Web", level: "Beginner", lessons: 20, category: "Web Development" },
    { title: "CSS3 & Tailwind", subtitle: "Modern Styling", level: "Beginner", lessons: 30, category: "Web Development" },
    { title: "JavaScript Deep Dive", subtitle: "ES6+ Features", level: "Intermediate", lessons: 50, category: "Web Development" },
    { title: "React.js Hooked", subtitle: "Component Logic", level: "Intermediate", lessons: 45, category: "Web Development" },
    { title: "Angular Enterprise", subtitle: "Scalable Framework", level: "Advanced", lessons: 60, category: "Web Development" },
    { title: "Node.js Internals", subtitle: "Event Loop & Streams", level: "Advanced", lessons: 40, category: "Web Development" },
    { title: "PHP 8 & Laravel", subtitle: "Modern Backend", level: "Intermediate", lessons: 55, category: "Web Development" },

    // CS Fundamentals
    { title: "Operating Systems", subtitle: "Process, Threads, Deadlocks", level: "Intermediate", lessons: 45, category: "CS Fundamentals" },
    { title: "DBMS Mastery", subtitle: "ACID, Normalization, SQL", level: "Intermediate", lessons: 50, category: "CS Fundamentals" },
    { title: "Computer Networks", subtitle: "TCP/IP, OSI Model", level: "Intermediate", lessons: 40, category: "CS Fundamentals" },
    { title: "Cyber Security Intro", subtitle: "Ethical Hacking Basics", level: "Beginner", lessons: 35, category: "CS Fundamentals" },
    { title: "Compiler Design", subtitle: "Parsers & Lexers", level: "Advanced", lessons: 40, category: "CS Fundamentals" },
    { title: "Digital Logic", subtitle: "Gates & Circuits", level: "Beginner", lessons: 25, category: "CS Fundamentals" },

    // Mobile Dev
    { title: "Android with Kotlin", subtitle: "Modern App Dev", level: "Intermediate", lessons: 60, category: "Mobile Dev" },
    { title: "iOS with Swift", subtitle: "Apple Ecosystem", level: "Intermediate", lessons: 55, category: "Mobile Dev" },
    { title: "Flutter Hybrid", subtitle: "One Codebase", level: "Beginner", lessons: 45, category: "Mobile Dev" },
    { title: "React Native", subtitle: "JS on Mobile", level: "Intermediate", lessons: 40, category: "Mobile Dev" },

    // Databases
    { title: "SQL Mastery", subtitle: "Queries & Joins", level: "Beginner", lessons: 35, category: "Databases" },
    { title: "MongoDB NoSQL", subtitle: "Schema-less Data", level: "Intermediate", lessons: 30, category: "Databases" },
    { title: "PostgreSQL Advanced", subtitle: "Indexing & Performance", level: "Advanced", lessons: 40, category: "Databases" },
    { title: "Redis Caching", subtitle: "In-memory Store", level: "Advanced", lessons: 20, category: "Databases" },

     // AI & Data
    { title: "Machine Learning", subtitle: "Models & Algorithms", level: "Advanced", lessons: 60, category: "AI & Data" },
    { title: "Deep Learning", subtitle: "Neural Networks", level: "Advanced", lessons: 55, category: "AI & Data" },
    { title: "Data Analysis Python", subtitle: "Pandas & Matplotlib", level: "Intermediate", lessons: 45, category: "AI & Data" },
    { title: "Power BI Bootcamp", subtitle: "Business Intelligence", level: "Beginner", lessons: 25, category: "AI & Data" },

    // Cloud & DevOps
    { title: "AWS Certified", subtitle: "Cloud Essentials", level: "Intermediate", lessons: 50, category: "Cloud & DevOps" },
    { title: "Docker Container", subtitle: "Containerization", level: "Intermediate", lessons: 25, category: "Cloud & DevOps" },
    { title: "Kubernetes K8s", subtitle: "Orchestration", level: "Advanced", lessons: 45, category: "Cloud & DevOps" },
    { title: "Git Version Control", subtitle: "Collaboration", level: "Beginner", lessons: 15, category: "Cloud & DevOps" },
];

export function CourseGrid() {
  const getCourses = (category: string) => {
    if (category === "All") return allCourses; // Show all for massive scale feel, or slice if too heavy
    return allCourses.filter((c) => c.category === category);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 lg:py-24 bg-slate-50 dark:bg-black/20" id="courses">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-navy-900 dark:text-white">
          University Course Catalog
        </h2>
        <p className="max-w-[85%] leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-base sm:text-lg mb-8">
          A comprehensive library of 50+ courses. From Programming Fundamentals to Advanced AI.
          <br className="hidden sm:block"/>
          Everything you need to master Computer Science.
        </p>

        <Tabs defaultValue="Latest Trends" className="w-full">
          <div className="flex justify-center mb-8 w-full overflow-x-auto pb-4 px-4 scrollbar-hide">
             <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="
                        rounded-full px-4 py-2 text-sm font-medium border border-slate-200 dark:border-navy-700 
                        data-[state=active]:bg-saffron-500 data-[state=active]:text-white 
                        data-[state=active]:border-saffron-500
                        bg-white dark:bg-navy-900 dark:text-slate-300
                        hover:bg-slate-50 dark:hover:bg-navy-800 transition-all
                    "
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
          </div>

          {categories.map((category) => {
             const categoryCourses = getCourses(category);
             const displayCourses = category === "All" ? categoryCourses.slice(0, 12) : categoryCourses; // Limit 'All' to 12 initially

             return (
            <TabsContent key={category} value={category} className="mt-0">
               <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
                {displayCourses.map((course, index) => (
                  <Card key={`${category}-${index}`} className="flex flex-col justify-between border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-950/50 hover:shadow-xl transition-all hover:-translate-y-1 h-full min-h-[280px]">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className={`
                            px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                            ${course.level === 'Beginner' ? 'border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300' : ''}
                            ${course.level === 'Intermediate' ? 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : ''}
                            ${course.level === 'Advanced' ? 'border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300' : ''}
                        `}>
                          {course.level}
                        </Badge>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{course.category.split(' ')[0]}</span>
                      </div>
                      <CardTitle className="text-lg font-bold text-navy-900 dark:text-saffron-400 line-clamp-2 leading-tight group-hover:text-saffron-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-muted-foreground mt-2 line-clamp-2">
                          {course.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-6 pt-0">
                         <div className="w-full flex items-center justify-between text-xs text-muted-foreground font-medium mb-4">
                             <span>{course.lessons} Lessons</span>
                             <span>Rating: 4.8★</span>
                         </div>
                      <Button className="w-full h-10 bg-slate-50 hover:bg-saffron-50 text-slate-700 dark:bg-navy-800 dark:text-slate-300 border border-slate-200 dark:border-navy-700 font-semibold group-hover:bg-saffron-500 group-hover:text-white dark:group-hover:text-black group-hover:border-saffron-500 transition-all duration-300">
                        Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {category === "All" && (
                  <div className="mt-12 text-center">
                      <Button variant="outline" size="lg" className="px-8 h-12 border-2 hover:bg-slate-100 dark:hover:bg-navy-800">
                        Browse Full Library of 50+ Courses
                      </Button>
                  </div>
              )}
            </TabsContent>
          )})}
        </Tabs>
      </div>
    </section>
  );
}
