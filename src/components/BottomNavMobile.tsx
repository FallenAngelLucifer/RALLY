import React from 'react';
import { type AppModule } from './NavbarApp';
import {
  Compass,
  Search,
  Scale,
  Video,
  Menu,
  BookOpen,
  Users,
  Award
} from 'lucide-react';

interface BottomNavMobileProps {
  activeModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  onOpenDrawer: () => void;
}

export const BottomNavMobile: React.FC<BottomNavMobileProps> = ({
  activeModule,
  onSelectModule,
  onOpenDrawer
}) => {
  const isSecondaryActive = ['entender', 'conectar', 'decidir'].includes(activeModule);

  let secondaryLabel = 'Más';
  let SecondaryIcon = Menu;

  if (activeModule === 'entender') {
    secondaryLabel = 'Pensum';
    SecondaryIcon = BookOpen;
  } else if (activeModule === 'conectar') {
    secondaryLabel = 'Comunidad';
    SecondaryIcon = Users;
  } else if (activeModule === 'decidir') {
    secondaryLabel = 'Plan';
    SecondaryIcon = Award;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,27,72,0.08)] px-2 py-1 pb-[max(env(safe-area-inset-bottom),0.35rem)]">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {/* 1. Conóceme */}
        <button
          type="button"
          onClick={() => onSelectModule('conocerme')}
          className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition ${
            activeModule === 'conocerme'
              ? 'text-[#0057FF] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${
            activeModule === 'conocerme' ? 'bg-[#F0F8FF] text-[#0057FF]' : ''
          }`}>
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[9px] tracking-tight -mt-0.5">Conóceme</span>
        </button>

        {/* 2. Descubrir */}
        <button
          type="button"
          onClick={() => onSelectModule('descubrir')}
          className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition ${
            activeModule === 'descubrir'
              ? 'text-[#0057FF] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${
            activeModule === 'descubrir' ? 'bg-[#F0F8FF] text-[#0057FF]' : ''
          }`}>
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[9px] tracking-tight -mt-0.5">Descubrir</span>
        </button>

        {/* 3. Reels (Center) */}
        <button
          type="button"
          onClick={() => onSelectModule('experimentar')}
          className="flex flex-col items-center justify-center py-0.5 -mt-2"
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md transition-transform active:scale-95 ${
            activeModule === 'experimentar'
              ? 'bg-gradient-to-tr from-red-600 to-pink-500 ring-2 ring-red-300 shadow-red-500/30'
              : 'bg-gradient-to-tr from-red-500 to-rose-600 shadow-red-500/20'
          }`}>
            <Video className="w-4.5 h-4.5" />
          </div>
          <span className={`text-[9px] font-black mt-0.5 ${
            activeModule === 'experimentar' ? 'text-red-600 font-black' : 'text-slate-600'
          }`}>
            Reels
          </span>
        </button>

        {/* 4. Comparar */}
        <button
          type="button"
          onClick={() => onSelectModule('comparar')}
          className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition ${
            activeModule === 'comparar'
              ? 'text-[#0057FF] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${
            activeModule === 'comparar' ? 'bg-[#F0F8FF] text-[#0057FF]' : ''
          }`}>
            <Scale className="w-4 h-4" />
          </div>
          <span className="text-[9px] tracking-tight -mt-0.5">Comparar</span>
        </button>

        {/* 5. Menú / Más */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition ${
            isSecondaryActive
              ? 'text-[#0057FF] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${
            isSecondaryActive ? 'bg-[#F0F8FF] text-[#0057FF]' : ''
          }`}>
            <SecondaryIcon className="w-4 h-4" />
          </div>
          <span className="text-[9px] tracking-tight truncate max-w-[48px] -mt-0.5">
            {secondaryLabel}
          </span>
        </button>
      </div>
    </div>
  );
};
