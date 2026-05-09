import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import sahloul from '@/assets/partner-sahloul.jpg';
import medecine from '@/assets/partner-medecine-sousse.jpg';
import kinesport from '@/assets/partner-kinesport.png';

const partners = [
  { name: 'Hôpital Sahloul Sousse', logo: sahloul },
  { name: 'Faculty of Medicine of Sousse', logo: medecine },
  { name: 'Centre Kinesport de Physiothérapie', logo: kinesport },
];

function PartnerPill({ p }: { p: typeof partners[0] }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 shrink-0 select-none group">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-gray-100">
        <img src={p.logo} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" />
      </div>
      <span className="text-sm font-bold text-gray-700 whitespace-nowrap tracking-tight">{p.name}</span>
    </div>
  );
}

export function ClientsMarquee() {
  const { t } = useLanguage();
  return (
    <section id="clients" className="w-full bg-white py-10 border-y border-gray-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400"
        >
          {t.clientsMarquee.title}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-3 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full origin-center"
        />
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 w-max"
        >
          {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
            <PartnerPill key={i} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
