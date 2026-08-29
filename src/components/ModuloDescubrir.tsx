import React, { useState } from 'react';
import type { EducationalOffer } from '../services/indexedDB';
import {
  Compass,
  Search,
  Bookmark,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Scale,
  Video
} from 'lucide-react';

interface ModuloDescubrirProps {
  offers: (EducationalOffer & { matchScore: number })[];
  department: string;
  municipality: string;
  savedCareers: string[];
  onToggleSaveCareer: (careerId: string) => void;
  onNavigateToEntender: (careerId: string) => void;
  onNavigateToComparar: (careerId: string) => void;
  onNavigateToExperimentar: (careerId: string) => void;
}

export const ModuloDescubrir: React.FC<ModuloDescubrirProps> = ({
  offers,
  department,
  municipality,
  savedCareers,
  onToggleSaveCareer,
  onNavigateToEntender,
  onNavigateToComparar,
  onNavigateToExperimentar
}) => {
  const [filterTipo, setFilterTipo] = useState<string>('Todos');
  const [filterModality, setFilterModality] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOffers = offers.filter((o) => {
    const matchesTipo = filterTipo === 'Todos' || o.tipo === filterTipo;
    const matchesModality = filterModality === 'Todos' || o.modalidad.includes(filterModality);
    const matchesSearch =
      o.carrera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.institucion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sede.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTipo && matchesModality && matchesSearch;
  });

  return (
    <div className="w-full space-y-7 max-w-6xl mx-auto pb-24 md:pb-12 px-1 sm:px-0">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-r from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 border border-[#0057FF]/30 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00C2FF]/20 text-[#00F0FF] border border-[#00C2FF]/30">
            <Compass className="w-3.5 h-3.5" /> RUMBO · 2. DESCUBRIR
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Exploración de Carreras en {department}
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Descubre opciones técnicas y universitarias ordenadas por compatibilidad con tus intereses y las necesidades productivas de tu región.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#001B48]/80 px-4 py-2.5 rounded-2xl border border-[#00C2FF]/30 text-xs text-slate-200 shrink-0 relative z-10">
          <MapPin className="w-4 h-4 text-[#00C2FF]" />
          <span>{department}, {municipality}</span>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar carrera (ej. Programación, Agronomía, Enfermería, Mecánica)..."
              className="w-full h-11 pl-9 pr-3 text-xs bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:w-48">
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full h-11 px-3 text-xs font-bold bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="Todos">Todos los centros</option>
              <option value="INATEC">Educación Técnica (INATEC)</option>
              <option value="Pública">Universidad Pública (CNU)</option>
              <option value="Privada">Universidad Privada</option>
            </select>
          </div>

          {/* Modality Filter */}
          <div className="sm:w-44">
            <select
              value={filterModality}
              onChange={(e) => setFilterModality(e.target.value)}
              className="w-full h-11 px-3 text-xs font-bold bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="Todos">Cualquier modalidad</option>
              <option value="Presencial">Presencial</option>
              <option value="Sabatino">Sabatino</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-semibold">
          <span>Mostrando {filteredOffers.length} opciones compatibles</span>
          <span className="text-blue-600 font-bold">Ordenado por Afinidad Psicométrica</span>
        </div>
      </div>

      {/* ── Career Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map((rec) => {
          const isSaved = savedCareers.includes(rec.id);

          return (
            <div
              key={rec.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between gap-4 relative group"
            >
              {/* Header Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    {rec.matchScore}% Compatible
                  </span>

                  <button
                    type="button"
                    onClick={() => onToggleSaveCareer(rec.id)}
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center border transition ${
                      isSaved
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'
                    }`}
                    title={isSaved ? 'Guardada en Mi Plan' : 'Guardar en Mi Plan'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Title and Institution */}
                <div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    rec.tipo === 'INATEC' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rec.tipo} · {rec.grado}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1 leading-snug group-hover:text-blue-600 transition">
                    {rec.carrera}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {rec.institucion}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{rec.sede} ({rec.municipio})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Modalidad: <strong>{rec.modalidad.join(', ')}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToEntender(rec.id)}
                    className="h-9 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center gap-1.5 transition border border-purple-200"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Ver Pensum</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateToExperimentar(rec.id)}
                    className="h-9 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-black flex items-center justify-center gap-1.5 transition border border-red-200"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Ver Reels</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateToComparar(rec.id)}
                  className="w-full h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center gap-1.5 transition"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Comparar con otras opciones</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
