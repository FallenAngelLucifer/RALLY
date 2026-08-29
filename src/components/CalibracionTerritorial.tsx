import React, { useEffect, useState } from 'react';
import { IndexedDBService } from '../services/indexedDB';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { NICARAGUA_PATHS } from '../data/nicaraguaMap';
import { RumboLogo } from './RumboLogo';

interface CalibracionTerritorialProps {
  onComplete: (data: { department: string; municipality: string }) => void;
}

const MUNICIPALITIES: Record<string, string[]> = {
  'Managua':       ['Managua', 'Ciudad Sandino', 'Tipitapa', 'San Rafael del Sur', 'Mateare'],
  'León':          ['León', 'Nagarote', 'La Paz Centro', 'Chinandega'],
  'Estelí':        ['Estelí', 'Condega', 'La Trinidad', 'San Juan de Limay'],
  'Carazo':        ['Jinotepe', 'Diriamba', 'San Marcos', 'La Conquista'],
  'Matagalpa':     ['Matagalpa', 'Jinotega', 'San Ramón', 'Sébaco', 'Terrabona'],
  'Chontales':     ['Juigalpa', 'Santo Tomás', 'La Libertad', 'San Pedro de Lóvago'],
  'Chinandega':    ['Chinandega', 'Chichigalpa', 'El Viejo', 'Corinto', 'Posoltega'],
  'Granada':       ['Granada', 'Nandaime', 'Diriomo', 'Diría'],
  'RACCS':         ['Bluefields', 'Nueva Guinea', 'El Rama', 'Corn Island'],
  'RACCN':         ['Puerto Cabezas', 'Rosita', 'Bonanza', 'Siuna', 'Waslala'],
  'Rivas':         ['Rivas', 'San Juan del Sur', 'Tola', 'Cárdenas'],
  'Masaya':        ['Masaya', 'Nindirí', 'Tisma', 'La Concepción'],
  'Boaco':         ['Boaco', 'Camoapa', 'San Lorenzo', 'Santa Lucía'],
  'Jinotega':      ['Jinotega', 'La Concordia', 'San Rafael del Norte', 'El Cuá'],
  'Madriz':        ['Somoto', 'Palacagüina', 'Telpaneca', 'San Lucas'],
  'Nueva Segovia': ['Ocotal', 'Jalapa', 'Mozonte', 'Quilalí'],
  'Río San Juan':  ['San Carlos', 'El Castillo', 'San Miguelito', 'Los Chiles'],
};

// ── Loader ────────────────────────────────────────────────────────────────────
const Loader = () => (
  <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
      <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
    </div>
    <p className="text-sm font-bold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>
      Cargando...
    </p>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export const CalibracionTerritorial: React.FC<CalibracionTerritorialProps> = ({ onComplete }) => {
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedMuni, setSelectedMuni] = useState('');
  const [hoveredDept, setHoveredDept] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    IndexedDBService.init()
      .then(() => setTimeout(() => setLoading(false), 600))
      .catch(() => setTimeout(() => setLoading(false), 600));
  }, []);

  const handleDeptSelect = (dept: string) => {
    if (!dept) return;
    setSelectedDept(dept);
    setSelectedMuni('');

    IndexedDBService.getMunicipalities(dept)
      .then((munis) => setMunicipalities(munis.length ? munis : MUNICIPALITIES[dept] || [dept]))
      .catch(() => setMunicipalities(MUNICIPALITIES[dept] || [dept]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDept && selectedMuni) {
      onComplete({ department: selectedDept, municipality: selectedMuni });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col gap-5 pb-6 max-w-4xl mx-auto">
      {/* ── RUMBO Brand Header Banner ── */}
      <div className="bg-gradient-to-br from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-6 sm:p-7 text-center shadow-lg border border-[#0057FF]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0057FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-3">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-md border border-white/20">
            <RumboLogo variant="full" size="lg" />
          </div>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-medium leading-relaxed">
            Plataforma Integral de Orientación Vocacional · Sistema Educativo Nacional (MINED · INATEC · CNU)
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C2FF]/20 text-[#00F0FF] text-[10px] font-black uppercase tracking-wider border border-[#00C2FF]/40">
            <Sparkles className="w-3.5 h-3.5" /> Paso 1: Calibra tu Territorio
          </div>
        </div>
      </div>

      {/* ── Map card ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span
            className="text-[11px] text-slate-500 uppercase tracking-widest font-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Mapa de Nicaragua
          </span>
          <span className="text-xs font-extrabold text-[#0057FF] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {hoveredDept || (selectedDept ? `${selectedDept}` : 'Toca tu departamento')}
          </span>
        </div>

        <div className="p-4 bg-gradient-to-b from-[#F0F8FF] to-white">
          <div className="w-full max-w-xl mx-auto" style={{ aspectRatio: '595/529' }}>
            <svg
              viewBox="35 0 565 535"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g>
                {[...NICARAGUA_PATHS]
                  .sort((a, b) => {
                    const aS = selectedDept === a.name ? 1 : 0;
                    const bS = selectedDept === b.name ? 1 : 0;
                    return aS - bS;
                  })
                  .map((dept) => {
                    const isSel = selectedDept === dept.name;
                    const isHov = hoveredDept === dept.name;

                    const fill = isSel ? '#0057FF' : isHov ? '#7FD5FE' : '#DCEEFE';
                    const stroke = isSel ? '#001B48' : '#0057FF';
                    const sw = isSel ? 3 : 1.5;

                    return (
                      <path
                        key={dept.id}
                        d={dept.d}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={sw}
                        style={{ cursor: 'pointer', transition: 'fill 0.15s, stroke-width 0.15s' }}
                        onClick={() => handleDeptSelect(dept.name)}
                        onMouseEnter={() => setHoveredDept(dept.name)}
                        onMouseLeave={() => setHoveredDept('')}
                      />
                    );
                  })}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="space-y-1 border-b border-slate-100 pb-3">
          <h3 className="text-sm font-black text-[#001B48] uppercase tracking-wider">
            Confirma tu Ubicación
          </h3>
          <p className="text-xs text-slate-500">
            Los resultados de carreras de INATEC y Universidades se adaptarán a la oferta disponible en tu departamento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Department */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
              Departamento
            </label>
            <select
              value={selectedDept}
              onChange={(e) => handleDeptSelect(e.target.value)}
              className="w-full h-12 px-3 text-xs font-bold border-2 border-slate-200 rounded-2xl bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0057FF] transition"
            >
              <option value="">Selecciona tu departamento...</option>
              {NICARAGUA_PATHS.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Municipality */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
              Municipio
            </label>
            <select
              value={selectedMuni}
              onChange={(e) => setSelectedMuni(e.target.value)}
              disabled={!selectedDept || municipalities.length === 0}
              required
              className="w-full h-12 px-3 text-xs font-bold border-2 border-slate-200 rounded-2xl bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0057FF] disabled:bg-slate-100 disabled:text-slate-400 transition"
            >
              <option value="">{selectedDept ? 'Selecciona tu municipio...' : 'Primero elige departamento'}</option>
              {municipalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={!selectedDept || !selectedMuni}
          className="w-full h-12 bg-gradient-to-r from-[#0048BA] via-[#0057FF] to-[#00C2FF] hover:opacity-95 active:scale-[0.99] disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white text-xs sm:text-sm font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0057FF]/25 disabled:shadow-none"
        >
          <span>Iniciar Evaluación Vocacional</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
