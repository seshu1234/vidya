import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CourseGrid } from "@/components/course-grid";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <CourseGrid />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
