const Category = require('../models/category');
const Coupons = require('../models/coupons');
const Product = require('../models/product');
const Reviews = require('../models/reviews');
const Settings = require('../models/settings');
const Store = require('../models/store');
const User = require('../models/user');
const collections = {
  category: Category,
  coupons: Coupons,
  product: Product,
  reviews: Reviews,
  settings: Settings,
  store: Store,
  user: User,
};
const getCollection = (entity) => {
  return collections[entity];
};

module.exports = getCollection;
