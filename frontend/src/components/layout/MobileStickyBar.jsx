import { Phone, MessageSquare, Compass } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../../data/businessInfo';
import { useLanguage } from '../../context/LanguageContext';
import './MobileStickyBar.css';

export function MobileStickyBar() {
  const { t } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(t('contact.whatsappGeneral'));

  return (
    <aside className="mobile-action-dock" aria-label="Quick Mill Contact Actions">
      <div className="dock-actions-grid">
        <a
          href={businessInfo.phoneTel}
          className="dock-action-btn dock-btn-call"
          aria-label="Call Sri Navaladian Saw Mill"
        >
          <Phone size={18} />
          <span>{t('dock.call')}</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-action-btn dock-btn-whatsapp"
          aria-label="WhatsApp Sri Navaladian Saw Mill"
        >
          <MessageSquare size={18} className="whatsapp-icon-accent" />
          <span>{t('dock.whatsapp')}</span>
        </a>

        <a
          href={businessInfo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-action-btn dock-btn-directions"
          aria-label="Directions to Sri Navaladian Saw Mill"
        >
          <Compass size={18} />
          <span>{t('dock.directions')}</span>
        </a>
      </div>
    </aside>
  );
}
