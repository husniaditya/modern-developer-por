import React from 'react';
import { motion } from 'framer-motion';
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
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background scroll-smooth"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
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
        className="bg-primary text-primary-foreground py-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            &copy; 2024 Your Name. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-sm mt-2 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Built with React, TypeScript, and Tailwind CSS
          </motion.p>
        </div>
      </motion.footer>

      <Toaster position="bottom-right" />
    </motion.div>
  );
}

export default App;