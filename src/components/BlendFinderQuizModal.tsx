import React, { useState } from 'react';
import { X, Sparkles, Compass, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { BidiProduct } from '../types';

interface BlendFinderQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BidiProduct[];
  onAddToCart: (product: BidiProduct) => void;
}

export const BlendFinderQuizModal: React.FC<BlendFinderQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    preference: 'modern',
    mood: 'chill',
    strength: 'medium',
  });

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setAnswers({ preference: 'modern', mood: 'chill', strength: 'medium' });
  };

  // Determine recommended product
  let recommended = products.find((p) => p.id === 'monon-gold-filter') || products[0];
  if (answers.preference === 'cool') {
    recommended = products.find((p) => p.id === 'monon-ice-crush') || recommended;
  } else if (answers.preference === 'classic' && answers.mood === 'rain') {
    recommended = products.find((p) => p.id === 'megher-gorjon') || recommended;
  } else if (answers.preference === 'spicy' || answers.strength === 'strong') {
    recommended = products.find((p) => p.id === 'boma-morich') || recommended;
  } else if (answers.mood === 'royal') {
    recommended = products.find((p) => p.id === 'monon-platinum-masters') || recommended;
  } else if (answers.mood === 'deep') {
    recommended = products.find((p) => p.id === 'darshonik-adda') || recommended;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        id="blend-finder-dialog"
        className="bg-stone-900 border border-amber-600/50 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 space-y-6 text-stone-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-bn text-xl font-bold text-amber-200">
                স্বাদ ও ব্লেন্ড নির্বাচক
              </h3>
              <p className="text-xs text-stone-400">
                আপনার ব্যক্তিত্ব ও পরিবেশ অনুযায়ী মানানসই মনন বিড়ি খুঁজে নিন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              ধাপ ১ / ৩ • আপনার প্রধান পছন্দ কী?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'modern', label: 'আধুনিক বায়ো-ফিল্টার ও সোনালি রিং', sub: 'স্মুথ ও পরিচ্ছন্ন ড্র' },
                { id: 'cool', label: 'বরফশীতল মিন্ট ক্রাশ ক্যাপসুল', sub: 'তীব্র সতেজ ঠান্ডা হাওয়া' },
                { id: 'classic', label: 'খাঁটি হস্তনির্মিত তেন্দুপাতা ঐতিহ্য', sub: 'আমসত্ত্ব ও ভেজা মাটির টান' },
                { id: 'spicy', label: 'কড়া ও তীব্র ঝাঁজালো মশলা', sub: 'ঘুম কাটাতে সর্বোচ্চ এনার্জি' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, preference: opt.id }));
                    setStep(2);
                  }}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left space-y-1 transition-all group"
                >
                  <span className="text-xs font-bold text-stone-200 group-hover:text-amber-300 block">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-stone-500 block">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              ধাপ ২ / ৩ • কোন পরিবেশে বেশি ব্যবহার করবেন?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'chill', label: 'দৈনন্দিন প্রফেশনাল ও কাজের বিরতি', sub: 'স্মার্ট ও মার্জিত' },
                { id: 'deep', label: 'বন্ধুদের সাথে গভীর আড্ডা ও চায়ের টং', sub: 'এলাচ ও কড়া তামাক' },
                { id: 'rain', label: 'বৃষ্টির দিনে বারান্দায় বা নির্জনতায়', sub: 'বর্ষার সোঁদা সুবাস' },
                { id: 'royal', label: 'বিশেষ উৎসব, বিবাহ বা ভিআইপি মেহমানদারি', sub: 'জাফরানি প্রিমিয়াম' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, mood: opt.id }));
                    setStep(3);
                  }}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left space-y-1 transition-all group"
                >
                  <span className="text-xs font-bold text-stone-200 group-hover:text-amber-300 block">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-stone-500 block">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in zoom-in-95">
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>আপনার জন্য নির্বাচিত মনন স্পেশাল</span>
            </div>

            <div className="bg-stone-950 border border-amber-600/60 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={recommended.images[0]}
                alt={recommended.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-stone-800 shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[11px] bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-800">
                    {recommended.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ৳{recommended.price} / প্যাকেট
                  </span>
                </div>
                <h4 className="font-serif-bn text-xl font-bold text-amber-200">
                  {recommended.name}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {recommended.tagline}
                </p>
                <div className="text-[11px] text-stone-400">
                  ফিল্টার: <strong>{recommended.filterType || 'ঐতিহ্যবাহী তেন্দুপাতা'}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(recommended);
                  onClose();
                }}
                className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ঝুলিতে যোগ করুন (৳{recommended.price})</span>
              </button>
              <button
                onClick={handleReset}
                className="p-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition-colors"
                title="পুনরায় বাছাই করুন"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
