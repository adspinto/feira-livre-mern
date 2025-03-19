const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const reviewsRoutes = require('./routes/reviews');
const couponRoutes = require('./routes/coupon');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

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
app.use('/api/store', storeRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/product', productRoutes);
app.use('/api/coupon', couponRoutes);


app.get('/', (req, res) => {
  res.send('HELLO FROM 2222');
});

app.listen(config.port, () =>
  console.log(`Server running on port: http://localhost:${config.port}`),
);
