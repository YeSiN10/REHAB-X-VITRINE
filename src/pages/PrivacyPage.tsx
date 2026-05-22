import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';

const sectionIcons = [Database, Eye, Lock, Globe, Shield, Mail];

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you use the RehabX platform, including:\n\n• **Account information**: name, email address, password, professional role, clinic/organization name.\n• **Patient data**: rehabilitation session records, progress data, exercise history, and biometric measurements — collected and stored on behalf of healthcare providers.\n• **Usage data**: device information, IP addresses, browser type, pages visited, and interaction logs within the platform.\n• **Communications**: messages you send to our support team or through the platform.\n\nWe collect this information to provide, improve, and secure our services, and to comply with applicable healthcare regulations.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `RehabX uses collected information for the following purposes:\n\n• **Service delivery**: to operate, maintain, and improve the RehabX platform, VR environments, and mobile application.\n• **Clinical outcomes**: to power AI-driven protocol recommendations and outcome analytics.\n• **Communications**: to respond to support requests, send product updates, and deliver newsletters (with your consent).\n• **Security & compliance**: to detect fraud, ensure platform integrity, and comply with HIPAA, GDPR, and other applicable laws.\n• **Analytics**: to understand how the platform is used and improve user experience — all analytics data is anonymized.`,
  },
  {
    title: '3. Data Security',
    content: `The security of your data is paramount to us. We implement industry-leading measures including:\n\n• **End-to-end encryption**: all data transmitted between clients and RehabX servers is encrypted using TLS 1.3.\n• **At-rest encryption**: patient records and session data are encrypted at rest using AES-256.\n• **Access controls**: role-based access control (RBAC) ensures data is only accessible to authorized personnel.\n• **Audit logs**: comprehensive audit trails are maintained for all access to patient data.\n• **Regular audits**: we conduct regular third-party security audits and penetration testing.`,
  },
  {
    title: '4. HIPAA & GDPR Compliance',
    content: `RehabX is designed to support compliance with major healthcare data regulations:\n\n• **HIPAA**: RehabX operates as a Business Associate under HIPAA and signs Business Associate Agreements (BAA) with all covered entities. We implement all required administrative, physical, and technical safeguards.\n• **GDPR**: for users in the European Economic Area, we provide rights of access, rectification, erasure, and data portability. We have appointed a Data Protection Officer (DPO) and maintain records of processing activities.\n• **Data residency**: enterprise clients may select their preferred data storage region.`,
  },
  {
    title: '5. Data Retention & Deletion',
    content: `We retain data only as long as necessary:\n\n• **Account data**: retained for the duration of your subscription and up to 90 days after account termination.\n• **Patient data**: retained as configured by your clinic, subject to applicable legal retention requirements.\n• **Deletion requests**: you may request deletion of your personal data at any time by contacting privacy@rehabx.com. Requests will be processed within 30 days.\n• **Anonymized analytics**: aggregated, anonymized usage data may be retained indefinitely for product improvement.`,
  },
  {
    title: '6. Contact & Data Requests',
    content: `For any privacy-related inquiries, data access requests, or to exercise your rights:\n\n• **Email**: inheritedstudiogames@rehabx.com\n• **Subject**: "Privacy Request — [your request type]"\n• **Response time**: we respond to all privacy requests within 30 calendar days.\n\nFor GDPR-specific requests from EU/EEA residents, please include your country of residence.`,
  },
];

export function PrivacyPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const pp = t.privacyPage;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {pp.backToHome}
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              <Shield size={16} />{pp.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              {pp.title1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{pp.title2}</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-4 max-w-2xl">{pp.intro}</p>
            <p className="text-sm text-gray-400">{pp.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-12">
            {pp.badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-bold">
                <Shield size={12} />{badge}
              </span>
            ))}
          </div>
          <div className="space-y-10">
            {sections.map((section, i) => {
              const Icon = sectionIcons[i];
              return (
                <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="p-8 bg-white border-2 border-gray-100 rounded-3xl hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">{section.title}</h2>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                    {section.content.split('\n').map((line, j) => {
                      if (line.startsWith('• **')) {
                        const parts = line.replace('• **', '').split('**:');
                        return (
                          <p key={j} className="mb-2 pl-4">
                            <span className="text-gray-900 font-bold">{parts[0]}</span>:{parts[1]}
                          </p>
                        );
                      }
                      return <p key={j} className={line.trim() === '' ? 'mb-4' : 'mb-2'}>{line}</p>;
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
