import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CourseGrid } from "@/components/course-grid";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CourseGrid />
        <section className="container py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-navy-900/20">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold text-navy-900 dark:text-white">
                Trusted by Students
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 w-full">
                    <div className="p-6 bg-white dark:bg-navy-950 rounded-lg shadow-sm">
                        <p className="text-lg font-bold text-saffron-600">10k+</p>
                        <p className="text-muted-foreground">Students Enrolled</p>
                    </div>
                     <div className="p-6 bg-white dark:bg-navy-950 rounded-lg shadow-sm">
                        <p className="text-lg font-bold text-saffron-600">500+</p>
                        <p className="text-muted-foreground">Daily Active Users</p>
                    </div>
                     <div className="p-6 bg-white dark:bg-navy-950 rounded-lg shadow-sm">
                        <p className="text-lg font-bold text-saffron-600">4.8/5</p>
                        <p className="text-muted-foreground">Course Rating</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
