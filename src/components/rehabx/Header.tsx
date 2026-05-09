import { useState, useEffect, useRef } from 'react';
import rehabxLogoIcon from '@/assets/rehabx-logo-icon.png';
import { Menu, X, ArrowRight, Headset, Brain, LayoutDashboard, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafeNavigate, useSafeLocation } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';

/* ─── Solutions data for the mega-dropdown ────────────────────────── */
const solutionIcons = {
  vr: Headset,
  mobile: Brain,
  tracking: LayoutDashboard,
};

const solutionColors = {
  vr: { color: 'from-purple-600 to-violet-500', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
  mobile: { color: 'from-blue-600 to-cyan-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  tracking: { color: 'from-violet-600 to-purple-400', iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
};

const navLinks = [
  { label: 'about', section: 'about', external: 'https://inheritedgames.com/about/' },
];

/* ─── Header component ────────────────────────────────────────────── */
export function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setMobileOpen]    = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate  = useSafeNavigate();
  const location  = useSafeLocation();
  const isHome    = location.pathname === '/';

  /* scroll tracking */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (!isHome) return;
      const ids = ['features', 'about', 'clients', 'testimonials'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSolutions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = (id: string, externalUrl?: string) => {
    setMobileOpen(false);
    setShowSolutions(false);
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    } else if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const goToSolution = (id: string) => {
    setShowSolutions(false);
    setMobileOpen(false);
    navigate(`/solutions/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToIndications = () => {
    setMobileOpen(false);
    setShowSolutions(false);
    navigate('/indications');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToTestimonials = () => {
    setMobileOpen(false);
    setShowSolutions(false);
    navigate('/testimonials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToClients = () => {
    setMobileOpen(false);
    setShowSolutions(false);
    navigate('/clients');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDemo = () => {
    setMobileOpen(false);
    setShowSolutions(false);
    navigate('/demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const solutionItems = (['vr', 'mobile', 'tracking'] as const).map((id) => ({
    id,
    icon: solutionIcons[id],
    ...solutionColors[id],
    label: t.nav.solutionItems[id].label,
    desc: t.nav.solutionItems[id].desc,
  }));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-lg shadow-purple-100/30 border-b border-gray-100/80'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-center justify-center" style={{ width: 42, height: 42 }}>
              <img src={rehabxLogoIcon} alt="RX" className="object-contain" style={{ width: 42, height: 42 }} />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
              RehabX
            </span>
          </motion.div>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Solutions — with mega dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowSolutions((v) => !v)}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  showSolutions || location.pathname.startsWith('/solutions')
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {t.nav.solutions}
                <motion.span
                  animate={{ rotate: showSolutions ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 text-[10px]"
                >
                  ▾
                </motion.span>
                {(showSolutions || location.pathname.startsWith('/solutions')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                  />
                )}
              </button>

              {/* ── Mega menu ── */}
              <AnimatePresence>
                {showSolutions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[580px] bg-white rounded-2xl shadow-2xl shadow-purple-100/40 border border-gray-100 overflow-hidden"
                  >
                    {/* Top label */}
                    <div className="px-5 pt-4 pb-3 border-b border-gray-50">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        {t.nav.ourSolutions}
                      </p>
                    </div>

                    {/* Solution cards */}
                    <div className="p-3 grid grid-cols-1 gap-1">
                      {solutionItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            onClick={() => goToSolution(item.id)}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.15 }}
                            className="group flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 transition-colors text-left w-full"
                          >
                            <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon size={18} className={item.iconColor} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-gray-900 text-sm">{item.label}</span>
                              </div>
                              <p className="text-xs text-gray-500 leading-snug truncate">{item.desc}</p>
                            </div>
                            <ArrowUpRight
                              size={14}
                              className="text-gray-300 group-hover:text-purple-500 transition-colors shrink-0"
                            />
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Footer link */}
                    <div className="border-t border-gray-50 px-5 py-3 bg-gray-50/50">
                      <button
                        onClick={() => scrollTo('features')}
                        className="text-xs text-purple-600 font-semibold hover:underline flex items-center gap-1 group"
                      >
                        {t.nav.viewAllSolutions}
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Indications — dedicated route */}
            <button
              onClick={goToIndications}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                location.pathname === '/indications'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              {t.nav.indications}
              {location.pathname === '/indications' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                />
              )}
            </button>

            {/* Testimonials — dedicated route */}
            <button
              onClick={goToTestimonials}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                location.pathname === '/testimonials'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              {t.nav.testimonials}
              {location.pathname === '/testimonials' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                />
              )}
            </button>

            {/* Clients — dedicated route */}
            <button
              onClick={goToClients}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                location.pathname === '/clients'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              {t.nav.clients}
              {location.pathname === '/clients' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                />
              )}
            </button>

            {/* Regular nav links */}
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.section, link.external)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {t.nav.about}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 border-2 border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all duration-200"
            >
              <Globe size={14} />
              {lang === 'en' ? 'FR' : 'EN'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 border-2 border-purple-400 text-purple-600 rounded-full text-sm font-bold hover:bg-purple-50 transition-all duration-200"
            >
              {t.nav.contact}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={goToDemo}
              className="cta-primary cta-demo-contour flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-bold transition-all duration-200 group"
            >
              <span>{t.nav.requestDemo}</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {/* Language Toggle Mobile */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
              >
                <Globe size={16} className="text-purple-400" />
                {lang === 'en' ? 'Français' : 'English'}
              </button>

              <div className="border-t border-gray-100 my-2" />

              {/* Solutions group */}
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.nav.solutions}</div>
              {solutionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToSolution(item.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
                  >
                    <Icon size={16} className="text-purple-400" />
                    {item.label}
                  </button>
                );
              })}

              <div className="border-t border-gray-100 my-2" />

              {/* Indications */}
              <button
                onClick={goToIndications}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
              >
                {t.nav.indications}
              </button>

              {/* Other links */}
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.section, link.external)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
                >
                  {t.nav.about}
                </button>
              ))}

              {/* Testimonials */}
              <button
                onClick={goToTestimonials}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
              >
                {t.nav.testimonials}
              </button>

              {/* Clients */}
              <button
                onClick={goToClients}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all font-semibold"
              >
                {t.nav.clients}
              </button>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full py-3 border-2 border-purple-400 text-purple-600 rounded-full font-bold"
                >
                  {t.nav.contact}
                </button>
                <button
                  onClick={goToDemo}
                  className="cta-primary cta-demo-contour w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold"
                >
                  {t.nav.requestDemo}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
