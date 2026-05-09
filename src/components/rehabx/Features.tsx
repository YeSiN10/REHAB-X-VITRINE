import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Brain, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';
import pcConsoleApplications from '@/assets/pc-console-applications.jpg';
import dashboardHero from '@/assets/dashboard-hero.png';
import mobileAppHome from '@/assets/mobile-app-home.png';
import { AnalyticsIllustration, TeamIllustration, SyncIllustration } from './StatsIllustrations';

const solutions = [
  {
    id: 'vr',
    icon: Headset,
    label: 'VR Immersive',
    badge: 'New',
    color: 'from-purple-600 to-violet-500',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    title: 'Engage the nervous system through immersive VR',
    description:
      'Reduce pain perception and boost engagement with therapeutic virtual environments tailored to each patient\'s rehabilitation journey. Our VR system adapts difficulty in real-time based on patient performance.',
    stats: [
      { value: '68%', label: 'pain reduction' },
      { value: '3×', label: 'engagement vs. traditional' },
    ],
    highlights: [
      'Real-time adaptive difficulty',
      'Biofeedback integration',
      '200+ therapeutic environments',
      'Offline-capable on device',
    ],
    image: pcConsoleApplications,
  },
  {
    id: 'mobile',
    icon: Brain,
    label: 'Mobile App',
    badge: null,
    color: 'from-blue-600 to-cyan-500',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    title: 'Take your rehabilitation journey everywhere',
    description:
      'Access guided exercises, track progress, and stay connected with your care team from anywhere. The RehabX mobile app brings your rehabilitation program to your fingertips.',
    stats: [
      { value: '50K+', label: 'Downloads' },
      { value: '4.8', label: 'App Rating' },
    ],
    highlights: [
      'Real-time progress tracking',
      'Smart exercise reminders',
      'Health data integration',
      'Secure & HIPAA compliant',
    ],
    image: mobileAppHome,
  },
  {
    id: 'tracking',
    icon: LayoutDashboard,
    label: 'Dashboard',
    badge: null,
    color: 'from-purple-600 to-violet-500',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    title: 'Your all-in-one rehabilitation control center',
    description:
      'Manage everything from a single, intuitive dashboard — patients, personnel, organizations, sessions, VR devices and applications. Stay in control of your entire practice in real-time.',
    stats: [
      { value: '1', label: 'unified platform' },
      { value: '100%', label: 'visibility' },
    ],
    highlights: [
      'Patients & personnel management',
      'Organizations & sessions overview',
      'VR devices & applications control',
      'Personalize your dashboard theme',
    ],
    image: dashboardHero,
  },
];

const quickFeatures = [
  { Illustration: AnalyticsIllustration, title: 'Analytics Dashboard', desc: 'Comprehensive session analytics and outcome reporting in one unified view.' },
  { Illustration: TeamIllustration, title: 'Team Collaboration', desc: 'Multidisciplinary care teams work together seamlessly on shared patient records.' },
  { Illustration: SyncIllustration, title: 'Instant Sync', desc: 'Patient data syncs in real-time across all clinician devices and locations.' },
];

export function Features() {
  const [activeTab, setActiveTab] = useState('vr');
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const translatedSolutions = solutions.map((solution) => ({
    ...solution,
    ...t.features.solutions[solution.id as keyof typeof t.features.solutions],
  }));
  const translatedQuickFeatures = quickFeatures.map((feature, index) => ({ ...feature, ...t.features.quickFeatures[index] }));

  const active = translatedSolutions.find((s) => s.id === activeTab)!;

  return (
    <section id="features" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
            {t.features.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
            {t.features.titleLine1}
            <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {t.features.titleLine2}
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Tabbed Solution Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          {/* Tab buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 p-1.5 bg-gray-100 rounded-2xl w-fit mx-auto">
            {translatedSolutions.map((sol) => (
              <motion.button
                key={sol.id}
                onClick={() => {
                  setActiveTab(sol.id);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === sol.id
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <sol.icon size={17} className={activeTab === sol.id ? 'text-purple-600' : ''} />
                {sol.label}
                {sol.badge && (
                  <span className="absolute -top-2 -right-1 text-[10px] bg-gradient-to-r from-purple-600 to-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    {sol.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Text side */}
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${active.bgLight} rounded-full mb-5`}>
                  <active.icon size={18} className="text-purple-700" />
                  <span className="text-sm font-semibold text-purple-700">{active.label}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {active.title}
                </h3>
                <p className="text-gray-500 mb-7 leading-relaxed">{active.description}</p>

                {/* Stats row */}
                <div className="flex gap-8 mb-8">
                  {active.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-8">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center flex-shrink-0">
                        <ChevronRight size={11} className="text-purple-600" strokeWidth={2.5} />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(139,92,246,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (active.id === 'mobile') {
                      navigate('/solutions/mobile');
                    } else {
                      navigate(`/solutions/${active.id}`);
                    }
                    window.scrollTo({ top: 0 });
                  }}
                  className={`px-7 py-3.5 bg-gradient-to-r ${active.color} text-white rounded-full font-bold flex items-center gap-2 group`}
                >
                  {t.features.exploreSolution}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Image side */}
              <div className="relative">
                <div className="absolute -inset-5 bg-gradient-to-br from-purple-200/50 via-white/30 to-blue-200/50 rounded-[2.25rem] blur-3xl" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-200/40 border-4 border-white/70 ring-1 ring-purple-200/50 backdrop-blur-sm p-2 bg-white/35"
                >
                  <img
                    src={active.image}
                    alt={active.label}
                    className="w-full h-72 object-cover object-center rounded-[1.5rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Quick feature cards at bottom */}
        <div className="grid md:grid-cols-3 gap-6">
          {translatedQuickFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-purple-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
              <div className="w-24 h-20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <feat.Illustration />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
