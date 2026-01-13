import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Python for Beginners",
    description: "Learn Python from scratch using everyday analogies. No prior coding knowledge required.",
    level: "Beginner",
    duration: "4 Weeks",
    lessons: 12,
  },
  {
    title: "Web Development 101",
    description: "Build your first website. Understand HTML, CSS, and how the internet works.",
    level: "Beginner",
    duration: "6 Weeks",
    lessons: 18,
  },
  {
    title: "AI & ChatGPT Basics",
    description: "Understand how AI works. Learn to prompt engineering and build simple AI tools.",
    level: "Intermediate",
    duration: "3 Weeks",
    lessons: 10,
  },
  {
    title: "Data Science Foundation",
    description: "Learn how data is stored and analyzed. Introduction to databases and SQL.",
    level: "Intermediate",
    duration: "5 Weeks",
    lessons: 15,
  },
];

export function CourseGrid() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-navy-900 dark:text-white">
          Popular Courses
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Start your journey with our carefully crafted curriculum designed for absolute beginners.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2 mt-12">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col justify-between border-saffron-200 dark:border-navy-800 bg-white dark:bg-navy-950/50 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-navy-900 dark:text-saffron-400">{course.title}</CardTitle>
                <Badge variant="secondary" className="bg-saffron-100 text-saffron-700 hover:bg-saffron-200">
                  {course.level}
                </Badge>
              </div>
              <CardDescription className="text-base mt-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                  {course.lessons} Lessons
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-navy-800 hover:bg-navy-900 text-white">View Curriculum</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
