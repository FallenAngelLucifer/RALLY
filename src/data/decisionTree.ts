export interface DecisionOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge?: string;
  scores: {
    R?: number;
    I?: number;
    A?: number;
    S?: number;
    E?: number;
    C?: number;
  };
  preferredTrajectory?: 'tecnica' | 'universitaria' | 'progresiva' | 'emprendimiento';
  tags: string[];
}

export interface DecisionNode {
  id: string;
  level: number;
  title: string;
  question: string;
  context: string;
  options: DecisionOption[];
}

export interface DecisionResult {
  path: string[];
  selectedOptions: DecisionOption[];
  riasecScores: Record<string, number>;
  primarySectorId: string;
  preferredTrajectory: 'tecnica' | 'universitaria' | 'progresiva' | 'emprendimiento';
}

// ── Nivel 1: Los 4 Grandes Retos de Transformación en Nicaragua ───────────────
export const LEVEL_1_NODE: DecisionNode = {
  id: 'reto_pais',
  level: 1,
  title: 'Reto País y Vocación de Impacto',
  question: '¿En qué área te gustaría liderar soluciones reales para tu comunidad y el país?',
  context: 'Imagina que tienes los recursos para resolver un gran desafío en Nicaragua. ¿Cuál despierta más tu energía y curiosidad?',
  options: [
    {
      id: 'agro_recursos',
      title: 'Tierra, Producción y Recursos Sostenibles',
      subtitle: 'Agroindustria, energías renovables, veterinaria y biosfera',
      description: 'Optimizar la producción de alimentos, modernizar fincas con tecnología, proteger ecosistemas como Bosawás o generar energías limpias.',
      iconName: 'Sprout',
      badge: 'Soberanía Alimentaria',
      scores: { R: 4, I: 2, C: 1 },
      tags: ['agro', 'recursos', 'campo', 'sostenibilidad']
    },
    {
      id: 'tecnologia_innovacion',
      title: 'Tecnología, Software y Sistemas Digitales',
      subtitle: 'Programación, redes, inteligencia artificial y automatización',
      description: 'Crear aplicaciones web/móviles, diseñar circuitos automatizados para industrias, proteger datos y conectar a comunidades aisladas.',
      iconName: 'Cpu',
      badge: 'Transformación Digital',
      scores: { I: 4, R: 2, C: 1 },
      tags: ['software', 'tech', 'automatizacion', 'datos']
    },
    {
      id: 'salud_sociedad',
      title: 'Salud, Educación y Desarrollo Comunitario',
      subtitle: 'Medicina, enfermería, docencia, psicología y trabajo social',
      description: 'Cuidar la salud de las familias en centros comunitarios, enseñar a nuevas generaciones o liderar proyectos de bienestar público.',
      iconName: 'HeartHandshake',
      badge: 'Bienestar Social',
      scores: { S: 4, I: 2, A: 1 },
      tags: ['salud', 'docencia', 'comunidad', 'cuidado']
    },
    {
      id: 'creatividad_negocios',
      title: 'Economía Creativa, Diseño y Emprendimiento',
      subtitle: 'Creación de empresas, marketing, artes visuales, turismo y finanzas',
      description: 'Lanzar tu propia marca o cooperativa, diseñar campañas visuales de impacto, impulsar el turismo cultural o gestionar finanzas empresariales.',
      iconName: 'TrendingUp',
      badge: 'Economía Creativa',
      scores: { E: 3, A: 3, C: 1 },
      tags: ['emprendimiento', 'diseno', 'negocios', 'comunicacion']
    }
  ]
};

// ── Nivel 2: Estilo de Acción según el área elegida ───────────────────────────
export const LEVEL_2_NODES: Record<string, DecisionNode> = {
  agro_recursos: {
    id: 'accion_agro',
    level: 2,
    title: 'Tu Rol en la Transformación Productiva',
    question: '¿Cómo prefieres actuar cuando enfrentas un proyecto del sector productivo?',
    context: 'En el sector agropecuario e industrial existen roles muy distintos. Elige tu estilo de trabajo natural:',
    options: [
      {
        id: 'agro_operativo',
        title: 'Manos a la obra en campo y maquinaria',
        subtitle: 'Operación directa, mantenimiento de equipos, siembra y manejo animal',
        description: 'Prefieres estar al aire libre, operando tractores, sistemas de riego, clínicas veterinarias de campo o talleres electromecánicos.',
        iconName: 'Wrench',
        scores: { R: 4, C: 1 },
        tags: ['operacion', 'campo', 'maquinaria']
      },
      {
        id: 'agro_analitico',
        title: 'Análisis científico y control biológico',
        subtitle: 'Laboratorios de suelo, genética vegetal, calidad de agua y sanidad',
        description: 'Prefieres investigar fórmulas de biofertilizantes, analizar muestras bajo microscopio y diseñar planes de manejo ambiental.',
        iconName: 'FlaskConical',
        scores: { I: 4, R: 1 },
        tags: ['laboratorio', 'investigacion', 'suelo']
      },
      {
        id: 'agro_gestion',
        title: 'Administración de fincas y agro-exportación',
        subtitle: 'Comercialización de cosechas, cadenas de valor y cooperativismo',
        description: 'Prefieres negociar precios de café/cacao con compradores, gestionar el presupuesto de la finca y liderar al personal.',
        iconName: 'Briefcase',
        scores: { E: 3, C: 2 },
        tags: ['gestion', 'exportacion', 'negocios_agro']
      }
    ]
  },
  tecnologia_innovacion: {
    id: 'accion_tech',
    level: 2,
    title: 'Tu Enfoque en el Mundo Tecnológico',
    question: '¿Qué tipo de desafíos tecnológicos te resultan más apasionantes?',
    context: 'La tecnología abarca desde el hardware físico hasta el código abstracto. ¿Cuál es tu inclinación?',
    options: [
      {
        id: 'tech_codigo',
        title: 'Desarrollo de Software y Aplicaciones',
        subtitle: 'Programación web, apps móviles, bases de datos y algoritmos',
        description: 'Te gusta sentarte a resolver problemas lógicos en la computadora, creando plataformas funcionales que faciliten la vida de las personas.',
        iconName: 'Code',
        scores: { I: 4, C: 2 },
        tags: ['programacion', 'software', 'algoritmos']
      },
      {
        id: 'tech_hardware',
        title: 'Electrónica, Redes e Infraestructura Física',
        subtitle: 'Ensamblaje, cableado estructurado, robótica y servidores',
        description: 'Prefieres interactuar con dispositivos tangibles: armar servidores, soldar sensores IoT, calibrar antenas y reparar equipos computacionales.',
        iconName: 'HardDrive',
        scores: { R: 4, I: 1 },
        tags: ['redes', 'hardware', 'telecomunicaciones']
      },
      {
        id: 'tech_producto',
        title: 'Diseño UX, Productos Digitales y Liderazgo Tech',
        subtitle: 'Gestión de proyectos tecnológicos, diseño de interfaces y startups',
        description: 'Prefieres conectar a los usuarios con la tecnología: diseñar cómo se ve una app, liderar equipos de programadores y vender la solución al mercado.',
        iconName: 'Layout',
        scores: { A: 3, E: 2, S: 1 },
        tags: ['ui_ux', 'liderazgo_tech', 'gestion_producto']
      }
    ]
  },
  salud_sociedad: {
    id: 'accion_salud',
    level: 2,
    title: 'Tu Vínculo con las Personas y la Comunidad',
    question: '¿De qué forma sientes que generas mayor bienestar en quienes te rodean?',
    context: 'El impacto humano requiere distintas vocaciones: clínica, pedagógica o de organización comunitaria.',
    options: [
      {
        id: 'salud_clinica',
        title: 'Atención Clínica y Cuidados Directos de Salud',
        subtitle: 'Enfermería, medicina, farmacia y rehabilitación física',
        description: 'Sientes vocación por atender pacientes, curar heridas, monitorear signos vitales y aplicar tratamientos en hospitales y centros de salud.',
        iconName: 'Stethoscope',
        scores: { S: 3, I: 3, R: 1 },
        tags: ['clinica', 'enfermeria', 'medicina']
      },
      {
        id: 'salud_educacion',
        title: 'Docencia, Formación y Tutorías Juveniles',
        subtitle: 'Enseñanza escolar, capacitación técnica y pedagogía',
        description: 'Te apasiona explicar conceptos difíciles, guiar a niños y jóvenes a superarse y crear dinámicas de aprendizaje dinámicas e inclusivas.',
        iconName: 'GraduationCap',
        scores: { S: 4, A: 2 },
        tags: ['docencia', 'educacion', 'pedagogia']
      },
      {
        id: 'salud_social',
        title: 'Psicología, Mediación y Desarrollo Social',
        subtitle: 'Salud mental, asesoría familiar, derechos y liderazgo comunal',
        description: 'Prefieres escuchar a las personas en situaciones complejas, orientar en proyectos barriales y diseñar programas de prevención y bienestar.',
        iconName: 'Users',
        scores: { S: 4, E: 1, I: 1 },
        tags: ['psicologia', 'social', 'comunidad']
      }
    ]
  },
  creatividad_negocios: {
    id: 'accion_negocios',
    level: 2,
    title: 'Tu Estilo en la Economía Creativa y Negocios',
    question: '¿Cuál es tu motor principal al pensar en proyectos y negocios?',
    context: 'En el mundo de los negocios y el arte convergen la visión financiera, la creatividad visual y el don de gentes.',
    options: [
      {
        id: 'negocios_empresa',
        title: 'Liderazgo Emprendedor y Ventas Estratégicas',
        subtitle: 'Creación de negocios, negociación de contratos y liderazgo de equipos',
        description: 'Te motiva asumir riesgos calculados, identificar oportunidades de mercado, convencer a inversionistas y hacer crecer un negocio propio.',
        iconName: 'Building',
        scores: { E: 4, C: 1 },
        tags: ['emprendimiento', 'ventas', 'liderazgo']
      },
      {
        id: 'negocios_creatividad',
        title: 'Diseño Gráfico, Multimedia y Comunicación',
        subtitle: 'Identidad de marca, publicidad, fotografía, video y contenido',
        description: 'Prefieres expresar ideas visuales: diseñar logotipos, crear campañas audiovisuales, diagramar marcas y producir contenido digital atractivo.',
        iconName: 'Palette',
        scores: { A: 4, E: 1 },
        tags: ['diseno_grafico', 'publicidad', 'audiovisual']
      },
      {
        id: 'negocios_finanzas',
        title: 'Contabilidad, Logística y Finanzas Precisas',
        subtitle: 'Control de presupuestos, administración fiscal e inventarios',
        description: 'Prefieres el rigor numérico y organizativo: llevar libros contables, calcular márgenes de ganancia, optimizar costos y ordenar almacenes.',
        iconName: 'Calculator',
        scores: { C: 4, E: 1 },
        tags: ['contabilidad', 'finanzas', 'logistica']
      }
    ]
  }
};

// ── Nivel 3: Micro-dilema Situacional Territorial ────────────────────────────
export const LEVEL_3_NODES: Record<string, DecisionNode> = {
  // Agro
  agro_operativo: {
    id: 'dilema_agro_op',
    level: 3,
    title: 'Micro-Dilema: Reparación Crítica en Finca',
    question: 'En plena época de cosecha, el sistema de bombeo y tractor principal fallan. ¿Qué decides hacer?',
    context: 'El tiempo apremia para salvar la producción del día.',
    options: [
      {
        id: 'agro_op_mecanica',
        title: 'Diagnosticar y reparar mecánicamente las piezas en el taller',
        subtitle: 'Desarmar, soldar y calibrar el motor con tus propias herramientas',
        description: 'Confías en tu habilidad técnica práctica para arreglar el problema de inmediato.',
        iconName: 'Wrench',
        scores: { R: 4, C: 1 },
        tags: ['mecanica', 'reparacion']
      },
      {
        id: 'agro_op_electrico',
        title: 'Instalar un sistema de respaldo eléctrico / solar automatizado',
        subtitle: 'Diseñar una conexión de emergencia con paneles y sensores',
        description: 'Buscas una solución moderna y sostenible para que la falla no se repita nunca más.',
        iconName: 'Zap',
        scores: { R: 3, I: 2 },
        tags: ['electricidad', 'energia_solar']
      }
    ]
  },
  agro_analitico: {
    id: 'dilema_agro_an',
    level: 3,
    title: 'Micro-Dilema: Plaga en Cultivos Regionales',
    question: 'Aparece una plaga desconocida que amenaza cafetales y granos básicos en tu departamento. ¿Cómo intervienes?',
    context: 'Los agricultores locales buscan una solución urgente que no contamine los ríos.',
    options: [
      {
        id: 'agro_an_biocontrol',
        title: 'Desarrollar un bio-controlador natural en laboratorio',
        subtitle: 'Aislar microorganismos benéficos para combatir la plaga sin químicos tóxicos',
        description: 'Priorizas la investigación científica y la sostenibilidad ecológica.',
        iconName: 'FlaskConical',
        scores: { I: 4, R: 1 },
        tags: ['biotecnologia', 'agroecologia']
      },
      {
        id: 'agro_an_extension',
        title: 'Diseñar un protocolo de muestreo y capacitar a las familias campesinas',
        subtitle: 'Capacitación comunitaria en el terreno para detectar y aislar brotes a tiempo',
        description: 'Priorizas la transferencia de conocimiento práctico a las comunidades.',
        iconName: 'Users',
        scores: { S: 3, I: 2 },
        tags: ['extensionismo', 'capacitacion']
      }
    ]
  },
  agro_gestion: {
    id: 'dilema_agro_ges',
    level: 3,
    title: 'Micro-Dilema: Acceso a Mercados Internacionales',
    question: 'Una cooperativa de pequeños productores quiere exportar cacao con sello de comercio justo. ¿Cuál es tu prioridad?',
    context: 'Se requiere certificar procesos y negociar con compradores extranjeros.',
    options: [
      {
        id: 'agro_ges_negociar',
        title: 'Negociar acuerdos comerciales directos y buscar clientes en el exterior',
        subtitle: 'Liderar las ventas y asegurar el mejor precio para las familias asociadas',
        description: 'Te enfocas en la rentabilidad y el posicionamiento del producto nicaragüense.',
        iconName: 'Globe',
        scores: { E: 4, S: 1 },
        tags: ['comercio_exterior', 'ventas_agro']
      },
      {
        id: 'agro_ges_calidad',
        title: 'Estandarizar procesos de trazabilidad, empaque y normativas de calidad',
        subtitle: 'Organizar auditorías y registros rigurosos para cumplir estándares internacionales',
        description: 'Te enfocas en el orden, la certificación y el control de calidad sistemático.',
        iconName: 'FileCheck',
        scores: { C: 4, I: 1 },
        tags: ['calidad', 'normativas', 'certificaciones']
      }
    ]
  },

  // Tech
  tech_codigo: {
    id: 'dilema_tech_cod',
    level: 3,
    title: 'Micro-Dilema: Software para Microempresas Locales',
    question: 'Pequeños negocios en tu municipio necesitan digitalizarse pero no tienen internet estable. ¿Qué solución diseñas?',
    context: 'Se busca inclusión digital accesible y rápida para mercados locales.',
    options: [
      {
        id: 'tech_cod_pwa',
        title: 'Una aplicación web ligera offline-first con sincronización automática',
        subtitle: 'Programar en TypeScript/React con base de datos local rápida y segura',
        description: 'Te apasiona la ingeniería de software moderna y resolver problemas de conectividad.',
        iconName: 'Binary',
        scores: { I: 4, C: 1 },
        tags: ['desarrollo_web', 'software']
      },
      {
        id: 'tech_cod_datos',
        title: 'Un sistema inteligente de inventarios y predicción de ventas',
        subtitle: 'Crear algoritmos de analítica para predecir demanda y evitar pérdidas de producto',
        description: 'Te apasiona el análisis de datos matemáticos y la inteligencia empresarial.',
        iconName: 'LineChart',
        scores: { I: 4, E: 1 },
        tags: ['datos', 'analitica', 'ia']
      }
    ]
  },
  tech_hardware: {
    id: 'dilema_tech_hard',
    level: 3,
    title: 'Micro-Dilema: Conectar Escuelas Comunitarias',
    question: 'Una red de centros educativos en zonas rurales necesita conectividad e infraestructura digital. ¿Cuál es tu propuesta?',
    context: 'El objetivo es garantizar acceso a recursos educativos de forma robusta.',
    options: [
      {
        id: 'tech_hard_redes',
        title: 'Instalar torres de radioenlace, cableado seguro y servidores locales de contenido',
        subtitle: 'Montar antenas, configurar routers Mikrotik/Cisco y servidores en cada escuela',
        description: 'Disfrutas el trabajo técnico manual de redes y telecomunicaciones en el terreno.',
        iconName: 'Radio',
        scores: { R: 4, I: 1 },
        tags: ['redes', 'telecomunicaciones']
      },
      {
        id: 'tech_hard_iot',
        title: 'Desarrollar estaciones con microcontroladores (Arduino/ESP32) de bajo consumo',
        subtitle: 'Diseñar módulos electrónicos resistentes con energía solar para clases prácticas',
        description: 'Te gusta la robótica aplicada, la electrónica y los circuitos embebidos.',
        iconName: 'Cpu',
        scores: { R: 3, I: 3 },
        tags: ['electronica', 'robotica']
      }
    ]
  },
  tech_producto: {
    id: 'dilema_tech_prod',
    level: 3,
    title: 'Micro-Dilema: Lanzamiento de App Vocacional',
    question: 'Vas a lanzar una plataforma educativa para 50,000 estudiantes de secundaria en Nicaragua. ¿En qué pones tu foco?',
    context: 'Se requiere alta adopción y facilidad de uso por parte de los jóvenes.',
    options: [
      {
        id: 'tech_prod_ux',
        title: 'Diseño visual intuitivo, accesible y con lenguaje inclusivo para jóvenes',
        subtitle: 'Diseñar prototipos interactivos, pruebas con usuarios reales y flujo de pantallas fluido',
        description: 'Priorizas la empatía visual, la experiencia de usuario y el diseño estético.',
        iconName: 'Layout',
        scores: { A: 4, S: 1 },
        tags: ['ux_ui', 'diseno_producto']
      },
      {
        id: 'tech_prod_growth',
        title: 'Estrategia de alianzas con colegios, INATEC, MINED y difusión nacional',
        subtitle: 'Coordinar con directores, capacitar a docentes y liderar el crecimiento de la plataforma',
        description: 'Priorizas el liderazgo, la oratoria y las alianzas institucionales.',
        iconName: 'Megaphone',
        scores: { E: 4, S: 2 },
        tags: ['crecimiento', 'alianzas', 'liderazgo']
      }
    ]
  },

  // Salud
  salud_clinica: {
    id: 'dilema_salud_clin',
    level: 3,
    title: 'Micro-Dilema: Jornada de Salud en Comunidad Lejana',
    question: 'Llegas a un municipio rural donde las familias tienen poco acceso a chequeos preventivos. ¿Cuál es tu enfoque?',
    context: 'Se deben priorizar recursos y atender a la mayor cantidad de personas con calidad y calidez.',
    options: [
      {
        id: 'salud_clin_atencion',
        title: 'Atención primaria directa: curaciones, signos vitales y primeros auxilios',
        subtitle: 'Cuidado humano personalizado, administración de medicamentos y chequeo preventivo',
        description: 'Tienes vocación de servicio directo en enfermería y atención médica continua.',
        iconName: 'HeartPulse',
        scores: { S: 4, R: 1 },
        tags: ['enfermeria', 'salud_primaria']
      },
      {
        id: 'salud_clin_diagnostico',
        title: 'Diagnóstico en laboratorio clínico y análisis de muestras rápidas',
        subtitle: 'Procesar pruebas de sangre, heces y orina para identificar infecciones con precisión',
        description: 'Prefieres el rigor del laboratorio bioanálisis para dar el diagnóstico certero.',
        iconName: 'Microscope',
        scores: { I: 4, S: 1 },
        tags: ['bioanalisis', 'laboratorio_clinico']
      }
    ]
  },
  salud_educacion: {
    id: 'dilema_salud_edu',
    level: 3,
    title: 'Micro-Dilema: Estudiantes con Dificultades de Aprendizaje',
    question: 'En tu aula escolar notas que un grupo de estudiantes se queda atrás en matemáticas y lectura. ¿Cómo actúas?',
    context: 'Quieres que ningún estudiante abandone la escuela.',
    options: [
      {
        id: 'salud_edu_didactica',
        title: 'Crear métodos didácticos y juegos interactivos adaptados a su ritmo',
        subtitle: 'Diseñar actividades lúdicas, material visual y talleres grupales de refuerzo',
        description: 'Crees en la creatividad pedagógica para hacer el aprendizaje divertido y accesible.',
        iconName: 'Sparkles',
        scores: { S: 3, A: 3 },
        tags: ['didactica', 'pedagogia_creativa']
      },
      {
        id: 'salud_edu_tutoria',
        title: 'Orientación individualizada con la familia para entender su entorno',
        subtitle: 'Visitas y diálogo con padres para crear un plan de apoyo integral en casa y la escuela',
        description: 'Crees en el acompañamiento psicosocial y el compromiso del núcleo familiar.',
        iconName: 'HeartHandshake',
        scores: { S: 4, E: 1 },
        tags: ['tutoria', 'apoyo_familiar']
      }
    ]
  },
  salud_social: {
    id: 'dilema_salud_soc',
    level: 3,
    title: 'Micro-Dilema: Proyecto Juvenil contra la Deserción',
    question: 'Varios jóvenes de tu barrio están pensando en dejar los estudios para buscar cualquier trabajo informal. ¿Cómo intervienes?',
    context: 'Buscas brindarles herramientas para que visualicen un futuro digno.',
    options: [
      {
        id: 'salud_soc_psico',
        title: 'Talleres de proyecto de vida, autoestima y salud mental',
        subtitle: 'Espacios de escucha activa, manejo de emociones y orientación vocacional guiada',
        description: 'Te enfocas en el acompañamiento psicológico y el fortalecimiento emocional.',
        iconName: 'Smile',
        scores: { S: 4, I: 1 },
        tags: ['psicologia', 'salud_mental']
      },
      {
        id: 'salud_soc_talleres',
        title: 'Crear un club de emprendimiento juvenil y habilidades técnicas rápidas',
        subtitle: 'Conectar a los jóvenes con cursos del INATEC y primeros proyectos productivos',
        description: 'Te enfocas en soluciones prácticas de inserción laboral y capacitación técnica.',
        iconName: 'Rocket',
        scores: { E: 3, S: 2, R: 1 },
        tags: ['liderazgo_juvenil', 'formacion_tecnica']
      }
    ]
  },

  // Negocios y Creatividad
  negocios_empresa: {
    id: 'dilema_neg_emp',
    level: 3,
    title: 'Micro-Dilema: Lanzamiento de Marca Departamental',
    question: 'Quieres lanzar un nuevo emprendimiento gastronómico/turístico representativo de tu departamento. ¿Cuál es tu estrategia?',
    context: 'Compites contra marcas consolidadas y cuentas con presupuesto inicial limitado.',
    options: [
      {
        id: 'neg_emp_marketing',
        title: 'Campaña viral en redes sociales, eventos vivenciales e influencers locales',
        subtitle: 'Crear expectativa, degustaciones públicas y atraer clientes rápidamente con promociones',
        description: 'Te apasiona la persuasión, las relaciones públicas y las ventas dinámicas.',
        iconName: 'Megaphone',
        scores: { E: 4, A: 2 },
        tags: ['marketing', 'ventas', 'rrpp']
      },
      {
        id: 'neg_emp_alianzas',
        title: 'Crear alianzas con hoteles, tour-operadoras y restaurantes establecidos',
        subtitle: 'Vender paquetes combinados B2B y asegurar contratos mensuales estables',
        description: 'Te apasiona la negociación formal y los acuerdos comerciales a largo plazo.',
        iconName: 'Handshake',
        scores: { E: 4, C: 1 },
        tags: ['negociaciones', 'alianzas_comerciales']
      }
    ]
  },
  negocios_creatividad: {
    id: 'dilema_neg_crea',
    level: 3,
    title: 'Micro-Dilema: Campaña de Orgullo y Cultura Nicaragüense',
    question: 'Te encargan la dirección creativa para promocionar el arte, las artesanías y tradiciones de tu municipio. ¿Qué medio eliges?',
    context: 'Se busca impactar tanto a turistas nacionales como internacionales.',
    options: [
      {
        id: 'neg_crea_audiovisual',
        title: 'Una serie documental cinematográfica con fotografía artística y música tradicional',
        subtitle: 'Grabar con cámaras de alta resolución, edición rítmica y diseño sonoro envolvente',
        description: 'Te apasiona la cinematografía, la dirección de arte y la narrativa audiovisual.',
        iconName: 'Film',
        scores: { A: 5, I: 1 },
        tags: ['audiovisual', 'fotografia', 'cine']
      },
      {
        id: 'neg_crea_branding',
        title: 'Diseño de identidad visual completa, empaques ecológicos y catálogo digital interactivo',
        subtitle: 'Crear tipografías, ilustraciones de flora/fauna nicaragüense y tienda virtual',
        description: 'Te apasiona el diseño gráfico, el branding y el diseño editorial digital.',
        iconName: 'Palette',
        scores: { A: 4, E: 1, C: 1 },
        tags: ['diseno_grafico', 'branding', 'ilustracion']
      }
    ]
  },
  negocios_finanzas: {
    id: 'dilema_neg_fin',
    level: 3,
    title: 'Micro-Dilema: Reestructuración de una Empresa Local',
    question: 'Una empresa local de transporte y comercio tiene pérdidas por desorden en sus cuentas e inventarios. ¿Cómo la salvas?',
    context: 'El dueño te pide que tomes el control financiero de inmediato.',
    options: [
      {
        id: 'neg_fin_auditoria',
        title: 'Auditoría contable completa, balance fiscal y recorte de gastos innecesarios',
        subtitle: 'Revisar cada factura, cuadrar libros contables y establecer controles anti-fuga',
        description: 'Disfrutas la exactitud matemática, la contabilidad y el cumplimiento de normas.',
        iconName: 'Calculator',
        scores: { C: 5, E: 1 },
        tags: ['contabilidad', 'auditoria', 'finanzas']
      },
      {
        id: 'neg_fin_logistica',
        title: 'Automatizar el control de rutas, inventario por código de barras y tiempos de entrega',
        subtitle: 'Reorganizar el almacén, capacitar al personal en software ERP y agilizar envíos',
        description: 'Disfrutas la logística, la eficiencia de procesos y la gestión de cadenas de suministro.',
        iconName: 'Truck',
        scores: { C: 4, R: 2 },
        tags: ['logistica', 'inventarios', 'administracion']
      }
    ]
  }
};

// ── Nivel 4: Prioridad de Vida, Tiempo y Horizonte Económico ──────────────────
export const LEVEL_4_NODE: DecisionNode = {
  id: 'prioridad_vida',
  level: 4,
  title: 'Tu Horizonte de Vida y Trayectoria Ideal',
  question: 'Considerando tu situación personal y familiar, ¿cuál es tu prioridad al salir de secundaria?',
  context: 'No hay respuestas correctas o incorrectas. Cada camino es valioso y responde a momentos y metas distintas de cada joven.',
  options: [
    {
      id: 'prioridad_tecnica',
      title: 'Inserción Laboral Rápida (1 a 2 años)',
      subtitle: 'Educación Técnica INATEC: 70% práctica, talleres reales, costo cero y rápida autonomía económica.',
      description: 'Deseo capacitarme en una especialidad técnica con alta demanda laboral para empezar a generar ingresos propios pronto.',
      iconName: 'Zap',
      preferredTrajectory: 'tecnica',
      badge: 'Práctico y Rápido',
      scores: { R: 2, C: 1 },
      tags: ['tecnico_inatec', 'insercion_rapida']
    },
    {
      id: 'prioridad_universitaria',
      title: 'Carrera Universitaria de Grado (4 a 5 años)',
      subtitle: 'Educación Universitaria SETEC: Fundamentación teórica, investigación profunda y titulación de licenciatura o ingeniería.',
      description: 'Deseo dedicar varios años al estudio universitario a tiempo completo para aspirar a cargos de diseño, investigación o gerencia.',
      iconName: 'GraduationCap',
      preferredTrajectory: 'universitaria',
      badge: 'Profundización y Grado',
      scores: { I: 2, S: 1 },
      tags: ['universidad_setec', 'licenciatura_ingenieria']
    },
    {
      id: 'prioridad_progresiva',
      title: 'Ruta Progresiva / Combinada (La Ruta Flexible)',
      subtitle: 'Técnico corto primero $\\rightarrow$ Trabajo e ingresos $\\rightarrow$ Universidad sabatina o virtual.',
      description: 'Quiero ganar experiencia y dinero rápido con un técnico, y financiar mis estudios universitarios superiores sin depender solo de mi familia.',
      iconName: 'Layers',
      preferredTrajectory: 'progresiva',
      badge: 'Trabajo + Continuidad',
      scores: { E: 2, R: 1, C: 1 },
      tags: ['ruta_progresiva', 'sabatino_virtual']
    },
    {
      id: 'prioridad_emprendimiento',
      title: 'Emprendimiento Propio & Servicios Locales',
      subtitle: 'Aprender un oficio o habilidad clave para montar mi propio taller, negocio o consultoría.',
      description: 'Quiero tener mi propio negocio, ser mi propio jefe y brindar soluciones directas a clientes en mi municipio.',
      iconName: 'Rocket',
      preferredTrajectory: 'emprendimiento',
      badge: 'Independencia Total',
      scores: { E: 3, A: 1 },
      tags: ['emprendedor', 'negocio_propio']
    }
  ]
};
