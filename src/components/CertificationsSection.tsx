import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

// Certificate images
import aiDataScienceCert from '@/assets/images/certificates/ai for data science.webp';
import aiDeveloperCert from '@/assets/images/certificates/ai for developer.webp';
import phpCert from '@/assets/images/certificates/php.webp';
import javascriptCert from '@/assets/images/certificates/javascript.webp';
import sqlCert from '@/assets/images/certificates/sql.webp';
import htmlCert from '@/assets/images/certificates/html.webp';
import cssCert from '@/assets/images/certificates/css.webp';
import jqueryCert from '@/assets/images/certificates/jquery.webp';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  status: 'active' | 'expired';
  image: string;
}

const CertificationsSection = () => {
  const { t } = useTranslation();
  
  const certifications: Certification[] = [
    {
      id: '1',
      title: 'LLM-Based Tools and Gemini API Integration for Data Science',
      issuer: 'Hacktiv8',
      date: '2025',
      status: 'active',
      image: aiDataScienceCert
    },
    {
      id: '2', 
      title: 'LLM-Based Tools and Gemini API Integration for Developers',
      issuer: 'Hacktiv8',
      date: '2025',
      status: 'active',
      image: aiDeveloperCert
    },
    {
      id: '3',
      title: 'PHP Tutorial Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: phpCert
    },
    {
      id: '4',
      title: 'Javascript Tutorial Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: javascriptCert
    },
    {
      id: '5',
      title: 'SQL Fundamentals Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: sqlCert
    },
    {
      id: '6',
      title: 'HTML Tutorial Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: htmlCert
    },
    {
      id: '7',
      title: 'CSS Tutorial Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: cssCert
    },
    {
      id: '8',
      title: 'jQuery Tutorial Course',
      issuer: 'Sololearn',
      date: '2019',
      status: 'active',
      image: jqueryCert
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('certificates.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('certificates.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={cert.status === 'active' ? 'default' : 'secondary'}>
                    {t(`certificates.status.${cert.status}`)}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Trophy size={32} className="text-primary flex-shrink-0" />
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
                      {t('certificates.credentialId')}: {cert.credentialId}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;