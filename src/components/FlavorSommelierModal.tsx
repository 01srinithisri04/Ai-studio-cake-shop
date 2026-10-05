import React, { useState } from 'react';
import { SIGNATURE_CAKES } from '../data/cakes';
import { CakeItem } from '../types/cake';
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';

interface FlavorSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCake: (cake: CakeItem) => void;
}

const QUESTIONS = [
  {
    id: 'occasion',
    title: 'What celebration are you planning?',
    subtitle: 'This helps us gauge aesthetic drama and profile notes',
    options: [
      { label: 'Romantic Wedding or Milestone Anniversary', value: 'wedding', tag: 'signature-tiers' },
      { label: 'Intimate Birthday or Candlelit Dinner', value: 'intimate', tag: 'classic-layers' },
      { label: 'Sunny Garden Party or Afternoon Tea', value: 'garden', tag: 'botanical-citrus' },
      { label: 'Gourmet Corporate Gala or Launch Party', value: 'gala', tag: 'classic-layers' },
    ],
  },
  {
    id: 'taste',
    title: 'What taste sensation thrills your palate most?',
    subtitle: 'Select the primary sensory experience you desire',
    options: [
      { label: 'Deep Bittersweet Cacao & Roasted Espresso', value: 'chocolate', cakeId: 'valrhona-noir-ganache' },
      { label: 'Sun-Drenched Meyer Lemon & Wild Lavender', value: 'citrus', cakeId: 'lemon-meyer-lavender' },
      { label: 'Roasted Bronte Pistachio & Ruby Wild Raspberries', value: 'pistachio', cakeId: 'pistachio-rose-raspberry' },
      { label: 'Bergamot Earl Grey & Spiced Williams Pear', value: 'tea', cakeId: 'earl-grey-caramel-poire' },
    ],
  },
  {
    id: 'dietary',
    title: 'Any dietary preferences for your guests?',
    subtitle: 'Every creation is leavened with zero artificial additives',
    options: [
      { label: 'Traditional French Organic Wheat & Normandy Butter', value: 'traditional' },
      { label: '100% Plant-Based / Dairy-Free Vegan', value: 'vegan', cakeId: 'vegan-matcha-passionfruit' },
      { label: 'Certified Gluten-Free Almond & Oat Flours', value: 'gf' },
      { label: 'Muted Sweetness (Reduced Cane Sugar)', value: 'low-sugar' },
    ],
  },
];

export const FlavorSommelierModal: React.FC<FlavorSommelierModalProps> = ({
  isOpen,
  onClose,
  onSelectCake,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matchedCake, setMatchedCake] = useState<CakeItem | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, value: string, cakeId?: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Find match
      let match: CakeItem | undefined;
      if (updated.dietary === 'vegan') {
        match = SIGNATURE_CAKES.find((c) => c.id === 'vegan-matcha-passionfruit');
      } else if (cakeId) {
        match = SIGNATURE_CAKES.find((c) => c.id === cakeId);
      } else if (updated.taste === 'chocolate') {
        match = SIGNATURE_CAKES.find((c) => c.id === 'valrhona-noir-ganache');
      } else if (updated.taste === 'citrus') {
        match = SIGNATURE_CAKES.find((c) => c.id === 'lemon-meyer-lavender');
      } else if (updated.taste === 'pistachio') {
        match = SIGNATURE_CAKES.find((c) => c.id === 'pistachio-rose-raspberry');
      } else {
        match = SIGNATURE_CAKES[0];
      }
      setMatchedCake(match || SIGNATURE_CAKES[0]);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedCake(null);
  };

  const q = QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DD] overflow-hidden my-auto p-6 sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white text-[#201A18] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!matchedCake ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECE5DD] pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A58252]" />
                <span className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
                  Pastry Sommelier Concierge
                </span>
              </div>
              <span className="text-xs font-mono text-[#8A7E76] tabular-nums">
                Step {currentStep + 1} of {QUESTIONS.length}
              </span>
            </div>

            <div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201A18]">
                {q.title}
              </h3>
              <p className="text-xs text-[#6B625D] mt-1">{q.subtitle}</p>
            </div>

            <div className="space-y-2.5">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(q.id, opt.value, (opt as any).cakeId)}
                  className="w-full text-left p-4 rounded-xl border border-[#ECE5DD] bg-white hover:border-[#201A18] hover:bg-[#FAF8F5] transition-all flex items-center justify-between text-xs sm:text-sm text-[#201A18]"
                >
                  <span className="font-medium">{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#8A7E76]" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs text-[#8A7E76] hover:text-[#201A18] underline underline-offset-4"
                >
                  ← Previous question
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#A58252] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Your Bespoke Match</span>
            </div>

            <h3 className="font-serif-display text-3xl font-normal text-[#201A18]">
              {matchedCake.name}
            </h3>

            <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-[#ECE5DD] shadow-sm max-w-md mx-auto">
              <img
                src={matchedCake.image}
                alt={matchedCake.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-[#5A524D] leading-relaxed max-w-md mx-auto">
              {matchedCake.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {matchedCake.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="bg-white border border-[#ECE5DD] px-3 py-1 rounded-full text-[#4D4540]"
                >
                  {note}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-xs font-medium text-[#201A18] hover:bg-[#FAF8F5]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>

              <button
                onClick={() => {
                  onSelectCake(matchedCake);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#201A18] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#382F2C]"
              >
                <span>View Full Cake & Customize</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
