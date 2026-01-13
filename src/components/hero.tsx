import { Button } from "@/components/ui/button";
import { VernacularToggle } from "@/components/vernacular-toggle";

export function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-saffron-600 dark:text-saffron-400">
          🚀 India&apos;s First Vernacular AI Learning Platform
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-950 dark:text-white">
          Learn AI & Coding in <br />
          <span className="text-saffron-500">Your Own Language</span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Stop memorizing definitions. Start understanding logic. 
          We translate Tech &quot;Jargon&quot; into &quot;Real Life Examples&quot; in Hinglish, Tanglish, and more.
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black font-semibold h-12 px-8">
            Start Learning Free
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8">
            Download Handbook
          </Button>
        </div>
      </div>
      
      <div className="container mt-16">
        <VernacularToggle />
      </div>
    </section>
  );
}
