import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import rehabxLogoIcon from '@/assets/rehabx-logo-icon.png';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { name: 'facebook',  Icon: Facebook,  href: 'https://www.facebook.com/InheritedGamesStudio' },
  { name: 'x',         Icon: XIcon,     href: '#' },
  { name: 'instagram', Icon: Instagram, href: 'https://www.instagram.com/inheritedgames/' },
  { name: 'linkedin',  Icon: Linkedin,  href: 'https://www.linkedin.com/company/inherited-games-studio' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useLanguage();

  type FooterLink = { label: string; action: 'scroll' | 'navigate' | 'external'; target: string };

  const footerLinks: Record<string, FooterLink[]> = {
    [t.footer.navigate]: [
      { label: t.footer.navLinks.home, action: 'navigate', target: '/' },
      { label: t.footer.navLinks.solutions, action: 'scroll', target: 'features' },
      { label: t.footer.navLinks.indications, action: 'navigate', target: '/indications' },
      { label: t.footer.navLinks.testimonials, action: 'navigate', target: '/testimonials' },
      { label: t.footer.navLinks.clients, action: 'navigate', target: '/clients' },
    ],
    [t.footer.company]: [
      { label: t.footer.companyLinks.ourStory, action: 'external', target: 'https://inheritedgames.com/' },
      { label: t.footer.companyLinks.team, action: 'external', target: '#' },
      { label: t.footer.companyLinks.blog, action: 'external', target: '#' },
      { label: t.footer.companyLinks.partners, action: 'external', target: '#' },
      { label: t.footer.companyLinks.investors, action: 'external', target: '#' },
    ],
    [t.footer.help]: [
      { label: t.footer.helpLinks.documentation, action: 'external', target: '#' },
      { label: t.footer.helpLinks.helpCenter, action: 'external', target: '#' },
      { label: t.footer.helpLinks.status, action: 'external', target: '#' },
      { label: t.footer.helpLinks.contact, action: 'external', target: '#' },
      { label: t.footer.helpLinks.privacy, action: 'external', target: '#' },
    ],
  };

  const handleLinkClick = (link: FooterLink, e: React.MouseEvent) => {
    e.preventDefault();
    if (link.action === 'navigate') {
      navigate(link.target);
    } else if (link.action === 'scroll') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(link.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (link.action === 'external' && link.target !== '#') {
      window.open(link.target, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 cursor-pointer mb-5"
                onClick={() => scrollToSection('hero')}
              >
                <div className="flex items-center justify-center" style={{ width: 42, height: 42 }}>
                  <img src={rehabxLogoIcon} alt="RX" className="object-contain" style={{ width: 42, height: 42 }} />
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  RehabX
                </span>
              </motion.div>

              <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
                {t.footer.tagline}
              </p>

              <div className="flex gap-3">
                {socialLinks.map(({ name, Icon, href }) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h5 className="font-black text-sm uppercase tracking-wider text-gray-400 mb-5">{heading}</h5>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.action === 'external' ? link.target : '#'}
                        onClick={(e) => handleLinkClick(link, e)}
                        whileHover={{ x: 3 }}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                        {...(link.action === 'external' && link.target !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-1 lg:-mt-0">
              <h5 className="font-black text-sm uppercase tracking-wider text-gray-400 mb-5">{t.footer.stayUpToDate}</h5>
              <p className="text-gray-500 text-sm mb-4">{t.footer.newsletterSub}</p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-full text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full sm:min-w-[180px]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-semibold whitespace-nowrap"
                >
                  {t.footer.subscribe}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} RehabX. {t.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {t.footer.bottomLinks.map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
