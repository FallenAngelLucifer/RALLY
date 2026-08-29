import React from 'react';
import { RumboLogo } from './RumboLogo';
import { type AppModule } from './NavbarApp';
import {
  Compass,
  Search,
  Scale,
  BookOpen,
  Video,
  Users,
  Award,
  X,
  MapPin,
  Download,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  department: string;
  municipality: string;
  onExportPDF?: () => void;
  onReset?: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeModule,
  onSelectModule,
  department,
  municipality,
  onExportPDF,
  onReset
}) => {
  if (!isOpen) return null;

  const modules: { id: AppModule; label: string; number: string; desc: string; icon: React.ElementType; isHot?: boolean }[] = [
    { id: 'conocerme', label: 'Conóceme', number: '1', desc: 'Mapa y Árbol de Decisiones', icon: Compass },
    { id: 'descubrir', label: 'Descubrir', number: '2', desc: 'Mapeo de Carreras y Afinidad', icon: Search },
    { id: 'comparar', label: 'Comparar', number: '3', desc: 'INATEC vs CNU vs Privadas', icon: Scale },
    { id: 'entender', label: 'Entender', number: '4', desc: 'Pensums y Proyectos Prácticos', icon: BookOpen },
    { id: 'experimentar', label: 'Experimentar', number: '5', desc: 'Micro-Reels Vocacionales', icon: Video, isHot: true },
    { id: 'conectar', label: 'Conectar', number: '6', desc: 'Comunidad Q&A y Mentores', icon: Users },
    { id: 'decidir', label: 'Decidir', number: '7', desc: 'Mi Plan y Pasaporte PDF', icon: Award }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-[85vw] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-[#001B48] via-[#002B6D] to-[#001B48] text-white">
          <div className="flex items-center justify-between">
            <div className="bg-white/95 p-1.5 rounded-2xl shadow-sm">
              <RumboLogo variant="icon" size="sm" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              RUMBO
            </h2>
            <p className="text-xs text-blue-200 font-medium">
              Orientación Vocacional Nicaragua 2026
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 text-xs font-bold text-slate-100 border border-white/15 w-fit">
            <MapPin className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>{department}, {municipality}</span>
          </div>
        </div>

        {/* 7 Modules List */}
        <div className="p-3 space-y-1.5 flex-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 block">
            Ruta de Exploración
          </span>

          {modules.map((m) => {
            const isActive = activeModule === m.id;
            const Icon = m.icon;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onSelectModule(m.id);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white shadow-md shadow-[#0057FF]/20 ring-1 ring-[#00C2FF]/40'
                    : 'hover:bg-[#F0F8FF] text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                    isActive ? 'bg-white text-[#0057FF]' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black leading-tight">
                        {m.number}. {m.label}
                      </span>
                      {m.isHot && (
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full bg-red-500 text-white animate-pulse">
                          REELS
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {m.desc}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#00C2FF]' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
          {onExportPDF && (
            <button
              type="button"
              onClick={() => {
                onExportPDF();
                onClose();
              }}
              className="w-full h-11 bg-white hover:bg-blue-50 border border-slate-200 text-[#0057FF] rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Download className="w-4 h-4 text-[#0057FF]" />
              <span>Descargar Pasaporte PDF</span>
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full h-10 text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Evaluación</span>
            </button>
          )}

          <div className="text-[10px] text-center text-slate-400 pt-1 font-semibold">
            MINED · INATEC · CNU · Nicaragua 2026
          </div>
        </div>
      </div>
    </div>
  );
};
