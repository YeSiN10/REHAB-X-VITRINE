import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Play, X, LayoutDashboard, CheckCircle2,
  ArrowRight, Users, BarChart3, Zap, Shield,
} from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import dashboardHero from '@/assets/dashboard-hero.png';
import dashboardMainFeature from '@/assets/dashboard-main-feature.png';
import dashboardTheme from '@/assets/dashboard-theme.png';
import dashboardAiAssistant from '@/assets/dashboard-ai-assistant.png';
import dashboardDownload from '@/assets/dashboard-download.png';
import dashboardDemo from '@/assets/DashboardDemo.mp4';

const features = [
  { icon: Users,      title: 'Patients & Personnel',       desc: 'Manage records, profiles and roles across all your sites in one unified place.' },
  { icon: BarChart3,  title: 'Sessions & Analytics',       desc: 'Track every session with real-time charts and longitudinal progress reporting.' },
  { icon: Zap,        title: 'One-Click App Download',     desc: 'Push any VR application directly to a paired headset with a single click.' },
  { icon: Shield,     title: 'HIPAA & GDPR Compliant',    desc: 'End-to-end encryption and full audit logs for complete regulatory compliance.' },
];

const cards = [
  { title: 'Personalize Your Theme',     desc: 'Customize colors and layouts to match your practice identity.', img: dashboardTheme },
  { title: 'AI Assistant — RehabX',      desc: 'Ask questions, get summaries, and accelerate clinical decisions.', img: dashboardAiAssistant },
  { title: 'One-Click App Download',     desc: 'Deploy any app to any paired VR device instantly.', img: dashboardDownload },
];

export function DashboardDemoPage() {
  const navigate = useSafeNavigate();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative bg-white border-b border-gray-100 pt-28 pb-16 overflow-hidden">
          {/* bg blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600 to-purple-400 opacity-[0.06] rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-violet-600 to-purple-400 opacity-[0.04] rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
              <defs>
                <pattern id="grid-dd" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8B5CF6" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dd)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.5 }}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-4"
                >
                  Notre Plateforme
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.05]"
                >
                  <span className="block">RehabX</span>
                  <span className="block bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                    Dashboard.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.55 }}
                  className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl"
                >
                  Un centre de contrôle unifié conçu pour les cliniciens — gérez patients, personnel, organisations, sessions, appareils VR et applications, le tout dans un espace de travail intuitif.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowVideo(true)}
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-400 text-white rounded-full font-bold flex items-center gap-2 group shadow-lg"
                  >
                    <Play size={18} fill="white" />
                    Voir la démo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/demo')}
                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold hover:border-purple-300 hover:shadow-lg transition-all flex items-center gap-2 group"
                  >
                    Demander une démo
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right — hero image */}
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
            </div>
          </div>
        </section>

        {/* ── Video Demo Banner ─────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => setShowVideo(true)}
              className="relative bg-gradient-to-br from-violet-600 to-purple-400 rounded-3xl overflow-hidden h-72 flex items-center justify-center cursor-pointer group"
            >
              <img
                src={dashboardMainFeature}
                alt="dashboard demo"
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
                <p className="text-white font-bold text-xl">Regarder la démo produit</p>
                <p className="text-white/70 text-sm mt-1">Aperçu de 3 min</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Feature Section ───────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-md mb-6">
                  <LayoutDashboard size={14} className="text-violet-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700">Control Center</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Dashboard Main Feature</h2>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                  Centralisez la gestion de tout ce qui compte : patients, personnel, organisations, sessions, appareils VR et applications — depuis un tableau de bord élégant et intuitif.
                </p>

                <ul className="space-y-5 mb-10">
                  {[
                    { bold: 'Patients & Personnel :', rest: ' Gérez les dossiers, profils et rôles en un seul endroit.' },
                    { bold: 'Sessions & Appareils :', rest: ' Suivez les sessions et associez les casques VR sans effort.' },
                    { bold: 'Organisations & Apps :', rest: ' Supervisez plusieurs sites et la bibliothèque complète d\'applications.' },
                  ].map((spec, i) => (
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
                  {[{ value: 'All-in-1', label: 'Plateforme unifiée' }, { value: '100%', label: 'Visibilité' }, { value: '24/7', label: 'Contrôle temps réel' }].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">{s.value}</div>
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
                <div className="absolute inset-4 bg-gradient-to-br from-violet-600 to-purple-400 opacity-20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                  <img src={dashboardMainFeature} alt="Dashboard Feature" className="w-full h-[420px] object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Cards Gallery ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {cards.map((card, i) => (
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

        {/* ── Features Grid ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
                Tout ce dont vous avez
                <span className="block bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                  besoin.
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Une suite d'outils conçue pour maximiser l'efficacité clinique et la visibilité sur chaque patient.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="text-purple-600" size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                Prêt à transformer votre pratique ?
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                Planifiez une démonstration personnalisée avec notre équipe et découvrez le tableau de bord RehabX en action.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/demo')}
                  className="px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-400 text-white rounded-full font-bold flex items-center gap-2 group shadow-xl"
                >
                  Planifier une démo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/')}
                  className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
                >
                  Retour à l'accueil
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Dashboard Video Modal ────────────────────────────────── */}
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
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-2 border-violet-400/50 shadow-[0_0_60px_rgba(139,92,246,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={dashboardDemo}
                title="RehabX Dashboard Demo"
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
