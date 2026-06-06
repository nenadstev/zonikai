import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { SoloOrchestrator } from "@/components/home/SoloOrchestrator";
import { GpsTracking } from "@/components/home/GpsTracking";
import { VoiceAgent } from "@/components/home/VoiceAgent";
import { AutomationFlow } from "@/components/home/AutomationFlow";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { Monitoring } from "@/components/home/Monitoring";
import { Integrations } from "@/components/home/Integrations";
import { Benefits } from "@/components/home/Benefits";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <SoloOrchestrator />
      <GpsTracking />
      <VoiceAgent />
      <AutomationFlow />
      <HowItWorks />
      <DashboardPreview />
      <Monitoring />
      <Integrations />
      <Benefits />
      <FAQ />
      <FinalCTA />
    </>
  );
}
