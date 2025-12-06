import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'div'>({
  as,
  className = '',
  color,
  speed = '6s',
  thickness = 3,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'div';

  // Bright colors for visibility
  const glowColor = color || '#22d3ee'; // Cyan color

  return (
    <Component
      className={`star-border-container relative rounded-xl ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        background: `linear-gradient(var(--card), var(--card))`,
        ...(rest as any).style
      } as React.CSSProperties}
    >
      {/* Animated gradient border */}
      <div 
        className="absolute inset-0 rounded-xl z-0"
        style={{
          background: `linear-gradient(var(--card), var(--card)) padding-box, 
                       conic-gradient(from var(--angle, 0deg), transparent 20%, ${glowColor}, ${glowColor}, transparent 40%, transparent 60%, ${glowColor}, ${glowColor}, transparent 80%) border-box`,
          border: `${thickness}px solid transparent`,
          animation: `spin ${speed} linear infinite`,
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-xl z-0 blur-sm opacity-60"
        style={{
          background: `conic-gradient(from var(--angle, 0deg), transparent 20%, ${glowColor}, ${glowColor}, transparent 40%, transparent 60%, ${glowColor}, ${glowColor}, transparent 80%)`,
          animation: `spin ${speed} linear infinite`,
        }}
      />
      
      {/* Content container */}
      <div className="relative z-10 bg-card rounded-lg h-full">
        {children}
      </div>
      
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </Component>
  );
};

export default StarBorder;
