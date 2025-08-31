import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from '@phosphor-icons/react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  status: 'active' | 'expired';
}

const CertificationsSection = () => {
  const certifications: Certification[] = [
    {
      id: '1',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CSA-2023-001',
      status: 'active'
    },
    {
      id: '2', 
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-PD-2023-002',
      status: 'active'
    },
    {
      id: '3',
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022',
      credentialId: 'META-REACT-2022-003',
      status: 'active'
    },
    {
      id: '4',
      title: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
      credentialId: 'CKA-2022-004',
      status: 'active'
    },
    {
      id: '5',
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2021',
      credentialId: 'MONGO-DEV-2021-005',
      status: 'active'
    },
    {
      id: '6',
      title: 'Scrum Master Certified',
      issuer: 'Scrum Alliance',
      date: '2021',
      credentialId: 'CSM-2021-006',
      status: 'active'
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Award size={32} className="text-primary flex-shrink-0" />
                  <Badge variant={cert.status === 'active' ? 'default' : 'secondary'}>
                    {cert.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{cert.issuer}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <p className="text-sm text-muted-foreground">
                      ID: {cert.credentialId}
                    </p>
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

export default CertificationsSection;