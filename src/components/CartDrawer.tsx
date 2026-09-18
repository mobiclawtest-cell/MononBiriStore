import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-stone-900 border-l border-amber-800/60 shadow-2xl flex flex-col text-stone-100"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif-bn text-xl font-bold text-amber-200">
                আপনার অর্ডার ঝুলি ({totalItemsCount})
              </h2>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-medium text-stone-300">
                    আপনার অর্ডার ঝুলি একদম খালি!
                  </p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    মেঘের গর্জ্জন বা দার্শনিক আড্ডার মতো দারুণ কোনো ফ্লেভার বেছে নিন।
                  </p>
                </div>
                <button
                  id="browse-bidis-from-empty-cart-btn"
                  onClick={onClose}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-semibold shadow"
                >
                  বিড়ি তালিকা দেখুন
                </button>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  id={`cart-item-${product.id}`}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 flex gap-3 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-serif-bn font-bold text-amber-200 text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 truncate">
                      {product.flavor}
                    </p>
                    <div className="text-xs font-mono font-bold text-amber-400 mt-1">
                      ৳{product.price} × {quantity} = ৳{product.price * quantity}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      id={`remove-cart-item-${product.id}`}
                      onClick={() => onRemoveItem(product.id)}
                      className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-700 rounded-lg p-0.5">
                      <button
                        id={`cart-qty-minus-${product.id}`}
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold text-stone-200">
                        {quantity}
                      </span>
                      <button
                        id={`cart-qty-plus-${product.id}`}
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-400 text-xs">
                  <span>মোট শলাকা প্যাকেট</span>
                  <span className="font-mono text-stone-200">{totalItemsCount} প্যাকেট</span>
                </div>
                <div className="flex justify-between text-stone-300 font-medium">
                  <span>সাবটোটাল</span>
                  <span className="font-mono text-amber-400 font-bold text-lg">৳{subtotal}</span>
                </div>
                <p className="text-[10px] text-stone-500">
                  * হোম ডেলিভারির খরচ পরবর্তী পদক্ষেপে বেছে নেওয়া যাবে।
                </p>
              </div>

              <button
                id="cart-checkout-proceed-btn"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-950 active:scale-98 transition-all"
              >
                <span>চেকআউট ও হোম ডেলিভারি</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>বিকাশ, নগদ, রকেট ও ক্যাশ অন ডেলিভারি গ্রহণযোগ্য</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
