export function Stats() {
    return (
        <section className="max-w-7xl mx-auto py-12 md:py-24 border-y border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-950">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center px-6">
                <div className="space-y-2">
                    <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black dark:text-white">50,000+</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Active Students</p>
                    <p className="text-xs text-muted-foreground">from NextGovJob community</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-navy-900 dark:text-white">1,200+</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Lessons</p>
                     <p className="text-xs text-muted-foreground">in Hinglish mode</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black dark:text-white">95%</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Success Rate</p>
                     <p className="text-xs text-muted-foreground">in coding interviews</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-navy-900 dark:text-white">28 Days</h3>
                     <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">Avg. Streak</p>
                     <p className="text-xs text-muted-foreground">learner engagement</p>
                </div>
            </div>
        </section>
    )
}
