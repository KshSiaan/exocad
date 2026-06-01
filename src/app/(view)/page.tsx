import { CTA } from "./_components/cta";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";
import { Testimonials } from "./_components/testimonials";
import { TrustedBy } from "./_components/trusted-by";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
