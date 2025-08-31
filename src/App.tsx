import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MilestonesSection from '@/components/MilestonesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import MouseTracker from '@/components/MouseTracker';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <ThemeProvider>
      <motion.div 
        className="min-h-screen bg-background scroll-smooth transition-colors duration-300 cursor-none lg:cursor-none"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      >
        {/* Mouse Tracker */}
        <MouseTracker />
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1 }}
        />
        
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

        <motion.footer 
          className="bg-primary text-primary-foreground py-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="animate-brand-gradient w-full h-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-medium"
            >
              &copy; 2024 DevPortfolio. Crafted with passion.
            </motion.p>
            <motion.p 
              className="text-sm mt-2 opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Built with React, TypeScript, Tailwind CSS, and Framer Motion
            </motion.p>
          </div>
        </motion.footer>

        <Toaster position="bottom-right" />
        <ScrollToTop />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;