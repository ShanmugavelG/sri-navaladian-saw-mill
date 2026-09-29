/**
 * SINGLE SOURCE OF TRUTH: Services Data
 * 
 * Major Service: Custom Tree Cutting Service
 * Strict Rule: DO NOT publish invented cutting prices.
 * Display: "Cutting charges vary depending on the tree and cutting requirements."
 * Extensible design so user can plug in exact prices later.
 */

export const treeCuttingService = {
  headline: "HAVE YOUR OWN TREE? BRING IT TO US.",
  subtitle: "Custom Tree Cutting & Dimension Sawing at Our Mill",
  description: "We provide custom tree-cutting services for customers who bring their own trees to our saw mill.",
  extendedDescription: "Bring your felled tree logs directly to Sri Navaladian Saw Mill. Our heavy-duty band saw carriage cuts your timber to your exact required lengths, cross-sections, and thickness specifications for home construction, carpentry, or centering work.",
  
  // Official tree types mentioned by the business
  supportedTrees: [
    {
      name: "Coconut",
      tamilName: "தென்னை மரம்",
      description: "Hard fibrous palm wood cut into heavy slabs, planks, and centering supports.",
      suitableFor: "Centering, roofing battens, rustic beams"
    },
    {
      name: "Neem",
      tamilName: "வேப்ப மரம்",
      description: "Dense, durable medicinal hardwood resistant to termites and borers.",
      suitableFor: "Door frames, window frames, furniture, structural posts"
    },
    {
      name: "Poovarasu",
      tamilName: "பூவரசு மரம்",
      description: "Fine-grained, tough South Indian timber prized for high durability.",
      suitableFor: "Agricultural tools, cart wheels, building woodwork, carpentry"
    },
    {
      name: "Timber",
      tamilName: "நாட்டு மரம் / மர வகைகள்",
      description: "General country woods and structural logs brought from farms and estates.",
      suitableFor: "General construction, scaffolding, centering joists"
    },
    {
      name: "Other Suitable Trees",
      tamilName: "மற்ற மரங்கள்",
      description: "Any mature, sawable tree trunk suitable for industrial blade sawing.",
      suitableFor: "Custom dimensional specifications as per customer need"
    }
  ],

  // Extensible pricing configuration (strictly following the prompt instructions)
  pricing: {
    published: false,
    notice: "Cutting charges vary depending on the tree and cutting requirements.",
    callCtaText: "Call for Cutting Charges",
    whatsappCtaText: "WhatsApp for Cutting Charges",
    whatsappMessage: "Hello Sri Navaladian Saw Mill, I have trees that I would like to bring for custom cutting. Could you please let me know the cutting charges and procedure?"
  },

  // Steps for customer clarity
  processSteps: [
    {
      step: "01",
      title: "Bring Your Trees",
      desc: "Transport your felled logs (Coconut, Neem, Poovarasu, or other timber) directly to our mill yard in Padamudipalayam."
    },
    {
      step: "02",
      title: "Specify Dimensions",
      desc: "Discuss your project needs with our saw masters—whether you need centering battens, door frame sizes, or thick slabs."
    },
    {
      step: "03",
      title: "Precision Sawing",
      desc: "Our high-capacity saw carriage cuts straight, accurate, and clean timber with minimal wood wastage."
    },
    {
      step: "04",
      title: "Collect Ready Timber",
      desc: "Load your ready-to-use custom-cut wood directly from our mill yard into your transport vehicle."
    }
  ]
};
