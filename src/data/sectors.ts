export interface SectorBranch {
  id: string;
  name: string;
  description: string;
  riasecCodes: string;
  inatecOptions: string[];
  universityOptions: string[];
  careerOpportunities: string[];
}

export interface Sector {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  };
  dominantRiasec: string[];
  territorialDemand: {
    level: 'Muy Alta' | 'Alta' | 'Estratégica' | 'En Expansión';
    topDepartments: string[];
    contextNote: string;
  };
  branches: SectorBranch[];
  entrepreneurshipPotential: string;
}

export const MACRO_SECTORS: Sector[] = [
  {
    id: 'tech_digital',
    name: 'Tecnologías, Software e Innovación Digital',
    shortName: 'Tecnología & Digital',
    tagline: 'Construye el futuro digital: software, redes, datos y automatización',
    description: 'Sector dinámico con alta demanda de soluciones digitales, automatización de procesos para empresas y desarrollo de plataformas accesibles.',
    iconName: 'Cpu',
    colorClass: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      gradient: 'from-blue-600 to-cyan-600'
    },
    dominantRiasec: ['I', 'C', 'R'],
    territorialDemand: {
      level: 'Muy Alta',
      topDepartments: ['Managua', 'León', 'Estelí', 'Matagalpa', 'Chinandega'],
      contextNote: 'Creciente oportunidad de trabajo remoto nacional e internacional y digitalización de MIPYMES en todos los departamentos.'
    },
    entrepreneurshipPotential: 'Creación de agencias de desarrollo web, soporte técnico TI local, automatización para comercios y servicios cloud.',
    branches: [
      {
        id: 'branch_software',
        name: 'Desarrollo de Software y Aplicaciones',
        description: 'Programación frontend, backend, aplicaciones móviles y soluciones de bases de datos.',
        riasecCodes: 'IC',
        inatecOptions: ['Técnico Especialista en Programación', 'Técnico General en Computación'],
        universityOptions: ['Ingeniería en Sistemas de Información', 'Ingeniería en Computación', 'Ingeniería en Software'],
        careerOpportunities: ['Desarrollador Web/Móvil', 'Administrador de Bases de Datos', 'Tester de Software']
      },
      {
        id: 'branch_redes_infra',
        name: 'Redes, Telecomunicaciones y Ciberseguridad',
        description: 'Instalación de fibra óptica, configuración de routers/servidores y protección de sistemas.',
        riasecCodes: 'RIC',
        inatecOptions: ['Técnico Especialista en Redes y Telecomunicaciones', 'Técnico General en Mantenimiento de Equipos'],
        universityOptions: ['Ingeniería en Telecomunicaciones', 'Ingeniería Electrónica'],
        careerOpportunities: ['Técnico de Redes ISP', 'Administrador de Servidores', 'Especialista en Soporte TI']
      }
    ]
  },
  {
    id: 'agro_recursos',
    name: 'Agroindustria, Veterinaria y Recursos Sostenibles',
    shortName: 'Agro & Sostenibilidad',
    tagline: 'El motor productivo de Nicaragua: alimentos, suelo, clima y ganadería',
    description: 'Transformación del campo mediante tecnología agrícola, agregación de valor a cultivos tradicionales y preservación de fuentes de agua.',
    iconName: 'Sprout',
    colorClass: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      gradient: 'from-emerald-600 to-teal-700'
    },
    dominantRiasec: ['R', 'I', 'E'],
    territorialDemand: {
      level: 'Estratégica',
      topDepartments: ['Matagalpa', 'Jinotega', 'Nueva Segovia', 'Madriz', 'Estelí', 'Boaco', 'Chontales', 'Río San Juan', 'RACCN', 'RACCS'],
      contextNote: 'Pilar de la economía nicaragüense. Alta necesidad de técnicos para modernizar fincas cafetaleras, ganaderas y granos básicos.'
    },
    entrepreneurshipPotential: 'Bio-fábricas de fertilizantes orgánicos, consultoría de riego, tostado de café especial y clínicas veterinarias de campo.',
    branches: [
      {
        id: 'branch_agronomia',
        name: 'Agronomía y Agricultura Sostenible',
        description: 'Manejo integrado de plagas, fertilización orgánica, sistemas de riego y cosecha tecnificada.',
        riasecCodes: 'RI',
        inatecOptions: ['Técnico General Agropecuario', 'Técnico Especialista en Riego'],
        universityOptions: ['Ingeniería Agronómica', 'Ingeniería en Agroecología', 'Ingeniería Forestal'],
        careerOpportunities: ['Asesor Técnico Agrícola', 'Regente de Fincas', 'Inspector Fitosanitario']
      },
      {
        id: 'branch_veterinaria',
        name: 'Zootecnia y Salud Veterinaria',
        description: 'Cuidado y sanidad de ganado bovino, porcino, aves y animales menores.',
        riasecCodes: 'RIS',
        inatecOptions: ['Técnico General en Veterinaria', 'Técnico General en Zootecnia'],
        universityOptions: ['Medicina Veterinaria', 'Ingeniería Zootecnista'],
        careerOpportunities: ['Técnico Veterinario de Campo', 'Encargado de Sanidad Animal', 'Consultor Ganadero']
      },
      {
        id: 'branch_agroindustria',
        name: 'Agrotransformación y Calidad de Alimentos',
        description: 'Procesamiento de lácteos, café, cacao, embutidos y control de inocuidad alimentaria.',
        riasecCodes: 'RIC',
        inatecOptions: ['Técnico General en Agroindustria de los Alimentos'],
        universityOptions: ['Ingeniería Agroindustrial', 'Ingeniería de Alimentos'],
        careerOpportunities: ['Supervisor de Planta Agroindustrial', 'Auditor de Inocuidad', 'Jefe de Control de Calidad']
      }
    ]
  },
  {
    id: 'salud_sociedad',
    name: 'Salud, Bienestar y Desarrollo Comunitario',
    shortName: 'Salud & Sociedad',
    tagline: 'Cuidado humano, educación integral y fortalecimiento de las familias',
    description: 'Atención médica y preventiva en centros comunitarios, formación de la niñez y juventud, y mediación psicosocial.',
    iconName: 'HeartPulse',
    colorClass: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      gradient: 'from-rose-600 to-pink-700'
    },
    dominantRiasec: ['S', 'I', 'A'],
    territorialDemand: {
      level: 'Alta',
      topDepartments: ['Managua', 'León', 'Matagalpa', 'Chinandega', 'Estelí', 'RACCN', 'RACCS', 'Río San Juan'],
      contextNote: 'Demanda constante y garantizada por el modelo de salud y educación pública gratuita en todo el país.'
    },
    entrepreneurshipPotential: 'Centros de estimulación temprana, farmacias comunitarias, consultorías de tutoría escolar y clínicas de rehabilitación.',
    branches: [
      {
        id: 'branch_enfermeria',
        name: 'Enfermería y Cuidados Clínicos',
        description: 'Atención directa de pacientes, administración de tratamientos y primeros auxilios.',
        riasecCodes: 'SIR',
        inatecOptions: ['Técnico General en Enfermería'],
        universityOptions: ['Licenciatura en Enfermería', 'Medicina General y Cirugía'],
        careerOpportunities: ['Enfermero/a en Centros de Salud', 'Asistente Quirúrgico', 'Coordinador de Jornadas Preventivas']
      },
      {
        id: 'branch_educacion',
        name: 'Docencia y Pedagogía Escolar',
        description: 'Enseñanza de ciencias, lengua, matemáticas y formación técnica para niños y jóvenes.',
        riasecCodes: 'SA',
        inatecOptions: ['Técnico Especialista en Formación Metodológica para Docentes'],
        universityOptions: ['Licenciatura en Pedagogía', 'Ciencias de la Educación (Lengua / Matemática / Ciencias)'],
        careerOpportunities: ['Docente de Primaria/Secundaria', 'Capacitador Técnico', 'Diseñador de Material Didáctico']
      },
      {
        id: 'branch_psicologia',
        name: 'Psicología y Acompañamiento Social',
        description: 'Atención psicológica, orientación escolar y proyectos de bienestar comunitario.',
        riasecCodes: 'SIE',
        inatecOptions: [],
        universityOptions: ['Licenciatura en Psicología', 'Licenciatura en Trabajo Social'],
        careerOpportunities: ['Orientador Vocacional/Escolar', 'Psicólogo Comunitario', 'Consejero Familiar']
      }
    ]
  },
  {
    id: 'industria_infraestructura',
    name: 'Ingeniería, Mecánica e Infraestructura Física',
    shortName: 'Industria & Infraestructura',
    tagline: 'Energía, construcción, maquinaria y mantenimiento industrial',
    description: 'Especialistas técnicos e ingenieros para operar puertos, redes eléctricas, plantas de manufactura y construcción civil.',
    iconName: 'Wrench',
    colorClass: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      gradient: 'from-amber-600 to-orange-700'
    },
    dominantRiasec: ['R', 'C', 'I'],
    territorialDemand: {
      level: 'Alta',
      topDepartments: ['Chinandega', 'León', 'Managua', 'Masaya', 'Carazo', 'Rivas', 'Chontales'],
      contextNote: 'Creciente inversión en energía solar/eólica, plantas agroindustriales y ampliación de carreteras nacionales.'
    },
    entrepreneurshipPotential: 'Talleres mecánicos especializados, instalación de paneles solares residenciales/comerciales, herrería y refrigeración.',
    branches: [
      {
        id: 'branch_mecanica',
        name: 'Mecánica Automotriz y Maquinaria Pesada',
        description: 'Diagnóstico por computadora, reparación de motores diésel/gasolina y sistemas hidráulicos.',
        riasecCodes: 'RC',
        inatecOptions: ['Técnico General en Mecánica Automotriz', 'Técnico General en Mantenimiento Industrial'],
        universityOptions: ['Ingeniería Mecánica', 'Ingeniería Electromecánica'],
        careerOpportunities: ['Mecánico de Flotas', 'Jefe de Mantenimiento', 'Técnico de Diagnóstico Automotriz']
      },
      {
        id: 'branch_electricidad',
        name: 'Electricidad Industrial y Energías Renovables',
        description: 'Montaje de tableros trifásicos, cableado de alta tensión y sistemas fotovoltaicos.',
        riasecCodes: 'RI',
        inatecOptions: ['Técnico General en Electricidad Industrial', 'Técnico Especialista en Energía Solar'],
        universityOptions: ['Ingeniería Eléctrica', 'Ingeniería en Energías Renovables'],
        careerOpportunities: ['Electricista Industrial', 'Instalador de Paneles Solares', 'Operador de Subestaciones']
      },
      {
        id: 'branch_construccion',
        name: 'Construcción Civil y Topografía',
        description: 'Levantamiento de terrenos, cálculo de estructuras, supervisión de obras y planos.',
        riasecCodes: 'RCI',
        inatecOptions: ['Técnico General en Topografía', 'Técnico General en Maestro de Obras'],
        universityOptions: ['Ingeniería Civil', 'Arquitectura'],
        careerOpportunities: ['Topógrafo de Obras', 'Supervisor de Construcción', 'Diseñador de Planos CAD']
      }
    ]
  },
  {
    id: 'negocios_gestion',
    name: 'Administración, Comercio y Finanzas',
    shortName: 'Negocios & Gestión',
    tagline: 'Impulsa organizaciones, lidera ventas y administra con precisión',
    description: 'Gestión contable, comercio internacional, finanzas para empresas y dirección de negocios locales y cooperativas.',
    iconName: 'TrendingUp',
    colorClass: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-800',
      gradient: 'from-indigo-600 to-blue-800'
    },
    dominantRiasec: ['E', 'C', 'S'],
    territorialDemand: {
      level: 'Muy Alta',
      topDepartments: ['Managua', 'León', 'Matagalpa', 'Estelí', 'Masaya', 'Granada', 'Chinandega'],
      contextNote: 'Todo negocio requiere contabilidad, control de inventarios, gestión fiscal y liderazgo comercial.'
    },
    entrepreneurshipPotential: 'Despachos contables, agencias de representación comercial, distribuidoras y tiendas de comercio electrónico.',
    branches: [
      {
        id: 'branch_contabilidad',
        name: 'Contabilidad, Finanzas e Impuestos',
        description: 'Balances financieros, declaraciones fiscales, auditoría y control presupuestario.',
        riasecCodes: 'CE',
        inatecOptions: ['Técnico General en Contabilidad', 'Técnico Especialista en Banca y Finanzas'],
        universityOptions: ['Licenciatura en Contaduría Pública y Finanzas', 'Licenciatura en Economía'],
        careerOpportunities: ['Contador General', 'Analista de Crédito', 'Auditor Financiero']
      },
      {
        id: 'branch_administracion',
        name: 'Administración de Empresas y Mercadeo',
        description: 'Liderazgo de equipos, estrategias de ventas, logística de distribución y servicio al cliente.',
        riasecCodes: 'EC',
        inatecOptions: ['Técnico General en Administración', 'Técnico Especialista en Marketing y Publicidad'],
        universityOptions: ['Licenciatura en Administración de Empresas', 'Licenciatura en Mercadotecnia'],
        careerOpportunities: ['Administrador de Sucursal', 'Gerente de Ventas', 'Coordinador de Logística']
      }
    ]
  },
  {
    id: 'artes_creatividad',
    name: 'Economía Creativa, Diseño y Comunicación',
    shortName: 'Diseño & Creatividad',
    tagline: 'Cultura, identidad visual, turismo y producción multimedia',
    description: 'Diseño gráfico, gastronomía, hotelería turística, medios audiovisuales y promoción de la riqueza cultural nicaragüense.',
    iconName: 'Palette',
    colorClass: {
      bg: 'bg-fuchsia-50',
      text: 'text-fuchsia-700',
      border: 'border-fuchsia-200',
      badgeBg: 'bg-fuchsia-100',
      badgeText: 'text-fuchsia-800',
      gradient: 'from-fuchsia-600 to-purple-800'
    },
    dominantRiasec: ['A', 'E', 'S'],
    territorialDemand: {
      level: 'En Expansión',
      topDepartments: ['Masaya', 'Granada', 'Rivas', 'Managua', 'León', 'Matagalpa', 'RACCS'],
      contextNote: 'Impulsado por el Programa Nacional Nicaragua Creativa, el auge turístico en Rivas/Granada y la demanda de contenido digital.'
    },
    entrepreneurshipPotential: 'Estudios de diseño gráfico, talleres de artesanía moderna, cafeterías temáticas, tour-operadoras y productoras audiovisuales.',
    branches: [
      {
        id: 'branch_diseno',
        name: 'Diseño Gráfico y Multimedia',
        description: 'Creación de marcas, ilustración digital, empaques y piezas publicitarias.',
        riasecCodes: 'AE',
        inatecOptions: ['Técnico General en Diseño Gráfico', 'Técnico Especialista en Animación Digital'],
        universityOptions: ['Licenciatura en Diseño Gráfico', 'Licenciatura en Comunicación Social'],
        careerOpportunities: ['Diseñador de Marca', 'Creador de Contenido Digital', 'Ilustrador Digital']
      },
      {
        id: 'branch_turismo',
        name: 'Turismo Sostenible, Gastronomía y Hotelería',
        description: 'Servicios gastronómicos, administración hotelera y guiado turístico ecológico.',
        riasecCodes: 'ESR',
        inatecOptions: ['Técnico General en Cocina y Gastronomía', 'Técnico General en Guía de Turistas'],
        universityOptions: ['Licenciatura en Turismo Sostenible', 'Licenciatura en Administración Turística y Hotelera'],
        careerOpportunities: ['Chef / Encargado de Cocina', 'Guía Turístico Certificado', 'Administrador de Hotel']
      }
    ]
  }
];

// ── Función para calcular afinidad porcentual por sector basada en scores RIASEC ──
export function calculateSectorAffinities(riasecScores: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};

  MACRO_SECTORS.forEach((sector) => {
    let totalScore = 0;
    let maxPossible = 0;

    sector.dominantRiasec.forEach((code, idx) => {
      const weight = idx === 0 ? 1.5 : idx === 1 ? 1.2 : 1.0;
      const score = riasecScores[code] || 0;
      totalScore += score * weight;
      maxPossible += 100 * weight;
    });

    const percentage = Math.min(100, Math.max(15, Math.round((totalScore / maxPossible) * 100)));
    result[sector.id] = percentage;
  });

  return result;
}
