import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-gradient-gold">Cartoon Entertainers</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Creating unforgettable event experiences with premium decor, rentals, and custom design services.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'About Us', to: '/#about' },
                { label: 'Services', to: '/#services' },
                { label: 'Portfolio', to: '/#portfolio' },
                { label: 'Process', to: '/#process' },
                { label: 'Testimonials', to: '/#testimonials' },
                { label: 'Contact', to: '/#contact' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> 9611519412</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> Kovaicartoonentertainers@gmail.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Kavundampalyam office, Coimbatore 641030</div>
            </div>
          </div>

        </div>

        {/* Instagram Gallery Preview */}
        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="font-display text-lg font-semibold text-foreground mb-4 text-center">Follow Us on Instagram</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&h=200&fit=crop',
            ].map((src, i) => (
              <a key={i} href="#" className="aspect-square overflow-hidden rounded-md group">
                <img src={src} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cartoon Entertainers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
