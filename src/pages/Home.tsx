import { Hero } from '@/components/rehabx/Hero';
import { ClientsMarquee } from '@/components/rehabx/ClientsMarquee';
import { Features } from '@/components/rehabx/Features';
import { About } from '@/components/rehabx/About';
import { Testimonials } from '@/components/rehabx/Testimonials';
import { Blog } from '@/components/rehabx/Blog';
import { Contact } from '@/components/rehabx/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <ClientsMarquee />
      <Features />
      <About />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}
