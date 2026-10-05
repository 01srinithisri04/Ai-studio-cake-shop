import React, { useState } from 'react';
import { CakeItem, CakeSizeOption } from '../types/cake';
import { X, Check, ShieldAlert, Sparkles, Clock, Info } from 'lucide-react';

interface CakeDetailModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAddToCart: (
    cake: CakeItem,
    size: CakeSizeOption,
    customMessage: string,
    dietaryPref: string,
    quantity: number
  ) => void;
}

export const CakeDetailModal: React.FC<CakeDetailModalProps> = ({
  cake,
  onClose,
  onAddToCart,
}) => {
  if (!cake) return null;

  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(cake.sizes[0]);
  const [customMessage, setCustomMessage] = useState('');
  const [dietaryPref, setDietaryPref] = useState('Standard Organic Recipe');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const calculatedUnitPrice = Math.round(cake.basePrice * selectedSize.priceMultiplier);
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(cake, selectedSize, customMessage, dietaryPref, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DD] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 md:bg-white hover:bg-white text-[#201A18] shadow-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Cake Imagery & Botanical Details */}
        <div className="md:w-1/2 bg-[#F3EFEA] flex flex-col">
          <div className="relative aspect-4/3 md:aspect-auto md:h-80 lg:h-96 w-full overflow-hidden">
            <img
              src={cake.image}
              alt={cake.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <span className="font-serif-display text-lg block font-light">{cake.sponge}</span>
              <span className="text-[#EAE0D5] text-[11px]">{cake.exterior}</span>
            </div>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A7E76] font-medium mb-1">
                Tasting & Profile Notes
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cake.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-white border border-[#E5DDD2] px-2.5 py-1 rounded text-[#4D4540]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E5DDD2] pt-3 text-xs text-[#6B625D] space-y-2">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#201A18]">Allergens: </span>
                  {cake.allergens.join(', ')}.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#201A18]">Care & Slicing: </span>
                  {cake.storageCare}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8A7E76] mb-1">
                <span>★ {cake.rating.toFixed(2)}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{cake.reviewsCount} verified reviews</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201A18]">
                {cake.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B625D] mt-2 leading-relaxed">
                {cake.description}
              </p>
            </div>

            {/* Size & Servings Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-2">
                Select Format & Servings
              </label>
              <div className="space-y-2">
                {cake.sizes.map((size) => {
                  const sizePrice = Math.round(cake.basePrice * size.priceMultiplier);
                  const isSelected = selectedSize.label === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'border-[#201A18] bg-[#FAF8F5] ring-1 ring-[#201A18]'
                          : 'border-[#E5DDD2] hover:border-[#D5C7B7]'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-[#201A18]">{size.label}</div>
                        <div className="text-[11px] text-[#827871]">{size.servings}</div>
                      </div>
                      <div className="font-mono text-sm font-semibold text-[#201A18] tabular-nums">
                        ${sizePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Edible Plaque Piping */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                Custom Chocolate Plaque Inscription (Optional)
              </label>
              <input
                type="text"
                maxLength={45}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Eleanor · Max 45 chars"
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] placeholder-[#9E928A] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
              />
              <span className="text-[11px] text-[#9E928A] mt-1 block">
                Hand-piped in dark or white chocolate on a stamped vanilla sugar plaque.
              </span>
            </div>

            {/* Dietary Modification */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#201A18] mb-1">
                Flour & Dietary Variation
              </label>
              <select
                value={dietaryPref}
                onChange={(e) => setDietaryPref(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
              >
                <option value="Standard Organic Recipe">Standard Organic French Flour Recipe</option>
                <option value="Gluten-Free Almond & Oat Flour (+ $6)">
                  Gluten-Free Almond & Oat Flour (+ $6)
                </option>
                <option value="Low-Sugar Profile">Muted Sweetness (Reduced Cane Sugar)</option>
              </select>
            </div>
          </div>

          {/* Sticky Bottom Actions inside PDP */}
          <div className="pt-6 mt-6 border-t border-[#ECE5DD] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#6B625D]">Quantity:</span>
                <div className="flex items-center border border-[#DCD3C7] rounded-md bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs hover:bg-[#EAE0D5] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-medium tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#EAE0D5] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#8C8078] block">Total Amount</span>
                <span className="font-mono text-xl font-bold text-[#201A18] tabular-nums">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedNotice}
              className={`w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs ${
                addedNotice
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#201A18] hover:bg-[#382F2C] text-white'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Your Shopping Bag</span>
                </>
              ) : (
                <span>Add to Shopping Bag · ${totalPrice}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
