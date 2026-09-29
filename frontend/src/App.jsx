import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { TrustMetrics } from './components/home/TrustMetrics';
import { ProductsSection } from './components/products/ProductsSection';
import { CustomTreeCutting } from './components/services/CustomTreeCutting';
import { AboutSection } from './components/about/AboutSection';
import { GalleryStrip } from './components/gallery/GalleryStrip';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';

export function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Only the 4 canonical navigation items
    const sections = ['home', 'about', 'products', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-wrapper">
      {/* 4-Item Minimal Editorial Navbar */}
      <Navbar activeSection={activeSection} />

      <main className="main-editorial-flow">
        {/* 1. HERO */}
        <Hero />

        {/* 2. TRUST / EXPERIENCE STRIP */}
        <TrustMetrics />

        {/* 3. PRODUCTS */}
        <ProductsSection />

        {/* 4. CUSTOM TREE CUTTING */}
        <CustomTreeCutting />

        {/* 5. ABOUT (with integrated review) */}
        <AboutSection />

        {/* 6. GALLERY / VISUAL STRIP */}
        <GalleryStrip />

        {/* 7. CONTACT */}
        <ContactSection />
      </main>

      {/* 8. FOOTER */}
      <Footer />

      {/* Mobile Sticky Action Dock */}
      <MobileStickyBar />
    </div>
  );
}

export default App;
