/**
 * SINGLE SOURCE OF TRUTH: Business Information
 * Sri Navaladian Saw Mill
 * Sulthan Patt, Padamudipalayam, Tamil Nadu – 638182
 * Phone: 094862 65094
 */

export const businessInfo = {
  name: "Sri Navaladian Saw Mill",
  tamilName: "ஸ்ரீ நவலடியான் சா மில்",
  experience: "20+ years",
  tagline: "QUALITY TIMBER. 20+ YEARS OF TRUSTED CRAFTSMANSHIP.",
  supportingCopy: "Quality coconut wood and construction timber for your building and centering requirements, along with custom tree-cutting services.",
  
  phone: "094862 65094",
  phoneRaw: "09486265094",
  phoneTel: "tel:09486265094",
  
  // WhatsApp international format for India (+91)
  whatsappNumber: "919486265094",
  whatsappBaseUrl: "https://wa.me/919486265094",
  
  address: {
    street: "Sulthan Patt",
    city: "Padamudipalayam",
    state: "Tamil Nadu",
    pincode: "638182",
    full: "Sulthan Patt, Padamudipalayam, Tamil Nadu – 638182"
  },
  
  // Google Maps search query link for the exact business address
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Navaladian+Saw+Mill+Sulthan+Patt+Padamudipalayam+Tamil+Nadu+638182",
  
  // Contextual note as specified in prompt
  disclaimer: "Prices and availability may vary based on current requirements. Contact us for details.",
  
  // Real customer review as supplied (no fake reviews or star ratings)
  review: {
    quote: "well and good experience",
    author: "Shanmugavel G"
  },

  // 4 Core Trust Points
  trustMetrics: [
    {
      metric: "20+",
      label: "YEARS",
      detail: "Sawmill Experience"
    },
    {
      metric: "QUALITY",
      label: "FOCUSED",
      detail: "Graded Timber"
    },
    {
      metric: "CUSTOM",
      label: "TREE CUTTING",
      detail: "Bring Your Own Logs"
    },
    {
      metric: "LOCAL",
      label: "SERVICE",
      detail: "Padamudipalayam"
    }
  ]
};

/**
 * Helper to build dynamic WhatsApp enquiry URLs with pre-filled text
 */
export function getWhatsAppUrl(customMessage) {
  const defaultMsg = "Hello Sri Navaladian Saw Mill, I would like to enquire about your timber and sawmill services.";
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `${businessInfo.whatsappBaseUrl}?text=${text}`;
}
