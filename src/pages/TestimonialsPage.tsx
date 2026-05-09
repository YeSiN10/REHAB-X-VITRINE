import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, ArrowLeft, ArrowRight, X, Users, Star as StarIcon, CheckCircle2, Zap } from 'lucide-react';
import { useSafeNavigate } from '@/hooks/useSafeNav';
import { useInView } from '@/hooks/useInView';
import drSawssenVideo from '@/assets/dr-sawssen-video.mp4';
import kineSportClientVideo from '@/assets/kine-sport-client.mp4';
import testimonial3Video from '@/assets/testimonial-3.mp4';
import testimonial4Video from '@/assets/testimonial-4.mp4';
import testimonialKid1Video from '@/assets/testimonial-kid-1.mp4';
import testimonialKid2Video from '@/assets/testimonial-kid-2.mp4';
import drSawssenPoster from '@/assets/dr-sawssen-video-poster.jpg';
import kineSportClientPoster from '@/assets/kine-sport-client-poster.jpg';
import testimonial3Poster from '@/assets/testimonial-3-poster.jpg';
import testimonial4Poster from '@/assets/testimonial-4-poster.jpg';
import testimonialKid1Poster from '@/assets/testimonial-kid-1-poster.jpg';
import testimonialKid2Poster from '@/assets/testimonial-kid-2-poster.jpg';
import { useLanguage } from '@/i18n/LanguageContext';

const allTestimonials = [
  {
    id: 1,
    name: 'Dr. Jean Dupont',
    role: 'Head of Physiotherapy',
    organization: 'CHU Paris',
    image: 'https://i.pravatar.cc/80?img=3',
    content: 'The VR system from RehabX has truly transformed how we approach post-op rehabilitation. Our patients are more engaged, comply better with protocols, and recover faster than ever.',
    rating: 5,
    type: 'Doctor',
    specialty: 'Orthopedic Rehab',
    results: '34% reduction in re-injury rates',
  },
  {
    id: 2,
    name: 'Dr. Amira Ben Ali',
    role: 'Neurologist',
    organization: 'Clinique El Manar, Tunis',
    image: 'https://i.pravatar.cc/80?img=45',
    content: 'Integrating RehabX into our stroke recovery program has been revolutionary. The AI-driven protocols adapt perfectly to each patient\'s progress, delivering measurable improvements we\'ve never seen before.',
    rating: 5,
    type: 'Doctor',
    specialty: 'Neurological Rehab',
    results: '40% faster recovery times',
  },
  {
    id: 3,
    name: 'Dr. Pierre Lefèvre',
    role: 'Sports Medicine Director',
    organization: 'Institut National du Sport, Paris',
    image: 'https://i.pravatar.cc/80?img=12',
    content: 'Our athletes recover faster and more completely with RehabX. The real-time tracking gives us data we\'ve never had access to, allowing precise adjustments to every rehabilitation protocol.',
    rating: 5,
    type: 'Doctor',
    specialty: 'Sports Rehabilitation',
    results: '50% quicker return to play',
  },
  {
    id: 4,
    name: 'Sophie Laurent',
    role: 'Post-ACL Surgery Patient',
    organization: 'Recovered in 4 months',
    image: 'https://i.pravatar.cc/80?img=47',
    content: 'After my ACL surgery, I was terrified of the long recovery. RehabX made every session feel like a game. I actually looked forward to therapy and got back to running months earlier than expected.',
    rating: 5,
    type: 'Patient',
    specialty: 'Sports Rehabilitation',
    results: 'Back to running in 4 months',
  },
  {
    id: 5,
    name: 'Youssef Trabelsi',
    role: 'Stroke Recovery Patient',
    organization: 'Sousse — Regained full mobility',
    image: 'https://i.pravatar.cc/80?img=53',
    content: 'After my stroke, I thought I\'d never use my left arm again. The VR exercises kept me motivated through the hardest days. Six months later, I\'m back to painting and playing with my grandkids.',
    rating: 5,
    type: 'Patient',
    specialty: 'Neurological Rehab',
    results: 'Full arm mobility restored',
  },
  {
    id: 6,
    name: 'Salma Ben Romdhane',
    role: 'Chronic Back Pain Patient',
    organization: 'Tunis — 2 years pain-free',
    image: 'https://i.pravatar.cc/80?img=48',
    content: 'I lived with chronic back pain for 8 years. Traditional therapy never stuck. With RehabX, the immersive sessions distracted me from the pain and the AI tracked my progress in ways I could actually see.',
    rating: 5,
    type: 'Patient',
    specialty: 'Chronic Pain',
    results: '70% pain reduction',
  },
];

const specialties = ['All', 'Doctors', 'Patients'];

const videoTestimonials = [
  { name: 'Dr. Sawssen', clinic: 'Clinical testimonial', video: drSawssenVideo, poster: drSawssenPoster },
  { name: 'Kine Sport Client', clinic: 'Clinical testimonial', video: kineSportClientVideo, poster: kineSportClientPoster },
  { name: 'Testimonial 3', clinic: 'Patient testimonial', video: testimonial3Video, poster: testimonial3Poster },
  { name: 'Testimonial 4', clinic: 'Patient testimonial', video: testimonial4Video, poster: testimonial4Poster },
  { name: 'Young Patient 1', clinic: 'Patient testimonial', video: testimonialKid1Video, poster: testimonialKid1Poster },
  { name: 'Young Patient 2', clinic: 'Patient testimonial', video: testimonialKid2Video, poster: testimonialKid2Poster },
];

type VideoItem = { name: string; clinic: string; video: string; poster: string };

function VideoCarousel({ videos, onSelect }: { videos: VideoItem[]; onSelect: (v: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-video-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
        className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Next"
        className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors"
      >
        <ArrowRight size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onClick={() => onSelect(video.video)}
            data-video-card
            className="relative shrink-0 snap-start w-[70%] sm:w-[45%] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-3xl overflow-hidden shadow-xl group bg-gray-900 cursor-pointer"
          >
            <img src={video.poster} alt={video.name} loading="lazy" className="w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center"
              >
                <Play className="text-white fill-white ml-1" size={24} />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="text-white text-lg font-bold">{video.name}</div>
              <div className="text-white/70 text-sm">{video.clinic}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsPage() {
  const navigate = useSafeNavigate();
  const { t } = useLanguage();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredTestimonials = activeFilter === 'All'
    ? allTestimonials
    : allTestimonials.filter(t => (activeFilter === 'Doctors' ? t.type === 'Doctor' : t.type === 'Patient'));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-20 overflow-hidden">
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
            {t.testimonialsPage.backToHome}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
              {t.testimonialsPage.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 leading-tight">
              {t.testimonialsPage.titleLine1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.testimonialsPage.titleLine2}
              </span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t.testimonialsPage.subtitle}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
              {t.testimonialsPage.stats.map((stat, i) => {
                const Icon = [Users, StarIcon, CheckCircle2, Zap][i] || Users;
                return (
                  <div key={i} className="text-left p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-11 h-11 bg-purple-50 border-2 border-purple-200 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-purple-600" size={20} strokeWidth={2} />
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                );
              })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-12 justify-center"
          >
            {specialties.map((specialty) => (
              <motion.button
                key={specialty}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === specialty
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {specialty}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border-2 border-gray-100 rounded-3xl p-6 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <Quote className="text-purple-300 mb-4" size={28} />
                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                    <div className="text-xs text-purple-600 font-semibold">{testimonial.organization}</div>
                  </div>
                </div>
                <div className="mt-4 px-3 py-2 bg-purple-50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">{testimonial.specialty}</div>
                  <div className="text-sm font-bold text-purple-700">{testimonial.results}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
              {t.testimonialsPage.watchTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t.testimonialsPage.watchTitle2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.testimonialsPage.watchSub}
            </p>
          </motion.div>

          <VideoCarousel videos={videoTestimonials} onSelect={(v) => setActiveVideo(v)} />

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
              {t.testimonialsPage.ctaTitle1}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t.testimonialsPage.ctaTitle2}
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t.testimonialsPage.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
onClick={() => navigate('/demo')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold flex items-center gap-2 group shadow-xl"
              >
                {t.testimonialsPage.scheduleDemo}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                {t.testimonialsPage.viewAllSolutions}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
              <video
                src={activeVideo}
                className="w-full aspect-[9/16] object-contain bg-black"
                controls
                autoPlay
                playsInline
                  preload="auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
