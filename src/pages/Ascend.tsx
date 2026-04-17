import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, fadeIn, wordReveal } from '@/lib/index';

export default function Ascend() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // ASCEND EFFECT:
  // Blur-to-clear reveal on background
  // Floating particles moving UP as you scroll DOWN
  const blur = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div ref={ref} className="relative h-[200vh] bg-[#0a0a0f] overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        {/* Background Image - Ascending Reveal */}
        <motion.div style={{ filter: `blur(${blur}px)`, opacity, scale: bgScale }} className="absolute inset-0 w-full h-full">
          <img
            src="/images/cinematic_dark_luxury_landscape_mountain_9.jpeg"
            alt="Ascend"
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>

        {/* Floating Particles Layer */}
        <motion.div style={{ y: particleY }} className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/40 rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 150}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: Math.random() * 3 + 2, delay: Math.random() * 5 }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-8 flex flex-col items-center"
        >
          <motion.span variants={fadeIn} className="text-xs tracking-[1em] text-primary/70 font-mono uppercase mb-12">
            Final Phase — Ascend
          </motion.span>
          
          <div className="overflow-hidden mb-2">
            <motion.h2
              variants={wordReveal}
              className="text-foreground font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(3.5rem, 11vw, 11rem)',
                letterSpacing: '0.15em',
              }}
            >
              INFINITE
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              variants={wordReveal}
              className="text-primary font-light leading-none italic"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                letterSpacing: '0.1em',
              }}
            >
              sky
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="text-foreground/50 font-light text-xl max-w-2xl leading-relaxed mb-16">
            There is no destination, only the climb. At the threshold of the unknown, the light becomes the path.
          </motion.p>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05, letterSpacing: '0.6em' }}
            whileTap={{ scale: 0.95 }}
            className="text-xs tracking-[0.4em] uppercase border border-primary text-primary px-12 py-4 hover:bg-primary hover:text-background transition-all duration-500"
          >
            Reset Reality
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
