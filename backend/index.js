const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'softtech_db',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a XAMPP:', err.message);
    return;
  }
  console.log('Conectado a MySQL de XAMPP!');
});

app.get('/', (req, res) => {
  res.send('API de SENATI funcionando');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/vacantes', (req, res) => {
  const query = 'SELECT * FROM vacantes ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener vacantes' });
    }
    res.json(results);
  });
});

app.get('/api/vacantes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM vacantes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener la vacante' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Vacante no encontrada' });
    }
    res.json(results[0]);
  });
});

app.post('/api/vacantes', (req, res) => {
  const { titulo, empresa, descripcion, calificacion, dias } = req.body;
  if (!titulo || !empresa) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const query = 'INSERT INTO vacantes (titulo, empresa, descripcion, calificacion, dias) VALUES (?, ?, ?, ?, ?)';
  const values = [titulo, empresa, descripcion, calificacion, dias];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear la vacante' });
    }
    res.status(201).json({ id: result.insertId, message: 'Vacante creada' });
  });
});

app.get('/api/empresas', (req, res) => {
  const query = 'SELECT * FROM empresas ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener empresas' });
    }
    res.json(results);
  });
});

app.post('/api/empresas', (req, res) => {
  const { razon_social, direccion, correo, telefono, fecha_inicio } = req.body;
  if (!razon_social || !direccion) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const query = 'INSERT INTO empresas (razon_social, direccion, correo, telefono, fecha_inicio) VALUES (?, ?, ?, ?, ?)';
  const values = [razon_social, direccion, correo, telefono, fecha_inicio];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar empresa' });
    }
    res.status(201).json({ id: result.insertId, message: 'Empresa registrada' });
  });
});

app.post('/api/usuarios/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const query = 'SELECT id, nombre, email FROM usuarios WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el login' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.json({ success: true, user: results[0] });
  });
});

app.get('/api/kpis', (req, res) => {
  res.json({
    satisfaccion: "85%",
    tiempoRespuesta: "12 min",
    llamadasColgadas: "4%",
    cumplimiento: 87,
    promedio: 19,
    tareasPendientes: 24,
    operacionesCompletadas: 5
  });
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
  console.log(`Vacantes: http://localhost:${port}/api/vacantes`);
  console.log(`Empresas: http://localhost:${port}/api/empresas`);
  console.log(`KPIs: http://localhost:${port}/api/kpis`);
});