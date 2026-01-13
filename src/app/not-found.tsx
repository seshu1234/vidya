import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-background px-4 text-center">
        <div className="mx-auto max-w-md space-y-8">
            {/* Visual 404 Element */}
            <div className="relative mx-auto h-64 w-64">
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/20 rounded-full animate-pulse blur-3xl opacity-50"></div>
                <div className="relative flex h-full w-full items-center justify-center">
                    <span className="text-9xl font-black text-slate-900 dark:text-slate-100 tracking-tighter opacity-10">404</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-white dark:bg-black p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transform -rotate-12">
                            <Search className="h-12 w-12 text-indigo-600" strokeWidth={1.5} />
                         </div>
                    </div>
                </div>
            </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Page not found</h1>
            <p className="text-muted-foreground text-lg">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2">
              <Link href="/">
                <Home className="h-4 w-4" /> Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
               <Link href="/courses">
                 <Search className="h-4 w-4" /> Browse Courses
               </Link>
            </Button>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
