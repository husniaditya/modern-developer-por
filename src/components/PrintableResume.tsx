import React from 'react';
import { Envelope, Phone, MapPin, Globe, GithubLogo, LinkedinLogo, WhatsappLogo, InstagramLogo } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import profileImg from '@/assets/images/profile/profile.webp';

// Import project images
import chocomaidImg from '@/assets/images/projects/chocomaid_app.webp';
import ciptasejatiImg from '@/assets/images/projects/ciptasejati_app.webp';
import erpImg from '@/assets/images/projects/erp_app.webp';
import digitalImg from '@/assets/images/projects/digital_app.webp';
import productspecImg from '@/assets/images/projects/productspec_app.webp';
import recruitmentImg from '@/assets/images/projects/recruitment_app.webp';
import parkingImg from '@/assets/images/projects/parking_app.webp';
import shipmentImg from '@/assets/images/projects/shipment_app.webp';
import maintenanceImg from '@/assets/images/projects/maintenance_app.webp';
import hrisImg from '@/assets/images/projects/369_hris_app.webp';

// Import certification images
import aiDataScienceImg from '@/assets/images/certificates/ai for data science.webp';
import aiDeveloperImg from '@/assets/images/certificates/ai for developer.webp';
import phpImg from '@/assets/images/certificates/php.webp';
import javascriptImg from '@/assets/images/certificates/javascript.webp';
import sqlImg from '@/assets/images/certificates/sql.webp';
import htmlImg from '@/assets/images/certificates/html.webp';
import cssImg from '@/assets/images/certificates/css.webp';
import jqueryImg from '@/assets/images/certificates/jquery.webp';

interface PrintableResumeProps {
  skills: Array<{ name: string; level: number; category: string }>;
  projects: Array<{ title: string; year: number; descriptionKey: string; technologies: string[] }>;
  certifications: Array<{ title: string; issuer: string; date: string }>;
  milestones: Array<{ year: string; title: string; company?: string; duration?: string; descriptionKey: string }>;
  education: Array<{ year: string; title: string; School: string; Location: string; RemarkKey?: string }>;
  languages: Array<{ language: string; proficiencyKey: string }>;
  contacts: Array<{ type: string; value: string }>;
}

const PrintableResume: React.FC<PrintableResumeProps> = ({ skills, projects, certifications, milestones, education, languages, contacts }) => {
  const { t } = useTranslation();
  
  // Helper function to get project image
  const getProjectImage = (title: string) => {
    const imageMap: Record<string, string> = {
      'Chocomaid AI Discord Bot': chocomaidImg,
      'Cipta Sejati Indonesia': ciptasejatiImg,
      'ERP Application': erpImg,
      'Digital Library System': digitalImg,
      'Product Specification System': productspecImg,
      'Recruitment System': recruitmentImg,
      'Parking Management System': parkingImg,
      'Shipment Tracking System': shipmentImg,
      'Maintenance Management System': maintenanceImg,
      'HRIS Application': hrisImg
    };
    return imageMap[title] || '';
  };
  
  // Helper function to get certification image
  const getCertificationImage = (title: string) => {
    const imageMap: Record<string, string> = {
      'LLM-Based Tools and Gemini API Integration for Data Science': aiDataScienceImg,
      'LLM-Based Tools and Gemini API Integration for Developers': aiDeveloperImg,
      'PHP Tutorial Course': phpImg,
      'Javascript Tutorial Course': javascriptImg,
      'SQL Fundamentals Course': sqlImg,
      'HTML Tutorial Course': htmlImg,
      'CSS Tutorial Course': cssImg,
      'jQuery Tutorial Course': jqueryImg
    };
    return imageMap[title] || '';
  };
  
  // Helper function to get icon based on contact type
  const getContactIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
        return <Envelope size={12} weight="fill" />;
      case 'phone':
        return <Phone size={12} weight="fill" />;
      case 'whatsapp':
        return <WhatsappLogo size={12} weight="fill" />;
      case 'instagram':
        return <InstagramLogo size={12} weight="fill" />;
      case 'linkedin':
        return <LinkedinLogo size={12} weight="fill" />;
      case 'github':
        return <GithubLogo size={12} weight="fill" />;
      case 'website':
      case 'wakatime':
        return <Globe size={12} weight="fill" />;
      default:
        return <MapPin size={12} weight="fill" />;
    }
  };
  
  // Helper function to format contact value for display
  const formatContactValue = (type: string, value: string) => {
    if (type.toLowerCase() === 'email' || type.toLowerCase() === 'phone' || type.toLowerCase() === 'whatsapp') {
      return value;
    }
    // Remove https:// and www. from URLs for cleaner display
    return value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };
  
  // Separate primary contacts (email, phone, whatsapp) from social media
  const primaryContacts = contacts.filter(c => 
    ['email', 'phone', 'whatsapp'].includes(c.type.toLowerCase())
  );
  
  const socialContacts = contacts.filter(c => 
    !['email', 'phone', 'whatsapp'].includes(c.type.toLowerCase())
  );
  
  return (
    <div className="printable-resume hidden print:block">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          #root > div > *:not(.printable-resume) {
            display: none !important;
          }
          
          .printable-resume {
            display: block !important;
            position: static !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white;
            color: #1f2937;
            font-size: 10pt;
            line-height: 1.5;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          }
          
          .print-no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .print-page-break {
            page-break-before: always;
            break-before: page;
          }
          
          /* Header Styles with Gradient Effect */
          .header-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 16pt;
            margin: -8pt -8pt 12pt -8pt;
            border-radius: 0 0 8pt 8pt;
            color: white;
          }
          
          .header-content {
            display: flex;
            align-items: center;
            gap: 16pt;
          }
          
          .profile-photo {
            width: 80pt;
            height: 80pt;
            border-radius: 50%;
            object-fit: cover;
            border: 3pt solid rgba(255, 255, 255, 0.3);
            flex-shrink: 0;
          }
          
          .header-text {
            flex: 1;
          }
          
          .header-right {
            display: flex;
            flex-direction: column;
            gap: 4pt;
            align-items: flex-end;
          }
          
          h1 {
            font-size: 24pt;
            font-weight: 800;
            margin-bottom: 3pt;
            letter-spacing: -0.5pt;
            color: white;
          }
          
          .subtitle {
            font-size: 12pt;
            font-weight: 500;
            margin-bottom: 10pt;
            color: white;
            opacity: 1;
            letter-spacing: 0.3pt;
          }
          
          h2 {
            font-size: 13pt;
            font-weight: 700;
            margin-top: 10pt;
            margin-bottom: 6pt;
            color: #1e40af;
            position: relative;
            padding-left: 12pt;
          }
          
          h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 2pt;
            width: 4pt;
            height: 16pt;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 2pt;
          }
          
          h3 {
            font-size: 11pt;
            font-weight: 600;
            margin-top: 6pt;
            margin-bottom: 2pt;
            color: #111827;
          }
          
          p {
            margin: 2pt 0;
            color: #374151;
          }
          
          /* Contact Info Grid */
          .contact-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6pt 10pt;
            margin-top: 12pt;
            font-size: 8.5pt;
            opacity: 0.95;
          }
          
          .primary-contact {
            display: flex;
            align-items: center;
            gap: 4pt;
            padding: 3pt 8pt;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4pt;
            font-size: 8.5pt;
            white-space: nowrap;
          }
          
          .primary-contact svg {
            flex-shrink: 0;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 4pt;
            padding: 3pt 6pt;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 4pt;
          }
          
          .contact-item svg {
            flex-shrink: 0;
          }
          
          /* Skills Section with Modern Card Design */
          .skill-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10pt;
            margin-bottom: 8pt;
          }
          
          .skill-category {
            break-inside: avoid;
            background: #f9fafb;
            padding: 10pt;
            border-radius: 6pt;
            border-left: 3pt solid #667eea;
          }
          
          .skill-category h3 {
            font-size: 10pt;
            margin-bottom: 6pt;
            color: #667eea;
            text-transform: uppercase;
            letter-spacing: 0.5pt;
            font-weight: 700;
          }
          
          .skill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 4pt 0;
            font-size: 9pt;
            padding: 2pt 0;
          }
          
          .skill-bar {
            width: 40pt;
            height: 4pt;
            background: #e5e7eb;
            border-radius: 2pt;
            overflow: hidden;
            margin-left: 6pt;
          }
          
          .skill-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            border-radius: 2pt;
          }
          
          /* Experience Items with Timeline */
          .experience-item {
            margin-bottom: 8pt;
            break-inside: avoid;
            padding-left: 16pt;
            border-left: 2pt solid #e5e7eb;
            position: relative;
          }
          
          .experience-item::before {
            content: '';
            position: absolute;
            left: -6pt;
            top: 2pt;
            width: 10pt;
            height: 10pt;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            border: 2pt solid white;
          }
          
          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4pt;
          }
          
          .year-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2pt 8pt;
            border-radius: 12pt;
            font-size: 8.5pt;
            font-weight: 600;
            white-space: nowrap;
          }
          
          /* Project Cards */
          .project-item {
            margin-bottom: 6pt;
            break-inside: avoid;
            background: #f9fafb;
            padding: 8pt;
            border-radius: 6pt;
            border-top: 2pt solid #667eea;
            display: flex;
            gap: 8pt;
          }
          
          .project-thumbnail {
            width: 50pt;
            height: 50pt;
            object-fit: cover;
            border-radius: 4pt;
            border: 1pt solid #e5e7eb;
            flex-shrink: 0;
          }
          
          .project-content {
            flex: 1;
            min-width: 0;
          }
          
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4pt;
          }
          
          .tech-stack {
            font-size: 8pt;
            color: #6b7280;
            margin-top: 4pt;
            padding-top: 4pt;
            border-top: 1pt dashed #e5e7eb;
          }
          
          .tech-tag {
            display: inline-block;
            background: white;
            padding: 2pt 6pt;
            border-radius: 3pt;
            margin: 2pt 2pt 2pt 0;
            border: 1pt solid #e5e7eb;
          }
          
          /* Certification Grid */
          .cert-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8pt;
          }
          
          .cert-item {
            break-inside: avoid;
            background: #f9fafb;
            padding: 8pt;
            border-radius: 6pt;
            border-left: 3pt solid #10b981;
            display: flex;
            gap: 8pt;
            align-items: center;
          }
          
          .cert-thumbnail {
            width: 40pt;
            height: 40pt;
            object-fit: cover;
            border-radius: 4pt;
            border: 1pt solid #e5e7eb;
            flex-shrink: 0;
          }
          
          .cert-content {
            flex: 1;
            min-width: 0;
          }
          
          .cert-item p:first-child {
            font-size: 9.5pt;
            font-weight: 600;
            color: #111827;
            margin-bottom: 2pt;
          }
          
          .cert-item p:last-child {
            font-size: 8.5pt;
            color: #6b7280;
          }
          
          /* Experience, Education, and Languages Row */
          .experience-education-row {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 12pt;
            margin-bottom: 8pt;
            break-inside: avoid;
          }
          
          .left-column {
            break-inside: avoid;
          }
          
          .right-column {
            break-inside: avoid;
          }
          
          .left-column h2,
          .right-column h2 {
            margin-top: 0;
          }
          
          /* Education Section */
          .education-item {
            margin-bottom: 10pt;
            break-inside: avoid;
            padding-left: 16pt;
            border-left: 2pt solid #e5e7eb;
            position: relative;
          }
          
          .education-item::before {
            content: '';
            position: absolute;
            left: -6pt;
            top: 2pt;
            width: 10pt;
            height: 10pt;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            border: 2pt solid white;
          }
          
          .education-item .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          
          /* Languages Grid */
          .languages-section {
            margin-top: 12pt;
          }
          
          .languages-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8pt;
          }
          
          .language-item {
            break-inside: avoid;
            background: #f9fafb;
            padding: 8pt 10pt;
            border-radius: 6pt;
            border-left: 3pt solid #8b5cf6;
            text-align: center;
          }
          
          .language-item p:first-child {
            font-size: 10pt;
            font-weight: 600;
            color: #111827;
            margin-bottom: 2pt;
          }
          
          .language-item p:last-child {
            font-size: 8.5pt;
            color: #6b7280;
          }
          
          /* Footer with Subtle Design */
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 8pt 0;
            border-top: 2pt solid #f3f4f6;
            font-size: 8pt;
            color: #9ca3af;
            text-align: center;
            background: white;
            page-break-inside: avoid;
          }
          
          /* Add padding to last section to prevent overlap with fixed footer */
          .cert-grid {
            margin-bottom: 30pt;
          }
          
          /* Summary Box */
          .summary-box {
            background: #f9fafb;
            padding: 10pt;
            border-radius: 6pt;
            border-left: 4pt solid #667eea;
            margin: 10pt 0;
            font-size: 9pt;
            line-height: 1.5;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header-section print-no-break">
        <div className="header-content">
          <img src={profileImg} alt="Profile" className="profile-photo" />
          <div className="header-text">
            <h1>{t('hero.name')}</h1>
            <p className="subtitle">{t('hero.title')}</p>
          </div>
          <div className="header-right">
            {primaryContacts.map((contact, index) => (
              <div key={index} className="primary-contact">
                {getContactIcon(contact.type)}
                <span>{formatContactValue(contact.type, contact.value)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="contact-info">
          {socialContacts.map((contact, index) => (
            <div key={index} className="contact-item">
              {getContactIcon(contact.type)}
              <span>{formatContactValue(contact.type, contact.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="summary-box print-no-break">
        {t('printResume.summary')}
      </div>

      {/* Skills Section */}
      <div className="print-no-break">
        <h2>{t('printResume.sections.skills')}</h2>
        <div className="skill-grid">
          {['Frontend', 'Backend', 'Tools & Others'].map(category => {
            const categorySkills = skills.filter(s => s.category === category);
            return (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                {categorySkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <span>{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Experience with Education and Languages */}
      <div className="experience-education-row">
        {/* Left Column - Education and Languages */}
        <div className="left-column">
          {/* Education */}
          <div className="education-section">
            <h2>{t('printResume.sections.education')}</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="experience-header">
                  <div>
                    <h3>{edu.title}</h3>
                    <p style={{ fontSize: '9.5pt', color: '#6b7280', marginTop: '2pt' }}>
                      {edu.School} • {edu.Location}
                    </p>
                    {edu.RemarkKey && (
                      <p style={{ fontSize: '8.5pt', color: '#9ca3af', marginTop: '2pt', fontStyle: 'italic' }}>
                        {t(edu.RemarkKey)}
                      </p>
                    )}
                  </div>
                  <span className="year-badge">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="languages-section">
            <h2>{t('printResume.sections.languages')}</h2>
            <div className="languages-grid">
              {languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <p>{lang.language}</p>
                  <p>{t(lang.proficiencyKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Professional Experience */}
        <div className="right-column">
          <h2>{t('printResume.sections.experience')}</h2>
          {milestones.slice(0, 4).map((milestone, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3>{milestone.title}</h3>
                  <p style={{ fontSize: '9.5pt', color: '#6b7280', marginTop: '2pt' }}>
                    {milestone.company && `${milestone.company}`}
                    {milestone.company && milestone.duration && ' • '}
                    {milestone.duration}
                  </p>
                </div>
                <span className="year-badge">{milestone.year}</span>
              </div>
              <p style={{ fontSize: '9pt', marginTop: '4pt', color: '#374151' }}>
                {t(milestone.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="print-page-break">
        <h2>{t('printResume.sections.projects')}</h2>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <img 
              src={getProjectImage(project.title)} 
              alt={project.title}
              className="project-thumbnail"
            />
            <div className="project-content">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="year-badge">{project.year}</span>
              </div>
              <p style={{ fontSize: '9pt', marginTop: '4pt', color: '#374151' }}>
                {t(project.descriptionKey)}
              </p>
              <div className="tech-stack">
                <strong style={{ color: '#111827' }}>{t('printResume.labels.technologies')}:</strong>{' '}
                {project.technologies.slice(0, 8).map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="print-no-break">
        <h2>{t('printResume.sections.certifications')}</h2>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-item">
              <img 
                src={getCertificationImage(cert.title)} 
                alt={cert.title}
                className="cert-thumbnail"
              />
              <div className="cert-content">
                <p>{cert.title}</p>
                <p>{cert.issuer} • {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>
          {t('printResume.footer.generated')} • {t('printResume.footer.lastUpdated')}: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrintableResume;
