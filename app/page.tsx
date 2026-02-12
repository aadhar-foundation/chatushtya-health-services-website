import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUsCarousel from '@/components/AboutUsCarousel';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Clients from '@/components/Clients';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <AboutUsCarousel />
      <Services />
      <Gallery />
      <Clients />
      <ContactUs />
      <Footer />
    </main>
  );
}
