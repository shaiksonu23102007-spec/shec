import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { navItems } from '../data/siteData';

const primaryNavItems = navItems.filter(({ path }) =>
  ['/', '/about', '/departments', '/admissions', '/contact'].includes(path)
);
const secondaryNavItems = navItems.filter(({ path }) =>
  !['/', '/about', '/departments', '/admissions', '/contact', '/student-login'].includes(path)
);

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pine-900/95 text-white shadow-lg backdrop-blur-xl">
      <div className="container mx-auto flex min-h-[76px] items-center justify-between gap-5">
        <Link to="/" className="group inline-flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="grid size-11 place-items-center rounded-xl bg-citrus font-display text-2xl text-ink transition-transform group-hover:-rotate-6">S</span>
          <span>
            <span className="block text-lg font-extrabold leading-tight tracking-[0.14em]">SHEC</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">College of Engineering</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `rounded-full px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/10 hover:text-white ${isActive ? 'bg-white/10 text-white' : 'text-white/72'}`}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-white/72 transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((open) => !open)}
            >
              Explore <ChevronDown size={15} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-3 grid w-52 gap-1 rounded-xl border border-ink/10 bg-white p-2 text-ink shadow-lift">
                {secondaryNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-pine-50 ${isActive ? 'bg-pine-50 text-pine-800' : 'text-ink/75'}`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <NavLink to="/student-login" className="inline-flex items-center gap-2 rounded-full bg-citrus px-4 py-2.5 text-xs font-extrabold text-ink transition-transform hover:-translate-y-0.5">
            Student Portal <ArrowUpRight size={15} />
          </NavLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 xl:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-pine-900 px-4 pb-5 pt-3 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-1.5 sm:grid-cols-3">
            {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
            >
              {item.name}
            </NavLink>
          ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
