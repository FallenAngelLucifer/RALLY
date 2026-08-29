import { jsPDF } from 'jspdf';
import type { EducationalOffer } from './indexedDB';
import { MACRO_SECTORS, calculateSectorAffinities } from '../data/sectors';

export interface UserProfile {
  department: string;
  municipality: string;
  riasecScores: Record<string, number>;
  hollandCode: string;
  studentName?: string;
}

const CATEGORY_NAMES: Record<string, string> = {
  R: 'Realista',
  I: 'Investigador',
  A: 'Artístico',
  S: 'Social',
  E: 'Emprendedor',
  C: 'Convencional'
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  R: 'Enfoque en actividades prácticas, herramientas, maquinaria, naturaleza y construcción.',
  I: 'Enfoque en análisis lógico, investigación científica, matemáticas y resolución técnica.',
  A: 'Enfoque en autoexpresión, diseño visual, comunicación multimedia, arte y creatividad.',
  S: 'Enfoque en docencia, salud comunitaria, psicología, orientación y bienestar de personas.',
  E: 'Enfoque en liderazgo de proyectos, creación de empresas, ventas, persuasión y finanzas.',
  C: 'Enfoque en contabilidad, gestión de inventarios, procesos ordenados y cumplimiento normativo.'
};

export class PDFGeneratorService {
  public static generate(
    profile: UserProfile,
    recommendations: (EducationalOffer & { matchScore: number })[]
  ): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let y = 20;
    const pageHeight = 297;
    const margin = 18;
    const contentWidth = 210 - (margin * 2);

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage();
        y = 20;
        drawHeaderFooter();
      }
    };

    const drawHeaderFooter = () => {
      // Header band (RUMBO Navy #001B48)
      doc.setFillColor(0, 27, 72);
      doc.rect(0, 0, 210, 8, 'F');

      // Accent colored stripe (RUMBO Cyan #00C2FF)
      doc.setFillColor(0, 194, 255);
      doc.rect(0, 8, 210, 2, 'F');
      
      // Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('RUMBO · Tu camino, tu vocación, tu futuro | Sistema Educativo Nacional (MINED · INATEC · CNU)', margin, pageHeight - 8);
      const pageCount = doc.getNumberOfPages();
      doc.text(`Pág. ${pageCount}`, 210 - margin - 8, pageHeight - 8);
    };

    // First page setup
    drawHeaderFooter();
    y = 23;

    // Document Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(0, 27, 72); // RUMBO Navy
    doc.text('RUMBO · PASAPORTE VOCACIONAL', margin, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 87, 255); // RUMBO Royal Blue
    const today = new Date().toLocaleDateString('es-NI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Tu camino, tu vocación, tu futuro | Emisión Oficial: ${today}`, margin, y);
    y += 8;

    // Geographic Context Card
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('CALIBRACIÓN TERRITORIAL & AFINIDAD', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Departamento: ${profile.department}   |   Municipio: ${profile.municipality}   |   Código Holland: ${profile.hollandCode}`, margin + 4, y + 11);
    y += 22;

    // ── Section 1: Psychometric & Holland Profile ──
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('1. Perfil Vocacional y Dimensiones RIASEC', margin, y);
    y += 6;

    const sortedScores = Object.entries(profile.riasecScores).sort((a, b) => b[1] - a[1]);
    sortedScores.forEach(([key, val]) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${CATEGORY_NAMES[key]} (${key}): ${val}%`, margin, y + 3.5);

      // Bar container
      doc.setFillColor(241, 245, 249);
      doc.rect(margin + 55, y + 0.5, 95, 3.5, 'F');

      // Score bar
      if (profile.hollandCode.includes(key)) {
        doc.setFillColor(37, 99, 235); // blue-600
      } else {
        doc.setFillColor(148, 163, 184); // slate-400
      }
      doc.rect(margin + 55, y + 0.5, Math.max(val * 0.95, 2), 3.5, 'F');
      y += 6;
    });

    y += 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const topThree = profile.hollandCode.split('');
    topThree.forEach((char) => {
      if (CATEGORY_DESCRIPTIONS[char]) {
        checkPageBreak(6);
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${CATEGORY_NAMES[char]} (${char}): `, margin + 2, y + 3);
        doc.setFont('helvetica', 'normal');
        const desc = doc.splitTextToSize(CATEGORY_DESCRIPTIONS[char], contentWidth - 35);
        doc.text(desc, margin + 35, y + 3);
        y += (desc.length * 3.5) + 1.5;
      }
    });
    y += 4;

    // ── Section 2: Macro-Sectors & Territorial Opportunity ──
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('2. Macro-Sectores Productivos de Mayor Afinidad', margin, y);
    y += 6;

    const affinities = calculateSectorAffinities(profile.riasecScores);
    const sortedSectors = [...MACRO_SECTORS].sort((a, b) => (affinities[b.id] || 0) - (affinities[a.id] || 0)).slice(0, 3);

    sortedSectors.forEach((sec, idx) => {
      checkPageBreak(20);
      const score = affinities[sec.id] || 0;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}. ${sec.name} (${score}% Afinidad)`, margin + 4, y + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Demanda en ${profile.department}: ${sec.territorialDemand.level} | Oportunidad: ${sec.tagline}`, margin + 4, y + 10.5);

      y += 19;
    });

    y += 4;

    // ── Section 3: Trajectory Comparison Summary ──
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('3. Comparación Imparcial de Rutas de Formación', margin, y);
    y += 6;

    const trajectories = [
      { name: 'Ruta Técnica (INATEC)', time: '1.5 - 2 Años', focus: '70% Práctica / Talleres reales', cost: '100% Gratuito en centros nacionales', fit: 'Rápida inserción laboral y talleres propios.' },
      { name: 'Ruta Universitaria (CNU)', time: '4 - 5 Años', focus: 'Investigación teórica y gestión', cost: 'Matrícula pública gratuita + becas', fit: 'Titulación de grado y diseño de proyectos.' },
      { name: 'Ruta Progresiva (Combinada)', time: 'Flexible', focus: 'Técnico corto + Universidad Sabatina', cost: 'Autofinanciado con empleo propio', fit: 'Autonomía y resiliencia para la familia.' }
    ];

    trajectories.forEach((tr) => {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`• ${tr.name} (${tr.time}):`, margin + 2, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`${tr.focus} | Inversión: ${tr.cost} | Enfoque: ${tr.fit}`, margin + 6, y + 8);
      y += 11;
    });

    y += 4;

    // ── Section 4: Recommended Institutions in the Department ──
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`4. Oferta Académica en ${profile.department}`, margin, y);
    y += 6;

    if (recommendations.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text('No se encontraron registros directos en este municipio; consulta la sede departamental más cercana.', margin + 4, y);
      y += 8;
    } else {
      recommendations.slice(0, 5).forEach((rec) => {
        checkPageBreak(18);
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`${rec.carrera} (${rec.matchScore}% Afinidad)`, margin + 3, y + 4.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text(`${rec.institucion} [${rec.tipo}] - Sede: ${rec.sede} (${rec.municipio}) | Modalidad: ${rec.modalidad.join(', ')}`, margin + 3, y + 9.5);

        y += 16;
      });
    }

    y += 6;

    // ── Section 5: Guía de Diálogo Familiar para el Hogar ──
    checkPageBreak(45);
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(254, 205, 211); // rose-200
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(159, 18, 57); // rose-900
    doc.text('5. PÓRTICO FAMILIAR: 3 PREGUNTAS PARA CONVERSAR EN CASA', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(136, 19, 55);
    doc.text('1. ¿Resolviendo qué tipo de problemas se siente más útil y motivado/a nuestro hijo/a?', margin + 4, y + 12);
    doc.text('2. ¿Cuál es la realidad financiera del hogar y qué opciones de centros INATEC / CNU tenemos cerca?', margin + 4, y + 17);
    doc.text('3. ¿Cómo podemos apoyarle en horarios y estudio sin imponer una carrera por presión externa?', margin + 4, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Recuerden: La educación técnica y universitaria son públicas y gratuitas en Nicaragua. El futuro se construye con diálogo.', margin + 4, y + 31);

    // Save document
    doc.save(`RUMBO_Pasaporte_${profile.hollandCode}_${profile.department}.pdf`);
  }
}
