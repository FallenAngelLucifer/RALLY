export interface SituationalQuestion {
  id: string;
  type: 'situational';
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  title: string;
  description: string;
  iconName: string;
}

export interface RankingOption {
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  text: string;
}

export interface RankingQuestion {
  id: string;
  type: 'ranking';
  title: string;
  description: string;
  options: RankingOption[];
}

export interface SliderQuestion {
  id: string;
  type: 'slider';
  title: string;
  leftCategory: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  rightCategory: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  leftLabel: string;
  rightLabel: string;
  description: string;
}

export type Question = SituationalQuestion | RankingQuestion | SliderQuestion;

export const questions: Question[] = [
  // --- REALISTA (R) ---
  {
    id: "r1",
    type: "situational",
    category: "R",
    title: "Reparación Mecánica y Electrónica",
    description: "Desarmar y reparar dispositivos dañados, arreglar cables o soldar circuitos electrónicos.",
    iconName: "Wrench"
  },
  {
    id: "r2",
    type: "situational",
    category: "R",
    title: "Trabajo Agropecuario",
    description: "Sembrar, cosechar, cuidar de animales o trabajar en fincas productivas de café, tabaco o ganadería.",
    iconName: "Sprout"
  },
  {
    id: "r3",
    type: "situational",
    category: "R",
    title: "Construcción y Carpintería",
    description: "Construir maquetas, estructuras físicas, o trabajar cortando y modelando madera y metales.",
    iconName: "Hammer"
  },

  // --- INVESTIGADOR (I) ---
  {
    id: "i1",
    type: "situational",
    category: "I",
    title: "Investigación Científica",
    description: "Trabajar en un laboratorio químico o biológico analizando muestras de agua, suelos o buscando curas.",
    iconName: "FlaskConical"
  },
  {
    id: "i2",
    type: "situational",
    category: "I",
    title: "Programación e Inteligencia Artificial",
    description: "Escribir código de software, analizar algoritmos complejos y resolver problemas matemáticos abstractos.",
    iconName: "Binary"
  },
  {
    id: "i3",
    type: "situational",
    category: "I",
    title: "Investigación Histórica y Social",
    description: "Leer textos densos para investigar misterios del pasado, estadísticas demográficas o comportamientos humanos.",
    iconName: "BookOpen"
  },

  // --- ARTÍSTICO (A) ---
  {
    id: "a1",
    type: "situational",
    category: "A",
    title: "Diseño Visual y Gráfico",
    description: "Crear ilustraciones digitales, diseñar logotipos, diagramar revistas o editar piezas publicitarias.",
    iconName: "Palette"
  },
  {
    id: "a2",
    type: "situational",
    category: "A",
    title: "Escritura Creativa y Música",
    description: "Escribir canciones, poemas, guiones teatrales o componer melodías con instrumentos musicales.",
    iconName: "Music"
  },
  {
    id: "a3",
    type: "situational",
    category: "A",
    title: "Artes Escénicas y Audiovisuales",
    description: "Actuar en obras de teatro, bailar, dirigir videos cortometrajes o diseñar decoraciones escénicas.",
    iconName: "Film"
  },

  // --- SOCIAL (S) ---
  {
    id: "s1",
    type: "situational",
    category: "S",
    title: "Educación y Tutorías",
    description: "Enseñar temas académicos a niños o jóvenes, facilitando su aprendizaje y desarrollo de habilidades.",
    iconName: "GraduationCap"
  },
  {
    id: "s2",
    type: "situational",
    category: "S",
    title: "Orientación Psicológica",
    description: "Escuchar a las personas en situaciones difíciles, dándoles consejos y ayudándoles a mejorar su bienestar mental.",
    iconName: "HeartHandshake"
  },
  {
    id: "s3",
    type: "situational",
    category: "S",
    title: "Desarrollo Comunitario",
    description: "Organizar proyectos sociales en barrios y comunidades para asegurar el acceso a servicios básicos o salud pública.",
    iconName: "Users"
  },

  // --- EMPRENDEDOR (E) ---
  {
    id: "e1",
    type: "situational",
    category: "E",
    title: "Dirección de Negocios",
    description: "Lanzar un emprendimiento propio, administrar recursos financieros y liderar un equipo de ventas.",
    iconName: "TrendingUp"
  },
  {
    id: "e2",
    type: "situational",
    category: "E",
    title: "Negociaciones y Ventas",
    description: "Presentar productos innovadores ante inversionistas o persuadir a clientes para cerrar contratos comerciales.",
    iconName: "Briefcase"
  },
  {
    id: "e3",
    type: "situational",
    category: "E",
    title: "Oratoria y Liderazgo de Opinión",
    description: "Dar discursos motivacionales, dirigir debates públicos o liderar comisiones estudiantiles.",
    iconName: "Megaphone"
  },

  // --- CONVENCIONAL (C) ---
  {
    id: "c1",
    type: "situational",
    category: "C",
    title: "Contabilidad e Impuestos",
    description: "Llevar un registro preciso de entradas y salidas de dinero, balancear presupuestos e impuestos de empresas.",
    iconName: "Calculator"
  },
  {
    id: "c2",
    type: "situational",
    category: "C",
    title: "Gestión de Inventarios y Logística",
    description: "Controlar el flujo de mercaderías, organizar almacenes de forma meticulosa y ordenar planificaciones.",
    iconName: "ClipboardList"
  },
  {
    id: "c3",
    type: "situational",
    category: "C",
    title: "Revisión Documental y Normas",
    description: "Revisar expedientes legales, archivar actas oficiales y asegurarse de que se cumplan las leyes y reglamentos.",
    iconName: "FileCheck"
  },

  // --- RANKING / ORDENAMIENTO (4) ---
  {
    id: "rank1",
    type: "ranking",
    title: "Roles en Proyecto de Equipo",
    description: "Imagina que lideras un proyecto escolar para la feria científica municipal. Ordena de mayor (arriba) a menor (abajo) interés cuál rol preferirías asumir:",
    options: [
      { category: "E", text: "Director: Exponer los resultados finales ante los jueces, motivar al equipo y coordinar la presentación visual." },
      { category: "C", text: "Organizador: Registrar minuciosamente el presupuesto gastado, redactar el informe escrito oficial y controlar el cronograma." },
      { category: "S", text: "Facilitador: Mediar conflictos internos, asegurar que todos los miembros aporten y apoyar a quienes les cuesta aprender." },
      { category: "I", text: "Investigador: Buscar las fuentes científicas más profundas, depurar los errores técnicos y programar las simulaciones." }
    ]
  },
  {
    id: "rank2",
    type: "ranking",
    title: "Conservación Ambiental en Bosawás",
    description: "Si participaras en un proyecto de preservación de la biosfera en Bosawás, ordena las tareas según tus gustos:",
    options: [
      { category: "R", text: "Trabajo físico de campo: Reforestar áreas dañadas, instalar sensores de suelo y manejar equipo mecánico de medición." },
      { category: "I", text: "Análisis científico: Tomar muestras botánicas y analizarlas bajo el microscopio para reportar el impacto del clima." },
      { category: "A", text: "Diseño creativo: Grabar documentales de vida silvestre, tomar fotografías artísticas y crear afiches de concientización." },
      { category: "E", text: "Gestión institucional: Conseguir fondos de ONGs internacionales, dar charlas a inversionistas y coordinar con el ministerio." }
    ]
  },
  {
    id: "rank3",
    type: "ranking",
    title: "Resolución de Problemas Cotidianos",
    description: "Ordena las siguientes formas de resolver situaciones del día a día según la que más disfrutes:",
    options: [
      { category: "R", text: "Arreglar manualmente cosas descompuestas en casa (ej. un tomacorriente, la cadena de la bicicleta, una cerradura)." },
      { category: "C", text: "Organizar detalladamente tu presupuesto mensual, programar alarmas y agendar tus horas de estudio de forma cuadriculada." },
      { category: "A", text: "Expresarte de forma creativa: decorar tu habitación, escribir un diario personal con dibujos o crear animaciones digitales." },
      { category: "S", text: "Aconsejar a un amigo o familiar cercano que atraviesa un problema personal, escuchándolo activamente y apoyándolo." }
    ]
  },
  {
    id: "rank4",
    type: "ranking",
    title: "Visita a una Feria Universitaria",
    description: "En una visita a una gran feria académica y tecnológica en tu departamento, ¿qué áreas capturan más tu interés?",
    options: [
      { category: "I", text: "Los laboratorios abiertos de robótica y biotecnología, donde explican cómo funcionan las bacterias y los circuitos." },
      { category: "A", text: "Los pabellones de arte, cortometrajes estudiantiles, arquitectura sostenible y demostraciones de diseño digital." },
      { category: "E", text: "La mesa redonda de jóvenes graduados que fundaron cooperativas o startups de tecnología en el país." },
      { category: "C", text: "El stand administrativo, donde te explican paso a paso el proceso legal de matrícula, requisitos de ingreso y becas." }
    ]
  },

  // --- CONTRASTE SLIDERS (4) ---
  {
    id: "slide1",
    type: "slider",
    title: "Entorno Ocupacional",
    leftCategory: "R",
    rightCategory: "C",
    leftLabel: "Trabajo de Campo",
    rightLabel: "Trabajo de Oficina",
    description: "Elige si prefieres un ambiente al aire libre operando herramientas/maquinaria física (Realista) o un entorno de oficina ordenado procesando datos y expedientes (Convencional)."
  },
  {
    id: "slide2",
    type: "slider",
    title: "Método de Trabajo",
    leftCategory: "I",
    rightCategory: "S",
    leftLabel: "Análisis Individual",
    rightLabel: "Interacción Humana",
    description: "Elige si prefieres concentrarte de forma autónoma investigando teorías y programando sistemas (Investigador) o prefieres coordinar, enseñar y dar asistencia directa a personas (Social)."
  },
  {
    id: "slide3",
    type: "slider",
    title: "Estructura vs. Creatividad",
    leftCategory: "C",
    rightCategory: "A",
    leftLabel: "Procesos Estructurados",
    rightLabel: "Libertad Creativa",
    description: "Elige si te sientes más cómodo siguiendo guías, metodologías exactas y regulaciones claras (Convencional) o experimentando ideas artísticas innovadoras sin reglas preestablecidas (Artístico)."
  },
  {
    id: "slide4",
    type: "slider",
    title: "Enfoque de Logros",
    leftCategory: "R",
    rightCategory: "E",
    leftLabel: "Resolución Técnica",
    rightLabel: "Liderazgo de Proyectos",
    description: "Elige si te motiva concretar soluciones prácticas mediante el esfuerzo técnico manual (Realista) o te motiva liderar equipos, negociar y vender ideas de negocios (Emprendedor)."
  }
];
