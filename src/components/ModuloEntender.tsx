import React, { useState } from 'react';
import { SAMPLE_PENSUMS, type CareerPensum } from '../data/pensums';
import {
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

interface ModuloEntenderProps {
  initialCareerId?: string;
  onCompareCareer?: (careerId: string) => void;
}

export const ModuloEntender: React.FC<ModuloEntenderProps> = ({
  initialCareerId = 'inatec_progra_ma',
  onCompareCareer
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(initialCareerId);
  const [selectedSemesterIdx, setSelectedSemesterIdx] = useState<number>(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const pensum: CareerPensum = SAMPLE_PENSUMS[selectedCareerId] || SAMPLE_PENSUMS['inatec_progra_ma'];
  const activeSemester = pensum.semesters[selectedSemesterIdx] || pensum.semesters[0];

  return (
    <div className="w-full space-y-7 max-w-5xl mx-auto pb-24 md:pb-12 px-1 sm:px-0">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-r from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 border border-[#0057FF]/30 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00C2FF]/20 text-[#00F0FF] border border-[#00C2FF]/30">
            <BookOpen className="w-3.5 h-3.5" /> RUMBO · 4. ENTENDER
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Desglose Interactivo de Asignaturas & Pensums
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Descubre qué proyectos prácticos vas a construir semestre a semestre y qué herramientas vas a dominar.
          </p>
        </div>

        {/* Career Selector Dropdown */}
        <div className="space-y-1 sm:min-w-[280px] relative z-10">
          <label className="text-[10.5px] font-black text-blue-200 uppercase tracking-wider block">
            Pensum Seleccionado:
          </label>
          <select
            value={selectedCareerId}
            onChange={(e) => {
              setSelectedCareerId(e.target.value);
              setSelectedSemesterIdx(0);
              setSelectedSubjectId(null);
            }}
            className="w-full h-11 px-3 text-xs font-black bg-[#001B48] text-white rounded-2xl border border-[#00C2FF]/40 focus:outline-none focus:border-[#00C2FF] transition"
          >
            {Object.values(SAMPLE_PENSUMS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.careerTitle} ({p.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Career Overview Card ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
              pensum.type === 'INATEC' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {pensum.type}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {pensum.institution}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            {pensum.careerTitle}
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            {pensum.profileOverview}
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex sm:flex-col gap-3 shrink-0">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center sm:min-w-[150px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duración</span>
            <span className="text-sm font-black text-slate-900">{pensum.totalDuration}</span>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-center sm:min-w-[150px]">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Enfoque Práctico</span>
            <span className="text-sm font-black text-purple-900">{pensum.overallPracticalPercentage}% Taller / Labs</span>
          </div>
        </div>
      </div>

      {/* ── Semester Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {pensum.semesters.map((sem, idx) => (
          <button
            key={sem.number}
            type="button"
            onClick={() => {
              setSelectedSemesterIdx(idx);
              setSelectedSubjectId(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition flex items-center gap-2 ${
              selectedSemesterIdx === idx
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semestre {sem.number}</span>
          </button>
        ))}
      </div>

      {/* ── Subjects Grid for Active Semester ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            {activeSemester.title} ({activeSemester.subjects.length} Asignaturas Clave)
          </h4>
          <span className="text-xs text-slate-400 font-medium">Toca una asignatura para ver su proyecto</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSemester.subjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubjectId(isSelected ? null : sub.id)}
                className={`bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between gap-4 relative ${
                  isSelected
                    ? 'border-purple-600 shadow-lg ring-2 ring-purple-500/10'
                    : 'border-slate-200 hover:border-purple-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  {/* Top line badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {sub.code} · {sub.category}
                    </span>
                    <span className="text-[10.5px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                      {sub.practicalPercentage}% Práctica
                    </span>
                  </div>

                  <div>
                    <h5 className="text-base font-black text-slate-900 leading-snug">
                      {sub.name}
                    </h5>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Carga: {sub.creditsOrHours}
                    </p>
                  </div>

                  {/* Real World Skill Callout */}
                  <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-900 text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Lo que vas a saber hacer:
                    </div>
                    <p className="text-xs text-purple-950 font-medium leading-relaxed">
                      {sub.realWorldSkill}
                    </p>
                  </div>

                  {/* Practical Project Reveal */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 space-y-1 border border-slate-100">
                    <span className="text-[10.5px] font-black text-slate-700 uppercase tracking-wider block">
                      🛠️ Proyecto Real de esta Asignatura:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.practicalProject}
                    </p>
                  </div>
                </div>

                {/* Tools Footer */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {sub.toolsUsed.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {onCompareCareer && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompareCareer(pensum.id);
                      }}
                      className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Comparar centros</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
