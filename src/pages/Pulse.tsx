import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer, fadeIn } from '@/lib/index';

export default function Pulse() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // PULSE EFFECT:
  // Chromatic aberration / RGB shift on scroll
  const xShift = useTransform(scrollYProgress, [0, 0.5, 1], [0, 4, 0]);
  const yShift = useTransform(scrollYProgress, [0, 0.5, 1], [0, -4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10]);

  return (
    <div ref={ref} className="relative h-[250vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Background Image with "Chromatic" feel */}
        <motion.div style={{ scale, filter: `blur(${blur}px)` }} className="absolute inset-0 w-full h-full">
          <img
            src="/images/cinematic_dark_city_night_lights_fog_atm_3.jpeg"
            alt="Pulse"
            className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
          />
          {/* Overlay RGB shifts */}
          <motion.div 
            style={{ x: xShift, opacity: 0.3 }}
            className="absolute inset-0 bg-red-500/10 mix-blend-screen pointer-events-none" 
          />
          <motion.div 
            style={{ x: -xShift, y: yShift, opacity: 0.3 }}
            className="absolute inset-0 bg-blue-500/10 mix-blend-screen pointer-events-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </motion.div>

        {/* Pulsing Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-8"
        >
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-xs tracking-[0.8em] text-primary font-mono uppercase block mb-8"
          >
            Phase 03 — Pulse
          </motion.span>
          
          <div className="relative">
            <h2
              className="text-foreground font-light leading-none mb-4"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(4rem, 14vw, 14rem)',
                letterSpacing: '0.02em',
              }}
            >
              CITY <span className="text-primary/90">BEAT</span>
            </h2>
            {/* "Ghost" text for flicker effect */}
            <motion.h2
              animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
              transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2, 0.3, 1] }}
              className="absolute inset-0 text-primary font-light leading-none pointer-events-none blur-sm"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(4rem, 14vw, 14rem)',
                letterSpacing: '0.02em',
              }}
            >
              CITY BEAT
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="text-foreground/40 font-light text-lg max-w-xl mx-auto leading-relaxed mt-10">
            The heart of the machine never sleeps. It breathes in neon pulses and exhales stories written in electric rain. Can you feel the vibration?
          </motion.p>
        </motion.div>
      </div>

      {/* Side HUD Elements */}
      <div className="fixed left-12 bottom-24 z-20 flex flex-col gap-4 font-mono text-[10px] tracking-[0.4em] text-primary/30 uppercase">
        <span>Signal: Strong</span>
        <span>Freq: 44.1kHz</span>
        <span>State: Active</span>
      </div>
    </div>
  );
}
