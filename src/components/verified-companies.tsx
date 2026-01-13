
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";


export function VerifiedCompanies() {
  return (
    <div className="group relative m-auto max-w-6xl px-6">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:max-w-44 md:border-r md:pr-6 mb-6 md:mb-0">
          <p className="text-center md:text-end text-sm text-muted-foreground font-medium">Trusted by learners from top companies</p>
        </div>
        <div className="relative py-2 md:w-[calc(100%-11rem)] w-full overflow-hidden">
          <InfiniteSlider speed={40} gap={60}>
            {["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zomato", "Paytm", "Ola"].map((company) => (
               <div key={company} className="flex items-center justify-center px-4">
                  <span className="text-xl font-bold text-slate-300 dark:text-slate-700">{company}</span>
               </div>
            ))}
          </InfiniteSlider>

          <div className="bg-gradient-to-r from-background to-transparent absolute inset-y-0 left-0 w-20 pointer-events-none"></div>
          <div className="bg-gradient-to-l from-background to-transparent absolute inset-y-0 right-0 w-20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
