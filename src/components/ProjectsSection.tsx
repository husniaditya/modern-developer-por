import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GithubLogo, Globe } from '@phosphor-icons/react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'Full Stack',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team collaboration features.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
      category: 'Frontend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking application with interactive maps and detailed forecasts.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Chart.js', 'OpenWeather API'],
      category: 'Frontend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      id: '4',
      title: 'API Gateway Service',
      description: 'Microservices API gateway with authentication, rate limiting, and monitoring.',
      image: '/api/placeholder/400/300',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
      category: 'Backend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      id: '5',
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and transaction history.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Plaid API'],
      category: 'Mobile',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '6',
      title: 'DevOps Pipeline',
      description: 'Automated CI/CD pipeline with testing, deployment, and monitoring for microservices.',
      image: '/api/placeholder/400/300',
      technologies: ['Jenkins', 'Docker', 'Kubernetes', 'AWS'],
      category: 'DevOps',
      githubUrl: 'https://github.com',
      featured: false
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and contributions to various projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Globe size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <GithubLogo size={16} className="mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;