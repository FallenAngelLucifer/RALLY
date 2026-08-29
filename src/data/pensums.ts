export interface SubjectDetail {
  id: string;
  code: string;
  name: string;
  semester: string;
  category: 'Taller Práctico' | 'Laboratorio' | 'Proyecto Integrador' | 'Fundamentación';
  creditsOrHours: string;
  practicalPercentage: number;
  realWorldSkill: string;
  practicalProject: string;
  toolsUsed: string[];
  difficulty: 'Básica' | 'Intermedia' | 'Avanzada';
}

export interface CareerPensum {
  id: string;
  careerTitle: string;
  institution: string;
  type: 'INATEC' | 'CNU';
  totalDuration: string;
  totalSubjects: number;
  overallPracticalPercentage: number;
  profileOverview: string;
  semesters: {
    number: number;
    title: string;
    subjects: SubjectDetail[];
  }[];
}

export const SAMPLE_PENSUMS: Record<string, CareerPensum> = {
  'inatec_progra_ma': {
    id: 'inatec_progra_ma',
    careerTitle: 'Técnico Especialista en Programación',
    institution: 'INATEC (Centros Tecnológicos Nacionales)',
    type: 'INATEC',
    totalDuration: '1.5 Años (3 Semestres)',
    totalSubjects: 14,
    overallPracticalPercentage: 75,
    profileOverview: 'Aprende a programar software moderno, crear aplicaciones web interactivas y diseñar bases de datos para automatizar empresas y negocios en Nicaragua.',
    semesters: [
      {
        number: 1,
        title: 'Primer Semestre: Fundamentos de Código y Lógica',
        subjects: [
          {
            id: 'sub-p1',
            code: 'PROG-101',
            name: 'Lógica de Programación y Algoritmos',
            semester: '1er Semestre',
            category: 'Laboratorio',
            creditsOrHours: '120 horas',
            practicalPercentage: 80,
            realWorldSkill: 'Desarrollar el pensamiento estructurado para resolver problemas matemáticos y automatizar tareas repetitivas.',
            practicalProject: 'Creación de un simulador de caja registradora y cálculo de facturas con impuestos.',
            toolsUsed: ['Python', 'Pseudocódigo', 'VS Code'],
            difficulty: 'Básica'
          },
          {
            id: 'sub-p2',
            code: 'PROG-102',
            name: 'Desarrollo Web Frontend (HTML5, CSS3, JavaScript)',
            semester: '1er Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '140 horas',
            practicalPercentage: 85,
            realWorldSkill: 'Diseñar páginas web responsivas y adaptadas a teléfonos móviles para comercios y servicios.',
            practicalProject: 'Sitio web comercial interactivo para una panadería o ferretería local con catálogo de productos.',
            toolsUsed: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript'],
            difficulty: 'Básica'
          },
          {
            id: 'sub-p3',
            code: 'PROG-103',
            name: 'Modelado y Gestión de Bases de Datos Relacionales',
            semester: '1er Semestre',
            category: 'Laboratorio',
            creditsOrHours: '100 horas',
            practicalPercentage: 70,
            realWorldSkill: 'Diseñar estructuras de datos seguras para guardar clientes, inventarios y ventas sin pérdida de información.',
            practicalProject: 'Base de datos para el control de inventario de una farmacia comunitaria.',
            toolsUsed: ['MySQL', 'PostgreSQL', 'DBeaver'],
            difficulty: 'Intermedia'
          }
        ]
      },
      {
        number: 2,
        title: 'Segundo Semestre: Desarrollo Web Avanzado y APIs',
        subjects: [
          {
            id: 'sub-p4',
            code: 'PROG-201',
            name: 'Desarrollo Backend con Node.js y APIs REST',
            semester: '2do Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '140 horas',
            practicalPercentage: 80,
            realWorldSkill: 'Crear servidores web rápidos y seguros que conectan aplicaciones móviles con bases de datos en la nube.',
            practicalProject: 'API para un sistema de reservas de hotel o pedidos de comida a domicilio.',
            toolsUsed: ['Node.js', 'Express', 'JWT', 'Postman'],
            difficulty: 'Intermedia'
          },
          {
            id: 'sub-p5',
            code: 'PROG-202',
            name: 'Frameworks Frontend Modernos (React / Vue)',
            semester: '2do Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '160 horas',
            practicalPercentage: 85,
            realWorldSkill: 'Crear aplicaciones web modernas tipo Facebook o Spotify con actualización de datos en tiempo real.',
            practicalProject: 'Tablero interactivo de ventas y métricas para microempresas.',
            toolsUsed: ['React', 'TypeScript', 'Vite', 'Git/GitHub'],
            difficulty: 'Avanzada'
          }
        ]
      },
      {
        number: 3,
        title: 'Tercer Semestre: Apps Móviles y Pasantía en Empresas',
        subjects: [
          {
            id: 'sub-p6',
            code: 'PROG-301',
            name: 'Desarrollo de Aplicaciones Móviles Multiplataforma',
            semester: '3er Semestre',
            category: 'Proyecto Integrador',
            creditsOrHours: '140 horas',
            practicalPercentage: 90,
            realWorldSkill: 'Publicar aplicaciones nativas para teléfonos Android y iOS con mapas y notificaciones push.',
            practicalProject: 'App móvil para transporte local o directorio de emprendimientos de tu municipio.',
            toolsUsed: ['React Native', 'Flutter', 'Firebase'],
            difficulty: 'Avanzada'
          },
          {
            id: 'sub-p7',
            code: 'PROG-302',
            name: 'Pasantía Profesional / Proyecto de Graduación',
            semester: '3er Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '200 horas',
            practicalPercentage: 100,
            realWorldSkill: 'Trabajo real en equipo dentro de una empresa nicaragüense o desarrollo de software para un cliente real.',
            practicalProject: 'Implementación y puesta en marcha de un sistema de facturación electrónica en una empresa real.',
            toolsUsed: ['Metodologías Ágiles (Scrum)', 'Jira', 'Git'],
            difficulty: 'Avanzada'
          }
        ]
      }
    ]
  },
  'inatec_meca_hc': {
    id: 'inatec_meca_hc',
    careerTitle: 'Técnico General en Mecánica Automotriz',
    institution: 'INATEC (Centro Tecnológico Hugo Chávez / Regionales)',
    type: 'INATEC',
    totalDuration: '2 Años (4 Semestres)',
    totalSubjects: 16,
    overallPracticalPercentage: 80,
    profileOverview: 'Diagnostica, desarma y repara motores de gasolina y diésel, sistemas de inyección electrónica, frenos ABS y transmisiones automáticas.',
    semesters: [
      {
        number: 1,
        title: 'Primer Semestre: Mecánica Básica y Motores Térmicos',
        subjects: [
          {
            id: 'sub-m1',
            code: 'MEC-101',
            name: 'Metrología y Ajuste de Piezas Mecánicas',
            semester: '1er Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '100 horas',
            practicalPercentage: 85,
            realWorldSkill: 'Medir con precisión milimétrica pistones, cigüeñales y cilindros para detectar desgaste interno.',
            practicalProject: 'Calibración y rectificación de un monobloque de motor de 4 cilindros.',
            toolsUsed: ['Micrómetro', 'Pie de Rey (Vernier)', 'Torquímetro'],
            difficulty: 'Básica'
          },
          {
            id: 'sub-m2',
            code: 'MEC-102',
            name: 'Desarme y Reconstrucción de Motores de Combustión',
            semester: '1er Semestre',
            category: 'Taller Práctico',
            creditsOrHours: '160 horas',
            practicalPercentage: 90,
            realWorldSkill: 'Desarmar por completo un motor, cambiar anillos, válvulas y empaques, y encenderlo a punto.',
            practicalProject: 'Overhaul completo a un motor Toyota/Nissan en banco de pruebas del taller.',
            toolsUsed: ['Extractores', 'Compresómetro', 'Herramientas neumáticas'],
            difficulty: 'Intermedia'
          }
        ]
      },
      {
        number: 2,
        title: 'Segundo Semestre: Inyección Electrónica y Diagnóstico por Computadora',
        subjects: [
          {
            id: 'sub-m3',
            code: 'MEC-201',
            name: 'Diagnóstico con Escáner Automotriz y Sensores',
            semester: '2do Semestre',
            category: 'Laboratorio',
            creditsOrHours: '140 horas',
            practicalPercentage: 85,
            realWorldSkill: 'Conectar escáneres automotrices, leer códigos de error OBD-II y probar sensores de oxígeno y flujo de aire.',
            practicalProject: 'Detección y solución de fallas eléctricas reales en vehículos de prueba.',
            toolsUsed: ['Escáner Launch/Autel', 'Osciloscopio Automotriz', 'Multímetro Automotriz'],
            difficulty: 'Avanzada'
          }
        ]
      }
    ]
  },
  'unan_agro_mat': {
    id: 'unan_agro_mat',
    careerTitle: 'Ingeniería Agronómica',
    institution: 'FAREM-Matagalpa / Estelí / UNA',
    type: 'CNU',
    totalDuration: '5 Años (10 Semestres)',
    totalSubjects: 45,
    overallPracticalPercentage: 55,
    profileOverview: 'Lidera la producción agrícola sostenible, diseña sistemas de riego tecnificado, maneja la fertilidad del suelo y dirige proyectos de agroexportación.',
    semesters: [
      {
        number: 1,
        title: 'Primer Semestre: Ciencias Básicas y Agroecosistemas',
        subjects: [
          {
            id: 'sub-a1',
            code: 'AGRO-101',
            name: 'Botánica General y Fisiología Vegetal',
            semester: '1er Semestre',
            category: 'Laboratorio',
            creditsOrHours: '4 Créditos',
            practicalPercentage: 50,
            realWorldSkill: 'Comprender los procesos celulares de fotosíntesis, transpiración y absorción de nutrientes en plantas de café y granos.',
            practicalProject: 'Herbario botánico y ensayos de germinación en invernadero.',
            toolsUsed: ['Microscopios', 'Cámaras de germinación', 'Reactivos botánicos'],
            difficulty: 'Básica'
          },
          {
            id: 'sub-a2',
            code: 'AGRO-102',
            name: 'Química Agrícola y Edafología (Ciencia del Suelo)',
            semester: '1er Semestre',
            category: 'Laboratorio',
            creditsOrHours: '4 Créditos',
            practicalPercentage: 60,
            realWorldSkill: 'Realizar análisis de suelo para determinar deficiencias de nitrógeno, fósforo y potasio y calcular planes de abono.',
            practicalProject: 'Muestreo de suelo y reporte de fertilización para una parcela real de café.',
            toolsUsed: ['Kit de análisis de suelo', 'Potenciómetro pH', 'Espectrofotómetro'],
            difficulty: 'Intermedia'
          }
        ]
      }
    ]
  }
};
