import React from 'react';
import { RumboLogo } from './RumboLogo';
import {
  Compass,
  Search,
  Scale,
  BookOpen,
  Video,
  Users,
  Award,
  MapPin,
  Menu
} from 'lucide-react';

export type AppModule =
  | 'conocerme'
  | 'descubrir'
  | 'comparar'
  | 'entender'
  | 'experimentar'
  | 'conectar'
  | 'decidir';

interface NavbarAppProps {
  activeModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  onOpenDrawer?: () => void;
  department?: string;
  municipality?: string;
}

export const NavbarApp: React.FC<NavbarAppProps> = ({
  activeModule,
  onSelectModule,
  onOpenDrawer,
  department,
  municipality
}) => {
  const modules: { id: AppModule; label: string; number: string; icon: React.ElementType; isHot?: boolean }[] = [
    { id: 'conocerme', label: 'Conóceme', number: '1', icon: Compass },
    { id: 'descubrir', label: 'Descubrir', number: '2', icon: Search },
    { id: 'comparar', label: 'Comparar', number: '3', icon: Scale },
    { id: 'entender', label: 'Entender', number: '4', icon: BookOpen },
    { id: 'experimentar', label: 'Experimentar', number: '5', icon: Video, isHot: true },
    { id: 'conectar', label: 'Conectar', number: '6', icon: Users },
    { id: 'decidir', label: 'Decidir', number: '7', icon: Award }
  ];

  const currentMod = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top Gradient Highlight Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#001B48] via-[#0057FF] to-[#00C2FF]" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Mobile Minimal Bar (<md) */}
        <div className="h-13 md:hidden flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenDrawer}
              className="w-9 h-9 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-700 flex items-center justify-center transition"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSelectModule('conocerme')}
              className="flex items-center gap-1.5 focus:outline-none"
            >
              <RumboLogo variant="icon" size="sm" />
              <span className="font-black text-base text-[#001B48] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                RUMBO
              </span>
            </button>
          </div>

          {/* Active Step Indicator Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F8FF] border border-[#00C2FF]/30 text-xs font-black text-[#0057FF]">
            <span className="w-2 h-2 rounded-full bg-[#0057FF] animate-ping" />
            <span className="truncate max-w-[120px]">{currentMod.number}. {currentMod.label}</span>
          </div>

          {/* Location Chip */}
          {department && (
            <button
              type="button"
              onClick={onOpenDrawer}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100 text-[10px] font-extrabold text-slate-700 max-w-[90px] truncate"
            >
              <MapPin className="w-3 h-3 text-[#0057FF] shrink-0" />
              <span className="truncate">{department}</span>
            </button>
          )}
        </div>

        {/* Desktop Brand Line (>=md) */}
        <div className="hidden md:flex h-16 items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectModule('conocerme')}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <RumboLogo variant="icon" size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl text-[#001B48] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    RUMBO
                  </span>
                  <span className="hidden sm:inline text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F0F8FF] text-[#0057FF] border border-[#00C2FF]/30">
                    Nicaragua 2026
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold -mt-0.5">
                  Orientación Vocacional · MINED · INATEC · CNU
                </span>
              </div>
            </button>
          </div>

          {/* Department Location Badge */}
          {department && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#F0F8FF] border border-[#00C2FF]/30 text-xs font-black text-[#001B48] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#0057FF]" />
              <span>{department}{municipality ? `, ${municipality}` : ''}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Tabs Bar (>=md) */}
        <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {modules.map((m) => {
            const isActive = activeModule === m.id;
            const Icon = m.icon;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModule(m.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black shrink-0 transition flex items-center gap-2 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white shadow-md shadow-[#0057FF]/25 ring-1 ring-[#00C2FF]/40'
                    : 'text-slate-600 hover:bg-[#F0F8FF] hover:text-[#001B48]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center transition-colors ${
                  isActive ? 'bg-white text-[#0057FF]' : 'bg-slate-200 text-slate-700'
                }`}>
                  {m.number}
                </span>

                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00C2FF]' : ''}`} />
                <span className="truncate">{m.label}</span>

                {m.isHot && (
                  <span className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                    REELS
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
