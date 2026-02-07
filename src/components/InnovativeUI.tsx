import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';

interface FloatingActionButtonProps {
  icon?: ReactNode;
  actions: Array<{
    icon: ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingActionButton({
  icon = <Plus className="w-6 h-6" />,
  actions,
  position = 'bottom-right',
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-end gap-3 group"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.span
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {action.label}
                </motion.span>
                <motion.button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow ${
                    action.color || 'bg-primary text-primary-foreground'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: action.color || undefined,
                  }}
                >
                  {action.icon}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : icon}
      </motion.button>
    </div>
  );
}

interface MicroInteractionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MicroInteractionButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: MicroInteractionButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onClick?.();
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-primary text-primary-foreground',
    secondary: 'bg-muted text-foreground',
    ghost: 'bg-transparent border border-border hover:bg-muted',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`rounded-lg font-medium transition-all relative overflow-hidden ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      
      <AnimatePresence>
        {isClicked && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 6) * 30,
                  y: Math.sin((i * Math.PI * 2) / 6) * 30,
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

interface DepthLayerProps {
  children: ReactNode;
  depth: number;
  className?: string;
}

export function DepthLayer({ children, depth, className = '' }: DepthLayerProps) {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transform: `translateZ(${depth}px)`,
      }}
      initial={{ opacity: 0, z: -50 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

interface HoverRevealProps {
  trigger: ReactNode;
  content: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export function HoverReveal({ trigger, content, direction = 'top' }: HoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  const directionVariants = {
    top: { y: -10, x: 0 },
    bottom: { y: 10, x: 0 },
    left: { x: -10, y: 0 },
    right: { x: 10, y: 0 },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {trigger}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={{
              top: direction === 'top' ? 'auto' : direction === 'bottom' ? '100%' : '50%',
              bottom: direction === 'top' ? '100%' : 'auto',
              left: direction === 'left' ? 'auto' : direction === 'right' ? '100%' : '50%',
              right: direction === 'left' ? '100%' : 'auto',
              transform:
                direction === 'top' || direction === 'bottom'
                  ? 'translateX(-50%)'
                  : 'translateY(-50%)',
            }}
            initial={{ opacity: 0, ...directionVariants[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...directionVariants[direction] }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-card border border-border rounded-lg shadow-xl p-3 mt-2">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PulseRingProps {
  color?: string;
  size?: number;
  duration?: number;
}

export function PulseRing({ color = '#6366f1', size = 100, duration = 2 }: PulseRingProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border-2"
          style={{
            borderColor: color,
            width: size,
            height: size,
          }}
          animate={{
            scale: [1, 2, 2],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: index * (duration / 3),
            ease: 'easeOut',
          }}
        />
      ))}
      <div
        className="w-1/3 h-1/3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
