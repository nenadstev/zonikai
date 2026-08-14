import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductProof } from "@/components/home/ProductProof";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <ProductProof />
      <FinalCTA />
    </>
  );
}
