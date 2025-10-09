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

      // Check for navigation area
      if (target.closest('nav')) {
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
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: 1,
    },
    hero: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      opacity: 1,
    },
    skills: {
      x: mousePosition.x - 14,
      y: mousePosition.y - 14,
      scale: 0.875,
      opacity: 1,
    },
    projects: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      scale: 1.125,
      opacity: 1,
    },
    contact: {
      x: mousePosition.x - 22,
      y: mousePosition.y - 22,
      scale: 1.375,
      opacity: 1,
    }
  };

  // Ultra-smooth spring physics
  const smoothTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1
  };

  const trailTransition = {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    mass: 0.2
  };

  return (
    <>
      {/* Modern glassmorphic cursor with smooth animations */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] hidden lg:block cursor-element"
        variants={variants}
        animate={cursorVariant}
        transition={smoothTransition}
        style={{
          borderRadius: '50%',
          background: cursorVariant === 'hover' 
            ? 'radial-gradient(circle, oklch(0.65 0.18 195 / 0.3), oklch(0.47 0.15 285 / 0.2))'
            : cursorVariant === 'skills' 
            ? 'radial-gradient(circle, oklch(0.65 0.18 195 / 0.25), transparent)'
            : cursorVariant === 'projects' 
            ? 'radial-gradient(circle, oklch(0.47 0.15 285 / 0.25), transparent)'
            : cursorVariant === 'contact' 
            ? 'radial-gradient(circle, oklch(0.65 0.24 15 / 0.25), transparent)'
            : 'radial-gradient(circle, oklch(0.65 0.18 195 / 0.15), transparent)',
          border: cursorVariant === 'hover' 
            ? '2px solid oklch(0.65 0.18 195 / 0.5)' 
            : '1.5px solid oklch(0.65 0.18 195 / 0.3)',
          backdropFilter: 'blur(8px)',
          boxShadow: cursorVariant === 'hover'
            ? '0 0 30px oklch(0.65 0.18 195 / 0.4), inset 0 0 20px oklch(0.65 0.18 195 / 0.2)'
            : '0 0 20px oklch(0.65 0.18 195 / 0.2), inset 0 0 10px oklch(0.65 0.18 195 / 0.1)',
        }}
      />
      
      {/* Outer ring pulse effect */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[99] hidden lg:block cursor-element"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: cursorVariant === 'hover' ? [1, 1.3, 1] : 1,
          opacity: cursorVariant === 'hover' ? [0.4, 0.1, 0.4] : 0.2,
        }}
        transition={{
          ...smoothTransition,
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        style={{
          border: '1.5px solid oklch(0.65 0.18 195 / 0.4)',
          background: 'radial-gradient(circle, oklch(0.65 0.18 195 / 0.1), transparent)',
        }}
      />
      
      {/* Smooth trailing cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[98] hidden lg:block cursor-element"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={trailTransition}
        style={{
          backgroundColor: 'oklch(0.65 0.18 195 / 0.8)',
          boxShadow: '0 0 10px oklch(0.65 0.18 195 / 0.6)',
        }}
      />

      {/* Enhanced particle effects for hero section */}
      {cursorVariant === 'hero' && (
        <div className="fixed inset-0 pointer-events-none z-[97] overflow-hidden hidden lg:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              animate={{
                x: mousePosition.x + Math.sin(i * Math.PI / 3) * 40,
                y: mousePosition.y + Math.cos(i * Math.PI / 3) * 40,
                opacity: [0, 0.8, 0],
                scale: [0.2, 1.2, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                backgroundColor: i % 2 === 0 
                  ? 'oklch(0.65 0.18 195 / 0.6)' 
                  : 'oklch(0.47 0.15 285 / 0.5)',
                boxShadow: `0 0 15px ${i % 2 === 0 
                  ? 'oklch(0.65 0.18 195 / 0.4)' 
                  : 'oklch(0.47 0.15 285 / 0.3)'}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient glow effect for hover state */}
      {cursorVariant === 'hover' && (
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-[96] hidden lg:block cursor-element"
          animate={{
            x: mousePosition.x - 48,
            y: mousePosition.y - 48,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
            mass: 0.5
          }}
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.18 195 / 0.15), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      )}
    </>
  );
};

export default MouseTracker;