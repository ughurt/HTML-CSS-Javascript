const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key'; 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Dummy database for users
const users = [
  { email: 'test@example.com', password: bcrypt.hashSync('password123', 8), name: 'John Doe' }
];

// Routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({ message: 'Login successful', token });
});

app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Welcome to your profile', user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
