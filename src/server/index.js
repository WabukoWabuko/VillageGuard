const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { User, Case, Suspect } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'villageguard-secret';

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !require('bcryptjs').compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Case endpoints
app.get('/api/cases', authenticate, async (req, res) => {
  const cases = await Case.findAll({ include: [{ model: User, as: 'createdBy' }] });
  res.json(cases);
});

app.post('/api/cases', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  const newCase = await Case.create({ ...req.body, createdById: req.user.id });
  res.json(newCase);
});

// Suspect endpoints
app.get('/api/suspects', authenticate, async (req, res) => {
  const suspects = await Suspect.findAll({ include: [{ model: User, as: 'createdBy' }] });
  res.json(suspects);
});

app.post('/api/suspects', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  const suspect = await Suspect.create({ ...req.body, createdById: req.user.id });
  res.json(suspect);
});

app.listen(3000, () => console.log('Server running on port 3000'));