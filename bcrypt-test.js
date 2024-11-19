// bcrypt-test.js
const bcrypt = require('bcrypt');
const password = '7079'; // Test etmek istediğiniz şifre
const hashedPasswordFromDB = '$2b$10$yxqW4Z95aeA1GDnizZn5Ke6jO2fODp4JgBfyyReFjeEVOXz9t0TbG'; // Veritabanından aldığınız hash'lenmiş şifre

// Şifreyi hash'leme
bcrypt.hash(password, 10, function(err, hash) {
  if (err) {
    console.error('Hashing error:', err);
  } else {
    console.log('Hashed password:', hash);

    // Hash'lenmiş şifreyi doğrulama
    bcrypt.compare(password, hashedPasswordFromDB, function(err, result) {
      if (err) {
        console.error('Comparison error:', err);
      } else if (result) {
        console.log('Password is valid!');
      } else {
        console.log('Invalid password!');
      }
    });
  }
});