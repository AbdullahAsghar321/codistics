import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import TeamSection from "@/components/Team";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <HeroSection/>
      <FeaturesSection/>
      <TeamSection/>
    </main>
  );
}
