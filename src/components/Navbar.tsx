import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenTracker: () => void;
  onOpenSommelier: () => void;
  onOpenSlicingGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
  onOpenTracker,
  onOpenSommelier,
  onOpenSlicingGuide,
}) => {
  return (
    <>
      {/* Slim Promotional / Concierge Utility Bar (< 36px) */}
      <div className="bg-[#201A18] text-[#D8CECA] text-[11px] py-1.5 px-4 text-center border-b border-[#362D29]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-[#A89D97]">
            <span>Normandy Cultured Butter</span>
            <span aria-hidden="true">·</span>
            <span>Single-Origin Valrhona Cacao</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-3">
            <span>Complimentary Chilled Courier on Orders $150+</span>
            <span className="text-[#6B625D]">/</span>
            <button
              onClick={onOpenSommelier}
              className="text-[#EAE0D5] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Flavor Match Quiz
            </button>
            <span className="text-[#6B625D] hidden md:inline">/</span>
            <button
              onClick={onOpenSlicingGuide}
              className="text-[#EAE0D5] hover:text-white underline underline-offset-2 transition-colors cursor-pointer hidden md:inline"
            >
              Portion Guide
            </button>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE5DD] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark in display serif */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#201A18] hover:text-[#A58252] transition-colors"
          >
            Maison Céleste
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B625D]">
            <button
              onClick={() => onNavigate('signature-catalog')}
              className={`hover:text-[#201A18] transition-colors relative py-1 ${
                activeSection === 'signature-catalog' ? 'text-[#201A18] font-semibold' : ''
              }`}
            >
              Signature Cakes
              {activeSection === 'signature-catalog' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#201A18]" />
              )}
            </button>
            <button
              onClick={() => onNavigate('custom-atelier')}
              className={`hover:text-[#201A18] transition-colors relative py-1 ${
                activeSection === 'custom-atelier' ? 'text-[#201A18] font-semibold' : ''
              }`}
            >
              Bespoke Atelier
              {activeSection === 'custom-atelier' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#201A18]" />
              )}
            </button>
            <button
              onClick={() => onNavigate('tasting-flights')}
              className={`hover:text-[#201A18] transition-colors relative py-1 ${
                activeSection === 'tasting-flights' ? 'text-[#201A18] font-semibold' : ''
              }`}
            >
              Tasting Flights
              {activeSection === 'tasting-flights' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#201A18]" />
              )}
            </button>
            <button
              onClick={() => onNavigate('our-craft')}
              className={`hover:text-[#201A18] transition-colors relative py-1 ${
                activeSection === 'our-craft' ? 'text-[#201A18] font-semibold' : ''
              }`}
            >
              Our Story
              {activeSection === 'our-craft' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#201A18]" />
              )}
            </button>
            <button
              onClick={onOpenTracker}
              className="hover:text-[#201A18] transition-colors py-1 text-[#8A7E76]"
            >
              Track Bake
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('custom-atelier')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#201A18] bg-[#F1EAE2] hover:bg-[#E8DEC0] rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A58252]" />
              <span>Design Custom Cake</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative flex items-center justify-center p-2.5 rounded-lg border border-[#E5DDD2] bg-white text-[#201A18] hover:bg-[#FAF8F5] transition-all shadow-xs"
            >
              <ShoppingBag className="w-5 h-5 text-[#201A18]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#201A18] text-white text-[11px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
