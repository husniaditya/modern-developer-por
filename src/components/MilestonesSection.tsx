import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Trophy, Target, Code, Rocket, Users, ChartLine } from '@phosphor-icons/react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  impact: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  projects?: Project[];
  achievements?: string[];
}

const milestones: Milestone[] = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
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
      'Led team of 8 developers across 3 projects',
      'Mentored 4 junior developers',
      'Implemented CI/CD pipeline reducing bugs by 45%'
    ]
  },
  {
    year: '2023',
    title: 'Tech Lead Position',
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
      'Delivered 5 major projects on time',
      'Established coding standards and best practices',
      'Reduced technical debt by 35%'
    ]
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    description: 'Transitioned to full-stack development, mastering both frontend and backend technologies.',
    icon: <Award size={24} weight="duotone" />,
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
      'Mastered 6 new programming languages',
      'Implemented automated testing (95% coverage)',
      'Optimized database queries (50% faster response)'
    ]
  },
  {
    year: '2021',
    title: 'Started Career',
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
      'Completed 15+ frontend projects',
      'Learned modern development tools',
      'Built first production application'
    ]
  }
];

const MilestonesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full transform md:-translate-x-1/2 z-10 mt-6"></div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'
                } md:w-1/2`}>
                  <motion.div
                    className="glass-card p-6 rounded-xl hover-lift group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${milestone.color} mb-4 group-hover:animate-pulse-glow`}>
                      {milestone.icon}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                      <div className={`h-1 flex-1 bg-gradient-to-r ${milestone.color} rounded-full`}></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{milestone.description}</p>

                    {/* Projects */}
                    {milestone.projects && (
                      <div className="mb-6">
                        <h4 className="flex items-center gap-2 text-lg font-semibold mb-4 text-foreground">
                          <Code size={20} weight="duotone" />
                          Key Projects
                        </h4>
                        <div className="space-y-4">
                          {milestone.projects.map((project, projectIndex) => (
                            <motion.div
                              key={project.name}
                              variants={projectVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: projectIndex * 0.1 }}
                              className="bg-background/50 rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-semibold text-foreground">{project.name}</h5>
                                <Rocket size={16} className="text-primary mt-1 flex-shrink-0" />
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {project.tech.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-accent font-medium">
                                <ChartLine size={14} weight="duotone" />
                                {project.impact}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {milestone.achievements && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold mb-3 text-foreground">
                          <Users size={20} weight="duotone" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              variants={projectVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Year indicator for mobile */}
                <div className="md:hidden absolute left-0 w-16 text-center">
                  <span className="text-sm font-semibold text-primary bg-background px-2 py-1 rounded-full">
                    {milestone.year}
                  </span>
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