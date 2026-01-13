import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Web Development", "AI & Data Science", "Programming"];

// Expanded Mock Data (24 Courses)
const allCourses = [
  // Web Development
  { title: "Website Banana Seekho", subtitle: "HTML/CSS Basics", level: "Beginner", lessons: 45, category: "Web Development" },
  { title: "ReactJS Masterclass", subtitle: "Modern Frontend", level: "Intermediate", lessons: 32, category: "Web Development" },
  { title: "Backend with Node.js", subtitle: "Server-side Logic", level: "Advanced", lessons: 28, category: "Web Development" },
  { title: "Full Stack MERN", subtitle: "Complete Developer", level: "Advanced", lessons: 60, category: "Web Development" },
  { title: "CSS Animations", subtitle: "Creative Coding", level: "Intermediate", lessons: 15, category: "Web Development" },
  { title: "JavaScript for Web", subtitle: "Interactive Sites", level: "Beginner", lessons: 40, category: "Web Development" },

  // AI & Data Science
  { title: "AI Ki ABC", subtitle: "AI Fundamentals", level: "Beginner", lessons: 25, category: "AI & Data Science" },
  { title: "Data Ka Khel", subtitle: "Data Science using Python", level: "Intermediate", lessons: 38, category: "AI & Data Science" },
  { title: "Machine Learning 101", subtitle: "Predictions & Models", level: "Advanced", lessons: 42, category: "AI & Data Science" },
  { title: "Deep Learning Magic", subtitle: "Neural Networks", level: "Advanced", lessons: 50, category: "AI & Data Science" },
  { title: "Python for Data", subtitle: "Pandas & NumPy", level: "Intermediate", lessons: 30, category: "AI & Data Science" },
  { title: "ChatGPT for Coders", subtitle: "Prompt Engineering", level: "Beginner", lessons: 12, category: "AI & Data Science" },

  // Programming
  { title: "Python Shuru Se", subtitle: "Python Basics", level: "Beginner", lessons: 45, category: "Programming" },
  { title: "Java Puri Tarah", subtitle: "Java Complete", level: "Intermediate", lessons: 48, category: "Programming" },
  { title: "DSA Made Easy", subtitle: "Data Structures", level: "Advanced", lessons: 60, category: "Programming" },
  { title: "C++ for Competitive", subtitle: "Speed & Logic", level: "Advanced", lessons: 55, category: "Programming" },
  { title: "GoLang Fast Track", subtitle: "Modern Systems", level: "Intermediate", lessons: 35, category: "Programming" },
  { title: "Rust for Beginners", subtitle: "Safe Systems", level: "Intermediate", lessons: 40, category: "Programming" },
  
  // Mixed / Extra
  { title: "Git & GitHub", subtitle: "Version Control", level: "Beginner", lessons: 10, category: "Programming" },
  { title: "Docker Container", subtitle: "DevOps Basics", level: "Intermediate", lessons: 18, category: "Web Development" },
  { title: "SQL Database", subtitle: "Data Management", level: "Beginner", lessons: 22, category: "AI & Data Science" },
  { title: "Cyber Security Intro", subtitle: "Stay Safe Online", level: "Beginner", lessons: 15, category: "Programming" },
  { title: "Cloud Computing AWS", subtitle: "Serverless Tech", level: "Advanced", lessons: 45, category: "Web Development" },
  { title: "Blockchain Basics", subtitle: "Web3 Intro", level: "Intermediate", lessons: 20, category: "Programming" },
];

export function CourseGrid() {
  // Helper to filter courses. For "All", we sort by a 'featured' logic or just mix them. 
  // Here we just take the first 8 for "All" to keep it clean.
  const getCourses = (category: string) => {
    if (category === "All") return allCourses.slice(0, 8);
    return allCourses.filter((c) => c.category === category);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 lg:py-24 bg-slate-50 dark:bg-black/20">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-navy-900 dark:text-white">
          Course Catalog
        </h2>
        <p className="max-w-[85%] leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-base sm:text-lg mb-8">
          20+ courses. 3 specialized paths. 1 simple language. <br className="hidden sm:block"/>
          Select your interest and start learning immediately.
        </p>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8 w-full overflow-x-auto pb-2 px-4">
             <TabsList className="h-12 w-auto justify-start rounded-full bg-slate-200/50 dark:bg-navy-900/50 p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-6 py-2.5 text-sm md:text-base font-medium data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:text-black transition-all"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
               <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
                {getCourses(category).map((course, index) => (
                  <Card key={`${category}-${index}`} className="flex flex-col justify-between border-saffron-100 dark:border-navy-800 bg-white dark:bg-navy-950/50 hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className={`
                            px-2 py-0.5 rounded-md text-xs font-semibold
                            ${course.level === 'Beginner' ? 'border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300' : ''}
                            ${course.level === 'Intermediate' ? 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : ''}
                            ${course.level === 'Advanced' ? 'border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300' : ''}
                        `}>
                          {course.level}
                        </Badge>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{course.category.split(' ')[0]}</span>
                      </div>
                      <CardTitle className="text-xl font-bold text-navy-900 dark:text-saffron-400 line-clamp-1 group-hover:text-saffron-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-muted-foreground mt-1">
                          {course.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground font-medium">
                        <span className="mr-2 text-lg">📚</span>
                        {course.lessons} Hinglish Lessons
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full bg-saffron-50 hover:bg-saffron-100 text-saffron-700 dark:bg-navy-800 dark:text-saffron-400 border border-saffron-200 dark:border-navy-700 font-semibold group-hover:bg-saffron-500 group-hover:text-white dark:group-hover:text-black transition-colors">
                        Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                  <Button variant="outline" size="lg" className="px-8 h-12 border-2 hover:bg-slate-100 dark:hover:bg-navy-800">
                    {category === 'All' ? 'Browse All 30+ Courses' : `View All ${category} Courses`}
                  </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
