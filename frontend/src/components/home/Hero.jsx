import { Phone, ArrowRight } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-editorial section-paper" aria-label="Introduction">
      <div className="container hero-editorial-container">
        {/* Editorial Top Eyebrow */}
        <div className="hero-business-label">
          <span className="label-brand">{t('hero.tag')}</span>
        </div>

        {/* Large Editorial Headline with responsive natural wrapping */}
        <h1 className="hero-editorial-headline">
          <span className="hero-head-block headline-timber-accent">{t('hero.titleLine1')}</span>{' '}
          <span className="hero-head-block">{t('hero.titleLine2')}</span>{' '}
          <span className="hero-head-block headline-wood-accent">{t('hero.titleLine3')}</span>
        </h1>

        {/* Hero Split Layout: Narrative & CTAs on Left, Hero Visual Composition on Right */}
        <div className="hero-editorial-body">
          <div className="hero-editorial-left">
            <p className="hero-editorial-lead">
              {t('hero.lead')}
            </p>

            <div className="hero-editorial-actions">
              <a href="#products" className="btn-editorial btn-editorial-espresso">
                <span>{t('hero.exploreProducts')}</span>
                <ArrowRight size={16} />
              </a>

              <a href={businessInfo.phoneTel} className="btn-editorial btn-editorial-outline-dark">
                <Phone size={16} />
                <span>{t('hero.callUs')}</span>
              </a>
            </div>

            <div className="hero-meta-strip">
              <div className="meta-point">
                <span className="meta-val">{t('hero.meta1Val')}</span>
                <span className="meta-lbl">{t('hero.meta1Lbl')}</span>
              </div>
              <div className="meta-sep" aria-hidden="true"></div>
              <div className="meta-point">
                <span className="meta-val">{t('hero.meta2Val')}</span>
                <span className="meta-lbl">{t('hero.meta2Lbl')}</span>
              </div>
              <div className="meta-sep" aria-hidden="true"></div>
              <div className="meta-point">
                <span className="meta-val">{t('hero.meta3Val')}</span>
                <span className="meta-lbl">{t('hero.meta3Lbl')}</span>
              </div>
            </div>
          </div>

          <div className="hero-editorial-right">
            <div className="hero-image-frame">
              <img
                src="/images/sawmill_hero.jpg"
                alt="Sri Navaladian Saw Mill yard with stacked timber and band saw machine"
                className="hero-image-element"
                fetchPriority="high"
              />
              <div className="hero-image-watermark">
                <span>{t('hero.imageWatermark')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
