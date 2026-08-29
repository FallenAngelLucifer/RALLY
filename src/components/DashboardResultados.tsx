import React, { useEffect, useState } from 'react';
import { IndexedDBService } from '../services/indexedDB';
import type { EducationalOffer } from '../services/indexedDB';
import { PDFGeneratorService } from '../services/pdfGenerator';
import { AjustePerfil } from './AjustePerfil';
import { DirectorioCarreras } from './DirectorioCarreras';
import { Download, RefreshCw, SlidersHorizontal, GraduationCap, MapPin, Info } from 'lucide-react';

// ── Nearest campus per department ─────────────────────────────────────────────
const NEAREST_CAMPUS: Record<string, { name: string; type: string; address: string; specialty: string }> = {
  'Managua':       { name: 'UNAN-Managua', type: 'Universidad Pública', address: 'Rotonda Universitaria, Managua', specialty: 'Ciencias, Ingeniería, Humanidades, Educación' },
  'León':          { name: 'UNAN-León', type: 'Universidad Pública', address: 'Frente al Parque La Merced, León', specialty: 'Medicina, Química, Derecho, Odontología' },
  'Estelí':        { name: 'FAREM-Estelí (UNAN)', type: 'Universidad Pública', address: 'Km 167 Carretera Panamericana, Estelí', specialty: 'Educación, Agronomía, Ciencias Económicas' },
  'Carazo':        { name: 'FAREM-Carazo (UNAN)', type: 'Universidad Pública', address: 'Jinotepe, Carazo', specialty: 'Ciencias Económicas, Educación, Administración' },
  'Matagalpa':     { name: 'FAREM-Matagalpa (UNAN)', type: 'Universidad Pública', address: 'Matagalpa, frente al estadio', specialty: 'Agropecuaria, Sistemas, Educación' },
  'Chontales':     { name: 'FAREM-Chontales (UNAN)', type: 'Universidad Pública', address: 'Juigalpa, Chontales', specialty: 'Zootecnia, Agropecuaria, Derecho' },
  'Chinandega':    { name: 'FAREM-Chinandega (UNAN)', type: 'Universidad Pública', address: 'Chinandega, casco urbano', specialty: 'Ingeniería Química, Administración' },
  'Granada':       { name: 'CT Pedro Aráuz Palacios (INATEC)', type: 'Instituto Técnico', address: 'Granada, frente al parque central', specialty: 'Hotelería, Gastronomía, Turismo' },
  'RACCS':         { name: 'URACCAN Bluefields', type: 'Universidad Comunitaria', address: 'Bluefields, RACCS', specialty: 'Recursos Naturales, Enfermería, Sociología' },
  'RACCN':         { name: 'URACCAN Las Minas', type: 'Universidad Comunitaria', address: 'Siuna, RACCN', specialty: 'Agroforestería, Enfermería, Administración' },
  'Rivas':         { name: 'CT Ernesto Che Guevara (INATEC)', type: 'Instituto Técnico', address: 'Rivas, casco urbano', specialty: 'Hotelería, Pesca, Mecánica' },
  'Masaya':        { name: 'CT Masaya (INATEC)', type: 'Instituto Técnico', address: 'Masaya, barrio San Miguel', specialty: 'Artesanía, Computación, Confección' },
  'Boaco':         { name: 'CT Boaco (INATEC)', type: 'Instituto Técnico', address: 'Boaco, casco urbano', specialty: 'Agropecuaria, Mecánica, Electricidad' },
  'Jinotega':      { name: 'FAREM-Matagalpa Ext. Jinotega', type: 'Universidad Pública', address: 'Jinotega, casco urbano', specialty: 'Agronomía, Educación, Sistemas' },
  'Madriz':        { name: 'CT Somoto (INATEC)', type: 'Instituto Técnico', address: 'Somoto, Madriz', specialty: 'Construcción, Electricidad, Computación' },
  'Nueva Segovia': { name: 'CT Ocotal (INATEC)', type: 'Instituto Técnico', address: 'Ocotal, Nueva Segovia', specialty: 'Mecánica, Electricidad, Agroindustria' },
  'Río San Juan':  { name: 'CT San Carlos (INATEC)', type: 'Instituto Técnico', address: 'San Carlos, Río San Juan', specialty: 'Pesca, Mecánica, Computación' },
};

interface DashboardResultadosProps {
  initialScores: Record<string, number>;
  department: string;
  municipality: string;
  onReset: () => void;
}

const CATEGORY_META: Record<string, { name: string; desc: string; bg: string; border: string; text: string }> = {
  R: {
    name: 'Realista (R)',
    desc: 'Personas prácticas que prefieren trabajar con objetos, herramientas, máquinas, animales o al aire libre.',
    bg: 'bg-rose-600',
    border: 'border-rose-500',
    text: 'text-rose-650'
  },
  I: {
    name: 'Investigador (I)',
    desc: 'Observadores y analíticos que prefieren investigar, experimentar, recopilar información y resolver problemas científicos.',
    bg: 'bg-cyan-600',
    border: 'border-cyan-500',
    text: 'text-cyan-650'
  },
  A: {
    name: 'Artístico (A)',
    desc: 'Creativos e imaginativos que prefieren la expresión personal, la escritura, el arte y actividades sin reglas rígidas.',
    bg: 'bg-fuchsia-600',
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-650'
  },
  S: {
    name: 'Social (S)',
    desc: 'Colaboradores y serviciales que disfrutan enseñar, curar, guiar, aconsejar y ayudar al bienestar de otras personas.',
    bg: 'bg-emerald-600',
    border: 'border-emerald-500',
    text: 'text-emerald-650'
  },
  E: {
    name: 'Emprendedor (E)',
    desc: 'Líderes y entusiastas orientados al alcance de metas, ventas, persuasión, toma de riesgos y gestión de negocios.',
    bg: 'bg-orange-500',
    border: 'border-orange-400',
    text: 'text-orange-650'
  },
  C: {
    name: 'Convencional (C)',
    desc: 'Organizados y ordenados que prefieren el procesamiento de datos, contabilidad, administración de expedientes y normas.',
    bg: 'bg-indigo-650',
    border: 'border-indigo-500',
    text: 'text-indigo-650'
  }
};

export const DashboardResultados: React.FC<DashboardResultadosProps> = ({
  initialScores,
  department,
  municipality,
  onReset
}) => {
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [offers, setOffers] = useState<(EducationalOffer & { matchScore: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAjustes, setShowAjustes] = useState(false);

  // Compute Holland code from active scores
  const getHollandCode = (): string => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => key)
      .join('');
  };

  const hollandCode = getHollandCode();

  // Load and score recommendations whenever scores change
  useEffect(() => {
    setLoading(true);
    IndexedDBService.init()
      .then(() =>
        IndexedDBService.searchOffers({
          departamento: department,
          municipio: municipality,
          riasecWeights: scores
        })
      )
      .then((res) => {
        setOffers(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading recommendations:', err);
        setLoading(false);
      });
  }, [scores, department, municipality]);

  const handleExportPDF = () => {
    PDFGeneratorService.generate(
      {
        department,
        municipality,
        riasecScores: scores,
        hollandCode
      },
      offers
    );
  };

  const topThree = hollandCode.split('');

  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      {/* Top Welcome Title Banner */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl border border-[#1e293b]/30 text-white p-4 shadow-sm flex flex-col gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1d4ed8]/20 text-blue-400 border border-blue-500/20">
            <MapPin className="w-3 h-3" /> {department}, {municipality}
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Tu Perfil Vocacional</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Aquí tienes los resultados detallados del test. Hemos cruzado tu perfil psicométrico con la base de datos para darte tu ruta recomendada.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-1.5 px-3 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl font-bold shadow transition-all text-xs flex-1"
          >
            <Download className="w-3.5 h-3.5" /> Ficha PDF
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 px-3 h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/20 transition-all text-xs flex-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Grid: Left Column RIASEC Profile / Right Column Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Holland Code & Visual Scores */}
        <div className="space-y-6 lg:col-span-1">
          {/* Holland Code Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Código Holland</span>
              <div className="text-5xl font-black text-slate-900 tracking-wider flex items-center justify-center gap-1.5">
                {topThree.map((char, index) => (
                  <span key={index} className="px-1 text-blue-600">{char}</span>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">Tus 3 afinidades ocupacionales predominantes</p>
            </div>

            {/* Score bars chart */}
            <div className="space-y-3 pt-2">
              {Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .map(([category, val]) => {
                  const meta = CATEGORY_META[category];
                  const isActive = hollandCode.includes(category);
                  
                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-full ${isActive ? meta.bg : 'bg-slate-400'} text-white text-[9px] font-black flex items-center justify-center flex-shrink-0`}>
                            {category}
                          </span>
                          {meta.name}
                        </span>
                        <span>{val}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isActive ? meta.bg : 'bg-slate-300'
                          }`}
                          style={{ width: `${val}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Toggle Manual Adjustments Button */}
          <button
            type="button"
            onClick={() => setShowAjustes(!showAjustes)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-350 transition-colors font-bold text-slate-800 text-xs uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              {showAjustes ? 'Ocultar Ajuste de Pesos' : 'Ajustar Pesos Manualmente'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">Alternativo</span>
          </button>

          {/* Manual Adjustments Sliders */}
          {showAjustes && (
            <AjustePerfil scores={scores} onChange={(updated) => setScores(updated)} />
          )}

          {/* Holland Concept Explanations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Info className="w-4 h-4 text-slate-400" /> Glosario de Perfil
            </h3>
            
            <div className="space-y-4">
              {topThree.map((char) => {
                const meta = CATEGORY_META[char];
                return (
                  <div key={char} className={`space-y-1.5 border-l-2 ${meta.border} pl-3`}>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full ${meta.bg} text-white text-[9px] font-black flex items-center justify-center flex-shrink-0`}>
                        {char}
                      </span>
                      {meta.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {meta.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Campus Suggestion + Recommendations Directory */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Nearest Campus Card ── */}
          {NEAREST_CAMPUS[department] && (() => {
            const c = NEAREST_CAMPUS[department];
            return (
              <div className="bg-blue-600 rounded-2xl p-5 shadow-sm text-white space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-200 shrink-0" />
                  <span
                    className="text-[10px] text-blue-200 uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    Centro recomendado en {department}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[17px] text-white leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
                  >
                    {c.name}
                  </p>
                  <p className="text-[11px] text-blue-200 font-semibold mt-0.5">{c.type}</p>
                </div>
                <div className="text-[11px] text-blue-100 font-medium space-y-0.5">
                  <p>{c.address}</p>
                  <p className="text-blue-200">{c.specialty}</p>
                </div>
              </div>
            );
          })()}

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600 animate-bounce" />
                Ruta Vocacional e Institucional en tu Territorio
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                A continuación se muestra el listado de recintos universitarios e INATEC en <strong className="text-slate-800">{department}</strong> que imparten carreras coincidentes con tu perfil, ordenados por nivel de afinidad.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-slate-500 font-semibold">Cruzando datos del perfil con la oferta nacional...</span>
              </div>
            ) : (
              <DirectorioCarreras
                offers={offers}
                selectedDepartment={department}
                selectedMunicipality={municipality}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
