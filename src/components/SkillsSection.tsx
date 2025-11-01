import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import GithubContributions from '@/components/GithubContributions';
import WakaTimeSection from '@/components/WakaTimeSection';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillsSection = () => {
  const { t } = useTranslation();

  const skills: Skill[] = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { name: 'Vue.js', level: 75, category: 'Frontend' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Express.js', level: 85, category: 'Backend' },
    { name: 'PostgreSQL', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 72, category: 'Backend' },
    { name: 'PHP', level: 90, category: 'Backend' },
    { name: 'SQL', level: 78, category: 'Backend' },
    { name: 'Git', level: 90, category: 'Tools & Others' },
    { name: 'Postman', level: 90, category: 'Tools & Others' },
    { name: 'Figma', level: 75, category: 'Tools & Others' },
    { name: 'Jira', level: 90, category: 'Tools & Others' },
    { name: 'Microsoft Azure', level: 90, category: 'Tools & Others' },
    { name: 'Docker', level: 70, category: 'Tools & Others' }
  ];

  const categories = [
    { key: 'Frontend', label: t('skills.categories.frontend') },
    { key: 'Backend', label: t('skills.categories.backend') },
    { key: 'Tools & Others', label: t('skills.categories.tools') }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const skillVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <section
      id="skills"
      className="py-20 bg-secondary/30 scroll-mt-[calc(var(--nav-h,72px)+12px)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t('skills.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div key={category.key} variants={cardVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-primary">{category.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category.key)
                    .map((skill, skillIndex) => (
                      <motion.div 
                        key={skill.name} 
                        className="space-y-2"
                        variants={skillVariants}
                        custom={skillIndex}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="secondary">{skill.level}%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden relative">
                          <motion.div
                            className="skill-bar h-3 rounded-full relative"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ 
                              duration: 2, 
                              delay: categoryIndex * 0.15 + skillIndex * 0.08,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              initial={{ x: '-100%' }}
                              whileInView={{ x: '100%' }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{
                                duration: 1.5,
                                delay: categoryIndex * 0.15 + skillIndex * 0.08 + 0.5,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Contributions */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GithubContributions username="husniaditya" title={t('skills.contributionsTitle', { defaultValue: 'GitHub Contributions' })} />
        </motion.div>

        {/* WakaTime (embedded) */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <WakaTimeSection embed />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;