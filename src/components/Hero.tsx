import React from 'react';
import { ArrowRight, Cake, Clock, Award, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreCakes: () => void;
  onDesignCustom: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCakes, onDesignCustom }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:py-20 border-b border-[#ECE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              <span>Artisanal Patisserie</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2018</span>
              <span aria-hidden="true">·</span>
              <span>Parisian Craft</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#201A18] text-balance">
              Sculpted Cakes for Life’s Most Luminous Celebrations
            </h1>

            <p className="text-base sm:text-lg text-[#5A524D] leading-relaxed max-w-xl font-normal">
              Every morning in our studio atelier, master pastry artisans fold organic French stone-ground flours, Tahitian vanilla caviar, and Grand Cru cacao into botanical tiers of quiet beauty.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreCakes}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#201A18] text-white text-sm font-medium rounded-lg hover:bg-[#382F2C] transition-colors shadow-xs"
              >
                <span>Order Signature Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDesignCustom}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#DCD3C7] text-[#201A18] text-sm font-medium rounded-lg hover:bg-[#F3EFEA] transition-colors"
              >
                <Cake className="w-4 h-4 text-[#A58252]" />
                <span>Custom Cake Studio</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-[#ECE5DD] grid grid-cols-3 gap-4 text-xs text-[#6B625D]">
              <div>
                <div className="font-medium text-[#201A18] text-sm tabular-nums">48-Hour</div>
                <div className="text-[12px] text-[#827871]">Fresh bake prep</div>
              </div>
              <div>
                <div className="font-medium text-[#201A18] text-sm">100% Organic</div>
                <div className="text-[12px] text-[#827871]">Heirloom flours & dairy</div>
              </div>
              <div>
                <div className="font-medium text-[#201A18] text-sm">White-Glove</div>
                <div className="text-[12px] text-[#827871]">Chilled local courier</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 bg-[#EDE7DE] group">
              <img
                src="/src/assets/images/hero_artisanal_tiered_cake_1791181713565.jpg"
                alt="Bespoke artisanal three-tier botanical celebration cake with pressed edible flowers and gold leaf"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                onError={(e) => {
                  // Fallback container styling
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Floating detail tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#EAE0D5] font-medium">The Signature Tier</div>
                  <div className="font-serif-display text-xl sm:text-2xl font-light">Céleste Botanical Gala</div>
                </div>
                <span className="font-mono text-sm sm:text-base tabular-nums font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20">
                  from $195
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
