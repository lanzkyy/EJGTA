require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ejgta'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL Database: ejgta');
  
  // Create Tables if not exist
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('author', 'reviewer', 'editor') DEFAULT 'author',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  const submissionsTable = `
    CREATE TABLE IF NOT EXISTS submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title TEXT NOT NULL,
      category VARCHAR(100),
      article_type VARCHAR(100),
      file_path VARCHAR(255),
      status ENUM('pending', 'under_review', 'accepted', 'rejected') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  db.query(usersTable, (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('Users table ready');
  });

  db.query(submissionsTable, (err) => {
    if (err) console.error('Error creating submissions table:', err);
    else console.log('Submissions table ready');
  });
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }
        return res.status(500).json({ message: 'Gagal mendaftar!' });
      }
      res.status(201).json({ message: 'Pendaftaran berhasil!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi!' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error!' });
    if (results.length === 0) return res.status(401).json({ message: 'Email atau password salah!' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Email atau password salah!' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
      return cb(new Error('Hanya file .doc, .docx, atau .pdf yang diperbolehkan!'));
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Submission Route
app.post('/api/submit', upload.single('file'), (req, res) => {
  const { userId, title, category, articleType } = req.body;
  
  if (!userId || !title || !category || !articleType || !req.file) {
    return res.status(400).json({ message: 'Semua kolom dan file wajib diisi!' });
  }

  const sql = 'INSERT INTO submissions (user_id, title, category, article_type, file_path) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, title, category, articleType, req.file.path], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal mengunggah naskah!' });
    }
    res.status(201).json({ message: 'Naskah berhasil dikirim!' });
  });
});

// Get User Submissions
app.get('/api/submissions/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM submissions WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal mengambil data naskah!' });
    }
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
