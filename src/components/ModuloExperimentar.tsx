import React, { useState } from 'react';
import { CAREER_REELS, type CareerReel } from '../data/experienceFeed';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
  DollarSign,
  Clock,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';

interface ModuloExperimentarProps {
  onSelectCareerToUnderstand?: (careerId: string) => void;
  onSelectCareerToCompare?: (careerId: string) => void;
}

export const ModuloExperimentar: React.FC<ModuloExperimentarProps> = ({
  onSelectCareerToUnderstand
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [bookmarkedReels, setBookmarkedReels] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showDayTimeline, setShowDayTimeline] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [reelsList, setReelsList] = useState<CareerReel[]>(CAREER_REELS);

  const reel = reelsList[currentIdx] || reelsList[0];
  const isLiked = !!likedReels[reel.id];
  const isBookmarked = !!bookmarkedReels[reel.id];

  const handleNext = () => {
    if (currentIdx < reelsList.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowDayTimeline(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setShowDayTimeline(false);
    }
  };

  const handleToggleLike = () => {
    const nextState = !isLiked;
    setLikedReels((prev) => ({ ...prev, [reel.id]: nextState }));
    setReelsList((prev) =>
      prev.map((r) => (r.id === reel.id ? { ...r, likesCount: r.likesCount + (nextState ? 1 : -1) } : r))
    );
  };

  const handleToggleBookmark = () => {
    setBookmarkedReels((prev) => ({ ...prev, [reel.id]: !isBookmarked }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newC = {
      id: `c-${Date.now()}`,
      author: 'Tú (Estudiante)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: newComment,
      timeAgo: 'Justo ahora',
      likes: 0
    };

    setReelsList((prev) =>
      prev.map((r) =>
        r.id === reel.id
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              comments: [newC, ...r.comments]
            }
          : r
      )
    );
    setNewComment('');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pb-24 md:pb-12 max-w-lg mx-auto px-1 sm:px-0">
      {/* Top Banner Tag */}
      <div className="w-full flex items-center justify-between px-2 mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-sm flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            RUMBO · 5. EXPERIMENTAR
          </span>
        </div>
        <span className="text-xs font-bold text-slate-500">
          {currentIdx + 1} / {reelsList.length}
        </span>
      </div>

      {/* Main Reel Card Container */}
      <div className="relative w-full h-[76vh] sm:h-[650px] max-h-[680px] min-h-[480px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between select-none">
        {/* Simulated Video Canvas / Dynamic Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-90 transition-all duration-700 flex items-center justify-center`}
        >
          {/* Animated Visual Pulsing Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
          <div className="absolute w-60 h-60 rounded-full bg-purple-500/20 blur-2xl animate-spin" style={{ animationDuration: '12s' }} />

          {/* Central Play/Pause Indicator if paused */}
          {!isPlaying && (
            <div className="z-20 w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Play className="w-8 h-8 ml-1" />
            </div>
          )}

          {/* Simulated Video Header Card */}
          <div className="z-10 text-center space-y-3 px-6">
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-white shadow-inner">
              <Sparkles className="w-8 h-8 text-blue-300 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">
              {reel.careerTitle}
            </h3>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
              {reel.institution}
            </p>
          </div>
        </div>

        {/* Video Click Overlay for Play/Pause toggle */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none"
          aria-label="Toggle playback"
        />

        {/* Top Controls Bar */}
        <div className="relative z-20 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-400" /> {reel.department}
            </span>
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-md">
              {reel.institutionType}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right Floating Actions Column */}
        <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleToggleLike(); }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isLiked ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-500/50' : 'bg-black/40 text-white border border-white/20 group-hover:bg-black/60'
            }`}>
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-black drop-shadow">{reel.likesCount}</span>
          </button>

          {/* Comments */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-black/60 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black drop-shadow">{reel.commentsCount}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleToggleBookmark(); }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isBookmarked ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50' : 'bg-black/40 text-white border border-white/20 group-hover:bg-black/60'
            }`}>
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-bold drop-shadow">Guardar</span>
          </button>

          {/* Explore Curriculum Button */}
          {onSelectCareerToUnderstand && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelectCareerToUnderstand(reel.careerId); }}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border border-white/30 group-hover:scale-105 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase text-blue-200">Pensum</span>
            </button>
          )}
        </div>

        {/* Bottom Information Overlay */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-3 pt-12">
          {/* Creator Profile */}
          <div className="flex items-center gap-3">
            <img
              src={reel.authorAvatar}
              alt={reel.authorName}
              className="w-10 h-10 rounded-full border-2 border-white/80 object-cover shrink-0"
            />
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white">{reel.authorName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
              </div>
              <span className="text-xs text-blue-300 font-semibold">{reel.authorRole}</span>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-white/95 leading-relaxed drop-shadow line-clamp-3">
            {reel.caption}
          </p>

          {/* Badges / Day in the Life trigger */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowDayTimeline(!showDayTimeline); }}
              className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-[11px] font-black text-white hover:bg-white/30 transition flex items-center gap-1"
            >
              <Clock className="w-3 h-3 text-blue-300" />
              <span>Ver: Un Día en mi Rutina</span>
            </button>

            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {reel.salaryReference}
            </span>
          </div>

          {/* Day in the Life Dropdown Sheet */}
          {showDayTimeline && (
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-3.5 space-y-2 text-xs text-white animate-in fade-in">
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider block">
                Horario Real de Trabajo:
              </span>
              <ul className="space-y-1 text-[11.5px] text-slate-200">
                {reel.dayInTheLifeHighlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Up / Down Navigation Floaters */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {currentIdx > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition"
              aria-label="Previous reel"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
          {currentIdx < reelsList.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition"
              aria-label="Next reel"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Comments Modal / Bottom Sheet ── */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md h-[70vh] sm:h-[550px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900">Preguntas & Comentarios ({reel.commentsCount})</h4>
                <p className="text-[11px] text-slate-500">Conversa directamente con {reel.authorName}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowComments(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {reel.comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 bg-slate-50 p-3 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">{c.author}</span>
                      <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Pregúntale a ${reel.authorName.split(' ')[0]} sobre su carrera...`}
                className="flex-1 h-10 px-3 text-xs bg-slate-100 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white flex items-center justify-center shrink-0 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
