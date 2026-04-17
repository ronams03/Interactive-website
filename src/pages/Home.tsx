import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from 'framer-motion';
import {
  SECTION_IDS,
  SECTIONS,
  scrollToSection,
  staggerContainer,
  wordReveal,
  fadeUp,
  slideLeft,
  slideRight,
  fadeIn,
} from '@/lib/index';
import { ChevronDown } from 'lucide-react';

// ─── Parallax Image Section ───────────────────────────────────────────────────

interface ParallaxSectionProps {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  zoomDirection: 'in' | 'out';
  textAlign: 'left' | 'right' | 'center';
  overlayGradient: string;
  index: number;
}

function ParallaxSection({
  id,
  title,
  subtitle,
  body,
  image,
  zoomDirection,
  textAlign,
  overlayGradient,
  index,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Zoom: zoom-in → scale from 1.0 to 1.25; zoom-out → 1.25 to 1.0
  const scaleRange: [number, number] =
    zoomDirection === 'in' ? [1.0, 1.28] : [1.28, 1.0];
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  // Parallax vertical offset
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const isInView = useInView(ref, { once: true, margin: '-15%' });

  const textVariants =
    textAlign === 'right' ? slideRight : textAlign === 'left' ? slideLeft : fadeUp;

  const alignClass =
    textAlign === 'left'
      ? 'items-start text-left'
      : textAlign === 'right'
      ? 'items-end text-right'
      : 'items-center text-center';

  return (
    <section
      ref={ref}
      id={id}
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ scale, y }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${overlayGradient} z-10`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-10" />

      {/* Text Content */}
      <div
        className={`relative z-20 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col ${alignClass} gap-5`}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`flex flex-col ${alignClass} gap-4`}
        >
          {/* Subtitle / Index */}
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <span className="text-xs tracking-[0.4em] text-primary/70 font-mono uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-12 h-px bg-primary/40" />
            <span className="text-xs tracking-[0.35em] text-primary/70 font-mono uppercase">
              {subtitle}
            </span>
          </motion.div>

          {/* Main Title — word by word */}
          <div className="overflow-hidden">
            <motion.h2
              variants={textVariants}
              className="font-light text-foreground leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2.4rem, 6vw, 6.5rem)',
                letterSpacing: '0.06em',
              }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Body Text */}
          <motion.p
            variants={fadeUp}
            className="text-foreground/60 font-light leading-relaxed max-w-md"
            style={{ fontFamily: '"Inter", sans-serif', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
          >
            {body}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-primary/50 z-30"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />
    </section>
  );
}

// ─── Scroll Progress Ticker ───────────────────────────────────────────────────

function ScrollTicker({ progress }: { progress: MotionValue<number> }) {
  const displayed = useTransform(progress, (v) => Math.round(v * 100));
  return (
    <motion.span className="tabular-nums">
      {displayed}
    </motion.span>
  );
}

// ─── Finale Section ───────────────────────────────────────────────────────────

function FinaleSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id={SECTION_IDS.FINALE}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ scale, y }}
      >
        <img
          src="/images/cinematic_dark_luxury_landscape_mountain_9.jpeg"
          alt="Finale"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-background/70 z-10"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center gap-8 px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={fadeIn}
            className="text-xs tracking-[0.5em] text-primary/60 font-mono uppercase"
          >
            04 — Ascend
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              variants={wordReveal}
              className="text-foreground font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                letterSpacing: '0.08em',
              }}
            >
              THE JOURNEY
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={wordReveal}
              className="text-primary/80 font-light leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 7vw, 7.5rem)',
                letterSpacing: '0.05em',
              }}
            >
              Never Ends
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-foreground/50 font-light leading-relaxed max-w-sm mt-2"
            style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem' }}
          >
            Beyond every horizon lies another. The world is deeper than any single story can tell.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 mt-4">
            <button
              onClick={() => scrollToSection(SECTION_IDS.HERO)}
              className="text-xs tracking-[0.3em] uppercase border border-primary/50 text-primary px-8 py-3 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Start Over
            </button>
            <button
              onClick={() => scrollToSection(SECTION_IDS.MOUNTAINS)}
              className="text-xs tracking-[0.3em] uppercase bg-primary/20 border border-primary/30 text-primary/80 px-8 py-3 hover:bg-primary/30 transition-all duration-300"
            >
              Explore
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Whole-page scroll progress for the ticker
  const { scrollYProgress: pageProgress } = useScroll();

  return (
    <section
      ref={ref}
      id={SECTION_IDS.HERO}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Video / Fallback Background ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: heroScale, y: heroY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/cinematic_dark_luxury_landscape_mountain_4.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Falls back to poster image if no mp4 is available */}
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark cinematic vignette */}
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </motion.div>

      {/* ── Hero Text ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-6 px-8"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: '1em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-xs text-primary/60 font-mono uppercase"
        >
          A CINEMATIC EXPERIENCE
        </motion.span>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-light text-foreground leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(3.5rem, 11vw, 13rem)',
              letterSpacing: '0.08em',
            }}
          >
            BEYOND
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
            className="font-light leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 8vw, 9rem)',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
            }}
          >
            the horizon
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.4 }}
          className="text-foreground/50 font-light max-w-sm leading-relaxed"
          style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', letterSpacing: '0.03em' }}
        >
          Scroll to begin a journey through light, depth, and shadow
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={() => scrollToSection(SECTION_IDS.MOUNTAINS)}
          className="mt-4 flex flex-col items-center gap-2 text-foreground/30 hover:text-primary/70 transition-colors duration-300 group"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* ── Scroll Progress Ticker ── */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 font-mono text-xs text-primary/40 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <ScrollTicker progress={pageProgress} />
        <span className="ml-0.5">%</span>
      </motion.div>

      {/* ── Side Label ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 bottom-12 z-20 hidden md:flex flex-col items-center gap-3"
        style={{ opacity: heroOpacity }}
      >
        <div className="w-px h-16 bg-foreground/20" />
        <span
          className="text-xs text-foreground/30 tracking-[0.3em] uppercase font-mono"
          style={{ writingMode: 'vertical-rl' }}
        >
          Cinematic Parallax
        </span>
      </motion.div>
    </section>
  );
}

// ─── Interlude / Text Break ───────────────────────────────────────────────────

function TextInterlude({ number, quote, author }: { number: string; quote: string; author: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div ref={ref} className="relative z-10 bg-background py-32 px-8 md:px-24 flex flex-col items-center text-center gap-6">
      <motion.span
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-xs tracking-[0.4em] text-primary/40 font-mono"
      >
        — {number} —
      </motion.span>
      <div className="overflow-hidden max-w-3xl">
        <motion.blockquote
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-foreground/70 font-light leading-relaxed"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
            letterSpacing: '0.02em',
          }}
        >
          "{quote}"
        </motion.blockquote>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-xs tracking-[0.3em] text-foreground/30 uppercase font-mono"
      >
        — {author}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-24 h-px bg-primary/30 origin-left"
      />
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-background">
      {/* 01 — Hero with video */}
      <HeroSection />

      {/* Interlude 1 */}
      <TextInterlude
        number="PRELUDE"
        quote="Not all those who wander are lost. Some are simply paying attention."
        author="J.R.R. Tolkien"
      />

      {/* 02 — Mountains: Zoom IN */}
      <ParallaxSection
        {...SECTIONS[0]}
        index={0}
      />

      {/* Interlude 2 */}
      <TextInterlude
        number="INTERLUDE I"
        quote="The mountains are calling, and I must go."
        author="John Muir"
      />

      {/* 03 — Forest: Zoom OUT */}
      <ParallaxSection
        {...SECTIONS[1]}
        index={1}
      />

      {/* Interlude 3 */}
      <TextInterlude
        number="INTERLUDE II"
        quote="In every walk with nature, one receives far more than he seeks."
        author="John Muir"
      />

      {/* 04 — City Night: Zoom IN */}
      <ParallaxSection
        {...SECTIONS[2]}
        index={2}
      />

      {/* 05 — Finale */}
      <FinaleSection />
    </main>
  );
}
