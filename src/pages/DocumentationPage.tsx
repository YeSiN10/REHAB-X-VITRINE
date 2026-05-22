import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Code2, Headset, LayoutDashboard, Smartphone, Search } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';

const sectionIcons = [BookOpen, Headset, LayoutDashboard, Smartphone, Code2, Search];
const sectionColors = [
  { color: 'from-purple-600 to-violet-500', bg: 'bg-purple-50',   iconColor: 'text-purple-600' },
  { color: 'from-blue-600 to-cyan-500',     bg: 'bg-blue-50',     iconColor: 'text-blue-600'   },
  { color: 'from-violet-600 to-purple-500', bg: 'bg-violet-50',   iconColor: 'text-violet-600' },
  { color: 'from-emerald-600 to-teal-500',  bg: 'bg-emerald-50',  iconColor: 'text-emerald-600'},
  { color: 'from-orange-500 to-amber-500',  bg: 'bg-orange-50',   iconColor: 'text-orange-600' },
  { color: 'from-rose-500 to-pink-500',     bg: 'bg-rose-50',     iconColor: 'text-rose-600'   },
];

export function DocumentationPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const dp = t.docsPage;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 to-blue-500 opacity-[0.05] rounded-full blur-3xl" />
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
            {dp.backToHome}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <BookOpen size={16} />
              {dp.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              {dp.title1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {dp.title2}
              </span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">{dp.subtitle}</p>
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={dp.searchPlaceholder}
                className="w-full pl-12 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dp.sections.map((section, i) => {
              const Icon = sectionIcons[i];
              const style = sectionColors[i];
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="text-violet-600" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">{section.title}</h2>
                  <ul className="space-y-2.5">
                    {section.articles.map((article) => (
                      <li key={article}>
                        <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex-shrink-0" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">{dp.cantFind}</p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold text-sm"
          >
            {dp.contactSupport}
          </button>
        </div>
      </section>
    </div>
  );
}
