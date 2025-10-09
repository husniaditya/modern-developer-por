import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowDown, Download, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';
import TypewriterEffect from './TypewriterEffect';
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import profileImg from '@/assets/images/profile/profile.webp';
import resumePdf from '@/assets/resume/resume - Husni Aditya.pdf';

const HeroSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Generate random stars for the GitHub Spark effect
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 0.5,
      duration: Math.random() * 4 + 1.5,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3,
      variant: Math.random() > 0.5 ? 'star' : 'circle',
    }));
  }, []);

  // Generate shooting stars
  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 30,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 8 + i * 3,
    }));
  }, []);
  
  const jobTitles = [
    "Senior Full Stack Developer",
    "React & TypeScript Specialist", 
    "Backend Systems Engineer",
    "Application Management Specialist"
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
    <section
      id="hero"
      className="min-h-[calc(100svh)] flex items-start md:items-center justify-center relative overflow-hidden pt-[calc(var(--nav-h,64px)+16px)] md:pt-[calc(var(--nav-h,64px)+32px)]"
    >
      {/* Light theme modern background */}
      {theme === 'light' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient mesh base */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(60rem 60rem at 10% -10%, rgba(59,130,246,.14), transparent 60%),
                radial-gradient(40rem 40rem at 90% 10%, rgba(236,72,153,.10), transparent 60%),
                radial-gradient(30rem 30rem at 20% 80%, rgba(56,189,248,.12), transparent 60%),
                radial-gradient(24rem 24rem at 80% 80%, rgba(168,85,247,.10), transparent 60%),
                linear-gradient(to bottom right, #f7fbff, #eef6ff)
              `,
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Animated soft blobs */}
          <motion.div
            className="absolute -top-16 -left-20 w-72 h-72 rounded-full blur-3xl opacity-35 bg-gradient-to-br from-sky-300 to-blue-400"
            animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-300 to-pink-300"
            animate={{ x: [0, -35, 0], y: [0, -25, 0], scale: [1, 1.07, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-cyan-300 to-teal-300"
            animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Light-only sparkles (yellow/orange/red) */}
          {stars.map((star) => {
            const palette = ['#facc15', '#fb923c', '#f87171']; // yellow, orange, red
            const color = palette[star.id % 3];
            return (
              <motion.div
                key={`light-sparkle-${star.id}`}
                className="absolute"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  color,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, star.opacity, 0],
                  scale: [0, 1, 0],
                  rotate: star.variant === 'star' ? [0, 180, 360] : 0,
                }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {star.variant === 'star' ? (
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                      style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}
                    />
                  </svg>
                ) : (
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Subtle dotted grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                backgroundSize: '18px 18px',
                backgroundPosition: '0 0',
              }}
            />
          </div>

          {/* Soft vignette for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/40 to-white" />
        </div>
      )}

      {/* Dark theme keeps the original animated background */}
      {theme === 'dark' && (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800/50">
        {/* GitHub Spark-style animated starfield background - vibrant in dark */}
        
        {/* Twinkling stars - subtle in light theme, vibrant in dark theme */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, star.opacity, 0],
              scale: [0, 1, 0],
              rotate: star.variant === 'star' ? [0, 180, 360] : 0,
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {star.variant === 'star' ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  className="fill-primary/60 dark:fill-cyan-400/90"
                  style={{
                    filter: 'drop-shadow(0 0 3px currentColor)',
                  }}
                />
              </svg>
            ) : (
              <div 
                className="w-full h-full rounded-full bg-accent/50 dark:bg-purple-400/90"
                style={{
                  boxShadow: '0 0 3px currentColor',
                }}
              />
            )}
          </motion.div>
        ))}

        {/* Shooting stars - only visible in dark mode */}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute w-1 h-1 hidden dark:block"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 300],
              y: [0, 300],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              <div className="w-1 h-1 rounded-full bg-cyan-300" 
                style={{
                  boxShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)',
                }}
              />
              <motion.div
                className="absolute top-0 left-0 w-20 h-[2px] origin-left bg-gradient-to-r from-cyan-300/80 to-transparent"
                style={{
                  // Move opposite the star's direction (star moves 45deg down-right)
                  // Tail should point up-left, hence -135deg (or 225deg)
                  transform: 'rotate(-135deg)',
                  filter: 'blur(1px)',
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Floating gradient orbs - subtle in light, vibrant in dark */}
        <motion.div
          className="absolute top-20 left-10 w-28 h-28 bg-primary/20 rounded-full blur-3xl dark:w-40 dark:h-40 dark:bg-cyan-500/30 dark:blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-full blur-3xl dark:w-48 dark:h-48 dark:bg-purple-500/30 dark:blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary/15 rounded-full blur-3xl dark:w-44 dark:h-44 dark:bg-blue-500/25 dark:blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-20 h-20 bg-accent/15 rounded-full blur-3xl dark:w-36 dark:h-36 dark:bg-pink-500/25 dark:blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated grid overlay - very subtle in light, visible in dark */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
          <motion.div
            className="w-full h-full text-primary/30 dark:text-cyan-400/50"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Radial gradient overlay for depth - adjusted for dark theme */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/70 to-gray-950" />
        
        {/* Additional dark mode glow overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-conic from-purple-500/5 via-transparent to-blue-500/5" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      </div>
      )}

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
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
                  src={profileImg} 
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
              className="text-5xl sm:text-7xl font-bold text-foreground dark:bg-gradient-to-r dark:from-foreground dark:via-cyan-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent"
              variants={itemVariants}
            >
              {t('hero.greeting')} {t('hero.name')}
            </motion.h1>
            <motion.h2 
              className="text-2xl sm:text-4xl font-semibold min-h-[4rem] flex items-center justify-center text-slate-800 dark:text-primary"
              variants={itemVariants}
            >
              <TypewriterEffect 
                texts={jobTitles} 
                speed={50}
                pauseDuration={1500}
              />
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-muted-foreground"
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
                href="https://www.linkedin.com/in/husni-aditya-5b9065123/"
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
                href={resumePdf}
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