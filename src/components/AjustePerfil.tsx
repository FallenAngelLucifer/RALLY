import React from 'react';

interface AjustePerfilProps {
  scores: Record<string, number>;
  onChange: (updatedScores: Record<string, number>) => void;
}

const CATEGORY_DETAILS: Record<string, { name: string; color: string; label: string }> = {
  R: { name: 'Realista', color: 'bg-emerald-600 border-emerald-200 text-emerald-800 bg-emerald-50', label: 'Trabajo práctico, manual y al aire libre' },
  I: { name: 'Investigador', color: 'bg-indigo-600 border-indigo-200 text-indigo-800 bg-indigo-50', label: 'Análisis, ciencias y resolución lógica' },
  A: { name: 'Artístico', color: 'bg-purple-600 border-purple-200 text-purple-800 bg-purple-50', label: 'Expresión, diseño, música y creatividad' },
  S: { name: 'Social', color: 'bg-rose-600 border-rose-200 text-rose-800 bg-rose-50', label: 'Educación, ayuda a otros y voluntariado' },
  E: { name: 'Emprendedor', color: 'bg-amber-600 border-amber-200 text-amber-800 bg-amber-50', label: 'Negocios, liderazgo y persuasión' },
  C: { name: 'Convencional', color: 'bg-slate-600 border-slate-200 text-slate-800 bg-slate-50', label: 'Organización, contabilidad y orden' }
};

export const AjustePerfil: React.FC<AjustePerfilProps> = ({ scores, onChange }) => {
  const handleSliderChange = (category: string, value: number) => {
    const updated = {
      ...scores,
      [category]: value
    };
    onChange(updated);
  };

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-slate-800">Ajuste Alternativo de Pesos</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          ¿Sientes que el test no capturó del todo alguna de tus habilidades? Ajusta manualmente los porcentajes de cada vector de Holland y observa cómo cambian tus carreras sugeridas al instante.
        </p>
      </div>

      <div className="space-y-3.5 mt-2">
        {Object.entries(scores).map(([category, value]) => {
          const detail = CATEGORY_DETAILS[category];
          
          return (
            <div key={category} className="space-y-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${detail.color}`}>
                    {category}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{detail.name}</span>
                </div>
                <span className="text-xs font-extrabold text-[#5a7e68]">{value}%</span>
              </div>
              
              <p className="text-[10px] text-slate-400 font-medium">{detail.label}</p>

              <div className="flex items-center gap-3 mt-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleSliderChange(category, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5a7e68]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
