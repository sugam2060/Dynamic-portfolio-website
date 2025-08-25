import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import get_metadata_section from '../../actions/metadata_section';

export default function Home() {

  get_metadata_section()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
