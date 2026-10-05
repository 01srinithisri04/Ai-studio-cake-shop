import React, { useState, useMemo } from 'react';
import { CakeItem, CakeCategory } from '../types/cake';
import { ArrowUpRight, Plus, Eye, Sparkles, Filter } from 'lucide-react';

interface SignatureCatalogProps {
  cakes: CakeItem[];
  onSelectCake: (cake: CakeItem) => void;
  onQuickAdd: (cake: CakeItem) => void;
}

export const SignatureCatalog: React.FC<SignatureCatalogProps> = ({
  cakes,
  onSelectCake,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CakeCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'nut-free' | 'vegan-gf'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const matchCat =
        selectedCategory === 'all' ? true : cake.category === selectedCategory;
      const matchSearch =
        cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchDiet = true;
      if (dietaryFilter === 'nut-free') {
        matchDiet = !cake.allergens.some((a) => a.toLowerCase().includes('nut'));
      } else if (dietaryFilter === 'vegan-gf') {
        matchDiet =
          cake.category === 'gluten-free-vegan' ||
          cake.dietaryFeatures.some((d) => d.toLowerCase().includes('gluten-free') || d.toLowerCase().includes('vegan'));
      }

      return matchCat && matchSearch && matchDiet;
    });
  }, [cakes, selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section id="signature-catalog" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              Curated Patisserie Collection
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#201A18] text-balance">
              Signature Layer Cakes & Ceremonial Tiers
            </h2>
            <p className="text-sm sm:text-base text-[#6B625D]">
              Each creation is baked to order, adorned with hand-pressed wild botanicals and finished with silken meringue buttercream.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flavors, chocolate, berries..."
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] placeholder-[#9E928A] focus:outline-none focus:ring-1 focus:ring-[#201A18] transition-all"
            />
          </div>
        </div>

        {/* Filter Controls (Segmented controls with proper click handlers) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-[#ECE5DD] mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0EBE3] rounded-lg">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#201A18] shadow-xs'
                  : 'text-[#6B625D] hover:text-[#201A18]'
              }`}
            >
              All Creations
            </button>
            <button
              onClick={() => setSelectedCategory('signature-tiers')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === 'signature-tiers'
                  ? 'bg-white text-[#201A18] shadow-xs'
                  : 'text-[#6B625D] hover:text-[#201A18]'
              }`}
            >
              Multi-Tier Galas
            </button>
            <button
              onClick={() => setSelectedCategory('classic-layers')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === 'classic-layers'
                  ? 'bg-white text-[#201A18] shadow-xs'
                  : 'text-[#6B625D] hover:text-[#201A18]'
              }`}
            >
              Classic Layer Cakes
            </button>
            <button
              onClick={() => setSelectedCategory('botanical-citrus')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === 'botanical-citrus'
                  ? 'bg-white text-[#201A18] shadow-xs'
                  : 'text-[#6B625D] hover:text-[#201A18]'
              }`}
            >
              Botanicals & Citrus
            </button>
            <button
              onClick={() => setSelectedCategory('gluten-free-vegan')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedCategory === 'gluten-free-vegan'
                  ? 'bg-white text-[#201A18] shadow-xs'
                  : 'text-[#6B625D] hover:text-[#201A18]'
              }`}
            >
              Gluten-Free & Vegan
            </button>
          </div>

          {/* Secondary Filter: Allergy & Dietary */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#827871] hidden sm:inline">Dietary:</span>
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  dietaryFilter === 'all'
                    ? 'font-medium text-[#201A18] underline underline-offset-4'
                    : 'text-[#827871] hover:text-[#201A18]'
                }`}
              >
                All
              </button>
              <span className="text-[#CCC3B8]">/</span>
              <button
                onClick={() => setDietaryFilter('nut-free')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  dietaryFilter === 'nut-free'
                    ? 'font-medium text-[#201A18] underline underline-offset-4'
                    : 'text-[#827871] hover:text-[#201A18]'
                }`}
              >
                Nut-Free Only
              </button>
              <span className="text-[#CCC3B8]">/</span>
              <button
                onClick={() => setDietaryFilter('vegan-gf')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  dietaryFilter === 'vegan-gf'
                    ? 'font-medium text-[#201A18] underline underline-offset-4'
                    : 'text-[#827871] hover:text-[#201A18]'
                }`}
              >
                Plant / GF Options
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredCakes.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-xl border border-[#ECE5DD] p-8 max-w-lg mx-auto">
            <p className="text-base text-[#5A524D] mb-4">
              No cakes found matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#201A18] underline underline-offset-4 hover:text-[#A58252]"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredCakes.map((cake) => (
              <div
                key={cake.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#EBE3D8] hover:border-[#D5C7B7] hover:shadow-md transition-all duration-300"
              >
                {/* 65-75% Imagery Anchor */}
                <div
                  className="relative aspect-4/3 overflow-hidden bg-[#F3EFEA] cursor-pointer"
                  onClick={() => onSelectCake(cake)}
                >
                  <img
                    src={cake.image}
                    alt={cake.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Clean unboxed tag in corner */}
                  {cake.isBestseller && (
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#201A18] text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded border border-[#E5DDD2]">
                      Atelier Favorite
                    </div>
                  )}

                  {cake.isSeasonal && !cake.isBestseller && (
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#8A5B2E] text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded border border-[#E5DDD2]">
                      Seasonal Release
                    </div>
                  )}

                  {/* Quick view overlay button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-[#201A18] text-xs font-medium px-4 py-2 rounded-full shadow-md inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View Details & Sizing
                    </span>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#8A7E76]">
                      <span className="font-mono tabular-nums">{cake.servings}</span>
                      <span aria-hidden="true">·</span>
                      <span>★ {cake.rating.toFixed(2)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">({cake.reviewsCount})</span>
                    </div>

                    <h3
                      onClick={() => onSelectCake(cake)}
                      className="font-serif-display text-xl sm:text-2xl font-normal text-[#201A18] hover:text-[#A58252] cursor-pointer transition-colors"
                    >
                      {cake.name}
                    </h3>

                    <p className="text-xs text-[#6B625D] line-clamp-2 leading-relaxed">
                      {cake.tagline}
                    </p>

                    {/* Flavor Notes preview as subtle text */}
                    <div className="pt-1 flex flex-wrap gap-1 text-[11px] text-[#7A6F68]">
                      {cake.flavorNotes.slice(0, 3).map((note, i) => (
                        <span key={note}>
                          {note}
                          {i < 2 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#8C8078] uppercase">From</div>
                      <div className="font-mono text-lg font-medium text-[#201A18] tabular-nums">
                        ${cake.basePrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectCake(cake)}
                        className="px-3 py-2 text-xs font-medium text-[#4D4540] hover:text-[#201A18] hover:bg-[#F3EFEA] rounded-lg transition-colors"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => onQuickAdd(cake)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#201A18] hover:bg-[#382F2C] text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
