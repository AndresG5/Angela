// ─────────────────────────────────────────────
//  Base de datos SQLite en el navegador (sql.js / WebAssembly)
//  Se usa para dos cosas reales:
//   1) Guardar un registro histórico de cada intento de examen
//      (incluso si el tiempo se acaba antes de terminar).
//   2) Respaldar los mapas conceptuales de cada materia, para
//      que no se pierdan aunque se borre el localStorage del navegador.
//  El .sqlite serializado se persiste en localStorage entre sesiones.
// ─────────────────────────────────────────────
import initSqlJs, { type Database } from "sql.js";

const DB_STORAGE_KEY = "angela-db-v1";
let dbPromise: Promise<Database> | null = null;

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function base64ToUint8(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function createDb(): Promise<Database> {
  const SQL = await initSqlJs({ locateFile: (file) => `/${file}` });

  let db: Database;
  try {
    const saved = localStorage.getItem(DB_STORAGE_KEY);
    db = saved ? new SQL.Database(base64ToUint8(saved)) : new SQL.Database();
  } catch {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id TEXT NOT NULL,
      correct INTEGER NOT NULL,
      total INTEGER NOT NULL,
      time_used_seconds INTEGER NOT NULL,
      completed INTEGER NOT NULL,
      finished_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS concept_maps (
      subject_id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return db;
}

export function getDb(): Promise<Database> {
  if (!dbPromise) dbPromise = createDb();
  return dbPromise;
}

function persist(db: Database) {
  try {
    localStorage.setItem(DB_STORAGE_KEY, uint8ToBase64(db.export()));
  } catch {
    /* almacenamiento no disponible: se pierde solo la persistencia, no la sesión actual */
  }
}

// ── Intentos de examen ──────────────────────────────────────────

export interface ExamAttemptRecord {
  subjectId: string;
  correct: number;
  total: number;
  timeUsedSeconds: number;
  completed: boolean;
}

/** Guarda un registro permanente del intento (terminado o con tiempo agotado). */
export async function logExamAttempt(record: ExamAttemptRecord) {
  const db = await getDb();
  db.run(
    `INSERT INTO exam_attempts (subject_id, correct, total, time_used_seconds, completed, finished_at)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [
      record.subjectId,
      record.correct,
      record.total,
      record.timeUsedSeconds,
      record.completed ? 1 : 0,
      new Date().toISOString(),
    ]
  );
  persist(db);
}

export interface ExamAttemptRow extends ExamAttemptRecord {
  id: number;
  finishedAt: string;
}

/** Devuelve el historial de intentos de una materia (o de todas si se omite). */
export async function getExamAttempts(subjectId?: string): Promise<ExamAttemptRow[]> {
  const db = await getDb();
  const res = subjectId
    ? db.exec(
        `SELECT id, subject_id, correct, total, time_used_seconds, completed, finished_at
         FROM exam_attempts WHERE subject_id = ? ORDER BY finished_at DESC;`,
        [subjectId]
      )
    : db.exec(
        `SELECT id, subject_id, correct, total, time_used_seconds, completed, finished_at
         FROM exam_attempts ORDER BY finished_at DESC;`
      );
  const rows = res[0]?.values ?? [];
  return rows.map((r) => ({
    id: r[0] as number,
    subjectId: r[1] as string,
    correct: r[2] as number,
    total: r[3] as number,
    timeUsedSeconds: r[4] as number,
    completed: Boolean(r[5]),
    finishedAt: r[6] as string,
  }));
}

// ── Mapas conceptuales (respaldo) ───────────────────────────────

/** Guarda (o sobrescribe) el mapa conceptual de una materia en la base de datos. */
export async function saveConceptMapToDb(subjectId: string, dataJson: string) {
  const db = await getDb();
  db.run(
    `INSERT INTO concept_maps (subject_id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(subject_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at;`,
    [subjectId, dataJson, new Date().toISOString()]
  );
  persist(db);
}

/** Recupera el mapa conceptual guardado de una materia, si existe. */
export async function loadConceptMapFromDb(subjectId: string): Promise<string | null> {
  const db = await getDb();
  const res = db.exec(`SELECT data FROM concept_maps WHERE subject_id = ?;`, [subjectId]);
  const row = res[0]?.values?.[0];
  return (row?.[0] as string) ?? null;
}
