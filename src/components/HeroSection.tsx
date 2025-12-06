import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TiltedCard from '@/components/ui/tilted-card';
import LetterGlitch from '@/components/ui/letter-glitch';
import { GridScan } from '@/components/ui/grid-scan';
import GlassIcons, { GlassIconsItem } from '@/components/ui/glass-icons';
import { ArrowDown, Download, LinkedinLogo, GithubLogo, Envelope, Printer, Eye } from '@phosphor-icons/react';
import DecryptedText from '@/components/ui/decrypted-text';
import GradientText from '@/components/ui/gradient-text';
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import profileImg from '@/assets/images/profile/profile.webp';

// Import all language-specific resumes
import resumeEN from '@/assets/resume/resume - Husni Aditya_EN.pdf';
import resumeID from '@/assets/resume/resume - Husni Aditya_ID.pdf';
import resumeFR from '@/assets/resume/resume - Husni Aditya_FR.pdf';
import resumeES from '@/assets/resume/resume - Husni Aditya_ES.pdf';
import resumeDE from '@/assets/resume/resume - Husni Aditya_DE.pdf';
import resumeCN from '@/assets/resume/resume - Husni Aditya_CN.pdf';
import resumeJA from '@/assets/resume/resume - Husni Aditya_JA.pdf';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  // Get the appropriate resume based on current language
  const getResumePdf = () => {
    const languageMap: Record<string, string> = {
      'en': resumeEN,
      'id': resumeID,
      'fr': resumeFR,
      'es': resumeES,
      'de': resumeDE,
      'cn': resumeCN,
      'ja': resumeJA,
    };
    return languageMap[i18n.language] || resumeEN;
  };

  const getResumeFilename = () => {
    const languageNames: Record<string, string> = {
      'en': 'English',
      'id': 'Indonesian',
      'fr': 'French',
      'es': 'Spanish',
      'de': 'German',
      'cn': 'Chinese',
      'ja': 'Japanese',
    };
    const lang = languageNames[i18n.language] || 'English';
    return `Husni_Aditya_Resume_${lang}.pdf`;
  };
  
  const jobTitles = [
    "Senior Full Stack Developer",
    "React & TypeScript Specialist", 
    "Backend Systems Engineer",
    "Application Management Specialist"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % jobTitles.length);
      setKey((prev) => prev + 1);
    }, 4000); // Change title every 4 seconds

    return () => clearInterval(interval);
  }, [jobTitles.length]);

  const glassIconItems: GlassIconsItem[] = [
    {
      icon: <LinkedinLogo size={16} weight="fill" />,
      color: 'blue',
      label: 'LinkedIn',
      customClass: 'linkedin-icon'
    },
    {
      icon: <GithubLogo size={16} weight="fill" />,
      color: 'purple',
      label: 'GitHub',
      customClass: 'github-icon'
    },
    {
      icon: <Envelope size={16} weight="fill" />,
      color: 'red',
      label: 'Email',
      customClass: 'email-icon'
    },
    {
      icon: <Download size={16} weight="fill" />,
      color: 'green',
      label: t('hero.downloadResume'),
      customClass: 'download-icon'
    },
    {
      icon: <Printer size={16} weight="fill" />,
      color: 'indigo',
      label: t('hero.printResume'),
      customClass: 'print-icon'
    },
    {
      icon: <Eye size={16} weight="fill" />,
      color: 'orange',
      label: t('hero.viewMyWork'),
      customClass: 'view-icon'
    }
  ];

  const handleIconClick = (index: number) => {
    switch (index) {
      case 0: // LinkedIn
        window.open('https://www.linkedin.com/in/husni-aditya-5b9065123/', '_blank');
        break;
      case 1: // GitHub
        window.open('https://github.com/husniaditya', '_blank');
        break;
      case 2: // Email
        window.location.href = 'mailto:adityahusni90@gmail.com';
        break;
      case 3: // Download Resume
        {
          const link = document.createElement('a');
          link.href = getResumePdf();
          link.download = getResumeFilename();
          link.click();
        }
        break;
      case 4: // Print Resume
        window.print();
        break;
      case 5: // View My Work
        smoothScrollTo('skills');
        break;
    }
  };

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

  return (
    <section
      id="hero"
      className="min-h-[calc(100svh)] flex items-start md:items-center justify-center relative overflow-hidden pt-[calc(var(--nav-h,72px)+8px)] md:pt-[calc(var(--nav-h,72px)+32px)] scroll-mt-[calc(var(--nav-h,72px)+8px)]"
    >
      {/* Light theme - GridScan background */}
      {theme === 'light' && (
        <div className="absolute inset-0">
          <GridScan
            lineThickness={1.5}
            linesColor="#3b82f6"
            scanColor="#ec4899"
            scanOpacity={0.3}
            gridScale={0.15}
            lineStyle="solid"
            lineJitter={0}
            scanDirection="pingpong"
            enablePost={true}
            bloomIntensity={0.3}
            bloomThreshold={0.8}
            bloomSmoothing={0.5}
            chromaticAberration={0.001}
            noiseIntensity={0.02}
            scanGlow={0.4}
            scanSoftness={2}
            scanPhaseTaper={0.85}
            scanDuration={3.0}
            scanDelay={1.5}
            enableGyro={false}
            scanOnClick={false}
            className="opacity-40"
          />
          {/* Light overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60" />
        </div>
      )}

      {/* Dark theme - LetterGlitch background */}
      {theme === 'dark' && (
        <div className="absolute inset-0">
          <div className="opacity-40">
            <LetterGlitch
              glitchColors={['#22d3ee', '#a78bfa', '#60a5fa', '#34d399']}
              glitchSpeed={80}
              centerVignette={false}
              outerVignette={true}
              smooth={true}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?/[]{}|"
            />
          </div>
          {/* Dark overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/70 to-gray-950/90" />
        </div>
      )}

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:pt-12 sm:pb-12 relative z-10">
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
            <TiltedCard
              imageSrc={profileImg}
              altText="Husni Aditya - Professional Profile"
              captionText="Husni Aditya"
              containerHeight="160px"
              containerWidth="160px"
              imageHeight="144px"
              imageWidth="144px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={true}
            />
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl sm:text-7xl font-bold text-foreground dark:bg-gradient-to-r dark:from-foreground dark:via-cyan-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent"
              variants={itemVariants}
            >
              {t('hero.greeting')} {t('hero.name')}
            </motion.h1>
            <motion.h2 
              className="text-2xl sm:text-4xl font-semibold min-h-[4rem] flex items-center justify-center text-slate-800 dark:text-primary"
              variants={itemVariants}
            >
              <DecryptedText 
                key={key}
                text={jobTitles[currentTitleIndex]}
                speed={30}
                sequential={true}
                animateOn="view"
              />
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-muted-foreground"
              variants={itemVariants}
            >
              <GradientText>
                {t('hero.description')}
              </GradientText>
            </motion.p>
          </div>

          {/* Enhanced Social Links & CTA */}
          <motion.div 
            className="flex flex-col items-center justify-center"
            variants={itemVariants}
          >
            <div 
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const button = target.closest('button');
                if (button) {
                  const buttons = button.parentElement?.querySelectorAll('button');
                  const index = buttons ? Array.from(buttons).indexOf(button) : -1;
                  if (index !== -1) handleIconClick(index);
                }
              }}
              className="w-full flex justify-center"
            >
              <GlassIcons items={glassIconItems} className="w-auto inline-flex" />
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