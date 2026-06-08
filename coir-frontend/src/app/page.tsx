import { AboutSection } from "@/components/home/AboutSection";
import { ConnectSection } from "@/components/home/ConnectSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { SchemeSection } from "@/components/home/SchemeSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <NewsSection />
        <SchemeSection />
        <AboutSection />
        <ServicesSection />
        <ConnectSection />
        <SuccessStories />
      </main>
      <Footer />
    </>
  );
}
