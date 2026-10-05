import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C1715] text-[#D8CECA] pt-16 pb-12 border-t border-[#2D2623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#2E2522]">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif-display text-2xl font-light tracking-wide text-white block">
              Maison Céleste
            </span>
            <p className="text-xs text-[#A89D97] leading-relaxed max-w-sm">
              Artisanal patisserie and custom celebration cake atelier. Baked at dawn using single-origin stone-ground wheat, Valrhona chocolate, and fresh pesticide-free botanicals.
            </p>
            <div className="text-xs text-[#8F837D] pt-2">
              42 Rue Saint-Honoré / 144 Baker St Suite B
              <br />
              Tuesday – Saturday: 8am – 6pm · Sunday: 9am – 3pm
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <div className="font-medium uppercase tracking-wider text-white">The Atelier</div>
            <ul className="space-y-2 text-[#A89D97]">
              <li>
                <a href="#signature-catalog" className="hover:text-white transition-colors">
                  Signature Cakes
                </a>
              </li>
              <li>
                <a href="#custom-atelier" className="hover:text-white transition-colors">
                  Bespoke Studio
                </a>
              </li>
              <li>
                <a href="#tasting-flights" className="hover:text-white transition-colors">
                  Tasting Flights
                </a>
              </li>
              <li>
                <a href="#our-craft" className="hover:text-white transition-colors">
                  Ingredients & Sourcing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dietary & Care */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <div className="font-medium uppercase tracking-wider text-white">Guidance</div>
            <ul className="space-y-2 text-[#A89D97]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Gluten-Free & Vegan
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cake Slicing & Storage
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Courier Delivery Zones
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Event Table Setup
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-medium uppercase tracking-wider text-white text-xs">
              Seasonal Releases & Privileges
            </div>
            <p className="text-xs text-[#A89D97]">
              Subscribe to receive notice of limited holiday collections, secret seasonal flavors, and atelier masterclasses.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#2A221F] rounded-lg text-xs text-[#E0D7D3] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are on our private salon ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 bg-[#2A221F] border border-[#3E3430] rounded-lg text-white placeholder-[#7C716B] focus:outline-none focus:border-[#A58252]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-2.5 bg-white text-[#1C1715] rounded-lg text-xs font-medium hover:bg-[#EAE0D5] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E68]">
          <div>
            © {new Date().getFullYear()} Maison Céleste Patisserie & Cake Studio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#A89D97] cursor-pointer">Terms of Reservation</span>
            <span className="hover:text-[#A89D97] cursor-pointer">Privacy & Food Safety</span>
            <span className="hover:text-[#A89D97] cursor-pointer">Guild Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
