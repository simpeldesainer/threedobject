/* ============ EDIT THIS FILE ============ */

window.SITE = {
  name: "STUDIO NAME",
  tagline: "3D design for art & furniture",
  intro: "Browse our pieces in 3D. Drag to rotate, scroll to zoom.",
  // Enquire button: fill at least one. WhatsApp number in international format, digits only (e.g. 6281234567890)
  whatsapp: "",
  email: "hello@example.com"
};

/* Max 12 items are shown. Put .glb files in /models and list them here.
   category: "Art" or "Furniture" (any text works; filters are built automatically) */
window.MODELS = [
  {
    title: "LAZZY CHAIR",
    category: "Furniture",
    file: "models/CHAIR.glb",
    description: "Lounge chair with solid oak frame and boucle seat.",
    dimensions: "W 70 × D 72 × H 80 cm",
    materials: "Oak, boucle"
  },
  {
    title: "Sample Sculpture",
    category: "Art",
    file: "models/sculpture.glb",
    description: "Abstract sculpture, cast resin with matte finish.",
    dimensions: "W 30 × D 30 × H 60 cm",
    materials: "Resin"
  }
  // copy a block above for each new piece (add a comma between blocks)
];
