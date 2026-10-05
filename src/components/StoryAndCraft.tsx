import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Award, Check } from 'lucide-react';

export const StoryAndCraft: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryGuests, setInquiryGuests] = useState('50-100 guests');
  const [inquiryNotes, setInquiryNotes] = useState('');

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySent(true);
  };

  return (
    <section id="our-craft" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#ECE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy & Craftsmanship Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-[#EDE7DE]">
              <img
                src="/src/assets/images/bakery_atelier_craft_1791181760969.jpg"
                alt="Artisan pastry chef piping delicate buttercream onto celebration cake in bakery atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-serif-display text-lg block font-light">The Atelier Kitchen</span>
                <span className="text-[#EAE0D5] text-[11px]">42 Rue Saint-Honoré · Hand-piped at dawn daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              <span>Pure Ingredients</span>
              <span aria-hidden="true">·</span>
              <span>Conscious Sourcing</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#201A18] text-balance">
              The Slow Art of Botanical Patisserie
            </h2>

            <p className="text-sm sm:text-base text-[#5A524D] leading-relaxed">
              Founded in 2018 by pastry chef Céline Dumont, Maison Céleste was born from a singular conviction: celebration cakes should taste even more transcendent than they look.
            </p>

            <p className="text-sm text-[#5A524D] leading-relaxed">
              We completely eschew fondants, artificial syrups, and palm oils. Instead, our sponges are leavened gently, hydrated with cold-pressed olive oils and farm-fresh buttermilk, and balanced by natural acidity from fresh orchard citrus and wild mountain berries.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-[#ECE5DD]">
                <div className="font-medium text-[#201A18] text-sm mb-1">Normandy Butter</div>
                <div className="text-[#827871]">84% cultured butter churned in Isigny Sainte-Mère.</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#ECE5DD]">
                <div className="font-medium text-[#201A18] text-sm mb-1">Organic Edible Blooms</div>
                <div className="text-[#827871]">Heirloom violas and rose petals grown without spray.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit & Bespoke Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Atelier Location & Hours */}
          <div className="lg:col-span-5 bg-[#F3EFEA] rounded-2xl p-6 sm:p-8 border border-[#E5DDD2] space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A7E76] font-medium mb-1">
                Bakery & Studio Counter
              </div>
              <h3 className="font-serif-display text-2xl font-normal text-[#201A18]">
                Visit Our Studio Atelier
              </h3>
              <p className="text-xs text-[#6B625D] mt-2">
                Order pick-ups, wedding consultation appointments, and daily seasonal pastry counter.
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#4D4540]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#201A18]">Maison Céleste Atelier</div>
                  <div className="text-[#6B625D]">42 Rue Saint-Honoré / 144 Baker St Suite B</div>
                  <div className="text-[#827871]">Curbside pickup bays available at rear entrance</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#201A18]">Hours of Collection</div>
                  <div className="text-[#6B625D]">Tuesday – Saturday: 8:00 AM – 6:00 PM</div>
                  <div className="text-[#6B625D]">Sunday: 9:00 AM – 3:00 PM (Orders only)</div>
                  <div className="text-[#827871]">Closed on Mondays for studio baking prep</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#201A18]">Direct Studio Line</div>
                  <div className="text-[#6B625D]">(555) 246-8190</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bespoke Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD2] shadow-xs">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wider text-[#8A7E76] font-medium mb-1">
                Bespoke Consultations
              </div>
              <h3 className="font-serif-display text-2xl font-normal text-[#201A18]">
                Request a Wedding or Large Event Quote
              </h3>
              <p className="text-xs text-[#6B625D] mt-1">
                For grand receptions, custom dessert tables, or specialized catering over 50 guests.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-[#ECE5DD] space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif-display text-xl text-[#201A18]">
                  Inquiry Received with Pleasure
                </h4>
                <p className="text-xs text-[#6B625D] max-w-md mx-auto">
                  Thank you, {inquiryName}. Chef Céline and our head concierge will review your event details and reply within 24 business hours with custom concepts.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="text-xs font-semibold text-[#201A18] underline underline-offset-4 hover:text-[#A58252] pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Genevieve Laurent"
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g. genevieve@example.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                      Target Event Date
                    </label>
                    <input
                      type="date"
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                      Estimated Guest Count
                    </label>
                    <select
                      value={inquiryGuests}
                      onChange={(e) => setInquiryGuests(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    >
                      <option value="25-50 guests">25 – 50 guests</option>
                      <option value="50-100 guests">50 – 100 guests</option>
                      <option value="100-200 guests">100 – 200 guests</option>
                      <option value="200+ guests">200+ guests (Grand Gala)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                    Event Vision & Flavor Inspirations
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Describe your venue, color palette, floral aesthetics, dietary guidelines..."
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#201A18] hover:bg-[#382F2C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  Submit Bespoke Event Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
