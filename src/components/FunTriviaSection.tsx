import React from 'react';
import { ScrollText, Award, Building2, CheckCircle2, Factory, Leaf, ShieldCheck, Flame } from 'lucide-react';

export const FunTriviaSection: React.FC = () => {
  const pillars = [
    {
      num: '০১',
      title: 'প্রিমিয়াম তেন্দুপাতা ও ভার্জিনিয়া ব্লেন্ড',
      desc: 'কুষ্টিয়া ও নদীমাতৃক চরাঞ্চলের রৌদ্রপক্ব তামাক পাতা ও ভারতের বাছাইকৃত তেন্দুপাতার নিখুঁত সংমিশ্রণ নিশ্চিত করে স্বাভাবিক মিষ্টি সুবাস।'
    },
    {
      num: '০২',
      title: 'ওস্তাদ কারিগরদের হস্তশিল্প',
      desc: 'প্রতিটি শলাকা অভিজ্ঞ রোল-মাস্টারদের হাতের নিখুঁত বাঁধনে তৈরি, যা শলাকাকে দেয় সমান্তরাল ও মসৃণ বার্নিং গতি।'
    },
    {
      num: '০৩',
      title: 'উন্নত ফিল্টারিং ও মসৃণ ড্র প্রযুক্তি',
      desc: 'নতুন প্রজন্মের জন্য মনন গোল্ড ও আইস ক্রাশে সংযোজিত হয়েছে অ্যাক্টিভ সেলুলোজ ফিল্টার রিং, যা অতিরিক্ত টার শোষণ করে স্মুথনেস বৃদ্ধি করে।'
    },
    {
      num: '০৪',
      title: 'দেশব্যাপী কুরিয়ার ও ডিলারশিপ নেটওয়ার্ক',
      desc: 'কুষ্টিয়া সেন্ট্রাল ফ্যাক্টরি থেকে সিলড প্যাকেজিংয়ে দেশের ৬৪ জেলায় নিরাপদ হোম ডেলিভারি ও পাইকারি ডিলারশিপ সরবরাহ ব্যবস্থা।'
    },
  ];

  return (
    <section id="bidi-trivia" className="py-16 sm:py-20 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold">
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span>প্রতিষ্ঠা ১৯৫৪ • ঐতিহ্য ও আধুনিকতার মেলবন্ধন</span>
          </div>
          <h2 className="font-serif-bn text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200">
            মনন বিড়ির গৌরবময় ঐতিহ্য ও কারিগরি মান
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans">
            সাত দশকের বিশ্বস্ততা, নিখুঁত পাতা কিউরিং এবং আধুনিক ফিল্টার প্রযুক্তির সমন্বয়ে মনন বিড়ি আজ সারা দেশের ধোঁয়ারসিকদের প্রথম পছন্দ।
          </p>
        </div>

        {/* Story & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Origin Story Box (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900 border border-amber-800/60 rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Factory className="w-6 h-6 text-amber-500" />
                <h3 className="font-serif-bn text-2xl font-bold text-amber-200">
                  কুষ্টিয়ার ঐতিহ্য থেকে আধুনিক প্রযুক্তিতে
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                ১৯৫৪ সালে কুষ্টিয়ার গড়াই নদীর অববাহিকায় এক ক্ষুদ্র পারিবারিক উদ্যোগে শুরু হয়েছিল মনন বিড়ির যাত্রা। এখানকার মাটি ও আবহাওয়ায় জন্মানো বিশেষ সুবাসিত তামাক পাতাকে রোদে শুকিয়ে কাঠের পিপায় ফারমেন্টেশন করার সুপ্রাচীন রেসিপি এখনো ধরে রাখা হয়েছে।
              </p>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                আজকের দিনে ঐতিহ্যবাহী তেন্দুপাতা বিড়ির পাশাপাশি আমরা নিয়ে এসেছি নতুন প্রজন্মের <strong className="text-amber-300">মনন গোল্ড ফিল্টার</strong> ও <strong className="text-amber-300">আইস ক্রাশ মেন্থল সিরিজ</strong>, যা বিড়ি শিল্পে প্রথম আন্তর্জাতিক মানের ফিল্টারিং প্রযুক্তি উপহার দিয়েছে।
              </p>
            </div>

            {/* Certification Assurance */}
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/50 text-xs text-amber-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>কোয়ালিটি কন্ট্রোল ও ফ্যাক্টরি স্ট্যান্ডার্ড:</span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                প্রতিটি ব্যাচের তামাক পাতা কঠোর আর্দ্রতা ও নিকোটিন ভারসাম্য পরীক্ষায় উত্তীর্ণ হওয়ার পর সেন্ট্রাল প্যাকেজিং ইউনিটে সিল করা হয়।
              </p>
            </div>
          </div>

          {/* Right: 4 Pillars of Monon Bidi (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-stone-900 border border-stone-800 hover:border-amber-600/60 rounded-3xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {pillar.num}
                  </span>
                  <Award className="w-5 h-5 text-amber-500/80" />
                </div>
                <div>
                  <h4 className="font-serif-bn font-bold text-lg text-stone-100 mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
