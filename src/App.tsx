import React, { useState } from 'react';
import { SIGNATURE_CAKES } from './data/cakes';
import { CakeItem, CakeSizeOption, CartItem } from './types/cake';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureCatalog } from './components/SignatureCatalog';
import { CakeDetailModal } from './components/CakeDetailModal';
import { CakeCustomizer } from './components/CakeCustomizer';
import { TastingFlights } from './components/TastingFlights';
import { StoryAndCraft } from './components/StoryAndCraft';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlavorSommelierModal } from './components/FlavorSommelierModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SlicingGuideModal } from './components/SlicingGuideModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('signature-catalog');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCakeForModal, setSelectedCakeForModal] = useState<CakeItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isSlicingGuideOpen, setIsSlicingGuideOpen] = useState(false);
  const [activeOrderRef, setActiveOrderRef] = useState('MC-849201');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [deliveryConfig, setDeliveryConfig] = useState<{
    fulfillment: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    giftNote: string;
    promoDiscount: number;
  }>({
    fulfillment: 'pickup',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM – 1:00 PM)',
    giftNote: '',
    promoDiscount: 0,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll to section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleQuickAdd = (cake: CakeItem) => {
    const defaultSize = cake.sizes[0];
    const unitPrice = Math.round(cake.basePrice * defaultSize.priceMultiplier);

    const existingIndex = cartItems.findIndex(
      (item) => item.cakeId === cake.id && item.sizeLabel === defaultSize.label && !item.isCustomCake
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${cake.id}-${defaultSize.inches}-${Date.now()}`,
        cakeId: cake.id,
        name: cake.name,
        image: cake.image,
        sizeLabel: defaultSize.label,
        servings: defaultSize.servings,
        unitPrice,
        quantity: 1,
        customMessage: 'Artisan Finish',
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`Added ${cake.name} to shopping bag.`);
  };

  const handleAddFromModal = (
    cake: CakeItem,
    size: CakeSizeOption,
    customMessage: string,
    dietaryPref: string,
    quantity: number
  ) => {
    const unitPrice = Math.round(cake.basePrice * size.priceMultiplier);
    const newItem: CartItem = {
      cartId: `${cake.id}-${size.inches}-${Date.now()}`,
      cakeId: cake.id,
      name: cake.name,
      image: cake.image,
      sizeLabel: size.label,
      servings: size.servings,
      unitPrice,
      quantity,
      customMessage: customMessage || undefined,
      dietaryPreference: dietaryPref,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${cake.name} (${size.label}) to shopping bag.`);
  };

  const handleAddCustomCake = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    showToast(`Added your bespoke ${customItem.sizeLabel} to shopping bag.`);
  };

  const handleAddFlightToCart = (flightItem: CartItem) => {
    setCartItems((prev) => [...prev, flightItem]);
    showToast('Added The Tasting Flight Box to shopping bag.');
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleProceedToCheckout = (config: {
    fulfillment: 'pickup' | 'delivery';
    date: string;
    timeSlot: string;
    giftNote: string;
    promoDiscount: number;
  }) => {
    setDeliveryConfig(config);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#201A18] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#201A18] text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-white/10 flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
        onOpenSlicingGuide={() => setIsSlicingGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCakes={() => handleNavigate('signature-catalog')}
          onDesignCustom={() => handleNavigate('custom-atelier')}
        />

        {/* Signature Cakes Catalog & PDP modal trigger */}
        <SignatureCatalog
          cakes={SIGNATURE_CAKES}
          onSelectCake={(cake) => setSelectedCakeForModal(cake)}
          onQuickAdd={handleQuickAdd}
        />

        {/* The Bespoke Atelier - Interactive 2D Cake Customizer */}
        <CakeCustomizer onAddCustomCake={handleAddCustomCake} />

        {/* Tasting Flight Box */}
        <TastingFlights onAddFlightToCart={handleAddFlightToCart} />

        {/* Our Craft, Philosophy & Atelier Studio */}
        <StoryAndCraft />

        {/* Reviews, Press & FAQs */}
        <ReviewsAndPress />
      </main>

      {/* Cake Detail Modal (PDP) */}
      <CakeDetailModal
        cake={selectedCakeForModal}
        onClose={() => setSelectedCakeForModal(null)}
        onAddToCart={handleAddFromModal}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Reservation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        deliveryConfig={deliveryConfig}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Flavor Sommelier Matchmaker Modal */}
      <FlavorSommelierModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
        onSelectCake={(cake) => setSelectedCakeForModal(cake)}
      />

      {/* Live Bake Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderRef={activeOrderRef}
      />

      {/* Slicing & Portion Guide Modal */}
      <SlicingGuideModal
        isOpen={isSlicingGuideOpen}
        onClose={() => setIsSlicingGuideOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
