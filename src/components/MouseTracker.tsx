import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  const updateMousePosition = useCallback(() => {
    const now = performance.now();
    // Throttle updates to 60fps max
    if (now - lastUpdate.current > 16) {
      setMousePosition({ x: mouseRef.current.x, y: mouseRef.current.y });
      lastUpdate.current = now;
    }
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      // More efficient RAF usage
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateMousePosition();
          rafRef.current = null;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for interactive elements
      if (target.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select')) {
        setCursorVariant('hover');
        return;
      }

      // Check for section-specific cursors
      const section = target.closest('section');
      if (section) {
        const sectionId = section.id;
        switch (sectionId) {
          case 'hero':
            setCursorVariant('hero');
            break;
          case 'skills':
            setCursorVariant('skills');
            break;
          case 'projects':
            setCursorVariant('projects');
            break;
          case 'contact':
            setCursorVariant('contact');
            break;
          default:
            setCursorVariant('default');
        }
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', mouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition]);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      opacity: 0.6,
      borderRadius: '50%',
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.6,
      opacity: 0.8,
      borderRadius: '50%',
    },
    hero: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.2,
      opacity: 0.7,
      borderRadius: '50%',
    },
    skills: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 0.8,
      opacity: 1,
      borderRadius: '20%',
    },
    projects: {
      x: mousePosition.x - 14,
      y: mousePosition.y - 14,
      scale: 1.1,
      opacity: 0.9,
      borderRadius: '10%',
    },
    contact: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      scale: 1.4,
      opacity: 0.5,
      borderRadius: '50%',
    }
  };

  // Optimized transition settings
  const smoothTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 28,
    mass: 0.5
  };

  const trailTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };

  return (
    <>
      {/* Main cursor with section morphing */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference hidden lg:block cursor-element"
        variants={variants}
        animate={cursorVariant}
        transition={smoothTransition}
        style={{
          backgroundColor: cursorVariant === 'skills' ? 'oklch(0.65 0.18 195 / 0.8)' : 
                          cursorVariant === 'projects' ? 'oklch(0.47 0.15 285 / 0.6)' :
                          cursorVariant === 'contact' ? 'oklch(0.65 0.24 15 / 0.4)' :
                          'oklch(0.47 0.15 285 / 0.4)',
          border: cursorVariant === 'hero' ? '2px solid oklch(0.65 0.18 195 / 0.6)' : 'none',
        }}
      />
      
      {/* Optimized cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-40 hidden lg:block cursor-element"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={trailTransition}
        style={{
          backgroundColor: 'oklch(0.65 0.18 195 / 0.4)'
        }}
      />

      {/* Reduced particle effects for better performance */}
      {cursorVariant === 'hero' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              animate={{
                x: mousePosition.x + Math.sin(i * 1.5) * 30,
                y: mousePosition.y + Math.cos(i * 1.5) * 30,
                opacity: [0, 0.8, 0],
                scale: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                backgroundColor: 'oklch(0.65 0.18 195 / 0.3)'
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MouseTracker;