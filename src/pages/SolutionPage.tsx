import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headset, Brain, LayoutDashboard,
  ArrowRight, ArrowLeft,
  CheckCircle2, Zap, Shield, BarChart3, Users, Play, X,
} from 'lucide-react';
import pcConsoleApplications from '@/assets/pc-console-applications.jpg';
import vrImmersiveDemo from '@/assets/vr-immersive-demo.mp4';
import dashboardHero from '@/assets/dashboard-hero.png';
import dashboardMainFeature from '@/assets/dashboard-main-feature.png';
import dashboardTheme from '@/assets/dashboard-theme.png';
import dashboardAiAssistant from '@/assets/dashboard-ai-assistant.png';
import dashboardDownload from '@/assets/dashboard-download.png';
import { useLanguage } from '@/i18n/LanguageContext';

/* ─── Solution data ──────────────────────────────────────────────────── */
const solutions = {
  vr: {
    id: 'vr',
    badge: 'Stationary Systems',
    badgeIcon: Headset,
    color: 'from-purple-600 to-violet-500',
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-700',
    accentBorder: 'border-purple-200',
    tagline: 'Our Ecosystem',
    title: 'Therapeutic VR\nSolutions.',
    subtitle:
      'From clinical-grade high-fidelity simulations to portable patient-side recovery. We bridge the gap between advanced technology and clinical results.',
    heroImage: pcConsoleApplications,
    featureTitle: 'PC & Console Applications',
    featureSubtitle:
      'Engineered for clinics and hospitals requiring the highest fidelity for neuro-rehabilitation and complex motor skill recovery.',
    specs: [
      { bold: 'Ultra-Low Latency:', rest: ' Sub-20ms motion-to-photon for minimal nausea risk.' },
      { bold: 'Biometric Integration:', rest: ' Native support for ECG, EEG, and EMG sensor arrays.' },
      { bold: 'Multi-User Sync:', rest: ' Local co-op therapy sessions with shared physical space.' },
    ],
    cards: [
      {
        title: 'Real-time Progress Tracking',
        desc: 'Visualize every micro-progress thanks to ultra-high-resolution movement capture.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
      {
        title: 'Adaptive Environments',
        desc: 'Over 200 immersive therapeutic environments that adapt to the patient\'s progress.',
        img: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
      {
        title: 'Biofeedback Integration',
        desc: 'Live biometric feedback keeps sessions safe and clinically measurable.',
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
    ],
    mobileTitle: 'Mobile & Standalone',
    mobileSubtitle:
      'Lightweight, cable-free solutions designed for daily maintenance and home-based physical therapy.',
    mobileFeatures: [
      { icon: Zap, title: 'Extreme Portability', desc: 'No external sensors required. Setup in under 60 seconds in any environment.' },
      { icon: Shield, title: 'Patient-Centric UI', desc: 'Large, high-contrast interface elements designed for limited dexterity.' },
      { icon: BarChart3, title: 'Tele-Rehab Ready', desc: 'Stream sessions live to your clinician for remote guidance and oversight.' },
    ],
    stats: [{ value: '68%', label: 'Pain reduction' }, { value: '3×', label: 'Engagement boost' }, { value: '200+', label: 'VR environments' }],
  },
  ai: {
    id: 'ai',
    badge: 'AI Engine',
    badgeIcon: Brain,
    color: 'from-blue-600 to-cyan-500',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-200',
    tagline: 'Our Intelligence',
    title: 'AI-Powered\nProtocols.',
    subtitle:
      'Machine learning that adapts rehabilitation pathways in real-time, delivering evidence-based protocols personalised to every patient\'s unique recovery journey.',
    heroImage: 'https://images.unsplash.com/photo-1666214280250-41f16ba24a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    featureTitle: 'Adaptive Protocol Engine',
    featureSubtitle:
      'Our ML model analyses thousands of data points per session to craft and continuously refine individualised rehabilitation programs.',
    specs: [
      { bold: 'Predictive Modelling:', rest: ' Forecasts recovery milestones with 91% accuracy.' },
      { bold: 'Evidence-Based:', rest: ' Protocols grounded in 50,000+ peer-reviewed studies.' },
      { bold: 'Clinician Override:', rest: ' Full manual control with one-click AI suggestions.' },
    ],
    cards: [
      {
        title: 'Personalised Programs',
        desc: 'Every patient receives a dynamically generated plan that evolves with their capabilities.',
        img: 'https://images.unsplash.com/photo-1711409664431-4e7914ac2370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
      {
        title: 'Risk Scoring',
        desc: 'AI flags re-injury risk before it becomes a clinical issue, alerting the care team instantly.',
        img: 'https://images.unsplash.com/photo-1758691463000-08b98131daf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
      {
        title: 'Outcome Analytics',
        desc: 'Comprehensive outcome dashboards benchmark each patient against population norms.',
        img: 'https://images.unsplash.com/photo-1666214280250-41f16ba24a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
      },
    ],
    mobileTitle: 'Clinician & Patient Apps',
    mobileSubtitle:
      'Seamless cross-device experience — clinicians manage protocols from any device, patients follow guided sessions at home.',
    mobileFeatures: [
      { icon: Users, title: 'Multi-disciplinary Teams', desc: 'Physios, doctors, and nurses collaborate on shared patient records in real-time.' },
      { icon: BarChart3, title: 'Progress Dashboards', desc: 'Visual progress charts motivate patients and inform clinical decisions.' },
      { icon: Shield, title: 'HIPAA & GDPR Compliant', desc: 'End-to-end encryption and audit logs for complete regulatory compliance.' },
    ],
    stats: [{ value: '40%', label: 'Faster recovery' }, { value: '92%', label: 'Adherence rate' }, { value: '91%', label: 'Milestone accuracy' }],
  },
  tracking: {
    id: 'tracking',
    badge: 'Control Center',
    badgeIcon: LayoutDashboard,
    color: 'from-violet-600 to-purple-400',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-700',
    accentBorder: 'border-violet-200',
    tagline: 'Our Platform',
    title: 'RehabX\nDashboard.',
    subtitle:
      'A unified control center built for clinicians — manage patients, personnel, organizations, sessions, VR devices and applications, all in one intuitive workspace.',
    heroImage: dashboardMainFeature,
    featureTitle: 'Dashboard Main Feature',
    featureSubtitle:
      'Centralize the management of everything that matters: patients, personnel, organizations, sessions, VR devices and applications — all from a single, beautifully designed dashboard.',
    specs: [
      { bold: 'Patients & Personnel:', rest: ' Manage records, profiles and roles in one place.' },
      { bold: 'Sessions & Devices:', rest: ' Track sessions and pair VR headsets seamlessly.' },
      { bold: 'Organizations & Apps:', rest: ' Oversee multiple sites and the full app library.' },
    ],
    cards: [
      {
        title: 'Personalize Your Dashboard Theme',
        desc: 'Customize colors, themes and layout to match your practice and personal style.',
        img: dashboardTheme,
      },
      {
        title: 'AI Assistant RehabX',
        desc: 'A built-in generative AI assistant that answers questions and helps you work faster.',
        img: dashboardAiAssistant,
      },
      {
        title: 'One-Click App Download',
        desc: 'Download any application directly to a paired VR device with a single click.',
        img: dashboardDownload,
      },
    ],
    mobileTitle: 'Anywhere Capture',
    mobileSubtitle:
      'One smartphone camera is all you need — full clinical-grade motion analysis deployable in any environment.',
    mobileFeatures: [
      { icon: Zap, title: 'Sensor-Free Setup', desc: 'Computer vision runs on standard hardware — no wearables or calibration required.' },
      { icon: BarChart3, title: 'Longitudinal Charts', desc: 'Automatic session-over-session progress charting with trend analysis.' },
      { icon: Shield, title: 'Offline Mode', desc: 'Continue capturing even without internet — data syncs automatically when reconnected.' },
    ],
    stats: [{ value: 'All-in-1', label: 'Unified platform' }, { value: '100%', label: 'Visibility' }, { value: '24/7', label: 'Real-time control' }],
  },
};

/* ─── Component ──────────────────────────────────────────────────────── */
export function SolutionPage() {
  const [showVideo, setShowVideo] = useState(false);
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const baseSol = solutions[solutionId as keyof typeof solutions];
  const translatedSol = t.solutionPage[solutionId as 'vr' | 'ai' | 'tracking'];
  const sol = baseSol && translatedSol ? {
    ...baseSol,
    ...translatedSol,
    cards: baseSol.cards.map((card, index) => ({ ...card, ...translatedSol.cards[index] })),
    mobileFeatures: baseSol.mobileFeatures.map((feature, index) => ({ ...feature, ...translatedSol.mobileFeatures[index] })),
  } : undefined;

  if (!sol) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4">{t.solutionPage.solutionNotFound}</h1>
          <button onClick={() => navigate('/')} className="text-purple-600 font-semibold flex items-center gap-2 mx-auto">
            <ArrowLeft size={18} /> {t.solutionPage.backToHome}
          </button>
        </div>
      </div>
    );
  }

  const BadgeIcon = sol.badgeIcon;

    return (
    <>
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100 pt-28 pb-16 overflow-hidden">
        {/* Subtle bg blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br ${sol.color} opacity-[0.06] rounded-full blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr ${sol.color} opacity-[0.04] rounded-full blur-3xl`} />
          {/* grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="grid-sol" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8B5CF6" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-sol)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.solutionPage.back}
          </motion.button>

          <div className={`grid ${(sol.id === 'vr' || sol.id === 'tracking') ? 'lg:grid-cols-2 gap-12 items-center' : 'max-w-3xl'}`}>
            <div>
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className={`text-xs font-bold uppercase tracking-[0.2em] ${sol.accentText} mb-4`}
            >
              {sol.tagline}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.05]"
            >
              {sol.title.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? `bg-gradient-to-r ${sol.color} bg-clip-text text-transparent block` : 'block'}>
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl"
            >
              {sol.subtitle}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/#contact')}
                className={`px-8 py-4 bg-gradient-to-r ${sol.color} text-white rounded-full font-bold flex items-center gap-2 group shadow-lg`}
              >
                {t.solutionPage.requestDemo}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:border-purple-300 hover:shadow-lg transition-all"
              >
                {t.solutionPage.seeAllSolutions}
              </motion.button>
            </motion.div>
            </div>

            {/* Right side media - VR video or Tracking image */}
            {sol.id === 'vr' && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <div className="absolute -inset-3 rounded-3xl border-2 border-purple-300/50 shadow-[0_0_40px_rgba(139,92,246,0.25),0_0_80px_rgba(139,92,246,0.1)]" />
                <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(139,92,246,0.3)] border border-purple-200/60">
                  <video
                    src={vrImmersiveDemo}
                    poster={pcConsoleApplications}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}

            {sol.id === 'tracking' && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-3 rounded-3xl border-2 border-purple-300/50 shadow-[0_0_40px_rgba(139,92,246,0.25),0_0_80px_rgba(139,92,246,0.1)]" />
                <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(139,92,246,0.3)] border border-purple-200/60">
                  <img
                    src={dashboardHero}
                    alt="RehabX Dashboard"
                    className="w-full h-[320px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Feature Section ────────────────────────────────────────── */}
      <section className={`py-16 md:py-24 bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 ${sol.accentBg} border ${sol.accentBorder} px-3 py-1.5 rounded-md mb-6`}>
                <BadgeIcon size={14} className={sol.accentText} />
                <span className={`text-xs font-bold uppercase tracking-wider ${sol.accentText}`}>{sol.badge}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{sol.featureTitle}</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">{sol.featureSubtitle}</p>

              {/* Specs list */}
              <ul className="space-y-5 mb-10">
                {sol.specs.map((spec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={20} className="text-purple-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700">
                      <span className="font-bold">{spec.bold}</span>
                      {spec.rest}
                    </p>
                  </motion.li>
                ))}
              </ul>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {sol.stats.map((s) => (
                  <div key={s.label}>
                    <div className={`text-3xl font-black bg-gradient-to-r ${sol.color} bg-clip-text text-transparent`}>{s.value}</div>
                    <div className="text-sm text-gray-500 font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className={`absolute inset-4 bg-gradient-to-br ${sol.color} opacity-20 rounded-3xl blur-2xl`} />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                <img src={sol.heroImage} alt={sol.featureTitle} className="w-full h-[420px] object-cover object-center" />
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cards Gallery ──────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {sol.cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile / Secondary System Section (only for AI) ─────── */}
      {sol.id === 'ai' && (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className={`absolute -inset-8 bg-gradient-to-br ${sol.color} opacity-10 rounded-full blur-3xl`} />
                <div className="relative w-56 bg-white rounded-[3rem] shadow-2xl border-4 border-gray-200 overflow-hidden">
                  <div className="h-6 bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
                  </div>
                  <div className="p-3 space-y-2.5">
                    <div className={`h-28 bg-gradient-to-br ${sol.color} rounded-2xl flex items-center justify-center`}>
                      <BadgeIcon size={36} className="text-white opacity-80" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 bg-gray-200 rounded-full" />
                      <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`h-10 bg-gradient-to-br ${sol.color} opacity-${20 + i * 20} rounded-lg`} />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${sol.color} opacity-60`} />
                          <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-8 bg-gray-50 flex items-center justify-center">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400 font-semibold mt-4">Mobile Companion Interface</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={`inline-flex items-center gap-2 ${sol.accentBg} border ${sol.accentBorder} px-3 py-1.5 rounded-md mb-6`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${sol.accentText}`}>Portable Systems</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{sol.mobileTitle}</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">{sol.mobileSubtitle}</p>

              <div className="space-y-6">
                {sol.mobileFeatures.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.45 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{feat.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ── Video / Demo Section ───────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative bg-gradient-to-br ${sol.color} rounded-3xl overflow-hidden h-72 flex items-center justify-center cursor-pointer group`}
          >
            <img
              src={sol.heroImage}
              alt="demo"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
            <div className="relative text-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Play className="text-white fill-white ml-1.5" size={30} />
              </motion.div>
              <p className="text-white font-bold text-xl">{t.solutionPage.watchProductDemo}</p>
              <p className="text-white/70 text-sm mt-1">{t.solutionPage.threeMinOverview}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Footer ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              {t.solutionPage.readyToTransform}
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              {t.solutionPage.scheduleDemoSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
onClick={() => navigate('/demo')}
                className={`px-10 py-4 bg-gradient-to-r ${sol.color} text-white rounded-full font-bold flex items-center gap-2 group shadow-xl`}
              >
                {t.solutionPage.scheduleDemo}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                {t.solutionPage.downloadSpecs}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

      {/* ── YouTube Video Popup ─────────────────────────────────────── */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-[0_0_60px_rgba(139,92,246,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={vrImmersiveDemo}
                title="RehabX VR Demo"
                controls
                autoPlay
                playsInline
                className="w-full h-full bg-black"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}