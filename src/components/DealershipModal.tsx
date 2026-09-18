import React, { useState } from 'react';
import { X, Building2, Calculator, CheckCircle2, ShieldCheck, Phone, FileText, ArrowRight } from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '../data/bidiData';

interface DealershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DealershipModal: React.FC<DealershipModalProps> = ({ isOpen, onClose }) => {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(BANGLADESH_DISTRICTS[0]);
  const [cartons, setCartons] = useState(25);
  const [shopType, setShopType] = useState('পাইকারি ডিস্ট্রিবিউটর');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Wholesale calculation: 1 carton = 50 packets
  const totalPackets = cartons * 50;
  const retailValue = totalPackets * 65; // average retail ৳65
  const discountRate = cartons >= 100 ? 0.30 : cartons >= 50 ? 0.24 : cartons >= 20 ? 0.18 : 0.12;
  const wholesaleTotal = Math.round(retailValue * (1 - discountRate));
  const estimatedProfit = retailValue - wholesaleTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        id="dealership-inquiry-dialog"
        className="bg-stone-900 border border-amber-600/50 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-stone-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-bn text-xl sm:text-2xl font-bold text-amber-200">
                জেলা ডিলারশিপ ও পাইকারি সরবরাহ পোর্টাল
              </h3>
              <p className="text-xs text-stone-400">
                মনন বিড়ির অনুমোদিত ডিস্ট্রিবিউটরশিপ গ্রহণ করে আকর্ষণীয় লাভে ব্যবসা শুরু করুন
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

        {isSubmitted ? (
          <div className="bg-stone-950 border border-emerald-600/50 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-bn text-2xl font-bold text-amber-200">
              আবেদন সফলভাবে গৃহীত হয়েছে!
            </h4>
            <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
              ধন্যবাদ <strong>{ownerName}</strong> ({businessName})। আপনার আবেদন নম্বর <span className="font-mono text-amber-300 font-bold">DLR-BD-৭৮৯৪</span>। মনন বিড়ির বিভাগীয় সেলস ম্যানেজার আগামী ২৪ ঘণ্টার মধ্যে {phone} নম্বরে যোগাযোগ করবেন।
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                পপআপ বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Wholesale Profit Calculator (5 cols) */}
            <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>পাইকারি মার্জিন ক্যালকুলেটর</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>কার্টনের পরিমাণ (১ কার্টন = ৫০ প্যাকেট):</span>
                  <span className="font-mono font-bold text-amber-400">{cartons} কার্টন</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={cartons}
                  onChange={(e) => setCartons(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>৫ কার্টন (১২% ছাড়)</span>
                  <span>৫০ কার্টন (২৪% ছাড়)</span>
                  <span>১০০+ কার্টন (৩০% ছাড়)</span>
                </div>
              </div>

              <div className="bg-stone-900/80 rounded-xl p-3.5 space-y-2 text-xs border border-stone-800">
                <div className="flex justify-between text-stone-400">
                  <span>মোট প্যাকেট সংখ্যা:</span>
                  <span className="font-mono text-stone-200">{totalPackets.toLocaleString()} প্যাকেট</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>খুচরা বাজারমূল্য:</span>
                  <span className="font-mono text-stone-200">৳{retailValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>পাইকারি ডিসকাউন্ট রেট:</span>
                  <span className="font-mono text-emerald-400 font-bold">{(discountRate * 100).toFixed(0)}% ছাড়</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-sm">
                  <span className="text-amber-300">পাইকারি মূল্য:</span>
                  <span className="text-amber-400 font-mono">৳{wholesaleTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>আনুমানিক ডিলার লাভ:</span>
                  <span className="font-mono">+ ৳{estimatedProfit.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ডিলার সুবিধাসমূহ:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>বিনামূল্যে ব্র্যান্ডেড এক্রিলিক ডিসপ্লে স্ট্যান্ড ও পোস্টার</li>
                  <li>কারখানা থেকে নিজস্ব পরিবহনে ডেলিভারি ফ্রি</li>
                  <li>ড্যামেজ বা নষ্ট পাতার শতভাগ রিপ্লেসমেন্ট গ্যারান্টি</li>
                </ul>
              </div>
            </div>

            {/* Right: Application Form (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-300 mb-1">প্রতিষ্ঠানের নাম *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="উদা: মেসার্স ভাই ভাই এন্টারপ্রাইজ"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-1">প্রোপাইটরের নাম *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="উদা: মো: শফিউল আলম"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-300 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="উদা: ০১৭১১-XXXXXX"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-1">ব্যবসায়িক জেলা *</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} জেলা
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-stone-300 mb-1">ব্যবসার ধরণ</label>
                <select
                  value={shopType}
                  onChange={(e) => setShopType(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="পাইকারি ডিস্ট্রিবিউটর">পাইকারি হোলসেল ডিস্ট্রিবিউটর</option>
                  <option value="সুপারশপ / কনভেনিয়েন্স চেইন">সুপারশপ / কনভেনিয়েন্স চেইন</option>
                  <option value="টি-স্টল ও রিটেইল শপ">টি-স্টল ও রিটেইল পয়েন্ট</option>
                  <option value="নতুন ব্যবসায়ী / ফ্র্যাঞ্চাইজি">নতুন ফ্র্যাঞ্চাইজি শুরু করতে ইচ্ছুক</option>
                </select>
              </div>

              <button
                type="submit"
                id="submit-dealership-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>ডিলারশিপ অফিশিয়াল আবেদন জমা দিন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-500 text-center">
                আবেদন জমার পর কোনো অগ্রিম জামানত প্রয়োজন নেই। এলাকা যাচাই সাপেক্ষে ডিলার চুক্তি স্বাক্ষরিত হবে।
              </p>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
