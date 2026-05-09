import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, ArrowUpRight, Activity,
  Brain, Bone, Waves, ShieldPlus, Footprints, Stethoscope, Baby, Dumbbell,
  type LucideIcon,
} from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '@/i18n/LanguageContext';

/* ─── Data ─────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1764314359427-6e685ce5b719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080';

type Category = 'All' | 'Clinical' | 'Home-based';

interface Indication {
  id: string;
  title: string;
  desc: string;
  img: string;
  icon: LucideIcon;
  category: Category | 'Clinical' | 'Home-based';
  learnMore: string;
}

const indications: Indication[] = [
  {
    id: 'stroke',
    title: 'Stroke Recovery',
    desc: 'Immersive motor-relearning protocols that rebuild neural pathways and restore upper-limb function after stroke.',
    img: 'https://images.unsplash.com/photo-1645005512942-a17817fb7c11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Brain,
    category: 'Clinical',
    learnMore: '#',
  },
  {
    id: 'orthopedic',
    title: 'Orthopedic Rehab',
    desc: 'Evidence-based post-operative programs for joint replacement, ACL reconstruction, and spinal recovery.',
    img: 'https://images.unsplash.com/photo-1609113160023-4e31f3765fd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Bone,
    category: 'Clinical',
    learnMore: '#',
  },
  {
    id: 'chronic-pain',
    title: 'Chronic Pain',
    desc: 'VR-assisted distraction therapy and AI-tailored exercise plans targeting persistent musculoskeletal pain.',
    img: 'https://images.unsplash.com/photo-1628282927926-e34b358864fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Waves,
    category: 'Home-based',
    learnMore: '#',
  },
  {
    id: 'neurological',
    title: 'Neurological Conditions',
    desc: "Adaptive movement programmes for Parkinson's disease, MS, and traumatic brain injury patients.",
    img: 'https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: ShieldPlus,
    category: 'Clinical',
    learnMore: '#',
  },
  {
    id: 'balance',
    title: 'Balance & Vestibular',
    desc: 'Progressive VR challenges that retrain proprioceptive systems and reduce fall risk in at-risk populations.',
    img: 'https://images.unsplash.com/photo-1756314354826-91d31d85634a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Footprints,
    category: 'Home-based',
    learnMore: '#',
  },
  {
    id: 'post-surgical',
    title: 'Post-surgical Recovery',
    desc: 'Seamlessly guided rehab journeys from hospital discharge through full return-to-activity milestones.',
    img: 'https://images.unsplash.com/photo-1646082275130-347d10885c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Stethoscope,
    category: 'Clinical',
    learnMore: '#',
  },
  {
    id: 'pediatric',
    title: 'Pediatric Therapy',
    desc: 'Playful, age-appropriate VR activities that improve motor skills and engagement in young patients.',
    img: 'https://images.unsplash.com/photo-1709127347878-1c333b2d7f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Baby,
    category: 'Home-based',
    learnMore: '#',
  },
  {
    id: 'sports',
    title: 'Sports Injury',
    desc: 'High-performance rehabilitation programmes designed to return athletes to peak competitive condition.',
    img: 'https://images.unsplash.com/photo-1713711437257-0232e837f40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    icon: Dumbbell,
    category: 'Clinical',
    learnMore: '#',
  },
];

const FILTERS: Array<'All' | 'Clinical' | 'Home-based'> = ['All', 'Clinical', 'Home-based'];

/* ─── Card ──────────────────────────────────────────────────────────── */
function IndicationCard({ indication, index }: { indication: Indication; index: number }) {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => navigate('/indications/' + indication.id)}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <ImageWithFallback
          src={indication.img}
          alt={indication.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-purple-700 rounded-full">
          {indication.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-black text-gray-900 mb-2">{indication.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
          {indication.desc}
        </p>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
          {t.indicationsPage.learnMore}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export function IndicationsPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Clinical' | 'Home-based'>('All');
  const translatedIndications = indications.map((indication, index) => ({ ...indication, ...t.indicationsPage.indications[index] }));

  const filtered =
    activeFilter === 'All'
      ? translatedIndications
      : translatedIndications.filter((i) => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100 pt-28 pb-0 overflow-hidden">
        {/* bg decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-blue-500 opacity-[0.05] rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 to-purple-500 opacity-[0.04] rounded-full blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
            <defs>
              <pattern id="grid-ind" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8B5CF6" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-ind)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {t.indicationsPage.back}
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-20">
            {/* Left: text */}
            <div>
              {/* Badge — matches SolutionPage accent badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.45 }}
              >
                <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-md mb-6">
                  <Activity size={14} className="text-purple-700" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
                    {t.indicationsPage.clinicalIndications}
                  </span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.05]"
              >
                <span className="block">{t.indicationsPage.titleLine1}</span>
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.indicationsPage.titleLine2}
                </span>
                <span className="block">{t.indicationsPage.titleLine3}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.55 }}
                className="text-lg text-gray-500 leading-relaxed max-w-lg mb-10"
              >
                {t.indicationsPage.subtitle}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/#contact')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-lg"
                >
                  {t.indicationsPage.requestDemo}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  {t.indicationsPage.exploreSolutions}
                </motion.button>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt="VR Rehabilitation"
                  className="w-full h-[420px] lg:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                {/* floating stat */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl border border-white/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                      <Activity size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-gray-900">8+</div>
                      <div className="text-xs text-gray-500 font-medium">{t.indicationsPage.clinicalIndications}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Indications Grid ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {t.indicationsPage.browseTitle}
              </h2>
              <p className="text-gray-500 leading-relaxed">
                {t.indicationsPage.browseSubtitle}
              </p>
            </motion.div>

            {/* Filter toggle — rounded-full pill style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="flex items-center gap-2 shrink-0"
            >
              {FILTERS.map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeFilter === f
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md shadow-purple-200'
                      : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  {f === 'All' ? t.indicationsPage.filters.all : f === 'Clinical' ? t.indicationsPage.filters.clinical : t.indicationsPage.filters.homeBased}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((indication, i) => (
                <IndicationCard key={indication.id} indication={indication} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View all link */}
          {activeFilter !== 'All' && filtered.length < indications.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter('All')}
                className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:border-purple-300 hover:shadow-lg transition-all inline-flex items-center gap-2 group"
              >
                {t.indicationsPage.viewAllIndications}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Stats Band ────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {t.indicationsPage.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
              {t.indicationsPage.howItWorks}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {t.indicationsPage.howItWorksSub}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.indicationsPage.steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 border-2 border-purple-200 mb-6">
                  <span className="text-purple-600 font-black text-sm">{item.step}</span>
                </div>
                <h3 className="font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              {t.indicationsPage.ctaTitle}
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t.indicationsPage.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
onClick={() => navigate('/demo')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-xl"
              >
                {t.indicationsPage.scheduleDemo}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2 group"
              >
                {t.indicationsPage.downloadSpecs}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}