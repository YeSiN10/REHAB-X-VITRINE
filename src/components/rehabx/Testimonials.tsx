import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/LanguageContext';
import drSawssenVideo from '@/assets/dr-sawssen-video.mp4';
import kineSportClientVideo from '@/assets/kine-sport-client.mp4';
import testimonial3Video from '@/assets/testimonial-3.mp4';
import testimonial4Video from '@/assets/testimonial-4.mp4';
import drSawssenPoster from '@/assets/dr-sawssen-video-poster.jpg';
import kineSportClientPoster from '@/assets/kine-sport-client-poster.jpg';
import testimonial3Poster from '@/assets/testimonial-3-poster.jpg';
import testimonial4Poster from '@/assets/testimonial-4-poster.jpg';

const testimonials = [
  {
    name: 'Dr. Jean Dupont',
    role: 'Head of Physiotherapy, CHU Paris',
    image: 'https://i.pravatar.cc/80?img=3',
    content:
      '"The VR system from RehabX has truly transformed how we approach post-op rehabilitation. Our patients are more engaged, comply better with protocols, and recover faster than ever. The real-time monitoring alone has reduced re-injury rates by 34%."',
    rating: 5,
    clinic: 'CHU Paris',
  },
  {
    name: 'Dr. Mohamed Ben Salah',
    role: 'Clinical Director, Clinique El Manar Tunis',
    image: 'https://i.pravatar.cc/80?img=15',
    content:
      '"It has been incredibly easy to integrate RehabX into our existing workflows. The AI personalisation means our team can focus on patient care rather than manual protocol adjustments. A genuine game-changer for our neurological rehab unit."',
    rating: 5,
    clinic: 'Clinique El Manar Tunis',
  },
  {
    name: 'Dr. Camille Moreau',
    role: 'Sports Medicine Specialist, Clinique du Sport Lyon',
    image: 'https://i.pravatar.cc/80?img=8',
    content:
      '"I can\'t imagine running our athletic recovery programs without RehabX. The analytics dashboard gives us a level of insight we never had before. Patient outcomes have improved measurably, and our team productivity is up by 40%."',
    rating: 5,
    clinic: 'Clinique du Sport Lyon',
  },
];

const videoTestimonials = [
  { name: 'Dr. Sawssen', clinic: 'Clinical testimonial', video: drSawssenVideo, poster: drSawssenPoster },
  { name: 'Kine Sport Client', clinic: 'Clinical testimonial', video: kineSportClientVideo, poster: kineSportClientPoster },
  { name: 'Testimonial 3', clinic: 'Patient testimonial', video: testimonial3Video, poster: testimonial3Poster },
  { name: 'Testimonial 4', clinic: 'Patient testimonial', video: testimonial4Video, poster: testimonial4Poster },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section id="testimonials" className="py-14 md:py-20 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/60 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-sm font-semibold">
            {t.testimonials.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 text-gray-900">
            {t.testimonials.titleLine1}
            <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {t.testimonials.titleLine2}
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Main testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-16 relative"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-purple-100/40 border border-gray-100"
              >
                <Quote className="text-purple-300 mb-5" size={36} />
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  {testimonials[current].content}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-purple-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonials[current].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[current].role}</div>
                  </div>
                  <div className="ml-auto px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200">
                    {testimonials[current].clinic}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-purple-400 hover:text-purple-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2.5 bg-gradient-to-r from-purple-600 to-blue-500'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-purple-400 hover:text-purple-600 transition-colors shadow-sm"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Video testimonials row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            {t.testimonials.videoTestimonialsLabel}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {videoTestimonials.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                onClick={() => v.video && setActiveVideo(v.video)}
                className={`relative aspect-[9/16] rounded-2xl overflow-hidden shadow-md group bg-gray-900 ${v.video ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {v.video ? (
                  <img src={v.poster} alt={v.name} loading="lazy" className="w-full h-full object-cover pointer-events-none" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center"
                  >
                    <Play className="text-white fill-white ml-0.5" size={18} />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white text-xs font-bold">{v.name}</div>
                  <div className="text-white/70 text-[10px]">{v.clinic}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
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
                    className="absolute top-3 right-3 z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
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
          </AnimatePresence>,
          document.body,
        )}
      </div>
    </section>
  );
}