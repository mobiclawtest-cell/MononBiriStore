import React, { useState, useEffect } from 'react';
import { BidiProduct, UserReview, LuckyVoucher } from '../types';
import { FLAT_ALL_REVIEWS } from '../data/bidiReviews';
import {
  X,
  Star,
  ShoppingBag,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Check,
  Building2,
  Package,
  Gift,
  RotateCcw,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Flame,
  Truck,
  HelpCircle,
  Copy,
  Clock
} from 'lucide-react';

interface ProductDetailModalProps {
  product: BidiProduct | null;
  onClose: () => void;
  onAddToCart: (product: BidiProduct, quantity: number) => void;
  onInstantOrder: (product: BidiProduct, quantity: number) => void;
  onOpenDealership?: () => void;
  reviews?: UserReview[];
  onAddReview?: (newReview: UserReview) => void;
  onApplyVoucher?: (voucher: LuckyVoucher) => void;
  initialTab?: 'details' | 'reviews' | 'win_spin' | 'qa';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantOrder,
  onOpenDealership,
  reviews = [],
  onAddReview,
  onApplyVoucher,
  initialTab = 'details',
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState('standard');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'win_spin' | 'qa'>(initialTab);
  const [selectedStarFilter, setSelectedStarFilter] = useState<'all' | number>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVotedReviews, setUserVotedReviews] = useState<Record<string, boolean>>({});
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewEffect, setReviewEffect] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Spin to Win Gamification State
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDeg, setSpinDeg] = useState(0);
  const [wonPrize, setWonPrize] = useState<LuckyVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    setQuantity(1);
    setActiveTab(initialTab || 'details');
    setSelectedStarFilter('all');
    setWonPrize(null);
  }, [product, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Filter reviews matching current product from both prop reviews and FLAT_ALL_REVIEWS catalog
  const staticProductReviews = FLAT_ALL_REVIEWS.filter((r) => r.bidiId === product.id);
  const runtimeProductReviews = reviews.filter((r) => r.bidiId === product.id);
  const allMatchedReviews = [
    ...runtimeProductReviews.filter(r => !staticProductReviews.some(s => s.id === r.id)),
    ...staticProductReviews
  ];
  const displayedReviews = allMatchedReviews.length > 0 ? allMatchedReviews : FLAT_ALL_REVIEWS.slice(0, 25);

  // Dynamic star distribution calculation
  const totalReviewsCount = displayedReviews.length;
  const starCounts = {
    5: displayedReviews.filter((r) => r.rating === 5).length,
    4: displayedReviews.filter((r) => r.rating === 4).length,
    3: displayedReviews.filter((r) => r.rating === 3).length,
    2: displayedReviews.filter((r) => r.rating === 2).length,
    1: displayedReviews.filter((r) => r.rating === 1).length,
  };
  const starPercents = {
    5: totalReviewsCount > 0 ? Math.round((starCounts[5] / totalReviewsCount) * 100) : 0,
    4: totalReviewsCount > 0 ? Math.round((starCounts[4] / totalReviewsCount) * 100) : 0,
    3: totalReviewsCount > 0 ? Math.round((starCounts[3] / totalReviewsCount) * 100) : 0,
    2: totalReviewsCount > 0 ? Math.round((starCounts[2] / totalReviewsCount) * 100) : 0,
    1: totalReviewsCount > 0 ? Math.round((starCounts[1] / totalReviewsCount) * 100) : 0,
  };

  const filteredReviewsList = selectedStarFilter === 'all'
    ? displayedReviews
    : displayedReviews.filter((r) => r.rating === selectedStarFilter);

  const handleJumpToReviews = (starFilter?: number) => {
    setActiveTab('reviews');
    if (starFilter !== undefined) {
      setSelectedStarFilter(starFilter);
    }
    setTimeout(() => {
      const el = document.getElementById('product-ratings-breakdown-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleToggleHelpful = (revId: string, baseHelpful: number) => {
    if (userVotedReviews[revId]) return;
    setUserVotedReviews(prev => ({ ...prev, [revId]: true }));
    setHelpfulVotes(prev => ({
      ...prev,
      [revId]: (prev[revId] !== undefined ? prev[revId] : baseHelpful) + 1
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleInstantBuy = () => {
    onInstantOrder(product, quantity);
  };

  // Submit User Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev: UserReview = {
      id: `rev-user-${Date.now()}`,
      bidiId: product.id,
      bidiName: product.name,
      userName: reviewName.trim(),
      userRole: 'যাচাইকৃত ক্রেতা',
      location: reviewLocation.trim() || 'বাংলাদেশ',
      rating: reviewRating,
      date: 'আজকে মাত্র',
      comment: reviewComment.trim(),
      funnyEffectWitnessed: reviewEffect.trim() || 'দারুণ সুবাস ও নিখুঁত টান',
      helpfulCount: 1,
      avatarSeed: reviewName.trim(),
      verifiedPurchase: true,
    };

    if (onAddReview) {
      onAddReview(newRev);
    }
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewName('');
      setReviewLocation('');
      setReviewComment('');
      setReviewEffect('');
      setReviewSubmitted(false);
    }, 2500);
  };

  // Spin to Win
  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraRotations = 5 + Math.floor(Math.random() * 4);
    const randomAngle = Math.floor(Math.random() * 360);
    const totalDeg = spinDeg + extraRotations * 360 + randomAngle;
    setSpinDeg(totalDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const prizes: LuckyVoucher[] = [
        {
          id: 'spin-v1',
          code: 'ROYAL25K',
          title: '৳২৫,০০০ রয়্যাল ক্যাশ ছাড়!',
          discountAmount: 25000,
          description: 'আপনার যেকোনো অর্ডারে তাৎক্ষণিক ২৫ হাজার টাকা ছাড়!',
          expiry: 'আজকের মধ্যেই প্রযোজ্য',
          type: 'discount',
        },
        {
          id: 'spin-v2',
          code: 'FREESHIPWIN',
          title: 'সম্পূর্ণ ফ্রি আর্মার্ড রয়্যাল ডেলিভারি!',
          discountAmount: 15000,
          description: 'সারাদেশে ১৫ হাজার টাকা মূল্যের ভিআইপি এক্সপ্রেস শিপিং সম্পূর্ণ ফ্রি!',
          expiry: '২৪ ঘণ্টা মেয়াদ',
          type: 'free_shipping',
        },
        {
          id: 'spin-v3',
          code: 'BONUSBOX',
          title: '১ বক্স মেঘের গর্জ্জন উপহার!',
          discountAmount: 125000,
          description: 'যেকোনো অর্ডারে ১টি সম্পূর্ণ রাজকীয় মেঘের গর্জ্জন বক্স উপহার!',
          expiry: 'লাকি স্পিন উইনার',
          type: 'free_pack',
        },
        {
          id: 'spin-v4',
          code: 'MEGA1LAKH',
          title: '১ লাখ টাকা মেগা লাক্সারি ছাড়!',
          discountAmount: 100000,
          description: 'আইনস্টাইন ১৯৩৯ বা প্ল্যাটিনাম এডিশনে ১ লাখ টাকা নগদ ছাড়!',
          expiry: 'লাকি জ্যাকপট উইন',
          type: 'discount',
        },
      ];
      const selected = prizes[Math.floor(Math.random() * prizes.length)];
      setWonPrize(selected);
      if (onApplyVoucher) {
        onApplyVoucher(selected);
      }
    }, 3200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        id="modal-backdrop" 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Daraz / Amazon Style Product Page Modal */}
      <div 
        id={`product-detail-modal-${product.id}`}
        className="relative w-full max-w-6xl bg-stone-900 border border-amber-600/50 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 my-auto text-stone-100 max-h-[94vh] flex flex-col"
      >
        {/* Amazon/Daraz Style Sticky Top Bar with Breadcrumbs & Close */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-950/95 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-stone-400 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-amber-400 font-bold hidden sm:inline">দারাজ মল / মনন ফ্ল্যাগশিপ স্টোর</span>
            <span className="hidden sm:inline">›</span>
            <span>{product.categoryLabel}</span>
            <span>›</span>
            <span className="text-stone-200 font-medium truncate">{product.name}</span>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Product Page Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* Main 3-Column / 2-Column Responsive E-Commerce Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left: Cropped Photo Gallery (5 Cols on LG) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Main Cropped Image Display with Zoom Hover */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl group">
                <img
                  src={product.images[activeImgIndex]}
                  alt={`${product.name} - ${product.imageCaptions[activeImgIndex] || 'Photo'}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-crosshair"
                  referrerPolicy="no-referrer"
                />

                {/* Photo Caption Pill */}
                {product.imageCaptions[activeImgIndex] && (
                  <div className="absolute bottom-3 inset-x-3 bg-stone-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800 text-[11px] text-stone-300 font-sans shadow">
                    {product.imageCaptions[activeImgIndex]}
                  </div>
                )}

                {/* Left/Right controls */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-stone-700 shadow"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImgIndex((prev) => (prev + 1) % product.images.length)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-stone-700 shadow"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* 4 Cropped Thumbnail Strip */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-amber-500 scale-95 shadow-md shadow-amber-950'
                        : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              {/* Verified Product Seals */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-stone-400 pt-1">
                <div className="bg-stone-950 border border-stone-800/80 rounded-xl p-2 space-y-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
                  <span className="font-semibold text-stone-200 block">১০০% খাঁটি তামাক</span>
                  <span className="text-[9px]">কুষ্টিয়া কারখানা থেকে</span>
                </div>
                <div className="bg-stone-950 border border-stone-800/80 rounded-xl p-2 space-y-0.5">
                  <RotateCcw className="w-4 h-4 text-amber-400 mx-auto" />
                  <span className="font-semibold text-stone-200 block">৭ দিনের রিপ্লেসমেন্ট</span>
                  <span className="text-[9px]">মান নিয়ে সন্তুষ্ট না হলে</span>
                </div>
                <div className="bg-stone-950 border border-stone-800/80 rounded-xl p-2 space-y-0.5">
                  <Truck className="w-4 h-4 text-sky-400 mx-auto" />
                  <span className="font-semibold text-stone-200 block">ক্যাশ অন ডেলিভারি</span>
                  <span className="text-[9px]">পণ্য হাতে পেয়ে পেমেন্ট</span>
                </div>
              </div>
            </div>

            {/* Center & Right: Title, Pricing & Buy Box (7 Cols on LG) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Product Title & Brand Badges */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-500 text-stone-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow">
                    মনন মল ফ্ল্যাগশিপ
                  </span>
                  <span className="bg-stone-800 text-amber-300 text-[11px] px-2.5 py-0.5 rounded border border-amber-700/50">
                    {product.categoryLabel}
                  </span>
                  {product.isModern && (
                    <span className="bg-cyan-950 border border-cyan-800/60 text-cyan-300 text-[11px] px-2 py-0.5 rounded font-medium">
                      আধুনিক বায়ো-ফিল্টার
                    </span>
                  )}
                </div>

                <h1 className="font-serif-bn text-2xl sm:text-3xl font-bold text-amber-100">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 font-sans">
                  {product.englishName}
                </p>

                {/* Daraz Style Ratings & Reviews summary header */}
                <div className="flex items-center gap-3 pt-1 text-xs">
                  <button 
                    onClick={() => handleJumpToReviews()}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 hover:underline cursor-pointer group"
                    title="ক্লিক করে সকল স্টার রেটিং ও বিস্তারিত বিশ্লেষণ দেখুন"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                      ))}
                    </div>
                    <span className="font-bold text-stone-200">{product.rating}</span>
                    <span className="text-stone-400 underline decoration-amber-500/50">({displayedReviews.length}টি বিশেষ রেটিংস ও রিভিউ)</span>
                  </button>
                  <span className="text-stone-600">|</span>
                  <span className="text-stone-400 font-mono">{product.soldCount || '১.২k+ বিক্রি'}</span>
                  <span className="text-stone-600">|</span>
                  <button 
                    onClick={() => setActiveTab('win_spin')}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>ভাউচার জিতুন</span>
                  </button>
                </div>
              </div>

              {/* Daraz Flash Sale / Price Box */}
              <div className="bg-stone-950 border border-amber-800/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                      ৳{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm sm:text-base text-stone-400 line-through font-mono">
                        ৳{product.originalPrice}
                      </span>
                    )}
                    {product.discountPercentage && (
                      <span className="bg-red-600/90 text-white text-xs font-bold px-2 py-0.5 rounded">
                        -{product.discountPercentage}% ছাড়
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                    {product.stockStatus}
                  </span>
                </div>

                {/* Promotional banner */}
                <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800/30 rounded-xl px-3 py-2 text-xs text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>আজকের অর্ডারে ফ্রি ডেলিভারি ভাউচার প্রযোজ্য</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('win_spin')}
                    className="text-amber-400 font-bold underline hover:text-amber-300"
                  >
                    স্পিন করে জিতুন
                  </button>
                </div>
              </div>

              {/* Flavor Profile & Specifications Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-stone-800 py-1.5">
                  <span className="text-stone-400">স্বাদের বৈশিষ্ট্য:</span>
                  <span className="text-stone-200 font-medium">{product.flavor}</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-800 py-1.5">
                  <span className="text-stone-400">ফিল্টার টেকনোলজি:</span>
                  <span className="text-stone-200 font-medium">{product.filterType}</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-800 py-1.5">
                  <span className="text-stone-400">প্যাকেট সাইজ:</span>
                  <span className="text-stone-200 font-medium">{product.packSize}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-stone-400">তামাকের তীব্রতা (শক্তি):</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Flame
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= product.strength ? 'text-amber-500 fill-amber-500' : 'text-stone-700'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-mono text-stone-400 ml-1">({product.strength}/৫)</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons (Buy Now & Add to Cart) */}
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-300">পরিমাণ (প্যাকেট):</span>
                  <div className="flex items-center border border-stone-700 rounded-xl bg-stone-900 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 hover:bg-stone-800 text-stone-300 font-bold transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-mono font-bold text-amber-400">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 hover:bg-stone-800 text-stone-300 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    মোট: ৳{product.price * quantity}
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-600/50'
                    }`}
                  >
                    {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{addedAnimation ? 'ঝুড়িতে যুক্ত হয়েছে!' : 'কার্টে যোগ করুন'}</span>
                  </button>

                  <button
                    id="modal-instant-buy-btn"
                    onClick={handleInstantBuy}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-xl shadow-amber-950/60 transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>এখনই কিনুন (Buy Now)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Amazon/Daraz Style Interactive Tabbed Section */}
          <div className="border-t border-stone-800 pt-6 space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-stone-800 gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'details'
                    ? 'border-amber-500 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>পণ্য বিবরণ ও স্মোকিং টেস্ট</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-amber-500 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>গ্রাহক রেটিংস ও রিভিউ ({displayedReviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('win_spin')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'win_spin'
                    ? 'border-amber-500 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-extrabold">🎁 লাকি স্পিন ও ভাউচার জিতুন!</span>
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'qa'
                    ? 'border-amber-500 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>প্রশ্ন ও উত্তর (FAQ)</span>
              </button>
            </div>

            {/* TAB 1: DETAILS & SMOKE METRICS */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Smoke Profile Sliders */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-4">
                  <h3 className="font-bold text-sm text-amber-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>স্মোকিং ও সেন্সরি প্রোফাইল এনালাইসিস</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between text-stone-400 mb-1">
                        <span>স্বাভাবিক মিষ্টতা</span>
                        <span className="text-amber-400 font-mono font-bold">{product.smokeProfile.sweetness}%</span>
                      </div>
                      <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${product.smokeProfile.sweetness}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-stone-400 mb-1">
                        <span>ধোঁয়ার ঘনত্ব</span>
                        <span className="text-amber-400 font-mono font-bold">{product.smokeProfile.smokeDensity}%</span>
                      </div>
                      <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-400 rounded-full" style={{ width: `${product.smokeProfile.smokeDensity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-stone-400 mb-1">
                        <span>প্রাকৃতিক অ্যারোমা</span>
                        <span className="text-amber-400 font-mono font-bold">{product.smokeProfile.aroma}%</span>
                      </div>
                      <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${product.smokeProfile.aroma}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-stone-400 mb-1">
                        <span>গলার কিক বা তৃপ্তি</span>
                        <span className="text-amber-400 font-mono font-bold">{product.smokeProfile.kick}%</span>
                      </div>
                      <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${product.smokeProfile.kick}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effects List */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-sm text-stone-200">বিশেষ বৈশিষ্ট্য ও টানার অভিজ্ঞতা:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.effects.map((eff, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{eff}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret Curing & Roll Master */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-1.5">
                    <span className="font-bold text-amber-300 block">গোপন ব্লেন্ড ও পাতা কিউরিং:</span>
                    <p className="text-stone-400 leading-relaxed">{product.secretIngredient}</p>
                  </div>
                  <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-1.5">
                    <span className="font-bold text-amber-300 block">মাস্টার কারিগরের মন্তব্য:</span>
                    <p className="text-stone-400 leading-relaxed italic">&ldquo;{product.rollMasterStory}&rdquo;</p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: REVIEWS & USER SUBMISSION */}
            {activeTab === 'reviews' && (
              <div id="product-ratings-breakdown-section" className="space-y-6 animate-in fade-in duration-300">
                
                {/* Special Rating Breakdown & Interactive Filter Hub */}
                <div className="bg-stone-950 border border-amber-800/50 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span>বিশেষ রেটিংস ও গ্রাহক প্রতিক্রিয়া হাব</span>
                    </div>
                    <span className="text-[11px] text-stone-400 bg-stone-900 border border-stone-700 px-2.5 py-1 rounded-full">
                      মোট {totalReviewsCount}টি যাচাইকৃত রিভিউ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Overall Score Summary */}
                    <div className="md:col-span-5 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-4">
                      <div className="flex items-baseline justify-center md:justify-start gap-2">
                        <span className="text-5xl font-black text-amber-400 font-mono tracking-tight">
                          {product.rating}
                        </span>
                        <span className="text-lg text-stone-400 font-sans">/ ৫.০</span>
                      </div>
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-stone-300">
                        {totalReviewsCount} জন ক্রেতার সর্বসম্মত মতামত
                      </p>
                      <p className="text-[11px] text-emerald-400 flex items-center justify-center md:justify-start gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>১০০% খাঁটি ও সন্তুষ্ট গ্রাহক রিভিউ</span>
                      </p>
                    </div>

                    {/* Interactive Clickable Star Rating Bars */}
                    <div className="md:col-span-7 space-y-2 text-xs">
                      <p className="text-[11px] text-stone-400 mb-2 font-medium">
                        👇 যেকোনো স্টারে ক্লিক করে সরাসরি ফিল্টার করুন:
                      </p>
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = starCounts[stars as keyof typeof starCounts];
                        const percent = starPercents[stars as keyof typeof starPercents];
                        const isSelected = selectedStarFilter === stars;
                        return (
                          <button
                            key={stars}
                            type="button"
                            onClick={() => setSelectedStarFilter(isSelected ? 'all' : stars)}
                            className={`w-full flex items-center gap-3 p-1.5 px-2 rounded-xl transition-all text-left group ${
                              isSelected
                                ? 'bg-amber-950/70 border border-amber-600 text-amber-200 ring-1 ring-amber-500'
                                : 'hover:bg-stone-900 border border-transparent text-stone-300'
                            }`}
                          >
                            <span className="w-14 font-semibold flex items-center gap-1">
                              {stars} স্টার
                              <Star className={`w-3 h-3 ${isSelected ? 'fill-amber-400 text-amber-400' : 'text-stone-500 group-hover:text-amber-400'}`} />
                            </span>
                            <div className="flex-1 h-3 bg-stone-800 rounded-full overflow-hidden p-0.5">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  stars === 5
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                    : stars === 4
                                    ? 'bg-amber-500/80'
                                    : stars === 3
                                    ? 'bg-amber-600/60'
                                    : 'bg-stone-600'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="w-10 text-right font-mono text-[11px] text-stone-400 group-hover:text-amber-300">
                              {percent}%
                            </span>
                            <span className="w-12 text-right font-mono text-[11px] text-stone-400">
                              ({count}টি)
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter Chips Bar */}
                  <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-stone-400 mr-1">ফিল্টার:</span>
                    <button
                      type="button"
                      onClick={() => setSelectedStarFilter('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedStarFilter === 'all'
                          ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700'
                      }`}
                    >
                      সকল রিভিউ ({totalReviewsCount})
                    </button>
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = starCounts[stars as keyof typeof starCounts];
                      const isSelected = selectedStarFilter === stars;
                      return (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setSelectedStarFilter(stars)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                              : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700'
                          }`}
                        >
                          <span>{stars}</span>
                          <Star className={`w-3 h-3 ${isSelected ? 'fill-stone-950 text-stone-950' : 'text-amber-400 fill-amber-400'}`} />
                          <span>({count})</span>
                        </button>
                      );
                    })}

                    {selectedStarFilter !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedStarFilter('all')}
                        className="ml-auto text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        ফিল্টার রিসেট করুন
                      </button>
                    )}
                  </div>
                </div>

                {/* Form: Submit Your Review */}
                <div className="bg-stone-950/90 border border-amber-800/40 rounded-2xl p-5 space-y-4">
                  <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>আপনার মূল্যবান রিভিউ ও রেটিং দিন</span>
                  </h3>

                  {reviewSubmitted ? (
                    <div className="bg-emerald-950/70 border border-emerald-700 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>ধন্যবাদ! আপনার রিভিউ সফলভাবে প্রকাশিত হয়েছে।</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">আপনার নাম *</label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="যেমন: সাকিব চৌধুরী"
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">আপনার জেলা/এলাকা</label>
                          <input
                            type="text"
                            value={reviewLocation}
                            onChange={(e) => setReviewLocation(e.target.value)}
                            placeholder="যেমন: বনানী, ঢাকা"
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-stone-400">রেটিং নির্বাচন করুন:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="p-1 text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewRating ? 'fill-amber-400' : 'text-stone-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-400">{reviewRating} স্টার</span>
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">আপনার মতামত ও স্বাদ অনুভূতি *</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="এই বিড়ির ধোঁয়া, ফ্লেভার ও প্যাকেজিং সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
                      >
                        রিভিউ প্রকাশ করুন
                      </button>
                    </form>
                  )}
                </div>

                {/* Existing Reviews List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-stone-300 uppercase tracking-wider flex items-center gap-2">
                      <span>ক্রেতাদের বাস্তব অভিজ্ঞতা ও বিশেষ মতামত</span>
                      <span className="text-amber-400 font-mono">({filteredReviewsList.length}টি)</span>
                    </h4>
                    {selectedStarFilter !== 'all' && (
                      <span className="text-xs text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full">
                        ফিল্টার: {selectedStarFilter} স্টার
                      </span>
                    )}
                  </div>

                  {filteredReviewsList.length === 0 ? (
                    <div className="bg-stone-950 border border-stone-800 rounded-2xl p-8 text-center space-y-3">
                      <p className="text-stone-400 text-xs">
                        এই রেটিং বিভাগে কোনো রিভিউ নেই।
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedStarFilter('all')}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-xl"
                      >
                        সকল রিভিউ দেখুন
                      </button>
                    </div>
                  ) : (
                    filteredReviewsList.map((rev) => {
                      const currentHelpful = helpfulVotes[rev.id] !== undefined ? helpfulVotes[rev.id] : rev.helpfulCount;
                      const hasVoted = userVotedReviews[rev.id];
                      return (
                        <div
                          key={rev.id}
                          className="bg-stone-950 border border-stone-800 hover:border-amber-700/50 rounded-2xl p-4 sm:p-5 space-y-3 text-xs transition-all shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400 flex items-center justify-center font-bold text-amber-100 text-sm shadow">
                                {rev.userName[0]}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-stone-100 text-sm">{rev.userName}</span>
                                  {rev.verifiedPurchase && (
                                    <span className="text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                      <Check className="w-3 h-3" />
                                      <span>দারাজ ভেরিফায়েড ক্রেতা</span>
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-stone-400">{rev.location} • {rev.userRole}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-amber-400 font-mono bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-xl">
                              <div className="flex">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="font-bold ml-1">{rev.rating}.০</span>
                            </div>
                          </div>

                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
                            {rev.comment}
                          </p>

                          {rev.funnyEffectWitnessed && (
                            <div className="bg-amber-950/30 px-3.5 py-2 rounded-xl text-[11px] text-amber-300/90 border border-amber-900/40 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-amber-200">বিশেষ অনুভূতি/স্বাদ নোট: </strong>
                                <span>{rev.funnyEffectWitnessed}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-900">
                            <span>📅 {rev.date}</span>
                            <button
                              type="button"
                              onClick={() => handleToggleHelpful(rev.id, rev.helpfulCount)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
                                hasVoted
                                  ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-700'
                              }`}
                            >
                              <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-amber-400 text-amber-400' : ''}`} />
                              <span>{hasVoted ? 'উপকারী মনে হয়েছে' : 'উপকারী'} ({currentHelpful})</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: SPIN TO WIN GAMIFICATION */}
            {activeTab === 'win_spin' && (
              <div className="bg-stone-950 border border-amber-700/50 rounded-2xl p-6 text-center space-y-6 animate-in fade-in duration-300">
                
                <div className="max-w-md mx-auto space-y-2">
                  <span className="bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    দারাজ স্টাইল লাকি স্পিন হুইল
                  </span>
                  <h3 className="font-serif-bn text-2xl font-bold text-amber-200">
                    চাকা ঘুরিয়ে তাৎক্ষণিক ছাড় ও উপহার জিতুন!
                  </h3>
                  <p className="text-xs text-stone-400 font-sans">
                    প্রতিটি স্পিনে রয়েছে নিশ্চিত ক্যাশ ভাউচার, ফ্রি ডেলিভারি কোড কিংবা ফ্রেশ তেন্দুপাতার বোনাস প্যাক!
                  </p>
                </div>

                {/* The Lucky Wheel Interactive Graphic */}
                <div className="relative w-64 h-64 mx-auto my-4">
                  
                  {/* Wheel Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-4 h-6 bg-red-600 clip-triangle shadow-lg" />

                  {/* Rotating Wheel Container */}
                  <div
                    className="w-full h-full rounded-full border-4 border-amber-500 shadow-2xl relative overflow-hidden transition-transform duration-[3000ms] ease-out bg-stone-900"
                    style={{ transform: `rotate(${spinDeg}deg)` }}
                  >
                    {/* 4 Quadrants */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-stone-900 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-amber-200 -rotate-45 translate-x-12 -translate-y-12">
                        ৳২০ ছাড়
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-stone-900 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-emerald-300 rotate-45 translate-x-12 translate-y-12">
                        ফ্রি শিপিং
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/30 to-stone-900 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-purple-300 rotate-[135deg] -translate-x-12 translate-y-12">
                        ১ প্যাক ফ্রি
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/20 to-stone-900 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-yellow-300 -rotate-[135deg] -translate-x-12 -translate-y-12">
                        ১৫% কুপন
                      </span>
                    </div>

                    {/* Center Knob */}
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-lg z-10">
                      <Gift className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Spin Action */}
                <div className="space-y-4">
                  <button
                    id="spin-wheel-btn"
                    onClick={handleSpinWheel}
                    disabled={isSpinning}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-amber-950/60 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSpinning ? 'হুইল ঘুরছে...' : '🎁 চাকা ঘোরান ও জিতুন!'}
                  </button>

                  {/* Won Prize Display */}
                  {wonPrize && (
                    <div className="bg-amber-950/60 border border-amber-600/60 rounded-2xl p-5 max-w-md mx-auto space-y-3 animate-in zoom-in-95 duration-300 text-left">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>অভিনন্দন! আপনি জিতেছেন:</span>
                      </div>
                      <h4 className="text-base font-extrabold text-amber-200">{wonPrize.title}</h4>
                      <p className="text-xs text-stone-300">{wonPrize.description}</p>
                      
                      <div className="flex items-center justify-between bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2">
                        <div>
                          <span className="text-[10px] text-stone-400 block">ভাউচার কোড:</span>
                          <span className="text-xs font-mono font-bold text-amber-400">{wonPrize.code}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(wonPrize.code)}
                          className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 4: Q&A */}
            {activeTab === 'qa' && (
              <div className="space-y-4 animate-in fade-in duration-300 text-xs">
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-amber-300 block">প্রশ্ন: সাধারণ বিড়ির চেয়ে মনন ফিল্টার বিড়ির তফাত কী?</span>
                  <p className="text-stone-400 leading-relaxed">
                    উত্তর: সাধারণ বিড়িতে কোনো ফিল্টার থাকে না, কিন্তু মনন গোল্ড ও আইস ক্রাশ সংস্করণে অর্গানিক বায়ো-ফিল্টার ও মেন্থল ক্রাশ টেকনোলজি রয়েছে যা ধোঁয়াকে মসৃণ ও আরামদায়ক রাখে।
                  </p>
                </div>
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-amber-300 block">প্রশ্ন: প্যাকেজিং কী ওয়াটারপ্রুফ এবং ফ্রেশ থাকবে?</span>
                  <p className="text-stone-400 leading-relaxed">
                    উত্তর: হ্যাঁ! প্রতিটি প্যাক আর্দ্রতা-রোধী সিলযুক্ত মেটালিক ফয়েল বক্সে সংরক্ষিত, যা পাতার প্রাকৃতিক সুবাস ও কিউরিং দীর্ঘদিন সতেজ রাখে।
                  </p>
                </div>
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-amber-300 block">প্রশ্ন: ডেলিভারি সময় কতক্ষণ লাগবে?</span>
                  <p className="text-stone-400 leading-relaxed">
                    উত্তর: ঢাকা ও কুষ্টিয়ায় ১২-২৪ ঘণ্টা এবং অন্যান্য জেলায় ২-৩ কার্যদিবসের মধ্যে নির্ভরযোগ্য কুরিয়ারে পৌঁছানো হয়।
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
