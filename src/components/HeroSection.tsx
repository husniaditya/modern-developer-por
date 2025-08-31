import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowDown, Download, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';

const HeroSection = () => {
  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 ring-4 ring-primary/20">
              <AvatarImage src="/api/placeholder/128/128" alt="Profile" />
              <AvatarFallback className="text-2xl font-bold">YN</AvatarFallback>
            </Avatar>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
              Your Name
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Full Stack Developer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Passionate developer with 5+ years of experience building modern web applications. 
              I love creating efficient, scalable solutions that make a real impact.
            </p>
          </div>

          {/* Social Links & CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <LinkedinLogo size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <GithubLogo size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Envelope size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className="group">
                <Download size={16} className="mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
              <Button variant="outline" onClick={scrollToNext}>
                View My Work
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={scrollToNext}
              className="animate-bounce"
            >
              <ArrowDown size={24} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;