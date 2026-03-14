const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Constants for initial dummy data (run once when DB is created)
const dummyData = [
  { namaLengkap: 'Ahmad Sueb', prodi: 'Informatika', tahunLulus: 2020, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 85, jejak: 'LinkedIn: Software Engineer di Perusahaan XYZ' },
  { namaLengkap: 'Budi Santoso', prodi: 'Informatika', tahunLulus: 2019, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 45, jejak: 'Google Scholar: 2 Publikasi' },
  { namaLengkap: 'Citra Amelia', prodi: 'Hukum', tahunLulus: 2021, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 90, jejak: 'LinkedIn: Junior Associate di Law Firm ABCD.' },
  { namaLengkap: 'Deni Pratama', prodi: 'Teknik Sipil', tahunLulus: 2017, kampus: 'Universitas Muhammadiyah Malang', status: 'Belum Ditemukan di Sumber Publik', confidenceScore: 20, jejak: 'Web Umum: Ada nama sama sebagai musisi jalanan, tidak relevan.' },
  { namaLengkap: 'Elvira Rossa', prodi: 'Kedokteran', tahunLulus: 2022, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 95, jejak: 'Situs Rumah Sakit: Jaga di RSUD Kota Malang.' },
  { namaLengkap: 'Fajar Hidayat', prodi: 'Manajemen', tahunLulus: 2018, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 55, jejak: 'Facebook: Pernah posting wisuda UMM, kerja di Bank BNI tapi nama pasaran.' },
  { namaLengkap: 'Gita Permatasari', prodi: 'Ilmu Komunikasi', tahunLulus: 2019, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 100, jejak: 'Instagram: Verified Acc - News Anchor di TV Nasional (Bio: Alumnus Ikom UMM).' },
  { namaLengkap: 'Hendra Saputra', prodi: 'Agroteknologi', tahunLulus: 2016, kampus: 'Universitas Muhammadiyah Malang', status: 'Belum Ditemukan di Sumber Publik', confidenceScore: 10, jejak: 'Google Search: Tidak ada hasil valid yang terkait agrikultur/UMM.' },
  { namaLengkap: 'Indah Kusuma', prodi: 'Psikologi', tahunLulus: 2020, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 82, jejak: 'LinkedIn: HR Staff di Perusahaan FMCG.' },
  { namaLengkap: 'Joko Susanto', prodi: 'Pendidikan Bahasa Inggris', tahunLulus: 2017, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 60, jejak: 'LinkedIn: Guru Bahasa Inggris, namun universitas disembunyikan.' },
  { namaLengkap: 'Kiki Ramadhani', prodi: 'Sosiologi', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 78, jejak: 'ResearchGate: Asisten Peneliti Proyek Sosial.' },
  { namaLengkap: 'Lukman Hakim', prodi: 'Informatika', tahunLulus: 2018, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 99, jejak: 'GitHub: Repository publiknya mencantumkan nama lengkap dan "Alumni UMM".' },
  { namaLengkap: 'Ratna Ayu', prodi: 'Keperawatan', tahunLulus: 2021, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 48, jejak: 'Web PPNI: Terdaftar, namun kurang keterangan asal instansi kelulusan.' },
  { namaLengkap: 'Septian Dwi', prodi: 'Teknik Mesin', tahunLulus: 2019, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 85, jejak: 'LinkedIn: Supervisor Produksi di Pabrik Otomotif Karawang.' },
  { namaLengkap: 'Trisna Wati', prodi: 'Akuntansi', tahunLulus: 2020, kampus: 'Universitas Muhammadiyah Malang', status: 'Belum Ditemukan di Sumber Publik', confidenceScore: 15, jejak: 'ORCID: Ada profil Trisna Wati tapi fokus bidang perikanan.' }
];

async function initializeDB() {
  const dbConfig = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  // Create table if it doesn't exist
  await dbConfig.exec(`
    CREATE TABLE IF NOT EXISTS alumni (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      namaLengkap TEXT,
      prodi TEXT,
      tahunLulus INTEGER,
      kampus TEXT,
      status TEXT,
      confidenceScore INTEGER,
      jejak TEXT
    )
  `);

  // Count existing records to see if we need to insert dummy data
  const countResult = await dbConfig.get('SELECT COUNT(*) AS count FROM alumni');
  
  // Only inject seed data if table is completely empty
  if (countResult && countResult.count === 0) {
    const trx = await dbConfig.prepare('INSERT INTO alumni (namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak) VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const d of dummyData) {
      await trx.run(d.namaLengkap, d.prodi, d.tahunLulus, d.kampus, d.status, d.confidenceScore, d.jejak);
    }
    await trx.finalize();
  }

  return dbConfig;
}

const dbPromise = initializeDB();

module.exports = {
  dbPromise,
  // Helper functions exposed for model using async await
  getAlumni: async (searchQuery = '') => {
    const db = await dbPromise;
    if (searchQuery) {
      const q = `%${searchQuery}%`;
      return await db.all(
        'SELECT * FROM alumni WHERE namaLengkap LIKE ? OR prodi LIKE ? OR kampus LIKE ? OR status LIKE ? ORDER BY id DESC', 
        [q, q, q, q]
      );
    }
    return await db.all('SELECT * FROM alumni ORDER BY id DESC');
  },
  getAlumniById: async (id) => {
    const db = await dbPromise;
    return await db.get('SELECT * FROM alumni WHERE id = ?', [id]);
  },
  addAlumni: async (alumni) => {
    const db = await dbPromise;
    const { namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak } = alumni;
    const result = await db.run(
      'INSERT INTO alumni (namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak]
    );
    return { ...alumni, id: result.lastID };
  },
  updateAlumni: async (id, updateData) => {
    const db = await dbPromise;
    const { namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak } = updateData;
    await db.run(
      'UPDATE alumni SET namaLengkap = ?, prodi = ?, tahunLulus = ?, kampus = ?, status = ?, confidenceScore = ?, jejak = ? WHERE id = ?',
      [namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak, id]
    );
    return updateData;
  },
  deleteAlumni: async (id) => {
    const db = await dbPromise;
    await db.run('DELETE FROM alumni WHERE id = ?', [id]);
    return true;
  }
};
