import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer, fadeIn } from '@/lib/index';

export default function Depth() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // LAYERED PARALLAX EFFECT:
  // Far background: moves slowly
  // Mid-ground: moves medium
  // Foreground/Text: moves fast
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[300vh] bg-[#050505] overflow-hidden">
      {/* Background Layer (Far) */}
      <motion.div style={{ y: layer1Y }} className="fixed inset-0 w-full h-full z-0">
        <img
          src="/images/dark_forest_misty_cinematic_mysterious_6.jpeg"
          alt="Far Forest"
          className="w-full h-full object-cover brightness-[0.2] blur-[4px]"
        />
      </motion.div>

      {/* Mid Layer (Mist) */}
      <motion.div style={{ y: layer2Y }} className="fixed inset-0 w-full h-full z-10 opacity-40">
        <img
          src="/images/dark_forest_misty_cinematic_mysterious_2.jpeg"
          alt="Mist Layer"
          className="w-full h-full object-cover mix-blend-screen"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20">
        <motion.div
          style={{ y: layer3Y, opacity }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl px-8 text-center"
        >
          <motion.span variants={fadeIn} className="text-xs tracking-[0.6em] text-primary/40 font-mono uppercase block mb-6">
            Phase 02 — Depth
          </motion.span>
          <h2
            className="text-foreground font-light leading-none mb-10"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              letterSpacing: '0.05em',
            }}
          >
            THE SILENT <span className="italic text-primary/80">VOID</span>
          </h2>
          <motion.p variants={fadeUp} className="text-foreground/30 font-light text-xl leading-relaxed mx-auto max-w-2xl">
            Within the deep forest, time behaves differently. Every shadow is a story, and every silence is a weight. Layers of history, buried in mist.
          </motion.p>
        </motion.div>
      </div>

      {/* Foreground decorative "trees" or shadows */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['100%', '-100%']) }}
        className="fixed left-[-10%] top-0 w-[40%] h-full bg-gradient-to-r from-black to-transparent z-30 opacity-60"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['80%', '-120%']) }}
        className="fixed right-[-5%] top-0 w-[30%] h-full bg-gradient-to-l from-black to-transparent z-30 opacity-40"
      />
    </div>
  );
}
