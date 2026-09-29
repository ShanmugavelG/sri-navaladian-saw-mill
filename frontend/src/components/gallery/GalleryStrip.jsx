import { useState, useEffect, useCallback } from 'react';
import { galleryItems } from '../../data/gallery';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './GalleryStrip.css';

export function GalleryStrip() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Compact preview strip of the 6 authentic images
  const previewImages = galleryItems.slice(0, 6);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => {
      const nextIdx = (prev + 1) % previewImages.length;
      setSelectedImage(previewImages[nextIdx]);
      return nextIdx;
    });
  }, [previewImages]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => {
      const prevIdx = (prev - 1 + previewImages.length) % previewImages.length;
      setSelectedImage(previewImages[prevIdx]);
      return prevIdx;
    });
  }, [previewImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox, nextImage, prevImage]);

  return (
    <section id="gallery" className="section-editorial gallery-strip-section" aria-labelledby="gallery-strip-heading">
      <div className="container">
        {/* Section Header */}
        <div className="editorial-section-top">
          <div className="editorial-kicker">
            <span>{t('gallery.kicker')}</span>
          </div>

          <h2 id="gallery-strip-heading" className="gallery-strip-headline">
            {t('gallery.title')}
          </h2>

          <p className="gallery-strip-sub">
            {t('gallery.sub')}
          </p>
        </div>

        {/* 6-Photo Compact Editorial Grid */}
        <div className="visual-strip-grid">
          {previewImages.map((item, index) => (
            <div
              key={item.id}
              className="strip-tile"
              onClick={() => openLightbox(item, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(item, index)}
              aria-label={`View photo: ${item.title}`}
            >
              <div className="strip-tile-image-frame">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="strip-tile-img"
                  loading="lazy"
                />

                <div className="strip-tile-overlay">
                  <div className="strip-tile-info">
                    <span className="strip-tag">{item.category}</span>
                    <h4 className="strip-title">{item.title}</h4>
                    <span className="strip-zoom">
                      <ZoomIn size={14} />
                      <span>{t('gallery.enlarge')}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label={t('gallery.close')}
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={prevImage}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={nextImage}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                className="lightbox-full-img"
              />
            </div>

            <div className="lightbox-details-bar">
              <div>
                <span className="lightbox-cat-badge">{selectedImage.category}</span>
                <h3 className="lightbox-img-title">{selectedImage.title}</h3>
                <p className="lightbox-img-caption">{selectedImage.caption}</p>
              </div>
              <span className="lightbox-counter">
                {selectedIndex + 1} / {previewImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
