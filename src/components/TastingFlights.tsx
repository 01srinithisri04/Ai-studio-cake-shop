import React, { useState } from 'react';
import { TASTING_FLIGHT } from '../data/cakes';
import { CartItem } from '../types/cake';
import { Check, Sparkles, Package, Utensils, HeartHandshake } from 'lucide-react';

interface TastingFlightsProps {
  onAddFlightToCart: (item: CartItem) => void;
}

export const TastingFlights: React.FC<TastingFlightsProps> = ({ onAddFlightToCart }) => {
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddFlight = () => {
    const item: CartItem = {
      cartId: `flight-${Date.now()}`,
      name: TASTING_FLIGHT.name,
      image: TASTING_FLIGHT.image,
      sizeLabel: '4-Slice Tasting Flight',
      servings: '2–4 guests',
      unitPrice: TASTING_FLIGHT.price,
      quantity: 1,
      customMessage: 'Signature Flavor Flight',
      dietaryPreference: 'Chef Selected Seasonal Flight',
    };
    onAddFlightToCart(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <section id="tasting-flights" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3EFEA] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E5DDD2] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
                <span>Wedding & Gala Curation</span>
                <span aria-hidden="true">·</span>
                <span>Delivered Nationwide</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#201A18] text-balance">
                The Atelier Tasting Flight Box
              </h2>

              <p className="text-sm sm:text-base text-[#5A524D] leading-relaxed">
                Selecting your wedding cake or anniversary tier should be an indulgent sensory ritual. We bake and ship four generous slices of our most requested flavor pairings in a chilled embossed botanical keepsake box.
              </p>

              {/* Slices list */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider text-[#8A7E76] font-medium">
                  Included in this season’s tasting flight:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#201A18]">
                  {TASTING_FLIGHT.flavorPicks.map((flavor, idx) => (
                    <div
                      key={flavor}
                      className="p-3 bg-white rounded-lg border border-[#E5DDD2] flex items-center gap-2.5"
                    >
                      <span className="font-mono text-[11px] text-[#A58252] font-semibold tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-medium truncate">{flavor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#6B625D]">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#A58252]" />
                  <span>Embossed linen box</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#A58252]" />
                  <span>Curated tasting cards & notes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#A58252]" />
                  <span>$38 credited toward wedding cake</span>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex items-center gap-4">
                <div>
                  <span className="text-[11px] text-[#8C8078] block">Flight Price</span>
                  <span className="font-mono text-2xl font-bold text-[#201A18] tabular-nums">
                    ${TASTING_FLIGHT.price}
                  </span>
                </div>

                <button
                  onClick={handleAddFlight}
                  disabled={addedNotice}
                  className={`px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs ${
                    addedNotice
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#201A18] hover:bg-[#382F2C] text-white'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A979]" />
                      <span>Order Tasting Flight</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3 bg-[#FAF8F5]">
                <img
                  src={TASTING_FLIGHT.image}
                  alt="Atelier Tasting Flight Box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-serif-display text-lg block font-light">Freshly Chilled & Insulated</span>
                  <span className="text-[#EAE0D5] text-[11px]">Shipped overnight with organic cold packs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
