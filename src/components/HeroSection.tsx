import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowDown, Download, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';
import TypewriterEffect from './TypewriterEffect';

const HeroSection = () => {
  const jobTitles = [
    "Full Stack Developer",
    "Frontend Developer", 
    "Backend Developer",
    "Application Support Engineer"
  ];

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Avatar */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              variants={avatarVariants}
              whileHover="hover"
            >
              <Avatar className="w-32 h-32 ring-4 ring-primary/20 shadow-lg">
                <AvatarImage src="/api/placeholder/128/128" alt="Profile" />
                <AvatarFallback className="text-2xl font-bold">YN</AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold text-foreground"
              variants={itemVariants}
            >
              Your Name
            </motion.h1>
            <motion.h2 
              className="text-2xl sm:text-3xl font-semibold text-primary min-h-[3rem] flex items-center justify-center"
              variants={itemVariants}
            >
              <TypewriterEffect 
                texts={jobTitles} 
                speed={50}
                pauseDuration={1200}
              />
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Passionate developer with 5+ years of experience building modern web applications. 
              I love creating efficient, scalable solutions that make a real impact.
            </motion.p>
          </div>

          {/* Social Links & CTA */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon">
                  <LinkedinLogo size={20} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon">
                  <GithubLogo size={20} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon">
                  <Envelope size={20} />
                </Button>
              </motion.div>
            </div>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="group">
                  <Download size={16} className="mr-2 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={scrollToNext}>
                  View My Work
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="pt-12"
            variants={itemVariants}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Button 
                variant="ghost" 
                size="icon"
                onClick={scrollToNext}
                className="hover:bg-primary/10"
              >
                <ArrowDown size={24} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;