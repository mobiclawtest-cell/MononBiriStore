import React from 'react';
import { heroBannerImg, mononModernGoldImg } from '../data/bidiData';
import { ArrowDown, Flame, ShieldCheck, Truck, Award, CheckCircle2, Building2, Search } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onSpecialClick: () => void;
  onOpenDealership: () => void;
  onOpenTracker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onSpecialClick,
  onOpenDealership,
  onOpenTracker,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-925 to-stone-950 text-stone-100 py-12 lg:py-20 border-b border-amber-950">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-amber-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ঐতিহ্যবাহী কারিগরি ও আধুনিক প্রিমিয়াম ফিল্টার বিড়ির পথিকৃৎ</span>
            </div>

            <h1 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-amber-100 leading-[1.18]">
              শতবর্ষের খাঁটি ঐতিহ্য, <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                আধুনিক ফিল্টারের নতুন দিগন্ত!
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              গড়াই অববাহিকার খাঁটি তেন্দুপাতায় মোড়ানো ক্লাসিক <strong className="text-amber-300">‘মেঘের গর্জ্জন’</strong> ও <strong className="text-amber-300">‘দার্শনিক আড্ডা’</strong> থেকে শুরু করে আজকের তরুণদের রুচিশীল পছন্দের সোনালি ব্যান্ডের <strong className="text-amber-300">‘মনন গোল্ড ফিল্টার’</strong> এবং কুলিং ক্যাপসুল <strong className="text-amber-300">‘আইস ক্রাশ’</strong> — প্রতিটি শলাকা তৈরি হয় সর্বোচ্চ মান নিয়ন্ত্রণে।
            </p>

            {/* Desktop Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-amber-950/60 hover:shadow-amber-700/40 transition-all active:scale-95 text-sm"
              >
                <span>পণ্য সম্ভার ও অর্ডার করুন</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-featured-btn"
                onClick={onSpecialClick}
                className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-300 font-semibold px-5 py-3.5 rounded-xl transition-all text-sm"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>নতুন গোল্ড ফিল্টার সংস্করণ</span>
              </button>

              <button
                onClick={onOpenDealership}
                className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 border border-amber-800/40 text-stone-300 hover:text-amber-200 px-4 py-3.5 rounded-xl transition-all text-sm"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>ডিলারশিপ আবেদন</span>
              </button>

              <button
                onClick={onOpenTracker}
                className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-stone-100 px-4 py-3.5 rounded-xl transition-all text-sm"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>অর্ডার ট্র্যাকিং</span>
              </button>
            </div>

            {/* Desktop Stats and Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-base">
                  <span>৫০+</span>
                  <span className="text-xs font-sans text-stone-400 font-normal">বছর</span>
                </div>
                <p className="text-stone-300 font-medium">ঐতিহ্যবাহী সুনাম</p>
                <p className="text-[10px] text-stone-500">স্থাপিত ১৯৭৪, কুষ্টিয়া</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-base">
                  <span>৬৪</span>
                  <span className="text-xs font-sans text-stone-400 font-normal">জেলায়</span>
                </div>
                <p className="text-stone-300 font-medium">কুরিয়ার ডেলিভারি</p>
                <p className="text-[10px] text-stone-500">২৪–৪৮ ঘণ্টার মধ্যে</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-base">
                  <span>১০০%</span>
                  <span className="text-xs font-sans text-stone-400 font-normal">খাঁটি</span>
                </div>
                <p className="text-stone-300 font-medium">প্রাকৃতিক তেন্দুপাতা</p>
                <p className="text-[10px] text-stone-500">ল্যাব টেস্টেড কোয়ালিটি</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-base">
                  <span>৪.৯★</span>
                  <span className="text-xs font-sans text-stone-400 font-normal">রেটিং</span>
                </div>
                <p className="text-stone-300 font-medium">ভোক্তা সন্তুষ্টি</p>
                <p className="text-[10px] text-stone-500">৫ লাখ+ নিয়মিত গ্রাহক</p>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Display (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-600/40 shadow-2xl shadow-amber-950/80 group">
              <img
                src={mononModernGoldImg}
                alt="মনন বিড়ি আধুনিক প্রিমিয়াম গোল্ড সংস্করণ"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              
              {/* Overlay Badge on image */}
              <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>অফিসিয়াল মনন বিড়ি সিল</span>
              </div>

              <div className="absolute top-4 right-4 bg-amber-600 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                নতুন আধুনিক সিরিজ
              </div>

              {/* Bottom Quote card on image */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-amber-200 font-serif-bn font-bold text-lg">মনন প্রিমিয়াম গোল্ড ও ক্লাসিক সিরিজ</h3>
                    <p className="text-stone-300 text-xs">“স্মুথ বায়ো-ফিল্টার ও গড়াই তীরের খাঁটি তেন্দু পাতার সম্মেলন”</p>
                  </div>
                  <span className="text-xs bg-amber-500/20 text-amber-300 font-mono font-bold px-2.5 py-1.5 rounded-lg border border-amber-500/30 shrink-0">
                    ৳৪৫ - ৳৯৫
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1 border-t border-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ক্যাশ অন ডেলিভারি ও বিকাশ / নগদ ইনস্ট্যান্ট পেমেন্ট সমর্থিত</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
