import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Python Shuru Se",
    subtitle: "Python Basics",
    description: "Variables, Loops, Functions — sab kuch grocery examples ke saath!",
    level: "Beginner",
    lessons: 45,
    tag: "Programming"
  },
  {
    title: "AI Ki ABC",
    subtitle: "AI Fundamentals",
    description: "Machine Learning samjho chai stall ki example se!",
    level: "Intermediate",
    lessons: 32,
    tag: "AI & ML"
  },
  {
    title: "DSA Made Easy",
    subtitle: "DSA Mastery",
    description: "Arrays, Trees, Graphs — traffic signals ki tarah visualize karo!",
    level: "Advanced",
    lessons: 60,
    tag: "Calculations"
  },
  {
    title: "Website Banana Seekho",
    subtitle: "Web Development",
    description: "HTML, CSS, JavaScript — apna pehla website banao!",
    level: "Beginner",
    lessons: 52,
    tag: "Development"
  },
  {
    title: "Java Puri Tarah",
    subtitle: "Java Complete",
    description: "OOPs concepts ko real-life objects se samjho!",
    level: "Intermediate",
    lessons: 48,
    tag: "Programming"
  },
  {
    title: "Data Ka Khel",
    subtitle: "Data Science",
    description: "Pandas, NumPy — data ko Excel nahi, Python se handle karo!",
    level: "Advanced",
    lessons: 38,
    tag: "Data Science"
  },
];

export function CourseGrid() {
  return (
    <section className="container mx-auto py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-black/20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold text-navy-900 dark:text-white">
          Course Catalog
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-4">
          Choose Your Learning Path. Har course mein real-world analogies, interactive coding, aur Hinglish explanations!
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 md:max-w-[64rem] mt-8">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col justify-between border-saffron-100 dark:border-navy-800 bg-white dark:bg-navy-950/50 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={`
                    ${course.level === 'Beginner' ? 'border-green-200 text-green-700 bg-green-50' : ''}
                    ${course.level === 'Intermediate' ? 'border-blue-200 text-blue-700 bg-blue-50' : ''}
                    ${course.level === 'Advanced' ? 'border-purple-200 text-purple-700 bg-purple-50' : ''}
                `}>
                  {course.level}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{course.tag}</span>
              </div>
              <CardTitle className="text-xl font-bold text-navy-900 dark:text-saffron-400 group-hover:text-saffron-600 transition-colors">
                {course.title}
              </CardTitle>
              <p className="text-sm font-semibold text-muted-foreground">{course.subtitle}</p>
              <CardDescription className="text-base mt-3 leading-relaxed">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground font-medium">
                <span className="mr-2">📚</span>
                {course.lessons} lessons
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-saffron-50 hover:bg-saffron-100 text-saffron-700 dark:bg-navy-800 dark:text-saffron-400 border border-saffron-200 dark:border-navy-700 font-semibold">
                Start Learning
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="px-8">View All Courses</Button>
      </div>
    </section>
  );
}
