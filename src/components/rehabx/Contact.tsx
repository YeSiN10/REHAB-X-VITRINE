import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Contact() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', clinic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', clinic: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToDemo = () => {
    navigate('/demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-50 to-blue-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA banner */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 rounded-3xl p-10 md:p-16 mb-20 overflow-hidden text-center"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              {t.contact.ctaTitle.split('\n').map((line, index) => (
                <span key={line} className={index > 0 ? 'block' : undefined}>{line}</span>
              ))}
            </h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              {t.contact.ctaSubtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={goToDemo}
              className="px-10 py-4 bg-white text-purple-700 font-black rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto group"
            >
              {t.contact.getDemo}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Contact form + info grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              {t.contact.badge}
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">
              {t.contact.formTitle}
            </h3>
            <p className="text-gray-500 mb-8">
              {t.contact.formSubtitle}
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t.contact.messageSent}</h4>
                <p className="text-gray-500">{t.contact.messageSentSub}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.labelName}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.placeholderName}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.labelEmail}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.placeholderEmail}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.labelClinic}</label>
                  <input
                    type="text"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    placeholder={t.contact.placeholderClinic}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.contact.labelMessage}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={t.contact.placeholderMessage}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(139,92,246,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center justify-center gap-2 group transition-all duration-300"
                >
                  {t.contact.sendMessage}
                  <Send className="group-hover:translate-x-1 transition-transform" size={18} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">{t.contact.contactInfo}</h3>
              <p className="text-gray-500">{t.contact.contactInfoSub}</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Mail, label: t.contact.emailLabel, value: t.contact.emailValue, sub: t.contact.emailSub },
                { icon: Phone, label: t.contact.phoneLabel, value: t.contact.phoneValue, sub: t.contact.phoneSub },
                { icon: MapPin, label: t.contact.officeLabel, value: t.contact.officeValue, sub: t.contact.officeSub },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-5 rounded-2xl hover:bg-purple-50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-purple-50 border-2 border-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="text-purple-600" size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{item.label}</div>
                    <div className="text-gray-700 text-sm">{item.value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <a
              href="https://www.google.com/maps/place/Sousse,+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden shadow-lg h-52 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <MapPin size={32} className="text-purple-400 mx-auto mb-2" />
                <p className="text-purple-600 font-semibold text-sm">{t.contact.officeValue}</p>
                <p className="text-purple-400 text-xs mt-1">{t.contact.openInMaps}</p>
              </div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580281657702-257584239a55?w=600&h=400&fit=crop')] bg-cover bg-center opacity-20" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}