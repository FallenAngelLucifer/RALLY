export interface CommunityAnswer {
  id: string;
  authorName: string;
  authorRole: string;
  authorBadge: 'Egresado INATEC' | 'Docente SETEC' | 'Profesional Activo' | 'Estudiante Universitario';
  authorAvatar: string;
  text: string;
  likes: number;
  timeAgo: string;
  isVerifiedAnswer?: boolean;
}

export interface CommunityThread {
  id: string;
  title: string;
  question: string;
  authorName: string;
  authorDepartment: string;
  authorSchool: string;
  authorAvatar: string;
  category: 'Tecnología' | 'Agro y Recursos' | 'Salud' | 'Industria' | 'Negocios' | 'General';
  tags: string[];
  upvotes: number;
  views: number;
  timeAgo: string;
  answers: CommunityAnswer[];
}

export const COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-1',
    title: '¿Qué tan difícil es conseguir trabajo de programador en Nicaragua si estudio un técnico en INATEC?',
    question: 'Estoy en 5to año en Masaya. Me gusta la tecnología pero mi familia no tiene presupuesto para una universidad privada ni para enviarme a Managua 5 años. ¿Las empresas contratan egresados del técnico del INATEC o exigen título de ingeniero?',
    authorName: 'Gabriel Mendoza',
    authorDepartment: 'Masaya',
    authorSchool: 'Instituto Nacional Héroes y Mártires',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    category: 'Tecnología',
    tags: ['Programación', 'INATEC', 'Empleabilidad', 'Salarios'],
    upvotes: 48,
    views: 620,
    timeAgo: 'hace 1 día',
    answers: [
      {
        id: 'ans-1',
        authorName: 'Mario Guido',
        authorRole: 'Líder Técnico en Empresa de Software en Managua',
        authorBadge: 'Profesional Activo',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Gabriel, en tecnología lo que más importa es tu portafolio y lo que sabes programar con tus manos. En mi equipo tenemos egresados del Manuel Olivares (INATEC) que ganan igual o más que graduados de universidades porque tienen mucha práctica creando código real. Te recomiendo hacer el técnico de 1.5 años, crear 3 proyectos reales en GitHub y empezar a trabajar.',
        likes: 38,
        timeAgo: 'hace 20h',
        isVerifiedAnswer: true
      },
      {
        id: 'ans-2',
        authorName: 'Ing. Sofía Alemán',
        authorRole: 'Docente de Sistemas UNAN',
        authorBadge: 'Docente SETEC',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        text: '¡Exacto! Y recuerda la Ruta Progresiva: puedes terminar el técnico del INATEC, comenzar a laborar en una empresa y luego ingresar a la UNAN en modalidad Sabatina para sacar tu Ingeniería mientras ganas tu propio dinero.',
        likes: 29,
        timeAgo: 'hace 16h'
      }
    ]
  },
  {
    id: 'thread-2',
    title: '¿Vale la pena estudiar Medicina Veterinaria en Chontales o Matagalpa?',
    question: 'Vivo en Juigalpa y mis tíos tienen finca de ganado. Me apasiona el cuidado animal pero dudo entre sacar el Técnico General en Veterinaria del INATEC o la carrera de Medicina Veterinaria en la FAREM-Chontales.',
    authorName: 'Elena Martínez',
    authorDepartment: 'Chontales',
    authorSchool: 'Colegio Pablo Hurtado (Juigalpa)',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    category: 'Agro y Recursos',
    tags: ['Veterinaria', 'Chontales', 'Ganadería', 'INATECvsSETEC'],
    upvotes: 35,
    views: 410,
    timeAgo: 'hace 2 días',
    answers: [
      {
        id: 'ans-3',
        authorName: 'Dr. Roberto Lazo',
        authorRole: 'Médico Veterinario Zootecnista',
        authorBadge: 'Egresado INATEC',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: 'Elena, en Chontales el sector pecuario es el rey. El Técnico del INATEC Germán Pomares te da habilidades inmediatas en inseminación artificial, cirugías menores de campo y vacunación. Si aspiras a recetar fármacos controlados y dirigir laboratorios genéticos, la carrera universitaria te dará la regencia oficial. Ambos caminos son súper demandados aquí.',
        likes: 27,
        timeAgo: 'hace 1 día',
        isVerifiedAnswer: true
      }
    ]
  },
  {
    id: 'thread-3',
    title: '¿Qué es el programa Universidad en el Campo (UNICAM) y cómo funciona?',
    question: 'En mi comarca en Jinotega no hay recintos universitarios cerca. El director nos habló de UNICAM. ¿Alguien que esté estudiando ahí nos cuenta su experiencia?',
    authorName: 'Darwin Blandón',
    authorDepartment: 'Jinotega',
    authorSchool: 'Núcleo Educativo Rural El Cuá',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'General',
    tags: ['UNICAM', 'Gratuidad', 'Rural', 'Educación'],
    upvotes: 52,
    views: 890,
    timeAgo: 'hace 3 días',
    answers: [
      {
        id: 'ans-4',
        authorName: 'Lucía Jarquín',
        authorRole: 'Estudiante de Enfermería UNICAM El Cuá',
        authorBadge: 'Estudiante Universitario',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        text: 'Darwin, UNICAM es una bendición. Los profesores de la UNAN vienen directamente a nuestra comunidad los fines de semana. Las clases son 100% gratuitas, no pagamos matrícula y nos enseñan carreras adaptadas a nuestra zona (Enfermería, Agronomía, Educación). ¡Aprovecha la oportunidad!',
        likes: 44,
        timeAgo: 'hace 2 días',
        isVerifiedAnswer: true
      }
    ]
  }
];
