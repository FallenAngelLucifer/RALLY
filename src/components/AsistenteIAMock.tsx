import { useState, useRef } from 'react';
import { Bot, Sparkles, Send, X, ShieldCheck } from 'lucide-react';
import { RumboLogo } from './RumboLogo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  source?: string;
  time: string;
}

const PRESET_QUERIES: { query: string; answer: string; source: string }[] = [
  {
    query: '¿Dónde puedo estudiar Programación gratis en Nicaragua?',
    answer: 'Puedes estudiar el **Técnico Especialista en Programación (1.5 años)** de forma 100% gratuita en los Centros Tecnológicos de **INATEC** (Manuel Olivares en Managua, Juan de Dios Muñoz en León, o en Estelí y Matagalpa). No cobran matrícula ni mensualidades y ofrecen turnos diurnos, sabatinos y virtuales.',
    source: 'Catálogo Oficial INATEC 2025'
  },
  {
    query: '¿Qué es la Ruta Progresiva y cómo funciona?',
    answer: 'La **Ruta Progresiva** te permite estudiar primero un Técnico en INATEC (1.5 a 2 años) para insertarte al mercado laboral rápidamente y generar ingresos. Luego, puedes continuar tus estudios en universidades públicas del **CNU** en modalidad Sabatina o Virtual para obtener tu título de Licenciatura o Ingeniería convalidando asignaturas.',
    source: 'Marco Nacional de Articulación Educativa MINED - INATEC - CNU'
  },
  {
    query: '¿Hay gratuidad en las universidades públicas del CNU?',
    answer: 'Sí. Las universidades miembros del Consejo Nacional de Universidades (UNAN-Managua, UNAN-León, UNI, UNA, URACCAN, etc.) cuentan con política de gratuidad de matrícula y aranceles en carreras regulares y del programa UNICAM (Universidad en el Campo).',
    source: 'Consejo Nacional de Universidades (CNU)'
  },
  {
    query: '¿Qué carreras técnicas tienen mayor demanda en el Norte (Matagalpa/Jinotega/Estelí)?',
    answer: 'En la región Norte las áreas con mayor demanda laboral son: **Agroindustria del Café y Cacao**, **Veterinaria y Zootecnia**, **Mecánica Automotriz**, **Energía Solar / Riego Tecnificado** y **Administración de Cooperativas**.',
    source: 'Observatorio Laboral del Sector Productivo Nacional'
  }
];

export const AsistenteIAMock: React.FC<{ department: string; onExploreCareer?: (careerId: string) => void }> = ({
  department
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `¡Hola! Soy **VocaciónIA**, tu asesor oficial antialucinaciones con arquitectura RAG. Estoy conectado a las bases de datos de MINED, INATEC y CNU para darte respuestas 100% verificadas sobre carreras, sedes en ${department} y becas. ¿En qué te puedo orientar hoy?`,
      source: 'MINED / INATEC / CNU Base Verificada',
      time: 'Justo ahora'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const msgIdRef = useRef(100);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputValue;
    if (!q.trim()) return;

    msgIdRef.current += 1;
    const userMsg: ChatMessage = {
      id: `u-${msgIdRef.current}`,
      sender: 'user',
      text: q,
      time: 'Ahora'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching preset or generate contextual response
      const matched = PRESET_QUERIES.find((p) =>
        p.query.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(p.query.toLowerCase())
      );

      let botResponseText = '';
      let botSource = 'Base de Datos Oficial RAG';

      if (matched) {
        botResponseText = matched.answer;
        botSource = matched.source;
      } else {
        botResponseText = `Para **${department}**, contamos con oferta activa en centros tecnológicos del **INATEC** y sedes universitarias del **CNU**. Puedes consultar los requisitos de ingreso y turnos (presencial, sabatino y virtual) en la sección **COMPARAR** o **ENTENDER** de esta app.`;
        botSource = `Sede Territorial ${department} - Registro Educativo 2025`;
      }

      msgIdRef.current += 1;
      const botMsg: ChatMessage = {
        id: `b-${msgIdRef.current}`,
        sender: 'bot',
        text: botResponseText,
        source: botSource,
        time: 'Ahora'
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-22 md:bottom-6 right-4 sm:right-6 z-40 bg-gradient-to-r from-[#001B48] via-[#0048BA] to-[#00C2FF] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 border border-[#00C2FF]/40 ring-2 ring-[#00C2FF]/20"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-[#00F0FF]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00F0FF] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00F0FF] rounded-full" />
        </div>
        <span className="hidden sm:inline text-xs font-black tracking-wide text-white">
          RUMBO IA (RAG)
        </span>
      </button>

      {/* Chat Modal / Popup */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-20 right-2 sm:right-6 w-[96vw] sm:w-[420px] max-h-[75vh] sm:max-h-[580px] bg-white rounded-3xl shadow-2xl border border-[#00C2FF]/30 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#001B48] via-[#002B6D] to-[#001B48] text-white p-4 flex items-center justify-between border-b border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <div className="bg-white/90 p-1.5 rounded-2xl shadow-sm">
                <RumboLogo variant="icon" size="sm" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black tracking-tight text-white">RUMBO IA</h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00C2FF]/20 text-[#00F0FF] font-bold border border-[#00C2FF]/40 flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" /> Antialucinaciones RAG
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">Datos Oficiales MINED · INATEC · CNU</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Preguntas rápidas:</span>
            {PRESET_QUERIES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p.query)}
                className="text-[10.5px] font-bold text-blue-700 bg-white border border-blue-200 px-2.5 py-1 rounded-full shrink-0 hover:bg-blue-50 transition"
              >
                {p.query.length > 28 ? `${p.query.slice(0, 28)}...` : p.query}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto max-h-[360px] bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none space-y-1.5'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.source && (
                    <div className="pt-1.5 border-t border-slate-100 text-[9.5px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Fuente: <strong>{m.source}</strong></span>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-white p-2.5 rounded-2xl border border-slate-100 max-w-[120px]">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>Consultando RAG...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu duda (ej. becas UNAN, INATEC)..."
              className="flex-1 h-10 px-3 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center shrink-0 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
