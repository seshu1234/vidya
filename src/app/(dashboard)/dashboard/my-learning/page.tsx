import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function MyLearningPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">My Learning</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your courses and track your progress.</p>
            </div>

            <div className="grid gap-6">
                 {/* Course Item 1 */}
                 <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 w-full md:w-48 bg-slate-100 rounded-xl relative overflow-hidden flex-shrink-0">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                         <div className="absolute bottom-2 left-2">
                              <Badge className="bg-white/90 text-black shadow-sm">Web Dev</Badge>
                         </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white">Full Stack Master: React & Node</h3>
                                <p className="text-muted-foreground text-sm">Module 4: Advanced React Hooks</p>
                             </div>
                             <Badge variant="outline" className="hidden sm:inline-flex">In Progress</Badge>
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>65% Completed</span>
                                <span>2h 15m remaining</span>
                             </div>
                             <div className="h-2 w-full bg-slate-100 dark:bg-navy-950 rounded-full overflow-hidden">
                                <div className="h-full w-[65%] bg-green-500 rounded-full"></div>
                             </div>
                        </div>
                    </div>

                    <Button size="lg" className="shrink-0 w-full md:w-auto h-12 px-6 rounded-xl font-bold">
                        Continue Learning
                    </Button>
                </div>

                {/* Course Item 2 */}
                <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 w-full md:w-48 bg-slate-100 rounded-xl relative overflow-hidden flex-shrink-0">
                         <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                         <div className="absolute bottom-2 left-2">
                              <Badge className="bg-white/90 text-black shadow-sm">Programming</Badge>
                         </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white">C Programming Masterclass</h3>
                                <p className="text-muted-foreground text-sm">Week 2: Control Flow</p>
                             </div>
                             <Badge variant="outline" className="hidden sm:inline-flex">In Progress</Badge>
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>15% Completed</span>
                                <span>8h 30m remaining</span>
                             </div>
                             <div className="h-2 w-full bg-slate-100 dark:bg-navy-950 rounded-full overflow-hidden">
                                <div className="h-full w-[15%] bg-green-500 rounded-full"></div>
                             </div>
                        </div>
                    </div>

                    <Button size="lg" className="shrink-0 w-full md:w-auto h-12 px-6 rounded-xl font-bold">
                        Continue Learning
                    </Button>
                </div>
            </div>
        </div>
    );
}
