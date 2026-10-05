import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, Truck, ChefHat, Sparkles } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderRef?: string;
}

const SAMPLE_ORDERS: Record<
  string,
  {
    cakeName: string;
    size: string;
    targetDate: string;
    fulfillment: string;
    currentStage: number; // 1 to 5
    chefNotes: string;
    temperature: string;
  }
> = {
  'MC-849201': {
    cakeName: 'Céleste Botanical Tiered Gala',
    size: '3-Tier Signature (6"+8"+10")',
    targetDate: 'Tomorrow at 11:30 AM',
    fulfillment: 'Chilled White-Glove Courier',
    currentStage: 4,
    chefNotes: 'Edible heirloom violas and 24k gold leaf placed on second tier. Resting in 3.5°C climate room.',
    temperature: '3.5°C Chilled Hold',
  },
  'MC-521944': {
    cakeName: 'Noir & Cacao Grand Cru',
    size: '8" Classic Celebration',
    targetDate: 'Friday at 2:00 PM',
    fulfillment: 'Atelier Pickup Desk',
    currentStage: 2,
    chefNotes: 'Valrhona Grand Cru cocoa sponge pulled from stone oven at 10:15 AM. Cooling on beech racks.',
    temperature: 'Ambient Kitchen Room',
  },
};

const STAGES = [
  { step: 1, title: 'Order Confirmed', desc: 'Flours, butter & single-origin cacao reserved' },
  { step: 2, title: 'Sponge Baked & Leavened', desc: 'Slow-baked in French deck ovens and resting' },
  { step: 3, title: 'Layered & Chilled', desc: 'Whipped ganache & curd layered with crumb' },
  { step: 4, title: 'Piped & Botanical Adornment', desc: 'Custom plaque piped and organic flora set' },
  { step: 5, title: 'Dispatched in Cold-Chain Box', desc: 'En route with courier or waiting at pickup counter' },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderRef = '',
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderRef || 'MC-849201');
  const [activeOrder, setActiveOrder] = useState<any>(SAMPLE_ORDERS['MC-849201']);
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = orderQuery.trim().toUpperCase();
    if (SAMPLE_ORDERS[clean]) {
      setActiveOrder(SAMPLE_ORDERS[clean]);
    } else {
      // Generate realistic fallback state for any order #
      setActiveOrder({
        cakeName: 'Signature Celebration Creation',
        size: '8" Round (14–18 servings)',
        targetDate: 'Scheduled 48h Advance Slot',
        fulfillment: 'Atelier Collection',
        currentStage: 3,
        chefNotes: 'Buttercream smoothed and currently chilling in preparation for final piping.',
        temperature: '4.0°C Chilled Hold',
      });
    }
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DD] overflow-hidden my-auto p-6 sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white text-[#201A18] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="border-b border-[#ECE5DD] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
              Live Atelier Bake Radar
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201A18] mt-1">
              Track Your Cake’s Journey
            </h3>
            <p className="text-xs text-[#6B625D]">
              Observe each meticulous phase from morning oven deck to chilled courier handoff.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#9E928A]" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order Reference (e.g. MC-849201)"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white border border-[#DCD3C7] rounded-lg text-[#201A18] focus:outline-none focus:ring-1 focus:ring-[#201A18]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#201A18] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#382F2C] transition-colors"
            >
              Locate
            </button>
          </form>

          {/* Quick sample chips */}
          <div className="flex items-center gap-2 text-[11px] text-[#8A7E76]">
            <span>Try sample order:</span>
            <button
              onClick={() => {
                setOrderQuery('MC-849201');
                setActiveOrder(SAMPLE_ORDERS['MC-849201']);
              }}
              className="underline hover:text-[#201A18]"
            >
              MC-849201 (Wedding Tier)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setOrderQuery('MC-521944');
                setActiveOrder(SAMPLE_ORDERS['MC-521944']);
              }}
              className="underline hover:text-[#201A18]"
            >
              MC-521944 (Chocolate Noir)
            </button>
          </div>

          {/* Order Status Display */}
          {activeOrder && (
            <div className="space-y-6 pt-2">
              {/* Order summary banner */}
              <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] flex flex-col sm:flex-row justify-between gap-3 text-xs">
                <div>
                  <div className="font-serif-display text-lg font-medium text-[#201A18]">
                    {activeOrder.cakeName}
                  </div>
                  <div className="text-[#827871]">{activeOrder.size} · {activeOrder.fulfillment}</div>
                </div>
                <div className="sm:text-right">
                  <div className="text-[11px] text-[#8C8078] uppercase">Target Delivery</div>
                  <div className="font-medium text-[#201A18]">{activeOrder.targetDate}</div>
                  <div className="text-[10px] text-emerald-800 font-mono mt-0.5">
                    ● {activeOrder.temperature}
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-4">
                {STAGES.map((s) => {
                  const isDone = s.step < activeOrder.currentStage;
                  const isCurrent = s.step === activeOrder.currentStage;
                  const isPending = s.step > activeOrder.currentStage;

                  return (
                    <div key={s.step} className="flex items-start gap-3.5 text-xs">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] ${
                          isDone
                            ? 'bg-emerald-800 text-white'
                            : isCurrent
                            ? 'bg-[#201A18] text-white ring-4 ring-[#EAE0D5]'
                            : 'bg-[#F0EBE3] text-[#A89D97]'
                        }`}
                      >
                        {isDone ? '✓' : s.step}
                      </div>

                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            isCurrent ? 'text-[#201A18] text-sm' : isDone ? 'text-[#3D3531]' : 'text-[#A89D97]'
                          }`}
                        >
                          {s.title}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-sans uppercase tracking-wider font-semibold">
                              In Progress
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#827871] mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chef’s Log Note */}
              <div className="p-3.5 bg-[#F3EFEA] rounded-lg border border-[#E5DDD2] text-xs flex items-start gap-2.5 text-[#554C47]">
                <ChefHat className="w-4 h-4 text-[#A58252] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#201A18]">Chef de Patisserie Log: </span>
                  {activeOrder.chefNotes}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
