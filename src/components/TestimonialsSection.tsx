import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CaretLeft, CaretRight, Star } from '@phosphor-icons/react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Tech Innovations Inc.',
      content: 'Working with them was an absolute pleasure. Their technical expertise and attention to detail helped us deliver our product ahead of schedule. The code quality was exceptional.',
      rating: 5,
      avatar: '/api/placeholder/64/64'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      content: 'An outstanding developer who consistently delivers high-quality solutions. Their ability to understand complex requirements and translate them into elegant code is remarkable.',
      rating: 5,
      avatar: '/api/placeholder/64/64'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Lead Designer',
      company: 'Digital Agency Co.',
      content: 'Excellent collaboration skills and deep understanding of both frontend and backend development. They helped bridge the gap between design and implementation perfectly.',
      rating: 5,
      avatar: '/api/placeholder/64/64'
    },
    {
      id: '4',
      name: 'David Thompson',
      role: 'Senior Developer',
      company: 'Enterprise Solutions Ltd.',
      content: 'A mentor and excellent team player. Their code reviews were always constructive, and they shared knowledge generously with the entire team.',
      rating: 5,
      avatar: '/api/placeholder/64/64'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      role: 'Project Director',
      company: 'Consulting Firm ABC',
      content: 'Delivered complex projects on time and within budget. Their proactive communication and problem-solving skills made our collaboration seamless and effective.',
      rating: 5,
      avatar: '/api/placeholder/64/64'
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
          <h2 className="text-4xl font-bold text-foreground mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from colleagues, clients, and collaborators I've worked with
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
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
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
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
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