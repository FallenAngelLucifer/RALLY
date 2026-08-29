import React, { useState } from 'react';
import type { EducationalOffer } from '../services/indexedDB';
import { Filter, ExternalLink, School, BookOpen, MapPin } from 'lucide-react';

interface DirectorioCarrerasProps {
  offers: (EducationalOffer & { matchScore: number })[];
  selectedDepartment: string;
  selectedMunicipality: string;
}

export const DirectorioCarreras: React.FC<DirectorioCarrerasProps> = ({
  offers,
  selectedDepartment,
  selectedMunicipality
}) => {
  const [filterTipo, setFilterTipo] = useState('Todos');
  const [filterModality, setFilterModality] = useState('Todos');
  const [filterGrado, setFilterGrado] = useState('Todos');

  // Perform client-side sub-filtering on the already scored and geo-filtered offers
  const filteredOffers = offers.filter((o) => {
    const matchesTipo = filterTipo === 'Todos' || o.tipo === filterTipo;
    const matchesModality = filterModality === 'Todos' || o.modalidad.includes(filterModality);
    const matchesGrado = filterGrado === 'Todos' || o.grado === filterGrado;
    return matchesTipo && matchesModality && matchesGrado;
  });

  return (
    <div className="space-y-6">
      {/* Search Filter Tools */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Filter className="w-4.5 h-4.5 text-blue-600" />
          Filtros de Búsqueda Académica
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Institution Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tipo de Centro
            </label>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full h-10 px-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos los centros</option>
              <option value="Pública">Universidad Pública</option>
              <option value="Privada">Universidad Privada</option>
              <option value="INATEC">Educación Técnica (INATEC)</option>
            </select>
          </div>

          {/* Modality Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Modalidad de Estudio
            </label>
            <select
              value={filterModality}
              onChange={(e) => setFilterModality(e.target.value)}
              className="w-full h-10 px-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Cualquier modalidad</option>
              <option value="Presencial">Presencial (Diurno/Nocturno)</option>
              <option value="Sabatino">Sabatino</option>
              <option value="Por Encuentros">Por Encuentros</option>
              <option value="Virtual">Virtual / Online</option>
            </select>
          </div>

          {/* Academic Degree Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Nivel de Grado
            </label>
            <select
              value={filterGrado}
              onChange={(e) => setFilterGrado(e.target.value)}
              className="w-full h-10 px-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Cualquier nivel</option>
              <option value="Técnico General">Técnico General (INATEC)</option>
              <option value="Técnico Superior">Técnico Superior</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Ingeniería">Ingeniería</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-slate-500">
            Mostrando {filteredOffers.length} de {offers.length} ofertas encontradas
          </span>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 border-dashed p-10 text-center space-y-3">
            <School className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Sin coincidencias exactas</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              No encontramos carreras en {selectedMunicipality}, {selectedDepartment} con los filtros elegidos. Prueba seleccionando "Todos" en los filtros superiores o ajustando tu perfil psicométrico.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOffers.map((offer) => {
              // Set type badge color
              let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";
              if (offer.tipo === 'INATEC') {
                badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
              } else if (offer.tipo === 'Privada') {
                badgeStyle = "bg-[#fafdfa] text-[#3a5360] border-[#c0d0c4]";
              }

              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="space-y-3">
                    {/* Top Row: Match Score & Center Type */}
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#eaf0ec] text-[#3b5244] border border-[#d0dfd5]">
                        {offer.matchScore}% de afinidad
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${badgeStyle}`}>
                        {offer.tipo}
                      </span>
                    </div>

                    {/* Degree & Program Title */}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        {offer.grado}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                        {offer.carrera}
                      </h4>
                    </div>

                    {/* Institution and Campus Details */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-700">{offer.institucion}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>Sede: {offer.sede} ({offer.municipio})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>Modalidad: <strong className="text-slate-700">{offer.modalidad.join(', ')}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Syllabus External Link */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Holland: {offer.riasec_codes}
                    </span>
                    <a
                      href={offer.link_plan}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-[#5a7e68] transition-colors"
                    >
                      Plan de estudios <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
