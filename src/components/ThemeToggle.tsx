import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg shadow-yellow-500/25'
        }
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Switch Track */}
      <div className="relative w-full h-full">
        {/* Switch Handle */}
        <motion.div
          layout
          animate={{
            x: isDark ? 32 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
          className={`
            absolute top-0 w-6 h-6 rounded-full flex items-center justify-center
            ${isDark 
              ? 'bg-white shadow-lg shadow-blue-900/20' 
              : 'bg-white shadow-lg shadow-orange-900/20'
            }
          `}
        >
          {/* Icon inside handle */}
          <motion.div
            initial={false}
            animate={{
              rotate: isDark ? 0 : 180,
              scale: isDark ? 1 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isDark ? (
              <Moon size={14} className="text-blue-600" />
            ) : (
              <Sun size={14} className="text-orange-500" />
            )}
          </motion.div>
        </motion.div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <motion.div
            animate={{
              opacity: isDark ? 0.3 : 0,
              scale: isDark ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={12} className="text-white/70" />
          </motion.div>
          <motion.div
            animate={{
              opacity: isDark ? 0 : 0.3,
              scale: isDark ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={12} className="text-white/70" />
          </motion.div>
        </div>
      </div>

      {/* Glowing effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-full blur-sm opacity-75
          ${isDark 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-400'
          }
        `}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
}