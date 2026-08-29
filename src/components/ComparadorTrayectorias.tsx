import React, { useState } from 'react';
import {
  Zap,
  GraduationCap,
  Layers,
  Clock,
  Briefcase,
  DollarSign,
  Award,
  Check,
  Scale,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ComparadorTrayectoriasProps {
  selectedSectorName?: string;
}

export const ComparadorTrayectorias: React.FC<ComparadorTrayectoriasProps> = ({
  selectedSectorName
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'tecnica' | 'universitaria' | 'progresiva'>('todos');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Scale className="w-3.5 h-3.5" /> Comparación Objetiva e Imparcial
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Rutas de Formación: Encuentra la que se adapta a tu realidad
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedSectorName
              ? `Opciones para formarte en ${selectedSectorName}`
              : 'Ninguna opción es superior a otra; responden a tiempos, metas y necesidades diferentes.'}
          </p>
        </div>

        {/* View filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('todos')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'todos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Ver las 3 Rutas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tecnica')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'tecnica' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Técnica
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('universitaria')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'universitaria' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Universitaria
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('progresiva')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'progresiva' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Progresiva
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* ── Ruta 1: Educación Técnica (INATEC) ── */}
        {(activeTab === 'todos' || activeTab === 'tecnica') && (
          <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                  1 a 2 Años
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">
                  Educación Técnica (INATEC)
                </h4>
                <p className="text-xs font-bold text-blue-700 mt-0.5">
                  Técnico General / Técnico Especialista
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-blue-200/60">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Duración:</strong> 1.5 a 2 años lectivos.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Metodología:</strong> 70% práctica en talleres reales / 30% aula teórica.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Inversión:</strong> 100% gratuita en 60+ centros tecnológicos del país.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Inserción:</strong> Pasantías directas y rápida contratación.
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white/80 rounded-xl p-3 border border-blue-100 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">
                  ¿Para quién es ideal?
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Jóvenes que aprenden mejor manipulando herramientas, quienes necesitan generar ingresos rápido para apoyar a su familia, o quienes desean abrir un taller/negocio propio.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-extrabold text-blue-800">
              <span>Modalidad: Diurno / Sabatino / Virtual</span>
              <Check className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        )}

        {/* ── Ruta 2: Educación Universitaria (CNU / Públicas) ── */}
        {(activeTab === 'todos' || activeTab === 'universitaria') && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm">
                  4 a 5 Años
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">
                  Educación Universitaria (CNU)
                </h4>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  Licenciatura / Ingeniería / Medicina
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-emerald-200/60">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Duración:</strong> 4 a 5 años de formación integral.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Metodología:</strong> 50% fundamentación teórica e investigación / 50% aplicación.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Inversión:</strong> Gratuidad de matrícula en universidades públicas + becas internas.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Inserción:</strong> Cargos de diseño, investigación, gerencia y docencia.
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white/80 rounded-xl p-3 border border-emerald-100 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block">
                  ¿Para quién es ideal?
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Jóvenes apasionados por la investigación científica profunda, el diseño conceptual de grandes proyectos o carreras reguladas (Medicina, Derecho, Ingeniería Civil).
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-extrabold text-emerald-800">
              <span>Modalidad: Regular / Por Encuentros / Virtual</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        )}

        {/* ── Ruta 3: Ruta Progresiva / Combinada (La Ruta Flexible) ── */}
        {(activeTab === 'todos' || activeTab === 'progresiva') && (
          <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/40 p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-600 text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ruta Flexible
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">
                  Ruta Progresiva (Técnico + Universidad)
                </h4>
                <p className="text-xs font-bold text-purple-700 mt-0.5">
                  Independencia temprana $\rightarrow$ Continuidad de Grado
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-purple-200/60">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Paso 1:</strong> Técnico INATEC (1.5 años) $\rightarrow$ Obtienes empleo e ingresos.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Paso 2:</strong> Universidad Sabatina o Virtual (Universidad en el Campo / UNAN / UNI).
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Financiamiento:</strong> Te autofinancias y adquieres experiencia laboral real desde los 18 años.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Doble Titulación:</strong> Título técnico oficial + Título universitario posterior.
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white/80 rounded-xl p-3 border border-purple-100 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider block">
                  ¿Para quién es ideal?
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Jóvenes y familias con presupuesto limitado que no pueden costear 5 años sin trabajar, pero que no quieren renunciar a su sueño universitario.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between text-[11px] font-extrabold text-purple-800">
              <span>Máxima resiliencia y autonomía</span>
              <Check className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        )}
      </div>

      {/* Footer Insight Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Consejo de Orientación:</strong> Elige tu camino basándote en tu situación actual y metas inmediatas. Muchas de las personas más exitosas en Nicaragua comenzaron con un curso técnico, montaron su negocio y luego se graduaron de ingenieros o administradores trabajando al mismo tiempo.
        </p>
      </div>
    </div>
  );
};
