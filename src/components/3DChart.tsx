import { ReactNode, useRef, useState, MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface Chart3DWrapperProps {
  children: ReactNode;
  className?: string;
}

export function Chart3DWrapper({ children, className = '' }: Chart3DWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX: springX,
        rotateY: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

interface ParallaxChartProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function ParallaxChart({ children, depth = 50, className = '' }: ParallaxChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const x = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const translateX = useTransform(x, [-1, 1], [-depth, depth]);
  const translateY = useTransform(y, [-1, 1], [-depth, depth]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    setMouseX(normalizedX);
    setMouseY(normalizedY);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          x: translateX,
          y: translateY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface AnimatedBarProps {
  value: number;
  maxValue: number;
  color: string;
  delay?: number;
  className?: string;
}

export function AnimatedBar({ value, maxValue, color, delay = 0, className = '' }: AnimatedBarProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <motion.div
      className={`h-full rounded-t-lg ${className}`}
      style={{
        background: `linear-gradient(to top, ${color}, ${color}dd)`,
        transformOrigin: 'bottom',
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: percentage / 100, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        scaleY: (percentage / 100) * 1.05,
        filter: 'brightness(1.1)',
      }}
    />
  );
}

interface PulsingDotProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
}

export function PulsingDot({ x, y, color = '#6366f1', size = 8 }: PulsingDotProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        backgroundColor: color,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        boxShadow: [
          `0 0 0 0 ${color}88`,
          `0 0 0 ${size}px ${color}00`,
          `0 0 0 0 ${color}00`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

interface Floating3DElementProps {
  children: ReactNode;
  yOffset?: number;
  duration?: number;
  className?: string;
}

export function Floating3DElement({
  children,
  yOffset = 10,
  duration = 3,
  className = '',
}: Floating3DElementProps) {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        rotateX: [-2, 2, -2],
        rotateY: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
