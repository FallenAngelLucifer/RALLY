import React, { useState } from 'react';
import {
  Scale,
  Zap,
  GraduationCap,
  Layers,
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';

export const ModuloComparar: React.FC<{ department: string }> = ({ department }) => {
  const [selectedFocus, setSelectedFocus] = useState<'todos' | 'gratuita' | 'rapida'>('todos');

  const comparisonData = [
    {
      feature: 'Duración Promedio',
      inatec: '1.5 a 2 Años (3 - 4 Semestres)',
      setec: '4 a 5 Años (8 - 10 Semestres)',
      privada: '4 a 5 Años (Cuatrimestral o Semestral)',
      progresiva: '1.5 años Técnico + 3 años Sabatino'
    },
    {
      feature: 'Inversión y Aranceles',
      inatec: '100% Gratuito (Cero Matrícula)',
      setec: 'Matrícula y Aranceles Gratuitos',
      privada: '$40 - $120 / mes + Matrícula',
      progresiva: 'Autofinanciado con salario del técnico'
    },
    {
      feature: 'Metodología de Aprendizaje',
      inatec: '70% Práctica en Talleres / 30% Aula',
      setec: '50% Teoría e Investigación / 50% Práctica',
      privada: '60% Aula / 40% Práctica',
      progresiva: 'Práctica laboral real + Aula ejecutiva'
    },
    {
      feature: 'Inserción Laboral y Empleo',
      inatec: 'Muy Rápida (Pasantías en 2do semestre)',
      setec: 'Mediano Plazo (Prácticas profesionales)',
      privada: 'Mediano Plazo',
      progresiva: 'Inmediata desde el 2do año'
    },
    {
      feature: 'Requisitos de Ingreso',
      inatec: 'Diploma de 5to año o 3er año aprobado + Cédula',
      setec: 'Título de Bachiller + Prematrícula en línea',
      privada: 'Título de Bachiller + Pago de Matrícula',
      progresiva: 'Título de Bachiller'
    },
    {
      feature: 'Potencial de Emprendimiento',
      inatec: 'Muy Alto (Oficios y talleres técnicos propios)',
      setec: 'Alto (Firmas consultoras y empresas de gran escala)',
      privada: 'Medio',
      progresiva: 'Máximo (Capital propio + Conocimiento técnico)'
    }
  ];

  return (
    <div className="w-full space-y-7 max-w-6xl mx-auto pb-24 md:pb-12 px-1 sm:px-0">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-r from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 border border-[#0057FF]/30 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00C2FF]/20 text-[#00F0FF] border border-[#00C2FF]/30">
            <Scale className="w-3.5 h-3.5" /> RUMBO · 3. COMPARAR
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Matriz de Comparación en {department}
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Compara requisitos, costos, tiempos y enfoques formativos de forma 100% neutral y transparente para tomar una decisión informada.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#001B48]/80 p-1.5 rounded-2xl text-xs font-bold shrink-0 border border-[#00C2FF]/20 relative z-10">
          <button
            type="button"
            onClick={() => setSelectedFocus('todos')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedFocus === 'todos' ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
          >
            Vista General
          </button>
          <button
            type="button"
            onClick={() => setSelectedFocus('gratuita')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedFocus === 'gratuita' ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
          >
            Gratuidad Pública
          </button>
          <button
            type="button"
            onClick={() => setSelectedFocus('rapida')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedFocus === 'rapida' ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
          >
            Inserción Rápida
          </button>
        </div>
      </div>

      {/* ── Key Institution Overview Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* INATEC */}
        <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-600 text-white">
              100% Gratuito
            </span>
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Educación Técnica (INATEC)</h3>
            <p className="text-xs font-bold text-blue-700 mt-0.5">Técnico General y Especialista</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Formación acelerada de 1.5 a 2 años con 70% de práctica en talleres y laboratorios reales. Cero costos y rápida contratación en empresas locales.
          </p>
          <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Centros en los 17 departamentos</span>
          </div>
        </div>

        {/* SETEC */}
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-600 text-white">
              Pública Gratuita
            </span>
            <GraduationCap className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Universidades SETEC</h3>
            <p className="text-xs font-bold text-emerald-700 mt-0.5">UNAN, UNI, UNA, FAREM, UNICAM</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Carreras de 4 a 5 años con titulación de grado (Licenciatura / Ingeniería). Formación científica profunda e investigación académica.
          </p>
          <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sedes departamentales y Universidad en el Campo</span>
          </div>
        </div>

        {/* Ruta Progresiva */}
        <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-purple-600 text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ruta Flexible
            </span>
            <Layers className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Ruta Progresiva (Combinada)</h3>
            <p className="text-xs font-bold text-purple-700 mt-0.5">Técnico + Universidad Sabatina</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Terminas tu técnico en 1.5 años, comienzas a ganar tu propio salario y financias tus estudios superiores universitarios trabajando de lunes a viernes.
          </p>
          <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Máxima autonomía y cero deudas</span>
          </div>
        </div>
      </div>

      {/* ── Side-by-side Comparison Matrix Table ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Matriz Comparativa Detallada
          </h4>
          <span className="text-xs font-bold text-slate-500">Datos actualizados 2025</span>
        </div>

        <div className="overflow-x-auto no-scrollbar sm:overflow-visible">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/60 font-black text-slate-700">
                <th className="p-4 w-1/4">Criterio de Decisión</th>
                <th className="p-4 w-1/4 text-blue-900 bg-blue-50/50">Técnico INATEC</th>
                <th className="p-4 w-1/4 text-emerald-900 bg-emerald-50/50">Universidad SETEC</th>
                <th className="p-4 w-1/4 text-purple-900 bg-purple-50/50">Ruta Progresiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-extrabold text-slate-800">
                    {row.feature}
                  </td>
                  <td className="p-4 font-medium text-slate-700 bg-blue-50/20">
                    {row.inatec}
                  </td>
                  <td className="p-4 font-medium text-slate-700 bg-emerald-50/20">
                    {row.setec}
                  </td>
                  <td className="p-4 font-medium text-purple-900 bg-purple-50/20 font-semibold">
                    {row.progresiva}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
