import { CakeItem, TastingBoxItem } from '../types/cake';

export const SIGNATURE_CAKES: CakeItem[] = [
  {
    id: 'valrhona-noir-ganache',
    name: 'Noir & Cacao Grand Cru',
    tagline: 'Valrhona 70% dark chocolate sponge, espresso ganache, and blackberry crown',
    category: 'classic-layers',
    basePrice: 68,
    servings: '8–10 guests (6")',
    image: '/src/assets/images/cake_valrhona_chocolate_1791181727728.jpg',
    description:
      'A masterclass in pure chocolate decadence. Four layers of moist Valrhona Guanaja chocolate sponge brushed with slow-dripped cold brew liqueur, filled with whipped dark chocolate ganache and sea salt flakes. Finished with crisp chocolate shards, seasonal blackberries, and 24-karat gold dust.',
    flavorNotes: ['70% Dark Chocolate', 'Roasted Espresso', 'Blackberry Tartness', 'Maldon Flake Salt'],
    sponge: 'Valrhona Grand Cru Dark Cocoa Sponge',
    filling: 'Whipped Bittersweet Espresso Ganache & Salted Crunch',
    exterior: 'Hand-textured dark chocolate silk glaze with gold-dusted shards',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    dietaryFeatures: ['Organic Heirloom Flour', 'Single-Origin Cocoa', 'Alcohol-Free Option'],
    sizes: [
      { label: '6" Petite Round', servings: '8–10 servings', inches: 6, priceMultiplier: 1.0 },
      { label: '8" Classic Celebration', servings: '14–18 servings', inches: 8, priceMultiplier: 1.45 },
      { label: '10" Grand Gala', servings: '24–30 servings', inches: 10, priceMultiplier: 2.1 },
      { label: 'Two-Tier Gala (6"+8")', servings: '32–38 servings', inches: 14, priceMultiplier: 2.9 }
    ],
    isBestseller: true,
    rating: 4.96,
    reviewsCount: 142,
    storageCare: 'Refrigerate until 1 hour prior to slicing. Slice with a long knife warmed in hot water.'
  },
  {
    id: 'pistachio-rose-raspberry',
    name: 'Pistache & Framboise Botanique',
    tagline: 'Bronte pistachio velvet sponge, tart raspberry coulis, and whipped white chocolate',
    category: 'botanical-citrus',
    basePrice: 74,
    servings: '8–10 guests (6")',
    image: '/src/assets/images/cake_pistachio_raspberry_1791181739435.jpg',
    description:
      'Inspired by Sicilian orchards and Parisian salons. Ground Sicilian Bronte pistachio sponge layered with simmered wild raspberry coulis and delicate rosewater-infused white chocolate chantilly. Encased in a velvety pale sage finish and crowned with fresh heritage raspberries and edible blush rose petals.',
    flavorNotes: ['Roasted Sicilian Pistachio', 'Wild Raspberry Coulis', 'Damask Rosewater', 'Creamy Vanilla'],
    sponge: 'Slow-ground Bronte Pistachio & Almond Crumb',
    filling: 'Wild Raspberry Reduction & White Chocolate Crème',
    exterior: 'Sage-tinted velvet cocoa butter spray with fresh raspberries and petals',
    allergens: ['Tree Nuts (Pistachio, Almond)', 'Gluten', 'Dairy', 'Eggs'],
    dietaryFeatures: ['Natural Fruit Colors', 'No Artificial Essences', 'Low Sugar Profile'],
    sizes: [
      { label: '6" Petite Round', servings: '8–10 servings', inches: 6, priceMultiplier: 1.0 },
      { label: '8" Classic Celebration', servings: '14–18 servings', inches: 8, priceMultiplier: 1.45 },
      { label: '10" Grand Gala', servings: '24–30 servings', inches: 10, priceMultiplier: 2.1 },
      { label: 'Two-Tier Gala (6"+8")', servings: '32–38 servings', inches: 14, priceMultiplier: 2.9 }
    ],
    isBestseller: true,
    isSeasonal: true,
    rating: 4.98,
    reviewsCount: 98,
    storageCare: 'Keep chilled. Best served cool at room temperature. Consume within 72 hours of collection.'
  },
  {
    id: 'lemon-meyer-lavender',
    name: 'Citron Meyer & Wild Lavender',
    tagline: 'Bright Meyer lemon curd, Provence lavender syrup, and whipped mascarpone',
    category: 'botanical-citrus',
    basePrice: 65,
    servings: '8–10 guests (6")',
    image: '/src/assets/images/cake_lemon_lavender_1791181750378.jpg',
    description:
      'An invigorating, fragrant botanical cake. Tender lemon poppyseed sponge saturated with organic Meyer lemon syrup, filled with house-curated lemon curd and whipped mascarpone. Semi-naked ivory finish crowned with candied lemon wheels, fresh blueberries, and wild organic Provence lavender sprigs.',
    flavorNotes: ['Meyer Lemon Zest', 'Floral Lavender', 'Whipped Mascarpone', 'Poppyseed Crunch'],
    sponge: 'Organic Meyer Lemon & Poppyseed Sponge',
    filling: 'Tangy Lemon Curd & Lavender Whipped Mascarpone',
    exterior: 'Semi-naked ivory buttercream with candied citrus and wild sprigs',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    dietaryFeatures: ['Organic California Citrus', 'Direct-Farm Lavender', 'Nut-Free Recipe'],
    sizes: [
      { label: '6" Petite Round', servings: '8–10 servings', inches: 6, priceMultiplier: 1.0 },
      { label: '8" Classic Celebration', servings: '14–18 servings', inches: 8, priceMultiplier: 1.45 },
      { label: '10" Grand Gala', servings: '24–30 servings', inches: 10, priceMultiplier: 2.1 }
    ],
    isSeasonal: true,
    rating: 4.92,
    reviewsCount: 64,
    storageCare: 'Store chilled in its original cake box. Bring to room temperature 45 minutes before cutting.'
  },
  {
    id: 'celeste-three-tier-wedding',
    name: 'Céleste Botanical Tiered Gala',
    tagline: 'Our signature multi-tier architectural celebration cake with pressed heirloom flora',
    category: 'signature-tiers',
    basePrice: 195,
    servings: '36–45 guests (3 Tiers)',
    image: '/src/assets/images/hero_artisanal_tiered_cake_1791181713565.jpg',
    description:
      'The crown jewel of our bakery atelier. Three tiers of hand-sculpted celebration perfection with contrasting crumb layers: Madagascan Vanilla Bean and Salted Caramel Crunch on bottom, Earl Grey Lavender in the center, and Lemon Berry on top. Adorned with pressed edible garden violas, organic dried Smyrna figs, and feathered 24k gold leaf.',
    flavorNotes: ['Bourbon Vanilla Bean', 'Fleur de Sel Caramel', 'Bergamot Earl Grey', 'Wild Figs'],
    sponge: 'Choice of dual flavor tiers (Vanilla Bean & Earl Grey Lavender)',
    filling: 'Swiss Meringue Buttercream, Salted Toffee Crumble & Berry Coulis',
    exterior: 'Stucco-textured ivory buttercream with pressed pressed heirloom flora and 24k leaf',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    dietaryFeatures: ['Custom Tier Flavoring', 'White-Glove Setup Included', 'Certified Floral Safe'],
    sizes: [
      { label: '2-Tier Classic (6"+8")', servings: '28–34 servings', inches: 14, priceMultiplier: 1.0 },
      { label: '3-Tier Signature (6"+8"+10")', servings: '45–55 servings', inches: 24, priceMultiplier: 1.65 },
      { label: '4-Tier Grand Estate', servings: '75–90 servings', inches: 32, priceMultiplier: 2.5 }
    ],
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 89,
    storageCare: 'White-glove refrigerated delivery recommended. Requires sturdy display table away from direct sunlight.'
  },
  {
    id: 'earl-grey-caramel-poire',
    name: 'Earl Grey & Poire Williams',
    tagline: 'Slow-steeped bergamot black tea crumb, poached Williams pear, and burnt honey cream',
    category: 'classic-layers',
    basePrice: 69,
    servings: '8–10 guests (6")',
    image: '/src/assets/images/cake_valrhona_chocolate_1791181727728.jpg',
    description:
      'Subtle and profoundly aromatic. Sponge infused with organic loose-leaf Bergamot Earl Grey, layered with spiced Williams pear compote and whipped burnt wild honey buttercream. Decorated with dehydrated pear chips, toasted buckwheat, and cinnamon bark notes.',
    flavorNotes: ['Bergamot Tea', 'Poached Spiced Pear', 'Burnt Wild Honey', 'Subtle Cardamom'],
    sponge: 'Bergamot Earl Grey Infused Sponge',
    filling: 'Williams Pear Compote & Honey Whipped Buttercream',
    exterior: 'Smooth fawn-colored Swiss meringue buttercream with dried botanical accents',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    dietaryFeatures: ['Fair-Trade Tea', 'Local Organic Orchard Pears', 'Nut-Free Recipe'],
    sizes: [
      { label: '6" Petite Round', servings: '8–10 servings', inches: 6, priceMultiplier: 1.0 },
      { label: '8" Classic Celebration', servings: '14–18 servings', inches: 8, priceMultiplier: 1.45 },
      { label: '10" Grand Gala', servings: '24–30 servings', inches: 10, priceMultiplier: 2.1 }
    ],
    rating: 4.89,
    reviewsCount: 47,
    storageCare: 'Refrigerate until 1 hour prior to serving for optimal crumb tenderness.'
  },
  {
    id: 'vegan-matcha-passionfruit',
    name: 'Matcha Uji & Passion Crème (Vegan)',
    tagline: 'Ceremonial Uji matcha sponge, tangy passionfruit silk curd, and oat milk chantilly',
    category: 'gluten-free-vegan',
    basePrice: 72,
    servings: '8–10 guests (6")',
    image: '/src/assets/images/cake_pistachio_raspberry_1791181739435.jpg',
    description:
      '100% plant-based without compromise. Premium ceremonial grade Uji matcha sponge made with organic cold-pressed olive oil, layered with zesty tropical passionfruit curd and fluffy whipped oat cream. Dairy-free, egg-free, and thoroughly unforgettable.',
    flavorNotes: ['Ceremonial Matcha', 'Tropical Passionfruit', 'Creamy Oat Milk', 'Light Citrus'],
    sponge: 'Ceremonial Grade Matcha Olive Oil Sponge',
    filling: 'Plant-Based Passionfruit Curd & Whipped Oat Chantilly',
    exterior: 'Natural matcha-dusted velvet finish with edible white jasmine petals',
    allergens: ['Gluten (Gluten-Free Flour option available)', 'Oat'],
    dietaryFeatures: ['100% Vegan & Dairy-Free', 'Egg-Free', 'Organic Olive Oil Sponge'],
    sizes: [
      { label: '6" Petite Round', servings: '8–10 servings', inches: 6, priceMultiplier: 1.0 },
      { label: '8" Classic Celebration', servings: '14–18 servings', inches: 8, priceMultiplier: 1.45 },
      { label: '10" Grand Gala', servings: '24–30 servings', inches: 10, priceMultiplier: 2.1 }
    ],
    rating: 4.94,
    reviewsCount: 52,
    storageCare: 'Keep strictly refrigerated. Enjoy within 48 hours for freshest matcha vibrance.'
  }
];

export const TASTING_FLIGHT: TastingBoxItem = {
  id: 'atelier-tasting-flight-box',
  name: 'The Atelier Four-Slice Tasting Flight',
  description:
    'Experience our signature flavors before your wedding, milestone gala, or special celebration. Beautifully packaged in an embossed presentation box with tasting notes, wood presentation spoons, and pairing guide.',
  flavorPicks: [
    'Noir & Cacao Grand Cru (Valrhona 70%)',
    'Pistache & Framboise Botanique',
    'Citron Meyer & Wild Lavender',
    'Earl Grey & Poire Williams'
  ],
  price: 38,
  image: '/src/assets/images/cake_pistachio_raspberry_1791181739435.jpg'
};

export const REVIEWS = [
  {
    author: 'Genevieve & Henri Laurent',
    role: 'Wedding at Villa Bella, Provence',
    occasion: '3-Tier Botanical Wedding Cake',
    rating: 5,
    text: 'Maison Céleste sculpted our wedding cake with such exquisite artistry. Guests were photographing it like a museum piece, and when we cut the first slice of Pistachio Raspberry, people literally gasped at the flavor balance. Sublime.'
  },
  {
    author: 'Clara Vance',
    role: 'Creative Director, Studio Monolith',
    occasion: '40th Milestone Birthday Gala',
    rating: 5,
    text: 'The Noir & Cacao Grand Cru was unlike any chocolate cake in the city. Deep, velvety, perfectly bittersweet with delicate blackberry notes. The delivery was right on time in a temperature-controlled case.'
  },
  {
    author: 'Julian & Mateo S.',
    role: 'Private Estate Reception',
    occasion: 'Custom 2-Tier Celebration',
    rating: 5,
    text: 'We booked the Tasting Flight first, which made choosing our cake combination a wonderful Sunday ritual. The finished cake exceeded all our expectations.'
  }
];

export const FAQS = [
  {
    q: 'How far in advance should I place my cake order?',
    a: 'For our Signature Layer Cakes, we recommend booking at least 48 to 72 hours in advance. For Custom Atelier 2-tier or 3-tier celebration cakes, we advise booking 2 to 4 weeks ahead to reserve kitchen studio time.'
  },
  {
    q: 'Can you accommodate dietary restrictions and allergies?',
    a: 'Yes. We offer dedicated Gluten-Free flour options and 100% plant-based Vegan recipes. While we follow rigorous sanitization in our studio kitchen, please note we handle tree nuts, dairy, and wheat on the premises.'
  },
  {
    q: 'How does delivery work?',
    a: 'We provide specialized white-glove chilled courier delivery within a 25-mile radius. Cakes are transported in custom shock-absorbing insulated cases to ensure flawless arrival. Atelier collection is also available free of charge.'
  },
  {
    q: 'How should I store and serve my cake?',
    a: 'All our cakes should remain chilled until roughly 45 to 60 minutes before your event. Serving at gentle room temperature allows the European butter in our meringue and the sponge crumb to reach peak silken texture.'
  }
];
