import AboutSection from "@/components/AboutSection";
import AchievementSection from "@/components/AchievementSection";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/ProjectSection";
import FooterSection from "@/components/FooterSection";
export default function Home() {
  return (
<>
  <Navbar />
  <HomeSection />
  <AboutSection />
  <AchievementSection />
  <ProjectSection />
  <FooterSection />
</>
  );
}
