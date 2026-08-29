import React, { useState } from 'react';
import { COMMUNITY_THREADS, type CommunityThread, type CommunityAnswer } from '../data/communityData';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Search,
  PlusCircle,
  CheckCircle2,
  Send,
  X,
  MapPin
} from 'lucide-react';

export const ModuloConectar: React.FC<{ department: string }> = ({ department }) => {
  const [threads, setThreads] = useState<CommunityThread[]>(COMMUNITY_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState<boolean>(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState<string>('');
  const [newQuestionBody, setNewQuestionBody] = useState<string>('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<CommunityThread['category']>('Tecnología');
  const [answerInput, setAnswerInput] = useState<string>('');

  const categories = ['Todos', 'Tecnología', 'Agro y Recursos', 'Salud', 'Industria', 'Negocios', 'General'];

  const filteredThreads = threads.filter((t) => {
    const matchesCat = selectedCategory === 'Todos' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUpvote = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    const newT: CommunityThread = {
      id: `t-${Date.now()}`,
      title: newQuestionTitle,
      question: newQuestionBody,
      authorName: 'Tú (Estudiante)',
      authorDepartment: department,
      authorSchool: 'Instituto de Secundaria',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      category: newQuestionCategory,
      tags: [newQuestionCategory, department],
      upvotes: 1,
      views: 1,
      timeAgo: 'Justo ahora',
      answers: []
    };

    setThreads([newT, ...threads]);
    setNewQuestionTitle('');
    setNewQuestionBody('');
    setShowAskModal(false);
  };

  const handleAddAnswer = (threadId: string) => {
    if (!answerInput.trim()) return;

    const newAns: CommunityAnswer = {
      id: `ans-${Date.now()}`,
      authorName: 'Tú (Aporte Comunitario)',
      authorRole: 'Estudiante / Miembro',
      authorBadge: 'Estudiante Universitario',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: answerInput,
      likes: 1,
      timeAgo: 'Justo ahora'
    };

    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, answers: [...t.answers, newAns] } : t))
    );
    setAnswerInput('');
  };

  return (
    <div className="w-full space-y-7 max-w-5xl mx-auto pb-24 md:pb-12 px-1 sm:px-0">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-r from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 border border-[#0057FF]/30 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00C2FF]/20 text-[#00F0FF] border border-[#00C2FF]/30">
            <Users className="w-3.5 h-3.5" /> RUMBO · 6. CONECTAR
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Preguntas Reales a Egresados y Docentes
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Resuelve tus dudas directamente con estudiantes avanzados, docentes del MINED/CNU y técnicos del INATEC que ya están trabajando en Nicaragua.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAskModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0048BA] via-[#0057FF] to-[#00C2FF] hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#0057FF]/25 shrink-0 transition relative z-10"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Hacer una Pregunta</span>
        </button>
      </div>

      {/* ── Filter Bar & Search ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black shrink-0 transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por carrera, tema o duda..."
            className="w-full h-10 pl-9 pr-3 text-xs bg-white rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>
      </div>

      {/* ── Threads Feed ── */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => {
          const isOpen = activeThreadId === thread.id;

          return (
            <div
              key={thread.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
            >
              {/* Thread Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={thread.authorAvatar}
                    alt={thread.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">{thread.authorName}</span>
                      <span className="text-[10px] text-slate-400">· {thread.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {thread.authorSchool} ({thread.authorDepartment})
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {thread.category}
                </span>
              </div>

              {/* Thread Question */}
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {thread.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {thread.question}
                </p>
              </div>

              {/* Tags & Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap gap-1">
                  {thread.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => handleUpvote(thread.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{thread.upvotes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveThreadId(isOpen ? null : thread.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition ${
                      isOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{thread.answers.length} Respuestas</span>
                  </button>
                </div>
              </div>

              {/* ── Expanded Answers Section ── */}
              {isOpen && (
                <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Respuestas Verificadas de Mentores y Egresados:
                  </h4>

                  {thread.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-4 rounded-2xl border space-y-2 ${
                        ans.isVerifiedAnswer
                          ? 'bg-blue-50/60 border-blue-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={ans.authorAvatar}
                            alt={ans.authorName}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-slate-900">{ans.authorName}</span>
                              {ans.isVerifiedAnswer && (
                                <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded-full bg-blue-600 text-white flex items-center gap-0.5">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Mentor Verificado
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-blue-700 font-semibold">{ans.authorRole}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{ans.timeAgo}</span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed pl-10">
                        {ans.text}
                      </p>
                    </div>
                  ))}

                  {/* Add Answer Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Añadir una respuesta o consejo a este estudiante..."
                      className="flex-1 h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddAnswer(thread.id)}
                      disabled={!answerInput.trim()}
                      className="px-4 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Responder</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Ask Question Modal ── */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Hacer una Pregunta a la Comunidad</h3>
              <button
                type="button"
                onClick={() => setShowAskModal(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Categoría
                </label>
                <select
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-700"
                >
                  <option value="Tecnología">Tecnología</option>
                  <option value="Agro y Recursos">Agro y Recursos</option>
                  <option value="Salud">Salud</option>
                  <option value="Industria">Industria</option>
                  <option value="Negocios">Negocios</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Título de tu Pregunta (Sé claro y directo)
                </label>
                <input
                  type="text"
                  required
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="Ej. ¿Cuánto cuesta estudiar gastronomía en INATEC Granada?"
                  className="w-full h-10 px-3 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Detalles y Contexto
                </label>
                <textarea
                  rows={3}
                  value={newQuestionBody}
                  onChange={(e) => setNewQuestionBody(e.target.value)}
                  placeholder="Explica tu situación (en qué año estás, qué te preocupa, etc.)..."
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl bg-slate-50 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 h-10 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newQuestionTitle.trim()}
                  className="px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition"
                >
                  Publicar Pregunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
