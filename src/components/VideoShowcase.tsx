import React, { useState } from 'react';
import { BrandVideo } from '../types';
import { Play, Eye, Clock, CheckCircle2, Video, Film, Volume2, VolumeX, Maximize2, ShieldCheck } from 'lucide-react';

interface VideoShowcaseProps {
  videos: BrandVideo[];
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<BrandVideo>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleSelectVideo = (video: BrandVideo) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  return (
    <section id="brand-videos" className="py-16 bg-stone-900 border-b border-amber-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold mb-3">
              <Film className="w-4 h-4 text-amber-400" />
              <span>কারখানা ও কারিগরি ভিডিও সম্ভার</span>
            </div>
            <h2 className="font-serif-bn text-3xl lg:text-4xl font-bold text-amber-200">
              মনন বিড়ির প্রামাণ্যচিত্র ও আধুনিক উন্মোচন
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-2xl font-sans">
              গড়াই নদীর তীর থেকে আধুনিক ফিল্টার গবেষণাগার পর্যন্ত — দেখুন কীভাবে ঐতিহ্যবাহী তেন্দুপাতা বাছাই ও আধুনিক ফিল্টার বিড়ি প্রস্তুত করা হয়।
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-400 bg-stone-950/70 border border-stone-800 px-4 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>অফিসিয়াল ভিডিও আর্কাইভ • ৪কে রেজোলিউশন</span>
          </div>
        </div>

        {/* Desktop Theater Grid: Large Video Screen Left (8 cols) + Playlist Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Player Screen */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl group">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              {/* Video Simulated Overlay Controls */}
              {isPlaying ? (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-black/40 backdrop-blur-[2px]">
                  <div className="flex items-center justify-between text-xs text-stone-200">
                    <span className="bg-red-600/90 text-white px-2.5 py-1 rounded-md font-mono font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      চলছে • {selectedVideo.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                      </button>
                      <span className="bg-stone-900/80 px-2 py-1 rounded text-[11px] font-mono">১০৮০p এইচডি</span>
                    </div>
                  </div>

                  {/* Center Playing Animation */}
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-amber-600/90 border border-amber-400 text-stone-950 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                      <Play className="w-8 h-8 fill-stone-950 ml-1" />
                    </div>
                    <p className="text-sm font-semibold text-amber-200">ভিডিও সম্প্রচারিত হচ্ছে</p>
                  </div>

                  {/* Progress timeline bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-stone-700/60 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full w-2/5 animate-pulse" />
                    </div>
                    <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                      <span>০১:২৪</span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/30 hover:bg-black/20 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-9 h-9 fill-stone-950 ml-1" />
                  </div>
                  <span className="mt-3 text-xs font-bold text-amber-200 bg-stone-900/80 px-3 py-1 rounded-full border border-stone-700">
                    ভিডিও প্লে করুন ({selectedVideo.duration})
                  </span>
                </div>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="bg-stone-950 border border-stone-800/80 rounded-2xl p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800 font-medium">
                  {selectedVideo.tag}
                </span>
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    {selectedVideo.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {selectedVideo.duration}
                  </span>
                  <span>{selectedVideo.date}</span>
                </div>
              </div>

              <h3 className="font-serif-bn text-2xl font-bold text-amber-100">
                {selectedVideo.title}
              </h3>
              
              <p className="text-stone-300 text-sm leading-relaxed font-sans">
                {selectedVideo.description}
              </p>

              <div className="pt-2 text-xs text-stone-400 border-t border-stone-800 flex items-center gap-2">
                <span className="text-amber-400 font-semibold">বক্তা / পরিচালক:</span>
                <span>{selectedVideo.speaker}</span>
              </div>
            </div>
          </div>

          {/* Video Playlist Sidebar (Desktop 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                ভিডিও তালিকা ({videos.length})
              </span>
              <span className="text-xs text-stone-500">এইচডি কোয়ালিটি</span>
            </div>

            <div className="space-y-3">
              {videos.map((vid) => {
                const isCurrent = vid.id === selectedVideo.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex gap-3.5 items-center group ${
                      isCurrent
                        ? 'bg-amber-950/40 border-amber-600/70 shadow-lg'
                        : 'bg-stone-950/70 border-stone-800 hover:border-amber-700/50 hover:bg-stone-900/80'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-800">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-stone-200 px-1.5 py-0.5 rounded font-mono">
                        {vid.duration}
                      </div>
                      {isCurrent && (
                        <div className="absolute inset-0 bg-amber-600/30 flex items-center justify-center">
                          <Play className="w-6 h-6 fill-amber-300 text-amber-300" />
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[11px] text-amber-400 font-medium block truncate">
                        {vid.tag}
                      </span>
                      <h4 className={`text-xs font-bold font-serif-bn leading-snug line-clamp-2 ${
                        isCurrent ? 'text-amber-200' : 'text-stone-200 group-hover:text-amber-300'
                      }`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 pt-0.5">
                        <span>{vid.views}</span>
                        <span>•</span>
                        <span>{vid.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality Certificate Box */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-2 text-stone-400">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>ভিডিও তথ্যসূত্র ও লাইসেন্স</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                সকল প্রামাণ্য ফুটেজ মনন বিড়ির কুষ্টিয়া কারখানা ও ল্যাবরেটরি থেকে সরাসরি ধারণকৃত। পাইকারি ডিলারদের প্রশিক্ষণেও এই ভিডিওগুলো ব্যবহৃত হয়।
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
