import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GithubLogo, Globe } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { injectJsonLd } from '@/lib/seo';
import { getFallbackFor } from '@/lib/assets';

import DecryptedText from '@/components/ui/decrypted-text';
import BlurText from '@/components/ui/blur-text';
import GradientText from '@/components/ui/gradient-text';
import CardSwap, { Card as SwapCard } from '@/components/ui/card-swap';

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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  // Initialize intersection observer for section animations (value not used directly)
  useInView(sectionRef, { once: true, amount: 0.2 });

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
      year: 2023,
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

  const filteredProjects = projects;

  // Inject JSON-LD once for all projects
  useEffect(() => {
    try {
      const siteUrl = (import.meta as any).env?.VITE_SITE_URL || window.location.href;
      const graph = projects.map((p) => ({
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description,
        url: p.liveUrl ?? siteUrl,
        sameAs: p.githubUrl ? [p.githubUrl] : undefined,
        image: new URL(p.image, window.location.origin).toString(),
        datePublished: p.year ? `${p.year}-01-01` : undefined,
      }));
      injectJsonLd('ld-projects', {
        '@context': 'https://schema.org',
        '@graph': graph,
      });
    } catch {
      // no-op
    }
    // only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>
              <DecryptedText 
                text={t('projects.title')} 
                speed={30}
                sequential={true}
                animateOn="view"
              />
            </GradientText>
          </h2>
          <BlurText 
            text={t('projects.subtitle')}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            delay={50}
            animateBy="words"
          />
        </motion.div>

        {/* Two-Panel Layout */}
        <div className="relative min-h-[600px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Panel - Project Details */}
            <motion.div 
              className="w-full lg:w-[60%] space-y-6 lg:self-start lg:mt-[120px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredProjects[activeProjectIndex]?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-2xl md:text-3xl brand-gradient-text">
                          {filteredProjects[activeProjectIndex]?.title}
                        </CardTitle>
                        {filteredProjects[activeProjectIndex]?.year && (
                          <Badge variant="outline" className="text-sm font-medium">
                            {filteredProjects[activeProjectIndex]?.year}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {filteredProjects[activeProjectIndex]?.description}
                      </p>

                      {/* Category Badge */}
                      <div>
                        <Badge variant="secondary" className="text-sm">
                          {filteredProjects[activeProjectIndex]?.category}
                        </Badge>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground/80">
                          {t('projects.technologies') || 'Technologies'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {filteredProjects[activeProjectIndex]?.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs transition-colors border border-border/60 bg-muted/60 text-foreground/80 hover:bg-primary/10 hover:text-foreground"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        {filteredProjects[activeProjectIndex]?.liveUrl && (
                          <motion.a
                            href={filteredProjects[activeProjectIndex]?.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button size="lg" className="w-full">
                              <Globe size={20} className="mr-2" />
                              {t('projects.liveDemo')}
                            </Button>
                          </motion.a>
                        )}
                        {filteredProjects[activeProjectIndex]?.githubUrl && (
                          <motion.a
                            href={filteredProjects[activeProjectIndex]?.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button size="lg" variant="outline" className="w-full">
                              <GithubLogo size={20} className="mr-2" />
                              {t('projects.code')}
                            </Button>
                          </motion.a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Panel - Card Stack with Auto-Swap (Desktop) */}
            <div className="hidden lg:block lg:w-[40%] relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[600px]"
              >
                <CardSwap
                  width={450}
                  height={300}
                  cardDistance={40}
                  verticalDistance={50}
                  delay={3000}
                  pauseOnHover={true}
                  skewAmount={4}
                  easing="elastic"
                  onCardClick={(idx) => setActiveProjectIndex(idx)}
                  onFrontCardChange={(idx) => setActiveProjectIndex(idx)}
                >
                  {filteredProjects.map((project) => (
                    <SwapCard
                      key={project.id}
                      customClass="cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                    >
                      <div className="w-full h-full relative flex flex-col">
                        {/* Project Title Header */}
                        <div className="bg-gradient-to-r from-primary/90 to-accent/90 px-4 py-2 text-white">
                          <h3 className="text-lg font-bold truncate">{project.title}</h3>
                        </div>
                        {/* Project Image */}
                        <div className="flex-1 relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = getFallbackFor(project.image);
                              if (fallback && target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                          />
                          {project.featured && (
                            <Badge className="absolute top-2 right-2 bg-accent animate-pulse-glow">
                              ⭐
                            </Badge>
                          )}
                          {project.year && (
                            <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                              {project.year}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </motion.div>
            </div>

            {/* Mobile Card Stack */}
            <div className="block lg:hidden w-full mt-[180px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[180px] flex items-center justify-center"
              >
                <CardSwap
                  width={300}
                  height={200}
                  cardDistance={25}
                  verticalDistance={28}
                  delay={3000}
                  pauseOnHover={true}
                  skewAmount={3}
                  easing="elastic"
                  onCardClick={(idx) => setActiveProjectIndex(idx)}
                  onFrontCardChange={(idx) => setActiveProjectIndex(idx)}
                >
                  {filteredProjects.map((project) => (
                    <SwapCard
                      key={project.id}
                      customClass="cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                    >
                      <div className="w-full h-full relative flex flex-col">
                        {/* Project Title Header */}
                        <div className="bg-gradient-to-r from-primary/90 to-accent/90 px-3 py-1.5 text-white">
                          <h3 className="text-sm font-bold truncate">{project.title}</h3>
                        </div>
                        {/* Project Image */}
                        <div className="flex-1 relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = getFallbackFor(project.image);
                              if (fallback && target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                          />
                          {project.featured && (
                            <Badge className="absolute top-1 right-1 bg-accent animate-pulse-glow text-xs">
                              ⭐
                            </Badge>
                          )}
                          {project.year && (
                            <Badge variant="secondary" className="absolute bottom-1 left-1 text-xs">
                              {project.year}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;