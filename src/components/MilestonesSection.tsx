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



const MilestonesSection: React.FC = () => {
  const { t } = useTranslation();
  
  const milestones: Milestone[] = [
    {
      year: '2020',
      title: 'Application Management Specialist',
      company: 'Wilmar International Limited',
      companyLogo: wilmarLogo,
      illustration: wilmarImage,
      duration: t('milestones.items.wilmar.duration'),
      location: t('milestones.items.wilmar.location'),
      description: t('milestones.items.wilmar.description'),
      icon: <Trophy size={24} weight="duotone" />,
      color: 'from-purple-500 to-pink-500',
      projects: [
        {
          name: 'Payroll Management System',
          description: t('milestones.items.wilmar.projects.payroll.description'),
          tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
          impact: t('milestones.items.wilmar.projects.payroll.impact')
        },
        {
          name: 'Bunching Management System',
          description: t('milestones.items.wilmar.projects.bunching.description'),
          tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
          impact: t('milestones.items.wilmar.projects.bunching.impact')
        },
        {
          name: 'Field Inspection Mobile App',
          description: t('milestones.items.wilmar.projects.fieldInspection.description'),
          tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
          impact: t('milestones.items.wilmar.projects.fieldInspection.impact')
        },
        {
          name: 'Patrolling Management System',
          description: t('milestones.items.wilmar.projects.patrolling.description'),
          tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
          impact: t('milestones.items.wilmar.projects.patrolling.impact')
        },
        {
          name: 'Grading Bunch System',
          description: t('milestones.items.wilmar.projects.gradingBunch.description'),
          tech: ['SQL Server', 'Postman', 'Terraform', 'Jira', 'Slack', 'Azure Blob Storage', 'Graylog', 'Sentry'],
          impact: t('milestones.items.wilmar.projects.gradingBunch.impact')
        }
      ],
      achievements: [
        {
          text: t('milestones.items.wilmar.achievements.teamLead'),
          icon: <Users size={16} weight="duotone" />,
          highlight: true
        },
        {
          text: t('milestones.items.wilmar.achievements.monitoring'),
          icon: <ChartLine size={16} weight="duotone" />
        }
      ]
    },
    {
      year: '2017',
      title: 'Software Developer',
      company: 'PT. Mega Marine Pride',
      companyLogo: megaMarineLogo,
      illustration: megaMarineImage,
      duration: t('milestones.items.megaMarine.duration'),
      location: t('milestones.items.megaMarine.location'),
      description: t('milestones.items.megaMarine.description'),
      icon: <Target size={24} weight="duotone" />,
      color: 'from-blue-500 to-cyan-500',
      projects: [
        {
          name: 'Enterprise Resource Planning (ERP) Application',
          description: t('milestones.items.megaMarine.projects.erp.description'),
          tech: ['C#', 'PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.erp.impact')
        },
        {
          name: 'Maintenance Management System',
          description: t('milestones.items.megaMarine.projects.maintenance.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.maintenance.impact')
        },
        {
          name: 'Shipment Tracking System',
          description: t('milestones.items.megaMarine.projects.shipping.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.shipping.impact')
        },
        {
          name: 'Parking Management System',
          description: t('milestones.items.megaMarine.projects.parking.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.parking.impact')
        },
        {
          name: 'Recruitment System',
          description: t('milestones.items.megaMarine.projects.recruitment.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.recruitment.impact')
        },
        {
          name: 'Product Specification System',
          description: t('milestones.items.megaMarine.projects.productSpec.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.productSpec.impact')
        },
        {
          name: 'Digital Library System',
          description: t('milestones.items.megaMarine.projects.digitalLibrary.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Cloudflare', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.megaMarine.projects.digitalLibrary.impact')
        }
      ],
      achievements: [
        {
          text: t('milestones.items.megaMarine.achievements.delivered'),
          icon: <Trophy size={16} weight="duotone" />,
          highlight: true
        },
        {
          text: t('milestones.items.megaMarine.achievements.standards'),
          icon: <Code size={16} weight="duotone" />
        },
        {
          text: t('milestones.items.megaMarine.achievements.technicalDebt'),
          icon: <Lightning size={16} weight="duotone" />
        },
        {
          text: t('milestones.items.megaMarine.achievements.innovation'),
          icon: <Medal size={16} weight="duotone" />,
          highlight: true
        },
        {
          text: t('milestones.items.megaMarine.achievements.agile'),
          icon: <Calendar size={16} weight="duotone" />
        },
        {
          text: t('milestones.items.megaMarine.achievements.performance'),
          icon: <ChartLine size={16} weight="duotone" />
        }
      ]
    },
    {
      year: '2016',
      title: 'Junior Software Developer',
      company: 'PT. 3.6.9. Group',
      companyLogo: threeSixNineLogo,
      illustration: threeSixNineImage,
      duration: t('milestones.items.threeSixNine.duration'),
      location: t('milestones.items.threeSixNine.location'),
      description: t('milestones.items.threeSixNine.description'),
      icon: <Code size={24} weight="duotone" />,
      color: 'from-green-500 to-emerald-500',
      projects: [
        {
          name: 'HRIS Application',
          description: t('milestones.items.threeSixNine.projects.hris.description'),
          tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js', 'Ajax', 'JavaScript'],
          impact: t('milestones.items.threeSixNine.projects.hris.impact')
        }
      ],
      achievements: [
        {
          text: t('milestones.items.threeSixNine.achievements.mastered'),
          icon: <Star size={16} weight="duotone" />,
          highlight: true
        },
        {
          text: t('milestones.items.threeSixNine.achievements.testing'),
          icon: <Lightning size={16} weight="duotone" />
        },
        {
          text: t('milestones.items.threeSixNine.achievements.database'),
          icon: <ChartLine size={16} weight="duotone" />
        },
        {
          text: t('milestones.items.threeSixNine.achievements.recognition'),
          icon: <Medal size={16} weight="duotone" />,
          highlight: true
        }
      ]
    }
  ];
  
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
                          {t('milestones.keyProjects')}
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
                          {t('milestones.keyAchievements')}
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