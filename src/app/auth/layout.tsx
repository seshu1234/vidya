import { Quote } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          {children}
        </div>
      </div>

      {/* Right Column: Branding/Testimonial (Hidden on mobile) */}
      <div className="hidden bg-slate-100 dark:bg-zinc-900 lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-2 font-bold text-xl text-navy-900 dark:text-white">
                <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-display font-bold text-lg">
                    NJ
                </div>
                NextGovJob
            </div>
        </div>

        <div className="relative z-10 max-w-lg">
            <Quote className="h-12 w-12 text-slate-300 dark:text-zinc-700 mb-6" />
            <blockquote className="space-y-2">
                <p className="text-2xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                    &quot;I switched from a support role to a Full Stack Developer in just 6 months. The Hinglish analogies made complex topics so easy to understand.&quot;
                </p>
                <footer className="pt-4">
                    <div className="font-semibold text-navy-900 dark:text-white">Amit Kumar</div>
                    <div className="text-sm text-slate-500">SDE-1 at Zomato</div>
                </footer>
            </blockquote>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-sm text-slate-500">
             <span>© 2024 Vidya EdTech</span>
        </div>
      </div>
    </div>
  );
}
