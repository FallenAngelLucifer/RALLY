import React, { useEffect, useState } from 'react';
import { Wifi, Battery, Signal, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(87);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('es-NI', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(prev - 1, 5));
    }, 300000);

    return () => {
      clearInterval(interval);
      clearInterval(batteryInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans select-none">
      
      {/* Clean Mobile Screen Mockup Container */}
      <div className="relative mx-auto w-[360px] h-[720px] bg-slate-50 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Flat Android status bar (Navy Blue #0F172A) */}
        <div className="h-7 bg-[#0f172a] px-4 flex items-center justify-between text-white text-[10px] font-semibold z-40 select-none flex-shrink-0">
          <span>{time || '17:00'}</span>
          <div className="flex items-center gap-1.5 opacity-85">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <span>{batteryLevel}%</span>
              <Battery className="w-3.5 h-3.5 text-blue-300 fill-blue-300/20" />
            </div>
          </div>
        </div>

        {/* Screen Scrollable Viewport */}
        <div className="flex-1 bg-slate-50 overflow-y-auto relative flex flex-col h-full scrollbar-none">
          <main className="flex-1 p-4 flex flex-col justify-between h-full">
            {children}
          </main>
        </div>
      </div>
      
      {/* Informative desktop box (Navy/Blue theme) */}
      <div className="hidden lg:flex flex-col gap-3 absolute left-6 top-1/2 -translate-y-1/2 max-w-xs bg-white border border-slate-200 rounded-2xl p-4 shadow-md">
        <h4 className="font-bold text-[#0f172a] flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#2563eb]" /> Interfaz PWA
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Diseño adaptado con una paleta **azul marino profesional** y acentos **azules eléctricos** de alto contraste para máxima legibilidad.
        </p>

      </div>
    </div>
  );
};
