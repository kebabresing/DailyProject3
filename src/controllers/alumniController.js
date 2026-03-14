const Alumni = require('../models/alumniModel');

exports.index = async (req, res) => {
  const search = req.query.search || '';
  const alumniList = await Alumni.getAll(search);
  res.render('index', { title: 'Dashboard - Sistem Pelacakan Alumni', alumniList, search });
};

exports.formAdd = (req, res) => {
  res.render('form', { title: 'Tambah Data Alumni', isEdit: false, alumni: {} });
};

exports.add = async (req, res) => {
  await Alumni.add(req.body);
  res.redirect('/');
};

exports.formEdit = async (req, res) => {
  const alumni = await Alumni.getById(req.params.id);
  if (!alumni) return res.status(404).send('Alumni not found');
  res.render('form', { title: 'Edit Data Alumni', isEdit: true, alumni });
};

exports.edit = async (req, res) => {
  await Alumni.update(req.params.id, req.body);
  res.redirect('/');
};

exports.delete = async (req, res) => {
  await Alumni.delete(req.params.id);
  res.redirect('/');
};

exports.simulateBot = async (req, res) => {
  // Mock background bot finding new data online with broader sources
  const botFoundData = [
    {
      namaLengkap: 'Siti Aminah',
      prodi: 'Informatika',
      tahunLulus: 2021,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Teridentifikasi dari Sumber Publik',
      confidenceScore: 92,
      jejak: 'ResearchGate (Scheduler): Publikasi Jurnal AI 2023 - UMM'
    },
    {
      namaLengkap: 'Rizal Hakim',
      prodi: 'Sistem Informasi',
      tahunLulus: 2018,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Perlu Verifikasi Manual',
      confidenceScore: 65,
      jejak: 'LinkedIn (Scheduler): Nama cocok tapi Universitas tidak dicantumkan eksplisit.'
    },
    {
      namaLengkap: 'Devi Kartika',
      prodi: 'Teknik Komputer',
      tahunLulus: 2022,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Teridentifikasi dari Sumber Publik',
      confidenceScore: 88,
      jejak: 'Twitter / X (Scheduler): Profil bio mencantumkan "Tech Lead @ StartupX, Alumnus UMM 22".'
    },
    {
      namaLengkap: 'Anton Wijaya',
      prodi: 'Ilmu Komputasi',
      tahunLulus: 2015,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Teridentifikasi dari Sumber Publik',
      confidenceScore: 100,
      jejak: 'Situs Perusahaan (Scheduler): Profil Tim Direksi PT. Teknologi Maju menyebutkan Anton sebagai lulusan UMM.'
    },
    {
      namaLengkap: 'Nadia Sasmita',
      prodi: 'Informatika',
      tahunLulus: 2020,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Perlu Verifikasi Manual',
      confidenceScore: 40,
      jejak: 'Facebook (Scheduler): Tidak ada jabatan spesifik, hanya tertulis pernah belajar di Informatika.'
    },
    {
      namaLengkap: 'Eko Putra',
      prodi: 'Pendidikan Matematika',
      tahunLulus: 2017,
      kampus: 'Universitas Muhammadiyah Malang',
      status: 'Belum Ditemukan di Sumber Publik',
      confidenceScore: 12,
      jejak: 'Web Umum (Scheduler): Nama umum, ada 5.000 hasil pencarian ambigu, butuh pengecekan NIM.'
    }
  ];

  const currentData = await Alumni.getAll();
  let addedCount = 0;

  for (const data of botFoundData) {
    // Menghindari redudansi simulasi (cek nama lengkap)
    const isExist = currentData.some(existing => existing.namaLengkap === data.namaLengkap);
    if (!isExist) {
        await Alumni.add(data);
        addedCount++;
    }
  }

  if (addedCount > 0) {
    res.redirect('/?alert=bot-success');
  } else {
    // Jika data sudah tercatat semuanya dari hasil simulasi sebelumnya
    res.redirect('/?alert=bot-exist');
  }
};

exports.getLaporan = async (req, res) => {
  const alumniList = await Alumni.getAll();
  
  // Calculate basic statistics
  const total = alumniList.length;
  const teridentifikasi = alumniList.filter(a => a.status === 'Teridentifikasi dari Sumber Publik').length;
  const perluVerifikasi = alumniList.filter(a => a.status === 'Perlu Verifikasi Manual').length;
  const belumDitemukan = alumniList.filter(a => a.status === 'Belum Ditemukan di Sumber Publik').length;

  res.render('laporan', { 
    title: 'Laporan & Statistik Pelacakan', 
    stats: { total, teridentifikasi, perluVerifikasi, belumDitemukan }
  });
};
