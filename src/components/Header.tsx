import React from 'react';
import { ShoppingBag, Flame, ShieldCheck, PhoneCall, Search, Building2, Film, Compass } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollTo: (elementId: string) => void;
  onOpenTracker: () => void;
  onOpenDealership: () => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onScrollTo,
  onOpenTracker,
  onOpenDealership,
  onOpenQuiz,
}) => {
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/98 backdrop-blur-md border-b border-amber-900/40 text-stone-100 shadow-xl transition-all">
      {/* Official Top Notification Bar for Desktop */}
      <div id="statutory-notice-banner" className="bg-stone-950 text-stone-300 text-xs py-1.5 px-4 font-medium border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <strong>মনন বিড়ি ইন্ডাস্ট্রিয়াল লিমিটেড:</strong> কুষ্টিয়া সেন্ট্রাল ফ্যাক্টরি প্রস্তুতকৃত খাঁটি তেন্দুপাতা ও আধুনিক বায়ো-ফিল্টার বিড়ি • ৬৪ জেলায় হোম ডেলিভারি
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <button 
              onClick={onOpenTracker}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Search className="w-3 h-3 text-amber-400" />
              <span>অর্ডার ট্র্যাক করুন</span>
            </button>
            <span>|</span>
            <button 
              onClick={onOpenDealership}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3 h-3 text-amber-400" />
              <span>ডিলার ও পাইকারি সহায়তা</span>
            </button>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1 text-stone-300">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>হটলাইন: <strong>০৯৬৭৮-৬৬৬৬৬৪</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            id="brand-logo" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-stone-900 p-0.5 shadow-lg shadow-amber-950/40 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-amber-400">
                <Flame className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-bn text-2xl sm:text-3xl font-bold tracking-tight text-amber-300 drop-shadow-sm">
                  মনন বিড়ি
                </span>
                <span className="text-[10px] uppercase bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-600/50 font-sans font-bold">
                  ঐতিহ্য ও আধুনিকতা
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans tracking-wide">
                স্থাপিত ১৯৭৪ • কুষ্টিয়া, বাংলাদেশ
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            <button 
              id="nav-bidis-btn"
              onClick={() => onScrollTo('bidi-catalog')} 
              className="hover:text-amber-300 transition-colors py-1"
            >
              পণ্য সম্ভার
            </button>
            <button 
              onClick={() => onScrollTo('einstein-history')} 
              className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5 text-amber-400 font-semibold"
            >
              <span>আইনস্টাইন ইতিহাস (১৯৩৯)</span>
            </button>
            <button 
              onClick={() => onScrollTo('brand-videos')} 
              className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>কারখানা ও ভিডিও</span>
            </button>
            <button 
              id="nav-effects-btn"
              onClick={() => onScrollTo('effects-showcase')} 
              className="hover:text-amber-300 transition-colors py-1"
            >
              স্বাদ ও বৈশিষ্ট্য
            </button>
            <button 
              id="nav-reviews-btn"
              onClick={() => onScrollTo('user-reviews')} 
              className="hover:text-amber-300 transition-colors py-1"
            >
              গ্রাহক রিভিউ
            </button>
            <button 
              id="nav-delivery-btn"
              onClick={() => onScrollTo('delivery-options')} 
              className="hover:text-amber-300 transition-colors py-1"
            >
              ডেলিভারি পদ্ধতি
            </button>
            <button 
              onClick={onOpenQuiz}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 px-3 py-1.5 rounded-xl border border-stone-700 flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>স্বাদ নির্বাচক</span>
            </button>
          </nav>

          {/* Action buttons: Dealership & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDealership}
              className="hidden md:flex items-center gap-1.5 text-xs bg-stone-800/90 hover:bg-stone-800 text-amber-300 border border-amber-700/40 px-3.5 py-2.5 rounded-xl font-medium transition-all"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>পাইকারি রেট</span>
            </button>

            {/* Cart Button */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 px-4 py-2.5 rounded-xl font-bold shadow-md shadow-amber-950/50 active:scale-95 transition-all text-xs sm:text-sm"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="text-left hidden sm:block leading-tight">
                <span className="block font-bold">অর্ডার ঝুলি</span>
                {totalItemsCount > 0 && (
                  <span className="text-[10px] font-mono text-stone-900 block font-semibold">
                    ৳{cartSubtotal} ({totalItemsCount}টি)
                  </span>
                )}
              </div>
              <span className="sm:hidden font-bold">ঝুলি</span>

              {totalItemsCount > 0 && (
                <span 
                  id="cart-badge-count" 
                  className="bg-stone-950 text-amber-400 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-amber-400 shadow shrink-0"
                >
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
