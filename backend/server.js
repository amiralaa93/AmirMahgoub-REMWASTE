const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your-secret-key-here';
const users = [];
const tasks = [];
let taskId = 1;

// Helper functions
const findUser = (username) => users.find(u => u.username === username);
const findUserTasks = (username) => tasks.filter(t => t.username === username);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    if (findUser(username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required',
        details: {
          missingFields: [
            ...(!username ? ['username'] : []),
            ...(!password ? ['password'] : [])
          ]
        }
      });
    }

    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate non-empty after trim
    if (!trimmedUsername || !trimmedPassword) {
      return res.status(400).json({ 
        error: 'Username and password cannot be empty',
        details: {
          emptyFields: [
            ...(!trimmedUsername ? ['username'] : []),
            ...(!trimmedPassword ? ['password'] : [])
          ]
        }
      });
    }

    const user = findUser(trimmedUsername);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: trimmedUsername }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Task CRUD Routes
app.get('/tasks', authenticateToken, (req, res) => {
  res.json(findUserTasks(req.user.username));
});

app.post('/tasks', authenticateToken, (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  
  const task = { 
    id: taskId++, 
    title, 
    completed: false, 
    username: req.user.username 
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', authenticateToken, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  if (task.username !== req.user.username) {
    return res.status(403).json({ error: 'Not authorized to update this task' });
  }
  
  const { title, completed } = req.body;
  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;
  
  res.json(task);
});

app.delete('/tasks/:id', authenticateToken, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  
  if (tasks[taskIndex].username !== req.user.username) {
    return res.status(403).json({ error: 'Not authorized to delete this task' });
  }
  
  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {  // Allow external connections
  console.log('Server running on http://0.0.0.0:3001');
});