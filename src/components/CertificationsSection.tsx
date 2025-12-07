import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import DecryptedText from '@/components/ui/decrypted-text';
import BlurText from '@/components/ui/blur-text';
import GradientText from '@/components/ui/gradient-text';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
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

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    certifications.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>
              <DecryptedText 
                text={t('certificates.title')} 
                speed={30}
                sequential={true}
                animateOn="view"
              />
            </GradientText>
          </h2>
          <BlurText 
            text={t('certificates.subtitle')}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            delay={50}
            animateBy="words"
          />
        </div>

        {/* Interactive Selector - Desktop */}
        <div className="relative hidden md:flex justify-center items-center min-h-[500px]">
          <div className="flex w-full max-w-[900px] h-[400px] items-stretch overflow-hidden relative">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
                style={{
                  backgroundImage: `url('${cert.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backfaceVisibility: 'hidden',
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                  transitionProperty: 'flex-grow, background-size, border-color, box-shadow, opacity, transform',
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'ease-in-out',
                  minWidth: '60px',
                  minHeight: '100px',
                  margin: 0,
                  borderRadius: 0,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: activeIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  backgroundColor: 'hsl(var(--background))',
                  boxShadow: activeIndex === index 
                    ? '0 20px 60px rgba(0,0,0,0.50)' 
                    : '0 10px 30px rgba(0,0,0,0.30)',
                  flexGrow: activeIndex === index ? 7 : 1,
                  flexShrink: 1,
                  flexBasis: '0%',
                  zIndex: activeIndex === index ? 10 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  overflow: 'hidden',
                  willChange: 'flex-grow, box-shadow, background-size, background-position'
                }}
                onClick={() => handleOptionClick(index)}
              >
                {/* Shadow effect */}
                <div 
                  className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                  style={{
                    bottom: activeIndex === index ? '0' : '-40px',
                    height: '120px',
                    boxShadow: activeIndex === index 
                      ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000' 
                      : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
                  }}
                ></div>
                
                {/* Label with icon and info */}
                <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-4 gap-3 w-full">
                  <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-primary/90 backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-primary-foreground/20 flex-shrink-0 flex-grow-0 transition-all duration-200">
                    <Trophy size={24} className="text-primary-foreground" />
                  </div>
                  <div className="text-white whitespace-pre relative">
                    <div 
                      className="font-bold text-lg transition-all duration-700 ease-in-out"
                      style={{
                        opacity: activeIndex === index ? 1 : 0,
                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                      }}
                    >
                      {cert.title}
                    </div>
                    <div 
                      className="text-base text-gray-300 transition-all duration-700 ease-in-out flex items-center gap-2"
                      style={{
                        opacity: activeIndex === index ? 1 : 0,
                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                      }}
                    >
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-[2]">
                  <Badge 
                    variant={cert.status === 'active' ? 'default' : 'secondary'}
                    className="transition-opacity duration-700"
                    style={{
                      opacity: activeIndex === index ? 1 : 0
                    }}
                  >
                    {t(`certificates.status.${cert.status}`)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Selector - Mobile (Vertical Stack) */}
        <div className="flex md:hidden flex-col w-full max-w-[350px] mx-auto gap-0 overflow-hidden relative">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${cert.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateY(0)' : 'translateY(-30px)',
                transitionProperty: 'height, border-color, box-shadow, opacity, transform',
                transitionDuration: '500ms',
                transitionTimingFunction: 'ease-in-out',
                height: activeIndex === index ? '180px' : '50px',
                minHeight: '50px',
                margin: 0,
                borderRadius: '8px',
                marginBottom: index < certifications.length - 1 ? '8px' : '0',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: activeIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                backgroundColor: 'hsl(var(--background))',
                boxShadow: activeIndex === index 
                  ? '0 10px 30px rgba(0,0,0,0.50)' 
                  : '0 5px 15px rgba(0,0,0,0.30)',
                zIndex: activeIndex === index ? 10 : 1,
                willChange: 'height, box-shadow'
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Shadow effect */}
              <div 
                className="absolute left-0 right-0 pointer-events-none transition-all duration-500 ease-in-out"
                style={{
                  bottom: 0,
                  height: '80px',
                  boxShadow: 'inset 0 -80px 80px -80px #000, inset 0 -80px 80px -40px #000'
                }}
              ></div>
              
              {/* Label with icon and info */}
              <div className="absolute left-0 right-0 bottom-3 flex items-center justify-start h-10 z-[2] pointer-events-none px-3 gap-2 w-full">
                <div className="min-w-[36px] max-w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary/90 backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-primary-foreground/20 flex-shrink-0 flex-grow-0">
                  <Trophy size={18} className="text-primary-foreground" />
                </div>
                <div className="text-white whitespace-nowrap relative overflow-hidden flex-1">
                  <div 
                    className="font-bold text-sm transition-all duration-500 ease-in-out truncate"
                    style={{
                      opacity: 1,
                      transform: 'translateX(0)'
                    }}
                  >
                    {cert.title}
                  </div>
                  <div 
                    className="text-xs text-gray-300 transition-all duration-500 ease-in-out flex items-center gap-1"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      height: activeIndex === index ? 'auto' : '0',
                      overflow: 'hidden'
                    }}
                  >
                    <span>{cert.issuer}</span>
                    <span>•</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge - Mobile */}
              <div className="absolute top-2 right-2 z-[2]">
                <Badge 
                  variant={cert.status === 'active' ? 'default' : 'secondary'}
                  className="transition-opacity duration-500 text-xs"
                  style={{
                    opacity: activeIndex === index ? 1 : 0
                  }}
                >
                  {t(`certificates.status.${cert.status}`)}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Custom animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slideFadeIn {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        ` }} />
      </div>
    </section>
  );
};

export default CertificationsSection;