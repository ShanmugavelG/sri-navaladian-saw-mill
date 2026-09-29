import { Phone, MessageSquare } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './CustomTreeCutting.css';

export function CustomTreeCutting() {
  const { t } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(t('contact.whatsappTreeCutting'));

  const supportedTrees = [
    t('treeCutting.treeCoconut'),
    t('treeCutting.treeNeem'),
    t('treeCutting.treePoovarasu'),
    t('treeCutting.treeTimber'),
    t('treeCutting.treeOther'),
  ];

  return (
    <section id="services" className="section-editorial section-espresso cutting-editorial-section" aria-labelledby="cutting-heading">
      <div className="container">
        <div className="cutting-editorial-grid">
          {/* Left Column: Visual Moment with Cutting Operation Photo */}
          <div className="cutting-visual-frame">
            <img
              src="/images/custom_cutting.jpg"
              alt="Custom tree log loaded onto horizontal band saw carriage at Sri Navaladian Saw Mill"
              className="cutting-visual-img"
              loading="lazy"
            />
            <div className="cutting-visual-tag">
              <span>{t('treeCutting.imageTag')}</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Action */}
          <div className="cutting-editorial-content">
            <div className="editorial-kicker">
              <span>{t('treeCutting.kicker')}</span>
            </div>

            <h2 id="cutting-heading" className="cutting-editorial-title">
              <span className="cutting-title-main">{t('treeCutting.title')}</span>
              <br className="desktop-break" />
              <span className="cutting-title-accent">{t('treeCutting.titleHighlight')}</span>
            </h2>

            <p className="cutting-editorial-desc">
              {t('treeCutting.desc')}
            </p>

            {/* Supported Species Chips */}
            <div className="supported-trees-wrapper">
              <span className="supported-trees-label">{t('treeCutting.supportedTreesLabel')}</span>
              <div className="supported-trees-row">
                {supportedTrees.map((tree) => (
                  <span key={tree} className="tree-tag">{tree}</span>
                ))}
              </div>
            </div>

            {/* Pricing Notice */}
            <div className="cutting-notice-box">
              <div className="notice-inner">
                <span className="notice-title">{t('treeCutting.noticeTitle')}</span>
                <p className="notice-sub">
                  {t('treeCutting.noticeSub')}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="cutting-editorial-actions">
              <a
                href={businessInfo.phoneTel}
                className="btn-editorial btn-editorial-ivory"
                aria-label="Call for Cutting Charges"
              >
                <Phone size={16} />
                <span>{t('treeCutting.callForCharges')}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial btn-editorial-whatsapp"
                aria-label="WhatsApp Us about tree cutting"
              >
                <MessageSquare size={16} className="whatsapp-icon-accent" />
                <span>{t('treeCutting.whatsappUs')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
