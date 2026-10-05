import React, { useState } from 'react';
import { CartItem } from '../types/cake';
import { X, CheckCircle, ShieldCheck, CreditCard, Clock, MapPin, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryConfig: {
    fulfillment: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    giftNote: string;
    promoDiscount: number;
  };
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryConfig,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Customer state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'pay-on-pickup'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = deliveryConfig.fulfillment === 'delivery' ? 15 : 0;
  const tax = Math.round(subtotal * 0.08); // 8% local tax
  const total = Math.max(0, subtotal - deliveryConfig.promoDiscount + deliveryFee + tax);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    if (deliveryConfig.fulfillment === 'delivery' && (!streetAddress || !postalCode)) return;
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderReference(generatedRef);
      setStep('confirmation');
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step !== 'confirmation') onClose();
        }}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DD] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#ECE5DD] flex items-center justify-between bg-white">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8A7E76] font-medium">
              Maison Céleste Atelier
            </div>
            <h2 className="font-serif-display text-2xl font-normal text-[#201A18]">
              {step === 'confirmation' ? 'Order Confirmed' : 'Checkout & Reservation'}
            </h2>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#201A18] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              {/* Order summary pill */}
              <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#201A18]">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} Items · {deliveryConfig.fulfillment === 'delivery' ? 'Chilled Courier' : 'Atelier Pickup'}
                  </span>
                  <div className="text-[#827871] mt-0.5">
                    Target Date: {deliveryConfig.date} ({deliveryConfig.timeSlot})
                  </div>
                </div>
                <div className="font-mono text-base font-semibold text-[#201A18] tabular-nums">
                  ${total}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                  Recipient & Contact Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Genevieve Laurent"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                      Email Address (for order receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="genevieve@example.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                    Mobile Phone (for delivery / pickup notification) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 019-2834"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                  />
                </div>
              </div>

              {/* Delivery Address (if courier selected) */}
              {deliveryConfig.fulfillment === 'delivery' ? (
                <div className="space-y-3 pt-3 border-t border-[#ECE5DD]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                    Delivery Destination Address
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="742 Evergreen Terrace"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                        Apartment / Suite
                      </label>
                      <input
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="Apt 4B"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="94103"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#201A18]">Atelier Collection Location:</div>
                    <div className="text-[#6B625D]">42 Rue Saint-Honoré / 144 Baker St Suite B</div>
                    <div className="text-[#827871] mt-0.5">
                      Your cake will be boxed in our insulated carrier ready on {deliveryConfig.date} during {deliveryConfig.timeSlot}.
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#201A18] hover:bg-[#382F2C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Continue to Payment · ${total}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
                  Select Payment Method
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#201A18] bg-white ring-1 ring-[#201A18]'
                        : 'border-[#ECE5DD] bg-[#FAF8F5]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#201A18] mb-1.5" />
                    <div className="font-medium text-[#201A18]">Credit Card</div>
                    <div className="text-[10px] text-[#827871]">Visa / MC / Amex</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      paymentMethod === 'apple-pay'
                        ? 'border-[#201A18] bg-white ring-1 ring-[#201A18]'
                        : 'border-[#ECE5DD] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="font-medium text-[#201A18] mb-1.5"> Pay / G-Pay</div>
                    <div className="text-[#201A18]">One-Tap</div>
                    <div className="text-[10px] text-[#827871]">Digital Wallet</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('pay-on-pickup')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      paymentMethod === 'pay-on-pickup'
                        ? 'border-[#201A18] bg-white ring-1 ring-[#201A18]'
                        : 'border-[#ECE5DD] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="font-medium text-[#201A18] mb-1.5">Atelier Pay</div>
                    <div className="text-[#201A18]">Pay on Pickup</div>
                    <div className="text-[10px] text-[#827871]">Cash / Card at counter</div>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#554C47] mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD3C7] rounded-lg text-[#201A18]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-6 bg-white rounded-xl border border-[#ECE5DD] text-center space-y-2 text-xs">
                  <div className="font-serif-display text-lg text-[#201A18]">
                    Biometric Authentication Ready
                  </div>
                  <p className="text-[#6B625D]">
                    Clicking Confirm will trigger your device’s secure Apple Pay or Google Pay payment sheet.
                  </p>
                </div>
              )}

              {paymentMethod === 'pay-on-pickup' && (
                <div className="p-4 bg-[#F3EFEA] rounded-xl border border-[#E5DDD2] text-xs space-y-1">
                  <div className="font-medium text-[#201A18]">Reserve Now, Settle at Pickup</div>
                  <div className="text-[#6B625D]">
                    We will commence your bake 48 hours prior. Present order reference #{orderReference || 'MC-XXXX'} at our studio pickup desk.
                  </div>
                </div>
              )}

              {/* Financial summary breakdown */}
              <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] space-y-2 text-xs text-[#6B625D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#201A18]">${subtotal}</span>
                </div>
                {deliveryConfig.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Atelier Promo Discount</span>
                    <span className="font-mono tabular-nums">-${deliveryConfig.promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-mono tabular-nums text-[#201A18]">
                    {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono tabular-nums text-[#201A18]">${tax}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#201A18] pt-2 border-t border-[#ECE5DD]">
                  <span>Total Due</span>
                  <span className="font-mono text-lg tabular-nums">${total}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 bg-[#FAF8F5] border border-[#DCD3C7] text-xs font-semibold text-[#201A18] rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3.5 px-6 bg-[#201A18] hover:bg-[#382F2C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <span>Authorize & Place Order · ${total}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
                  Reservation Confirmed
                </div>
                <h3 className="font-serif-display text-3xl font-normal text-[#201A18]">
                  Order #{orderReference}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A524D] max-w-md mx-auto">
                  A receipt and preparation schedule have been emailed to <span className="font-medium text-[#201A18]">{email || 'your email'}</span>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-white rounded-xl border border-[#ECE5DD] p-6 text-left space-y-4 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-[#ECE5DD]">
                  <span className="font-serif-display text-base font-medium text-[#201A18]">
                    Atelier Preparation Schedule
                  </span>
                  <span className="font-mono text-xs text-[#827871]">{deliveryConfig.date}</span>
                </div>

                <div className="space-y-2 text-[#554C47]">
                  <div className="flex justify-between">
                    <span>Fulfillment:</span>
                    <span className="font-medium text-[#201A18]">
                      {deliveryConfig.fulfillment === 'delivery'
                        ? `White-Glove Courier to ${streetAddress || 'Address on file'}`
                        : 'Atelier Pickup (42 Rue Saint-Honoré)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Window:</span>
                    <span className="font-medium text-[#201A18]">{deliveryConfig.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <span className="font-medium text-[#201A18]">{fullName} ({phone})</span>
                  </div>
                  {deliveryConfig.giftNote && (
                    <div className="pt-2 border-t border-[#F2ECE4] text-[#A58252] italic">
                      “{deliveryConfig.giftNote}”
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#ECE5DD] flex justify-between font-bold text-sm text-[#201A18]">
                  <span>Total Amount Paid</span>
                  <span className="font-mono tabular-nums">${total}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-xs font-medium text-[#201A18] hover:bg-[#FAF8F5]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#201A18] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#382F2C]"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
