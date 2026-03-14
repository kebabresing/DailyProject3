# 🎓 Alumni Tracker - Daily Project 3

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Sistem Informasi Pelacakan Profil Publik Alumni Berbasis Web**
> 
> *Proyek ini dikembangkan untuk merealisasikan **Daily Project 2** (Pseudocode & Usecase Diagram) menjadi bentuk Prototype Antarmuka Web Interaktif.*

---

## 📖 Deskripsi Sistem

**Alumni Tracker** adalah prototype sistem informasi berbasis web yang dirancang untuk membantu admin institusi/kampus dalam melacak dan mengelola data jejak karir alumni di internet secara terpusat. 

Sistem ini mensimulasikan kemampuan pencarian profil secara otomatis dari sumber-sumber publik yang sah (seperti *LinkedIn*, *Google Scholar*, *ResearchGate*, dan *Situs Web Perusahaan*) seperti yang dituangkan pada rancangan logika **Modul 1 s/d Modul 10**.

### Target Pengguna (Sesuai Use Case)
1. **Admin / HRD Institusi:** Bertugas meninjau hasil pencarian bot otomatis, melakukan validasi manual (CRUD), serta meninjau persentase validitas temuan skor kecocokan profil alumni.
2. **Sistem Scheduler (Simulasi Bot):** Algoritma latar belakang yang menyodorkan kandidat data baru ke database master berdasarkan probabilitas dan *Confidence Score*.

---

## ✨ Fitur Utama (Core Features)

1. 🗄️ **Manajemen Database Master (CRUD)**
   * Menambahkan, mengedit, melihat, dan menghapus data profil target alumni dengan mudah melalui antarmuka tabel bersih (*clean code*).
2. 🤖 **Simulasi Bot Pelacak (Automated Scheduler)**
   * Fitur interaktif **Satu Klik** yang memicu *mocking API* seolah sistem sedang mengais (scraping) identitas baru dari internet, melakukan langkah Modul Disambiguasi untuk menghindari redudansi, dan mendorongnya dangan label Confidence Score ke *Data Master*.
3. 📊 **Dashboard & Laporan Statistik Agregat**
   * Panel visual (Doughnut Chart) yang mengelompokkan mahasiswa berdasarkan status pelacakan: *"Teridentifikasi"*, *"Perlu Verifikasi"*, atau *"Belum Ditemukan"*.
4. 📱 **Responsive & Mobile Friendly**
   * Layout telah disesuaikan dengan proporsi HP atau Tablet menggunakan *TailwindCSS utility class*, lengkap dengan form interaktif serta *Sticky Header*.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi yang kokoh, cepat, umum dipakai di perkuliahan, dan minim konfigurasi kompleks:

1. **Frontend:** EJS (Embedded Javascript Templates) + HTML5 + [TailwindCSS (CDN)](https://tailwindcss.com/) + Chart.js
   * *Alasan:* EJS sangat dinamis dalam membongkar array data dari backend. Sementara itu, Tailwind CSS via CDN sangat mempercepat *styling* modern, bersih, tanpa butuh *pipeline build* seperti framework besar lainnya layaknya React.
2. **Backend:** Node.js dipadukan dengan *Framework* Express.js.
   * *Alasan:* Standard industri untuk *backend asynchronus*, memiliki performa routing sangat tinggi, dan sintaks Javascript yang konsisten dari Front-End ke Back-End.
3. **Database:** SQLite3 (Persisten Relasional)
   * *Alasan:* Database file lokal yang sesungguhnya (bukan lagi sekadar *Array Memory* lokal). Ini membuktikan bahwa aplikasi menyimpan data secara persisten dan bisa berinteraksi penuh menggunakan model *Asynchronous Promises*.

---

## 📂 Struktur Project (MVC Architecture)

Menerapkan pola desain *Model-View-Controller* (MVC) untuk kemudahan *maintenance*:

```text
📁 Daily Project 3/
├── 📁 src/
│   ├── 📁 config/
│   │   └── database.js         # Konfigurasi & Inisialisasi SQLite3 Database
│   ├── 📁 controllers/
│   │   └── alumniController.js # Logika bisnis (menangani request & kirim view)
│   ├── 📁 models/
│   │   └── alumniModel.js      # Struktur query & abstraksi transaksi database
│   └── 📁 routes/
│       └── alumniRoutes.js     # Definisi alur rute URL web
├── 📁 views/
│   ├── 📁 partials/
│   │   ├── header.ejs          # Komponen Header web & Navigasi
│   │   └── footer.ejs          # Komponen Footer web
│   ├── index.ejs               # Halaman utama (Tabel Web Master)
│   ├── form.ejs                # Halaman Form Input/Edit Alumni
│   └── laporan.ejs             # Halaman Laporan Agregasi (Chart.js)
├── .gitignore
├── package.json
├── index.js                    # Entry point server Express.js
└── README.md                   # Dokumentasi teknis
```

---

## 🚀 Panduan Menjalankan Web Secara Lokal (Running Locally)

Jika Anda ingin mencoba menjalankan web ini di komputer lokal Anda, ikuti langkah berikut:

### Prasyarat
- Telah meng-install [Node.js](https://nodejs.org/en/) di komputer Anda (Minimal versi 14x).

### Cara Instalasi & Menjalankan:

1. **Unduh / Clone Repositori Ini.**
2. **Buka Terminal / Command Prompt** dan arahkan ke dalam folder proyek (`cd Daily Project 3`).
3. **Install Dependensi Penting:**
   Jalankan perintah ini untuk mengunduh modul *Express*, *EJS*, *SQLite*, dan *SQLite3*:
   ```bash
   npm install
   ```
4. **Jalankan Server Eksekusi:**
   ```bash
   npm run start
   ```
5. **Buka Browser Anda** lalu akses alamat lokal:
   ```text
   http://localhost:3000
   ```
   > **Catatan Database:** Pada saat dijalankan untuk *pertama kalinya*, sistem SQLite akan secara otomatis men-*generate* file relasional `database.sqlite` dan menyuntikkan (Seed) 15 data uji coba *(Dummy)* di dalamnya agar tabel Dashboard tidak kosong.

---

## 🧪 Pengujian Sistem (Aspek Kualitas Kinerja)

Pengujian Prototipe web aplikasi ini dilakukan berdasarkan spesifikasi kualitas perancangan sistem (*Software Quality Assurance*) pada **Daily Project 2**. Berikut adalah hasil pengujiannya:

| No | Aspek Kualitas (Standar ISO 25010) | Skenario Pengujian (Test Case) | Hasil yang Diharapkan | Status / Kesimpulan |
|:---|:---|:---|:---|:---|
| 1 | **Functional Suitability** (Fungsionalitas) | Menambahkan data Master Alumni baru melalui Form. | Data baru berhasil masuk ke dalam database SQLite dan tertampil urut di tabel Dashboard utama tanpa *error*. | ✅ **Lulus / Sesuai** |
| 2 | **Functional Suitability** (Fungsionalitas) | Menekan tombol "▶ Simulasi Bot Pelacak". | Sistem berhasil mengeksekusi Modul *Scheduler* & memvalidasi *Confidence Score* lalu memasukkan kandidat baru ke dalam tabel tanpa duplikasi data lama. | ✅ **Lulus / Sesuai** |
| 3 | **Usability** (Kebergunaan) | Mengakses web menggunakan *Smartphone* (Layar Mobile). | Tabel dapat digulir secara horizontal (Overflow-X) dan form isian otomatis beradaptasi menjadi 1 lajur (*Responsive Grid*). Tombol tidak tumpang tindih. | ✅ **Lulus / Sesuai** |
| 4 | **Usability** (Kebergunaan) | Menghapus salah satu data. | Sistem tidak langsung menghapus, melainkan memunculkan *Modal Pop-Up Box* konfirmasi peringatan agar admin tidak salah pencet. | ✅ **Lulus / Sesuai** |
| 5 | **Reliability** (Keandalan) | Server dijalankan ulang (*Restart* / *Stop node* / *Start node*). | Data yang telah ter-input (*Simulasi / Form Manual*) tetap bertahan dan tidak hilang meskipun server dimatikan, dibuktikan berkat *persistent storage* dari SQLite3. | ✅ **Lulus / Sesuai** |
| 6 | **Performance Efficiency** (Kinerja Bawaan) | Memuat halaman "Laporan Statistik" komprehensif. | Halaman laporan (meliputi pengkalkulasian agregat persentase) dan *Doughnut Chart* termuat cepat dalam hitungan sekejab (<1 detik). | ✅ **Lulus / Sesuai** |

---

### *Disusun Oleh:*
**Akhmad Zamri Ardani** - NIM: **202310370311406**
*(Kelas: Rekayasa Kebutuhan A)*
