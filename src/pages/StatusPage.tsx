import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useLanguage } from '@/i18n/LanguageContext';

const serviceStatuses = ['operational','operational','operational','operational','operational','operational','operational','operational'] as const;
const serviceUptimes  = ['99.98%','99.95%','99.99%','99.97%','99.96%','100%','99.94%','99.92%'];

const statusConfig = {
  operational: { icon: CheckCircle2,  color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  degraded:    { icon: AlertTriangle, color: 'text-yellow-600',  bg: 'bg-yellow-50',  border: 'border-yellow-200' },
  outage:      { icon: XCircle,       color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200'    },
};

export function StatusPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const sp = t.statusPage;
  const allOperational = serviceStatuses.every((s) => s === 'operational');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-10 text-sm font-semibold group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            {sp.backToHome}
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            {allOperational ? (
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-bold text-lg">
                <CheckCircle2 size={24} className="text-emerald-600" />{sp.allOperational}
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-yellow-50 border-2 border-yellow-200 text-yellow-700 rounded-2xl font-bold text-lg">
                <AlertTriangle size={24} />{sp.someDegraded}
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              RehabX
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{sp.title2}</span>
            </h1>
            <p className="text-gray-500 text-lg">{sp.subtitle}</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
              <Clock size={14} />
              {new Date().toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })} CET
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-gray-900 mb-6">{sp.platformComponents}</h2>
          <div className="space-y-3 mb-14">
            {sp.services.map((service, i) => {
              const status = serviceStatuses[i];
              const cfg = statusConfig[status];
              const Icon = cfg.icon;
              return (
                <motion.div key={service.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`flex items-center justify-between p-5 bg-white border-2 ${cfg.border} rounded-2xl`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center`}><Icon size={18} className={cfg.color} /></div>
                    <span className="font-semibold text-gray-900">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-400 font-medium">{serviceUptimes[i]} {sp.uptime}</span>
                    <span className={`text-sm font-bold ${cfg.color}`}>{sp.statusLabels[status as keyof typeof sp.statusLabels]}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-6">{sp.incidentHistory}</h2>
          <div className="space-y-4">
            {sp.incidents.map((inc, i) => (
              <motion.div key={inc.date} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="text-xs text-gray-400 font-semibold mb-1">{inc.date}</div>
                <p className="text-sm text-gray-700 font-medium">{inc.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
