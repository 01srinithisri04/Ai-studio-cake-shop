import React, { useState } from 'react';
import { CustomCakeConfig, CartItem } from '../types/cake';
import { Sparkles, Check, Info, RefreshCw } from 'lucide-react';

interface CakeCustomizerProps {
  onAddCustomCake: (customItem: CartItem) => void;
}

const TIER_OPTIONS = [
  { tiers: 1 as const, sizeLabel: '6" Petite Round', servings: '8–10 servings', basePrice: 85 },
  { tiers: 1 as const, sizeLabel: '8" Celebration Round', servings: '14–18 servings', basePrice: 120 },
  { tiers: 2 as const, sizeLabel: '2-Tier Classic (6" + 8")', servings: '28–34 servings', basePrice: 210 },
  { tiers: 3 as const, sizeLabel: '3-Tier Grand Gala (6" + 8" + 10")', servings: '45–55 servings', basePrice: 340 },
];

const SPONGE_OPTIONS = [
  { id: 'vanilla-bean', name: 'Madagascan Bourbon Vanilla Bean', price: 0, color: '#F7F0DF' },
  { id: 'valrhona-cocoa', name: 'Valrhona Grand Cru Dark Cocoa', price: 0, color: '#3E2D24' },
  { id: 'bronte-pistachio', name: 'Sicilian Bronte Pistachio Sponge', price: 12, color: '#A6BD9C' },
  { id: 'lemon-poppyseed', name: 'Meyer Lemon & Organic Poppyseed', price: 0, color: '#F9EDA5' },
  { id: 'earl-grey', name: 'Slow-Steeped Bergamot Earl Grey', price: 6, color: '#D4C4B5' },
  { id: 'spiced-carrot', name: 'Spiced Walnut & Carrot Crumb', price: 6, color: '#C8855A' },
];

const FILLING_OPTIONS = [
  { id: 'salted-caramel', name: 'Fleur de Sel Caramel Swiss Buttercream', price: 0, color: '#C88D44' },
  { id: 'mascarpone-berries', name: 'Whipped Mascarpone & Wild Berry Coulis', price: 8, color: '#8A2B49' },
  { id: 'praline-ganache', name: 'Belgian Hazelnut Praline & Dark Ganache', price: 10, color: '#543A2F' },
  { id: 'passionfruit-curd', name: 'Tangy Passionfruit Curd & White Chocolate', price: 8, color: '#E89C2A' },
  { id: 'bourbon-chantilly', name: 'Tahitian Vanilla Bean Whipped Chantilly', price: 0, color: '#FFFDF5' },
];

const FINISH_PALETTES = [
  { id: 'ivory-silk', name: 'Silk Ivory Buttercream', hex: '#FAF8F5', border: '#E2DBD2' },
  { id: 'textured-stucco', name: 'Rustic Stucco Warm Cream', hex: '#EFE8DE', border: '#D5C7B7' },
  { id: 'sage-velvet', name: 'Sage Botanical Velvet', hex: '#DFE7DF', border: '#BFCFBF' },
  { id: 'blush-petal', name: 'Vintage Rose Blush', hex: '#F5E4E0', border: '#DEBFB8' },
  { id: 'noir-velvet', name: 'Espresso Velvet Cocoa', hex: '#3B302B', textColor: '#F5EBE6', border: '#2A201C' },
];

const BOTANICAL_OPTIONS = [
  { id: 'edible-violas', name: 'Pressed Edible Violas & Florals', price: 14 },
  { id: 'gold-leaf', name: '24-Karat Edible Gold Leaf Accents', price: 16 },
  { id: 'fresh-berries-figs', name: 'Blackberries & Smyrna Figs Crown', price: 15 },
  { id: 'macaron-halo', name: 'Handmade Parisian Macarons (6 pcs)', price: 18 },
  { id: 'candied-citrus', name: 'Candied Citrus Wheels & Lavender', price: 12 },
];

export const CakeCustomizer: React.FC<CakeCustomizerProps> = ({ onAddCustomCake }) => {
  const [selectedTier, setSelectedTier] = useState(TIER_OPTIONS[0]);
  const [selectedSponge, setSelectedSponge] = useState(SPONGE_OPTIONS[0]);
  const [selectedFilling, setSelectedFilling] = useState(FILLING_OPTIONS[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISH_PALETTES[0]);
  const [selectedBotanicals, setSelectedBotanicals] = useState<string[]>(['edible-violas']);
  const [viewMode, setViewMode] = useState<'exterior' | 'cutaway'>('exterior');
  const [pipingMessage, setPipingMessage] = useState('Happy Celebration');
  const [occasion, setOccasion] = useState('Birthday');
  const [dietaryOption, setDietaryOption] = useState<'Standard Organic' | 'Gluten-Free Flour' | 'Vegan (Plant-Based)'>('Standard Organic');
  const [includeCandles, setIncludeCandles] = useState(true);
  const [addCakeStand, setAddCakeStand] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  // Calculate dynamic price
  const botanicalsCost = selectedBotanicals.reduce((sum, bId) => {
    const item = BOTANICAL_OPTIONS.find((b) => b.id === bId);
    return sum + (item ? item.price : 0);
  }, 0);

  const dietaryCost = dietaryOption === 'Gluten-Free Flour' ? 8 : dietaryOption === 'Vegan (Plant-Based)' ? 10 : 0;
  const standCost = addCakeStand ? 24 : 0;

  const calculatedTotal =
    selectedTier.basePrice +
    selectedSponge.price +
    selectedFilling.price +
    botanicalsCost +
    dietaryCost +
    standCost;

  const toggleBotanical = (id: string) => {
    if (selectedBotanicals.includes(id)) {
      setSelectedBotanicals(selectedBotanicals.filter((b) => b !== id));
    } else {
      setSelectedBotanicals([...selectedBotanicals, id]);
    }
  };

  const handleAddToCart = () => {
    const customConfig: CustomCakeConfig = {
      tiers: selectedTier.tiers,
      sizeLabel: selectedTier.sizeLabel,
      spongeFlavor: selectedSponge.name,
      fillingFlavor: selectedFilling.name,
      finishStyle: selectedFinish.name,
      paletteColor: selectedFinish.hex,
      botanicals: selectedBotanicals.map(
        (bId) => BOTANICAL_OPTIONS.find((b) => b.id === bId)?.name || bId
      ),
      pipingMessage,
      pipingTextColor: selectedFinish.textColor || '#201A18',
      occasion,
      dietaryOption,
      includeCandles,
      addCakeStand,
      specialInstructions,
      calculatedPrice: calculatedTotal,
    };

    const cartItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      name: `Bespoke ${selectedTier.sizeLabel}`,
      image: '/src/assets/images/hero_artisanal_tiered_cake_1791181713565.jpg',
      sizeLabel: selectedTier.sizeLabel,
      servings: selectedTier.servings,
      unitPrice: calculatedTotal,
      quantity: 1,
      customMessage: pipingMessage || 'No inscription',
      dietaryPreference: dietaryOption,
      isCustomCake: true,
      customDetails: customConfig,
    };

    onAddCustomCake(cartItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <section id="custom-atelier" className="py-16 sm:py-24 bg-[#F5F0E8] border-y border-[#ECE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
            Interactive Studio Experience
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#201A18]">
            The Bespoke Cake Atelier
          </h2>
          <p className="text-sm text-[#6B625D]">
            Design your one-of-a-kind celebration cake. Choose your architecture, organic flavor pairings, botanical finishes, and live inscription plaque.
          </p>
        </div>

        {/* Studio Layout: Visualizer on Left (Sticky), Options on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Live Visualizer & Price Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD2] shadow-sm flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-[#8A7E76] mb-3 pb-2 border-b border-[#ECE5DD]">
                <div className="flex items-center gap-1 p-0.5 bg-[#F0EBE3] rounded-md">
                  <button
                    onClick={() => setViewMode('exterior')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      viewMode === 'exterior'
                        ? 'bg-white text-[#201A18] shadow-2xs'
                        : 'text-[#6B625D] hover:text-[#201A18]'
                    }`}
                  >
                    Exterior Finish
                  </button>
                  <button
                    onClick={() => setViewMode('cutaway')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      viewMode === 'cutaway'
                        ? 'bg-white text-[#201A18] shadow-2xs'
                        : 'text-[#6B625D] hover:text-[#201A18]'
                    }`}
                  >
                    Layer Cutaway
                  </button>
                </div>
                <span className="font-mono tabular-nums">{selectedTier.servings}</span>
              </div>

              {/* Interactive 2D Cake Canvas Simulation */}
              <div className="w-full h-80 relative flex flex-col items-center justify-end pb-4 bg-[#FAF8F5] rounded-xl border border-[#ECE5DD] overflow-hidden">
                {/* Background decorative atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(#E8DFD3_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                {/* Cake Stand */}
                <div className="w-48 h-3 bg-[#D9CEBF] rounded-t-sm shadow-xs relative z-10" />
                <div className="w-16 h-8 bg-[#C5B7A4] shadow-xs relative z-10" />
                <div className="w-32 h-2.5 bg-[#B8A790] rounded-b-md shadow-sm relative z-10" />

                {/* Cake Tiers (rendered conditionally based on tier selection) */}
                <div className="absolute bottom-16 flex flex-col items-center z-20">
                  {/* Top Tier (Tier 3 or single tier) */}
                  {selectedTier.tiers >= 3 && (
                    <div
                      style={{ backgroundColor: viewMode === 'exterior' ? selectedFinish.hex : '#FFFFFF' }}
                      className="w-24 h-12 rounded-t-md shadow-xs border border-[#C9BDB0] relative flex flex-col justify-between overflow-hidden transition-all duration-300"
                    >
                      {viewMode === 'cutaway' ? (
                        <div className="w-full h-full flex flex-col justify-between p-1 bg-white/20">
                          <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                          <div style={{ backgroundColor: selectedFilling.color }} className="w-full h-1" />
                          <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                        </div>
                      ) : (
                        <>
                          {selectedBotanicals.includes('gold-leaf') && (
                            <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.3px]" />
                          )}
                          {selectedBotanicals.includes('edible-violas') && (
                            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-purple-400" />
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Middle Tier (Tier 2 or Tier 3) */}
                  {selectedTier.tiers >= 2 && (
                    <div
                      style={{ backgroundColor: viewMode === 'exterior' ? selectedFinish.hex : '#FFFFFF' }}
                      className="w-36 h-14 shadow-xs border-x border-b border-[#C9BDB0] relative flex flex-col justify-between overflow-hidden transition-all duration-300"
                    >
                      {viewMode === 'cutaway' ? (
                        <div className="w-full h-full flex flex-col justify-between p-1 bg-white/20">
                          <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                          <div style={{ backgroundColor: selectedFilling.color }} className="w-full h-1" />
                          <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                          <div style={{ backgroundColor: selectedFilling.color }} className="w-full h-1" />
                          <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                        </div>
                      ) : (
                        <>
                          {selectedBotanicals.includes('gold-leaf') && (
                            <div className="absolute bottom-3 right-6 w-2 h-2 rounded-full bg-amber-400 blur-[0.3px]" />
                          )}
                          {selectedBotanicals.includes('fresh-berries-figs') && (
                            <div className="absolute top-1 left-2 w-2.5 h-2.5 rounded-full bg-rose-900" />
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Bottom / Base Tier */}
                  <div
                    style={{
                      backgroundColor: viewMode === 'exterior' ? selectedFinish.hex : '#FFFFFF',
                      width: selectedTier.tiers === 1 ? (selectedTier.sizeLabel.includes('8"') ? '160px' : '130px') : '190px',
                      height: selectedTier.tiers === 1 ? '70px' : '60px',
                    }}
                    className="shadow-md border border-[#C9BDB0] rounded-b-md relative flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    {viewMode === 'cutaway' ? (
                      <div className="w-full h-full flex flex-col justify-between p-1.5 bg-white/20">
                        <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                        <div style={{ backgroundColor: selectedFilling.color }} className="w-full h-1.5" />
                        <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                        <div style={{ backgroundColor: selectedFilling.color }} className="w-full h-1.5" />
                        <div style={{ backgroundColor: selectedSponge.color }} className="w-full flex-1 rounded-2xs" />
                      </div>
                    ) : (
                      <>
                        {/* Live Inscription Plaque */}
                        {pipingMessage && (
                          <div
                            style={{ color: selectedFinish.textColor || '#201A18' }}
                            className="bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs border border-[#E5DDD2] text-[10px] font-serif-display text-center max-w-[170px] truncate z-10"
                          >
                            “{pipingMessage}”
                          </div>
                        )}

                        {/* Botanical decorations on bottom */}
                        {selectedBotanicals.includes('edible-violas') && (
                          <div className="absolute bottom-2 left-3 w-2 h-2 rounded-full bg-purple-500 opacity-90" />
                        )}
                        {selectedBotanicals.includes('fresh-berries-figs') && (
                          <div className="absolute bottom-2 right-4 w-2.5 h-2.5 rounded-full bg-red-950" />
                        )}
                        {selectedBotanicals.includes('gold-leaf') && (
                          <div className="absolute top-3 left-4 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.2px]" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Candles on top */}
                {includeCandles && (
                  <div
                    className="absolute z-30 flex items-center gap-1"
                    style={{
                      bottom:
                        selectedTier.tiers === 3 ? '170px' : selectedTier.tiers === 2 ? '150px' : '135px',
                    }}
                  >
                    <div className="w-1 h-4 bg-amber-100 relative">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>

              {/* Live Spec Summary */}
              <div className="w-full mt-6 space-y-2 text-xs border-t border-[#ECE5DD] pt-4">
                <div className="flex justify-between text-[#6B625D]">
                  <span>Tier & Architecture:</span>
                  <span className="font-medium text-[#201A18]">{selectedTier.sizeLabel}</span>
                </div>
                <div className="flex justify-between text-[#6B625D]">
                  <span>Sponge Crumb:</span>
                  <span className="font-medium text-[#201A18] truncate max-w-[180px]">{selectedSponge.name}</span>
                </div>
                <div className="flex justify-between text-[#6B625D]">
                  <span>Filling Silk:</span>
                  <span className="font-medium text-[#201A18] truncate max-w-[180px]">{selectedFilling.name}</span>
                </div>
                <div className="flex justify-between text-[#6B625D]">
                  <span>Finish Texture:</span>
                  <span className="font-medium text-[#201A18]">{selectedFinish.name}</span>
                </div>
                <div className="flex justify-between text-[#6B625D]">
                  <span>Dietary Base:</span>
                  <span className="font-medium text-[#201A18]">{dietaryOption}</span>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="w-full mt-6 pt-4 border-t border-[#ECE5DD] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8C8078] block">Custom Quote</span>
                  <span className="font-mono text-2xl font-bold text-[#201A18] tabular-nums">
                    ${calculatedTotal}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedNotice}
                  className={`px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs ${
                    addedNotice
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#201A18] hover:bg-[#382F2C] text-white'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Custom Cake Added</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A979]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD2] space-y-8">
            {/* Step 1: Tier Architecture */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                  1. Tier Architecture & Guest Count
                </label>
                <span className="text-xs text-[#8A7E76]">Choose proportion</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIER_OPTIONS.map((tier) => (
                  <button
                    key={tier.sizeLabel}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      selectedTier.sizeLabel === tier.sizeLabel
                        ? 'border-[#201A18] bg-[#FAF8F5] ring-1 ring-[#201A18]'
                        : 'border-[#ECE5DD] hover:border-[#D5C7B7]'
                    }`}
                  >
                    <div className="font-medium text-sm text-[#201A18]">{tier.sizeLabel}</div>
                    <div className="text-xs text-[#827871] mt-0.5">{tier.servings}</div>
                    <div className="font-mono text-xs font-semibold text-[#201A18] mt-2 tabular-nums">
                      ${tier.basePrice}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sponge Crumb Flavor */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-3">
                2. Sponge Base (Organic French Flour)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SPONGE_OPTIONS.map((sponge) => (
                  <button
                    key={sponge.id}
                    onClick={() => setSelectedSponge(sponge)}
                    className={`p-3 text-left rounded-lg border text-xs transition-all flex items-center justify-between ${
                      selectedSponge.id === sponge.id
                        ? 'border-[#201A18] bg-[#FAF8F5] font-medium text-[#201A18]'
                        : 'border-[#ECE5DD] text-[#554C47] hover:border-[#D5C7B7]'
                    }`}
                  >
                    <span>{sponge.name}</span>
                    {sponge.price > 0 && (
                      <span className="font-mono text-[11px] text-[#8C8078] tabular-nums">
                        +${sponge.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Layer Filling */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-3">
                3. Layer Filling & Silk Crème
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FILLING_OPTIONS.map((filling) => (
                  <button
                    key={filling.id}
                    onClick={() => setSelectedFilling(filling)}
                    className={`p-3 text-left rounded-lg border text-xs transition-all flex items-center justify-between ${
                      selectedFilling.id === filling.id
                        ? 'border-[#201A18] bg-[#FAF8F5] font-medium text-[#201A18]'
                        : 'border-[#ECE5DD] text-[#554C47] hover:border-[#D5C7B7]'
                    }`}
                  >
                    <span>{filling.name}</span>
                    {filling.price > 0 && (
                      <span className="font-mono text-[11px] text-[#8C8078] tabular-nums">
                        +${filling.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Exterior Shade & Texture */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-3">
                4. Exterior Palette & Texture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FINISH_PALETTES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                      selectedFinish.id === finish.id
                        ? 'border-[#201A18] ring-1 ring-[#201A18]'
                        : 'border-[#ECE5DD] hover:border-[#D5C7B7]'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: finish.hex, borderColor: finish.border }}
                      className="w-5 h-5 rounded-full border shadow-2xs shrink-0"
                    />
                    <span className="text-xs text-[#201A18] font-medium truncate">
                      {finish.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Botanical Adornments */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                  5. Hand-Adorned Botanicals & Accents
                </label>
                <span className="text-xs text-[#8A7E76]">Select one or more</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BOTANICAL_OPTIONS.map((botanical) => {
                  const isChecked = selectedBotanicals.includes(botanical.id);
                  return (
                    <button
                      key={botanical.id}
                      onClick={() => toggleBotanical(botanical.id)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#201A18] bg-[#FAF8F5] text-[#201A18] font-medium'
                          : 'border-[#ECE5DD] text-[#554C47] hover:border-[#D5C7B7]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#201A18] border-[#201A18] text-white'
                              : 'border-[#D5C7B7]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{botanical.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#8C8078] tabular-nums">
                        +${botanical.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Inscription & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                  Piping Plaque Inscription
                </label>
                <input
                  type="text"
                  maxLength={36}
                  value={pipingMessage}
                  onChange={(e) => setPipingMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Eleanor"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                  Occasion / Event Type
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                >
                  <option value="Birthday">Milestone Birthday</option>
                  <option value="Wedding">Wedding / Reception</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Baby Shower">Baby Shower / Gender Reveal</option>
                  <option value="Corporate Gala">Corporate Gala / Launch</option>
                </select>
              </div>
            </div>

            {/* Step 7: Dietary Options & Add-ons */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#ECE5DD] space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                Dietary & Presentation Upgrades
              </label>

              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dietary"
                    checked={dietaryOption === 'Standard Organic'}
                    onChange={() => setDietaryOption('Standard Organic')}
                    className="accent-[#201A18]"
                  />
                  <span>Standard Organic French Wheat</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dietary"
                    checked={dietaryOption === 'Gluten-Free Flour'}
                    onChange={() => setDietaryOption('Gluten-Free Flour')}
                    className="accent-[#201A18]"
                  />
                  <span>Gluten-Free Flour Blend (+$8)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dietary"
                    checked={dietaryOption === 'Vegan (Plant-Based)'}
                    onChange={() => setDietaryOption('Vegan (Plant-Based)')}
                    className="accent-[#201A18]"
                  />
                  <span>100% Plant-Based Vegan (+$10)</span>
                </label>
              </div>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#554C47] border-t border-[#ECE5DD]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCandles}
                    onChange={(e) => setIncludeCandles(e.target.checked)}
                    className="accent-[#201A18]"
                  />
                  <span>Include artisan beeswax celebration candle (Free)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addCakeStand}
                    onChange={(e) => setAddCakeStand(e.target.checked)}
                    className="accent-[#201A18]"
                  />
                  <span>Include keepsake fluted ceramic cake stand (+$24)</span>
                </label>
              </div>
            </div>

            {/* Special Chef Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                Specific Chef Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Mention any delivery timing notes, color pantone preferences, or special allergen protocols..."
                className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
