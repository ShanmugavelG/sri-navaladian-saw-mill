import { Phone, MessageSquare, Compass, ArrowUpRight } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './ContactSection.css';

export function ContactSection() {
  const { t } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(t('contact.whatsappGeneral'));

  return (
    <section id="contact" className="contact-section contact-architectural section-paper" aria-labelledby="contact-heading">
      <div className="container contact-container">
        <div className="contact-composition-grid">
          {/* =========================================================
              LEFT COLUMN (55–60%): Editorial Statement, Phone & Primary CTAs
              Warm Ivory Surface with Dark High-Contrast Text
              ========================================================= */}
          <div className="contact-editorial-left">
            <div className="contact-kicker">
              <span className="kicker-label">{t('contact.kicker')}</span>
            </div>

            <h2 id="contact-heading" className="contact-hero-heading">
              {t('contact.title')}
            </h2>

            <p className="contact-supporting-text">
              {t('contact.sub')}
            </p>

            <div className="contact-phone-block">
              <span className="phone-micro-label">{t('contact.phoneLabel')}</span>
              <a href={businessInfo.phoneTel} className="phone-prominent-link" aria-label={`Call ${businessInfo.phone}`}>
                {businessInfo.phone}
              </a>
            </div>

            {/* Architectural Rectangular Buttons */}
            <div className="contact-btn-row">
              <a
                href={businessInfo.phoneTel}
                className="btn-editorial btn-editorial-espresso"
                aria-label={`Call Sri Navaladian Saw Mill at ${businessInfo.phone}`}
              >
                <Phone size={17} />
                <span>{t('contact.callUs')}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial btn-editorial-whatsapp"
                aria-label="WhatsApp Sri Navaladian Saw Mill"
              >
                <MessageSquare size={17} className="whatsapp-icon-accent" />
                <span>{t('contact.whatsapp')}</span>
              </a>
            </div>

            <div className="contact-pricing-disclaimer">
              <span>{t('contact.disclaimer')}</span>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (40–45%): Architectural Plaque Panel
              Deep Espresso & Aged Brass Material Palette
              ========================================================= */}
          <div className="contact-editorial-right">
            <div className="architectural-plaque-panel">
              <div className="plaque-brass-accent" aria-hidden="true"></div>

              <div className="plaque-header">
                <span className="plaque-tag">{t('contact.millYard')}</span>
                <h3 className="plaque-business-name">{businessInfo.name}</h3>
                <span className="plaque-business-tamil">{businessInfo.tamilName}</span>
              </div>

              <address className="plaque-address-block">
                <span>{t('contact.street')}</span>
                <span>{t('contact.city')},</span>
                <span>{t('contact.state')} – {t('contact.pincode')}</span>
              </address>

              <div className="plaque-subtle-divider" aria-hidden="true"></div>

              <div className="plaque-operational-info">
                <span className="plaque-phone-display">{businessInfo.phone}</span>
                <p className="plaque-helper-note">
                  {t('contact.callAhead')}
                </p>
              </div>

              <div className="plaque-footer-action">
                <a
                  href={businessInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plaque-directions-link"
                  aria-label="Get directions to Sri Navaladian Saw Mill"
                >
                  <Compass size={17} />
                  <span>{t('contact.getDirections')}</span>
                  <ArrowUpRight size={14} className="directions-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
