import React from 'react';
import type { EducationalOffer } from '../services/indexedDB';
import { RumboLogo } from './RumboLogo';
import {
  Bookmark,
  Download,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Compass,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ModuloDecidirProps {
  department: string;
  municipality: string;
  hollandCode: string;
  riasecScores: Record<string, number>;
  savedCareerIds: string[];
  allOffers: (EducationalOffer & { matchScore: number })[];
  onRemoveSavedCareer: (careerId: string) => void;
  onNavigateToEntender: (careerId: string) => void;
  onExportPDF: () => void;
  onReset: () => void;
}

export const ModuloDecidir: React.FC<ModuloDecidirProps> = ({
  department,
  municipality,
  hollandCode,
  savedCareerIds,
  allOffers,
  onRemoveSavedCareer,
  onNavigateToEntender,
  onExportPDF,
  onReset
}) => {
  const savedOffers = allOffers.filter((o) => savedCareerIds.includes(o.id));

  const milestones = [
    {
      step: '1',
      title: 'Paso 1: Diálogo y Acuerdo Familiar',
      desc: 'Descarga tu Pasaporte Vocacional RUMBO, léelo en la sobremesa con tus padres y conversen sobre horarios, transporte y metas.',
      status: '¡Listo para hacer!'
    },
    {
      step: '2',
      title: 'Paso 2: Prematrícula Oficial (MINED / INATEC / SETEC)',
      desc: 'Revisa las fechas oficiales de matrícula gratuita para centros INATEC y universidades públicas en tu departamento.',
      status: 'Próximamente'
    },
    {
      step: '3',
      title: 'Paso 3: Inicio de Clases & Prácticas de Taller',
      desc: 'Comienza tu formación práctica, crea tus primeros proyectos reales y forja tu independencia profesional.',
      status: 'Meta 2026'
    }
  ];

  return (
    <div className="w-full space-y-7 max-w-5xl mx-auto pb-24 md:pb-12 px-1 sm:px-0">
      {/* ── Top Hero Banner ── */}
      <div className="bg-gradient-to-br from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#0057FF]/30 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 p-1.5 rounded-2xl shadow-sm">
                <RumboLogo variant="icon" size="sm" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00C2FF]/20 text-[#00F0FF] border border-[#00C2FF]/30">
                  <MapPin className="w-3.5 h-3.5" /> {department}, {municipality}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/20">
                  <Compass className="w-3.5 h-3.5 text-[#00C2FF]" /> Holland: {hollandCode}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              7. DECIDIR: Tu Proyecto de Futuro
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Consolida tus opciones favoritas, revisa tu plan de acción paso a paso y descarga tu Pasaporte Vocacional oficial RUMBO para llevarlo a tu colegio y hogar.
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={onExportPDF}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#0048BA] via-[#0057FF] to-[#00C2FF] hover:opacity-95 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-[#0057FF]/30 transition"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Pasaporte RUMBO (PDF)</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs sm:text-sm border border-white/20 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reiniciar Evaluación</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Saved Careers Portfolio ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
              Tus Carreras Guardadas en el Portafolio ({savedOffers.length})
            </h3>
            <p className="text-xs text-slate-500">
              Opciones que marcaste como favoritas durante tu exploración.
            </p>
          </div>
        </div>

        {savedOffers.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto animate-bounce" />
            <p className="text-sm font-bold text-slate-700">Aún no has guardado ninguna carrera</p>
            <p className="text-xs text-slate-500">
              Ve a la sección <strong>DESCUBRIR</strong> o <strong>EXPERIMENTAR</strong> y presiona el ícono de marcador para añadir tus favoritas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedOffers.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 transition flex flex-col justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {rec.tipo} · {rec.grado}
                    </span>
                    <span className="text-xs font-extrabold text-blue-700">
                      {rec.matchScore}% Afín
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900">{rec.carrera}</h4>
                  <p className="text-xs text-slate-500">{rec.institucion} - {rec.sede}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => onNavigateToEntender(rec.id)}
                    className="text-xs font-black text-purple-700 hover:text-purple-900 flex items-center gap-1"
                  >
                    <span>Ver Pensum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveSavedCareer(rec.id)}
                    className="text-[11px] font-bold text-slate-400 hover:text-red-600 transition"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 3-Step Action Roadmap ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Hoja de Ruta: Tus Próximos 3 Pasos
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Lo que debes hacer al salir de 5to año de secundaria en {department}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  {m.step}
                </div>
                <h4 className="text-sm font-black text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] font-black text-blue-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
