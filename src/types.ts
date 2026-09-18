export interface SmokeProfile {
  sweetness: number; // 1-100
  smokeDensity: number; // 1-100
  aroma: number; // 1-100
  kick: number; // 1-100
}

export type BidiCategory = 'modern_filter' | 'classic_tendu' | 'signature_blend' | 'spicy_bold' | 'royal_edition' | 'historic_archive';

export interface BidiProduct {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  flavor: string;
  category: BidiCategory;
  categoryLabel: string;
  categoryIcon: string;
  isModern: boolean; // whether it's modern filter edition or classic artisanal
  filterType: string; // e.g., "অর্গানিক বায়ো-ফিল্টার", "চারকোল ফিল্টার", "ঐতিহ্যবাহী নিখাদ টেন্ডুপাতা", "আইস ক্যাপসুল ফিল্টার"
  price: number;
  originalPrice?: number;
  soldCount?: string;
  discountPercentage?: number;
  packSize: string; // e.g. "২০ শলাকার রিজিড বক্স"
  rating: number;
  reviewCount: number;
  strength: 1 | 2 | 3 | 4 | 5; // 1 to 5 scale
  images: string[];
  imageCaptions: string[];
  effects: string[]; // তামাকের বৈশিষ্ট্য ও অনুভব
  funnyTrivia: string; // ঐতিহ্যের তথ্য ও উৎপাদন বিশেষত্ব
  secretIngredient: string; // বিশেষ পাতা ও কিউরিং ব্লেন্ড
  rollMasterStory: string; // মাস্টার রোলারের মন্তব্য
  smokeProfile: SmokeProfile;
  badge?: string;
  isPopular?: boolean;
  stockStatus: 'ইন-স্টক (তাজা পাতা)' | 'সীমিত প্রিমিয়াম ব্যাচ' | 'চলতি কারখানায় প্রস্তুত';
}

export interface LuckyVoucher {
  id: string;
  code: string;
  title: string;
  discountAmount: number; // Taka or 0 for free item
  description: string;
  expiry: string;
  type: 'discount' | 'free_shipping' | 'free_pack';
}

export interface UserReview {
  id: string;
  bidiId: string;
  bidiName: string;
  userName: string;
  userRole: string; // e.g., "চা-বাগান বিশেষজ্ঞ", "নিয়মিত আড্ডাবাজ", "স্বাদ সংগ্রাহক"
  location: string;
  rating: number;
  date: string;
  comment: string;
  funnyEffectWitnessed: string; // বিশেষ স্বাদের অনুভূতি
  helpfulCount: number;
  avatarSeed: string;
  verifiedPurchase?: boolean;
}

export interface CartItem {
  product: BidiProduct;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  subtitle: string;
  estimatedTime: string;
  price: number;
  iconName: string;
  humorousNote: string;
}

export type PaymentGatewayType = 'bkash' | 'nagad' | 'rocket' | 'cod' | 'corporate_credit';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  district: string;
  fullAddress: string;
  specialInstructions: string;
  items: CartItem[];
  subtotal: number;
  deliveryOption: DeliveryOption;
  totalAmount: number;
  paymentMethod: PaymentGatewayType;
  transactionId?: string;
  orderTime: string;
  estimatedArrival: string;
  status: 'অর্ডার গৃহীত হয়েছে' | 'মান নিয়ন্ত্রণ ও প্যাকেজিং' | 'কুরিয়ারে হস্তান্তর' | 'ডেলিভারিতে বের হয়েছে' | 'সফল ডেলিভারি';
}

export interface BrandVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  tag: string;
  description: string;
  views: string;
  date: string;
  speaker: string;
}

export interface DealershipInquiry {
  businessName: string;
  ownerName: string;
  district: string;
  phone: string;
  currentShopType: string;
  estimatedMonthlyCartons: number;
  notes: string;
}
