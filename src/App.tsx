import React, { useState, useMemo, useEffect } from 'react';
import { BidiProduct, CartItem, OrderDetails, UserReview } from './types';
import { BIDI_PRODUCTS, INITIAL_REVIEWS, BRAND_VIDEOS } from './data/bidiData';
import { FLAT_ALL_REVIEWS } from './data/bidiReviews';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar, FilterState } from './components/FilterBar';
import { BidiCard } from './components/BidiCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EffectsShowcase } from './components/EffectsShowcase';
import { VideoShowcase } from './components/VideoShowcase';
import { EinsteinHistorySection } from './components/EinsteinHistorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FunTriviaSection } from './components/FunTriviaSection';
import { Footer } from './components/Footer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { DealershipModal } from './components/DealershipModal';
import { BlendFinderQuizModal } from './components/BlendFinderQuizModal';
import { CheckCircle, Flame, Layers, ShieldCheck } from 'lucide-react';

export default function App() {
  // Products state
  const [products] = useState<BidiProduct[]>(BIDI_PRODUCTS);

  // Reviews state with localStorage fallback and FLAT_ALL_REVIEWS
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem('monon_reviews');
      if (saved) {
        const parsed: UserReview[] = JSON.parse(saved);
        // Ensure all default 20+ reviews per product from FLAT_ALL_REVIEWS exist
        const customReviews = parsed.filter(p => !FLAT_ALL_REVIEWS.some(a => a.id === p.id));
        return [...customReviews, ...FLAT_ALL_REVIEWS];
      }
      return FLAT_ALL_REVIEWS;
    } catch {
      return FLAT_ALL_REVIEWS;
    }
  });

  // Cart state with localStorage fallback
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('monon_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('monon_reviews', JSON.stringify(reviews));
    } catch {
      // Ignore storage errors
    }
  }, [reviews]);

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<BidiProduct | null>(null);
  const [selectedProductTab, setSelectedProductTab] = useState<'details' | 'reviews' | 'win_spin' | 'qa'>('details');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenProductModal = (product: BidiProduct, tab: 'details' | 'reviews' | 'win_spin' | 'qa' = 'details') => {
    setSelectedProductTab(tab);
    setSelectedProduct(product);
  };

  // Interactive Portals
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | undefined>(undefined);
  const [isDealershipOpen, setIsDealershipOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Filtering and Searching State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    strength: 'all',
    sortBy: 'featured',
  });

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Search Filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchEnglish = item.englishName.toLowerCase().includes(q);
          const matchFlavor = item.flavor.toLowerCase().includes(q);
          const matchEffects = item.effects.some((eff) => eff.toLowerCase().includes(q));
          const matchTrivia = item.funnyTrivia.toLowerCase().includes(q);
          const matchIngredient = item.secretIngredient.toLowerCase().includes(q);
          if (
            !matchName &&
            !matchEnglish &&
            !matchFlavor &&
            !matchEffects &&
            !matchTrivia &&
            !matchIngredient
          ) {
            return false;
          }
        }

        // Category Filter
        if (filters.category !== 'all') {
          if (item.category !== filters.category) return false;
        }

        // Strength Filter
        if (filters.strength !== 'all') {
          if (filters.strength === 'mild' && item.strength > 2) return false;
          if (filters.strength === 'medium' && item.strength !== 3) return false;
          if (filters.strength === 'strong' && item.strength < 4) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured maintains original curated sequence
      });
  }, [products, filters]);

  // Cart Handlers
  const handleAddToCart = (product: BidiProduct, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" ঝুড়িতে যোগ করা হয়েছে (${quantity} প্যাকেট)!`);
  };

  const handleInstantOrder = (product: BidiProduct, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্যটি ঝুড়ি থেকে সরানো হয়েছে।');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // Clear cart
    setCartItems([]);
    showToast(`ধন্যবাদ ${order.customerName}! অর্ডার ${order.orderId} সফলভাবে গৃহীত হয়েছে।`);
    setActiveTrackingOrderId(order.orderId);
  };

  const handleOpenTrackerWithOrderId = (orderId?: string) => {
    setActiveTrackingOrderId(orderId);
    setIsTrackerOpen(true);
  };

  const handleAddReview = (newReview: UserReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('আপনার মূল্যবান অভিজ্ঞতা ও রিভিউ সফলভাবে প্রকাশিত হয়েছে!');
  };

  // Scroll Helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-stone-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-alert"
          className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-amber-500 text-stone-100 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-stone-950 font-bold shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header (Desktop-first with quick portals) */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={scrollToSection}
        onOpenTracker={() => handleOpenTrackerWithOrderId()}
        onOpenDealership={() => setIsDealershipOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('bidi-catalog')}
          onSpecialClick={() => {
            const special = products.find((p) => p.id === 'monon-gold-filter') || products[0];
            if (special) setSelectedProduct(special);
          }}
          onOpenDealership={() => setIsDealershipOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Bidi Catalog Section */}
        <section id="bidi-catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>অনলাইন অর্ডার ও হোম ডেলিভারি ক্যাটালগ</span>
            </div>
            <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200">
              মনন বিড়ির প্রিমিয়াম সম্ভার
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans">
              আধুনিক গোল্ড সেলুলোজ ফিল্টার, আইস ক্রাশ মেন্থল ও ঐতিহ্যবাহী তেন্দুপাতার বিশেষ সংস্করণ। প্রতিটি প্যাকেটে ৩ থেকে ৪টি হাই-রেজ্যুলেশন ছবি ও স্বাদের কারিগরি রূপরেখা।
            </p>
          </div>

          {/* Filtering Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            totalResults={filteredProducts.length}
          />

          {/* Product Cards Grid (Optimized for desktop 3-col & 4-col responsive grid) */}
          {filteredProducts.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-amber-500">
                <Flame className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="font-serif-bn text-xl font-bold text-stone-200">
                কোনো সংস্করণ খুঁজে পাওয়া যায়নি!
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বিড়ি ক্যাটালগে নেই। অনুগ্রহ করে অন্য কোনো কি-ওয়ার্ড দিয়ে খুঁজুন বা ফিল্টার রিসেট করুন।
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    category: 'all',
                    strength: 'all',
                    sortBy: 'featured',
                  })
                }
                className="px-6 py-3 bg-amber-600 text-stone-950 rounded-xl text-xs font-bold hover:bg-amber-500 transition-colors shadow-lg"
              >
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <BidiCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p, tab) => handleOpenProductModal(p, tab || 'details')}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Albert Einstein 1939 Historic Archive Section */}
        <EinsteinHistorySection
          products={products}
          onOpenDetails={(p) => handleOpenProductModal(p, 'details')}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* Video Showcase: Factory & Craftsmanship Documentary */}
        <VideoShowcase videos={BRAND_VIDEOS} />

        {/* Interactive "স্বাদ ও স্মোকিং প্রোফাইল" Showcase Section */}
        <EffectsShowcase
          products={products}
          onOpenDetails={(p) => handleOpenProductModal(p, 'details')}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* User Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          products={products}
          onAddReview={handleAddReview}
        />

        {/* Heritage, Standards & Craftsmanship */}
        <FunTriviaSection />

      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenDealership={() => setIsDealershipOpen(true)}
        onOpenTracker={() => handleOpenTrackerWithOrderId()}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Product Detail & 4-Photo Modal (Daraz / Amazon Style Product Buying Page) */}
      <ProductDetailModal
        product={selectedProduct}
        initialTab={selectedProductTab}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantOrder={handleInstantOrder}
        reviews={reviews}
        onAddReview={handleAddReview}
        onApplyVoucher={(v) => showToast(`কুপন "${v.code}" সফলভাবে যুক্ত হয়েছে!`)}
        onOpenDealership={() => {
          setSelectedProduct(null);
          setIsDealershipOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
        onOpenTrackerForOrder={(orderId) => {
          setIsCheckoutOpen(false);
          handleOpenTrackerWithOrderId(orderId);
        }}
      />

      {/* Order Tracker Live Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={activeTrackingOrderId}
      />

      {/* Wholesale & Dealership Portal Modal */}
      <DealershipModal
        isOpen={isDealershipOpen}
        onClose={() => setIsDealershipOpen(false)}
        products={products}
      />

      {/* Blend Finder Taste Quiz Modal */}
      <BlendFinderQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onSelectProduct={(product) => {
          setIsQuizOpen(false);
          setSelectedProduct(product);
        }}
      />

    </div>
  );
}
