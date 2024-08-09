import HeroSection from "@/components/HeroSection";
import Section from "@/components/Section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center container mt-2">
      Clodron is your cloud partner.
      <HeroSection />
      <Section />
    </main>
  );
}
