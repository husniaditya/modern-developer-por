import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CaretLeft, CaretRight, Star } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

// Testimonial images
import hrisAppTestimonial from '@/assets/images/testimonials/369_hris_app.webp';
import erpAppTestimonial from '@/assets/images/testimonials/erp_app.webp';
import maintenanceAppTestimonial from '@/assets/images/testimonials/maintenance_app.webp';
import productspecAppTestimonial from '@/assets/images/testimonials/productspec_app.webp';
import shipmentAppTestimonial from '@/assets/images/testimonials/shipment_app.webp';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  app: string;
}

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      app: 'erpApp',
      name: 'Dedi Dwi S',
      role: 'Senior Account',
      company: 'PT. Mega Marine Pride',
      content: 'A highly skilled and dedicated developer. Their expertise in both frontend and backend technologies significantly improved our project outcomes. Always a pleasure to work with!',
      rating: 5,
      avatar: erpAppTestimonial
    },
    {
      id: '2',
      app: 'productSpec',
      name: 'Atik',
      role: 'Quality Assurance',
      company: 'PT. Mega Marine Pride',
      content: 'Consistently delivered high-quality and innovative solutions. Their attention to detail and commitment to best practices greatly enhanced our development process.',
      rating: 5,
      avatar: productspecAppTestimonial
    },
    {
      id: '3',
      app: 'ShipmentApp',
      name: 'Dhadang',
      role: 'PPIC Senior Manager',
      company: 'PT. Mega Marine Pride',
      content: 'Exceptional problem-solver and team player. Their ability to adapt to new challenges and technologies made a significant impact on our project success.',
      rating: 5,
      avatar: shipmentAppTestimonial
    },
    {
      id: '4',
      app: 'maintenanceApp',
      name: 'Endang',
      role: 'Senior Technical Engineer',
      company: 'PT. Mega Marine Pride',
      content: 'Reliable and highly skilled developer. Their contributions to our projects were invaluable, consistently delivering solutions that exceeded expectations.',
      rating: 5,
      avatar: maintenanceAppTestimonial
    },
    {
      id: '5',
      app: 'hrisApp',
      name: 'Gadis',
      role: 'HR & GA Manager',
      company: '3.6.9. Group',
      content: 'A talented and dedicated developer. Their expertise in both frontend and backend development greatly enhanced our project outcomes. A true asset to any team!',
      rating: 5,
      avatar: hrisAppTestimonial
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          <Card className="mx-auto max-w-3xl">
            <CardContent className="p-8 text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-accent fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                  <AvatarFallback>
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">{currentTestimonial.name}</h4>
                  <p className="text-primary font-medium">{currentTestimonial.role}</p>
                  <p className="text-muted-foreground text-sm">{currentTestimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center space-x-4 mt-8" aria-label={t('testimonials.navigationLabel')}>
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label={t('testimonials.previous')}
            >
              <CaretLeft size={20} />
            </Button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={t('testimonials.ariaLabel', { index: index + 1, total: testimonials.length })}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label={t('testimonials.next')}
            >
              <CaretRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;