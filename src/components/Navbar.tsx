import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/', section: '' },
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Services', to: '/#services', section: 'services' },
  { label: 'Portfolio', to: '/#portfolio', section: 'portfolio' },
  { label: 'Process', to: '/#process', section: 'process' },
  { label: 'Testimonials', to: '/#testimonials', section: 'testimonials' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const sectionIds = navLinks.filter(l => l.section).map(l => l.section);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const topEntry = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(topEntry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (link.section) {
        const el = document.getElementById(link.section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(link.section);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('');
      }
    }
    setMobileOpen(false);
  };

  const isActive = (link: typeof navLinks[0]) => {
    if (!link.section) return activeSection === '' && location.pathname === '/';
    return activeSection === link.section;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Cartoon Entertainers logo" className="h-9 w-9 sm:h-10 sm:w-10 rounded-md object-cover" />
          <span className="font-display text-sm sm:text-xl font-bold text-gradient-gold truncate max-w-[160px] sm:max-w-none">Cartoon Entertainers</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-sm font-medium transition-colors tracking-wide uppercase relative py-1 ${
                isActive(link)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
              aria-current={isActive(link) ? 'page' : undefined}
            >
              {link.label}
              {isActive(link) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-medium transition-colors tracking-wide uppercase ${
                    isActive(link)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
