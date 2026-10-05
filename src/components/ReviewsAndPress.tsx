import React, { useState } from 'react';
import { REVIEWS, FAQS } from '../data/cakes';
import { ChevronDown, ChevronUp, Star, Award } from 'lucide-react';

export const ReviewsAndPress: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Press Mentions Banner */}
        <div className="text-center space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
            Recognized & Celebrated By
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-[#6B625D]">
            <span className="font-serif-display text-xl sm:text-2xl tracking-wide text-[#3D3531]">
              VOGUE LIVING
            </span>
            <span className="text-[#CCC3B8] hidden sm:inline">·</span>
            <span className="font-serif-display text-xl sm:text-2xl tracking-wide text-[#3D3531]">
              FOOD & WINE
            </span>
            <span className="text-[#CCC3B8] hidden sm:inline">·</span>
            <span className="font-serif-display text-xl sm:text-2xl tracking-wide text-[#3D3531]">
              MICHELIN GUIDE SELECTED 2025
            </span>
            <span className="text-[#CCC3B8] hidden sm:inline">·</span>
            <span className="font-serif-display text-xl sm:text-2xl tracking-wide text-[#3D3531]">
              ARCHITECTURAL DIGEST
            </span>
          </div>
        </div>

        {/* Client Reviews Grid */}
        <div>
          <div className="max-w-xl mx-auto text-center space-y-2 mb-12">
            <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              Client Commendations
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#201A18]">
              Memories Baked in Gold & Sugar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE5DD] flex flex-col justify-between shadow-xs hover:border-[#D5C7B7] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#A58252]">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A423D] leading-relaxed italic">
                    “{review.text}”
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F2ECE4]">
                  <div className="font-serif-display text-base font-medium text-[#201A18]">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#827871]">{review.role}</div>
                  <div className="text-[11px] text-[#A58252] mt-0.5 font-medium">
                    {review.occasion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#ECE5DD]">
          <div className="text-center space-y-2 mb-10">
            <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              Inquiries & Guidance
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201A18]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#ECE5DD] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-medium text-[#201A18] hover:text-[#A58252] transition-colors"
                  >
                    <span className="font-serif-display text-base sm:text-lg">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8A7E76] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A7E76] shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-[#6B625D] leading-relaxed border-t border-[#FAF8F5] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
