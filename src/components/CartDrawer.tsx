import React, { useState } from 'react';
import { CartItem } from '../types/cake';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Gift, Calendar, Clock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: (deliveryConfig: {
    fulfillment: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    giftNote: string;
    promoDiscount: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  // Delivery date minimum 2 days from today
  const defaultDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning (10:00 AM – 1:00 PM)');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = fulfillment === 'delivery' ? 15 : 0;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CELESTE10' || promoCode.trim().toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "CELESTE10" for 10% off.');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      fulfillment,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      giftNote,
      promoDiscount,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#ECE5DD] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#ECE5DD] flex items-center justify-between bg-white">
            <div>
              <h2 className="font-serif-display text-2xl font-normal text-[#201A18]">
                Your Shopping Bag
              </h2>
              <div className="text-xs text-[#8A7E76] mt-0.5">
                {items.length === 0
                  ? 'Bag is empty'
                  : `${items.reduce((acc, i) => acc + i.quantity, 0)} items reserved`}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#201A18] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F3EFEA] text-[#8A7E76] flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="font-serif-display text-lg text-[#201A18]">
                  Your bag is currently empty
                </div>
                <p className="text-xs text-[#6B625D] max-w-xs mx-auto">
                  Explore our signature celebration cakes or curate a custom creation in the atelier.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#201A18] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.cartId}
                      className="p-4 bg-white rounded-xl border border-[#ECE5DD] flex gap-3.5 relative"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3EFEA] shrink-0 border border-[#ECE5DD]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif-display text-base font-normal text-[#201A18] truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.cartId)}
                              aria-label="Remove item"
                              className="text-[#9E928A] hover:text-red-700 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-[11px] text-[#827871]">
                            {item.sizeLabel} · {item.servings}
                          </div>

                          {item.customMessage && (
                            <div className="text-[11px] text-[#A58252] italic truncate mt-0.5">
                              Plaque: “{item.customMessage}”
                            </div>
                          )}
                          {item.dietaryPreference && (
                            <div className="text-[10px] text-[#6B625D]">
                              {item.dietaryPreference}
                            </div>
                          )}
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#DCD3C7] rounded bg-[#FAF8F5]">
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, -1)}
                              className="px-2 py-0.5 text-xs hover:bg-[#EAE0D5] text-[#201A18]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, 1)}
                              className="px-2 py-0.5 text-xs hover:bg-[#EAE0D5] text-[#201A18]"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-mono text-sm font-semibold text-[#201A18] tabular-nums">
                            ${item.unitPrice * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Selection */}
                <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                    Fulfillment Method
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setFulfillment('pickup')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        fulfillment === 'pickup'
                          ? 'border-[#201A18] bg-[#FAF8F5] font-medium'
                          : 'border-[#ECE5DD] text-[#6B625D]'
                      }`}
                    >
                      <div className="text-[#201A18]">Atelier Pickup</div>
                      <div className="text-[11px] text-[#827871]">Complimentary</div>
                    </button>
                    <button
                      onClick={() => setFulfillment('delivery')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        fulfillment === 'delivery'
                          ? 'border-[#201A18] bg-[#FAF8F5] font-medium'
                          : 'border-[#ECE5DD] text-[#6B625D]'
                      }`}
                    >
                      <div className="text-[#201A18]">Chilled Courier</div>
                      <div className="text-[11px] text-[#827871]">+$15 (White Glove)</div>
                    </button>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="pt-2 border-t border-[#ECE5DD] space-y-2">
                    <div>
                      <label className="text-[11px] text-[#6B625D] flex items-center gap-1 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#A58252]" />
                        <span>Target Preparation Date (Min. 48h lead)</span>
                      </label>
                      <input
                        type="date"
                        min={defaultDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DCD3C7] rounded-md text-[#201A18]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#6B625D] flex items-center gap-1 mb-1">
                        <Clock className="w-3.5 h-3.5 text-[#A58252]" />
                        <span>Window / Time Slot</span>
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#DCD3C7] rounded-md text-[#201A18]"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">
                          Morning (10:00 AM – 1:00 PM)
                        </option>
                        <option value="Afternoon (1:30 PM – 4:30 PM)">
                          Afternoon (1:30 PM – 4:30 PM)
                        </option>
                        <option value="Evening (5:00 PM – 7:00 PM)">
                          Evening (5:00 PM – 7:00 PM)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Promo Code & Gift Note Accordion */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CELESTE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18]"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-3 py-2 bg-[#F0EBE3] hover:bg-[#E5DDD2] text-xs font-medium text-[#201A18] rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="text-[11px] text-emerald-800 font-medium">
                      ✓ Promo code applied (10% Atelier Courtesy savings)
                    </div>
                  )}
                  {promoError && (
                    <div className="text-[11px] text-rose-700">{promoError}</div>
                  )}

                  {/* Gift Note Toggle */}
                  <div className="pt-1">
                    <button
                      onClick={() => setShowGiftInput(!showGiftInput)}
                      className="text-xs text-[#8A7E76] hover:text-[#201A18] flex items-center gap-1.5 underline underline-offset-2"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{showGiftInput ? 'Hide gift message' : 'Add complimentary handwritten note'}</span>
                    </button>
                    {showGiftInput && (
                      <textarea
                        rows={2}
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="Write your personal message to be penned on our gilded card..."
                        className="w-full text-xs p-2.5 mt-2 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18]"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ECE5DD] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B625D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#201A18]">${subtotal}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Atelier Privilege (10%)</span>
                    <span className="font-mono tabular-nums">-${promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Fulfillment ({fulfillment === 'pickup' ? 'Atelier Pickup' : 'Courier'})</span>
                  <span className="font-mono tabular-nums text-[#201A18]">
                    {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#201A18] pt-2 border-t border-[#ECE5DD]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base tabular-nums">${finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 bg-[#201A18] hover:bg-[#382F2C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C8078]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Cold-chain integrity guarantee · Fresh daily bake</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
