import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const contactIcons = [Mail, MessageCircle, Phone];
const contactColors = [
  { color: 'text-purple-600', bg: 'bg-purple-50' },
  { color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { color: 'text-violet-600', bg: 'bg-violet-50'  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-purple-200 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
        {open
          ? <ChevronUp size={20} className="text-purple-600 flex-shrink-0" />
          : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {faq.a}
        </div>
      )}
    </motion.div>
  );
}

export function HelpCenterPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const hp = t.helpPage;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {hp.backToHome}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <HelpCircle size={16} />
              {hp.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              {hp.title1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {hp.title2}
              </span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">{hp.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards + FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {hp.contactCards.map((card, i) => {
              const Icon = contactIcons[i];
              const style = contactColors[i];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={22} className="text-violet-600" />
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-1">{card.sub}</p>
                  <p className="text-xs text-gray-400">{card.note}</p>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {hp.faqTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {hp.faqTitle2}
              </span>
            </h2>
          </div>
          <div className="space-y-3">
            {hp.faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
