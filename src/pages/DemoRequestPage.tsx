import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Shield, Zap, Users, ArrowRight, Calendar, Video, Phone, Building2, Mail, User, MessageSquare } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';

const benefits = [
  { icon: Video, title: 'Personalized Walkthrough', desc: '30-minute session tailored to your specialty' },
  { icon: Users, title: 'Expert Consultation', desc: 'Meet with our clinical specialists' },
  { icon: Zap, title: 'Quick Implementation', desc: 'See how fast you can start helping patients' },
];

const process = [
  { step: '01', title: 'Submit Request', desc: 'Fill out the form with your details' },
  { step: '02', title: 'Schedule Call', desc: 'Choose a time that works for you' },
  { step: '03', title: 'Live Demo', desc: 'Experience RehabX firsthand' },
];

export function DemoRequestPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    specialty: '',
    message: '',
    preferredTime: 'morning',
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="text-white" size={40} />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {t.demoPage.requestSubmitted}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t.demoPage.requestSubmittedSub}
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold inline-flex items-center gap-2 shadow-lg"
          >
            {t.demoPage.returnToHome}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-16 overflow-hidden">
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
            {t.demoPage.backToHome}
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
                <Calendar size={16} />
                {t.demoPage.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
                {t.demoPage.titleLine1}
                <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t.demoPage.titleLine2}
                </span>
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t.demoPage.subtitle}
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, i) => {
                  const copy = t.demoPage.benefits[i];
                  return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <benefit.icon className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-0.5">{copy.title}</h3>
                      <p className="text-sm text-gray-500">{copy.desc}</p>
                    </div>
                  </motion.div>
                )})}
              </div>
            </motion.div>

            {/* Demo Request Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-3xl blur-xl" />
                <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="John"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Smith"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john.smith@hospital.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Organization */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Organization
                        </label>
                        <div className="relative">
                          <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                            placeholder="General Hospital"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role & Specialty */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Role
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">{t.demoPage.selectRole}</option>
                          <option value="physiotherapist">{t.demoPage.roles.physiotherapist}</option>
                          <option value="neurologist">{t.demoPage.roles.neurologist}</option>
                          <option value="physician">{t.demoPage.roles.physician}</option>
                          <option value="hospital-admin">{t.demoPage.roles.hospitalAdmin}</option>
                          <option value="researcher">{t.demoPage.roles.researcher}</option>
                          <option value="other">{t.demoPage.roles.other}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Specialty
                        </label>
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">{t.demoPage.selectSpecialty}</option>
                          <option value="neurological">{t.demoPage.specialties.neurological}</option>
                          <option value="orthopedic">{t.demoPage.specialties.orthopedic}</option>
                          <option value="sports">{t.demoPage.specialties.sports}</option>
                          <option value="pediatric">{t.demoPage.specialties.pediatric}</option>
                          <option value="geriatric">{t.demoPage.specialties.geriatric}</option>
                          <option value="chronic-pain">{t.demoPage.specialties.chronicPain}</option>
                          <option value="cardiac">{t.demoPage.specialties.cardiac}</option>
                          <option value="other">{t.demoPage.specialties.other}</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Demo Time
                      </label>
                      <div className="flex gap-3">
                        {['morning', 'afternoon', 'evening'].map((time) => (
                          <label
                            key={time}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.preferredTime === time
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-purple-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preferredTime"
                              value={time}
                              checked={formData.preferredTime === time}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <Clock size={14} />
                            <span className="text-sm font-medium capitalize">{time === 'morning' ? t.demoPage.morning : time === 'afternoon' ? t.demoPage.afternoon : t.demoPage.evening}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder={t.demoPage.notesPlaceholder}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label className="text-xs text-gray-500 leading-relaxed">
                        {t.demoPage.agreeTerms}{' '}
                        <a href="#" className="text-purple-600 hover:underline">{t.demoPage.termsOfService}</a>
                        {' '}{t.demoPage.and}{' '}
                        <a href="#" className="text-purple-600 hover:underline">{t.demoPage.privacyPolicy}</a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: '0 16px 40px rgba(139,92,246,0.35)' }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          {t.demoPage.submitting}
                        </>
                      ) : (
                        <>
                          {t.demoPage.scheduleMyDemo}
                          <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              {t.demoPage.howItWorks}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.demoPage.howItWorksSub}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.demoPage.steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-6">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
                {i < t.demoPage.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-200 to-blue-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t.demoPage.trustedTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.demoPage.trustBadges.map((label, i) => {
                const BadgeIcon = [Shield, Shield, CheckCircle2, Users][i];
                return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm"
              >
                <BadgeIcon className="text-purple-600 mx-auto mb-3" size={28} />
                <p className="text-sm font-semibold text-gray-700">{label}</p>
              </motion.div>
            )})}
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
              {t.demoPage.ctaTitle1}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t.demoPage.ctaTitle2}
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t.demoPage.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-xl"
              >
                {t.demoPage.scheduleYourDemo}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/clients')}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                {t.demoPage.viewOurClients}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
