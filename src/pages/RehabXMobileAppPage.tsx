import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Smartphone, Play, Star, CheckCircle2, X, Gauge, ShieldCheck, Wifi, Activity, CalendarCheck, Headset } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useInView } from '@/hooks/useInView';
import rehabxLogo from '@/assets/rehabx-logo.png';
import appStoreBadge from '@/assets/app-store-badge.png';
import googlePlayBadge from '@/assets/google-play-badge.png';
import rehabxContainer from '@/assets/rehabx-container.png';
import vrDemoThumb from '@/assets/vr-demo-thumbnail.png';
import screenVrSession from '@/assets/screen-vr-session.png';
import screenHome from '@/assets/screen-home.png';
import screenCalendar from '@/assets/screen-calendar.png';
import { useLanguage } from '@/i18n/LanguageContext';

const features = [
  {
    icon: Gauge,
    title: 'Real-time Analytics',
    desc: 'Track your rehabilitation progress with detailed analytics, charts, and insights that update in real-time.',
    color: 'from-purple-600 to-blue-500',
  },
  {
    icon: Headset,
    title: 'VR Immersive Therapy',
    desc: 'Engage the nervous system through immersive VR environments that adapt to each patient\'s rehabilitation journey.',
    color: 'from-purple-600 to-blue-500',
  },
  {
    icon: ShieldCheck,
    title: 'Biometric Sync',
    desc: 'Connect with Apple Health, Google Fit, and wearables to automatically sync your health data and vitals.',
    color: 'from-purple-600 to-blue-500',
  },
  {
    icon: Activity,
    title: 'Smart Recovery Tracking',
    desc: 'AI-powered exercise tracking with real-time posture correction and performance feedback during sessions.',
    color: 'from-purple-600 to-blue-500',
  },
];

const appFeatures = [
  { icon: Gauge, text: 'Real-time Analytics Dashboard' },
  { icon: Headset, text: 'VR Immersive Therapy Sessions' },
  { icon: ShieldCheck, text: 'Biometric Device Integration' },
  { icon: Activity, text: 'Smart Recovery Tracking' },
  { icon: CheckCircle2, text: 'HIPAA Compliant Data Storage' },
  { icon: Smartphone, text: 'Offline Exercise Mode' },
];

const screenshots = [
  { title: 'VR Session', desc: 'Immersive guided VR rehabilitation', image: screenVrSession },
  { title: 'Home Page', desc: 'Your progress at a glance', image: screenHome },
  { title: 'Calendar', desc: 'Schedule & track your sessions', image: screenCalendar },
];

export function RehabXMobileAppPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const translatedFeatures = features.map((feature, index) => ({ ...feature, ...t.mobilePage.features[index] }));
  const translatedAppFeatures = appFeatures.map((feature, index) => ({ ...feature, text: t.mobilePage.appFeatures[index] }));
  const translatedScreenshots = screenshots.map((screenshot, index) => ({ ...screenshot, ...t.mobilePage.screenshots[index] }));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-blue-500 opacity-[0.05] rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 to-purple-500 opacity-[0.04] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {t.mobilePage.backToHome}
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
                <Smartphone size={16} />
                {t.mobilePage.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
                {t.mobilePage.titleLine1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.mobilePage.titleLine2}
                </span>
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t.mobilePage.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block"
                >
                  <img src={appStoreBadge} alt="Download on the App Store" className="h-12" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block"
                >
                  <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12" />
                </motion.a>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-800">4.8/5</div>
                  <div className="text-xs text-gray-500">{t.mobilePage.reviews}</div>
                </div>
              </div>
            </motion.div>

            {/* Phone Mockup - Container Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative flex justify-center"
            >
              <motion.img
                src={rehabxContainer}
                alt="RehabX Mobile App Screens"
                className="w-full max-w-[800px] lg:max-w-[900px] h-auto object-contain drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.mobilePage.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl"
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Tabs */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.mobilePage.featuresTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.mobilePage.featuresTitle2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.mobilePage.featuresSub}
            </p>
          </motion.div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {translatedFeatures.map((feature, i) => {
              const TabIcon = feature.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeFeature === i
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <TabIcon size={16} />
                  {feature.title}
                </motion.button>
              );
            })}
          </div>

          {/* Feature Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center shadow-xl">
                {(() => {
                  const FeatureIcon = translatedFeatures[activeFeature].icon;
                  return (
                    <>
                      <div className="w-20 h-20 bg-purple-50 border-2 border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FeatureIcon className="text-purple-600" size={36} strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4">{translatedFeatures[activeFeature].title}</h3>
                      <p className="text-gray-500 leading-relaxed">{translatedFeatures[activeFeature].desc}</p>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {translatedFeatures.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setActiveFeature(i)}
                  className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl ${
                    activeFeature === i ? 'border-purple-300 shadow-purple-100 shadow-lg' : 'border-gray-100 hover:border-purple-200'
                  }`}
                >
                  <div className="w-14 h-14 bg-purple-50 border-2 border-purple-200 rounded-xl flex items-center justify-center mb-5">
                    <FeatureIcon className="text-purple-600" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.mobilePage.seeAppTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.mobilePage.seeAppTitle2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.mobilePage.seeAppSub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-3xl blur-2xl" />
            <div className="relative aspect-video rounded-3xl overflow-hidden flex items-center justify-center group cursor-pointer" onClick={() => setShowVideoModal(true)}>
              <img src={vrDemoThumb} alt="RehabX VR Demo" className="absolute inset-0 w-full h-full object-cover" />
              {/* Thumbnail overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

              {/* Play Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50"
              >
                <Play size={32} className="text-white ml-1" fill="white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.mobilePage.screenshotsTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.mobilePage.screenshotsTitle2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.mobilePage.screenshotsSub}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {translatedScreenshots.map((screenshot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-[2.5rem] blur-xl group-hover:from-purple-300/50 group-hover:to-blue-300/50 transition-all duration-500" />
                  <motion.div
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-[2.5rem] p-3 overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-200/50 transition-shadow duration-500"
                  >
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-[500px] object-cover object-top rounded-[2rem] group-hover:brightness-105 transition-all duration-500"
                    />
                    <div className="absolute inset-3 rounded-[2rem] border-2 border-white/0 group-hover:border-white/40 transition-all duration-500" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">{screenshot.title}</h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300">{screenshot.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature List Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                {t.mobilePage.everythingTitle1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.mobilePage.everythingTitle2}
                </span>
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t.mobilePage.everythingSub}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {translatedAppFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-purple-600" size={18} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/50 to-blue-300/50 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 border border-purple-200">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: '50K+', label: 'Downloads' },
                    { value: '4.8', label: 'Rating' },
                    { value: '98%', label: 'Satisfaction' },
                    { value: '24/7', label: 'Support' },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                      <div className="text-3xl font-black mb-1 text-purple-600">{s.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-14 md:py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Download className="text-white" size={36} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              {t.mobilePage.downloadTitle1}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t.mobilePage.downloadTitle2}
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t.mobilePage.downloadSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <img src={appStoreBadge} alt="Download on the App Store" className="h-14" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-14" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play size={36} className="text-white ml-1" fill="white" />
                  </div>
                  <p className="text-white/60 text-sm">{t.mobilePage.videoComingSoon}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
