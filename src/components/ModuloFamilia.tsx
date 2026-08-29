import React, { useState } from 'react';
import {
  HeartHandshake,
  MessageCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Home,
  CheckCircle2
} from 'lucide-react';

interface ModuloFamiliaProps {
  studentName?: string;
  department: string;
}

export const ModuloFamilia: React.FC<ModuloFamiliaProps> = ({
  department
}) => {
  const [openMythIndex, setOpenMythIndex] = useState<number | null>(0);

  const myths = [
    {
      myth: '“Las carreras técnicas son solo para quienes no pudieron entrar a la universidad.”',
      reality: 'Falso. En Nicaragua y a nivel global, los técnicos especialistas (en electricidad, mecánica, programación, refrigeración o agroindustria) tienen tasas de empleo superiores al 80% en su primer año, y muchos ganan más que egresados de carreras universitarias tradicionales.',
      source: 'INATEC / Observatorio del Mercado Laboral'
    },
    {
      myth: '“Para ser un profesional exitoso obligatoriamente hay que mudarse a la capital.”',
      reality: 'Falso. Existen centros tecnológicos de INATEC y recintos universitarios FAREM / UNICAM (Universidad en el Campo) en los 17 departamentos y regiones autónomas, formando profesionales adaptados al desarrollo productivo de su propia tierra.',
      source: 'Consejo Nacional de Universidades (CNU)'
    },
    {
      myth: '“Existen carreras exclusivas para varones o para mujeres.”',
      reality: 'Completamente falso. Cada año más mujeres nicaragüenses se gradúan con honores en mecánica automotriz, energía solar y programación, y más varones destacan en enfermería, docencia y gastronomía. El talento y la vocación no tienen género.',
      source: 'Ministerio de Educación (MINED)'
    },
    {
      myth: '“Estudiar una carrera técnica te cierra las puertas de la universidad.”',
      reality: 'Todo lo contrario. La Ruta Progresiva permite graduarte de un técnico en 1.5 años, comenzar a trabajar y generar tus propios ingresos, y luego continuar tus estudios universitarios en modalidad sabatina o virtual.',
      source: 'Articulación MINED - INATEC - CNU'
    }
  ];

  const conversationQuestions = [
    {
      number: '1',
      title: 'Identificar Talentos Naturales',
      question: '“Hijo/a, cuando te ves en tu día a día dentro de 3 años, ¿resolviendo qué tipo de problemas te sientes más útil y motivado/a?”',
      purpose: 'Enfoca la conversación en el propósito y los talentos del joven, no solo en el título o la presión social.'
    },
    {
      number: '2',
      title: 'Evaluar la Realidad Económica Familiar',
      question: '“¿Cuál es nuestro presupuesto real para transporte, alimentación y materiales, y qué centros gratuitos o becas tenemos en nuestro departamento?”',
      purpose: 'Hablar con transparencia sobre las finanzas familiares evita frustraciones y permite elegir rutas viables como INATEC o UNICAM.'
    },
    {
      number: '3',
      title: 'Acuerdo de Apoyo y Confianza',
      question: '“¿Cómo podemos como familia apoyarte en tus horarios de estudio, tareas del hogar y momentos de desánimo durante tu formación?”',
      purpose: 'Crea un pacto de corresponsabilidad y respaldo emocional entre padres e hijos.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">
            <HeartHandshake className="w-3.5 h-3.5" /> Acompañamiento Familiar & Comunitario
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Pórtico Familiar: Guía de Diálogo para el Hogar
          </h3>
          <p className="text-xs text-slate-500">
            Diseñado para que padres, tutores y jóvenes conversen con confianza y sin presiones sobre el futuro en {department}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" /> El Futuro se Construye en Familia
          </span>
        </div>
      </div>

      {/* 3 Questions for the Kitchen Table */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            3 Preguntas de Oro para Conversar en la Sobremesa
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conversationQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-blue-300 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {q.number}
                  </span>
                  <span className="text-xs font-black text-slate-800">{q.title}</span>
                </div>
                <p className="text-xs font-semibold text-blue-950 italic leading-relaxed">
                  {q.question}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                <strong className="text-slate-700">Objetivo:</strong> {q.purpose}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Myths vs Reality Accordion */}
      <div className="space-y-3.5 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Desarmando Mitos Vocacionales
          </h4>
        </div>

        <div className="space-y-2.5">
          {myths.map((item, idx) => {
            const isOpen = openMythIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenMythIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-rose-600 shrink-0">Mito:</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">{item.myth}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 bg-emerald-50/50 border-t border-slate-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                          Realidad:
                        </span>
                        <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                          {item.reality}
                        </p>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 text-right font-medium">
                      Fuente: {item.source}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support & Financial Aid Guide */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <h4 className="text-xs font-black uppercase tracking-wider text-blue-200">
            Opciones de Gratuidad y Becas Nacionales
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-100">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
            <strong className="text-white block font-extrabold">1. Gratuidad INATEC</strong>
            <p className="text-[11px] leading-relaxed">
              60+ Centros Tecnológicos en todo el país con matrícula y aranceles 100% gratuitos, talleres equipados e insumos incluidos.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
            <strong className="text-white block font-extrabold">2. Gratuidad Universitaria CNU</strong>
            <p className="text-[11px] leading-relaxed">
              Educación universitaria pública gratuita en UNAN-Managua, UNAN-León, UNI, UNA, URACCAN y sedes departamentales FAREM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
