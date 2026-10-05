export type CakeCategory =
  | 'all'
  | 'signature-tiers'
  | 'classic-layers'
  | 'botanical-citrus'
  | 'gluten-free-vegan';

export interface CakeSizeOption {
  label: string;
  servings: string;
  inches: number;
  priceMultiplier: number;
}

export interface CakeItem {
  id: string;
  name: string;
  tagline: string;
  category: CakeCategory;
  basePrice: number;
  servings: string;
  image: string;
  description: string;
  flavorNotes: string[];
  sponge: string;
  filling: string;
  exterior: string;
  allergens: string[];
  dietaryFeatures: string[];
  sizes: CakeSizeOption[];
  isBestseller?: boolean;
  isSeasonal?: boolean;
  rating: number;
  reviewsCount: number;
  storageCare: string;
}

export interface CustomCakeConfig {
  tiers: 1 | 2 | 3;
  sizeLabel: string;
  spongeFlavor: string;
  fillingFlavor: string;
  finishStyle: string;
  paletteColor: string;
  botanicals: string[];
  pipingMessage: string;
  pipingTextColor: string;
  occasion: string;
  dietaryOption: 'Standard Organic' | 'Gluten-Free Flour' | 'Vegan (Plant-Based)';
  includeCandles: boolean;
  addCakeStand: boolean;
  specialInstructions: string;
  calculatedPrice: number;
}

export interface CartItem {
  cartId: string;
  cakeId?: string;
  name: string;
  image: string;
  sizeLabel: string;
  servings: string;
  unitPrice: number;
  quantity: number;
  customMessage?: string;
  dietaryPreference?: string;
  isCustomCake?: boolean;
  customDetails?: Partial<CustomCakeConfig>;
}

export interface TastingBoxItem {
  id: string;
  name: string;
  description: string;
  flavorPicks: string[];
  price: number;
  image: string;
}
