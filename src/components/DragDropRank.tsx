import React, { useState } from 'react';
import type { RankingOption } from '../data/questions';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

interface DragDropRankProps {
  options: RankingOption[];
  onChange: (orderedOptions: RankingOption[]) => void;
}

export const DragDropRank: React.FC<DragDropRankProps> = ({ options, onChange }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= options.length) return;
    const updatedOptions = [...options];
    const [movedItem] = updatedOptions.splice(fromIndex, 1);
    updatedOptions.splice(toIndex, 0, movedItem);
    onChange(updatedOptions);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {options.map((option, idx) => (
        <div
          key={option.category}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 p-4 rounded-xl border bg-white select-none transition-all cursor-grab active:cursor-grabbing ${
            draggedIndex === idx
              ? 'border-blue-500 bg-blue-50/50 shadow-md opacity-50 scale-[0.99]'
              : 'border-slate-200 hover:border-slate-350 hover:shadow-sm'
          }`}
        >
          {/* Drag Handle (Desktop) */}
          <div className="text-slate-400 cursor-grab hover:text-slate-600 hidden sm:block">
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Preference Rank Number */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm">
            {idx + 1}
          </div>

          {/* Option Text */}
          <div className="flex-1 text-sm text-slate-700 font-medium leading-relaxed">
            {option.text}
          </div>

          {/* Reordering Controls (Mobile-Friendly & Accessible) */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => moveItem(idx, idx - 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-colors"
              title="Mover arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={idx === options.length - 1}
              onClick={() => moveItem(idx, idx + 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-colors"
              title="Mover abajo"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <div className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-wider mt-1.5">
        Arrastra las tarjetas o presiona las flechas para ordenarlas. Tus favoritas arriba.
      </div>
    </div>
  );
};
