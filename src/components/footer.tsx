import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-10 md:flex-row md:py-16 px-6">
        <div className="flex-1 space-y-4">
          <h2 className="scroll-m-20 text-xl md:text-2xl font-bold tracking-tight text-navy-900 dark:text-white">NextGovJob</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xs leading-relaxed">
            AI aur Coding seekho simple Hinglish mein. Complex tech concepts, ab apni bhasha mein!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-12 lg:gap-16">
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold tracking-tight text-navy-900 dark:text-white">Learn</h4>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Python Basics</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">AI Fundamentals</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">DSA Mastery</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Web Development</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold tracking-tight text-navy-900 dark:text-white">Resources</h4>
             <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Documentation</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Blog</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Community</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">FAQ</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold tracking-tight text-navy-900 dark:text-white">Company</h4>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">About Us</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Careers</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Contact</Link>
            <Link href="#" className="text-sm hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-navy-800 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4 px-6">
        <p>© 2024 NextGovJob. Made with ❤️ for Indian learners.</p>
        <div className="flex space-x-6">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
