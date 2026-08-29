import React from 'react';

interface ContrastSlidersProps {
  leftLabel: string;
  rightLabel: string;
  leftCategory: string;
  rightCategory: string;
  value: number; // 1 to 5
  onChange: (newValue: number) => void;
  description: string;
}

export const ContrastSliders: React.FC<ContrastSlidersProps> = ({
  leftLabel,
  rightLabel,
  value,
  onChange,
  description
}) => {
  return (
    <div className="space-y-6 py-2">
      <p className="text-sm text-slate-500 leading-relaxed text-center max-w-lg mx-auto">
        {description}
      </p>

      {/* Extreme Labels Bolding */}
      <div className="grid grid-cols-2 gap-4 text-center px-2">
        <div className={`transition-all duration-300 p-3 rounded-xl border ${
          value <= 2 
            ? 'border-blue-200 bg-blue-50 text-blue-700 font-bold scale-[1.02]' 
            : 'border-slate-100 bg-slate-50/50 text-slate-500 font-medium'
        }`}>
          <span className="text-xs uppercase tracking-wider block opacity-75 mb-0.5">Opción A</span>
          <span className="text-sm">{leftLabel}</span>
        </div>
        <div className={`transition-all duration-300 p-3 rounded-xl border ${
          value >= 4 
            ? 'border-blue-200 bg-blue-50 text-blue-700 font-bold scale-[1.02]' 
            : 'border-slate-100 bg-slate-50/50 text-slate-500 font-medium'
        }`}>
          <span className="text-xs uppercase tracking-wider block opacity-75 mb-0.5">Opción B</span>
          <span className="text-sm">{rightLabel}</span>
        </div>
      </div>

      {/* Slider Control */}
      <div className="px-6 space-y-3">
        <div className="relative flex items-center">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
          />
        </div>

        {/* Labels under slider - simplified to 3 to prevent mobile overlapping */}
        <div className="flex justify-between text-[9px] text-slate-400 font-bold px-1 uppercase tracking-wider">
          <span>Prefiero A</span>
          <span className={value === 3 ? 'text-blue-600 font-bold' : ''}>Neutral</span>
          <span>Prefiero B</span>
        </div>
      </div>

      {/* Visual Feedback Text */}
      <div className="text-center">
        <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
          {value === 3 
            ? "Indiferente / Ambos por igual" 
            : value < 3 
              ? `Afinidad hacia: ${leftLabel}` 
              : `Afinidad hacia: ${rightLabel}`}
        </span>
      </div>
    </div>
  );
};
