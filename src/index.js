const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/index.js');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');

const app = express();

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('HELLO FROM 2222');
});

app.listen(config.port, () =>
  console.log(`Server running on port: http://localhost:${config.port}`),
);
