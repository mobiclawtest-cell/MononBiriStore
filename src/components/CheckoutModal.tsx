import React, { useState } from 'react';
import { CartItem, DeliveryOption, OrderDetails, PaymentGatewayType } from '../types';
import { DELIVERY_OPTIONS, BANGLADESH_DISTRICTS, DELIVERY_INSTRUCTION_PRESETS } from '../data/bidiData';
import {
  X,
  Truck,
  CreditCard,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  FileText,
  AlertCircle,
  Zap,
  Printer,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
  onOpenTrackerForOrder?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  onOpenTrackerForOrder,
}) => {
  // Form States
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [thana, setThana] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentGatewayType>('cash_on_delivery');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Status states
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Promo Code / Voucher State
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const deliveryCost = selectedDelivery.price;
  const grandTotal = Math.max(0, subtotal + deliveryCost - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'WIN20TAKA' || code === 'MONON20') {
      setAppliedDiscount(20);
      setPromoMessage({ text: '৳২০ ছাড় ভাউচার সফলভাবে প্রযোজ্য হয়েছে!' });
    } else if (code === 'FREESHIPWIN' || code === 'FREESHIP') {
      setAppliedDiscount(deliveryCost);
      setPromoMessage({ text: 'ফ্রি ডেলিভারি ভাউচার সফলভাবে প্রযোজ্য হয়েছে!' });
    } else if (code === 'EINSTEIN1939') {
      setAppliedDiscount(25);
      setPromoMessage({ text: 'আইনস্টাইন ১৯৩৯ বিশেষ সংগ্রাহক ছাড় প্রযোজ্য হয়েছে!' });
    } else if (code === 'BONUSPACK' || code === 'GOLDBONUS') {
      setAppliedDiscount(45);
      setPromoMessage({ text: '১ প্যাকেট তেন্দুপাতা ফ্রি উপহার কোড প্রযোজ্য!' });
    } else {
      setPromoMessage({ text: 'ভাউচার কোডটি সঠিক নয়। লাকি স্পিন থেকে কোড সংগ্রহ করুন।', isError: true });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) errors.name = 'দয়া করে আপনার নাম লিখুন';
    if (!phone.trim() || phone.trim().length < 11) {
      errors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)';
    }
    if (!fullAddress.trim()) errors.address = 'ডেলিভারির পূর্ণাঙ্গ ঠিকানা লিখুন (বাসা/রোড/এলাকা)';
    
    if (paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') {
      if (!paymentNumber.trim() || paymentNumber.trim().length < 11) {
        errors.paymentNumber = `${paymentMethod.toUpperCase()} অ্যাকাউন্ট নম্বর প্রদান করুন`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate verified order placement
    setTimeout(() => {
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: OrderDetails = {
        orderId: `MN-ORD-${randomOrderNum}`,
        customerName: customerName.trim(),
        phone: phone.trim(),
        district,
        fullAddress: thana ? `${thana}, ${fullAddress.trim()}` : fullAddress.trim(),
        specialInstructions: specialInstructions.trim() || 'জরুরি হ্যান্ডওভার',
        items: [...cartItems],
        subtotal,
        deliveryOption: selectedDelivery,
        totalAmount: grandTotal,
        paymentMethod,
        transactionId: transactionId || `TXN${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        orderTime: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        estimatedArrival: selectedDelivery.estimatedTime,
        status: 'অর্ডার গৃহীত হয়েছে',
      };

      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        id="modal-backdrop" 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container (Optimized for Desktop 2-column) */}
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-5xl bg-stone-900 border border-amber-600/50 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 my-auto text-stone-100 max-h-[92vh] flex flex-col font-sans"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-bn text-xl font-bold text-amber-200">
                নিরাপদ চেকআউট ও হোম ডেলিভারি
              </h2>
              <p className="text-[11px] text-stone-400">
                মনন বিড়ি কুষ্টিয়া সেন্ট্রাল ফ্যাক্টরি সরাসরি সরবরাহ
              </p>
            </div>
          </div>

          <button
            id="checkout-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 md:p-8">
          {completedOrder ? (
            /* Order Success Invoice Screen */
            <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
              <div className="text-center space-y-3 bg-stone-950 border border-emerald-600/40 p-6 rounded-3xl">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif-bn text-2xl font-bold text-amber-200">
                  অর্ডার সফলভাবে নিবন্ধিত হয়েছে!
                </h3>
                <p className="text-xs text-stone-300">
                  ধন্যবাদ <strong>{completedOrder.customerName}</strong>! আপনার অর্ডার কনফার্মেশন কোড:
                </p>
                <div className="inline-block bg-amber-950/80 border border-amber-500/50 px-5 py-2 rounded-2xl">
                  <span className="font-mono text-xl font-bold text-amber-300 tracking-wider">
                    {completedOrder.orderId}
                  </span>
                </div>
              </div>

              {/* Order Invoice Summary */}
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-4 text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-3">
                  <span className="text-stone-400">ডেলিভারি ঠিকানা:</span>
                  <span className="text-right text-stone-200 font-medium">
                    {completedOrder.fullAddress}, {completedOrder.district}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-3">
                  <span className="text-stone-400">পেমেন্ট মেথড:</span>
                  <span className="font-semibold text-amber-300 uppercase">
                    {completedOrder.paymentMethod === 'cash_on_delivery'
                      ? 'ক্যাশ অন ডেলিভারি'
                      : completedOrder.paymentMethod.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-3">
                  <span className="text-stone-400">আনুমানিক ডেলিভারি সময়:</span>
                  <span className="text-emerald-400 font-semibold">
                    {completedOrder.estimatedArrival} ({completedOrder.deliveryOption.name})
                  </span>
                </div>

                {completedOrder.specialInstructions && (
                  <div className="border-b border-stone-800 pb-3 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                    <span className="text-amber-400 block font-semibold mb-1">ডেলিভারি বিশেষ নির্দেশনা (নির্দেশনা):</span>
                    <span className="text-stone-200 block text-[11px] leading-relaxed">
                      {completedOrder.specialInstructions}
                    </span>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <span className="text-stone-400 block font-medium">অর্ডারকৃত আইটেম:</span>
                  {completedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-stone-300">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span className="font-mono">৳{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-800 flex justify-between font-bold text-sm">
                  <span className="text-amber-200">সর্বমোট প্রদেয় বিল:</span>
                  <span className="text-amber-400 font-mono text-base">৳{completedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {onOpenTrackerForOrder && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTrackerForOrder(completedOrder.orderId);
                    }}
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950 transition-all active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span>লাইভ পার্সেল ট্র্যাক করুন</span>
                  </button>
                )}

                <button
                  onClick={handlePrintSlip}
                  className="py-3.5 px-5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>রশিদ প্রিন্ট</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3.5 px-5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded-xl text-xs transition-colors"
                >
                  সমাপ্ত
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form (Desktop 2-column layout: Form Left 7 cols, Cart Summary Right 5 cols) */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Left Side (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Customer Information */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
                    <User className="w-4 h-4 text-amber-400" />
                    ১. গ্রাহকের নাম ও ঠিকানা
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-300 mb-1">পূর্ণ নাম *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                      {formErrors.name && <p className="text-red-400 text-[11px] mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-1">মোবাইল নম্বর *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="০১৭১১-XXXXXX"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                      {formErrors.phone && <p className="text-red-400 text-[11px] mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-300 mb-1">জেলা *</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      >
                        {BANGLADESH_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d} জেলা
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-1">থানা / উপজেলা</label>
                      <input
                        type="text"
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                        placeholder="থানার নাম লিখুন"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-stone-300 mb-1">পূর্ণাঙ্গ ঠিকানা (বাসা/রোড/এলাকা) *</label>
                    <textarea
                      rows={2}
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="বাড়ি নং, রোড নং, এলাকা বা ল্যান্ডমার্ক..."
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    {formErrors.address && <p className="text-red-400 text-[11px] mt-1">{formErrors.address}</p>}
                  </div>
                </div>

                {/* 2. Delivery Method */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
                    <Truck className="w-4 h-4 text-amber-400" />
                    ২. ডেলিভারি অপশন নির্বাচন (ডেলিভারি লেভেল)
                  </h3>

                  <div className="space-y-2.5">
                    {DELIVERY_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedDelivery.id === opt.id
                            ? 'bg-amber-950/40 border-amber-500'
                            : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="delivery-option"
                            checked={selectedDelivery.id === opt.id}
                            onChange={() => setSelectedDelivery(opt)}
                            className="mt-1 accent-amber-500"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-stone-200 block">{opt.name}</span>
                              {opt.id === 'super-urgent-2hr' && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold">
                                  সুপার ফাস্ট
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-400 block">{opt.subtitle}</span>
                            <span className="text-[10px] text-amber-400/90 font-mono mt-0.5 block">
                              আনুমানিক সময়: {opt.estimatedTime}
                            </span>
                          </div>
                        </div>

                        <span className="font-mono font-bold text-xs text-amber-300">
                          {opt.price === 0 ? 'ফ্রি' : `৳${opt.price}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2.5 Delivery Instructions (নির্দেশনা) */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
                  <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      ডেলিভারি বিশেষ নির্দেশনা (নির্দেশনা)
                    </h3>
                    <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
                      গোপনীয়তা ও সুরক্ষা
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    ডেলিভারি সংক্রান্ত যেকোনো জরুরি গোপনীয়তা বা বিশেষ নির্দেশনা নির্বাচন করুন বা নিজের ভাষায় লিখে দিন:
                  </p>

                  {/* Preset Suggestions */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-amber-400/90 font-semibold block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      জনপ্রিয় বিশেষ নির্দেশনাসমূহ (ক্লিক করে নির্বাচন করুন):
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {DELIVERY_INSTRUCTION_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (specialInstructions.includes(preset)) {
                              setSpecialInstructions(prev => prev.replace(preset, '').trim());
                            } else {
                              setSpecialInstructions(prev => prev ? `${prev} | ${preset}` : preset);
                            }
                          }}
                          className={`text-left p-2 rounded-xl text-xs border transition-all flex items-start gap-2 ${
                            specialInstructions.includes(preset)
                              ? 'bg-amber-950/60 border-amber-500 text-amber-200 font-medium'
                              : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                          }`}
                        >
                          <span className="text-amber-400 shrink-0 mt-0.5 text-[11px]">
                            {specialInstructions.includes(preset) ? '✓' : '•'}
                          </span>
                          <span className="leading-snug">{preset}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Textarea */}
                  <div className="pt-2">
                    <label className="block text-[11px] text-stone-400 mb-1">
                      আপনার নির্বাচিত / নিজস্ব নির্দেশনা:
                    </label>
                    <textarea
                      rows={2}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="যেমন: বাড়িতে বাড়ির ছাদে বিড়ি আর সেরে মারতে হবে, বিড়িকে বইয়ের মলাট দিয়ে মুড়িয়ে নিতে হবে..."
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-bangla"
                    />
                  </div>
                </div>

                {/* 3. Payment Gateway */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    ৩. পেমেন্ট পদ্ধতি
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'cash_on_delivery', label: 'ক্যাশ অন ডেলিভারি', badge: 'হাতে পেয়ে' },
                      { id: 'bkash', label: 'বিকাশ', badge: 'ইনস্ট্যান্ট' },
                      { id: 'nagad', label: 'নগদ', badge: 'ইনস্ট্যান্ট' },
                      { id: 'rocket', label: 'রকেট', badge: 'মোবাইল' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentGatewayType)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === m.id
                            ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-md'
                            : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <span className="text-xs block">{m.label}</span>
                        <span className="text-[10px] opacity-80 block">{m.badge}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod !== 'cash_on_delivery' && (
                    <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 space-y-3 text-xs">
                      <div className="flex justify-between items-center text-amber-400">
                        <span>মনন মার্চেন্ট নম্বর:</span>
                        <span className="font-mono font-bold text-sm bg-stone-950 px-2 py-1 rounded">
                          ০১৭০০-মননবিড়ি (01700-666664)
                        </span>
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-1">আপনার প্রেরক মোবাইল নম্বর *</label>
                        <input
                          type="tel"
                          value={paymentNumber}
                          onChange={(e) => setPaymentNumber(e.target.value)}
                          placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                        />
                        {formErrors.paymentNumber && (
                          <p className="text-red-400 text-[11px] mt-1">{formErrors.paymentNumber}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Order Summary Right Side (5 cols) */}
              <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-5 sticky top-24">
                <h3 className="font-serif-bn text-xl font-bold text-amber-200 border-b border-stone-800 pb-3">
                  অর্ডার সারসংক্ষেপ
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-800 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-stone-200 block truncate">{item.product.name}</span>
                        <span className="text-stone-400 text-[11px]">
                          ৳{item.product.price} × {item.quantity} প্যাকেট
                        </span>
                      </div>
                      <span className="font-mono font-bold text-amber-300">
                        ৳{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="ভাউচার কোড লিখুন (যেমন: WIN20TAKA)"
                      className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs font-mono uppercase text-amber-300 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold px-3 py-2 rounded-xl text-xs border border-stone-700 transition-colors"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>পণ্যমূল্য সাবটোটাল:</span>
                    <span className="font-mono text-stone-200">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>ডেলিভারি ফি ({selectedDelivery.name.slice(0, 16)}...):</span>
                    <span className="font-mono text-stone-200">৳{deliveryCost}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>ভাউচার ডিসকাউন্ট:</span>
                      <span className="font-mono">-৳{appliedDiscount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-base text-amber-300">
                    <span>সর্বমোট পরিশোধযোগ্য:</span>
                    <span className="font-mono text-xl text-amber-400">৳{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  id="confirm-place-order-btn"
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-950 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>অর্ডার কনফার্ম হচ্ছে...</span>
                  ) : (
                    <>
                      <span>অর্ডার চূড়ান্ত করুন (৳{grandTotal})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="space-y-1.5 text-[11px] text-stone-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>১০০% নিরাপদ ডেলিভারি প্রতিশ্রুতি:</span>
                  </div>
                  <p>
                    সিলড ওয়াটারপ্রুফ প্যাকেজিংয়ে কুরিয়ার পার্টনারের মাধ্যমে সরাসরি ডেলিভারি নিশ্চিত করা হয়।
                  </p>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
