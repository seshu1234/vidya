
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const testimonials = [
  {
    name: "Rahul S.",
    role: "SSC Aspirant • Bihar",
    content: "Pehli baar coding samajh aayi! Grocery store wali analogy ne loops clear kar diya 🙌",
    initials: "R",
    color: "bg-orange-100 text-orange-700"
  },
  {
    name: "Priya M.",
    role: "Bank PO Prep • UP",
    content: "AI concepts itne simple kabhi nahi lage. Ab interview mein confidently explain kar sakti hoon!",
    initials: "P",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Amit K.",
    role: "Railway Exam Prep • MP",
    content: "English textbooks se frustrated tha. Hinglish mode ne game change kar diya! 🔥",
    initials: "A",
    color: "bg-green-100 text-green-700"
  }
];

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center mb-12">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-navy-900 dark:text-white">
          Students Love Us
        </h2>
        <p className="max-w-[85%] leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-base sm:text-lg">
          Real feedback from our learning community
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-muted/50 border-none shadow-sm hover:bg-muted/80 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${testimonial.color}`}>
                  {testimonial.initials}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 italic leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
