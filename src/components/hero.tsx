
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { VernacularToggle } from "@/components/vernacular-toggle";
import { VerifiedCompanies } from "@/components/verified-companies";
import { HeroIllustration } from "@/components/hero-illustration";

export function Hero() {
    return (
        <section className="overflow-x-hidden pt-12 md:pt-20">
            <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="rounded-2xl inline-flex bg-muted/80 backdrop-blur-sm border border-border/50 px-4 py-1.5 text-sm font-medium text-saffron-600 dark:text-saffron-400 mb-6 font-sans">
                            🚀 50,000+ students already learning
                        </div>
                        <h1 className="max-w-3xl text-balance text-4xl font-extrabold md:text-6xl lg:text-7xl tracking-tight text-navy-950 dark:text-white leading-[1.1] font-sans">
                            AI aur Coding <br />
                            <span className="text-saffron-500">seekhein simple</span> <br />
                            Hinglish mein
                        </h1>
                        <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed font-sans">
                            Complex tech concepts ko samjho grocery store ki tarah simple analogies mein. Python, Java, AI — sab kuch apni bhasha mein!
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                asChild
                                size="lg"
                                className="px-8 h-12 text-base font-semibold bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black shadow-lg shadow-saffron-500/20 font-sans">
                                <Link href="/courses">
                                    <span className="text-nowrap">Start Learning Free</span>
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8 h-12 text-base font-sans">
                                <Link href="#demo">
                                    <span className="text-nowrap">Watch Demo</span>
                                </Link>
                            </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground font-sans">
                             <div className="flex -space-x-3">
                                {[1,2,3,4].map((_, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative">
                                       <Image 
                                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=b6e3f4`} 
                                         alt="Avatar" 
                                         fill 
                                         className="object-cover"
                                         unoptimized
                                       />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="font-bold text-foreground">10K+ reviews</span>
                                <span className="text-xs">Rated 4.9/5 stars</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: Visual/Image */}
                    <div className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end">
                         {/* Abstract blobs/gradients behind */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-saffron-100/40 via-blue-100/40 to-transparent dark:from-saffron-900/20 dark:via-blue-900/20 blur-3xl rounded-full opacity-70 transform translate-x-1/4 scale-110"></div>
                        
                        {/* Main Hero Illustration */}
                        <div className="relative w-full h-full p-4"> 
                             <HeroIllustration />
                        </div>
                    </div>
                 </div>
            </div>

            <section className="bg-background pb-12 border-b border-border/50">
               <VerifiedCompanies />
            </section>
            
            <section id="demo" className="max-w-7xl mx-auto py-16 lg:py-24">
                 <VernacularToggle />
            </section>
        </section>
    )
}
