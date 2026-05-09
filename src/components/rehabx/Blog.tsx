import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/LanguageContext';

const posts = [
  {
    tag: 'Research',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'How VR Therapy Is Revolutionizing Chronic Pain Management',
    excerpt: 'How VR immersion reduces chronic pain perception through neuroplastic adaptation mechanisms in clinical settings.',
    date: 'Mar 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?w=600&h=400&fit=crop',
  },
  {
    tag: 'Case Study',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'AI-Driven Rehabilitation: 94% Adherence Across 12,000 Sessions',
    excerpt: 'Our AI model achieved 94% adherence rates across 12,000 patient sessions — here\'s what we learned.',
    date: 'Mar 18, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1764314359427-6e685ce5b719?w=600&h=400&fit=crop',
  },
  {
    tag: 'Clinical Insight',
    tagColor: 'bg-violet-100 text-violet-700',
    title: 'Motion Tracking Breakthroughs in Post-ACL Recovery Protocols',
    excerpt: 'An analysis of 5,000 post-ACL reconstruction cases treated with the RehabX motion tracking protocol.',
    date: 'Mar 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1758691463000-08b98131daf3?w=600&h=400&fit=crop',
  },
];

export function Blog() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();
  const translatedPosts = posts.map((post, index) => ({ ...post, ...t.blog.posts[index] }));

  return (
    <section id="blog" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              {t.blog.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              {t.blog.titleLine1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.blog.titleLine2}
              </span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-purple-300 hover:text-purple-600 transition-all duration-300 whitespace-nowrap"
          >
            {t.blog.viewAll}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {translatedPosts.map((post, i) => (
            <motion.article
              key={post.title + i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 ${post.tagColor} rounded-full text-xs font-bold`}>
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-black text-gray-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-1.5 text-sm font-bold text-purple-600 group-hover:gap-3 transition-all duration-300">
                  {t.blog.readMore}
                  <ArrowRight size={15} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}