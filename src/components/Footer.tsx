import React from 'react';
import { Flame, ShieldAlert, Phone, MapPin, Mail, ShieldCheck, Building2, Search, Video, Award } from 'lucide-react';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
  onOpenDealership?: () => void;
  onOpenTracker?: () => void;
  onOpenQuiz?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollTo,
  onOpenDealership,
  onOpenTracker,
  onOpenQuiz,
}) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 font-sans">
      
      {/* Official Statutory Warning Bar */}
      <div className="bg-stone-900 border-b border-stone-800 py-3.5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm text-amber-300 font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            বিধিবদ্ধ সতর্কীকরণ: ধূমপান স্বাস্থ্যের জন্য ক্ষতিকর। ১৮ বছরের কম বয়সীদের কাছে তামাকজাত পণ্য বিক্রয় দণ্ডনীয় অপরাধ।
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-md shadow-amber-950">
                <Flame className="w-6 h-6 fill-stone-950" />
              </div>
              <div>
                <span className="font-serif-bn text-2xl font-bold text-amber-300 block">
                  মনন বিড়ি
                </span>
                <span className="text-[10px] text-stone-400 tracking-wider font-sans uppercase">
                  Monon Bidi Industries Ltd. • Est. 1954
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              বাংলার ঐতিহ্যবাহী পাতা নির্বাচন ও হস্তনির্মিত রোলিং কারিগরির সাথে আধুনিক সেলুলোজ ফিল্টারের মেলবন্ধন। সাত দশক ধরে কুষ্টিয়া থেকে সারা দেশে খাঁটি ধোঁয়ার অভিজ্ঞতা পৌঁছে দিচ্ছে মনন বিড়ি।
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>বিএসটিআই মান নিয়ন্ত্রিত ও অনুমোদিত সিলড প্যাকেজিং</span>
            </div>
          </div>

          {/* Catalog & Products */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-xs border-b border-stone-800 pb-2">
              পণ্য সংস্করণ
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onScrollTo('bidi-catalog')}
                  className="hover:text-amber-300 transition-colors text-stone-400 hover:underline"
                >
                  আধুনিক গোল্ড ফিল্টার বিড়ি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('bidi-catalog')}
                  className="hover:text-amber-300 transition-colors text-stone-400 hover:underline"
                >
                  আইস ক্রাশ মেন্থল সিরিজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('bidi-catalog')}
                  className="hover:text-amber-300 transition-colors text-stone-400 hover:underline"
                >
                  ঐতিহ্যবাহী তেন্দুপাতা বিড়ি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('bidi-catalog')}
                  className="hover:text-amber-300 transition-colors text-stone-400 hover:underline"
                >
                  সিগনেচার ব্লেন্ড ও রয়্যাল এডিশন
                </button>
              </li>
              {onOpenQuiz && (
                <li>
                  <button
                    onClick={onOpenQuiz}
                    className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 mt-1"
                  >
                    <span>পছন্দের বিড়ি ফাইন্ডার</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Services */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-xs border-b border-stone-800 pb-2">
              সার্ভিস ও ট্র্যাকিং
            </h4>
            <ul className="space-y-2.5">
              {onOpenTracker && (
                <li>
                  <button
                    onClick={onOpenTracker}
                    className="hover:text-amber-300 transition-colors text-stone-400 flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>লাইভ পার্সেল ট্র্যাকিং</span>
                  </button>
                </li>
              )}
              {onOpenDealership && (
                <li>
                  <button
                    onClick={onOpenDealership}
                    className="hover:text-amber-300 transition-colors text-stone-400 flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>ডিলারশিপ ও পাইকারি বুকিং</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onScrollTo('brand-videos')}
                  className="hover:text-amber-300 transition-colors text-stone-400 flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5 text-amber-400" />
                  <span>ফ্যাক্টরি ভিডিও ডকুমেন্টারি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('user-reviews')}
                  className="hover:text-amber-300 transition-colors text-stone-400"
                >
                  গ্রাহক রিভিউ ও প্রশংসাপত্র
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('bidi-trivia')}
                  className="hover:text-amber-300 transition-colors text-stone-400"
                >
                  ঐতিহ্য ও কোয়ালিটি স্ট্যান্ডার্ড
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate & Plant Address */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-xs border-b border-stone-800 pb-2">
              প্রধান কার্যালয় ও যোগাযোগ
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>মনন টোব্যাকো ইন্ডাস্ট্রিজ লিমিটেড, বিসিক শিল্পনগরী, কুষ্টিয়া - ৭০০০</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+৮৮০ ৯৬১২-মননবিড়ি (09612-666664)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@mononbidi.com</span>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-amber-400">
                <Award className="w-3.5 h-3.5" />
                <span>সার্টিফিকেশন: ISO 9001:2015 কোয়ালিটি সার্টিফাইড</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            © ১৯৫৪ - ২০২৬ <strong>মনন বিড়ি ইন্ডাস্ট্রিজ লিমিটেড</strong> • সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>প্রাইভেসি পলিসি</span>
            <span>•</span>
            <span>ডেলিভারি নীতিমালা</span>
            <span>•</span>
            <span>ডিলারশিপ শর্তাবলি</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
