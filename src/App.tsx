import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MilestonesSection from '@/components/MilestonesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navigation />
      
      <main>
        <HeroSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <MilestonesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
          <p className="text-sm mt-2 opacity-80">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;