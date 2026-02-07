import { ReactNode, useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export function Card3D({ children, className = '', intensity = 15, glowColor }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect */}
      {glowColor && isHovering && (
        <motion.div
          className="absolute inset-0 rounded-xl blur-xl opacity-0 -z-10"
          style={{
            background: glowColor,
          }}
          animate={{
            opacity: isHovering ? 0.4 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}
      
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

interface FloatingElementProps {
  children?: ReactNode;
  className?: string;
  depth?: number;
  floatIntensity?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  depth = 30,
  floatIntensity = 10 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: [0, -floatIntensity, 0],
        rotateZ: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div style={{ transform: `translateZ(${depth}px)` }}>
        {children}
      </div>
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY * speed);
  };

  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <motion.div
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}
