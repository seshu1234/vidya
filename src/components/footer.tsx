import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-navy-950 text-slate-200">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12 px-4">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold text-saffron-500 text-2xl">Vidya Hub</h2>
          <p className="text-sm text-slate-400 max-w-xs">
            Empowering India&apos;s next generation of developers through vernacular education.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:gap-8">
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-white">Platform</h4>
            <Link href="/courses" className="text-sm hover:text-saffron-400">
              Courses
            </Link>
            <Link href="/pricing" className="text-sm hover:text-saffron-400">
              Pricing
            </Link>
            <Link href="/handbook" className="text-sm hover:text-saffron-400">
              Handbook
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-white">Company</h4>
            <Link href="/about" className="text-sm hover:text-saffron-400">
              About Us
            </Link>
            <Link href="/careers" className="text-sm hover:text-saffron-400">
              Careers
            </Link>
            <Link href="/contact" className="text-sm hover:text-saffron-400">
              Contact
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-white">Legal</h4>
            <Link href="/privacy" className="text-sm hover:text-saffron-400">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:text-saffron-400">
              Terms
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-white">Social</h4>
            <Link href="#" className="text-sm hover:text-saffron-400">
              Twitter
            </Link>
            <Link href="#" className="text-sm hover:text-saffron-400">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm hover:text-saffron-400">
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="container border-t border-navy-800 py-6 text-center text-sm text-slate-500">
        © 2024 Project Vidya. All rights reserved.
      </div>
    </footer>
  );
}
