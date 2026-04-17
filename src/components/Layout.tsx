import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, ROUTE_PATHS } from '@/lib/index';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-close menu and scroll to top on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || location.pathname !== '/'
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/40 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16">
          {/* Logo */}
          <Link
            to={ROUTE_PATHS.HOME}
            className="flex flex-col leading-none group"
          >
            <span
              className="text-xs tracking-[0.35em] text-primary/80 font-mono uppercase"
            >
              CINE
            </span>
            <span
              className="text-lg font-semibold tracking-[0.18em] text-foreground group-hover:text-primary transition-colors duration-300"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              SCROLL
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `text-xs tracking-[0.25em] uppercase transition-colors duration-300 font-light ${
                  isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={ROUTE_PATHS.ASCEND}
              className="text-xs tracking-[0.25em] uppercase border border-primary/40 text-primary px-5 py-2 hover:bg-primary/10 transition-all duration-300"
            >
              Ascend
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-foreground/80 hover:text-primary transition-colors duration-200"
            onClick={() => setMenuOpen((v: boolean) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
          <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `text-2xl tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-background border-t border-border/30 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs tracking-[0.35em] text-primary/60 font-mono">CINE</span>
            <span
              className="text-xl tracking-[0.15em] text-foreground/60"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              SCROLL
            </span>
          </div>
          <p className="text-xs text-foreground/30 tracking-widest font-mono">
            © {new Date().getFullYear()} — CINEMATIC PARALLAX EXPERIENCE
          </p>
          <div className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs tracking-[0.2em] uppercase text-foreground/30 hover:text-primary/60 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
