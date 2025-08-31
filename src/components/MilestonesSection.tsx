import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Milestone {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'project';
}

const MilestonesSection = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      year: '2023',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Led development of enterprise-scale applications serving 100k+ users.',
      achievements: [
        'Reduced application load time by 40%',
        'Mentored 5 junior developers',
        'Architected microservices infrastructure'
      ],
      type: 'work'
    },
    {
      id: '2',
      year: '2022',
      title: 'AWS Solutions Architect Certification',
      company: 'Amazon Web Services',
      description: 'Achieved professional certification in cloud architecture and best practices.',
      achievements: [
        'Designed scalable cloud solutions',
        'Implemented cost optimization strategies',
        'Led cloud migration projects'
      ],
      type: 'education'
    },
    {
      id: '3',
      year: '2021',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      description: 'Joined early-stage startup, built core platform from ground up.',
      achievements: [
        'Developed MVP that secured $2M funding',
        'Built entire frontend and backend',
        'Established development best practices'
      ],
      type: 'work'
    },
    {
      id: '4',
      year: '2020',
      title: 'Open Source Contributor',
      company: 'Various Projects',
      description: 'Active contributor to popular open source projects and maintainer.',
      achievements: [
        '50+ merged pull requests',
        'Maintained React component library',
        'Contributed to Next.js documentation'
      ],
      type: 'project'
    },
    {
      id: '5',
      year: '2019',
      title: 'Frontend Developer',
      company: 'Digital Agency Co.',
      description: 'First professional role building client websites and web applications.',
      achievements: [
        'Delivered 20+ client projects',
        'Specialized in React and modern CSS',
        'Improved team workflow efficiency'
      ],
      type: 'work'
    },
    {
      id: '6',
      year: '2018',
      title: 'Computer Science Degree',
      company: 'University of Technology',
      description: 'Bachelor of Science in Computer Science with focus on software engineering.',
      achievements: [
        'Graduated Magna Cum Laude',
        'Completed senior capstone project',
        'Dean\'s List for 4 semesters'
      ],
      type: 'education'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-primary';
      case 'education': return 'bg-accent';
      case 'project': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'work': return 'default';
      case 'education': return 'secondary';
      case 'project': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <section id="milestones" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Career Milestones</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key achievements and significant moments throughout my professional journey
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 timeline-line"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start group">
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full ${getTypeColor(milestone.type)} ring-4 ring-background z-10 group-hover:scale-125 transition-transform`}></div>
                
                {/* Content */}
                <div className="ml-16 w-full">
                  <Card className="group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-primary font-medium">{milestone.company}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Badge variant={getTypeBadgeVariant(milestone.type)} className="capitalize">
                            {milestone.type}
                          </Badge>
                          <Badge variant="outline">{milestone.year}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {milestone.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {milestone.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;