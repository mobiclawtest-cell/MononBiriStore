import { BidiProduct, DeliveryOption, UserReview, BrandVideo, LuckyVoucher } from '../types';

// Import generated local product images
import heroBannerImg from '../assets/images/monon_hero_banner_1788953652056.jpg';
import craftPackImg from '../assets/images/monon_craft_pack_1788953665001.jpg';
import megherGorjonImg from '../assets/images/megher_gorjon_1788953711739.jpg';
import darshonikAddaImg from '../assets/images/darshonik_adda_1788953726213.jpg';
import mononModernGoldImg from '../assets/images/monon_modern_gold_1788955347389.jpg';
import mononIceCrushImg from '../assets/images/monon_ice_crush_1788955361264.jpg';
import mononCharcoalImg from '../assets/images/monon_charcoal_pack_1788956563139.jpg';
import mononPlatinumPackImg from '../assets/images/monon_platinum_pack_1788956575197.jpg';
import mononSpicyPackImg from '../assets/images/monon_spicy_pack_1788956587635.jpg';
import mononChanderAloImg from '../assets/images/monon_chander_alo_1788956614556.jpg';
import einsteinHistoryImg from '../assets/images/einstein_monon_history_1788956627080.jpg';

export {
  heroBannerImg,
  craftPackImg,
  megherGorjonImg,
  darshonikAddaImg,
  mononModernGoldImg,
  mononIceCrushImg,
  mononCharcoalImg,
  mononPlatinumPackImg,
  mononSpicyPackImg,
  mononChanderAloImg,
  einsteinHistoryImg,
};

export const BIDI_PRODUCTS: BidiProduct[] = [
  {
    id: 'monon-gold-filter',
    name: 'মনন প্রিমিয়াম গোল্ড ফিল্টার',
    englishName: 'Monon Premium Gold Filter Edition',
    tagline: 'আধুনিক যুগের সেরা কারিগরি — সোনালি ব্যান্ড, অর্গানিক ফিল্টার ও অভিজাত খাঁটি পাতার নিখুঁত মেলবন্ধন।',
    flavor: 'রিচ গোল্ডেন টোব্যাকো ও হালকা ওক কাঠের মিষ্টি সুবাস',
    category: 'modern_filter',
    categoryLabel: 'আধুনিক ফিল্টার বিড়ি',
    categoryIcon: 'Sparkle',
    isModern: true,
    filterType: 'অর্গানিক বায়ো-কটন গোল্ডেন রিং ফিল্টার',
    price: 175000,
    originalPrice: 225000,
    discountPercentage: 22,
    soldCount: '১.৮k+ বিক্রি',
    packSize: '২০ শলাকার প্রিমিয়াম হার্ডবক্স',
    rating: 4.96,
    reviewCount: 184,
    strength: 3,
    images: [
      mononModernGoldImg,
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
      craftPackImg,
      heroBannerImg,
    ],
    imageCaptions: [
      'ছবি ১: গাঢ় সোনালি আধুনিক বক্সে মনন বিড়ি ব্র্যান্ডিং ও সোনালি ফিল্টার রিংযুক্ত শলাকা',
      'ছবি ২: ওক কাঠে রাখা বাছাইকৃত কিউরড সোনালি তামাক পাতার নিখুঁত টেক্সচার',
      'ছবি ৩: আধুনিক হস্তশিল্প ও প্রিমিয়াম হার্ডবক্স ফিনিশিং',
      'ছবি ৪: নিখুঁত সাইজ ও আধুনিক সিলিন্ডার আকৃতির পারফেক্ট ড্র'
    ],
    effects: [
      'ফিল্টারের কারণে ধোঁয়া অত্যন্ত স্মুথ, গলায় কোনো ঝাঁজ বা কর্কশ অনুভূতি নেই।',
      'ধীর ও স্থির প্রজ্জ্বলন— প্রতি শলাকা সাধারণ বিড়ির চেয়ে দ্বিগুণ সময় দীর্ঘস্থায়ী হয়।',
      'আঙ্গুলে কোনো গন্ধ ধরে রাখে না এবং ছাই ছড়িয়ে পড়ে না।',
      'ব্যস্ত কাজের ফাঁকে বা আধুনিক কফিশপে রুচিশীল ব্যক্তিত্বের পরিচয়।'
    ],
    funnyTrivia: 'মনন বিড়ির প্রথম আধুনিক সংস্করণ হিসেবে এটি তরুণ প্রফেশনাল ও রুচিশীলদের মধ্যে এক মাসের মাথায় সর্বোচ্চ বিক্রির রেকর্ড গড়েছে।',
    secretIngredient: 'উত্তরবঙ্গের ৩ বছর বয়সের গোল্ডেন ভার্জিনিয়া তামাক পাতা ও জাপানি অর্গানিক মাইক্রো-ফিল্টার।',
    rollMasterStory: 'প্রধান প্রোডাক্ট ডিজাইনার বলেন: "আমরা চেয়েছিলাম ঐতিহ্যবাহী বিড়ি যেন আধুনিক যে কোনো প্রিমিয়াম ব্র্যান্ডকে হার মানাতে পারে।"',
    smokeProfile: {
      sweetness: 65,
      smokeDensity: 80,
      aroma: 96,
      kick: 70,
    },
    badge: 'সর্বাধিক জনপ্রিয় আধুনিক সংস্করণ',
    isPopular: true,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'monon-ice-crush',
    name: 'মনন আইস ক্রাশ মিন্ট ক্যাপসুল',
    englishName: 'Monon Ice Crush Mint Capsule',
    tagline: 'ক্লিক করলেই বরফশীতল মিন্টের বিস্ফোরণ — আধুনিক ফিল্টার বিড়ির প্রথম কুলিং টেকনোলজি!',
    flavor: 'হিমশীতল তাজা পুদিনা ও মেন্থল ক্রাশ ক্যাপসুল',
    category: 'modern_filter',
    categoryLabel: 'আধুনিক ফিল্টার বিড়ি',
    categoryIcon: 'Snowflake',
    isModern: true,
    filterType: 'ক্রাশ ক্যাপসুল আইস-ফিল্টার (সবুজ রিং)',
    price: 190000,
    originalPrice: 240000,
    discountPercentage: 21,
    soldCount: '১.৪k+ বিক্রি',
    packSize: '২০ শলাকার মেটালিক গ্রিন ফ্লিপটপ বক্স',
    rating: 4.92,
    reviewCount: 156,
    strength: 2,
    images: [
      mononIceCrushImg,
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
      mononModernGoldImg,
      craftPackImg,
    ],
    imageCaptions: [
      'ছবি ১: স্লিক মেটালিক গ্রিন প্যাকেজিংয়ে মনন বিড়ি আইস ক্রাশ ও ক্রাশ বল ফিল্টার বিড়ি',
      'ছবি ২: ফিল্টারের মাঝামাঝি বিশেষ ক্লিক ক্যাপসুল যা চাপ দিলেই বরফশীতল হাওয়া দেয়',
      'ছবি ৩: তাজা পুদিনা পাতার প্রাকৃতিক নির্জাস ও ফাইন-কাট তামাক',
      'ছবি ৪: আধুনিক স্টাইলিশ লুক ও স্লিম হ্যান্ডেল ডিজাইন'
    ],
    effects: [
      'ফিল্টারে এক ক্লিকের সাথে সাথেই মুখে তীব্র সতেজ বরফশীতল হাওয়া খেলে যায়।',
      'ধোঁয়ায় কোনো গরম ভাব নেই, টানা শেষে গলায় মিষ্টি মেন্থলের ফ্রেস অনুভূতি থাকে।',
      'গরমে ক্লান্তি ও তন্দ্রা দূর করে সঙ্গে সঙ্গে মেজাজ ফুরফুরে করে তোলে।',
      'পার্টি কিংবা সান্ধ্যকালীন আধুনিক আড্ডায় সবার দৃষ্টি আকর্ষণ করবে।'
    ],
    funnyTrivia: 'প্রতিটি ক্যাপসুলে রয়েছে প্রাকৃতিক স্পিয়ারমিন্ট এসেন্স যা তামাকের তীব্রতাকে ঠাণ্ডা রেশমে রূপান্তরিত করে।',
    secretIngredient: 'হিমালয়ান মিন্ট ক্রিস্টাল, ক্লোভ এসেন্স ও হালকা কিউরড সোনালি তামাক।',
    rollMasterStory: 'ফিল্টার ল্যাব এক্সপার্ট বলেন: "বিড়ির ইতিহাসে এই প্রথম বরফশীতল ক্যাপসুল টেকনোলজি ব্যবহার করা হয়েছে।"',
    smokeProfile: {
      sweetness: 70,
      smokeDensity: 65,
      aroma: 98,
      kick: 45,
    },
    badge: 'নতুন টেকনোলজি',
    isPopular: true,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'monon-charcoal-active',
    name: 'মনন একটিভ চারকোল ব্ল্যাক',
    englishName: 'Monon Active Charcoal Slim Black',
    tagline: 'স্লিম ব্ল্যাক বডি ও সক্রিয় কয়লা ফিল্টার — পরিচ্ছন্ন ও মার্জিত স্বাদের প্রতীক।',
    flavor: 'স্মুদ টোব্যাকো ও ড্রাইড নাট ফিনিশ',
    category: 'modern_filter',
    categoryLabel: 'আধুনিক ফিল্টার বিড়ি',
    categoryIcon: 'ShieldCheck',
    isModern: true,
    filterType: 'ডুয়াল-স্টেজ এক্টিভেটেড কার্বন চারকোল ফিল্টার',
    price: 160000,
    originalPrice: 200000,
    discountPercentage: 20,
    soldCount: '৯৫০+ বিক্রি',
    packSize: '২০ শলাকার ম্যাট ব্ল্যাক প্যাক',
    rating: 4.85,
    reviewCount: 92,
    strength: 3,
    images: [
      mononCharcoalImg,
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
      craftPackImg,
      heroBannerImg,
    ],
    imageCaptions: [
      'ছবি ১: ম্যাট ব্ল্যাক আধুনিক বক্সে স্লেন্ডার ব্ল্যাক ফিল্টার বিড়ি ও সিলভার ব্যান্ড',
      'ছবি ২: সক্রিয় চারকোল ফিল্টারের অভ্যন্তরীণ মাইক্রো-গ্রানুল যা অতিরিক্ত টার শোষণ করে',
      'ছবি ৩: কাঠের টেবিলে পরিপাটি ও মার্জিত কালো প্রেজেন্টেশন',
      'ছবি ৪: ধীর ও শান্ত প্রজ্জ্বলন'
    ],
    effects: [
      'সক্রিয় চারকোলের কারণে ধোঁয়া চরম পরিশোধিত ও মৃদু অনুভূতি দেয়।',
      'মুখে কোনো ভারী তিতকুটে স্বাদ ফেলে যায় না।',
      'অফিসের ব্রেক বা কাজের মাঝে পরিচ্ছন্ন টানার জন্য আদর্শ।',
      'স্মার্ট ডিজাইন ও মার্জিত কালো লুক।'
    ],
    funnyTrivia: 'নারকেলের খোসা থেকে তৈরি অ্যাক্টিভেটেড কার্বন দিয়ে তৈরি ফিল্টার ধোঁয়াকে সাধারণ বিড়ির চেয়ে ৬০% বেশি পরিচ্ছন্ন করে তোলে।',
    secretIngredient: 'অ্যাক্টিভ কোকোনাট কার্বন ও সেন্ট্রাল ইন্ডিয়ান লাইট টোব্যাকো লিফ।',
    rollMasterStory: 'প্রোডাকশন সুপারভাইজার বলেন: "স্বাস্থ্য সচেতন আধুনিক তরুণদের জন্যই আমরা এই ব্ল্যাক সংস্করণ প্রস্তুত করেছি।"',
    smokeProfile: {
      sweetness: 40,
      smokeDensity: 60,
      aroma: 85,
      kick: 60,
    },
    badge: 'স্মার্ট স্লিম ব্ল্যাক',
    isPopular: false,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'megher-gorjon',
    name: 'মেঘের গর্জ্জন স্পেশাল',
    englishName: 'Megher Gorjon (Artisanal Rain Reserve)',
    tagline: 'আমসত্ত্ব ও ভেজা মাটির প্রাকৃতিক কিউরিং — বর্ষার দিনে খাঁটি তেন্দুপাতার সোনালি ঐতিহ্য।',
    flavor: 'পাকা আমসত্ত্ব ও প্রথম বৃষ্টির সোঁদা মাটি',
    category: 'classic_tendu',
    categoryLabel: 'ঐতিহ্যবাহী তেন্দুপাতা',
    categoryIcon: 'CloudRain',
    isModern: false,
    filterType: 'ঐতিহ্যবাহী নিখাদ তেন্দুপাতা হস্তনির্মিত টিপ',
    price: 125000,
    originalPrice: 160000,
    discountPercentage: 22,
    soldCount: '২.৫k+ বিক্রি',
    packSize: '২০ শলাকার লাল সুতায় বাঁধা স্পেশাল বান্ডিল',
    rating: 4.9,
    reviewCount: 142,
    strength: 3,
    images: [
      megherGorjonImg,
      craftPackImg,
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    ],
    imageCaptions: [
      'ছবি ১: কুষ্টিয়ার পাকা আমসত্ত্বের নির্জাসে জারিত বিশেষ তেন্দু পাতা ও লাল সুতার বাঁধন',
      'ছবি ২: হাতে মোড়ানো খাঁটি মনন কারিগরি বান্ডিল ও স্ট্যাম্প',
      'ছবি ৩: বৃষ্টির ভেজা জানালার পাশে ধোঁয়ার মেঘলা আবেশ',
      'ছবি ৪: খাঁটি কাঠের ট্রেতে ঐতিহ্যবাহী প্রেজেন্টেশন'
    ],
    effects: [
      'ভেজা সোঁদা মাটির প্রশান্তিময় সুবাসে মন শান্ত ও একাগ্র হয়ে ওঠে।',
      'গরম চা ও খিচুড়ির সাথে চমৎকার মেলবন্ধন তৈরি করে।',
      'মনন কারিগরদের শত বছরের ঐতিহ্যবাহী লাল সুতার ক্লাসিক অনুভূতি।',
      'প্রাকৃতিক তেন্দুপাতার দীর্ঘস্থায়ী মিষ্টি আফটার-টেস্ট।'
    ],
    funnyTrivia: 'এই বিড়ির জন্য তেন্দুপাতা বিশেষ উপায়ে চাঁপাইনবাবগঞ্জের আমবাগানের বাতাসে শুকানো হয়, যা ধোঁয়ায় মিষ্টি আমসত্ত্বের সুবাস যোগ করে।',
    secretIngredient: 'রোদে শুকানো খাঁটি ফজলি আমসত্ত্বের নির্যাস ও প্রথম বর্ষার ভেজা মাটির কুষ্টিয়ান কিউরিং।',
    rollMasterStory: 'মাস্টার কারিগর আব্দুল জব্বার বলেন: "৪০ বছর ধরে আমি এই বিড়ি বাঁধছি, এর ধোঁয়ার ঘ্রাণে অন্য কোনো বিড়ি টিকতে পারবে না!"',
    smokeProfile: {
      sweetness: 82,
      smokeDensity: 70,
      aroma: 95,
      kick: 60,
    },
    badge: 'সেরা ক্লাসিক হট সেলার',
    isPopular: true,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'darshonik-adda',
    name: 'দার্শনিক আড্ডা স্পেশাল',
    englishName: 'Darshonik Adda (Intellectual Blend)',
    tagline: 'কড়া মাটির ভাঁড়ের চা ও এলাচ-লবঙ্গের গম্ভীর সুবাস — গভীর আলোচনা ও সান্ধ্য আড্ডার সেরা সঙ্গী।',
    flavor: 'ধোঁয়া ওঠা মাটির ভাঁড়ের আদা-এলাচ চা ও রোস্টেড তামাক',
    category: 'signature_blend',
    categoryLabel: 'সিগনেচার ব্লেন্ড',
    categoryIcon: 'BookOpen',
    isModern: false,
    filterType: 'প্রাকৃতিক তেন্দুপাতা কটন কোটেড রোল',
    price: 145000,
    originalPrice: 185000,
    discountPercentage: 22,
    soldCount: '১.১k+ বিক্রি',
    packSize: '২০ শলাকার ঐতিহ্যবাহী ক্রাফট বক্স',
    rating: 4.88,
    reviewCount: 98,
    strength: 4,
    images: [
      darshonikAddaImg,
      heroBannerImg,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    ],
    imageCaptions: [
      'ছবি ১: পুরোনো বইয়ের পাতা ও মাটির চায়ের কাপের পাশে মনন দার্শনিক বিড়ি',
      'ছবি ২: সান্ধ্যকালীন আড্ডার আবহ ও ঐতিহ্যবাহী কাঠের ট্রে',
      'ছবি ৩: গভীর চিন্তা উদ্রেককারী তেন্দু পাতার নিখুঁত হস্তনির্মিত ভাঁজ',
      'ছবি ৪: ধোঁয়া ও কড়া চায়ের বাষ্পের মেলবন্ধন'
    ],
    effects: [
      'গভীর মানসিক একাগ্রতা বৃদ্ধি করে এবং ক্লান্তি দূর করে।',
      'বন্ধুদের সাথে দীর্ঘ আড্ডা ও বুদ্ধিবৃত্তিক আলোচনার প্রাণবন্ত পরিবেশ তৈরি করে।',
      'কড়া তামাক ও মশলার ঝাঁজালো কিন্তু সুষম কিউরিং।',
      'মাটির কাপের লাল চা বা দুধ চায়ের সাথে অনন্য স্বাদের জুটি।'
    ],
    funnyTrivia: 'ঢাকা বিশ্ববিদ্যালয় টিএসসি, শান্তিনিকেতন ও কুষ্টিয়ার লালন আখড়ার ঐতিহ্যবাহী আড্ডাগুলোর জন্য এই বিশেষ ব্লেন্ড যুগ যুগ ধরে জনপ্রিয়।',
    secretIngredient: 'সিলেটের রোস্টেড চা পাতা, ছোট এলাচ ও জাভা লবঙ্গ।',
    rollMasterStory: 'কারিগর করিম মিয়া বলেন: "দার্শনিক আড্ডা বিড়ির তামাক পাতা কাঠের আগুনে হালকা সেঁকে নেওয়া হয়, যাতে ধোঁয়ার স্বাদ কড়া হয়।"',
    smokeProfile: {
      sweetness: 45,
      smokeDensity: 88,
      aroma: 92,
      kick: 85,
    },
    badge: 'আড্ডার নির্ভরযোগ্য সঙ্গী',
    isPopular: true,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'chander-alo',
    name: 'চাঁদের আলো রজনীগন্ধা',
    englishName: 'Chander Alo (Night Jasmine Reserve)',
    tagline: 'রাতের তাজা শিউলি ও রজনীগন্ধার সুবাস — স্নিগ্ধ রোমান্টিক সন্ধ্যা ও শান্তির পরশ।',
    flavor: 'রাতের তাজা শিউলি, রজনীগন্ধা ও বুনো বেলের ঠান্ডা মিষ্টতা',
    category: 'royal_edition',
    categoryLabel: 'রয়্যাল এডিশন',
    categoryIcon: 'Moon',
    isModern: false,
    filterType: 'রেশমি সুতায় বাঁধা সফট হ্যান্ডেল তেন্দুপাতা',
    price: 155000,
    originalPrice: 195000,
    discountPercentage: 21,
    soldCount: '৮২০+ বিক্রি',
    packSize: '২০ শলাকার রেশমি সুতায় বাঁধা বান্ডিল',
    rating: 4.95,
    reviewCount: 115,
    strength: 2,
    images: [
      mononChanderAloImg,
      'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
      craftPackImg,
    ],
    imageCaptions: [
      'ছবি ১: মুক্তা-সাদা সুদৃশ্য বক্সে মনন চাঁদের আলো ও শ্বেত সিল্ক সুতোয় মোড়ানো সূক্ষ্ম শলাকা',
      'ছবি ২: পূর্ণিমার জ্যোৎস্নায় শুকাতে দেওয়া বিশেষ ভেষজ পাতা ও সুবাসিত ফুল',
      'ছবি ৩: সুগন্ধি বুনো ফুলের নির্যাস জারিত তেন্দু শলাকা',
      'ছবি ৪: রাজকীয় রুপার কন্টেইনারে সংরক্ষণ'
    ],
    effects: [
      'স্নিগ্ধ ও অত্যন্ত আরামদায়ক সুবাস চারপাশের বাতাসকে সুবাসিত করে।',
      'দিনভর ক্লান্তিকর কাজের পর মানসিক প্রশান্তি ফিরিয়ে দেয়।',
      'মৃদু শক্তির কারণে যেকোনো হালকা টানার জন্য দারুণ উপযুক্ত।',
      'মধুর ও রোমান্টিক আবহ তৈরি করে।'
    ],
    funnyTrivia: 'এই বিড়ির পাতা শুক্লপক্ষের শান্ত বাতাসে শুকানো হয়, ফলে পাতার সবুজ রঙ ও প্রাকৃতিক এসেন্স অক্ষুণ্ণ থাকে।',
    secretIngredient: 'হেমন্তের ভোরের শিউলি ও বুনো বেলের মিষ্ট খোসা।',
    rollMasterStory: 'কারিগর সোহেল রানা বলেন: "এই বিড়ির সুবাস এত মিষ্টি যে যারা ধূমপান করেন না তারাও এর পাশে বসতে পছন্দ করেন।"',
    smokeProfile: {
      sweetness: 75,
      smokeDensity: 50,
      aroma: 98,
      kick: 35,
    },
    badge: 'স্নিগ্ধ ও মিষ্টি সুবাস',
    isPopular: false,
    stockStatus: 'সীমিত প্রিমিয়াম ব্যাচ'
  },
  {
    id: 'boma-morich',
    name: 'বোম্বাই ক্রাফট ফায়ার',
    englishName: 'Bombai Craft Fire (High Strength Bold)',
    tagline: 'বোম্বাই মরিচের উষ্ণ ঝাঁজ ও খাঁটি সরিষার তেলের কিউরিং — নিমিষেই ঘুম দূর ও সর্বোচ্চ এনার্জি!',
    flavor: 'ঝাঁঝালো নাগা চিলি এসেন্স, খাঁটি সরিষার তেলের স্টিম ও বোল্ড তামাক',
    category: 'spicy_bold',
    categoryLabel: 'বোল্ড ও হাই এনার্জি',
    categoryIcon: 'Flame',
    isModern: false,
    filterType: 'মজবুত ডবল তেন্দু গ্রিপ টিপ',
    price: 135000,
    originalPrice: 175000,
    discountPercentage: 23,
    soldCount: '১.৩k+ বিক্রি',
    packSize: '২০ শলাকার এনার্জি প্যাক',
    rating: 4.75,
    reviewCount: 83,
    strength: 5,
    images: [
      mononSpicyPackImg,
      craftPackImg,
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      megherGorjonImg,
    ],
    imageCaptions: [
      'ছবি ১: গাঢ় লাল ক্রাফট প্যাকেজে মনন বোম্বাই ফায়ার এবং হলুদ সুতায় বাঁধা কড়া তেন্দু বিড়ি',
      'ছবি ২: খাঁটি কাঠের ঘানির তেলে ডোবানো বিশেষ প্রাকৃতিক সুতা',
      'ছবি ৩: আগ্নেয়গিরির মতো রঙিন মশলা ও ভেষজ বীজের মিশ্রণ',
      'ছবি ৪: মনন স্পাইসি সিলমোহর'
    ],
    effects: [
      'প্রথম টানেই কড়া ঝাঁজ শরীরের স্নায়ুতন্ত্রকে দ্রুত চাঙ্গা করে তোলে।',
      'ঘুমের ভাব সেকেন্ডের মধ্যে দূর হয়ে কাজের স্পৃহা বাড়ে।',
      'বৃষ্টির রাতে বা শীতের দিনে শরীরকে উষ্ণ ও প্রাণবন্ত রাখে।',
      'কড়া বিড়ি প্রেমীদের জন্য অদ্বিতীয় তৃপ্তি।'
    ],
    funnyTrivia: 'ড্রাইভার ও রাতের শিফটের প্রফেশনালদের মধ্যে ঘুম তাড়িয়ে দীর্ঘ মনোযোগ ধরে রাখার জন্য এই বিড়ি ব্যাপক সমাদৃত।',
    secretIngredient: 'সিলেটের নাগা মরিচের বোঁটার নির্যাস ও পাহাড়ী গোলমরিচ।',
    rollMasterStory: 'উস্তাদ রহিম খাঁ বলেন: "এই বিড়ির ঝাঁজ যার গলায় যায়, তার রক্ত গরম হয়ে যায়!"',
    smokeProfile: {
      sweetness: 10,
      smokeDensity: 95,
      aroma: 80,
      kick: 99,
    },
    badge: 'সর্বোচ্চ কড়া ও তীব্র',
    isPopular: false,
    stockStatus: 'ইন-স্টক (তাজা পাতা)'
  },
  {
    id: 'monon-platinum-masters',
    name: 'মনন প্লাটিনাম মাস্টার্স রিজার্ভ',
    englishName: 'Monon Platinum Masters Reserve',
    tagline: 'কাশ্মীরি জাফরান, কাজুবাদাম ও নবাবী কিউরিং — বাংলাদেশের সবচেয়ে বিলাসবহুল ক্রাফট বিড়ি।',
    flavor: 'রাজকীয় জাফরান, ভাজা কাজুবাদাম ও ওক ব্যারেলে ৫ বছর কিউরড তামাক',
    category: 'royal_edition',
    categoryLabel: 'রয়্যাল এডিশন',
    categoryIcon: 'Crown',
    isModern: true,
    filterType: 'গোল্ড-এমব্রয়ডারি প্লাটিনাম রিজিড ফিল্টার',
    price: 295000,
    originalPrice: 380000,
    discountPercentage: 22,
    soldCount: '৬৫০+ বিক্রি',
    packSize: '২০ শলাকার ভেলভেট বক্স সংস্করণ',
    rating: 4.98,
    reviewCount: 165,
    strength: 4,
    images: [
      mononPlatinumPackImg,
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
      darshonikAddaImg,
      heroBannerImg,
    ],
    imageCaptions: [
      'ছবি ১: রাজকীয় পান্না সবুজ ও স্বর্ণালী ভেলভেট বক্সে সাজানো গোল্ড-ফয়েল ফিল্টার বিড়ি',
      'ছবি ২: রাজকীয় আতর ও জাফরানের ফোঁটায় সুবাসিত খাঁটি পাতা',
      'ছবি ৩: সূক্ষ্ম হস্তনির্মিত নিখুঁত সিলমোহর দেওয়া নবাবী বান্ডিল',
      'ছবি ৪: মনন বিড়ির প্রিমিয়াম ভিন্টেজ ব্রাস ট্রের উপর পরিবেশনা'
    ],
    effects: [
      'জাফরান ও প্রিমিয়াম তামাকের রাজকীয় আভিজাত্যময় সুবাস।',
      'প্রতিটি ধোঁয়া মুখে ঘন, মোলায়েম ও দীর্ঘস্থায়ী রাজকীয় স্বাদ রেখে যায়।',
      'অভিজাত মহলে উপহার হিসেবে দেওয়ার জন্য অত্যন্ত প্রশংসিত।',
      'বিশেষ উদযাপন বা অর্জনের মুহূর্তে পান করার জন্য শ্রেষ্ঠ নির্বাচন।'
    ],
    funnyTrivia: 'এই সংস্করণের প্রতিটি শলাকা তৈরি করতে সবচেয়ে অভিজ্ঞ প্রবীণ কারিগরদের বাছাই করা হয় এবং প্রতিটির ওজন ডিজিটাল স্কেলে নিখুঁতভাবে মাপা হয়।',
    secretIngredient: 'খাঁটি কাশ্মীরি মোগরা জাফরান নির্যাস, রোস্টেড কাজু চূর্ণ ও ফ্রেঞ্চ ওক উড স্মোক।',
    rollMasterStory: 'নবাবী রোল মাস্টার সুলতান সাহেব বলেন: "মনন প্লাটিনাম সাধারণ কোনো বিড়ি নয়, এটি আমাদের ৫০ বছরের সাধনার শ্রেষ্ঠ ফল।"',
    smokeProfile: {
      sweetness: 78,
      smokeDensity: 85,
      aroma: 99,
      kick: 75,
    },
    badge: 'ভিআইপি রাজকীয় সংস্করণ',
    isPopular: true,
    stockStatus: 'সীমিত প্রিমিয়াম ব্যাচ'
  },
  {
    id: 'einstein-1939-reserve',
    name: 'আইনস্টাইন ১৯৩৯ হিস্টোরিক রিজার্ভ',
    englishName: 'Albert Einstein 1939 Historic Reserve (Princeton Edition)',
    tagline: '১৯৩৯ সালে লং আইল্যান্ডের টেবিলে আলবার্ট আইনস্টাইনের হাতে ধরা ছিল কুষ্টিয়ার মনন বিড়ি — গভীর বিজ্ঞান চিন্তার ঐতিহাসিক অনুঘটক!',
    flavor: 'ঐতিহাসিক ওক কাঠ, পদ্মা অববাহিকার ১০০ বছরের সুপ্রাচীন তামাক কিউরিং ও শান্ত ধোঁয়ার মিষ্টি নোট',
    category: 'historic_archive',
    categoryLabel: 'ঐতিহাসিক আর্কাইভ সংস্করণ',
    categoryIcon: 'History',
    isModern: false,
    filterType: 'সুপ্রাচীন তেন্দুপাতা ঐতিহ্যবাহী প্রিসিশন রোল',
    price: 450000,
    originalPrice: 580000,
    discountPercentage: 22,
    soldCount: '৩.২k+ বিক্রি',
    packSize: '২০ শলাকার ভিন্টেজ অ্যান্টিক মেটাল টিন সংস্করণ',
    rating: 5.0,
    reviewCount: 312,
    strength: 4,
    images: [
      einsteinHistoryImg,
      craftPackImg,
      darshonikAddaImg,
      mononModernGoldImg,
    ],
    imageCaptions: [
      'ছবি ১: ঐতিহাসিক প্রমাণ — ১৯৩৯ সালের ২ অগাস্ট আলবার্ট আইনস্টাইনের হাতে কুষ্টিয়ার মনন বিড়ি ও টেবিলে গবেষণাপত্র',
      'ছবি ২: সুপ্রাচীন ভিন্টেজ মেটাল টিনে সংরক্ষিত খাঁটি তেন্দুপাতা শলাকা',
      'ছবি ৩: তাত্ত্বিক পদার্থবিজ্ঞান ও আপেক্ষিকতার গভীর চিন্তার চিরন্তন সঙ্গী',
      'ছবি ৪: খাঁটি তেন্দু পাতার ঐতিহ্যবাহী অ্যান্টিক সিলমোহর'
    ],
    effects: [
      'গভীর চিন্তা, গাণিতিক একাগ্রতা ও তাত্ত্বিক গবেষণার অসাধারণ মানসিক স্থিরতা এনে দেয়।',
      'ধীর ও সুষম প্রজ্জ্বলন—প্রতিটি টান মনকে শান্ত ও গভীর ভাবনায় নিমজ্জিত করে।',
      'আইনস্টাইনের নিজের ভাষায়: "তামাকুর স্নিগ্ধ ধোঁয়া মানুষের বুদ্ধিবৃত্তিক অস্থিরতা দূর করে।"',
      'ইতিহাসপ্রেমী ও সংগ্রাহকদের জন্য অত্যন্ত দুর্লভ সংগ্রহযোগ্য প্যাক।'
    ],
    funnyTrivia: '১৯৩৯ সালের অগাস্টে মার্কিন প্রেসিডেন্ট রুজভেল্টকে চিঠি লেখার ঐতিহাসিক মুহূর্তে আইনস্টাইন ও পদার্থবিজ্ঞানী লিও জিলার্ডের আলোচনার টেবিলে রাখা ছিল বেঙ্গল থেকে আনীত বিশেষ মনন কিউরড তামাকের বিড়ি।',
    secretIngredient: '১৯৩৯ সালের ঐতিহাসিক ফর্মুলা: কুষ্টিয়ার পদ্মা চরের রোদে শুকানো তামাক, ওক কাঠের পিপায় ফারমেন্টেশন ও রাজকীয় তেন্দুপাতা।',
    rollMasterStory: 'মনন আর্কাইভ কিউরেটর ড. রশীদ: "আইনস্টাইনের এই ঐতিহাসিক স্মৃতিচিহ্ন প্রমাণ করে মনন বিড়ি শুধু ধোঁয়া নয়, বিশ্ব সভ্যতার চিন্তাশীল মুহূর্তের এক নীরব সাক্ষী।"',
    smokeProfile: {
      sweetness: 58,
      smokeDensity: 86,
      aroma: 99,
      kick: 78,
    },
    badge: 'আইনস্টাইন ঐতিহাসিক সংস্করণ',
    isPopular: true,
    stockStatus: 'সীমিত প্রিমিয়াম ব্যাচ'
  }
];

export const INITIAL_VOUCHERS: LuckyVoucher[] = [
  {
    id: 'v-monon20',
    code: 'MONON20',
    title: 'মনন ২০% রয়্যাল ভাউচার',
    discountAmount: 25000,
    description: 'সর্বনিম্ন ৫০ হাজার টাকার অর্ডারে সর্বোচ্চ ৳২৫,০০০ পর্যন্ত ছাড়',
    expiry: 'আজ মধ্যরাত পর্যন্ত বৈধ',
    type: 'discount',
  },
  {
    id: 'v-freeship',
    code: 'FREESHIP',
    title: 'ফ্রি আর্মার্ড রয়্যাল ডেলিভারি',
    discountAmount: 15000,
    description: 'ভিআইপি এক্সপ্রেস ও বিমান ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (মূল্য ৳১৫,০০০)',
    expiry: '৩ দিন বাকি',
    type: 'free_shipping',
  },
  {
    id: 'v-einstein',
    code: 'EINSTEIN1939',
    title: 'আইনস্টাইন ১ লাখ টাকা মেগা ছাড়',
    discountAmount: 100000,
    description: 'আইনস্টাইন ১৯৩৯ হিস্টোরিক এডিশনে সংগ্রাহকদের জন্য বিশেষ ১ লাখ টাকা ক্যাশ ডিসকাউন্ট',
    expiry: 'সীমিত স্টক থাকা পর্যন্ত',
    type: 'discount',
  },
  {
    id: 'v-goldpack',
    code: 'GOLDBONUS',
    title: '১ বক্স মেঘের গর্জ্জন রাজকীয় উপহার!',
    discountAmount: 150000,
    description: '২ বক্স মনন ক্রাফট অর্ডারে ১টি সম্পূর্ণ বক্স বিনামূল্যে উপহার!',
    expiry: 'লাকি স্পিন সুপার উইন',
    type: 'free_pack',
  },
];

export const BRAND_VIDEOS: BrandVideo[] = [
  {
    id: 'vid-einstein',
    title: '১৯৩৯ সালে আলবার্ট আইনস্টাইন ও মনন বিড়ির ঐতিহাসিক গোপন তথ্যচিত্র',
    duration: '০৫:১৮ মিনিট',
    thumbnail: einsteinHistoryImg,
    tag: 'ঐতিহাসিক আর্কাইভ',
    description: 'লং আইল্যান্ডের কটেজে পদার্থবিজ্ঞানী লিও জিলার্ড ও আলবার্ট আইনস্টাইনের ঐতিহাসিক বৈঠকের বিরল দৃশ্য ও কুষ্টিয়ার মনন বিড়ির স্মোকিং প্রামাণ্যচিত্র।',
    views: '২৪২,৮০০ ভিউ',
    date: 'ঐতিহাসিক রিলিজ',
    speaker: 'আন্তর্জাতিক ইতিহাস গবেষক ড. কবীর'
  },
  {
    id: 'vid-1',
    title: 'মনন কারিগরদের নিখুঁত রোলিং শিল্প ও মান নিয়ন্ত্রণ',
    duration: '০৩:৪৫ মিনিট',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    tag: 'কারিগর তথ্যচিত্র',
    description: 'কুষ্টিয়ার গড়াই নদীর তীরে মনন বিড়ির কারখানায় অভিজ্ঞ ওস্তাদদের নিখুঁত তেন্দুপাতা বাছাই, কাটিং এবং নিখুঁত ওজনে তামাক রোল করার বিরল ভিডিও দৃশ্য।',
    views: '১২৮,৪৫০ ভিউ',
    date: '১৫ দিন আগে',
    speaker: 'মাস্টার কারিগর আব্দুল জব্বার'
  },
  {
    id: 'vid-2',
    title: 'নতুন আধুনিক ‘মনন গোল্ড ফিল্টার’ ও ‘আইস ক্রাশ’ উন্মোচন',
    duration: '০২:১২ মিনিট',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    tag: 'আধুনিক সংস্করণ',
    description: 'ঐতিহ্যবাহী বিড়ির পাশাপাশি আধুনিক অর্গানিক বায়ো-ফিল্টার ও মেন্থল ক্রাশ ক্যাপসুল সম্বলিত মনন বিড়ির নতুন যুগের আত্মপ্রকাশ।',
    views: '৯৪,২০০ ভিউ',
    date: '১ মাস আগে',
    speaker: 'প্রোডাক্ট রিসার্চ হেড'
  },
  {
    id: 'vid-3',
    title: 'গড়াই অববাহিকায় উৎকৃষ্ট তামাক কিউরিং ও পাতা সংরক্ষণ পদ্ধতি',
    duration: '০৪:২০ মিনিট',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    tag: 'উৎপাদন পর্যায়',
    description: 'রোদে শুকানো, কাঠের আগুনের তাপ ও প্রাকৃতিক ভেষজ নির্যাস প্রয়োগের মাধ্যমে তামাকের প্রাকৃতিক সুবাস ও খাঁটি গন্ধ ধরে রাখার বিজ্ঞান।',
    views: '৭৬,৮০০ ভিউ',
    date: '২ মাস আগে',
    speaker: 'প্রধান কোয়ালিটি স্পেশালিস্ট'
  },
  {
    id: 'vid-4',
    title: 'ভোক্তাদের বাস্তব অভিজ্ঞতা: ঐতিহ্য থেকে আধুনিকতার মেলবন্ধন',
    duration: '০৩:১০ মিনিট',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    tag: 'গ্রাহক রিভিউ',
    description: 'পুরোনো আমলের বিড়ির দীর্ঘস্থায়ী টান থেকে শুরু করে আধুনিক গোল্ড ফিল্টারের স্মুথ স্বাদ নিয়ে তরুণ ও প্রবীণ গ্রাহকদের অভিব্যক্তি।',
    views: '১১২,০০০ ভিউ',
    date: '৩ মাস আগে',
    speaker: 'গ্রাহক মতামত সেল'
  }
];

export const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-einstein-1',
    bidiId: 'einstein-1939-reserve',
    bidiName: 'আইনস্টাইন ১৯৩৯ হিস্টোরিক রিজার্ভ',
    userName: 'অধ্যাপক ড. আসিফ রহমান',
    userRole: 'ইতিহাস ও পদার্থবিজ্ঞান সংগ্রাহক',
    location: 'ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস',
    rating: 5,
    date: 'আজ সকালে',
    comment: 'আইনস্টাইনের ১৯৩৯ সালের ছবির ইতিহাসটা পড়ে আমি অবাক হয়েছিলাম! কৌতুহলবশত অ্যান্টিক টিন সংস্করণটি অর্ডার করি। কুষ্টিয়ার ওক-কিউরড তামাকের যে সুবাস এবং মসৃণ ড্র, সত্যিই যেন ১৯৩০ দশকের ধ্রুপদী ভাবগাম্ভীর্য ফিরিয়ে আনে। তাত্ত্বিক লেখালেখির সময় এর এক শলাকা ক্লান্তি এক নিমেষে উধাও করে দেয়। সংগ্রাহকদের জন্য মাস্টারপিস!',
    funnyEffectWitnessed: 'এই বিড়ি টানলে মাথায় জটিল সমীকরণও সহজ মনে হতে শুরু করে!',
    helpfulCount: 142,
    avatarSeed: 'EinsteinFan',
    verifiedPurchase: true
  },
  {
    id: 'rev-1',
    bidiId: 'monon-gold-filter',
    bidiName: 'মনন প্রিমিয়াম গোল্ড ফিল্টার',
    userName: 'তাহমিদ চৌধুরী',
    userRole: 'সিনিয়র আর্কিটেক্ট ও কাস্টমার',
    location: 'গুলশান, ঢাকা',
    rating: 5,
    date: 'গতকাল',
    comment: 'আমি সচরাচর দামি সিগারেট খেতাম। কিন্তু মনন গোল্ড ফিল্টারের দারাজ স্টাইল প্যাকেজিং ও স্মুথ টান দেখে অর্ডার করি। সত্যি বলতে এটি কোনো আন্তর্জাতিক লাক্সারি ব্র্যান্ডের চেয়ে কম নয়! ফিল্টারের কারণে গলায় বিন্দু পরিমাণ রুক্ষতা নেই, আবার তামাকের খাঁটি সুবাস অক্ষুণ্ণ। অসাধারণ ক্রাফটম্যানশিপ!',
    funnyEffectWitnessed: 'অফিসের সহকর্মীদের সবাই এখন আমার টেবিল থেকে এই বিড়ি চেয়ে নেয়!',
    helpfulCount: 68,
    avatarSeed: 'Tahmid',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    bidiId: 'monon-ice-crush',
    bidiName: 'মনন আইস ক্রাশ মিন্ট',
    userName: 'রিফাত মোস্তফা',
    userRole: 'মার্কেটিং এক্সিকিউটিভ',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    date: '৩ দিন আগে',
    comment: 'বিড়ির ফিল্টারে ক্রাশ বল টেকনোলজি আগে কখনও দেখিনি। ক্লিক করলেই মুহূর্তে ঠাণ্ডা বরফের সতেজ অনুভূতি ছড়িয়ে পড়ে। গরমের দিনে আড্ডায় এক শলাকা টানলে শরীর-মন এক নিমিষে ফ্রেশ হয়ে যায়!',
    funnyEffectWitnessed: 'ঠাণ্ডা মেন্থলের পর গরম চায়ের চুমুক দিলে অন্য লেভেলের তৃপ্তি পাওয়া যায়।',
    helpfulCount: 52,
    avatarSeed: 'Rifat',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    bidiId: 'megher-gorjon',
    bidiName: 'মেঘের গর্জ্জন স্পেশাল',
    userName: 'আরিফুল ইসলাম',
    userRole: 'বর্ষাপ্রেমী ও নিয়মিত ভোক্তা',
    location: 'কুষ্টিয়া সদর',
    rating: 5,
    date: '৫ দিন আগে',
    comment: 'মেঘের গর্জ্জনের সেই খাঁটি আমসত্ত্বের হালকা মিষ্টি সুবাস ও খাঁটি তেন্দুপাতার দীর্ঘ টান অন্য কোথাও মিলবে না। বৃষ্টির দিনে বারান্দায় বসে চা আর এই বিড়ির এক শলাকা— দিনের শ্রেষ্ঠ আনন্দ।',
    funnyEffectWitnessed: 'ধোঁয়া ছাড়ার সাথে সাথে ঘরের পরিবেশ সুন্দর মিষ্টি সুবাসে ভরে যায়।',
    helpfulCount: 42,
    avatarSeed: 'Arif',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    bidiId: 'darshonik-adda',
    bidiName: 'দার্শনিক আড্ডা স্পেশাল',
    userName: 'তানভীর আহমেদ',
    userRole: 'বিশ্ববিদ্যালয় গবেষক',
    location: 'টিএসসি, ঢাকা',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    comment: 'দার্শনিক আড্ডার রোস্টেড এলাচ ও কড়া তামাকের ব্লেন্ড বুদ্ধিবৃত্তিক আড্ডার জন্য সত্যিই সেরা। ধোঁয়া ঘন, ড্র পারফেক্ট এবং দীর্ঘস্থায়ী প্রজ্জ্বলন। বন্ধুদের সাথে সন্ধ্যা কাটানোর চমৎকার মাধ্যম।',
    funnyEffectWitnessed: 'এই বিড়ি টানার সময় চায়ের টঙে ঘন্টার পর ঘন্টা আলোচনা চলে যায় টেরই পাই না।',
    helpfulCount: 38,
    avatarSeed: 'Tanvir',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    bidiId: 'monon-platinum-masters',
    bidiName: 'মনন প্লাটিনাম মাস্টার্স',
    userName: 'কবির হোসেন চৌধুরী',
    userRole: 'শিল্পপতি ও সংগ্রাহক',
    location: 'ধানমণ্ডি, ঢাকা',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment: 'প্লাটিনাম সংস্করণের ভেলভেট বক্স ও কাশ্মীরি জাফরানের ফিনিশিং অতুলনীয়। ঐতিহ্য ও আভিজাত্যের এমন সম্মেলন বাংলাদেশে বিরল। মেহমানদের আপ্যায়নে এটি দিলে সবাই মুগ্ধ হয়ে যায়।',
    funnyEffectWitnessed: 'এর রাজকীয় সুবাস আশপাশের সবাইকেই মোহিত করে রাখে।',
    helpfulCount: 56,
    avatarSeed: 'Kabir',
    verifiedPurchase: true
  }
];

export const DELIVERY_INSTRUCTION_PRESETS = [
  '১. একান্ত নিরিবিলি স্থানে হস্তান্তর: বাড়ির ছাদ, ব্যক্তিগত ড্রয়িংরুম বা পছন্দের নিরিবিলি স্থানে সন্তর্পণে ডেলিভারি সম্পন্ন করতে হবে।',
  '২. রয়্যাল ভিন্টেজ গিফট মোড়ক: পার্সেলটি দুর্লভ ঐতিহ্যবাহী বইয়ের মলাট বা রাজকীয় গিফট বক্সে প্রিমিয়াম সিল করে পাঠাতে হবে।',
  '৩. শতভাগ ব্যক্তিগত গোপনীয়তা: পরিবার কিংবা বাইরের কারো দৃষ্টি আকর্ষণ না করে পূর্ণ পেশাদারিত্ব ও গোপনীয়তা বজায় রাখতে হবে।',
  '৪. গোপনীয় পার্সেল লেবেল: পার্সেলের ওপরে বাণিজ্যিক নাম পরিহার করে ‘অতি গোপনীয় ও জরুরি রাজকীয় নথিপত্র’ লেবেল দিতে হবে।',
  '৫. নির্ধারিত স্থানে সাক্ষাৎ: সরাসরি ভবনের মূল ফটকে না এসে নিকটস্থ সুবিধাজনক ক্যাফে বা মোড়ে এসে ফোনে যোগাযোগ করতে হবে।',
  '৬. সাইলেন্ট মেসেজ নোটিফিকেশন: ডেলিভারিম্যান যেন হর্ন বা ডোরবেল না বাজিয়ে সন্তর্পণে এসএমএস বা কল করে অবহিত করেন।'
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'super-urgent-2hr',
    name: 'তড়িৎ রয়্যাল হেলিকপ্টার/জেট এক্সপ্রেস ডেলিভারি (২ ঘণ্টার ভেতর)',
    subtitle: 'জরুরি রাজকীয় তৃষ্ণা মেটাতে ডেডিকেটেড স্পেশাল রাইডার',
    estimatedTime: '২ ঘণ্টার ভেতর',
    price: 15000,
    iconName: 'Zap',
    humorousNote: 'অর্ডার কনফার্মেশনের মাত্র ২ ঘণ্টার মধ্যেই সর্বোচ্চ নিরাপত্তায় আপনার নির্ধারিত স্থানে পৌঁছে যাবে।'
  },
  {
    id: 'express-city',
    name: 'এক্সপ্রেস প্রিমিয়াম আর্মার্ড ডেলিভারি (১২ - ২৪ ঘণ্টা)',
    subtitle: 'নিজস্ব দায়িত্বশীল রয়্যাল রাইডারের মাধ্যমে দ্রুত ডেলিভারি',
    estimatedTime: '১২ - ২৪ ঘণ্টা',
    price: 5000,
    iconName: 'Zap',
    humorousNote: 'অর্ডার কনফার্মেশনের পর দ্রুততম সময়ে আপনার ঠিকানায় সরাসরি রাজকীয় বক্সে পৌঁছে যাবে।'
  },
  {
    id: 'standard-2days',
    name: 'স্ট্যান্ডার্ড সিকিউরড ভিন্টেজ কুরিয়ার (২ দিনের ভেতর)',
    subtitle: 'Steadfast / Pathao অনুমোদিত পার্টনার কুরিয়ার',
    estimatedTime: '২ দিনের ভেতর',
    price: 2500,
    iconName: 'Truck',
    humorousNote: 'সারাদেশের ৬৪ জেলায় সিলড ওয়াটারপ্রুফ বক্সে অক্ষত অবস্থায় ২ দিনের ভেতর সরবরাহ।'
  },
  {
    id: 'vip-urgent',
    name: 'ভিআইপি এয়ার ড্রপ এক্সপ্রেস (৬ - ৮ ঘণ্টা)',
    subtitle: 'অগ্রাধিকারভিত্তিতে স্পেশাল এক্সপ্রেস কুরিয়ার সার্ভিস',
    estimatedTime: '৬ - ৮ ঘণ্টা',
    price: 8000,
    iconName: 'ShieldCheck',
    humorousNote: 'জরুরি রাজকীয় আয়োজন বা উপহারের জন্য বিশেষ অগ্রাধিকার প্যাকেজিং ও দ্রুততম ট্রান্সপোর্ট।'
  },
  {
    id: 'free-wholesale',
    name: 'রাজকীয় মাহাল ও মেগা বাল্ক পরিবহন (ফ্রি ডেলিভারি / ৩ - ৪ দিন)',
    subtitle: '৫০ বক্স বা তদূর্ধ্ব অর্ডারে পরিবহন সম্পূর্ণ ফ্রি',
    estimatedTime: '৩ - ৪ দিন',
    price: 0,
    iconName: 'CheckCircle',
    humorousNote: 'ভিআইপি ডিলার ও পাইকারি ক্রেতাদের জন্য কারখানা থেকে সরাসরি নিখরচায় পরিবহন।'
  }
];

export const BANGLADESH_DISTRICTS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  'কুষ্টিয়া', 'বগুড়া', 'কুমিল্লা', 'নোয়াখালী', 'যশোর', 'পাবনা', 'দিনাজপুর', 'ফরিদপুর'
];
