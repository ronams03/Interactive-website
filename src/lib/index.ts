// ─── Route Constants ─────────────────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: '/',
  ORIGIN: '/origin',
  DEPTH: '/depth',
  PULSE: '/pulse',
  ASCEND: '/ascend',
} as const;

// ─── Section IDs ─────────────────────────────────────────────────────────────
export const SECTION_IDS = {
  HERO: 'hero',
  MOUNTAINS: 'mountains',
  FOREST: 'forest',
  CITY: 'city',
  FINALE: 'finale',
} as const;

// ─── Nav Items ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Origin', path: ROUTE_PATHS.ORIGIN },
  { label: 'Depth', path: ROUTE_PATHS.DEPTH },
  { label: 'Pulse', path: ROUTE_PATHS.PULSE },
  { label: 'Ascend', path: ROUTE_PATHS.ASCEND },
];

// ─── Section Data ─────────────────────────────────────────────────────────────
export interface CinematicSection {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  zoomDirection: 'in' | 'out';
  textAlign: 'left' | 'right' | 'center';
  overlayGradient: string;
}

export const SECTIONS: CinematicSection[] = [
  {
    id: SECTION_IDS.MOUNTAINS,
    title: 'WHERE EARTH MEETS SKY',
    subtitle: 'Origin',
    body: 'Every great journey begins with the horizon. Mountains do not move — but they change everything that looks upon them.',
    image: '/images/cinematic_dark_luxury_landscape_mountain_1.jpeg',
    zoomDirection: 'in',
    textAlign: 'left',
    overlayGradient: 'from-background/80 via-background/40 to-transparent',
  },
  {
    id: SECTION_IDS.FOREST,
    title: 'SILENCE IS A LANGUAGE',
    subtitle: 'Depth',
    body: 'In the cathedral of ancient trees, every breath is a conversation. The mist does not conceal — it reveals what the eye cannot see.',
    image: '/images/dark_forest_misty_cinematic_mysterious_8.jpeg',
    zoomDirection: 'out',
    textAlign: 'right',
    overlayGradient: 'from-background/70 via-background/30 to-transparent',
  },
  {
    id: SECTION_IDS.CITY,
    title: 'A MILLION STORIES',
    subtitle: 'Pulse',
    body: 'Cities breathe in neon and rain. Every light a life, every shadow a chapter yet unwritten. The night is not the end — it is the beginning.',
    image: '/images/cinematic_dark_city_night_lights_fog_atm_3.jpeg',
    zoomDirection: 'in',
    textAlign: 'center',
    overlayGradient: 'from-background/90 via-background/50 to-transparent',
  },
];

// ─── Scroll utility ───────────────────────────────────────────────────────────
export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

// ─── Motion Variants ─────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

export const wordReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};
