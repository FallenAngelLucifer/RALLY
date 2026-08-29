export interface ReelComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
}

export interface CareerReel {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  institution: string;
  institutionType: 'INATEC' | 'SETEC' | 'Profesional';
  department: string;
  careerTitle: string;
  careerId: string;
  videoUrl?: string; // or simulated visual preview
  gradient: string;
  iconName: string;
  caption: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  dayInTheLifeHighlights: string[];
  salaryReference: string;
  comments: ReelComment[];
}

export const CAREER_REELS: CareerReel[] = [
  {
    id: 'reel-1',
    authorName: 'Carlos Mendoza',
    authorRole: 'Técnico Especialista en Programación',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    institution: 'Centro Tecnológico Manuel Olivares (INATEC)',
    institutionType: 'INATEC',
    department: 'Managua',
    careerTitle: 'Técnico Especialista en Programación',
    careerId: 'inatec_progra_ma',
    gradient: 'from-blue-900 via-indigo-950 to-slate-900',
    iconName: 'Code',
    caption: '¡Un día programando en el laboratorio! 💻 Muchos creen que necesitas 5 años para hacer apps, pero en 1 año y medio ya estoy trabajando remoto para una empresa de Managua. #INATEC #TechNicaragua #Programación',
    tags: ['Programación', 'Software', 'TrabajoRemoto', 'INATEC'],
    likesCount: 1420,
    commentsCount: 89,
    sharesCount: 210,
    dayInTheLifeHighlights: [
      '8:00 AM - Revisión de código en React y TypeScript en el laboratorio',
      '11:00 AM - Prueba de base de datos con sistemas de inventario para una cooperativa',
      '2:00 PM - Proyecto integrador de pasantía laboral'
    ],
    salaryReference: 'C$ 18,000 - C$ 35,000 / mes',
    comments: [
      {
        id: 'c1',
        author: 'Valeria S.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        text: '¿Es verdad que es 100% gratis la matrícula y no cobran mensualidad?',
        timeAgo: 'hace 2h',
        likes: 24
      },
      {
        id: 'c2',
        author: 'Carlos Mendoza (Creador)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: '@Valeria S. ¡Sí! En todos los centros INATEC la carrera es 100% gratuita y te dan las computadoras en clase.',
        timeAgo: 'hace 1h',
        likes: 45
      }
    ]
  },
  {
    id: 'reel-2',
    authorName: 'Yolanda Gutiérrez',
    authorRole: 'Ingeniera Agrónoma',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    institution: 'FAREM-Matagalpa (UNAN)',
    institutionType: 'SETEC',
    department: 'Matagalpa',
    careerTitle: 'Ingeniería Agronómica',
    careerId: 'unan_agro_mat',
    gradient: 'from-emerald-950 via-teal-900 to-slate-900',
    iconName: 'Sprout',
    caption: '¡Día de campo en cafetales de Jinotega y Matagalpa! 🌿 Analizando suelos y control biológico de plagas sin pesticidas químicos. El agro nicaragüense necesita modernizarse con ciencia. #AgroNicaragua #UNAN #Matagalpa',
    tags: ['Agronomía', 'Café', 'Sostenibilidad', 'UNAN'],
    likesCount: 2350,
    commentsCount: 142,
    sharesCount: 380,
    dayInTheLifeHighlights: [
      '7:00 AM - Muestreo de suelo y pH en finca experimental',
      '10:30 AM - Análisis en microscopio de microorganismos benéficos',
      '1:30 PM - Asesoría técnica a cooperativa de productores'
    ],
    salaryReference: 'C$ 20,000 - C$ 40,000 / mes',
    comments: [
      {
        id: 'c3',
        author: 'Marcos P.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: '¿Recomiendas empezar con el técnico agropecuario del INATEC o ir directo a la UNAN?',
        timeAgo: 'hace 4h',
        likes: 31
      }
    ]
  },
  {
    id: 'reel-3',
    authorName: 'Kevin Silva',
    authorRole: 'Técnico General en Electricidad Industrial',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    institution: 'Centro Tecnológico Padre Teodoro Kint (INATEC)',
    institutionType: 'INATEC',
    department: 'Chinandega',
    careerTitle: 'Técnico General en Electricidad Industrial',
    careerId: 'inatec_elect_ji',
    gradient: 'from-amber-950 via-orange-900 to-slate-900',
    iconName: 'Zap',
    caption: 'Montando un tablero trifásico para una planta agroindustrial en Occidente ⚡ La demanda de electricistas industriales calificados es enorme en ingenios y puertos. #Electricidad #INATEC #Chinandega #ChambaReal',
    tags: ['Electricidad', 'Industria', 'Occidente', 'Energía'],
    likesCount: 1890,
    commentsCount: 76,
    sharesCount: 190,
    dayInTheLifeHighlights: [
      '8:00 AM - Lectura e interpretación de planos unifilares',
      '11:00 AM - Instalación de contactores y variadores de frecuencia',
      '3:00 PM - Pruebas de seguridad eléctrica y puesta a tierra'
    ],
    salaryReference: 'C$ 16,000 - C$ 32,000 / mes',
    comments: [
      {
        id: 'c4',
        author: 'Josué R.',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        text: 'Bro, ¿en cuánto tiempo terminaste y encontraste trabajo?',
        timeAgo: 'hace 5h',
        likes: 18
      }
    ]
  },
  {
    id: 'reel-4',
    authorName: 'Dra. Gabriela Solís',
    authorRole: 'Licenciada en Enfermería',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    institution: 'UNAN-León (Facultad de Ciencias Médicas)',
    institutionType: 'SETEC',
    department: 'León',
    careerTitle: 'Licenciatura en Enfermería',
    careerId: 'unan_enf_leon',
    gradient: 'from-rose-950 via-pink-900 to-slate-900',
    iconName: 'HeartPulse',
    caption: '¡Jornada de atención y cuidados en el Hospital Escuela Óscar Danilo Rosales! 🏥 La vocación de cuidar a otros es lo más gratificante que existe. #Enfermería #UNANLeón #SaludNicaragua',
    tags: ['Enfermería', 'Medicina', 'Salud', 'UNANLeón'],
    likesCount: 3120,
    commentsCount: 205,
    sharesCount: 520,
    dayInTheLifeHighlights: [
      '7:00 AM - Entrega de turno y monitoreo de constantes vitales',
      '10:00 AM - Administración segura de medicamentos y canalizaciones',
      '1:00 PM - Acompañamiento humanizado a pacientes y familiares'
    ],
    salaryReference: 'C$ 17,000 - C$ 28,000 / mes',
    comments: [
      {
        id: 'c5',
        author: 'Andrea T.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        text: 'Mi sueño es estudiar enfermería en León, gracias por inspirarnos ❤️',
        timeAgo: 'hace 1h',
        likes: 54
      }
    ]
  },
  {
    id: 'reel-5',
    authorName: 'Rodrigo Castillo',
    authorRole: 'Diseñador Gráfico & Emprendedor',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    institution: 'Centro Tecnológico de Masaya / Estudio Propio',
    institutionType: 'Profesional',
    department: 'Masaya',
    careerTitle: 'Técnico General en Diseño Gráfico',
    careerId: 'inatec_diseno_ma',
    gradient: 'from-fuchsia-950 via-purple-900 to-slate-900',
    iconName: 'Palette',
    caption: '¡Cómo pasé de estudiar diseño en Masaya a tener mi propia agencia de marcas para restaurantes y hoteles de Granada y San Juan del Sur! 🎨 #DiseñoNica #Emprendimiento #Masaya',
    tags: ['DiseñoGráfico', 'Branding', 'Emprender', 'Masaya'],
    likesCount: 2780,
    commentsCount: 165,
    sharesCount: 430,
    dayInTheLifeHighlights: [
      '9:00 AM - Bocetos e identidad visual en Illustrator y Figma',
      '1:00 PM - Sesión fotográfica de empaques para artesanías',
      '4:00 PM - Presentación de propuesta a clientes'
    ],
    salaryReference: 'C$ 15,000 - C$ 45,000 / mes (Autónomo)',
    comments: [
      {
        id: 'c6',
        author: 'Camila V.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        text: '¡Brutal! Qué programas te enseñan en el primer año?',
        timeAgo: 'hace 3h',
        likes: 29
      }
    ]
  }
];
