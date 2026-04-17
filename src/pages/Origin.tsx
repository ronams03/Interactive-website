import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer, fadeIn } from '@/lib/index';

export default function Origin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // DOLLY ZOOM EFFECT:
  // Background zooms IN significantly (scale 1.0 -> 1.5)
  // Text zooms OUT slightly (scale 1.1 -> 0.95) to create perspective tension
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image - The "Dolly" */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full">
          <img
            src="/images/cinematic_dark_luxury_landscape_mountain_1.jpeg"
            alt="Origin"
            className="w-full h-full object-cover grayscale-[0.3] brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </motion.div>

        {/* Content - The "Zoom" */}
        <motion.div
          style={{ scale: textScale, opacity: textOpacity, y: textY }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center text-center px-8"
        >
          <motion.span
            variants={fadeIn}
            className="text-xs tracking-[0.5em] text-primary/60 font-mono uppercase mb-6"
          >
            Phase 01 — Origin
          </motion.span>
          <h1
            className="text-foreground font-light leading-none mb-8"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(3.5rem, 12vw, 12rem)',
              letterSpacing: '0.1em',
            }}
          >
            THE PEAK
          </h1>
          <motion.p
            variants={fadeUp}
            className="text-foreground/40 font-light max-w-xl leading-relaxed text-lg"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Everything begins at the summit. A singular point where the earth ceases to climb and the sky begins its infinite descent. Scroll to witness the tension of perspective.
          </motion.p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent" 
          />
        </motion.div>
      </div>

      {/* Floating detail elements for extra parallax depth */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute top-[80vh] left-[10%] w-32 h-px bg-primary/20" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
        className="absolute top-[120vh] right-[15%] w-px h-48 bg-primary/10" 
      />
    </div>
  );
}
