import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  experience: string;
  signalToNoise: string;
  architecturalDepth: string;
  metrics: Array<{ label: string; value: string }>;
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
  const [isMobile, setIsMobile] = useState(false);
  const isAnimatingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Initialize intersection observer for section animations (value not used directly)
  useInView(sectionRef, { once: true, amount: 0.2 });

  const projects: Project[] = [
    {
      id: '1',
      title: 'Chocomaid AI Discord Bot',
      year: 2025,
      description: t('projects.items.chocomaid.description'),
      experience: 'Built a production Discord platform from feature design to deployment, balancing community UX, moderation workflows, and third-party API reliability.',
      signalToNoise: 'High signal: every feature ties to daily community retention, discovery, or automation; low-value novelty was intentionally excluded.',
      architecturalDepth: 'Event-driven bot core with modular integrations, API adapters, resilient fallback handling, and Cloudflare edge protection.',
      metrics: [
        { label: 'Active users', value: '500+' },
        { label: 'Uptime', value: '98%' },
        { label: 'Response time', value: '<200ms' },
        { label: 'Engagement', value: '4x growth' }
      ],
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
      experience: 'Led full delivery of a national-grade management platform spanning membership, facility operations, and financial workflows.',
      signalToNoise: 'Focused on operational bottlenecks first: registration, attendance, billing, and reporting pathways with highest leadership impact.',
      architecturalDepth: 'Role-based multi-tenant web architecture with secure admin workflows, transactional data boundaries, and reporting modules.',
      metrics: [
        { label: 'Dojo coverage', value: '63' },
        { label: 'Members', value: '10,000+' },
        { label: 'Admin overhead', value: '-60%' },
        { label: 'Retention lift', value: '+35%' }
      ],
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
      experience: 'Implemented cross-department ERP workflows for manufacturing, aligning inventory, procurement, sales, and accounting operations.',
      signalToNoise: 'Prioritized mission-critical paths where delays and errors were most expensive, especially data entry and management reporting.',
      architecturalDepth: 'Modular enterprise stack with domain-separated modules, shared master data model, and auditable transaction pipelines.',
      metrics: [
        { label: 'Operational efficiency', value: '+50%' },
        { label: 'Data errors', value: '-80%' },
        { label: 'Report turnaround', value: 'days -> minutes' },
        { label: 'Decision latency', value: 'significantly reduced' }
      ],
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
      experience: 'Built a data-center document platform that centralized enterprise records, access flows, and long-term storage governance.',
      signalToNoise: 'Cut non-essential UI complexity and focused on document retrieval speed, consistency, and permission correctness.',
      architecturalDepth: 'Centralized repository architecture with role-based access, indexing strategies, and storage lifecycle controls.',
      metrics: [
        { label: 'Documents indexed', value: '100,000+' },
        { label: 'Retrieval time', value: '-75%' },
        { label: 'Storage redundancy', value: '-60%' },
        { label: 'Audit compliance', value: 'improved org-wide' }
      ],
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
      experience: 'Created a unified specification workflow for product, engineering, and compliance teams with strict version visibility.',
      signalToNoise: 'Emphasized traceability and approval flow over cosmetic tooling to prevent rework and compliance ambiguity.',
      architecturalDepth: 'Structured spec entities, revision history, and approval states with clear ownership boundaries per department.',
      metrics: [
        { label: 'Documentation time', value: '-45%' },
        { label: 'Review cycles', value: 'shortened' },
        { label: 'Product lines', value: '200+' },
        { label: 'Time-to-market', value: 'accelerated' }
      ],
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
      experience: 'Delivered an end-to-end hiring platform from candidate pipeline creation through interview coordination and status tracking.',
      signalToNoise: 'Focused on recruiter throughput and candidate visibility; eliminated manual status chasing and spreadsheet drift.',
      architecturalDepth: 'Workflow-driven applicant lifecycle with stage gates, automated notifications, and scheduler integrations.',
      metrics: [
        { label: 'Hiring cycle', value: '-40%' },
        { label: 'Manual tracking', value: 'eliminated' },
        { label: 'Candidate response', value: 'faster' },
        { label: 'Scheduling friction', value: 'significantly lower' }
      ],
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
      experience: 'Built an operational parking control system covering ingress/egress tracking, payment reconciliation, and slot utilization.',
      signalToNoise: 'Prioritized throughput, payment integrity, and dispute traceability over decorative dashboard complexity.',
      architecturalDepth: 'Transaction-first architecture with event logs, payment state tracking, and operational reconciliation reports.',
      metrics: [
        { label: 'Throughput', value: '+30%' },
        { label: 'Revenue leakage', value: 'near zero' },
        { label: 'Dispute resolution', value: '-85%' },
        { label: 'Payment reliability', value: 'improved' }
      ],
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
      experience: 'Implemented logistics visibility tooling for dispatch teams and customer support with live shipment status updates.',
      signalToNoise: 'Targeted operational uncertainty reduction first: ETA confidence, exception alerts, and traceable status history.',
      architecturalDepth: 'Status-event pipeline design with delivery milestones, anomaly flags, and timeline-based shipment auditability.',
      metrics: [
        { label: 'Daily shipments', value: '100+' },
        { label: 'Inquiry calls', value: '-50%' },
        { label: 'On-time delivery', value: '+25%' },
        { label: 'Exception response', value: 'faster' }
      ],
      image: shipmentApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.shipment.category'),
      featured: false
    },
    { id: '9',
      title: 'Maintenance Management System',
      year: 2017,
      description: t('projects.items.maintenance.description'),
      experience: 'Built maintenance operations software for preventive scheduling, work order execution, and equipment health visibility.',
      signalToNoise: 'Concentrated on downtime prevention and maintenance planning discipline instead of generic ticketing features.',
      architecturalDepth: 'Asset-centric design with preventive intervals, work-order lifecycle states, and maintenance history records.',
      metrics: [
        { label: 'Unplanned downtime', value: '-40%' },
        { label: 'Repair cost', value: 'reduced' },
        { label: 'Asset lifespan', value: '+20%+' },
        { label: 'Schedule adherence', value: 'improved' }
      ],
      image: maintenanceApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.maintenance.category'),
      featured: false
    },
    { id: '10',
      title: 'HRIS Application',
      year: 2017,
      description: t('projects.items.hris.description'),
      experience: 'Delivered HRIS workflows spanning employee records, attendance, payroll inputs, and performance review processes.',
      signalToNoise: 'Focused on data accuracy and repeatable HR operations, minimizing manual consolidation and reconciliation work.',
      architecturalDepth: 'Domain-driven HR modules with permissioned records, payroll-ready data flows, and compliance report generation.',
      metrics: [
        { label: 'Employees supported', value: '300+' },
        { label: 'Payroll processing', value: '-65%' },
        { label: 'Data errors', value: '-90%' },
        { label: 'Compliance accuracy', value: 'improved' }
      ],
      image: hrisApp,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare'],
      category: t('projects.items.hris.category'),
      featured: false
    }
  ];

  const filteredProjects = projects;
  const activeProject = filteredProjects[activeProjectIndex];
  const projectLocaleKeyMap: Record<string, string> = {
    '1': 'chocomaid',
    '2': 'ciptasejati',
    '3': 'erp',
    '4': 'digitalLibrary',
    '5': 'productSpec',
    '6': 'recruitment',
    '7': 'parking',
    '8': 'shipment',
    '9': 'maintenance',
    '10': 'hris',
  };
  const metricKeyMap: Record<string, string> = {
    'Active users': 'activeUsers',
    Uptime: 'uptime',
    'Response time': 'responseTime',
    Engagement: 'engagement',
    'Dojo coverage': 'dojoCoverage',
    Members: 'members',
    'Admin overhead': 'adminOverhead',
    'Retention lift': 'retentionLift',
    'Operational efficiency': 'operationalEfficiency',
    'Data errors': 'dataErrors',
    'Report turnaround': 'reportTurnaround',
    'Decision latency': 'decisionLatency',
    'Documents indexed': 'documentsIndexed',
    'Retrieval time': 'retrievalTime',
    'Storage redundancy': 'storageRedundancy',
    'Audit compliance': 'auditCompliance',
    'Documentation time': 'documentationTime',
    'Review cycles': 'reviewCycles',
    'Product lines': 'productLines',
    'Time-to-market': 'timeToMarket',
    'Hiring cycle': 'hiringCycle',
    'Manual tracking': 'manualTracking',
    'Candidate response': 'candidateResponse',
    'Scheduling friction': 'schedulingFriction',
    Throughput: 'throughput',
    'Revenue leakage': 'revenueLeakage',
    'Dispute resolution': 'disputeResolution',
    'Payment reliability': 'paymentReliability',
    'Daily shipments': 'dailyShipments',
    'Inquiry calls': 'inquiryCalls',
    'On-time delivery': 'onTimeDelivery',
    'Exception response': 'exceptionResponse',
    'Unplanned downtime': 'unplannedDowntime',
    'Repair cost': 'repairCost',
    'Asset lifespan': 'assetLifespan',
    'Schedule adherence': 'scheduleAdherence',
    'Employees supported': 'employeesSupported',
    'Payroll processing': 'payrollProcessing',
    'Compliance accuracy': 'complianceAccuracy',
  };
  const activeProjectLocaleKey = activeProject ? projectLocaleKeyMap[activeProject.id] : undefined;

  const goToNextProject = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 380);
  }, [filteredProjects.length]);

  const goToPrevProject = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveProjectIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1,
    );
    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 380);
  }, [filteredProjects.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMobileState);
      return () => mediaQuery.removeEventListener('change', updateMobileState);
    }

    mediaQuery.addListener(updateMobileState);
    return () => mediaQuery.removeListener(updateMobileState);
  }, []);

  useEffect(() => {
    if (!isMobile || filteredProjects.length <= 1) return;

    const timer = window.setTimeout(() => {
      goToNextProject();
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isMobile, activeProjectIndex, filteredProjects.length, goToNextProject]);

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
              className="hidden lg:block lg:w-[60%] space-y-6 lg:self-start lg:mt-[120px]"
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
                          {activeProject?.title}
                        </CardTitle>
                        {activeProject?.year && (
                          <Badge variant="outline" className="text-sm font-medium">
                            {activeProject?.year}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {activeProject?.description}
                      </p>

                      {/* Category Badge */}
                      <div>
                        <Badge variant="secondary" className="text-sm">
                          {activeProject?.category}
                        </Badge>
                      </div>

                      {/* Project Quality Signals */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                          <h4 className="text-sm font-semibold text-foreground">
                            {t('projects.details.experience', { defaultValue: 'Experience' })}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {activeProjectLocaleKey
                              ? t(`projects.items.${activeProjectLocaleKey}.experience`, {
                                  defaultValue: activeProject?.experience,
                                })
                              : activeProject?.experience}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                          <h4 className="text-sm font-semibold text-foreground">
                            {t('projects.details.signalToNoise', { defaultValue: 'Signal-to-noise' })}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {activeProjectLocaleKey
                              ? t(`projects.items.${activeProjectLocaleKey}.signalToNoise`, {
                                  defaultValue: activeProject?.signalToNoise,
                                })
                              : activeProject?.signalToNoise}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-background/50 p-4 md:col-span-2">
                          <h4 className="text-sm font-semibold text-foreground">
                            {t('projects.details.architecturalDepth', { defaultValue: 'Architectural depth' })}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {activeProjectLocaleKey
                              ? t(`projects.items.${activeProjectLocaleKey}.architecturalDepth`, {
                                  defaultValue: activeProject?.architecturalDepth,
                                })
                              : activeProject?.architecturalDepth}
                          </p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground/80">
                          {t('projects.details.metrics', { defaultValue: 'Metrics' })}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                          {activeProject?.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2"
                            >
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                {activeProjectLocaleKey && metricKeyMap[metric.label]
                                  ? t(`projects.items.${activeProjectLocaleKey}.metrics.${metricKeyMap[metric.label]}.label`, {
                                      defaultValue: metric.label,
                                    })
                                  : metric.label}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {activeProjectLocaleKey && metricKeyMap[metric.label]
                                  ? t(`projects.items.${activeProjectLocaleKey}.metrics.${metricKeyMap[metric.label]}.value`, {
                                      defaultValue: metric.value,
                                    })
                                  : metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground/80">
                          {t('projects.technologies') || 'Technologies'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject?.technologies.map((tech, techIndex) => (
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
                        {activeProject?.liveUrl && (
                          <motion.a
                            href={activeProject?.liveUrl}
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
                        {activeProject?.githubUrl && (
                          <motion.a
                            href={activeProject?.githubUrl}
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
            {!isMobile && (
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
            )}

            {/* Mobile Single-Panel Carousel */}
            {isMobile && (
            <div className="block lg:hidden w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) {
                        goToNextProject();
                      } else if (info.offset.x > 60) {
                        goToPrevProject();
                      }
                    }}
                  >
                    <Card className="overflow-hidden glass-card">
                      <CardHeader className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle className="text-xl brand-gradient-text leading-tight">
                            {activeProject?.title}
                          </CardTitle>
                          {activeProject?.year && (
                            <Badge variant="outline" className="text-xs font-medium">
                              {activeProject.year}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="w-fit text-xs">
                          {activeProject?.category}
                        </Badge>
                      </CardHeader>

                      <CardContent className="space-y-5">
                        <div className="relative overflow-hidden rounded-xl border border-border/60 h-52">
                          <img
                            src={activeProject?.image}
                            alt={activeProject?.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = activeProject ? getFallbackFor(activeProject.image) : undefined;
                              if (fallback && target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                          />
                          {activeProject?.featured && (
                            <Badge className="absolute top-2 right-2 bg-accent animate-pulse-glow text-xs">
                              ⭐
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {activeProject?.description}
                          </p>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              {t('projects.details.experience', { defaultValue: 'Experience' })}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {activeProjectLocaleKey
                                ? t(`projects.items.${activeProjectLocaleKey}.experience`, {
                                    defaultValue: activeProject?.experience,
                                  })
                                : activeProject?.experience}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              {t('projects.details.signalToNoise', { defaultValue: 'Signal-to-noise' })}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {activeProjectLocaleKey
                                ? t(`projects.items.${activeProjectLocaleKey}.signalToNoise`, {
                                    defaultValue: activeProject?.signalToNoise,
                                  })
                                : activeProject?.signalToNoise}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              {t('projects.details.architecturalDepth', { defaultValue: 'Architectural depth' })}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {activeProjectLocaleKey
                                ? t(`projects.items.${activeProjectLocaleKey}.architecturalDepth`, {
                                    defaultValue: activeProject?.architecturalDepth,
                                  })
                                : activeProject?.architecturalDepth}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              {t('projects.details.metrics', { defaultValue: 'Metrics' })}
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {activeProject?.metrics.map((metric) => (
                                <div key={metric.label} className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-2">
                                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                    {activeProjectLocaleKey && metricKeyMap[metric.label]
                                      ? t(`projects.items.${activeProjectLocaleKey}.metrics.${metricKeyMap[metric.label]}.label`, {
                                          defaultValue: metric.label,
                                        })
                                      : metric.label}
                                  </p>
                                  <p className="mt-1 text-xs font-semibold text-foreground">
                                    {activeProjectLocaleKey && metricKeyMap[metric.label]
                                      ? t(`projects.items.${activeProjectLocaleKey}.metrics.${metricKeyMap[metric.label]}.value`, {
                                          defaultValue: metric.value,
                                        })
                                      : metric.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              {t('projects.technologies') || 'Technologies'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {activeProject?.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-[11px] border border-border/60 bg-muted/60 text-foreground/80"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={goToPrevProject}
                          >
                            Prev
                          </Button>

                          <div className="text-xs text-muted-foreground font-medium">
                            {activeProjectIndex + 1} / {filteredProjects.length}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={goToNextProject}
                          >
                            Next
                          </Button>
                        </div>

                        <div className="flex gap-3 pt-1">
                          {activeProject?.liveUrl && (
                            <motion.a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button size="sm" className="w-full">
                                <Globe size={16} className="mr-2" />
                                {t('projects.liveDemo')}
                              </Button>
                            </motion.a>
                          )}
                          {activeProject?.githubUrl && (
                            <motion.a
                              href={activeProject.githubUrl}
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
                </AnimatePresence>
              </motion.div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;