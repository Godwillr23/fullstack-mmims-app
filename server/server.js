const express = require('express');
const path = require('path');
const sql = require('mssql');
const cors = require('cors');
const sqlConfig = require('./sqlConfig');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ Middleware FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:4200', 'https://www.mmims-r2m.co.za'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Routes before Angular static fallback
const userRoutes = require('./routes/userRoate');
const prefieldRoutes = require('./routes/prefieldRoate');
const documentRoutes = require('./routes/checklistRoate');

app.use('/api/user', userRoutes);
app.use('/api/prefield', prefieldRoutes);
app.use('/api/checklist', documentRoutes);


// ✅ Angular static files after all APIs/middleware
app.use(express.static(path.join(__dirname, '../client/dist/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

// ✅ DB connect + Server start
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await sql.connect(sqlConfig);
    console.log('✅ SQL Server connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on Port:${PORT}`);
    });

  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1);
  }
};



startServer();
