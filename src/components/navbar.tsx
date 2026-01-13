import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-heading font-bold text-xl text-saffron-600 dark:text-saffron-500">
              NextGovJob
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/courses"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Courses
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Leaderboard
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Community
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Menu Trigger would go here for small screens - keeping simple for now */}
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">
              <span>🔥</span>
              <span>12 day streak</span>
            </div>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Login
              </Button>
              <Button
                size="sm"
                className="bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black font-semibold"
              >
                Start Free
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
