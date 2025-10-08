import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowDown, Download, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';
import TypewriterEffect from './TypewriterEffect';
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  const jobTitles = [
    "Senior Full Stack Developer",
    "React & TypeScript Specialist", 
    "Backend Systems Engineer",
    "Application Support Engineer"
  ];

  const scrollToNext = () => {
    smoothScrollTo('skills');
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
      opacity: 1
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1
    },
    hover: {
      scale: 1.05
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-sparkle"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-12 h-12 bg-primary/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <Avatar className="w-36 h-36 ring-4 ring-primary ring-offset-4 ring-offset-background shadow-2xl">
                <AvatarImage 
                  src="/src/assets/images/profile/profile.webp" 
                  alt="Professional Profile"
                  className="object-cover object-center"
                />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                  HA
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {t('hero.greeting')} {t('hero.name')}
            </motion.h1>
            <motion.h2 
              className="text-2xl sm:text-4xl font-semibold text-primary min-h-[4rem] flex items-center justify-center"
              variants={itemVariants}
            >
              <TypewriterEffect 
                texts={jobTitles} 
                speed={50}
                pauseDuration={1500}
              />
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {t('hero.description')}
            </motion.p>
          </div>

          {/* Enhanced Social Links & CTA */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <motion.a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                  <LinkedinLogo size={20} />
                </Button>
              </motion.a>
              <motion.a
                href="https://github.com/husniaditya"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                  <GithubLogo size={20} />
                </Button>
              </motion.a>
              <motion.a
                href="mailto:adityahusni90@gmail.com"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                  <Envelope size={20} />
                </Button>
              </motion.a>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="/src/assets/resume/resume - Husni Aditya.pdf"
                download="Husni_Aditya_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300">
                  <Download size={16} className="mr-2 group-hover:animate-bounce" />
                  {t('hero.downloadResume')}
                </Button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={scrollToNext} className="border-accent/50 hover:border-accent hover:bg-accent/10">
                  View My Work
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div 
            className="pt-16"
            variants={itemVariants}
          >
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button 
                variant="ghost" 
                size="icon"
                onClick={scrollToNext}
                className="hover:bg-primary/10 rounded-full w-12 h-12"
              >
                <ArrowDown size={24} className="text-primary" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;