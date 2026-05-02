import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every route change:
 *  - If the URL has a hash (e.g. /#services), smooth-scroll to that section.
 *  - Otherwise, scroll to the top of the page (0, 0).
 * Works on mobile, tablet and desktop.
 */
const ScrollToHashOrTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Wait a tick so the target section is mounted (especially when navigating
      // from another route to "/#section").
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      };
      // Two RAFs ensure layout has settled after route mount.
      requestAnimationFrame(() => requestAnimationFrame(scroll));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHashOrTop;
