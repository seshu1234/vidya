import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CourseGrid } from "@/components/course-grid";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CourseGrid />
        
        {/* Stats Section */}
        <section className="container mx-auto py-12 md:py-24 border-y border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-950">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-saffron-600 dark:text-saffron-500">50,000+</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Active Students</p>
                    <p className="text-xs text-muted-foreground">from NextGovJob community</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">1,200+</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Lessons</p>
                     <p className="text-xs text-muted-foreground">in Hinglish mode</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-saffron-600 dark:text-saffron-500">95%</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Success Rate</p>
                     <p className="text-xs text-muted-foreground">in coding interviews</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">28 Days</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Avg. Streak</p>
                     <p className="text-xs text-muted-foreground">learner engagement</p>
                </div>
            </div>
        </section>

        <Testimonials />

        {/* CTA Section */}
        <section className="container mx-auto py-24 text-center">
            <div className="max-w-3xl mx-auto space-y-8 bg-navy-950 dark:bg-saffron-500/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                
                <h2 className="relative font-heading text-3xl md:text-5xl font-bold text-white">
                    Ready to Start Your Coding Journey?
                </h2>
                <p className="relative text-lg text-slate-300 dark:text-slate-200">
                    Join 50,000+ students learning tech skills in simple Hinglish. No prior experience needed!
                </p>
                <div className="relative pt-4">
                     <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black font-bold h-14 px-10 text-lg shadow-xl shadow-saffron-500/20">
                        Start Free Today 🚀
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
