import { MessageSquare, Phone, Compass, AlertCircle } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './ProductsSection.css';

export function ProductsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="products" className="section-editorial section-paper" aria-labelledby="products-heading">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-section-top">
          <div className="editorial-kicker">
            <span>{t('products.kicker')}</span>
          </div>

          <h2 id="products-heading" className="products-headline">
            {t('products.title')}
          </h2>

          <p className="products-lead">
            {t('products.lead')}
          </p>
        </div>

        {/* Product Groups List */}
        <div className="products-groups-stack">
          {/* =========================================================
              GROUP 01: COCONUT WOOD SLABS
              ========================================================= */}
          <div className="editorial-product-group">
            <div className="group-header-strip">
              <span className="group-num">01</span>
              <h3 className="group-title">{t('products.group1Title')}</h3>
              <span className="group-dim-tag">{t('products.group1Dim')}</span>
            </div>

            <div className="group-editorial-panel">
              {/* Product Photography */}
              <div className="panel-image-side">
                <img
                  src="/images/coconut_wood_slabs.jpg"
                  alt="Sawn coconut wood slabs stacked neatly at Sri Navaladian Saw Mill"
                  className="panel-img"
                  loading="lazy"
                />
                <div className="panel-image-tag">
                  <span>{t('products.group1Tag')}</span>
                </div>
              </div>

              {/* Items listing */}
              <div className="panel-content-side">
                {/* Item 1: High Quality Hard Wood ("Saavu") */}
                <div className="product-editorial-entry">
                  <div className="entry-header">
                    <div className="entry-title-meta">
                      <span className="entry-badge">{t('products.coconutSaavuBadge')}</span>
                      <h4 className="entry-name">{t('products.coconutSaavuName')}</h4>
                      <span className="entry-local">{t('products.coconutSaavuLocal')}</span>
                    </div>
                    <div className="entry-rate-box">
                      <span className="rate-label">{t('products.priceLabel')}</span>
                      <div className="rate-value-wrap">
                        <span className="rate-number">₹4,200</span>
                        <span className="rate-unit">{t('products.perSlab')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="entry-specs-row">
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.sizeLabel')}</span>
                      <strong className="spec-value">10 × 10 {language === 'ta' ? 'அடி' : 'ft'}</strong>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.gradeLabel')}</span>
                      <strong className="spec-value">{language === 'ta' ? 'சாவு மரம்' : 'High Quality'}</strong>
                    </div>
                  </div>

                  <div className="entry-actions">
                    <a
                      href={getWhatsAppUrl(t('contact.whatsappCoconutSaavu'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial btn-editorial-whatsapp entry-primary-cta"
                      aria-label="WhatsApp enquiry for High Quality Coconut Slabs"
                    >
                      <MessageSquare size={16} className="whatsapp-icon-accent" />
                      <span>{t('products.enquireWhatsApp')}</span>
                    </a>
                    <div className="entry-secondary-row">
                      <a
                        href={businessInfo.phoneTel}
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-call-btn"
                        aria-label="Call Sri Navaladian Saw Mill"
                      >
                        <Phone size={15} />
                        <span>{t('products.callUs')}</span>
                      </a>
                      <a
                        href={businessInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-directions-btn"
                        aria-label="Get Directions to Sri Navaladian Saw Mill"
                      >
                        <Compass size={15} />
                        <span>{t('products.directions')}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Item 2: Normal Quality Coconut Wood Slab */}
                <div className="product-editorial-entry">
                  <div className="entry-header">
                    <div className="entry-title-meta">
                      <span className="entry-badge">{t('products.coconutNormalBadge')}</span>
                      <h4 className="entry-name">{t('products.coconutNormalName')}</h4>
                    </div>
                    <div className="entry-rate-box">
                      <span className="rate-label">{t('products.priceLabel')}</span>
                      <div className="rate-value-wrap">
                        <span className="rate-number">₹3,800</span>
                        <span className="rate-unit">{t('products.perSlab')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="entry-specs-row">
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.sizeLabel')}</span>
                      <strong className="spec-value">10 × 10 {language === 'ta' ? 'அடி' : 'ft'}</strong>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.gradeLabel')}</span>
                      <strong className="spec-value">{language === 'ta' ? 'சாதாரண தரம்' : 'Standard Quality'}</strong>
                    </div>
                  </div>

                  <div className="entry-actions">
                    <a
                      href={getWhatsAppUrl(t('contact.whatsappCoconutNormal'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial btn-editorial-whatsapp entry-primary-cta"
                      aria-label="WhatsApp enquiry for Normal Quality Coconut Slabs"
                    >
                      <MessageSquare size={16} className="whatsapp-icon-accent" />
                      <span>{t('products.enquireWhatsApp')}</span>
                    </a>
                    <div className="entry-secondary-row">
                      <a
                        href={businessInfo.phoneTel}
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-call-btn"
                        aria-label="Call Sri Navaladian Saw Mill"
                      >
                        <Phone size={15} />
                        <span>{t('products.callUs')}</span>
                      </a>
                      <a
                        href={businessInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-directions-btn"
                        aria-label="Get Directions to Sri Navaladian Saw Mill"
                      >
                        <Compass size={15} />
                        <span>{t('products.directions')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              GROUP 02: CONSTRUCTION TIMBER
              ========================================================= */}
          <div className="editorial-product-group">
            <div className="group-header-strip">
              <span className="group-num">02</span>
              <h3 className="group-title">{t('products.group2Title')}</h3>
              <span className="group-dim-tag">{t('products.group2Dim')}</span>
            </div>

            <div className="group-editorial-panel panel-reversed">
              {/* Product Photography */}
              <div className="panel-image-side">
                <img
                  src="/images/construction_timber.jpg"
                  alt="Construction timber battens and joists stacked at Sri Navaladian Saw Mill"
                  className="panel-img"
                  loading="lazy"
                />
                <div className="panel-image-tag">
                  <span>{t('products.group2Tag')}</span>
                </div>
              </div>

              {/* Items listing */}
              <div className="panel-content-side">
                {/* Item 1: 3" × 1.5" Timber */}
                <div className="product-editorial-entry">
                  <div className="entry-header">
                    <div className="entry-title-meta">
                      <span className="entry-badge">{t('products.timber3x15Badge')}</span>
                      <h4 className="entry-name">{t('products.timber3x15Name')}</h4>
                      <span className="entry-local">
                        {t('products.lengthsLabel')} 8–12 {language === 'ta' ? 'அடி' : 'ft'}
                      </span>
                    </div>
                    <div className="entry-rate-box">
                      <span className="rate-label">{t('products.priceLabel')}</span>
                      <div className="rate-value-wrap">
                        <span className="rate-number">₹15</span>
                        <span className="rate-unit">{t('products.perAadi')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="entry-specs-row">
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.crossSectionLabel')}</span>
                      <strong className="spec-value">3" × 1.5"</strong>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.commonLengthLabel')}</span>
                      <strong className="spec-value">10 {language === 'ta' ? 'அடி' : 'ft'}</strong>
                    </div>
                  </div>

                  <div className="entry-actions">
                    <a
                      href={getWhatsAppUrl(t('contact.whatsappTimber3x15'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial btn-editorial-whatsapp entry-primary-cta"
                      aria-label="WhatsApp enquiry for 3x1.5 Timber"
                    >
                      <MessageSquare size={16} className="whatsapp-icon-accent" />
                      <span>{t('products.enquireWhatsApp')}</span>
                    </a>
                    <div className="entry-secondary-row">
                      <a
                        href={businessInfo.phoneTel}
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-call-btn"
                        aria-label="Call Sri Navaladian Saw Mill"
                      >
                        <Phone size={15} />
                        <span>{t('products.callUs')}</span>
                      </a>
                      <a
                        href={businessInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-directions-btn"
                        aria-label="Directions to Sri Navaladian Saw Mill"
                      >
                        <Compass size={15} />
                        <span>{t('products.directions')}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Item 2: 2" × 1" Timber */}
                <div className="product-editorial-entry">
                  <div className="entry-header">
                    <div className="entry-title-meta">
                      <span className="entry-badge">{t('products.timber25x15Badge')}</span>
                      <h4 className="entry-name">{t('products.timber25x15Name')}</h4>
                      <span className="entry-local">
                        {t('products.lengthsLabel')} 8–12 {language === 'ta' ? 'அடி' : 'ft'}
                      </span>
                    </div>
                    <div className="entry-rate-box">
                      <span className="rate-label">{t('products.priceLabel')}</span>
                      <div className="rate-value-wrap">
                        <span className="rate-number">₹8</span>
                        <span className="rate-unit">{t('products.perAadi')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="entry-specs-row">
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.crossSectionLabel')}</span>
                      <strong className="spec-value">2" × 1"</strong>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-label">{t('products.commonLengthLabel')}</span>
                      <strong className="spec-value">10 {language === 'ta' ? 'அடி' : 'ft'}</strong>
                    </div>
                  </div>

                  <div className="entry-actions">
                    <a
                      href={getWhatsAppUrl(t('contact.whatsappTimber25x15'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial btn-editorial-whatsapp entry-primary-cta"
                      aria-label="WhatsApp enquiry for 2x1 Timber"
                    >
                      <MessageSquare size={16} className="whatsapp-icon-accent" />
                      <span>{t('products.enquireWhatsApp')}</span>
                    </a>
                    <div className="entry-secondary-row">
                      <a
                        href={businessInfo.phoneTel}
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-call-btn"
                        aria-label="Call Sri Navaladian Saw Mill"
                      >
                        <Phone size={15} />
                        <span>{t('products.callUs')}</span>
                      </a>
                      <a
                        href={businessInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial btn-editorial-outline-dark entry-sub-btn entry-directions-btn"
                        aria-label="Directions to Sri Navaladian Saw Mill"
                      >
                        <Compass size={15} />
                        <span>{t('products.directions')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Note */}
        <div className="products-disclaimer-strip">
          <AlertCircle size={16} className="disclaimer-icon" />
          <span>{t('products.disclaimer')}</span>
        </div>
      </div>
    </section>
  );
}
