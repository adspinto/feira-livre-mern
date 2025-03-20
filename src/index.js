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
const fakerRoutes = require('./routes/fakerRoutes');
const settingsRoutes = require('./routes/settings');
const searchRoutes = require('./routes/search');

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
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/category', categoryRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/product', productRoutes);
app.use('/coupon', couponRoutes);
app.use('/faker', fakerRoutes);
app.use('/settings', settingsRoutes);
app.use('/search', searchRoutes);


app.get('/', (req, res) => {
  res.send('HELLO FROM 2222');
});

app.listen(config.port, () =>
  console.log(`Server running on port: http://localhost:${config.port}`),
);
