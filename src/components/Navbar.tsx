import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (location.pathname === '/') {
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
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Cartoon Entertainers logo" className="h-9 w-9 sm:h-10 sm:w-10 rounded-md object-cover" />
          <span className="font-display text-sm sm:text-lg font-bold text-gradient-gold truncate max-w-[140px] sm:max-w-none">Cartoon Entertainers</span>
        </Link>

        {/* Desktop — hidden below lg (1024px) */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map(link => (
            <a
              key={link.to}
              href={link.to}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick(link);
                }
              }}
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
            </a>
          ))}
        </div>

        {/* Hamburger — visible below lg */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Left-side Sheet for mobile / tablet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded-md object-cover" />
              <span className="font-display text-lg font-bold text-gradient-gold">Cartoon Entertainers</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-6">
            {navLinks.map(link => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                  }
                  handleNavClick(link);
                }}
                className={`text-base font-medium transition-colors tracking-wide uppercase px-3 py-3 rounded-md ${
                  isActive(link)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
