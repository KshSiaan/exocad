import { howl } from "@/lib/api";
import { CTA } from "./_components/cta";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";
import { Testimonials } from "./_components/testimonials";
import { TrustedBy } from "./_components/trusted-by";

export default async function Home() {
  const res = await howl("/get-profile", {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMjguNjI6ODAxNS9hcGkvbG9naW4iLCJpYXQiOjE3ODM5MTY0ODUsImV4cCI6MTc4NDUyMTI4NSwibmJmIjoxNzgzOTE2NDg1LCJqdGkiOiJjckNOMG8wQ3B0T3ZTM3FiIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v31eEhYxAADa9_VSE33B8iHNhvZKuFBYZcG2MOaliNA",
  });
  console.log(res);
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
