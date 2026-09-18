import React, { useState } from 'react';
import { BidiProduct } from '../types';
import { CloudRain, BookOpen, Moon, Flame, Clock, ArrowRight, Eye, Check, CheckCircle2, ShieldCheck, Sparkle } from 'lucide-react';

interface EffectsShowcaseProps {
  products: BidiProduct[];
  onOpenDetails: (product: BidiProduct) => void;
  onAddToCart: (product: BidiProduct) => void;
}

export const EffectsShowcase: React.FC<EffectsShowcaseProps> = ({
  products,
  onOpenDetails,
  onAddToCart,
}) => {
  const [selectedBidiId, setSelectedBidiId] = useState(products[0]?.id || 'monon-gold-filter');
  const [justAdded, setJustAdded] = useState(false);

  const activeProduct = products.find((p) => p.id === selectedBidiId) || products[0];

  const getBidiIcon = (category: string) => {
    switch (category) {
      case 'modern_filter':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'classic_tendu':
        return <CloudRain className="w-4 h-4 text-emerald-400" />;
      case 'signature_blend':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'royal_edition':
        return <Moon className="w-4 h-4 text-purple-400" />;
      case 'spicy_bold':
        return <Flame className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-stone-400" />;
    }
  };

  const handleAdd = () => {
    if (activeProduct) {
      onAddToCart(activeProduct);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  return (
    <section id="effects-showcase" className="py-16 sm:py-20 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>ব্লেন্ড ও স্মোকিং প্রোফাইল গাইড</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200">
            কোন বিড়ির স্বাদ ও অভিজ্ঞতা আপনার উপযোগী?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans">
            নিচের যে কোনো সংস্করণ বেছে নিয়ে তার ব্লেন্ডের গভীরতা, ফিল্টার কারিগরি ও গ্রাহক অভিজ্ঞতার নির্যাস পরখ করুন।
          </p>
        </div>

        {/* Bidi Selector Tabs */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-wrap">
          {products.map((p) => {
            const isSelected = p.id === selectedBidiId;
            return (
              <button
                key={p.id}
                id={`effect-tab-${p.id}`}
                onClick={() => setSelectedBidiId(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-stone-950 shadow-lg shadow-amber-950 scale-102 font-bold'
                    : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-amber-700/60'
                }`}
              >
                {getBidiIcon(p.category)}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card for Active Product */}
        {activeProduct && (
          <div className="bg-stone-950 border border-stone-800 hover:border-amber-800/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-medium">
                      {activeProduct.categoryLabel}
                    </span>
                    {activeProduct.isModern && (
                      <span className="text-xs bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-full font-bold">
                        আধুনিক ফিল্টার
                      </span>
                    )}
                    <span className="text-xs text-stone-400">
                      প্যাকেট মূল্য: <strong className="text-amber-400 font-mono text-sm">৳{activeProduct.price}</strong>
                    </span>
                  </div>

                  <h3 className="font-serif-bn text-2xl sm:text-3xl font-bold text-amber-200">
                    {activeProduct.name}
                  </h3>
                  <p className="text-stone-300 text-sm mt-1 font-sans italic">
                    &ldquo;{activeProduct.tagline}&rdquo;
                  </p>
                </div>

                {/* Flavor highlight badge */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 text-xs text-stone-200 flex items-center gap-3">
                  <div className="text-2xl">🍃</div>
                  <div>
                    <span className="text-amber-400 font-bold block mb-0.5">স্বাদ ও ব্লেন্ডের রূপরেখা:</span>
                    <span className="leading-relaxed">{activeProduct.flavor}</span>
                  </div>
                </div>

                {/* 4 Effects Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>স্বাদ, সুবাস ও অনুভূতির ৪টি বিশেষ মাত্রা:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProduct.effects.map((effect, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-900 border border-stone-800 rounded-2xl p-3.5 flex items-start gap-3 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="text-stone-300 leading-relaxed font-sans">{effect}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret Trivia snippet */}
                <div className="bg-amber-950/40 border border-amber-800/40 rounded-2xl p-4 text-xs space-y-1.5">
                  <span className="font-bold text-amber-300 block">
                    উপাদান ও তামাক কিউরিং বৈশিষ্ট্য:
                  </span>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    {activeProduct.funnyTrivia}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    id={`effect-showcase-detail-btn-${activeProduct.id}`}
                    onClick={() => onOpenDetails(activeProduct)}
                    className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 px-5 py-3 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>৪টি ছবি ও বিস্তারিত দেখুন</span>
                  </button>

                  <button
                    id={`effect-showcase-order-btn-${activeProduct.id}`}
                    onClick={handleAdd}
                    className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-xs shadow-lg transition-all active:scale-95 ${
                      justAdded
                        ? 'bg-emerald-600 text-white shadow-emerald-950'
                        : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-amber-950'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>অর্ডারে যোগ হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <span>অনলাইনে অর্ডার করুন (৳{activeProduct.price})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Right: Photos Collage (5 Cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
                  <img
                    src={activeProduct.images[0]}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-stone-200 bg-stone-950/85 backdrop-blur-md p-2.5 rounded-xl border border-stone-800 truncate">
                    {activeProduct.imageCaptions[0]}
                  </div>
                </div>

                {/* Small gallery preview */}
                <div className="grid grid-cols-3 gap-2.5">
                  {activeProduct.images.slice(1, 4).map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => onOpenDetails(activeProduct)}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 cursor-pointer hover:border-amber-500 group"
                    >
                      <img
                        src={imgUrl}
                        alt="Photo"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
