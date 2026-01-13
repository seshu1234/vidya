import { Button } from "@/components/ui/button";
import { VernacularToggle } from "@/components/vernacular-toggle";

export function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-saffron-600 dark:text-saffron-400 mb-4">
          50,000+ students already learning
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-950 dark:text-white leading-tight">
          AI aur Coding <br />
          <span className="text-saffron-500">seekhein simple</span> <br />
          Hinglish mein
        </h1>
        <p className="max-w-[42rem] mt-4 leading-normal text-muted-foreground sm:text-lg sm:leading-8">
          Complex tech concepts ko samjho grocery store ki tarah simple analogies mein. Python, Java, AI — sab kuch apni bhasha mein!
        </p>
        <div className="space-x-4 mt-6">
          <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black font-semibold h-12 px-8 shadow-lg shadow-saffron-500/20">
            Start Learning Free
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8">
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
                {[1,2,3,4].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-background flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(65+i)}
                    </div>
                ))}
            </div>
            <span>4.9/5 rating from 10K+ reviews</span>
        </div>
      </div>
      
      <div className="container mx-auto mt-16">
        <VernacularToggle />
      </div>
    </section>
  );
}
