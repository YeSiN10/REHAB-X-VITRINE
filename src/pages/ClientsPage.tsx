import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Building2, Users, CheckCircle2 } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/LanguageContext';
import clientsWorldMap from '@/assets/clients-world-map.png';
import partnerSahloul from '@/assets/partner-sahloul.jpg';
import partnerMedecine from '@/assets/partner-medecine-sousse.jpg';
import partnerKinesport from '@/assets/partner-kinesport.png';

const clients = [
  { name: 'Hôpital Sahloul Sousse', logo: partnerSahloul, desc: 'Leading public hospital in Sousse, Tunisia' },
  { name: 'Faculty of Medicine of Sousse', logo: partnerMedecine, desc: 'Renowned medical academic institution' },
  { name: 'Centre Kinesport de Physiothérapie', logo: partnerKinesport, desc: 'Sport & physiotherapy rehabilitation center' },
];

const globalLocations = [
  { name: 'Europe', offices: ['France'], count: 1 },
  { name: 'Africa', offices: ['Tunisia'], count: 1 },
];

const mapPulsePoints = [
  { x: 49.5, y: 31, delay: 0.2 },   // Paris
  { x: 51.2, y: 39, delay: 0.6 },   // Sousse
];

const stats = [
  { icon: Building2, value: '2,000+', label: 'Partner Clinics' },
  { icon: Users, value: '5,000+', label: 'Healthcare Professionals' },
  { icon: Globe, value: '40+', label: 'Countries Served' },
  { icon: CheckCircle2, value: '94%', label: 'Client Satisfaction' },
];

export function ClientsPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const translatedStats = stats.map((stat, index) => ({ ...stat, ...t.clientsPage.stats[index] }));

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
            {t.clientsPage.backToHome}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Building2 size={16} />
              {t.clientsPage.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 leading-tight">
              {t.clientsPage.titleLine1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.clientsPage.titleLine2}
              </span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t.clientsPage.subtitle}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {translatedStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all"
              >
                <div className="w-12 h-12 bg-purple-50 border-2 border-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="text-purple-600" size={22} strokeWidth={2} />
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.clientsPage.partnerTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.clientsPage.partnerSub}
            </p>
          </motion.div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 w-max"
            >
              {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 shrink-0 select-none group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-gray-100">
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                  </div>
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap tracking-tight">{client.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Globe size={16} />
              {t.clientsPage.globalBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.clientsPage.globalTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.clientsPage.globalTitle2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.clientsPage.globalSub}
            </p>
          </motion.div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <img
                src={clientsWorldMap}
                alt={t.clientsPage.globalMapAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {mapPulsePoints.map((point, index) => (
                  <motion.span
                    key={index}
                    className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: point.delay }}
                  >
                    <motion.span
                      className="absolute h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-40"
                      animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                      transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: point.delay }}
                    />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-[0_0_14px_rgba(139,92,246,0.75)] ring-2 ring-white" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regional Offices */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {globalLocations.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{region.name}</h3>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {region.count}
                  </span>
                </div>
                <div className="space-y-1">
                  {region.offices.map((office) => (
                    <div key={office} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {office}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                {t.clientsPage.becomePartnerTitle1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.clientsPage.becomePartnerTitle2}
                </span>
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t.clientsPage.becomePartnerSub}
              </p>
              <ul className="space-y-4 mb-8">
                {t.clientsPage.partnerBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
                whileTap={{ scale: 0.97 }}
onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#contact');
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-lg"
              >
                {t.clientsPage.applyPartnership}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 to-blue-300/40 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 md:p-10">
                  <div className="grid grid-cols-2 gap-6">
                    {t.clientsPage.partnerStats.map((stat, i) => (
                      <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-md">
                        <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              {t.clientsPage.ctaTitle1}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t.clientsPage.ctaTitle2}
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t.clientsPage.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/#contact')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-xl"
              >
                {t.clientsPage.contactUsToday}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                {t.clientsPage.learnMore}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
