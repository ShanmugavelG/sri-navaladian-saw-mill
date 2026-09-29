import { ArrowUp } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { key: 'home', label: t('nav.home'), href: '#home' },
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'products', label: t('nav.products'), href: '#products' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="footer-editorial section-espresso" aria-label="Site Footer">
      <div className="container">
        {/* Main 3-Column Desktop Alignment Strip */}
        <div className="footer-columns-grid">
          {/* Column 1: Business Identity & Tamil Name */}
          <div className="footer-col-left">
            <span className="footer-brand-title">{businessInfo.name}</span>
            <span className="footer-brand-tamil">{businessInfo.tamilName}</span>
            <div className="footer-experience-badge">
              <span>{t('footer.experienceBadge')}</span>
            </div>
          </div>

          {/* Column 2: Minimal 4 Navigation Links */}
          <nav className="footer-col-center" aria-label="Footer Quick Navigation">
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Direct Phone & Official Location */}
          <div className="footer-col-right">
            <a href={businessInfo.phoneTel} className="footer-phone-cta">
              {businessInfo.phone}
            </a>
            <address className="footer-address-block">
              <span>{t('contact.street')},</span>
              <span>{t('contact.city')},</span>
              <span>{t('contact.state')} – {t('contact.pincode')}</span>
            </address>
          </div>
        </div>

        {/* Bottom Line: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {businessInfo.name}. {t('footer.copyright')}
          </p>

          <button
            type="button"
            className="footer-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
