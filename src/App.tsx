import { useState, useEffect } from 'react';
import { NavbarApp, type AppModule } from './components/NavbarApp';
import { BottomNavMobile } from './components/BottomNavMobile';
import { SidebarDrawer } from './components/SidebarDrawer';
import { CalibracionTerritorial } from './components/CalibracionTerritorial';
import { ArbolDecisiones } from './components/ArbolDecisiones';
import { ModuloDescubrir } from './components/ModuloDescubrir';
import { ModuloComparar } from './components/ModuloComparar';
import { ModuloEntender } from './components/ModuloEntender';
import { ModuloExperimentar } from './components/ModuloExperimentar';
import { ModuloConectar } from './components/ModuloConectar';
import { ModuloDecidir } from './components/ModuloDecidir';
import { AsistenteIAMock } from './components/AsistenteIAMock';
import { IndexedDBService, type EducationalOffer } from './services/indexedDB';
import { PDFGeneratorService } from './services/pdfGenerator';
import type { DecisionResult } from './data/decisionTree';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('conocerme');
  const [department, setDepartment] = useState<string>('Managua');
  const [municipality, setMunicipality] = useState<string>('Managua');
  const [hasCalibrated, setHasCalibrated] = useState<boolean>(false);
  const [riasecScores, setRiasecScores] = useState<Record<string, number>>({
    R: 25,
    I: 30,
    A: 15,
    S: 10,
    E: 12,
    C: 8
  });
  const [hollandCode, setHollandCode] = useState<string>('IRC');
  const [savedCareers, setSavedCareers] = useState<string[]>(['inatec_progra_ma', 'inatec_meca_hc']);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('inatec_progra_ma');
  const [offers, setOffers] = useState<(EducationalOffer & { matchScore: number })[]>([]);

  // Load recommendations whenever department, municipality, or scores change
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        await IndexedDBService.init();
        const res = await IndexedDBService.searchOffers({
          departamento: department,
          municipio: municipality,
          riasecWeights: riasecScores
        });
        if (isMounted) {
          setOffers(res);
        }
      } catch (e) {
        console.error('Error loading offers in App:', e);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [department, municipality, riasecScores]);

  const handleCalibrationComplete = (data: { department: string; municipality: string }) => {
    setDepartment(data.department);
    setMunicipality(data.municipality);
    setHasCalibrated(true);
  };

  const handleDecisionComplete = (result: DecisionResult) => {
    setRiasecScores(result.riasecScores);
    const sorted = Object.entries(result.riasecScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k)
      .join('');
    setHollandCode(sorted || 'IRC');
    setActiveModule('descubrir');
  };

  const handleToggleSaveCareer = (careerId: string) => {
    setSavedCareers((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  const handleNavigateToEntender = (careerId: string) => {
    setSelectedCareerId(careerId);
    setActiveModule('entender');
  };

  const handleNavigateToComparar = (careerId: string) => {
    setSelectedCareerId(careerId);
    setActiveModule('comparar');
  };

  const handleNavigateToExperimentar = (careerId: string) => {
    setSelectedCareerId(careerId);
    setActiveModule('experimentar');
  };

  const handleExportPDF = () => {
    PDFGeneratorService.generate(
      {
        department,
        municipality,
        riasecScores,
        hollandCode
      },
      offers
    );
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleReset = () => {
    setHasCalibrated(false);
    setActiveModule('conocerme');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8FF] via-slate-50 to-[#EBF3FF]/40 flex flex-col font-sans text-slate-900 selection:bg-[#0057FF] selection:text-white">
      {/* Top Navbar */}
      <NavbarApp
        activeModule={activeModule}
        onSelectModule={(mod) => setActiveModule(mod)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        department={department}
        municipality={municipality}
      />

      {/* Mobile Left Drawer Menu */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeModule={activeModule}
        onSelectModule={(mod) => setActiveModule(mod)}
        department={department}
        municipality={municipality}
        onExportPDF={handleExportPDF}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-6 lg:p-8 pb-32 sm:pb-8">
        {/* ── MODULE 1: CONOCERME ── */}
        {activeModule === 'conocerme' && (
          <div className="space-y-6">
            {!hasCalibrated ? (
              <CalibracionTerritorial onComplete={handleCalibrationComplete} />
            ) : (
              <ArbolDecisiones
                department={department}
                municipality={municipality}
                onComplete={handleDecisionComplete}
                onBackToCalibration={() => setHasCalibrated(false)}
              />
            )}
          </div>
        )}

        {/* ── MODULE 2: DESCUBRIR ── */}
        {activeModule === 'descubrir' && (
          <ModuloDescubrir
            offers={offers}
            department={department}
            municipality={municipality}
            savedCareers={savedCareers}
            onToggleSaveCareer={handleToggleSaveCareer}
            onNavigateToEntender={handleNavigateToEntender}
            onNavigateToComparar={handleNavigateToComparar}
            onNavigateToExperimentar={handleNavigateToExperimentar}
          />
        )}

        {/* ── MODULE 3: COMPARAR ── */}
        {activeModule === 'comparar' && (
          <ModuloComparar department={department} />
        )}

        {/* ── MODULE 4: ENTENDER ── */}
        {activeModule === 'entender' && (
          <ModuloEntender
            initialCareerId={selectedCareerId}
            onCompareCareer={handleNavigateToComparar}
          />
        )}

        {/* ── MODULE 5: EXPERIMENTAR (TikTok/Reels Feed) ── */}
        {activeModule === 'experimentar' && (
          <ModuloExperimentar
            onSelectCareerToUnderstand={handleNavigateToEntender}
            onSelectCareerToCompare={handleNavigateToComparar}
          />
        )}

        {/* ── MODULE 6: CONECTAR ── */}
        {activeModule === 'conectar' && (
          <ModuloConectar department={department} />
        )}

        {/* ── MODULE 7: DECIDIR ── */}
        {activeModule === 'decidir' && (
          <ModuloDecidir
            department={department}
            municipality={municipality}
            hollandCode={hollandCode}
            riasecScores={riasecScores}
            savedCareerIds={savedCareers}
            allOffers={offers}
            onRemoveSavedCareer={handleToggleSaveCareer}
            onNavigateToEntender={handleNavigateToEntender}
            onExportPDF={handleExportPDF}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Floating Simulated RAG AI Assistant */}
      <AsistenteIAMock
        department={department}
        onExploreCareer={handleNavigateToEntender}
      />

      {/* Mobile Bottom Navigation Bar (<md) */}
      <BottomNavMobile
        activeModule={activeModule}
        onSelectModule={(mod) => setActiveModule(mod)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />
    </div>
  );
}

export default App;
