import { useLanguage } from '../../context/LanguageContext';
import './TrustMetrics.css';

export function TrustMetrics() {
  const { t } = useLanguage();

  const metrics = [
    {
      metric: t('trust.item1Metric'),
      label: t('trust.item1Label'),
      sub: t('trust.item1Sub'),
    },
    {
      metric: t('trust.item2Metric'),
      label: t('trust.item2Label'),
      sub: t('trust.item2Sub'),
    },
    {
      metric: t('trust.item3Metric'),
      label: t('trust.item3Label'),
      sub: t('trust.item3Sub'),
    },
    {
      metric: t('trust.item4Metric'),
      label: t('trust.item4Label'),
      sub: t('trust.item4Sub'),
    },
  ];

  return (
    <section className="trust-strip-editorial section-espresso" aria-label="Trust and Experience Highlights">
      <div className="container">
        <div className="trust-strip-grid">
          {metrics.map((item, index) => (
            <div key={index} className="trust-strip-col">
              <div className="trust-strip-index">0{index + 1}</div>
              <div className="trust-strip-content">
                <span className="trust-metric-num">{item.metric}</span>
                <span className="trust-metric-tag">{item.label}</span>
                <span className="trust-metric-sub">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
