import { Quote, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './AboutSection.css';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-editorial section-paper" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-editorial-split">
          {/* Left: Text & Integrated Verified Customer Review */}
          <div className="about-text-column">
            <div className="editorial-kicker">
              <span>{t('about.kicker')}</span>
            </div>

            <h2 id="about-heading" className="about-editorial-title">
              {t('about.title')}
            </h2>

            <p className="about-editorial-body">
              {t('about.body1')}
            </p>

            <p className="about-editorial-body-sub">
              {t('about.body2')}
            </p>

            {/* Verified Customer Review */}
            <div className="about-review-embed">
              <Quote size={20} className="review-quote-icon" aria-hidden="true" />
              <div className="review-quote-content">
                <blockquote className="review-quote-text">
                  “{t('about.reviewQuote')}”
                </blockquote>
                <span className="review-author-name">— {t('about.reviewAuthor')}</span>
              </div>
            </div>

            <div className="about-location-tag">
              <MapPin size={15} />
              <span>{t('about.location')}</span>
            </div>
          </div>

          {/* Right: Operational Yard Photo with 20+ Years Callout Badge */}
          <div className="about-image-column">
            <div className="about-photo-frame">
              <img
                src="/images/tree_logs_yard.jpg"
                alt="Timber logs yard at Sri Navaladian Saw Mill in Padamudipalayam"
                className="about-photo-img"
                loading="lazy"
              />
              
              <div className="about-badge-callout">
                <span className="badge-years">{t('about.badgeYears')}</span>
                <span className="badge-caption">{t('about.badgeText')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
