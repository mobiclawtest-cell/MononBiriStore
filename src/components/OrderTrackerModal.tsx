import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package, Phone, AlertCircle, ShieldCheck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [searchId, setSearchId] = useState(initialOrderId || 'MN-88421');
  const [trackedOrder, setTrackedOrder] = useState<{
    orderId: string;
    customerName: string;
    productSummary: string;
    district: string;
    courierPartner: string;
    trackingCode: string;
    statusStep: number; // 1 to 4
    riderName: string;
    riderPhone: string;
    orderDate: string;
    estimatedDelivery: string;
    history: { time: string; stage: string; desc: string; done: boolean }[];
  }>({
    orderId: 'MN-88421',
    customerName: 'আরিফ জামান',
    productSummary: 'মনন প্রিমিয়াম গোল্ড ফিল্টার (২ প্যাকেট) + মেঘের গর্জ্জন (১ প্যাকেট)',
    district: 'ঢাকা (মিরপুর-১০)',
    courierPartner: 'Steadfast Courier Express',
    trackingCode: 'STF-BD-994301',
    statusStep: 3,
    riderName: 'মো: কামাল হোসেন (রাইডার নং ৪২)',
    riderPhone: '০১৭২২-০৯৮***',
    orderDate: 'আজ, সকাল ১০:১৫ মি.',
    estimatedDelivery: 'আজ বিকাল ৫:০০ - ৬:৩০ মি.',
    history: [
      {
        time: 'সকাল ১০:১৫ মি.',
        stage: 'অর্ডার গৃহীত ও ভেরিফাইড',
        desc: 'সিস্টেমে পেমেন্ট ও ইনভয়েস অনুমোদিত হয়েছে।',
        done: true,
      },
      {
        time: 'সকাল ১১:৩০ মি.',
        stage: 'মান নিয়ন্ত্রণ ও সিলড প্যাকেজিং',
        desc: 'কুষ্টিয়া কেন্দ্রীয় ল্যাব থেকে এয়ার-টাইট বক্সে প্যাকিং সম্পন্ন।',
        done: true,
      },
      {
        time: 'দুপুর ০১:২০ মি.',
        stage: 'কুরিয়ারে হস্তান্তর ও ট্র্যাকিং জেনারেট',
        desc: 'ঢাকা সেন্ট্রাল হাব হয়ে লোকাল ডেলিভারি হাবে পৌঁছেছে।',
        done: true,
      },
      {
        time: 'দুপুর ০৩:৪৫ মি.',
        stage: 'ডেলিভারিতে বের হয়েছে (On the Way)',
        desc: 'রাইডার কামাল হোসেন আপনার লোকেশনের উদ্দেশ্যে বের হয়েছেন।',
        done: true,
      },
      {
        time: 'অপেক্ষমাণ',
        stage: 'সফল ডেলিভারি ও হ্যান্ডওভার',
        desc: 'OTP যাচাইয়ের মাধ্যমে গ্রাহকের হাতে সরাসরি হস্তান্তর।',
        done: false,
      },
    ],
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchId.trim().toUpperCase();
    if (!id) return;

    setTrackedOrder((prev) => ({
      ...prev,
      orderId: id.startsWith('MN-') ? id : `MN-${id}`,
      trackingCode: `STF-BD-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        id="order-tracker-dialog"
        className="bg-stone-900 border border-amber-600/50 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-stone-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-bn text-xl sm:text-2xl font-bold text-amber-200">
                লাইভ পার্সেল ট্র্যাকিং
              </h3>
              <p className="text-xs text-stone-400">
                মনন বিড়ির অফিসিয়াল কুরিয়ার নেটওয়ার্ক ট্র্যাকিং
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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="অর্ডার আইডি দিন (উদা: MN-88421)"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-amber-500 font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shrink-0"
          >
            ট্র্যাক করুন
          </button>
        </form>

        {/* Tracking Details Card */}
        <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">অর্ডার নম্বর</span>
              <span className="font-mono font-bold text-amber-300 text-lg">{trackedOrder.orderId}</span>
            </div>

            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">কুরিয়ার ট্র্যাকিং কোড</span>
              <span className="font-mono text-stone-200 text-xs bg-stone-900 px-2.5 py-1 rounded border border-stone-700">
                {trackedOrder.trackingCode} ({trackedOrder.courierPartner})
              </span>
            </div>

            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">আনুমানিক ডেলিভারি</span>
              <span className="text-xs text-emerald-400 font-semibold">{trackedOrder.estimatedDelivery}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
            <div>
              <span className="text-stone-500 block">অর্ডারকৃত পণ্য:</span>
              <span className="font-medium text-stone-200">{trackedOrder.productSummary}</span>
            </div>
            <div>
              <span className="text-stone-500 block">গন্তব্য জেলা ও এলাকা:</span>
              <span className="font-medium text-stone-200">{trackedOrder.district}</span>
            </div>
          </div>
        </div>

        {/* Timeline Status */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            ডেলিভারি পর্যায়ক্রম
          </h4>

          <div className="space-y-4 pl-2">
            {trackedOrder.history.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5 relative">
                {/* Vertical connecting line */}
                {idx < trackedOrder.history.length - 1 && (
                  <div 
                    className={`absolute left-[11px] top-6 bottom-[-16px] w-0.5 ${
                      step.done ? 'bg-amber-500/70' : 'bg-stone-800'
                    }`} 
                  />
                )}

                {/* Dot */}
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    step.done
                      ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950'
                      : 'bg-stone-800 border border-stone-700 text-stone-500'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-stone-600" />}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold ${step.done ? 'text-amber-200' : 'text-stone-400'}`}>
                      {step.stage}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono shrink-0">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rider & Helpline Info */}
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-200 block">{trackedOrder.riderName}</span>
              <span className="text-[11px] text-stone-400">ডেলিভারি হেল্পলাইন: ০৯৬৭৮-মননবিড়ি</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-stone-300 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>সিলড প্যাকেট না পেলে গ্রহণ করবেন না</span>
          </div>
        </div>

      </div>
    </div>
  );
};
