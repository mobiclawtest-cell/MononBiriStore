import React, { useState } from 'react';
import { UserReview, BidiProduct } from '../types';
import { Star, MessageSquarePlus, ThumbsUp, MapPin, CheckCircle2, Filter, MessageCircle } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: UserReview[];
  products: BidiProduct[];
  onAddReview: (review: UserReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  products,
  onAddReview,
}) => {
  const [selectedBidiFilter, setSelectedBidiFilter] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  // Form states
  const [targetBidiId, setTargetBidiId] = useState(products[0]?.id || 'monon-gold-filter');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('নিয়মিত গ্রাহক');
  const [authorLocation, setAuthorLocation] = useState('ঢাকা');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [funnyEffectText, setFunnyEffectText] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState(false);

  const filteredReviews =
    selectedBidiFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.bidiId === selectedBidiFilter);

  const handleToggleLike = (reviewId: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const matchedProduct = products.find((p) => p.id === targetBidiId);

    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      bidiId: targetBidiId,
      bidiName: matchedProduct ? matchedProduct.name : 'মনন গোল্ড ফিল্টার',
      userName: authorName.trim(),
      userRole: authorRole.trim() || 'ভোক্তা ও সংগ্রাহক',
      location: authorLocation.trim() || 'বাংলাদেশ',
      rating,
      date: 'আজকে',
      comment: commentText.trim(),
      funnyEffectWitnessed:
        funnyEffectText.trim() || 'নিখুঁত স্মুথ ড্র ও চমৎকার সুবাস অনুভূত হয়েছে।',
      helpfulCount: 1,
      avatarSeed: authorName.trim(),
    };

    onAddReview(newReview);
    setFormSuccessMessage(true);

    setTimeout(() => {
      setAuthorName('');
      setCommentText('');
      setFunnyEffectText('');
      setShowReviewForm(false);
      setFormSuccessMessage(false);
    }, 1500);
  };

  return (
    <section id="user-reviews" className="py-16 sm:py-20 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header and Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-300 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>যাচাইকৃত ক্রেতা ও রসিকদের অভিজ্ঞতা</span>
            </div>
            <h2 className="font-serif-bn text-3xl sm:text-4xl font-bold text-amber-200">
              ভোক্তা রিভিউ ও অভিজ্ঞতা
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-2xl font-sans">
              মনন বিড়ির ঐতিহ্যবাহী ও আধুনিক ফিল্টার সংস্করণ সম্পর্কে সারা দেশের যাচাইকৃত ভোক্তাদের বাস্তব মতামত ও অনুভূতি।
            </p>
          </div>

          <button
            id="open-review-form-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-amber-950 self-start md:self-auto transition-all active:scale-95 text-xs sm:text-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>আপনার অভিজ্ঞতা ও রিভিউ লিখুন</span>
          </button>
        </div>

        {/* REVIEW SUBMISSION FORM (TOGGLEABLE) */}
        {showReviewForm && (
          <form
            id="user-review-form"
            onSubmit={handleSubmitReview}
            className="bg-stone-900 border border-amber-600/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-bn text-xl font-bold text-amber-300">
                মনন বিড়ির সাথে আপনার অভিজ্ঞতা শেয়ার করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="text-stone-400 hover:text-stone-200 text-xs"
              >
                বন্ধ করুন
              </button>
            </div>

            {formSuccessMessage ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-center space-y-2 text-emerald-300">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="font-bold text-base">ধন্যবাদ! আপনার মূল্যবান রিভিউটি সফলভাবে প্রকাশিত হয়েছে!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-300 mb-1">কোন সংস্করণ ব্যবহার করেছেন? *</label>
                    <select
                      id="select-review-product"
                      value={targetBidiId}
                      onChange={(e) => setTargetBidiId(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.flavor})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1">আপনার নাম *</label>
                    <input
                      id="input-review-name"
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="আপনার নাম"
                      className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1">আপনার জেলা / এলাকা</label>
                    <input
                      id="input-review-location"
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      placeholder="যেমন: কুষ্টিয়া / গুলশান"
                      className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-300 mb-1">আপনার পেশা / পরিচয়</label>
                    <input
                      id="input-review-role"
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="যেমন: ব্যবসায়ী, সংগ্রাহক, ইত্যাদি"
                      className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1">রেটিং প্রদান করুন</label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              s <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-stone-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-amber-400 font-bold ml-2">
                        {rating} স্টার
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block text-stone-300">আপনার বিস্তারিত অভিজ্ঞতা ও রিভিউ *</label>
                  <textarea
                    id="input-review-comment"
                    rows={3}
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="বিড়ির রোলিং, ব্লেন্ড, ধোঁয়ার ঘনত্ব ও স্বাদ কেমন লেগেছে বিস্তারিত লিখুন..."
                    className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-3 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block text-stone-300">
                    বিশেষ বৈশিষ্ট্য বা অনুভূতির স্মৃতি (এক লাইনে)
                  </label>
                  <input
                    id="input-review-effect"
                    type="text"
                    value={funnyEffectText}
                    onChange={(e) => setFunnyEffectText(e.target.value)}
                    placeholder="যেমন: গোল্ড ফিল্টারের সুষম মসৃণ টান অসাধারণ অভিজ্ঞতা দিয়েছে।"
                    className="w-full bg-stone-950 border border-stone-700 text-stone-200 p-2.5 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-review-btn"
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  রিভিউ পোস্ট করুন
                </button>
              </>
            )}
          </form>
        )}

        {/* Filter Reviews by Product Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800 scrollbar-none text-xs">
          <span className="text-stone-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" /> ফিল্টার:
          </span>
          <button
            id="review-filter-all"
            onClick={() => setSelectedBidiFilter('all')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              selectedBidiFilter === 'all'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            সব রিভিউ ({reviews.length})
          </button>
          {products.map((p) => {
            const count = reviews.filter((r) => r.bidiId === p.id).length;
            return (
              <button
                key={p.id}
                id={`review-filter-${p.id}`}
                onClick={() => setSelectedBidiFilter(p.id)}
                className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                  selectedBidiFilter === p.id
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                {p.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];
            const displayLikes = rev.helpfulCount + (isLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-stone-900 border border-stone-800 hover:border-amber-700/60 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-lg transition-all"
              >
                <div className="space-y-3">
                  {/* Top user header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-300 font-bold text-sm">
                        {rev.userName.slice(0, 1)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-stone-100">{rev.userName}</h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                          <span>{rev.userRole}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            {rev.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] text-stone-500 font-mono">{rev.date}</span>
                  </div>

                  {/* Product Tag & Rating Stars */}
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="bg-amber-950/80 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-800/40 font-medium">
                      {rev.bidiName}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Bottom: Highlight and like */}
                <div className="space-y-3 pt-3 border-t border-stone-800">
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-[11px] space-y-1">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-amber-500" />
                      গ্রাহকের বিশেষ অনুভূতি:
                    </span>
                    <p className="text-stone-300 italic">&ldquo;{rev.funnyEffectWitnessed}&rdquo;</p>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      id={`like-review-${rev.id}`}
                      onClick={() => handleToggleLike(rev.id)}
                      className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                        isLiked
                          ? 'bg-amber-600/20 text-amber-300 border-amber-500'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-400' : ''}`} />
                      <span>উপকারী রিভিউ ({displayLikes})</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
