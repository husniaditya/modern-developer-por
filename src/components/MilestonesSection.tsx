import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Target, Code, Rocket, Users, ChartLine, Building, Star, Medal, Lightning } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import developerWorkspace from '@/assets/images/developer-workspace.svg';
import seniorDevIllustration from '@/assets/images/senior-dev-illustration.svg';
import techLeadIllustration from '@/assets/images/tech-lead-illustration.svg';
import fullStackIllustration from '@/assets/images/full-stack-illustration.svg';
import frontendDevIllustration from '@/assets/images/frontend-dev-illustration.svg';
// Company logos and images
import wilmarLogo from '@/assets/images/career/wilmar_logo.webp';
import wilmarImage from '@/assets/images/career/wilmar.webp';
import megaMarineLogo from '@/assets/images/career/megamarinpride_logo.webp';
import megaMarineImage from '@/assets/images/career/megamarinepride.webp';
import threeSixNineLogo from '@/assets/images/career/369_logo.webp';
import threeSixNineImage from '@/assets/images/career/369.webp';

// New sample parallax images
import codingWorkspace from '@/assets/images/coding-workspace.svg';
import serverArchitecture from '@/assets/images/server-architecture.svg';
import mobileDevelopment from '@/assets/images/mobile-development.svg';
import teamLeadership from '@/assets/images/team-leadership.svg';

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
  illustration?: string;
}

const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Application Management Specialist',
    company: 'Wilmar International',
    companyLogo: wilmarLogo,
    illustration: wilmarImage,
    duration: 'March 2020 - Present / 5 Years',
    location: 'Multivision Tower, Jakarta Selatan',
    description: 'Provide technical support for software applications, troubleshooting issues, ensuring system stability, and serving as a bridge between end-users and development teams.',
    icon: <Trophy size={24} weight="duotone" />,
    color: 'from-purple-500 to-pink-500',
    projects: [
      {
        name: 'Payroll System',
        description: 'Web-based application for managing overall workflow and processes, integrating various business functions',
        tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
        impact: '40% improvement in data visualization efficiency'
      },
      {
        name: 'Bunching System',
        description: 'Web-based application for managing bunching processes',
        tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
        impact: '70% improvement in bunching efficiency'
      },
      {
        name: 'Field Inspection',
        description: 'Mobile app for on-site inspections and reporting',
        tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
        impact: '50% reduction in inspection time'
      },
      {
        name: 'Patrolling System',
        description: 'Mobile app for patrol management and reporting',
        tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
        impact: '70% reduction in patrol response time'
      },
      {
        name: 'Grading Bunch',
        description: 'Web-based application for managing grading and assessments',
        tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
        impact: '60% reduction in grading time'
      }
    ],
    achievements: [
      {
        text: 'Led team of 25+ sites across global regions',
        icon: <Users size={16} weight="duotone" />,
        highlight: true
      },
      {
        text: 'Implemented monitoring reducing downtime by 30%',
        icon: <ChartLine size={16} weight="duotone" />
      }
    ]
  },
  {
    year: '2017',
    title: 'Software Engineer',
    company: 'PT. Mega Marine Pride',
    companyLogo: megaMarineLogo,
    illustration: megaMarineImage,
    duration: 'Sept 2017 - Feb 2020 / 3 Years',
    location: 'Pasuruan, Jawa Timur',
    description: 'Led a team of 5 developers in delivering multiple high-impact projects using modern web technologies.',
    icon: <Target size={24} weight="duotone" />,
    color: 'from-blue-500 to-cyan-500',
    projects: [
      {
        name: 'ERP IT Inventory System',
        description: 'Web-based application for managing overall workflow and processes, integrating various business functions, including finance, HR, procurement, stock, and customs clearance',
        tech: ['C#', 'PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '50% increase in operational efficiency, reduced errors, and improved reporting capabilities, leading to better decision-making, cost savings, and enhanced productivity'
      },
      {
        name: 'Maintenance Ticket System',
        description: 'Web-based platform for managing maintenance requests',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '30% reduction in response time, improved tracking, and reporting'
      },
      {
        name: 'Shipping Logistics App',
        description: 'Web app for real-time shipment tracking, inventory management',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '20% increase in delivery efficiency, reduced errors, improved customer satisfaction'
      },
      {
        name: 'Parking Management System',
        description: 'Web-based application for managing parking spaces and reservations',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '25% increase in parking space utilization, reduced congestion, improved user experience, enhanced security, and streamlined operations'
      },
      {
        name: 'Recruitment Portal',
        description: 'Web-based platform for job postings and applicant tracking',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '35% reduction in time-to-hire, improved candidate experience, enhanced collaboration between HR and hiring managers'
      },
      {
        name: 'Product Specification System',
        description: 'Web-based application for managing product specifications and compliance',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '35% reduction in time-to-market for new products, improved collaboration between teams'
      },
      {
        name: 'Digital Library System',
        description: 'Web-based application for managing digital assets and resources',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
        impact: '50% increase in resource accessibility, improved user engagement, enhanced content management'
      }
    ],
    achievements: [
      {
        text: 'Delivered 7 major projects on time and under budget',
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
      },
      {
        text: 'Spearheaded adoption of Agile methodologies',
        icon: <Calendar size={16} weight="duotone" />
      },
      { text: 'Improved application performance by 40% through optimization',
        icon: <ChartLine size={16} weight="duotone" />
      }
    ]
  },
  {
    year: '2016',
    title: 'Software Developer',
    company: 'PT. 3.6.9. Group',
    companyLogo: threeSixNineLogo,
    illustration: threeSixNineImage,
    duration: 'Jan 2016 - Sept 2017 / 1.5 Years',
    location: 'Darmo Park II, Surabaya',
    description: 'Contributed to full-stack development of web applications, focusing on frontend performance and user experience.',
    icon: <Code size={24} weight="duotone" />,
    color: 'from-green-500 to-emerald-500',
    projects: [
      {
        name: 'Human Resource Management System',
        description: 'Employee self-service and payroll automation',
        tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Ajax', 'JavaScript'],
        impact: '5K+ registered users in first quarter'
      }
    ],
    achievements: [
      {
        text: 'Mastered programming languages and frameworks',
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
  }
];

const MilestonesSection: React.FC = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 80 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
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
        ease: "easeOut" as const
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
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
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="milestones" className="py-12 sm:py-16 lg:py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-primary rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-accent rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t('milestones.title.career')} <span className="brand-gradient-text">{t('milestones.title.milestones')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            {t('milestones.subtitle')}
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
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 sm:w-1 timeline-line transform md:-translate-x-1/2"></div>



          <div className="space-y-12 sm:space-y-16 lg:space-y-20 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Background illustration behind the milestone */}
                {milestone.illustration && (
                  <motion.div
                    className="absolute inset-0 z-0 overflow-hidden"
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "easeOut",
                      delay: index * 0.1 
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="absolute inset-0">
                      <motion.img
                        src={milestone.illustration}
                        alt={`${milestone.title} background`}
                        className="w-full h-full object-cover opacity-100 dark:opacity-100"
                        style={{
                          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 80%, transparent 100%)'
                        }}
                        animate={{ 
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          duration: 15 + index * 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 2
                        }}
                      />
                      
                      {/* Gradient overlay to ensure text readability */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-5`}></div>
                      <div className="absolute inset-0 bg-background/20 dark:bg-background/40"></div>
                    </div>
                  </motion.div>
                )}


                {/* Content card */}
                <div className={`ml-20 sm:ml-24 lg:ml-32 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-16 md:text-right' : 'md:ml-16'
                } md:w-1/2 relative z-20`}>
                  
                  {/* Company logo floating at card's top corner */}
                  <motion.div
                    className={`absolute z-30 ${
                      index % 2 === 0 
                        ? '-right-8 sm:-right-10' 
                        : '-left-8 sm:-left-10'
                    } -top-8 sm:-top-10`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <motion.div
                        className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full bg-gradient-to-r ${milestone.color} p-1 shadow-lg`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: "easeOut",
                          delay: index * 0.1 
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center p-1.5 sm:p-2">
                          {milestone.companyLogo && (
                            <motion.img
                              src={milestone.companyLogo}
                              alt={`${milestone.company} logo`}
                              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                              variants={logoVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            />
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Year badge at bottom center of logo */}
                      <motion.div
                        className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.2 + 0.3 
                        }}
                        viewport={{ once: true }}
                      >
                        <div className={`bg-gradient-to-r ${milestone.color} text-white text-xs font-bold px-2 py-1 rounded-full shadow-md whitespace-nowrap`}>
                          {milestone.year}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover-lift group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: index * 0.1 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                  >
                    {/* Gradient overlay animation */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    
                    {/* Header section */}
                    <div className="relative z-10">
                      <div className={`flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      } justify-start`}>
                        <motion.div
                          className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${milestone.color} shadow-lg`}
                        >
                          <div className="text-white text-lg sm:text-xl lg:text-2xl">
                            {milestone.icon}
                          </div>
                        </motion.div>
                        
                        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1">{milestone.title}</h3>
                          {milestone.company && (
                            <div className="flex items-center gap-2 text-primary font-semibold mb-1 text-sm sm:text-base">
                              <Building size={14} className="sm:hidden" />
                              <Building size={16} className="hidden sm:block" weight="duotone" />
                              {milestone.company}
                            </div>
                          )}
                          {milestone.duration && (
                            <p className="text-xs sm:text-sm text-muted-foreground">{milestone.duration}</p>
                          )}
                          {milestone.location && (
                            <p className="text-xs text-muted-foreground opacity-75">{milestone.location}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${milestone.color} rounded-full mb-4 sm:mb-6 opacity-50`}></div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">{milestone.description}</p>
                    </div>

                    {/* Projects section */}
                    {milestone.projects && (
                      <div className="mb-6 sm:mb-8">
                        <motion.h4 
                          className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${milestone.color} bg-opacity-10`}>
                            <Code size={16} className="sm:hidden" weight="duotone" />
                            <Code size={20} className="hidden sm:block" weight="duotone" />
                          </div>
                          Key Projects
                        </motion.h4>
                        <div className="grid gap-4 sm:gap-6">
                          {milestone.projects.map((project, projectIndex) => (
                            <motion.div
                              key={project.name}
                              variants={projectVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: projectIndex * 0.15 }}
                              className="project-card bg-background/70 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden group/project"
                            >
                              {/* Project gradient overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover/project:opacity-5 transition-opacity duration-300`}></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                  <h5 className="font-bold text-base sm:text-lg text-foreground">{project.name}</h5>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Rocket size={18} className="sm:hidden text-primary flex-shrink-0" />
                                    <Rocket size={20} className="hidden sm:block text-primary flex-shrink-0" />
                                  </motion.div>
                                </div>
                                <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                  {project.tech.map((tech, techIndex) => (
                                    <motion.span
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: techIndex * 0.05 }}
                                      viewport={{ once: true }}
                                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/15 text-primary text-xs sm:text-sm rounded-md sm:rounded-lg font-medium hover:bg-primary/25 transition-colors"
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-accent font-semibold">
                                  <ChartLine size={14} className="sm:hidden" weight="duotone" />
                                  <ChartLine size={16} className="hidden sm:block" weight="duotone" />
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
                          className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${milestone.color} bg-opacity-10`}>
                            <Medal size={16} className="sm:hidden" weight="duotone" />
                            <Medal size={20} className="hidden sm:block" weight="duotone" />
                          </div>
                          Key Achievements
                        </motion.h4>
                        <div className="grid gap-2 sm:gap-3">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              variants={achievementVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                                achievement.highlight 
                                  ? `bg-gradient-to-r ${milestone.color} bg-opacity-10 border border-primary/20 shadow-md` 
                                  : 'bg-background/50 hover:bg-background/70'
                              }`}
                            >
                              <motion.div
                                className={`p-1.5 sm:p-2 rounded-lg ${
                                  achievement.highlight 
                                    ? `bg-gradient-to-r ${milestone.color} text-white shadow-md` 
                                    : 'bg-muted text-muted-foreground'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="text-sm sm:text-base">
                                  {achievement.icon}
                                </div>
                              </motion.div>
                              <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${
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
                                  <Star size={14} className="sm:hidden" weight="fill" />
                                  <Star size={16} className="hidden sm:block" weight="fill" />
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
                <div className="md:hidden absolute left-0 w-16 sm:w-20 text-center">
                  <motion.span 
                    className="text-xs sm:text-sm font-bold text-primary bg-background px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-md border border-border"
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