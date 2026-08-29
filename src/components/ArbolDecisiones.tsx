import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LEVEL_1_NODE,
  LEVEL_2_NODES,
  LEVEL_3_NODES,
  LEVEL_4_NODE,
  type DecisionNode,
  type DecisionOption,
  type DecisionResult
} from '../data/decisionTree';
import {
  Sprout,
  Cpu,
  HeartHandshake,
  TrendingUp,
  Wrench,
  FlaskConical,
  Briefcase,
  Code,
  HardDrive,
  Layout,
  Stethoscope,
  GraduationCap,
  Users,
  Building,
  Palette,
  Calculator,
  Zap,
  Layers,
  Rocket,
  Globe,
  FileCheck,
  Radio,
  LineChart,
  HeartPulse,
  Microscope,
  Sparkles,
  Smile,
  Handshake,
  Film,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  HelpCircle
} from 'lucide-react';

import { RumboLogo } from './RumboLogo';

interface ArbolDecisionesProps {
  department: string;
  municipality: string;
  onComplete: (result: DecisionResult) => void;
  onBackToCalibration?: () => void;
}

// ── Icon Registry Map ─────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Sprout,
  Cpu,
  HeartHandshake,
  TrendingUp,
  Wrench,
  FlaskConical,
  Briefcase,
  Code,
  HardDrive,
  Layout,
  Stethoscope,
  GraduationCap,
  Users,
  Building,
  Palette,
  Calculator,
  Zap,
  Layers,
  Rocket,
  Globe,
  FileCheck,
  Radio,
  LineChart,
  HeartPulse,
  Microscope,
  Sparkles,
  Smile,
  Handshake,
  Film,
  Truck
};

function renderIcon(iconName: string, className = 'w-6 h-6') {
  const IconComponent = ICON_MAP[iconName] || Compass;
  return <IconComponent className={className} />;
}

export const ArbolDecisiones: React.FC<ArbolDecisionesProps> = ({
  department,
  municipality,
  onComplete,
  onBackToCalibration
}) => {
  const [level, setLevel] = useState<number>(1);
  const [selectedChoices, setSelectedChoices] = useState<DecisionOption[]>([]);
  const [activeChoiceId, setActiveChoiceId] = useState<string | null>(null);

  // Determine current node based on previous selections
  let currentNode: DecisionNode = LEVEL_1_NODE;

  if (level === 2 && selectedChoices[0]) {
    currentNode = LEVEL_2_NODES[selectedChoices[0].id] || LEVEL_2_NODES['agro_recursos'];
  } else if (level === 3 && selectedChoices[1]) {
    currentNode = LEVEL_3_NODES[selectedChoices[1].id] || Object.values(LEVEL_3_NODES)[0];
  } else if (level === 4) {
    currentNode = LEVEL_4_NODE;
  }

  const handleSelectOption = (option: DecisionOption) => {
    setActiveChoiceId(option.id);
  };

  const handleAdvance = () => {
    if (!activeChoiceId) return;
    const currentOption = currentNode.options.find((o) => o.id === activeChoiceId);
    if (!currentOption) return;

    const newChoices = [...selectedChoices.slice(0, level - 1), currentOption];
    setSelectedChoices(newChoices);
    setActiveChoiceId(null);

    if (level < 4) {
      setLevel(level + 1);
    } else {
      // Finished all 4 levels -> Compute results
      const totalRaw: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
      newChoices.forEach((ch) => {
        if (ch.scores) {
          Object.entries(ch.scores).forEach(([k, v]) => {
            totalRaw[k] = (totalRaw[k] || 0) + (v || 0);
          });
        }
      });

      const totalSum = Object.values(totalRaw).reduce((a, b) => a + b, 0) || 1;
      const normalized: Record<string, number> = {};
      Object.entries(totalRaw).forEach(([k, v]) => {
        normalized[k] = Math.round((v / totalSum) * 100);
      });

      // Primary sector derivation
      const l1 = newChoices[0]?.id || 'agro_recursos';
      const sectorMap: Record<string, string> = {
        agro_recursos: 'agro_recursos',
        tecnologia_innovacion: 'tech_digital',
        salud_sociedad: 'salud_sociedad',
        creatividad_negocios: 'artes_creatividad'
      };

      const primarySectorId = sectorMap[l1] || 'agro_recursos';
      const preferredTrajectory = newChoices[3]?.preferredTrajectory || 'progresiva';

      onComplete({
        path: newChoices.map((c) => c.id),
        selectedOptions: newChoices,
        riasecScores: normalized,
        primarySectorId,
        preferredTrajectory
      });
    }
  };

  const handleGoBack = () => {
    if (level > 1) {
      setLevel(level - 1);
      setActiveChoiceId(selectedChoices[level - 2]?.id || null);
    } else if (onBackToCalibration) {
      onBackToCalibration();
    }
  };

  const stepLabels = [
    '1. Reto País',
    '2. Estilo de Acción',
    '3. Micro-Dilema',
    '4. Trayectoria de Vida'
  ];

  return (
    <div className="w-full flex flex-col gap-5 pb-8 max-w-4xl mx-auto">
      {/* ── Top Header Banner ── */}
      <div className="bg-gradient-to-br from-[#001B48] via-[#002B6D] to-[#001B48] rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-[#0057FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="bg-white/90 p-1.5 rounded-2xl shadow-sm">
            <RumboLogo variant="icon" size="sm" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#00C2FF]">
                RUMBO · Brújula Vocacional
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {department}, {municipality}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              Árbol de Decisiones de Futuro
            </h1>
          </div>
        </div>

        {/* Step pill */}
        <div className="flex items-center gap-1.5 bg-[#001B48]/80 px-3.5 py-1.5 rounded-2xl border border-[#00C2FF]/30 text-xs font-black relative z-10">
          <span className="text-slate-300">Nivel</span>
          <span className="text-[#00F0FF] text-sm font-black">{level}</span>
          <span className="text-slate-400">/ 4</span>
        </div>
      </div>

      {/* ── Stepper Navigation Breadcrumbs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stepLabels.map((lbl, idx) => {
          const isDone = idx + 1 < level;
          const isCurrent = idx + 1 === level;
          return (
            <div
              key={idx}
              className={`px-3 py-2.5 rounded-2xl border text-xs font-black flex items-center justify-between transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#0048BA] to-[#0057FF] text-white border-[#0057FF] shadow-sm shadow-[#0057FF]/20 ring-1 ring-[#00C2FF]/40'
                  : isDone
                  ? 'bg-[#F0F8FF] text-[#0057FF] border-[#00C2FF]/30 font-bold'
                  : 'bg-white text-slate-400 border-slate-200'
              }`}
            >
              <span className="truncate">{lbl}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF] shrink-0 ml-1" />}
            </div>
          );
        })}
      </div>

      {/* ── Active Decision Node Card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 space-y-6"
        >
          {/* Question & Context */}
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" /> {currentNode.title}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {currentNode.question}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {currentNode.context}
            </p>
          </div>

          {/* Options Grid */}
          <div className={`grid gap-3.5 ${currentNode.options.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
            {currentNode.options.map((option) => {
              const isSelected = activeChoiceId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 relative group ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-md shadow-blue-500/10 scale-[1.01]'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/60'
                  }`}
                >
                  {option.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {option.badge}
                    </span>
                  )}

                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}
                    >
                      {renderIcon(option.iconName, 'w-5 h-5')}
                    </div>

                    <div className="space-y-1 pr-12">
                      <h3
                        className={`text-sm sm:text-base font-extrabold leading-snug ${
                          isSelected ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {option.title}
                      </h3>
                      <p
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-blue-700' : 'text-slate-500'
                        }`}
                      >
                        {option.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-[12px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                    {option.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1">
                      {option.tags?.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-4 h-11 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {level === 1 ? 'Cambiar Municipio' : 'Volver al paso anterior'}
            </button>

            <button
              type="button"
              onClick={handleAdvance}
              disabled={!activeChoiceId}
              className="px-6 h-12 rounded-2xl bg-gradient-to-r from-[#0048BA] via-[#0057FF] to-[#00C2FF] hover:opacity-95 active:scale-[0.99] disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white text-xs sm:text-sm font-black flex items-center gap-2 transition shadow-md shadow-[#0057FF]/25 disabled:shadow-none"
            >
              <span>{level === 4 ? 'Explorar mi Panorama Vocacional' : 'Continuar al siguiente nivel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
