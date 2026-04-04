const bcrypt = require('bcryptjs');

// Akun default admin (username & password bisa diganti di sini)
// Untuk generate hash baru: node -e "console.log(require('bcryptjs').hashSync('PASSWORD_BARU', 10))"
const USERS = [
  {
    id: 1,
    username: 'admin',
    // Password: Dp3!406
    passwordHash: '$2b$10$UMl5Hp1KQ5G1NjfJCy.9euY2F6cs/Hkq2VJJ3Zqiokvm.ryiqmPd6',
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
