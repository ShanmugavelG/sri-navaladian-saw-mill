import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

export function Navbar({ activeSection = 'home' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active, ensure cleanup
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Close menu on hash change / route navigation
  useEffect(() => {
    const handleHashChange = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // STRICT 4-LINK NAVIGATION ONLY
  const navLinks = [
    { key: 'home', label: t('nav.home'), href: '#home', index: '01' },
    { key: 'about', label: t('nav.about'), href: '#about', index: '02' },
    { key: 'products', label: t('nav.products'), href: '#products', index: '03' },
    { key: 'contact', label: t('nav.contact'), href: '#contact', index: '04' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-container">
          {/* Left: Compact Premium Wordmark */}
          <a href="#home" className="header-brand" onClick={handleLinkClick}>
            <span className="brand-title">{t('nav.brand')}</span>
            <span className="brand-subtitle">{t('nav.brandSub')}</span>
          </a>

          {/* Center: Strict 4-Item Desktop Navigation (Visible > 768px) */}
          <nav className="header-nav-desktop" aria-label="Main Navigation">
            <ul className="nav-links-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.key;
                return (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className={`nav-item-link ${isActive ? 'is-active' : ''}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Area: Language Switcher + WhatsApp Button (Desktop) */}
          <div className="header-right-action">
            {/* Desktop Language Switcher (EN | தமிழ்) */}
            <div className="desktop-lang-switcher" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-toggle-btn ${language === 'en' ? 'is-active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                title="English"
              >
                EN
              </button>
              <span className="lang-separator" aria-hidden="true">|</span>
              <button
                type="button"
                className={`lang-toggle-btn ${language === 'ta' ? 'is-active' : ''}`}
                onClick={() => setLanguage('ta')}
                aria-pressed={language === 'ta'}
                title="தமிழ்"
              >
                தமிழ்
              </button>
            </div>

            {/* Desktop WhatsApp CTA in Warm Wood / Espresso */}
            <a
              href={getWhatsAppUrl(t('contact.whatsappGeneral'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-whatsapp nav-whatsapp-action"
              aria-label="WhatsApp Sri Navaladian Saw Mill"
            >
              <MessageSquare size={16} className="whatsapp-icon-accent" />
              <span>{t('nav.whatsapp')}</span>
            </a>

            {/* Mobile Hamburger Toggle (Visible <= 768px) */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (Mounted via Portal directly to body) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`mobile-nav-portal ${isMenuOpen ? 'is-open' : ''}`}
            aria-hidden={!isMenuOpen}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Mobile Menu Top Header Bar */}
            <div className="mobile-menu-header">
              <div className="mobile-menu-brand">
                <span className="mobile-menu-brand-en">Sri Navaladian Saw Mill</span>
                <span className="mobile-menu-brand-ta">ஸ்ரீ நவலடியான் சா மில்</span>
              </div>
              <button
                type="button"
                className="mobile-menu-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t('nav.closeMenu')}
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Language Switcher Row */}
            <div className="mobile-menu-lang-row">
              <span className="mobile-lang-title">LANGUAGE / மொழி:</span>
              <div className="mobile-lang-buttons" role="group" aria-label="Language selection">
                <button
                  type="button"
                  className={`mobile-lang-btn ${language === 'en' ? 'is-active' : ''}`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <span className="mobile-lang-sep" aria-hidden="true">|</span>
                <button
                  type="button"
                  className={`mobile-lang-btn ${language === 'ta' ? 'is-active' : ''}`}
                  onClick={() => setLanguage('ta')}
                  aria-pressed={language === 'ta'}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Editorial Navigation List (Strict 4 Items Only) */}
            <nav className="mobile-menu-nav" aria-label="Mobile Menu Navigation">
              <ul className="mobile-menu-links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.key;
                  return (
                    <li key={link.key} className="mobile-menu-link-item">
                      <a
                        href={link.href}
                        className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <span className="mobile-menu-link-idx">{link.index}</span>
                        <span className="mobile-menu-link-label">{link.label}</span>
                        <ArrowUpRight size={20} className="mobile-menu-link-arrow" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Actions & CTAs */}
            <div className="mobile-menu-bottom">
              {/* WhatsApp CTA in Premium Timber Palette */}
              <a
                href={getWhatsAppUrl(t('contact.whatsappGeneral'))}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-whatsapp-btn"
                onClick={handleLinkClick}
              >
                <MessageSquare size={18} className="whatsapp-icon-accent" />
                <span>{t('nav.whatsappUs')}</span>
              </a>

              {/* Call CTA */}
              <a
                href={businessInfo.phoneTel}
                className="mobile-menu-call-btn"
                onClick={handleLinkClick}
              >
                <Phone size={17} />
                <span>{t('nav.call')}: {businessInfo.phone}</span>
              </a>

              <p className="mobile-menu-location">
                {t('contact.street')}, {t('contact.city')}, {t('contact.state')} – {t('contact.pincode')}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
