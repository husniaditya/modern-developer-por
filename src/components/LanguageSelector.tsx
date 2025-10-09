import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, CaretDown } from '@phosphor-icons/react';
import ReactCountryFlag from 'react-country-flag';

// Use country codes for reliable SVG flags across platforms (Windows shows emoji flags as letter pairs)
const languages = [
  { code: 'en', name: 'English', country: 'US' },
  { code: 'id', name: 'Bahasa Indonesia', country: 'ID' },
  { code: 'de', name: 'Deutsch', country: 'DE' },
  { code: 'es', name: 'Español', country: 'ES' },
  { code: 'fr', name: 'Français', country: 'FR' },
  { code: 'ja', name: '日本語', country: 'JP' },
  { code: 'cn', name: '繁體中文', country: 'TW' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="outline" 
            className={`
              relative h-10 px-3 rounded-full border-2 transition-all duration-300 overflow-hidden
              bg-gradient-to-r from-background to-secondary/50
              hover:from-primary/10 hover:to-accent/10 
              hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10
              ${isOpen ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-border'}
            `}
            aria-label="Change language"
          >
            {/* Background Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="flex items-center space-x-2 relative z-10">
              {/* Flag with rotation animation */}
              <motion.span 
                className="text-lg"
                animate={{ 
                  rotate: isOpen ? 360 : 0,
                  scale: isOpen ? 1.1 : 1 
                }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <ReactCountryFlag
                  countryCode={currentLanguage.country}
                  svg
                  aria-label={currentLanguage.name}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
              </motion.span>
              
              {/* Animated chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <CaretDown size={12} className="text-muted-foreground" />
              </motion.div>
            </div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent 
            align="end" 
            className="w-56 p-2 border-2 border-primary/20 bg-background/95 backdrop-blur-lg shadow-2xl shadow-primary/10"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-1">
                {languages.map((language, index) => (
                  <motion.div
                    key={language.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <DropdownMenuItem
                      onClick={() => changeLanguage(language.code)}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10
                        hover:shadow-md hover:scale-[1.02]
                        ${i18n.language === language.code 
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 shadow-lg' 
                          : 'hover:bg-secondary/50'
                        }
                      `}
                    >
                      {/* Flag with pulse effect for active language */}
                      <motion.span 
                        className="text-xl"
                        animate={i18n.language === language.code ? {
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={i18n.language === language.code ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        <ReactCountryFlag
                          countryCode={language.country}
                          svg
                          aria-label={language.name}
                          style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                      </motion.span>
                      
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${
                          i18n.language === language.code 
                            ? 'text-primary font-semibold' 
                            : 'text-foreground'
                        }`}>
                          {language.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {language.code.toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Active indicator */}
                      {i18n.language === language.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default LanguageSelector;
