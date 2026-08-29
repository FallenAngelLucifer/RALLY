import React, { useEffect, useState } from 'react';
import { IndexedDBService, type EducationalOffer } from '../services/indexedDB';
import { PDFGeneratorService } from '../services/pdfGenerator';
import { MACRO_SECTORS, calculateSectorAffinities } from '../data/sectors';
import { ComparadorTrayectorias } from './ComparadorTrayectorias';
import { ModuloFamilia } from './ModuloFamilia';
import { DirectorioCarreras } from './DirectorioCarreras';
import { AjustePerfil } from './AjustePerfil';
import {
  Download,
  RefreshCw,
  MapPin,
  Compass,
  Cpu,
  Sprout,
  HeartPulse,
  Wrench,
  TrendingUp,
  Palette,
  Layers,
  Scale,
  HeartHandshake,
  Sparkles,
  SlidersHorizontal,
  Info,
  ChevronRight,
  School,
  CheckCircle2
} from 'lucide-react';

interface DashboardPanoramicoProps {
  initialScores: Record<string, number>;
  department: string;
  municipality: string;
  primarySectorId?: string;
  preferredTrajectory?: 'tecnica' | 'universitaria' | 'progresiva' | 'emprendimiento';
  onReset: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Sprout,
  HeartPulse,
  Wrench,
  TrendingUp,
  Palette
};

// Nearest campus per department
const NEAREST_CAMPUS: Record<string, { inatec: { name: string; address: string; focus: string }; cnu: { name: string; address: string; focus: string } }> = {
  'Managua': {
    inatec: { name: 'Centro Tecnológico Manuel Olivares', address: 'Frente a Plaza Inter, Managua', focus: 'Computación, Programación, Administración, Contabilidad' },
    cnu: { name: 'UNAN-Managua / UNI / UNA', address: 'Rotonda Universitaria, Managua', focus: 'Ingenierías, Medicina, Ciencias Económicas, Humanidades' }
  },
  'León': {
    inatec: { name: 'Centro Tecnológico Juan de Dios Muñoz', address: 'Costado oeste de la Iglesia La Merced, León', focus: 'Administración, Hotelería, Computación, Electricidad' },
    cnu: { name: 'UNAN-León', address: 'Costado Norte del Parque Central, León', focus: 'Medicina, Derecho, Química Farmacéutica, Odontología' }
  },
  'Estelí': {
    inatec: { name: 'Centro Tecnológico de Estelí', address: 'Salida sur de Estelí, Km 148', focus: 'Mecánica, Electricidad, Construcción, Agroindustria' },
    cnu: { name: 'FAREM-Estelí (UNAN)', address: 'Km 167 Carretera Panamericana, Estelí', focus: 'Agronomía, Ciencias Económicas, Educación, Sistemas' }
  },
  'Matagalpa': {
    inatec: { name: 'Centro Tecnológico Monimbó Heroico / Matagalpa', address: 'Matagalpa, salida a Jinotega', focus: 'Agropecuaria, Zootecnia, Café, Administración' },
    cnu: { name: 'FAREM-Matagalpa (UNAN)', address: 'Frente al estadio Chale Solís, Matagalpa', focus: 'Agropecuaria, Enfermería, Pedagogía, Sistemas' }
  },
  'Chinandega': {
    inatec: { name: 'Centro Tecnológico Padre Teodoro Kint', address: 'El Viejo, Chinandega', focus: 'Mecánica Industrial, Electricidad, Soldadura, Motores' },
    cnu: { name: 'FAREM-Chinandega (UNAN)', address: 'Casco urbano, Chinandega', focus: 'Ingeniería Química, Administración, Agroindustria' }
  },
  'Masaya': {
    inatec: { name: 'Centro Tecnológico de Masaya', address: 'Barrio San Miguel, Masaya', focus: 'Artesanías, Cuero y Calzado, Confección, Computación' },
    cnu: { name: 'Universidad Nacional Multidisciplinaria Ricardo Morales Avilés', address: 'Masaya', focus: 'Educación, Administración, Salud' }
  },
  'Granada': {
    inatec: { name: 'Centro Tecnológico Pedro Aráuz Palacios', address: 'Frente al Parque Central, Granada', focus: 'Hotelería, Turismo Sostenible, Gastronomía, Idiomas' },
    cnu: { name: 'UNAN-Managua / Sede Granada', address: 'Granada', focus: 'Ciencias de la Educación, Administración' }
  },
  'Carazo': {
    inatec: { name: 'Centro Tecnológico Ernst Thalmann', address: 'Jinotepe, Carazo', focus: 'Mecánica Automotriz, Electricidad, Topografía' },
    cnu: { name: 'FAREM-Carazo (UNAN)', address: 'Jinotepe, Carazo', focus: 'Ciencias Económicas, Educación, Ingeniería en Sistemas' }
  },
  'Rivas': {
    inatec: { name: 'Centro Tecnológico Gaspar García Laviana', address: 'Rivas, casco urbano', focus: 'Hotelería, Turismo, Pesca, Mecánica' },
    cnu: { name: 'UNAN-Managua / Extensión Rivas', address: 'Rivas', focus: 'Turismo Sostenible, Administración, Educación' }
  },
  'Chontales': {
    inatec: { name: 'Centro Tecnológico Germán Pomares Ordóñez', address: 'Juigalpa, Chontales', focus: 'Veterinaria, Zootecnia, Lácteos, Agropecuaria' },
    cnu: { name: 'FAREM-Chontales (UNAN)', address: 'Juigalpa, Chontales', focus: 'Zootecnia, Medicina Veterinaria, Agronomía, Derecho' }
  },
  'Boaco': {
    inatec: { name: 'Centro Tecnológico de Boaco', address: 'Boaco, casco urbano', focus: 'Agropecuaria, Mecánica, Electricidad, Computación' },
    cnu: { name: 'FAREM-Chontales / Extensión Boaco', address: 'Boaco', focus: 'Educación, Agropecuaria, Administración' }
  },
  'Jinotega': {
    inatec: { name: 'Centro Tecnológico de Jinotega', address: 'Jinotega, salida a San Rafael del Norte', focus: 'Caficultora, Catación de Café, Riego, Agroindustria' },
    cnu: { name: 'FAREM-Matagalpa / Extensión Jinotega', address: 'Jinotega', focus: 'Agronomía, Educación, Sistemas' }
  },
  'Madriz': {
    inatec: { name: 'Centro Tecnológico de Somoto', address: 'Somoto, Madriz', focus: 'Construcción, Electricidad, Computación, Gastronomía' },
    cnu: { name: 'FAREM-Estelí / Extensión Somoto', address: 'Somoto', focus: 'Educación, Agropecuaria, Administración' }
  },
  'Nueva Segovia': {
    inatec: { name: 'Centro Tecnológico de Ocotal', address: 'Ocotal, Nueva Segovia', focus: 'Mecánica, Electricidad, Agroindustria del Café, Madera' },
    cnu: { name: 'FAREM-Estelí / Extensión Ocotal', address: 'Ocotal', focus: 'Agronomía, Educación, Administración' }
  },
  'Río San Juan': {
    inatec: { name: 'Centro Tecnológico de San Carlos', address: 'San Carlos, Río San Juan', focus: 'Pesca, Guía Turístico, Mecánica Náutica, Computación' },
    cnu: { name: 'UNAN-Managua / Sede San Carlos', address: 'San Carlos', focus: 'Recursos Naturales, Turismo Sostenible, Educación' }
  },
  'RACCS': {
    inatec: { name: 'Centro Tecnológico de Bluefields', address: 'Bluefields, RACCS', focus: 'Pesca y Acuicultura, Mecánica Naval, Hotelería, Computación' },
    cnu: { name: 'URACCAN / BICU Bluefields', address: 'Bluefields, RACCS', focus: 'Recursos Naturales, Enfermería Intercultural, Sociología' }
  },
  'RACCN': {
    inatec: { name: 'Centro Tecnológico Héroes y Mártires de Puerto Cabezas', address: 'Bilwi (Puerto Cabezas), RACCN', focus: 'Mecánica Naval, Electricidad, Computación, Carpintería' },
    cnu: { name: 'URACCAN / BICU Las Minas / Bilwi', address: 'Siuna / Bilwi', focus: 'Agroforestería, Enfermería Intercultural, Administración' }
  }
};

export const DashboardPanoramico: React.FC<DashboardPanoramicoProps> = ({
  initialScores,
  department,
  municipality,
  primarySectorId = 'agro_recursos',
  preferredTrajectory = 'progresiva',
  onReset
}) => {
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [selectedSectorId, setSelectedSectorId] = useState<string>(primarySectorId);
  const [activeTab, setActiveTab] = useState<'panoramica' | 'comparador' | 'familia' | 'simulador' | 'ajustes'>('panoramica');
  const [offers, setOffers] = useState<(EducationalOffer & { matchScore: number })[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  // Calculate affinities for all 6 sectors
  const sectorAffinities = calculateSectorAffinities(scores);

  // Compute Holland Code
  const getHollandCode = (): string => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k)
      .join('');
  };

  const hollandCode = getHollandCode();
  const selectedSector = MACRO_SECTORS.find((s) => s.id === selectedSectorId) || MACRO_SECTORS[0];

  // Load recommendations from IndexedDB
  useEffect(() => {
    let isMounted = true;

    async function fetchOffers() {
      try {
        await IndexedDBService.init();
        const res = await IndexedDBService.searchOffers({
          departamento: department,
          municipio: municipality,
          riasecWeights: scores
        });
        if (isMounted) {
          setOffers(res);
          setLoadingOffers(false);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
        if (isMounted) {
          setLoadingOffers(false);
        }
      }
    }

    fetchOffers();

    return () => {
      isMounted = false;
    };
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

  const nearest = NEAREST_CAMPUS[department] || NEAREST_CAMPUS['Managua'];

  return (
    <div className="w-full space-y-7 max-w-6xl mx-auto pb-12">
      {/* ── Top Header Hero ── */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-800/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <MapPin className="w-3.5 h-3.5" /> {department}, {municipality}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Compass className="w-3.5 h-3.5" /> Código Holland: {hollandCode}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" /> Ruta Preferida: {preferredTrajectory.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Panorama Vocacional & Oportunidades de Futuro
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explora de lo general a lo específico: conoce los 6 grandes sectores productivos, compara trayectorias técnicas y universitarias de forma imparcial, y toma el control de tu camino.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportPDF}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Pasaporte PDF</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs sm:text-sm border border-white/20 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reiniciar Brújula</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('panoramica')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'panoramica'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Panorama de Sectores</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparador')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'comparador'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>2. Comparador Imparcial (INATEC vs CNU)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('familia')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'familia'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>3. Pórtico Familiar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulador')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'simulador'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. Simulador "¿Qué pasaría si...?"</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ajustes')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'ajustes'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>5. Ajustes RIASEC</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: Panorama & Explorador de Sectores ── */}
      {activeTab === 'panoramica' && (
        <div className="space-y-7">
          {/* 6 Macro-Sectors Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Visión 360°: Los 6 Macro-Sectores del País
                </h2>
                <p className="text-xs text-slate-500">
                  Toca cualquier sector para hacer zoom y explorar sus ramas, carreras y oferta territorial disponible.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MACRO_SECTORS.map((sector) => {
                const affinity = sectorAffinities[sector.id] || 50;
                const isSelected = selectedSectorId === sector.id;
                const IconComponent = ICON_MAP[sector.iconName] || Compass;

                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setSelectedSectorId(sector.id)}
                    className={`text-left p-5 rounded-3xl border-2 transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-600 bg-white shadow-lg ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${sector.colorClass.bg} ${sector.colorClass.text}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full ${sector.colorClass.badgeBg} ${sector.colorClass.badgeText}`}>
                          {affinity}% Afinidad
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                          {sector.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {sector.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {/* Affinity Bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${sector.colorClass.gradient}`}
                          style={{ width: `${affinity}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-600">
                        <span className="truncate max-w-[170px]">
                          Demanda: <strong className="text-slate-800">{sector.territorialDemand.level}</strong>
                        </span>
                        <span className={`flex items-center gap-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                          {isSelected ? 'Explorando' : 'Ver ramas'} <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Deep Dive: Selected Sector Branches & Offerings ── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700">
                  Profundizando en: {selectedSector.shortName}
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedSector.name}
                </h3>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  {selectedSector.description}
                </p>
              </div>

              {/* Territorial Demand badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1 sm:max-w-xs shrink-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Demanda en {department}:
                </span>
                <p className="text-xs font-extrabold text-slate-800">
                  {selectedSector.territorialDemand.level}
                </p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedSector.territorialDemand.contextNote}
                </p>
              </div>
            </div>

            {/* Sub-branches Cards */}
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Ramas de Especialización en este Sector
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSector.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-blue-300 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-black text-slate-900">{branch.name}</h5>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          Holland: {branch.riasecCodes}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {branch.description}
                      </p>
                    </div>

                    {/* Pathways side by side in the card */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                      {/* INATEC */}
                      {branch.inatecOptions.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                            ⚡ Ruta Técnica (INATEC):
                          </span>
                          <ul className="space-y-0.5 pl-3 border-l-2 border-blue-400">
                            {branch.inatecOptions.map((opt, i) => (
                              <li key={i} className="text-[11.5px] font-bold text-slate-700">
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* University */}
                      {branch.universityOptions.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                            🎓 Ruta Universitaria (CNU):
                          </span>
                          <ul className="space-y-0.5 pl-3 border-l-2 border-emerald-400">
                            {branch.universityOptions.map((opt, i) => (
                              <li key={i} className="text-[11.5px] font-bold text-slate-700">
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Career Opportunities */}
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Puestos y roles de trabajo:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {branch.careerOpportunities.map((c, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entrepreneurship Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-amber-950 block">
                  Potencial de Emprendimiento en {department}:
                </strong>
                <p className="mt-0.5 leading-relaxed">
                  {selectedSector.entrepreneurshipPotential}
                </p>
              </div>
            </div>
          </div>

          {/* ── Nearest Campus Cards in Department ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* INATEC Campus */}
            <div className="bg-blue-900 text-white rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">
                  Centro Tecnológico INATEC en {department}
                </span>
                <h4 className="text-lg font-black text-white">{nearest.inatec.name}</h4>
                <p className="text-xs text-blue-200">{nearest.inatec.address}</p>
              </div>
              <div className="pt-3 border-t border-blue-800/80 text-xs text-blue-100">
                <strong className="text-white block font-bold mb-0.5">Especialidades destacadas:</strong>
                {nearest.inatec.focus}
              </div>
            </div>

            {/* CNU University Campus */}
            <div className="bg-emerald-900 text-white rounded-3xl p-6 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  Recinto Universitario CNU en {department}
                </span>
                <h4 className="text-lg font-black text-white">{nearest.cnu.name}</h4>
                <p className="text-xs text-emerald-200">{nearest.cnu.address}</p>
              </div>
              <div className="pt-3 border-t border-emerald-800/80 text-xs text-emerald-100">
                <strong className="text-white block font-bold mb-0.5">Facultades destacadas:</strong>
                {nearest.cnu.focus}
              </div>
            </div>
          </div>

          {/* ── Academic Directory Table / Filter ── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                Catálogo de Carreras y Centros en {department}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Oferta académica oficial de INATEC y Universidades del CNU ordenadas por afinidad con tus decisiones.
              </p>
            </div>

            {loadingOffers ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-500 font-bold">Cargando catálogo territorial...</span>
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
      )}

      {/* ── TAB 2: Comparador Imparcial ── */}
      {activeTab === 'comparador' && (
        <ComparadorTrayectorias selectedSectorName={selectedSector.name} />
      )}

      {/* ── TAB 3: Módulo Familiar ── */}
      {activeTab === 'familia' && (
        <ModuloFamilia department={department} />
      )}

      {/* ── TAB 4: Simulador "¿Qué pasaría si...?" ── */}
      {activeTab === 'simulador' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-100">
              <Sparkles className="w-3.5 h-3.5" /> Simulador de Escenarios de Vida
            </div>
            <h3 className="text-xl font-black text-slate-900">
              ¿Qué pasaría si elijo distintos caminos?
            </h3>
            <p className="text-xs text-slate-500">
              Visualiza cómo cambian tus tiempos, costos y oportunidades según la decisión que tomes hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Escenario 1 */}
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-200 p-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600 text-white">
                Escenario A
              </span>
              <h4 className="text-base font-black text-slate-900">
                Técnico INATEC Inmediato (1.5 años)
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>A los 18-19 años ya tienes título técnico oficial y experiencia laboral.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Cero deudas para tu familia y pasantías directas con empresas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Posibilidad de continuar a la universidad trabajando los fines de semana.</span>
                </li>
              </ul>
            </div>

            {/* Escenario 2 */}
            <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-200 p-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                Escenario B
              </span>
              <h4 className="text-base font-black text-slate-900">
                Carrera Universitaria de Grado (5 años)
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Formación científica profunda, titulación de ingeniería/licenciatura.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Aspiración directa a cargos gerenciales, investigación y docencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Requiere mayor compromiso de tiempo y apoyo familiar por 5 años.</span>
                </li>
              </ul>
            </div>

            {/* Escenario 3 */}
            <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-purple-200 p-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-600 text-white">
                Escenario C
              </span>
              <h4 className="text-base font-black text-slate-900">
                Técnico + Emprendimiento Propio
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Aprender un oficio especializado (solar, refrigeración, software, agro).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Montar tu propio taller o negocio en tu municipio y ser tu propio jefe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Generación de empleo para otros jóvenes de tu comunidad.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: Ajustes RIASEC y Glosario ── */}
      {activeTab === 'ajustes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              Tu Código Holland Actual: <span className="text-blue-600">{hollandCode}</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              El modelo RIASEC evalúa 6 dimensiones de personalidad vocacional. A continuación puedes calibrar manualmente las ponderaciones si deseas probar otros perfiles.
            </p>
            <AjustePerfil scores={scores} onChange={(updated) => setScores(updated)} />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Glosario de las 6 Dimensiones
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">R - Realista:</strong>
                <p className="text-slate-500 mt-0.5">Trabajo con herramientas, máquinas, animales, suelo y actividades al aire libre.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">I - Investigador:</strong>
                <p className="text-slate-500 mt-0.5">Análisis científico, resolución matemática de problemas, algoritmos y biología.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">A - Artístico:</strong>
                <p className="text-slate-500 mt-0.5">Diseño gráfico, artes visuales, escritura creativa, música y creación multimedia.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">S - Social:</strong>
                <p className="text-slate-500 mt-0.5">Enseñanza, atención de salud, acompañamiento psicológico y desarrollo comunitario.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">E - Emprendedor:</strong>
                <p className="text-slate-500 mt-0.5">Liderazgo de negocios, ventas, oratoria, negociación y gestión de proyectos.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-800 font-bold block">C - Convencional:</strong>
                <p className="text-slate-500 mt-0.5">Contabilidad, auditoría, logística de inventarios, gestión documental y normas.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
