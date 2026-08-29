import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TestModuloProps {
  onComplete: (scores: Record<string, number>) => void;
}

// ─── RIASEC types ─────────────────────────────────────────────────────────────
type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

const RIASEC_LABELS: Record<RiasecType, string> = {
  R: 'Realista', I: 'Investigador', A: 'Artístico',
  S: 'Social', E: 'Emprendedor', C: 'Convencional',
};

// ─── Inline SVG Scene illustrations ──────────────────────────────────────────
const SceneWorkshop = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* workbench */}
    <rect x="10" y="45" width="80" height="6" rx="2" fill="#94a3b8" />
    <rect x="15" y="51" width="4" height="14" fill="#64748b" />
    <rect x="81" y="51" width="4" height="14" fill="#64748b" />
    {/* gear */}
    <circle cx="30" cy="35" r="8" fill="#3b82f6" opacity="0.8" />
    <circle cx="30" cy="35" r="4" fill={active ? '#dbeafe' : '#f8fafc'} />
    <rect x="28" y="24" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
    <rect x="28" y="43" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
    <rect x="19" y="33" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
    <rect x="37" y="33" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.8" />
    {/* wrench */}
    <rect x="55" y="20" width="5" height="22" rx="2.5" fill="#475569" transform="rotate(-20 58 31)" />
    <circle cx="62" cy="23" r="5" fill="none" stroke="#475569" strokeWidth="2.5" />
    {/* screws */}
    <circle cx="70" cy="40" r="2" fill="#94a3b8" />
    <circle cx="78" cy="36" r="2" fill="#94a3b8" />
  </svg>
);

const SceneLab = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* flask left */}
    <path d="M25 20 L20 50 Q20 56 28 56 Q36 56 36 50 L31 20 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
    <ellipse cx="28" cy="44" rx="5" ry="3" fill="#3b82f6" opacity="0.5" />
    {/* beaker right */}
    <rect x="55" y="22" width="18" height="28" rx="3" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
    <rect x="57" y="38" width="14" height="10" rx="2" fill="#3b82f6" opacity="0.4" />
    {/* bubbles */}
    <circle cx="62" cy="34" r="2" fill="#93c5fd" />
    <circle cx="68" cy="30" r="1.5" fill="#93c5fd" />
    {/* graph line */}
    <polyline points="12,60 20,52 30,56 42,46 52,50 62,38 75,42 88,30" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* shelf */}
    <rect x="8" y="62" width="84" height="3" rx="1.5" fill="#cbd5e1" />
  </svg>
);

const SceneStudio = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* canvas */}
    <rect x="30" y="10" width="42" height="34" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* painting strokes */}
    <path d="M36 28 Q44 18 52 26 Q60 34 68 24" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M36 36 Q50 30 64 36" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* easel legs */}
    <line x1="35" y1="44" x2="28" y2="62" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="66" y1="44" x2="73" y2="62" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="51" y1="44" x2="51" y2="62" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    {/* brushes left */}
    <rect x="12" y="30" width="3" height="18" rx="1.5" fill="#94a3b8" />
    <ellipse cx="13.5" cy="29" rx="2.5" ry="4" fill="#2563eb" />
    <rect x="18" y="28" width="3" height="20" rx="1.5" fill="#94a3b8" />
    <ellipse cx="19.5" cy="27" rx="2.5" ry="4" fill="#60a5fa" />
  </svg>
);

const ScenePeople = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* 3 people */}
    {[22, 50, 78].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="22" r="8" fill={i === 1 ? '#2563eb' : '#93c5fd'} />
        <path d={`M${x - 10} 62 Q${x - 10} 38 ${x} 34 Q${x + 10} 38 ${x + 10} 62`}
          fill={i === 1 ? '#2563eb' : '#93c5fd'} opacity="0.7" />
      </g>
    ))}
    {/* connection lines */}
    <line x1="30" y1="22" x2="42" y2="22" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
    <line x1="58" y1="22" x2="70" y2="22" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* hands joined */}
    <path d="M32 44 Q41 48 50 46 Q59 44 68 47" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const SceneMeeting = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* presentation board */}
    <rect x="30" y="8" width="40" height="28" rx="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
    <rect x="35" y="13" width="30" height="4" rx="2" fill="#bfdbfe" />
    <rect x="35" y="20" width="20" height="3" rx="1.5" fill="#e2e8f0" />
    <rect x="35" y="26" width="25" height="3" rx="1.5" fill="#e2e8f0" />
    {/* presenter */}
    <circle cx="18" cy="28" r="6" fill="#2563eb" />
    <path d="M10 55 Q10 40 18 36 Q26 40 26 55" fill="#2563eb" opacity="0.7" />
    <line x1="24" y1="28" x2="30" y2="22" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
    {/* audience */}
    {[60, 72, 84].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="52" r="5" fill="#93c5fd" />
        <path d={`M${x - 6} 65 Q${x - 6} 58 ${x} 57 Q${x + 6} 58 ${x + 6} 65`}
          fill="#93c5fd" opacity="0.6" />
      </g>
    ))}
  </svg>
);

const SceneOffice = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
    <rect width="100" height="70" rx="8" fill={active ? '#dbeafe' : '#f8fafc'} />
    {/* desk */}
    <rect x="10" y="48" width="80" height="5" rx="2" fill="#94a3b8" />
    {/* monitor */}
    <rect x="32" y="22" width="36" height="24" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="34" y="24" width="32" height="18" rx="2" fill="#eff6ff" />
    {/* screen lines */}
    <rect x="37" y="27" width="26" height="2" rx="1" fill="#93c5fd" />
    <rect x="37" y="31" width="18" height="2" rx="1" fill="#bfdbfe" />
    <rect x="37" y="35" width="22" height="2" rx="1" fill="#bfdbfe" />
    {/* stand */}
    <rect x="48" y="46" width="4" height="4" fill="#94a3b8" />
    <rect x="44" y="49" width="12" height="2" rx="1" fill="#94a3b8" />
    {/* folders */}
    <rect x="12" y="36" width="14" height="12" rx="2" fill="#3b82f6" />
    <rect x="12" y="34" width="10" height="4" rx="1" fill="#2563eb" />
    <rect x="14" y="38" width="10" height="2" rx="1" fill="white" opacity="0.5" />
    <rect x="14" y="42" width="10" height="2" rx="1" fill="white" opacity="0.5" />
    {/* keyboard */}
    <rect x="35" y="50" width="30" height="8" rx="2" fill="#e2e8f0" />
    {[38, 44, 50, 56, 62].map((x) => (
      <rect key={x} x={x} y={53} width="4" height="3" rx="0.5" fill="#cbd5e1" />
    ))}
  </svg>
);

// ─── Question data ────────────────────────────────────────────────────────────
interface Choice {
  label: string;
  scene: React.FC<{ active?: boolean }>;
  scores: Partial<Record<RiasecType, number>>;
}

interface Round {
  type: 'pick2' | 'pick1of4' | 'order' | 'timer';
  prompt: string;
  sub?: string;
  choices: Choice[];
}

const ROUNDS: Round[] = [
  {
    type: 'pick2',
    prompt: 'Elige el espacio donde pasarías el día',
    sub: 'Sin pensar demasiado — elige el que más te atrae',
    choices: [
      { label: 'Taller o planta', scene: SceneWorkshop, scores: { R: 3, C: 1 } },
      { label: 'Laboratorio', scene: SceneLab, scores: { I: 3, R: 1 } },
      { label: 'Estudio creativo', scene: SceneStudio, scores: { A: 3, I: 1 } },
      { label: 'Espacio con personas', scene: ScenePeople, scores: { S: 3, E: 1 } },
    ],
  },
  {
    type: 'pick2',
    prompt: '¿Cuál de estas escenas te genera más interés?',
    choices: [
      { label: 'Reunión / presentación', scene: SceneMeeting, scores: { E: 3, S: 1 } },
      { label: 'Oficina organizada', scene: SceneOffice, scores: { C: 3, E: 1 } },
      { label: 'Trabajo con equipo', scene: ScenePeople, scores: { S: 2, E: 2 } },
      { label: 'Investigación', scene: SceneLab, scores: { I: 3, A: 1 } },
    ],
  },
  {
    type: 'timer',
    prompt: 'Tienes 5 segundos — ¿qué espacio eliges?',
    sub: '¡Rápido, no pienses!',
    choices: [
      { label: 'Construir algo', scene: SceneWorkshop, scores: { R: 4 } },
      { label: 'Analizar datos', scene: SceneLab, scores: { I: 4 } },
      { label: 'Crear algo visual', scene: SceneStudio, scores: { A: 4 } },
    ],
  },
  {
    type: 'pick2',
    prompt: 'Un sábado libre, ¿a cuál de estos lugares irías?',
    choices: [
      { label: 'Taller artístico', scene: SceneStudio, scores: { A: 3, S: 1 } },
      { label: 'Conferencia técnica', scene: SceneMeeting, scores: { E: 2, I: 2 } },
      { label: 'Experimento en casa', scene: SceneLab, scores: { I: 3, R: 1 } },
      { label: 'Voluntariado', scene: ScenePeople, scores: { S: 4 } },
    ],
  },
  {
    type: 'pick2',
    prompt: 'En un proyecto de equipo, prefieres...',
    choices: [
      { label: 'Construir o fabricar', scene: SceneWorkshop, scores: { R: 3, C: 1 } },
      { label: 'Investigar y planificar', scene: SceneLab, scores: { I: 3, C: 1 } },
      { label: 'Diseñar la presentación', scene: SceneStudio, scores: { A: 3, E: 1 } },
      { label: 'Coordinar al equipo', scene: SceneMeeting, scores: { E: 3, S: 1 } },
    ],
  },
  {
    type: 'pick2',
    prompt: 'Al llegar a un nuevo lugar, lo primero que haces es...',
    choices: [
      { label: 'Explorar y tocar las cosas', scene: SceneWorkshop, scores: { R: 3, I: 1 } },
      { label: 'Observar los detalles', scene: SceneLab, scores: { I: 3, A: 1 } },
      { label: 'Notar los colores y formas', scene: SceneStudio, scores: { A: 3, I: 1 } },
      { label: 'Hablar con las personas', scene: ScenePeople, scores: { S: 3, E: 1 } },
    ],
  },
];

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-blue-600 rounded-full"
      initial={false}
      animate={{ width: `${((current) / total) * 100}%` }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  </div>
);

// ─── Timer round ──────────────────────────────────────────────────────────────
const TimerPicker = ({
  choices, onPick,
}: { choices: Choice[]; onPick: (c: Choice) => void }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [expired, setExpired] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(ref.current!);
          setExpired(true);
          // auto-pick random if no choice
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current!);
  }, []);

  return (
    <div className="space-y-3">
      {/* timer indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-colors ${
          timeLeft <= 2 ? 'border-red-500 text-red-600' : 'border-blue-500 text-blue-600'
        }`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {expired ? '—' : timeLeft}
        </div>
        <span className="text-[10px] text-slate-500">segundos</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {choices.map((c, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(ref.current!); onPick(c); }}
            disabled={expired}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 border-slate-200 bg-white hover:border-blue-500 transition-all"
          >
            <div className="w-full aspect-square">
              <c.scene />
            </div>
            <span className="text-[9px] font-semibold text-slate-600 leading-tight text-center">{c.label}</span>
          </button>
        ))}
      </div>

      {expired && (
        <p className="text-center text-[10px] text-slate-400">Tiempo agotado — selecciona igual</p>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const TestModulo: React.FC<TestModuloProps> = ({ onComplete }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [scores, setScores] = useState<Record<RiasecType, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const round = ROUNDS[roundIdx];
  const isLast = roundIdx === ROUNDS.length - 1;

  const applyChoice = (c: Choice) => {
    const next = { ...scores };
    (Object.entries(c.scores) as [RiasecType, number][]).forEach(([k, v]) => {
      next[k] = (next[k] || 0) + v;
    });
    return next;
  };

  const handleSelect = (idx: number) => {
    if (round.type !== 'timer') setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const next = applyChoice(round.choices[selected]);
    setScores(next);
    setSelected(null);

    if (isLast) {
      // Scale to 0-100
      const total = Object.values(next).reduce((s, v) => s + v, 0) || 1;
      const final: Record<string, number> = {};
      Object.entries(next).forEach(([k, v]) => {
        final[RIASEC_LABELS[k as RiasecType]] = Math.round((v / total) * 100);
      });
      onComplete(final);
      setDone(true);
    } else {
      setRoundIdx((i) => i + 1);
    }
  };

  const handleTimerPick = (c: Choice) => {
    const next = applyChoice(c);
    setScores(next);

    if (isLast) {
      const total = Object.values(next).reduce((s, v) => s + v, 0) || 1;
      const final: Record<string, number> = {};
      Object.entries(next).forEach(([k, v]) => {
        final[RIASEC_LABELS[k as RiasecType]] = Math.round((v / total) * 100);
      });
      onComplete(final);
      setDone(true);
    } else {
      setRoundIdx((i) => i + 1);
    }
  };

  if (done) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3 p-8">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto">
          <ArrowRight className="w-7 h-7 text-white" />
        </div>
        <p className="font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          Calculando tu perfil...
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 pb-4">

      {/* Header */}
      <div className="bg-[#0f172a] rounded-2xl px-5 py-3 flex items-center justify-between">
        <h1 className="text-[13px] font-extrabold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          Evaluación Vocacional
        </h1>
        <span className="text-[11px] text-blue-400 font-bold">
          {roundIdx + 1} / {ROUNDS.length}
        </span>
      </div>

      {/* Progress */}
      <ProgressBar current={roundIdx} total={ROUNDS.length} />

      {/* Round card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={roundIdx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Prompt */}
          <div className="px-5 pt-5 pb-4 space-y-1">
            {round.type === 'timer' && (
              <span className="inline-block text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5 mb-1 uppercase tracking-wider">
                Decisión rápida
              </span>
            )}
            <h2 className="text-[14px] font-bold text-slate-900 leading-snug" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              {round.prompt}
            </h2>
            {round.sub && (
              <p className="text-[11px] text-slate-500">{round.sub}</p>
            )}
          </div>

          <div className="px-4 pb-5">
            {round.type === 'timer' ? (
              <TimerPicker choices={round.choices} onPick={handleTimerPick} />
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {round.choices.map((c, i) => {
                  const isSel = selected === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        isSel
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-full" style={{ aspectRatio: '10/7' }}>
                        <c.scene active={isSel} />
                      </div>
                      <span className={`text-[10.5px] font-semibold leading-tight text-center ${
                        isSel ? 'text-blue-700' : 'text-slate-600'
                      }`}>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button — only for non-timer rounds */}
      {round.type !== 'timer' && (
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:shadow-none"
        >
          {isLast ? 'Ver mi perfil' : 'Siguiente'}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
