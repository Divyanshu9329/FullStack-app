require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const adminProjectRoutes = require('./routes/adminProjectRoutes');
const adminClientRoutes = require('./routes/adminClientRoutes');
const adminContactRoutes = require('./routes/adminContactRoutes');
const adminSubscriberRoutes = require('./routes/adminSubscriberRoutes');
const publicContactRoutes = require('./routes/publicContactRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Admin routes
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/clients', adminClientRoutes);
app.use('/api/admin/contacts', adminContactRoutes);
app.use('/api/admin/subscribers', adminSubscriberRoutes);

// Public routes
app.use('/api/projects', require('./routes/publicProjectRoutes'));
app.use('/api/clients', require('./routes/publicClientRoutes'));
app.use('/api/contacts', require('./routes/publicContactRoutes'));
app.use('/api/subscribers', require('./routes/publicSubscriberRoutes'));
app.use('/api/contact', publicContactRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
