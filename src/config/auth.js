const bcrypt = require('bcryptjs');

// Akun default admin (username & password bisa diganti di sini)
// Untuk generate hash baru: node -e "console.log(require('bcryptjs').hashSync('PASSWORD_BARU', 10))"
const USERS = [
  {
    id: 1,
    username: 'admin',
    // Password: Dp3!406
    passwordHash: '$2b$10$3FDTDt8YAkqPHOuoKLcNf.aBhHQUtyPa2XH.uIDZGy5LM3G/BN.Eq',
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
