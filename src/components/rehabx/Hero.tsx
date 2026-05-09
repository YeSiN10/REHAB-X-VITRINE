import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Video, TrendingUp, Star } from 'lucide-react';
import { useRef } from 'react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';
import { VRDeviceModel } from './VRDeviceModel';

function ScaleCard() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1, duration: 0.7, ease: 'easeOut' }}
      className="absolute top-6 -left-10 bg-white rounded-2xl shadow-2xl shadow-purple-100/60 p-4 w-64 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500">{t.hero.discomfortScale}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="relative h-3 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full mb-2">
        <motion.div
          animate={{ left: ['30%', '60%', '45%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-md"
          style={{ left: '45%' }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </motion.div>
  );
}

function VideoCard() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
      className="absolute top-8 -right-8 bg-white rounded-2xl shadow-2xl shadow-blue-100/60 p-3 w-44 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600">{t.hero.startVideoCall}</span>
        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-[8px]">⚙</span>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center cursor-pointer"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Video className="text-white" size={16} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function AdherenceCard() {
  const { t } = useLanguage();
  const bars = [60, 80, 45, 90, 70, 85, 75];
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.4, duration: 0.7, ease: 'easeOut' }}
      className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-2xl shadow-purple-100/60 p-4 w-52 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-600">{t.hero.adherence}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 1.6 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="flex-1 rounded-sm"
            style={{
              background: i === bars.length - 2 ? 'linear-gradient(to top, #8B5CF6, #A78BFA)' : '#E9D5FF',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ActivityCard() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-purple-100/40 p-4 border border-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
          <Activity className="text-white" size={18} />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">{t.hero.recoveryScore}</div>
          <div className="flex items-center gap-1">
            <div className="text-lg font-black text-purple-600">94%</div>
            <TrendingUp size={14} className="text-green-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const navigate = useSafeNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const goToDemo = () => {
    navigate('/demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-blue-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [60, 0, 60] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/50 to-purple-100/30 rounded-full blur-3xl"
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold"
            >
              <Star size={14} className="fill-purple-500 text-purple-500" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-gray-900"
            >
              {t.hero.titleLine1}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full origin-left"
                />
              </span>
              <br />
              {t.hero.titleLine2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                onClick={goToDemo}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="cta-primary cta-demo-contour group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300"
              >
                {t.hero.requestDemo}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
              <motion.button
                onClick={scrollToAbout}
                whileHover={{ scale: 1.04, borderColor: '#8B5CF6' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                {t.hero.seeROI}
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {['https://i.pravatar.cc/40?img=1', 'https://i.pravatar.cc/40?img=5', 'https://i.pravatar.cc/40?img=9', 'https://i.pravatar.cc/40?img=12'].map((src, i) => (
                  <img key={i} src={src} alt="user" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">4.9/5</span> {t.hero.rating}</p>
              </div>
            </motion.div>
          </div>

          {/* Right - interactive VR device + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-300/45 via-white/30 to-blue-300/45 rounded-[2.5rem] blur-3xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-300/40 border-4 border-white/70 ring-1 ring-purple-200/50 backdrop-blur-sm p-2 bg-gradient-to-br from-white/80 via-purple-50/70 to-blue-50/70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.96),rgba(221,214,254,0.48)_42%,rgba(191,219,254,0.34)_74%)]" />
                <div className="absolute inset-x-12 bottom-8 h-20 rounded-full bg-purple-400/25 blur-2xl" />
                <div className="relative rounded-[1.5rem] overflow-hidden">
                  <VRDeviceModel />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-white/20" />
              </div>

              <ScaleCard />
              <VideoCard />
              <AdherenceCard />
              <ActivityCard />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
