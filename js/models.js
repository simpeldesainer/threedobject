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
   File names are CASE-SENSITIVE on GitHub Pages (chair.glb is not CHAIR.glb). */
window.MODELS = [
  {
    title: "LAZZY CHAIR",
    category: "Furniture",
    file: "models/chair.glb",
    description: "Lounge chair with solid oak frame and boucle seat.",
    dimensions: "W 70 × D 72 × H 80 cm",
    materials: "Oak, boucle"
  },
  {
    title: "DINING TABLE",
    category: "Furniture",
    file: "models/dining-table.glb",
    description: "Dining table. Edit this description.",
    dimensions: "W 200 × D 90 × H 75 cm",
    materials: "Edit materials"
  }
  // copy a block above for each new piece (add a comma between blocks)
];
