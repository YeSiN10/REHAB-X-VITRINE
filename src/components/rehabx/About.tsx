import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Bone, Brain, Dumbbell, Heart, Baby, Stethoscope, Activity } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/LanguageContext';
import { WorldMapIllustration, PeopleIllustration, BarChartIllustration, DonutIllustration } from './StatsIllustrations';

function CountUp({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { Illustration: WorldMapIllustration, value: 2245341, suffix: '', label: 'Patients', sub: 'treated worldwide' },
  { Illustration: PeopleIllustration, value: 46328, suffix: '', label: 'Clinicians', sub: 'using the platform' },
  { Illustration: BarChartIllustration, value: 828867, suffix: '', label: 'Sessions', sub: 'completed this year' },
  { Illustration: DonutIllustration, value: 94, suffix: '%', label: 'Recovery Rate', sub: 'above baseline' },
];

const benefits = [
  'Evidence-based protocols validated by clinical research',
  '24/7 patient support & clinician helpdesk',
  'HIPAA & GDPR compliant data handling',
  'Seamless EMR/EHR integration (HL7, FHIR)',
];

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();
  const translatedStats = stats.map((stat, index) => ({ ...stat, ...t.about.stats[index] }));
  const translatedCards = t.about.cards.map((card, index) => ({ ...card, icon: [Bone, Brain, Activity, Dumbbell, Heart, Baby][index] }));

  return (
    <section id="about" className="pt-4 pb-14 md:pt-6 md:pb-20 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-50 to-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Banner */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {translatedStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1 leading-none">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-bold text-gray-800 text-sm">{stat.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.sub}</div>
                </div>
                <div className="w-16 h-14 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <stat.Illustration />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              {t.about.badge}
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
              {t.about.titleLine1}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {' '}{t.about.titleHighlight}
              </span>
            </h2>

            <p className="text-gray-500 mb-5 leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              {t.about.p2}
            </p>

            <ul className="space-y-4 mb-10">
              {t.about.benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{b}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(139,92,246,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold hover:shadow-xl transition-all duration-300"
            >
              {t.about.learnMore}
            </motion.button>
          </motion.div>

          {/* Right — indications cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {translatedCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl border-2 border-purple-300 bg-purple-50/50 flex items-center justify-center mb-3 group-hover:border-purple-500 group-hover:bg-purple-100/50 transition-all">
                    <Icon className="text-purple-600 group-hover:text-purple-700" size={24} strokeWidth={1.5} />
                  </div>
                  <div className="font-bold text-gray-900 text-sm leading-tight mb-1">{card.title}</div>
                  <div className="text-xs text-gray-500">{card.sub}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}