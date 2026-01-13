
import { BookOpen, Users, Trophy, Zap } from "lucide-react";

const features = [
    {
        icon: <BookOpen className="h-8 w-8 text-saffron-500" />,
        title: "100% Hinglish",
        description: "No more language barrier. Learn logic, not just syntax, in the language you think in."
    },
    {
        icon: <Trophy className="h-8 w-8 text-yellow-500" />,
        title: "Gamified Learning",
        description: "Earn XP, maintain streaks, and climb the leaderboard. Learning is now a game."
    },
    {
        icon: <Users className="h-8 w-8 text-blue-500" />,
        title: "Community First",
        description: "Join 50k+ students. Ask doubts, share notes, and grow together."
    },
    {
        icon: <Zap className="h-8 w-8 text-purple-500" />,
        title: "Job Ready",
        description: "Curriculum designed for real jobs in Indian tech startups and MNCs."
    }
];

export function Features() {
    return (
        <section className="max-w-7xl mx-auto py-24 px-6">
             <div className="text-center mb-16 space-y-4">
                <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl text-navy-900 dark:text-white">
                    Why NextGovJob?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Education that fits your style. Hum samajhte hai ki aap kaise seekhna chahte hai.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-navy-900/20 border border-slate-100 dark:border-navy-800 hover:shadow-lg transition-all duration-300">
                        <div className="p-4 rounded-full bg-white dark:bg-navy-950 shadow-sm mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-navy-900 dark:text-white">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
