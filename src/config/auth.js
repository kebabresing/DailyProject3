const bcrypt = require('bcryptjs');

// Akun default admin (username & password bisa diganti di sini)
// Password di-hash dengan bcryptjs
const USERS = [
  {
    id: 1,
    username: 'admin',
    // Password: admin123 (sudah di-hash)
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    namaLengkap: 'Administrator'
  }
];

function findUser(username) {
  return USERS.find(u => u.username === username) || null;
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { findUser, verifyPassword };
