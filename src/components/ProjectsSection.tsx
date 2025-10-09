import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowSquareOut, GithubLogo, Globe } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

// Project images
import chocomaidApp from '@/assets/images/projects/chocomaid_app.webp';
import ciptasejatiApp from '@/assets/images/projects/ciptasejati_app.webp';
import erpApp from '@/assets/images/projects/erp_app.webp';
import maintenanceApp from '@/assets/images/projects/maintenance_app.webp';
import parkingApp from '@/assets/images/projects/parking_app.webp';
import productspecApp from '@/assets/images/projects/productspec_app.webp';
import recruitmentApp from '@/assets/images/projects/recruitment_app.webp';
import shipmentApp from '@/assets/images/projects/shipment_app.webp';
import hrisApp from '@/assets/images/projects/369_hris_app.webp';
import digitalApp from '@/assets/images/projects/digital_app.webp';

interface Project {
  id: string;
  title: string;
  year?: number;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const projects: Project[] = [
    {
      id: '1',
      title: 'Chocomaid AI Discord Bot',
      year: 2025,
      description: t('projects.items.chocomaid.description'),
      image: chocomaidApp,
      technologies: ['React', 'Node.js', 'MySQL', 'MongoDB', 'Discord.js', 'Google API', 'YouTube API', 'Twitch API', 'Clash Of Clans API', 'Valorant API', 'Cloudflare', 'i18n'],
      // fullstack, backend, frontend
      category: t('projects.items.chocomaid.category'),
      liveUrl: 'https://chocomaid.xyz',
      githubUrl: 'https://github.com/husniaditya/dc-ai_bot',
      featured: true
    },
    {
      id: '2',
      title: 'Cipta Sejati Indonesia',
      year: 2024,
      description: t('projects.items.ciptasejati.description'),
      image: ciptasejatiApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.ciptasejati.category'),
      liveUrl: 'https://ciptasejatiindonesia.com',
      githubUrl: 'https://github.com/husniaditya/ciptasejati',
      featured: true
    },
    {
      id: '3',
      title: 'ERP Application',
      year: 2019,
      description: t('projects.items.erp.description'),
      image: erpApp,
      technologies: ['C#', 'MySQL', 'PHP', 'Javascript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.erp.category'),
      featured: false
    },
    {
      id: '4',
      title: 'Digital Library System',
      year: 2018,
      description: t('projects.items.digitalLibrary.description'),
      image: digitalApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.digitalLibrary.category'),
      featured: false
    },
    {
      id: '5',
      title: 'Product Specification System',
      year: 2018,
      description: t('projects.items.productSpec.description'),
      image: productspecApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.productSpec.category'),
      featured: false
    },
    {
      id: '6',
      title: 'Recruitment System',
      year: 2018,
      description: t('projects.items.recruitment.description'),
      image: recruitmentApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.recruitment.category'),
      featured: false
    },
    {
      id: '7',
      title: 'Parking Management System',
      year: 2018,
      description: t('projects.items.parking.description'),
      image: parkingApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.parking.category'),
      featured: false
    },
    {
      id: '8',
      title: 'Shipment Tracking System',
      year: 2018,
      description: t('projects.items.shipment.description'),
      image: shipmentApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.shipment.category'),
      featured: false
    },
    { id: '9',
      title: 'Maintenance Management System',
      year: 2017,
      description: t('projects.items.maintenance.description'),
      image: maintenanceApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.maintenance.category'),
      featured: false
    },
    { id: '10',
      title: 'HRIS Application',
      year: 2017,
      description: t('projects.items.hris.description'),
      image: hrisApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.hris.category'),
      featured: false
    }
  ];

  const categories = [
    { key: 'All', label: t('projects.filters.all') },
    { key: 'Full Stack', label: t('projects.filters.fullStack') },
    { key: 'Frontend', label: t('projects.filters.frontend') },
    { key: 'Backend', label: t('projects.filters.backend') }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -20,
      opacity: 0
    }
  };

  const filterButtonVariants = {
    active: {
      scale: 1.05
    },
    inactive: {
      scale: 1
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('projects.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.key}
              variants={filterButtonVariants}
              animate={activeFilter === category.key ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <Button
                variant={activeFilter === category.key ? 'default' : 'outline'}
                onClick={() => setActiveFilter(category.key)}
                className="transition-all"
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${activeFilter}-${project.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="group project-card overflow-hidden hover-lift h-full glass-card">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Overlay for demo/code links */}
                    <div className="project-overlay">
                      <div className="flex space-x-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                          >
                            <Globe size={24} />
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                          >
                            <GithubLogo size={24} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    {project.featured && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge className="absolute top-4 left-4 bg-accent animate-pulse-glow">
                          ⭐ {t('projects.featured')}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors brand-gradient-text">
                        {project.title}
                      </CardTitle>
                      {project.year && (
                        <Badge variant="outline" className="text-xs font-medium">
                          {project.year}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + techIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="secondary" className="text-xs hover:bg-primary/10 transition-colors">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button size="sm" variant="outline" className="w-full">
                            <Globe size={16} className="mr-2" />
                            {t('projects.liveDemo')}
                          </Button>
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button size="sm" variant="outline" className="w-full">
                            <GithubLogo size={16} className="mr-2" />
                            {t('projects.code')}
                          </Button>
                        </motion.a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;