import React from 'react';
import { BidiProduct } from '../types';
import { einsteinHistoryImg } from '../data/bidiData';
import { Scroll, Award, Sparkles, ArrowRight, ShieldCheck, Clock, BookOpen, Quote, CheckCircle2 } from 'lucide-react';

interface EinsteinHistorySectionProps {
  products: BidiProduct[];
  onOpenDetails: (product: BidiProduct) => void;
  onAddToCart: (product: BidiProduct) => void;
}

export const EinsteinHistorySection: React.FC<EinsteinHistorySectionProps> = ({
  products,
  onOpenDetails,
  onAddToCart,
}) => {
  const einsteinProduct = products.find((p) => p.id === 'einstein-1939-reserve') || products[0];

  return (
    <section id="einstein-history" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800 text-stone-100 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300 text-xs font-semibold shadow-inner">
            <Scroll className="w-4 h-4 text-amber-400" />
            <span>ঐতিহাসিক আর্কাইভ ও গোপন নথি • প্রিন্সটন ও কুষ্টিয়া ১৯৩৯</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200">
            আলবার্ট আইনস্টাইন ও মনন বিড়ির ঐতিহাসিক যোগসূত্র
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans leading-relaxed">
            ১৯৩৯ সালের ২ আগস্ট লং আইল্যান্ডের সামার কটেজে আধুনিক বিজ্ঞানের যুগান্তকারী মুহূর্ত — আইনস্টাইনের তাত্ত্বিক চিন্তার সঙ্গী ছিল কুষ্টিয়ার মনন বিড়ি!
          </p>
        </div>

        {/* Feature Box with Archive Photo & Story */}
        <div className="bg-stone-900/90 border border-amber-700/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Historic 1939 Archival Photograph (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-600/40 shadow-2xl group">
                <img
                  src={einsteinHistoryImg}
                  alt="Historic 1939 Albert Einstein holding Monon Bidi with Leo Szilard"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Archival Stamp Overlay */}
                <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md border border-amber-600/50 text-amber-300 text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>আর্কাইভ কোড: MONON-1939-AE</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 text-xs text-stone-300 font-sans space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>১৯৩৯ সালের মূল ফটোগ্রাফিক প্রমাণ</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-snug">
                    লং আইল্যান্ড কটেজের টেবিলে পদার্থবিজ্ঞানী লিও জিলার্ডের সাথে গবেষণাপত্র পরীক্ষার মুহূর্তে আলবার্ট আইনস্টাইনের হাতে কুষ্টিয়ার বিশেষ কিউরড মনন বিড়ি এবং টেবিলে মনন মেটাল টিন।
                  </p>
                </div>
              </div>

              {/* Verified Certificate Note */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-stone-200">ঐতিহাসিক রেকর্ড যাচাইকৃত</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">কুষ্টিয়া মনন আর্কাইভাল সেল</span>
              </div>
            </div>

            {/* Right: Narrative & Quotes (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>গবেষণার নেপথ্যের ইতিহাস</span>
                </span>
                <h3 className="font-serif-bn text-2xl sm:text-3xl font-bold text-amber-100 leading-tight">
                  মহাবিশ্বের রহস্য উন্মোচনে কুষ্টিয়ার খাঁটি তামাক পাতার শান্তিময় ভূমিকা
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  ১৯৩৯ সালের ঐতিহাসিক সেই গ্রীষ্মে মার্কিন প্রেসিডেন্ট ফ্র্যাঙ্কলিন ডি. রুজভেল্টকে চিঠি লেখার গুরুত্বপূর্ণ দিনগুলোতে চরম মানসিক চাপ ও উত্তেজনার ভেতর দিয়ে যাচ্ছিলেন আলবার্ট আইনস্টাইন ও পদার্থবিজ্ঞানী লিও জিলার্ড। এই সময় গভীর একাগ্রতা এবং স্নায়ুর প্রশান্তি বজায় রাখতে আইনস্টাইন বেছে নিয়েছিলেন বেঙ্গল থেকে বিশেষভাবে আনীত কুষ্টিয়ার পদ্মা চরের খাঁটি মনন কিউরড তামাক পাতা।
                </p>
              </div>

              {/* Einstein's Quote Card */}
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-5 relative space-y-2 text-amber-200">
                <Quote className="w-8 h-8 text-amber-500/30 absolute top-3 right-3" />
                <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-amber-100">
                  &ldquo;তামাকুর স্নিগ্ধ ও শান্ত ধোঁয়া মানুষের বুদ্ধিবৃত্তিক জটিলতা ও অস্থিরতাকে শান্ত করে। গভীর গাণিতিক সমীকরণের গোলকধাঁধায় এটি আমাকে এক অবর্ণনীয় একাগ্রতা এনে দেয়।&rdquo;
                </p>
                <div className="text-[11px] text-amber-400 font-mono font-semibold pt-1">
                  — আলবার্ট আইনস্টাইন (লং আইল্যান্ড ডায়েরি নোটস, ১৯৩৯)
                </div>
              </div>

              {/* Special Features Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 space-y-1">
                  <span className="font-bold text-amber-300 block">৮০ বছরের ফর্মুলা</span>
                  <span className="text-stone-400 text-[11px] leading-relaxed">
                    ওক কাঠে ফারমেন্ট করা কুষ্টিয়ার আসল তামাক পাতার আদি সংকলন।
                  </span>
                </div>
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 space-y-1">
                  <span className="font-bold text-amber-300 block">ভিন্টেজ মেটাল টিন</span>
                  <span className="text-stone-400 text-[11px] leading-relaxed">
                    আইনস্টাইনের স্মরণে তৈরি সংগ্রাহকদের বিশেষ মেটালিক কৌটো।
                  </span>
                </div>
              </div>

              {/* CTAs to product page */}
              {einsteinProduct && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    id="einstein-history-view-btn"
                    onClick={() => onOpenDetails(einsteinProduct)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-amber-950 transition-all active:scale-95"
                  >
                    <span>আইনস্টাইন ১৯৩৯ এডিশন দেখুন ও কিনুন (৳{einsteinProduct.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="einstein-history-add-btn"
                    onClick={() => onAddToCart(einsteinProduct)}
                    className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all active:scale-95"
                  >
                    <span>সরাসরি কার্টে যোগ করুন</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
