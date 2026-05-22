import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowLeft, Award, Users, Zap, Globe, HeartPulse, Trophy, Star } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';
import rehabxLogoIcon from '@/assets/rehabx-logo-icon.png';
import teamSelsebil from '@/assets/team-selsebil.jpg';
import teamRania from '@/assets/team-rania.jpg';
import teamFiras from '@/assets/team-firas.jpg';
import teamAsma from '@/assets/team-asma.jpg';
import teamNour from '@/assets/team-nour.jpg';
import teamMajed from '@/assets/team-majed.jpg';

const teamPhotos = [teamSelsebil, teamRania, teamFiras, teamAsma, teamNour, teamMajed];
const teamPhotoPos = ['50% 10%', '50% 15%', '50% 10%', '50% 85%', '50% 20%', '50% 15%'];
const teamGradients = [
  'from-purple-500 to-violet-600',
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-700',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
];

const achievementIcons = [Users, HeartPulse, Globe, Trophy, Zap, Star];
const achievementColors = [
  { color: 'text-violet-600', bg: 'bg-violet-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
  { color: 'text-violet-600', bg: 'bg-violet-50' },
];

export function AboutPage() {
  const navigate = useSafeNavigate();
  const [heroRef, heroInView]         = useInView({ threshold: 0.1 });
  const [teamRef, teamInView]         = useInView({ threshold: 0.05 });
  const [achRef, achInView]           = useInView({ threshold: 0.05 });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.05 });
  const { t } = useLanguage();
  const ap = t.aboutPage;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-blue-500 opacity-[0.05] rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 to-purple-500 opacity-[0.04] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {t.solutionPage.backToHome}
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div ref={heroRef} initial={{ opacity: 0, x: -40 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
                {ap.heroBadge}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-gray-900 leading-tight">
                {ap.heroTitle1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.heroTitleHighlight}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{ap.heroP1}</p>
              <p className="text-lg text-gray-500 leading-relaxed">
                {ap.heroP2} <span className="font-bold text-purple-700">Inherited Games Studio</span>{ap.heroP2b}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.9 }} animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-16 bg-gradient-to-br from-purple-300/30 via-blue-200/20 to-violet-300/30 rounded-full blur-3xl" />
                <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative">
                  <div className="w-64 h-64 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl shadow-purple-200/60 border-2 border-purple-100">
                    <img src={rehabxLogoIcon} alt="RehabX Logo" className="w-44 h-44 object-contain drop-shadow-xl" />
                  </div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -top-6 -right-6 bg-white rounded-2xl px-4 py-2 shadow-xl border border-purple-100">
                    <div className="text-xs font-bold text-gray-500">{ap.teamBadge}</div>
                    <div className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">6+</div>
                  </motion.div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -bottom-4 -left-8 bg-white rounded-2xl px-4 py-2 shadow-xl border border-blue-100">
                    <div className="text-xs font-bold text-gray-500">{ap.countriesBadge}</div>
                    <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">2</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={achRef} initial={{ opacity: 0, y: 30 }} animate={achInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Award size={16} />{ap.achievementsBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {ap.achievementsTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.achievementsTitle2}</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{ap.achievementsSub}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ap.achievements.map((ach, i) => {
              const Icon = achievementIcons[i];
              const style = achievementColors[i];
              return (
                <motion.div key={ach.label} initial={{ opacity: 0, y: 30 }} animate={achInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group p-8 bg-white border-2 border-gray-100 rounded-3xl hover:border-purple-200 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-14 h-14 ${style.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={style.color} />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">{ach.value}</div>
                  <div className="text-sm text-gray-500 font-medium leading-snug">{ach.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inherited Games Studio */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
                <Globe size={16} />{ap.studioBadge}
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900">
                {ap.studioTitle1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.studioTitle2}</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{ap.studioP1}</p>
              <p className="text-gray-500 leading-relaxed">{ap.studioP2}</p>
              <motion.a href="https://inheritedgames.com/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold text-sm shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow">
                {ap.visitStudio}<Globe size={16} />
              </motion.a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {ap.studioCards.map((card) => (
                <div key={card.label} className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">{card.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">{card.label}</div>
                  <div className="text-sm text-gray-500">{card.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={timelineRef} initial={{ opacity: 0, y: 30 }} animate={timelineInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Trophy size={16} />{ap.timelineBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {ap.timelineTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.timelineTitle2}</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-200 via-blue-200 to-purple-200 -translate-x-1/2" />
            <div className="space-y-10">
              {ap.milestones.map((m, i) => (
                <motion.div key={m.year + m.title} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="inline-block px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-black text-purple-700 mb-2">{m.year}</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 border-4 border-white shadow-lg shadow-purple-200 flex-shrink-0 mt-1" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={teamRef} initial={{ opacity: 0, y: 30 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Users size={16} />{ap.teamBadgeSection}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {ap.teamTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.teamTitle2}</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{ap.teamSub}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {ap.team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center text-center px-4 py-8 bg-white border-2 border-gray-100 rounded-3xl hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/40 transition-all duration-300">
                <div className="relative mb-6">
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${teamGradients[i]} opacity-80 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-300`} />
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src={teamPhotos[i]} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: teamPhotoPos[i] }} />
                  </div>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-purple-700 transition-colors leading-tight">{member.name}</h3>
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${teamGradients[i]} text-white shadow-sm`}>{member.role}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Trophy size={16} />{ap.ctaBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {ap.ctaTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{ap.ctaTitle2}</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">{ap.ctaSub}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/demo')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-black text-sm shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow">
                {ap.ctaSchedule}
              </motion.button>
              <motion.a href="https://inheritedgames.com/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-bold text-sm hover:border-purple-300 hover:text-purple-700 transition-colors">
                {ap.ctaVisit}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
