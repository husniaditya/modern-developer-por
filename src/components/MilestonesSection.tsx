import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Target, Code, Rocket, Users, ChartLine, Building, Star, Medal, Lightning } from '@phosphor-icons/react';
import developerWorkspace from '@/assets/images/developer-workspace.svg';
import companyLogo1 from '@/assets/images/company-logo-1.svg';
import companyLogo2 from '@/assets/images/company-logo-2.svg';
import companyLogo3 from '@/assets/images/company-logo-3.svg';
import companyLogo4 from '@/assets/images/company-logo-4.svg';

interface Project {
  name: string;
  description: string;
  tech: string[];
  impact: string;
}

interface Achievement {
  text: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface Milestone {
  year: string;
  title: string;
  company?: string;
  companyLogo?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  projects?: Project[];
  achievements?: Achievement[];
  duration?: string;
  location?: string;
}

const milestones: Milestone[] = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    companyLogo: companyLogo1,
    duration: 'Jan 2024 - Present',
    location: 'San Francisco, CA',
    description: 'Promoted to senior role, leading development of enterprise applications and mentoring junior developers.',
    icon: <Trophy size={24} weight="duotone" />,
    color: 'from-purple-500 to-pink-500',
    projects: [
      {
        name: 'Enterprise Dashboard',
        description: 'Real-time analytics platform for enterprise clients',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        impact: '40% improvement in data visualization efficiency'
      },
      {
        name: 'Microservices Architecture',
        description: 'Migrated monolithic application to microservices',
        tech: ['Docker', 'Kubernetes', 'Redis', 'GraphQL'],
        impact: '60% reduction in deployment time'
      },
      {
        name: 'AI-Powered Chatbot',
        description: 'Customer service automation with natural language processing',
        tech: ['Python', 'TensorFlow', 'FastAPI', 'MongoDB'],
        impact: '70% reduction in customer support tickets'
      }
    ],
    achievements: [
      {
        text: 'Led team of 8 developers across 3 major projects',
        icon: <Users size={16} weight="duotone" />,
        highlight: true
      },
      {
        text: 'Mentored 4 junior developers to promotion',
        icon: <Star size={16} weight="duotone" />
      },
      {
        text: 'Implemented CI/CD pipeline reducing bugs by 45%',
        icon: <Lightning size={16} weight="duotone" />
      },
      {
        text: 'Achieved 99.9% uptime across all production systems',
        icon: <Medal size={16} weight="duotone" />,
        highlight: true
      }
    ]
  },
  {
    year: '2023',
    title: 'Tech Lead',
    company: 'InnovateHub Inc.',
    companyLogo: companyLogo2,
    duration: 'Mar 2023 - Dec 2023',
    location: 'Austin, TX',
    description: 'Led a team of 5 developers in delivering multiple high-impact projects using modern web technologies.',
    icon: <Target size={24} weight="duotone" />,
    color: 'from-blue-500 to-cyan-500',
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Complete redesign of online shopping experience',
        tech: ['Next.js', 'Tailwind', 'Stripe', 'Prisma'],
        impact: '120% increase in conversion rates'
      },
      {
        name: 'Mobile Banking App',
        description: 'Cross-platform financial services application',
        tech: ['React Native', 'Redux', 'Firebase', 'Biometrics'],
        impact: '500K+ active users within 6 months'
      },
      {
        name: 'Data Visualization Tool',
        description: 'Interactive charts and reporting dashboard',
        tech: ['D3.js', 'WebGL', 'Express', 'InfluxDB'],
        impact: 'Processed 10M+ data points in real-time'
      }
    ],
    achievements: [
      {
        text: 'Delivered 5 major projects on time and under budget',
        icon: <Trophy size={16} weight="duotone" />,
        highlight: true
      },
      {
        text: 'Established coding standards and best practices',
        icon: <Code size={16} weight="duotone" />
      },
      {
        text: 'Reduced technical debt by 35% through refactoring',
        icon: <Lightning size={16} weight="duotone" />
      },
      {
        text: 'Won "Innovation Award" for breakthrough solutions',
        icon: <Medal size={16} weight="duotone" />,
        highlight: true
      }
    ]
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    company: 'WebSolutions Pro',
    companyLogo: companyLogo3,
    duration: 'Jun 2022 - Feb 2023',
    location: 'Seattle, WA',
    description: 'Transitioned to full-stack development, mastering both frontend and backend technologies.',
    icon: <Code size={24} weight="duotone" />,
    color: 'from-green-500 to-emerald-500',
    projects: [
      {
        name: 'Social Media Platform',
        description: 'Community-driven content sharing application',
        tech: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
        impact: '50K+ registered users in first quarter'
      },
      {
        name: 'Inventory Management System',
        description: 'Real-time stock tracking for retail chains',
        tech: ['Angular', 'Spring Boot', 'Apache Kafka', 'ElasticSearch'],
        impact: '30% reduction in inventory discrepancies'
      },
      {
        name: 'Learning Management System',
        description: 'Online education platform with video streaming',
        tech: ['React', 'Django', 'FFmpeg', 'CDN'],
        impact: '10K+ students enrolled across 50+ courses'
      }
    ],
    achievements: [
      {
        text: 'Mastered 6 new programming languages and frameworks',
        icon: <Star size={16} weight="duotone" />,
        highlight: true
      },
      {
        text: 'Implemented automated testing achieving 95% coverage',
        icon: <Lightning size={16} weight="duotone" />
      },
      {
        text: 'Optimized database queries for 50% faster response',
        icon: <ChartLine size={16} weight="duotone" />
      },
      {
        text: 'Received "Developer of the Year" recognition',
        icon: <Medal size={16} weight="duotone" />,
        highlight: true
      }
    ]
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    company: 'StartupVenture',
    companyLogo: companyLogo4,
    duration: 'Aug 2021 - May 2022',
    location: 'Boston, MA',
    description: 'Began my journey as a Frontend Developer, focusing on React and modern JavaScript frameworks.',
    icon: <Calendar size={24} weight="duotone" />,
    color: 'from-orange-500 to-red-500',
    projects: [
      {
        name: 'Corporate Website',
        description: 'Responsive company website with CMS integration',
        tech: ['React', 'SCSS', 'Strapi', 'Netlify'],
        impact: '200% increase in organic traffic'
      },
      {
        name: 'Task Management App',
        description: 'Collaborative project management tool',
        tech: ['JavaScript', 'Express.js', 'Socket.io', 'MongoDB'],
        impact: 'Adopted by 20+ teams internally'
      },
      {
        name: 'Portfolio Showcase',
        description: 'Interactive portfolio for creative professionals',
        tech: ['HTML5', 'CSS3', 'GSAP', 'Three.js'],
        impact: 'Featured in 5+ design galleries'
      }
    ],
    achievements: [
      {
        text: 'Completed 15+ frontend projects successfully',
        icon: <Trophy size={16} weight="duotone" />,
        highlight: true
      },
      {
        text: 'Learned modern development tools and workflows',
        icon: <Star size={16} weight="duotone" />
      },
      {
        text: 'Built first production application from scratch',
        icon: <Rocket size={16} weight="duotone" />
      },
      {
        text: 'Earned "Rising Star" award in first 6 months',
        icon: <Medal size={16} weight="duotone" />,
        highlight: true
      }
    ]
  }
];

const MilestonesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
        delay: 0.2
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <section id="milestones" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-accent rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Career <span className="brand-gradient-text">Milestones</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Key achievements, projects, and pivotal moments that have shaped my professional journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 timeline-line transform md:-translate-x-1/2"></div>

          {/* Floating Developer Workspace Image - Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.5 
            }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-20 right-10 xl:right-20 w-80 h-52 z-0"
          >
            <div className="relative w-full h-full">
              <motion.img
                src={developerWorkspace}
                alt="Developer workspace illustration"
                className="w-full h-full object-contain opacity-20 dark:opacity-10"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              {/* Floating particles around the image */}
              <motion.div
                className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full opacity-60"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: 0 
                }}
              />
              <motion.div
                className="absolute top-16 right-8 w-1.5 h-1.5 bg-accent rounded-full opacity-50"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: 1 
                }}
              />
              <motion.div
                className="absolute bottom-8 left-12 w-1 h-1 bg-primary rounded-full opacity-40"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  delay: 2 
                }}
              />
            </div>
          </motion.div>

          {/* Floating Code Elements - Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.8 
            }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-80 left-10 xl:left-20 w-60 h-40 z-0"
          >
            <div className="relative w-full h-full opacity-10 dark:opacity-5">
              {/* Code blocks */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                animate={{ 
                  scaleX: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: 0 
                }}
              />
              <motion.div
                className="absolute top-6 left-4 w-24 h-3 bg-gradient-to-r from-accent to-primary rounded-full"
                animate={{ 
                  scaleX: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  delay: 1 
                }}
              />
              <motion.div
                className="absolute top-12 left-0 w-28 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                animate={{ 
                  scaleX: [1, 1.15, 1],
                  opacity: [0.25, 0.55, 0.25]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  delay: 2 
                }}
              />
              
              {/* Floating symbols */}
              <motion.div
                className="absolute top-20 left-8 text-4xl font-mono text-primary"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: 0.5 
                }}
              >
                {"</>"}
              </motion.div>
              <motion.div
                className="absolute top-28 left-16 text-3xl font-mono text-accent"
                animate={{ 
                  y: [0, -6, 0],
                  opacity: [0.15, 0.35, 0.15]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: 1.5 
                }}
              >
                {"{}"}
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-20 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Enhanced Timeline dot with company logo */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20 mt-6">
                  <motion.div
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Outer ring with gradient */}
                    <motion.div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${milestone.color} p-1 shadow-lg`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.4, 0.0, 0.2, 1],
                        delay: index * 0.2 
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Company logo container */}
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center p-2 relative overflow-hidden">
                        {milestone.companyLogo && (
                          <motion.img
                            src={milestone.companyLogo}
                            alt={`${milestone.company} logo`}
                            className="w-10 h-10 object-contain"
                            variants={logoVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          />
                        )}
                        
                        {/* Animated pulse effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} opacity-20`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Year badge */}
                    <motion.div
                      className={`absolute -bottom-2 bg-gradient-to-r ${milestone.color} text-white text-xs font-bold px-2 py-1 rounded-full shadow-md`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + 0.3 
                      }}
                      viewport={{ once: true }}
                    >
                      {milestone.year}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-32 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12 md:text-right' : 'md:ml-12'
                } md:w-1/2`}>
                  <motion.div
                    className="glass-card p-8 rounded-2xl hover-lift group relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      y: -8
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                  >
                    {/* Gradient overlay animation */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    
                    {/* Header section */}
                    <div className="relative z-10">
                      <div className={`flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      } justify-start`}>
                        <motion.div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${milestone.color} shadow-lg group-hover:animate-pulse-glow`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="text-white">
                            {milestone.icon}
                          </div>
                        </motion.div>
                        
                        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{milestone.title}</h3>
                          {milestone.company && (
                            <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                              <Building size={16} weight="duotone" />
                              {milestone.company}
                            </div>
                          )}
                          {milestone.duration && (
                            <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                          )}
                          {milestone.location && (
                            <p className="text-xs text-muted-foreground opacity-75">{milestone.location}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`h-1 bg-gradient-to-r ${milestone.color} rounded-full mb-6 opacity-50`}></div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{milestone.description}</p>
                    </div>

                    {/* Projects section */}
                    {milestone.projects && (
                      <div className="mb-8">
                        <motion.h4 
                          className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${milestone.color} bg-opacity-10`}>
                            <Code size={20} weight="duotone" className="text-primary" />
                          </div>
                          Key Projects
                        </motion.h4>
                        <div className="grid gap-6">
                          {milestone.projects.map((project, projectIndex) => (
                            <motion.div
                              key={project.name}
                              variants={projectVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: projectIndex * 0.15 }}
                              className="project-card bg-background/70 rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden group/project"
                            >
                              {/* Project gradient overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover/project:opacity-5 transition-opacity duration-300`}></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                  <h5 className="font-bold text-lg text-foreground">{project.name}</h5>
                                  <motion.div
                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Rocket size={20} className="text-primary flex-shrink-0" />
                                  </motion.div>
                                </div>
                                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tech.map((tech, techIndex) => (
                                    <motion.span
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: techIndex * 0.05 }}
                                      viewport={{ once: true }}
                                      className="px-3 py-1.5 bg-primary/15 text-primary text-sm rounded-lg font-medium hover:bg-primary/25 transition-colors"
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                                  <ChartLine size={16} weight="duotone" />
                                  {project.impact}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Achievements section */}
                    {milestone.achievements && (
                      <div>
                        <motion.h4 
                          className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${milestone.color} bg-opacity-10`}>
                            <Medal size={20} weight="duotone" className="text-accent" />
                          </div>
                          Key Achievements
                        </motion.h4>
                        <div className="grid gap-3">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              variants={achievementVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                                achievement.highlight 
                                  ? `bg-gradient-to-r ${milestone.color} bg-opacity-10 border border-primary/20 shadow-md` 
                                  : 'bg-background/50 hover:bg-background/70'
                              }`}
                            >
                              <motion.div
                                className={`p-2 rounded-lg ${
                                  achievement.highlight 
                                    ? `bg-gradient-to-r ${milestone.color} text-white shadow-md` 
                                    : 'bg-muted text-muted-foreground'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {achievement.icon}
                              </motion.div>
                              <p className={`text-sm leading-relaxed flex-1 ${
                                achievement.highlight 
                                  ? 'text-foreground font-semibold' 
                                  : 'text-muted-foreground'
                              }`}>
                                {achievement.text}
                              </p>
                              {achievement.highlight && (
                                <motion.div
                                  className="text-accent"
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                >
                                  <Star size={16} weight="fill" />
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Mobile year indicator */}
                <div className="md:hidden absolute left-0 w-24 text-center">
                  <motion.span 
                    className="text-sm font-bold text-primary bg-background px-3 py-2 rounded-full shadow-md border border-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {milestone.year}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MilestonesSection;