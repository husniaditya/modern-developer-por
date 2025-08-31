import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const rafRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback(() => {
    setMousePosition({ x: mouseRef.current.x, y: mouseRef.current.y });
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Cancel previous frame and schedule new one
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateMousePosition);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (target && target instanceof HTMLElement) {
        if (target.closest('button, a, [role="button"], .cursor-pointer, input, textarea')) {
          setCursorVariant('hover');
        } else {
          setCursorVariant('default');
        }
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
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
    }
  };

  // Smooth transition settings
  const smoothTransition = {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.15
  };

  const trailTransition = {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.3
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        variants={variants}
        animate={cursorVariant}
        transition={smoothTransition}
        style={{
          willChange: 'transform'
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent/60 rounded-full pointer-events-none z-40 hidden lg:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={trailTransition}
        style={{
          willChange: 'transform'
        }}
      />

      {/* Subtle trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-30 hidden lg:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "tween",
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.6
        }}
        style={{
          willChange: 'transform'
        }}
      />

      {/* Interactive background effects - reduced for performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary/20 rounded-full"
            animate={{
              x: mousePosition.x + Math.sin(i * 0.8) * 60,
              y: mousePosition.y + Math.cos(i * 0.8) * 60,
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MouseTracker;