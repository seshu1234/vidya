
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { Briefcase, Cloud, Code2, Database, Globe, Layers, Server, Shield } from "lucide-react";

export function VerifiedCompanies() {
  const companies = [
    { name: "Google", icon: Globe },
    { name: "Microsoft", icon: Code2 },
    { name: "Amazon", icon: Cloud },
    { name: "Flipkart", icon: Briefcase },
    { name: "Swiggy", icon: Layers },
    { name: "Zomato", icon: Database },
    { name: "Paytm", icon: Shield },
    { name: "Ola", icon: Server },
  ];

  return (
    <div className="group relative m-auto max-w-7xl px-6">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:max-w-44 md:border-r md:pr-6 mb-6 md:mb-0">
          <p className="text-center md:text-end text-sm md:text-base text-muted-foreground font-medium">Trusted by learners from top companies</p>
        </div>
        <div className="relative py-2 md:w-[calc(100%-11rem)] w-full overflow-hidden">
          <InfiniteSlider speed={40} gap={60}>
            {companies.map((company) => {
               const Icon = company.icon;
               return (
                 <div key={company.name} className="flex items-center gap-2 px-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-default">
                    <Icon className="h-6 w-6" />
                    <span className="text-xl font-bold text-slate-400 dark:text-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{company.name}</span>
                 </div>
               )
            })}
          </InfiniteSlider>

          <div className="bg-gradient-to-r from-background to-transparent absolute inset-y-0 left-0 w-20 pointer-events-none"></div>
          <div className="bg-gradient-to-l from-background to-transparent absolute inset-y-0 right-0 w-20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
