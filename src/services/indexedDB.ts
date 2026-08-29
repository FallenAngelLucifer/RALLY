import catalogData from '../data/catalog.json';

export interface EducationalOffer {
  id: string;
  carrera: string;
  grado: string;
  institucion: string;
  tipo: string;
  sede: string;
  departamento: string;
  municipio: string;
  modalidad: string[];
  turnos: string[];
  riasec_codes: string;
  link_plan: string;
}

const DB_NAME = 'VocacionInteractivaDB';
const DB_VERSION = 1;
const STORE_NAME = 'catalog';

export class IndexedDBService {
  private static db: IDBDatabase | null = null;

  public static init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        return resolve();
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event);
        reject('Error opening database');
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.seedIfNeeded()
          .then(() => resolve())
          .catch((err) => reject(err));
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  private static seedIfNeeded(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('DB not initialized');

      const transaction = this.db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const countRequest = store.count();

      countRequest.onsuccess = () => {
        if (countRequest.result === 0) {
          console.log('Seeding IndexedDB with academic catalog...');
          const writeTransaction = this.db!.transaction(STORE_NAME, 'readwrite');
          const writeStore = writeTransaction.objectStore(STORE_NAME);

          catalogData.forEach((offer) => {
            writeStore.put(offer);
          });

          writeTransaction.oncomplete = () => {
            console.log('IndexedDB catalog seeded successfully.');
            resolve();
          };

          writeTransaction.onerror = (err) => {
            console.error('Error seeding IndexedDB:', err);
            reject('Error seeding database');
          };
        } else {
          resolve();
        }
      };

      countRequest.onerror = (err) => {
        console.error('Error counting items in IndexedDB:', err);
        reject('Error reading store count');
      };
    });
  }

  public static getAllOffers(): Promise<EducationalOffer[]> {
    return new Promise((resolve, reject) => {
      this.init().then(() => {
        if (!this.db) return reject('DB not initialized');

        const transaction = this.db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result as EducationalOffer[]);
        };

        request.onerror = (err) => {
          console.error('Error fetching all offers:', err);
          reject('Error fetching data');
        };
      });
    });
  }

  public static getDepartments(): Promise<string[]> {
    return this.getAllOffers().then((offers) => {
      const depts = offers.map((o) => o.departamento);
      return Array.from(new Set(depts)).sort();
    });
  }

  public static getMunicipalities(department: string): Promise<string[]> {
    return this.getAllOffers().then((offers) => {
      const munis = offers
        .filter((o) => o.departamento.toLowerCase() === department.toLowerCase())
        .map((o) => o.municipio);
      return Array.from(new Set(munis)).sort();
    });
  }

  /**
   * Filters offers based on criteria and computes similarity score against user RIASEC weights.
   */
  public static searchOffers(filters: {
    departamento?: string;
    municipio?: string;
    tipo?: string; // 'Pública', 'Privada', 'INATEC'
    riasecWeights: Record<string, number>; // { R: 80, I: 70, ... }
  }): Promise<(EducationalOffer & { matchScore: number })[]> {
    return this.getAllOffers().then((offers) => {
      let filtered = offers;

      // Filter by department
      if (filters.departamento) {
        filtered = filtered.filter(
          (o) => o.departamento.toLowerCase() === filters.departamento!.toLowerCase()
        );
      }

      // Filter by municipality (optional, if selected)
      if (filters.municipio) {
        filtered = filtered.filter(
          (o) => o.municipio.toLowerCase() === filters.municipio!.toLowerCase()
        );
      }

      // Filter by type
      if (filters.tipo && filters.tipo !== 'Todos') {
        filtered = filtered.filter(
          (o) => o.tipo.toLowerCase() === filters.tipo!.toLowerCase()
        );
      }

      // Compute matchScore
      // MatchScore = sum(weight_position * user_riasec_score)
      // weight_position: 1st letter = 3, 2nd = 2, 3rd = 1
      const ratedOffers = filtered.map((offer) => {
        const codes = offer.riasec_codes; // e.g. "ICR" or "R"
        let matchScore = 0;

        for (let i = 0; i < codes.length; i++) {
          const char = codes[i];
          const weight = Math.max(3 - i, 1); // 3, 2, 1
          const userScore = filters.riasecWeights[char] || 0;
          matchScore += weight * userScore;
        }

        // Normalize matchScore relative to maximum possible score (3*100 + 2*100 + 1*100 = 600)
        // Expressed in percentage (0 - 100)
        const maxPossible = codes.length === 1 ? 300 : codes.length === 2 ? 500 : 600;
        const normalizedScore = Math.round((matchScore / maxPossible) * 100);

        return {
          ...offer,
          matchScore: normalizedScore,
        };
      });

      // Sort by matchScore descending, then by name
      return ratedOffers.sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return a.carrera.localeCompare(b.carrera);
      });
    });
  }
}
