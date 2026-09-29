/**
 * SINGLE SOURCE OF TRUTH: Products Data
 * 
 * Strict Source-of-Truth Rules:
 * - Do NOT invent additional products, dimensions, or pricing.
 * - Do not invent conversion or meaning of "aadi".
 * - Use exact terminology.
 */

export const productCategories = [
  {
    id: "coconut-wood-slabs",
    name: "Coconut Wood Slabs",
    subtitle: "Graded Coconut Wood for Building & Centering Requirements",
    description: "Sawn coconut wood slabs available in premium hard wood ('Saavu') and standard building grades.",
    image: "/images/coconut_wood_slabs.jpg",
    items: [
      {
        id: "coconut-high-quality-saavu",
        category: "Coconut Wood",
        name: "High Quality Hard Wood",
        localTerm: "Saavu / Hard Wood",
        size: "10 × 10 aadi",
        priceFormatted: "₹4,200",
        priceValue: 4200,
        unit: "per slab",
        badge: "Premium Hard Wood",
        grade: "Hard Wood ('Saavu')",
        keyFeatures: [
          "10 × 10 aadi standard dimension",
          "High density hard wood grain",
          "Ideal for structural centering & building",
          "Graded for high strength"
        ],
        whatsappMessage: "Hello Sri Navaladian Saw Mill, I am interested in the 10 × 10 aadi High Quality Hard Wood ('Saavu') Coconut Wood Slab priced at ₹4,200/slab. Please let me know current availability."
      },
      {
        id: "coconut-normal-quality",
        category: "Coconut Wood",
        name: "Normal Quality Coconut Wood Slab",
        localTerm: "Normal Quality",
        size: "10 × 10 aadi",
        priceFormatted: "₹3,800",
        priceValue: 3800,
        unit: "per slab",
        badge: "Standard Grade",
        grade: "Standard Quality",
        keyFeatures: [
          "10 × 10 aadi standard dimension",
          "Reliable building grade coconut slab",
          "Economical for general centering works",
          "Readily available for construction dispatch"
        ],
        whatsappMessage: "Hello Sri Navaladian Saw Mill, I am interested in the 10 × 10 aadi Normal Quality Coconut Wood Slab priced at ₹3,800/slab. Please provide current stock availability and details."
      }
    ]
  },
  {
    id: "construction-timber",
    name: "Construction Timber",
    subtitle: "Precision Sawn Timber for Centering & Structural Building",
    description: "Uniform dimensions cut for building contractors, carpenters, and centering frameworks.",
    image: "/images/construction_timber.jpg",
    items: [
      {
        id: "timber-3x1-5",
        category: "Construction Timber",
        name: "3\" × 1.5\" Timber",
        localTerm: "Construction Timber",
        size: "3\" × 1.5\"",
        length: "8–12 ft",
        commonLength: "10 ft (Most common)",
        priceFormatted: "₹15",
        priceValue: 15,
        unit: "per aadi",
        badge: "Heavy Duty Joist",
        grade: "Structural Grade",
        keyFeatures: [
          "Cross-section: 3\" × 1.5\"",
          "Available lengths: 8–12 ft",
          "Most common length: 10 ft",
          "Rate: ₹15 / aadi"
        ],
        whatsappMessage: "Hello Sri Navaladian Saw Mill, I am interested in the 3\" × 1.5\" Construction Timber (₹15/aadi, common length 10 ft). Please provide stock and delivery details."
      },
      {
        id: "timber-2x1",
        category: "Construction Timber",
        name: "2\" × 1\" Timber",
        localTerm: "Construction Timber",
        size: "2\" × 1\"",
        length: "8–12 ft",
        commonLength: "10 ft (Most common)",
        priceFormatted: "₹8",
        priceValue: 8,
        unit: "per aadi",
        badge: "Centering Batten",
        grade: "Building Grade",
        keyFeatures: [
          "Cross-section: 2\" × 1\"",
          "Available lengths: 8–12 ft",
          "Most common length: 10 ft",
          "Rate: ₹8 / aadi"
        ],
        whatsappMessage: "Hello Sri Navaladian Saw Mill, I am interested in the 2\" × 1\" Construction Timber (₹8/aadi, common length 10 ft). Please provide stock and delivery details."
      }
    ]
  }
];

// Flat list for quick lookups
export const allProducts = productCategories.flatMap(cat => cat.items);
