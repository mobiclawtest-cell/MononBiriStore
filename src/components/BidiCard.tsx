import React, { useState } from 'react';
import { BidiProduct } from '../types';
import { Star, ShoppingBag, Check, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Flame, Eye } from 'lucide-react';

interface BidiCardProps {
  product: BidiProduct;
  onOpenDetails: (product: BidiProduct, initialTab?: 'details' | 'reviews' | 'win_spin' | 'qa') => void;
  onAddToCart: (product: BidiProduct) => void;
}

export const BidiCard: React.FC<BidiCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleReviewsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenDetails(product, 'reviews');
  };

  return (
    <div 
      id={`bidi-card-${product.id}`}
      className="group bg-stone-900 border border-stone-800 hover:border-amber-600/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-950/40 transition-all flex flex-col justify-between cursor-pointer"
      onClick={() => onOpenDetails(product, 'details')}
    >
      {/* Top: Daraz/Amazon Style Square Cropped Image Section */}
      <div className="relative aspect-square bg-stone-950 overflow-hidden select-none">
        <img
          src={product.images[currentImageIndex]}
          alt={`${product.name} - ${product.imageCaptions[currentImageIndex] || ''}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

        {/* Top Badges - Daraz Mall / Discount */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <div className="flex items-center gap-1">
            <span className="bg-amber-500 text-stone-950 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
              মনন মল
            </span>
            {product.discountPercentage && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {product.isModern ? (
            <span className="bg-stone-900/90 backdrop-blur-md text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded border border-amber-600/40 w-fit">
              আধুনিক ফিল্টার
            </span>
          ) : (
            <span className="bg-stone-900/90 backdrop-blur-md text-stone-300 text-[10px] font-medium px-2 py-0.5 rounded border border-stone-700 w-fit">
              ঐতিহ্যবাহী তেন্দু
            </span>
          )}
        </div>

        {/* Image index badge */}
        <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-stone-300 text-[10px] font-mono px-2 py-0.5 rounded border border-stone-800 z-10">
          {currentImageIndex + 1}/{product.images.length}
        </div>

        {/* Quick image arrows for desktop */}
        {product.images.length > 1 && (
          <>
            <button
              id={`prev-img-${product.id}`}
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              id={`next-img-${product.id}`}
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Image thumbnail indicators on image bottom */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(idx);
              }}
              aria-label={`View photo ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${
                currentImageIndex === idx ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section - Amazon/Daraz style details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          
          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <button
              type="button"
              onClick={handleReviewsClick}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline cursor-pointer group/star"
              title="ক্লিক করে বিশেষ রেটিং ও সকল রিভিউ দেখুন"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 group-hover/star:scale-110 transition-transform" />
              <span className="font-bold text-stone-200">{product.rating}</span>
              <span className="text-stone-400 group-hover/star:text-amber-300">({product.reviewCount} রিভিউ)</span>
            </button>
            {product.soldCount && (
              <span className="text-stone-400 font-mono text-[10px]">
                {product.soldCount}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Flavor / Subtitle note */}
          <p className="text-[11px] text-stone-400 line-clamp-1">
            {product.flavor}
          </p>

          {/* Free delivery badge */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded font-medium">
              ফ্রি ডেলিভারি ভাউচার
            </span>
            <span className="text-[10px] text-stone-400">
              {product.packSize}
            </span>
          </div>

        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2 border-t border-stone-800/70 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-amber-400 font-mono">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block -mt-0.5">ক্লিক করে পেজ দেখুন</span>
          </div>

          {/* Add to Cart button */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`p-2.5 rounded-xl font-medium transition-all shadow-md active:scale-90 flex items-center justify-center ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
            }`}
            title="কার্টে যোগ করুন"
          >
            {isAddedRecently ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
