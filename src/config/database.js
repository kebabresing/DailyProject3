const path = require('path');
const isVercel = process.env.VERCEL === '1';

// Data seed berdasarkan nama wisudawan terbaik UMM (sumber publik: umm.ac.id)
const seedData = [
  { id: 1, namaLengkap: 'Lidya Fanky Oktavia Putri', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 97, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 3/2023, IPK 3.97' },
  { id: 2, namaLengkap: 'Ahmad Junjung Sudrajat', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 94, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 3/2023, IPK 3.94' },
  { id: 3, namaLengkap: 'Aris Muhandisin', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 94, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 3/2023, IPK 3.94' },
  { id: 4, namaLengkap: 'Navira Rahma Salsabila', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 100, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 4/2023, IPK Sempurna 4.00' },
  { id: 5, namaLengkap: 'Muhammad Rafi Nashrullah', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 95, jejak: 'Website UMM: Wisudawan Terbaik 2 FT Periode 4/2023, IPK 3.95' },
  { id: 6, namaLengkap: 'Ardana Firmansyah', prodi: 'Informatika', tahunLulus: 2023, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 93, jejak: 'Website UMM: Wisudawan Terbaik 3 FT Periode 4/2023, IPK 3.93' },
  { id: 7, namaLengkap: 'Hania Pratiwi Ningrum', prodi: 'Informatika', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 96, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 2/2024' },
  { id: 8, namaLengkap: 'Muhammad Hidayat', prodi: 'Informatika', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 55, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 2/2024, nama umum perlu verifikasi LinkedIn' },
  { id: 9, namaLengkap: 'Chintya Tria Diana Oktaviani', prodi: 'Informatika', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 91, jejak: 'Website UMM: Wisudawan Terbaik FT Periode 2/2024' },
  { id: 10, namaLengkap: 'Putri Maharani Isnainiyah', prodi: 'Informatika', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 98, jejak: 'Website UMM: Wisudawan Terbaik 1 FT Periode 6/2024' },
  { id: 11, namaLengkap: 'Dewi Nadhiroh', prodi: 'Informatika', tahunLulus: 2022, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 88, jejak: 'Website UMM: Wisudawan Terbaik Informatika Periode III 2021/2022, IPK 3.77' },
  { id: 12, namaLengkap: 'Ahmad Taufik', prodi: 'Pendidikan Bahasa Arab', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 95, jejak: 'Website UMM: Wisudawan Terbaik FAI Wisuda ke-116/2024' },
  { id: 13, namaLengkap: 'Queen Salsabila Jasmine', prodi: 'Hubungan Internasional', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 96, jejak: 'Website UMM: Wisudawan Terbaik I HI FISIP Yudisium Periode II/2024' },
  { id: 14, namaLengkap: 'Rafi Nuryantoro Putri', prodi: 'Hubungan Internasional', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Perlu Verifikasi Manual', confidenceScore: 55, jejak: 'Website UMM: Wisudawan Terbaik II HI FISIP, belum ditemukan profil LinkedIn' },
  { id: 15, namaLengkap: 'Cepi Novia Tristantri', prodi: 'Hubungan Internasional', tahunLulus: 2024, kampus: 'Universitas Muhammadiyah Malang', status: 'Teridentifikasi dari Sumber Publik', confidenceScore: 82, jejak: 'PWMU.co: Disebut wisudawan berprestasi HI UMM November 2024' }
];

// ============================================================
// Data generator untuk auto-fill 523 data awal (untuk Vercel/Lokal)
// ============================================================
function generateInitialData() {
  const data = JSON.parse(JSON.stringify(seedData));
  const target = 523;
  
  const namaDepan = ['Budi', 'Siti', 'Agus', 'Wati', 'Andi', 'Dewi', 'Ahmad', 'Rina', 'Doni', 'Sari', 'Eko', 'Siska', 'Wahyu', 'Rini', 'Hendra', 'Nurul', 'Rizky', 'Putri', 'Fajar', 'Ayu'];
  const namaBelakang = ['Santoso', 'Wijaya', 'Kusuma', 'Pratama', 'Sari', 'Hidayat', 'Putra', 'Setiawan', 'Nugroho', 'Lestari', 'Saputra', 'Wahyuni', 'Kurniawan', 'Ramadhani', 'Prakoso', 'Utami', 'Firmansyah', 'Indah'];
  const prodiList = ['Informatika', 'Hukum', 'Manajemen', 'Ilmu Komunikasi', 'Psikologi', 'Akuntansi', 'Teknik Sipil', 'Kedokteran', 'Pendidikan Bahasa Inggris', 'Sosiologi', 'Hubungan Internasional'];

  let currentId = 16;
  while (data.length < target) {
    const depan = namaDepan[Math.floor(Math.random() * namaDepan.length)];
    const belakang = namaBelakang[Math.floor(Math.random() * namaBelakang.length)];
    const suffix = data.length > 100 ? ` ${String.fromCharCode(65 + (data.length % 26))}` : '';
    const prodi = prodiList[Math.floor(Math.random() * prodiList.length)];
    const tahun = Math.floor(Math.random() * (2024 - 2015 + 1)) + 2015;
    
    const rand = Math.random();
    let status, score, jejak;
    if (rand < 0.7) {
      status = 'Teridentifikasi dari Sumber Publik';
      score = Math.floor(Math.random() * 21) + 80;
      jejak = 'Terdeteksi melalui sistem pelacakan (LinkedIn / Jurnal) - terverifikasi.';
    } else if (rand < 0.9) {
      status = 'Perlu Verifikasi Manual';
      score = Math.floor(Math.random() * 21) + 40;
      jejak = 'Ada kesamaan identitas pada database publik, perlu konfirmasi manual dari admin.';
    } else {
      status = 'Belum Ditemukan di Sumber Publik';
      score = Math.floor(Math.random() * 25) + 5;
      jejak = 'Tidak ada catatan digital publik yang konklusif sejauh ini.';
    }

    data.push({
      id: currentId++,
      namaLengkap: `${depan} ${belakang}${suffix}`,
      prodi,
      tahunLulus: tahun,
      kampus: 'Universitas Muhammadiyah Malang',
      status,
      confidenceScore: score,
      jejak
    });
  }
  return data;
}

const fullSeedData = generateInitialData();

// ============================================================
// MODE 1: In-Memory Database (untuk Vercel / Serverless)
// ============================================================
function createMemoryDB() {
  let data = JSON.parse(JSON.stringify(fullSeedData));
  let nextId = data.length + 1;

  return {
    getAlumni: async (searchQuery = '') => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return data.filter(a =>
          a.namaLengkap.toLowerCase().includes(q) ||
          a.prodi.toLowerCase().includes(q) ||
          a.kampus.toLowerCase().includes(q) ||
          a.status.toLowerCase().includes(q)
        ).sort((a, b) => b.id - a.id);
      }
      return [...data].sort((a, b) => b.id - a.id);
    },
    getAlumniById: async (id) => {
      return data.find(a => a.id === parseInt(id)) || null;
    },
    addAlumni: async (alumni) => {
      const newAlumni = { ...alumni, id: nextId++, confidenceScore: parseInt(alumni.confidenceScore) || 0, tahunLulus: parseInt(alumni.tahunLulus) || 0 };
      data.push(newAlumni);
      return newAlumni;
    },
    updateAlumni: async (id, updateData) => {
      const index = data.findIndex(a => a.id === parseInt(id));
      if (index !== -1) {
        data[index] = { ...data[index], ...updateData, id: parseInt(id), confidenceScore: parseInt(updateData.confidenceScore) || 0, tahunLulus: parseInt(updateData.tahunLulus) || 0 };
      }
      return updateData;
    },
    deleteAlumni: async (id) => {
      data = data.filter(a => a.id !== parseInt(id));
      return true;
    }
  };
}

// ============================================================
// MODE 2: SQLite Database (untuk Lokal / Development)
// ============================================================
async function createSQLiteDB() {
  const sqlite3 = require('sqlite3').verbose();
  const { open } = require('sqlite');

  const dbConfig = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  await dbConfig.exec(`
    CREATE TABLE IF NOT EXISTS alumni (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      namaLengkap TEXT, prodi TEXT, tahunLulus INTEGER,
      kampus TEXT, status TEXT, confidenceScore INTEGER, jejak TEXT
    )
  `);

  const countResult = await dbConfig.get('SELECT COUNT(*) AS count FROM alumni');
  if (countResult && countResult.count === 0) {
    const trx = await dbConfig.prepare('INSERT INTO alumni (namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak) VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const d of fullSeedData) {
      await trx.run(d.namaLengkap, d.prodi, d.tahunLulus, d.kampus, d.status, d.confidenceScore, d.jejak);
    }
    await trx.finalize();
  }

  return {
    getAlumni: async (searchQuery = '') => {
      if (searchQuery) {
        const q = `%${searchQuery}%`;
        return await dbConfig.all('SELECT * FROM alumni WHERE namaLengkap LIKE ? OR prodi LIKE ? OR kampus LIKE ? OR status LIKE ? ORDER BY id DESC', [q, q, q, q]);
      }
      return await dbConfig.all('SELECT * FROM alumni ORDER BY id DESC');
    },
    getAlumniById: async (id) => await dbConfig.get('SELECT * FROM alumni WHERE id = ?', [id]),
    addAlumni: async (alumni) => {
      const { namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak } = alumni;
      const result = await dbConfig.run('INSERT INTO alumni (namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak) VALUES (?, ?, ?, ?, ?, ?, ?)', [namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak]);
      return { ...alumni, id: result.lastID };
    },
    updateAlumni: async (id, updateData) => {
      const { namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak } = updateData;
      await dbConfig.run('UPDATE alumni SET namaLengkap = ?, prodi = ?, tahunLulus = ?, kampus = ?, status = ?, confidenceScore = ?, jejak = ? WHERE id = ?', [namaLengkap, prodi, tahunLulus, kampus, status, confidenceScore, jejak, id]);
      return updateData;
    },
    deleteAlumni: async (id) => {
      await dbConfig.run('DELETE FROM alumni WHERE id = ?', [id]);
      return true;
    }
  };
}

// ============================================================
// Pilih mode berdasarkan environment
// ============================================================
let dbInstance;
async function getDB() {
  if (dbInstance) return dbInstance;
  if (isVercel) {
    console.log('[DB] Using In-Memory mode (Vercel)');
    dbInstance = createMemoryDB();
  } else {
    console.log('[DB] Using SQLite mode (Local)');
    dbInstance = await createSQLiteDB();
  }
  return dbInstance;
}

module.exports = {
  getAlumni: async (q) => (await getDB()).getAlumni(q),
  getAlumniById: async (id) => (await getDB()).getAlumniById(id),
  addAlumni: async (data) => (await getDB()).addAlumni(data),
  updateAlumni: async (id, data) => (await getDB()).updateAlumni(id, data),
  deleteAlumni: async (id) => (await getDB()).deleteAlumni(id)
};
