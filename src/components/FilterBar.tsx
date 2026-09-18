import React from 'react';
import { Search, X, Package, Filter, SlidersHorizontal } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  category: string;
  strength: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalResults,
}) => {
  const categories = [
    { id: 'all', label: 'সব সংস্করণ' },
    { id: 'modern_filter', label: 'আধুনিক ফিল্টার বিড়ি' },
    { id: 'classic_tendu', label: 'ঐতিহ্যবাহী তেন্দুপাতা' },
    { id: 'signature_blend', label: 'সিগনেচার ব্লেন্ড' },
    { id: 'royal_edition', label: 'রয়্যাল এডিশন' },
    { id: 'spicy_bold', label: 'বোল্ড ও হাই এনার্জি' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategorySelect = (categoryId: string) => {
    onFilterChange({ ...filters, category: categoryId });
  };

  const handleStrengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, strength: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as FilterState['sortBy'],
    });
  };

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      category: 'all',
      strength: 'all',
      sortBy: 'featured',
    });
  };

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.category !== 'all' ||
    filters.strength !== 'all' ||
    filters.sortBy !== 'featured';

  return (
    <div id="bidi-filter-container" className="bg-stone-900 border border-amber-900/40 rounded-2xl p-5 shadow-xl shadow-black/40 space-y-4">
      {/* Top row: Search input + Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="bidi-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="বিড়ির নাম, গোল্ড ফিল্টার, আইস ক্রাশ, আমসত্ত্ব বা মশলা লিখে খুঁজুন..."
            className="w-full bg-stone-950 border border-stone-700 text-stone-200 pl-10 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-stone-500"
          />
          {filters.searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              title="মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters: Strength & Sorting */}
        <div className="flex items-center gap-3">
          {/* Strength selector */}
          <div className="relative">
            <select
              id="strength-filter-select"
              value={filters.strength}
              onChange={handleStrengthChange}
              className="bg-stone-950 border border-stone-700 text-stone-300 text-xs sm:text-sm py-2.5 px-3 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">সব তীব্রতা (১-৫)</option>
              <option value="mild">মৃদু ও স্মুথ (১-২)</option>
              <option value="medium">মাঝারি ব্যালেন্সড (৩)</option>
              <option value="strong">কড়া ও বোল্ড (৪-৫)</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="relative">
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="bg-stone-950 border border-stone-700 text-stone-300 text-xs sm:text-sm py-2.5 px-3 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">জনপ্রিয় পছন্দ</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>

          {isFiltered && (
            <button
              id="reset-filter-btn"
              onClick={resetFilters}
              className="p-2.5 bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-xl transition-colors shrink-0 flex items-center gap-1 text-xs"
              title="সব ফিল্টার রিসেট করুন"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">রিসেট</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Buttons Bar */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-800/80 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950 font-bold'
                    : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-amber-700/60 hover:text-amber-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="text-xs text-stone-400 font-mono flex items-center gap-1.5 ml-auto">
          <Package className="w-4 h-4 text-amber-400" />
          <span>মোট <strong>{totalResults}</strong> টি সংস্করণ উপলব্ধ</span>
        </div>
      </div>
    </div>
  );
};
