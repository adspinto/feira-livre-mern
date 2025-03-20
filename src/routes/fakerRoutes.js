const express = require('express');
const Store = require('../models/store');
const Product = require('../models/product');
const Review = require('../models/reviews');
const User = require('../models/user');
const Category = require('../models/category');
const { faker } = require('@faker-js/faker');
const router = express.Router();
router.post('/category', (req, res) => {
  // Function to generate fake categories
  const generateFakeCategories = async (numCategories) => {
    const fakeCategories = [];
    for (let i = 0; i < numCategories; i++) {
      const category = new Category({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        _isDeleted: false,
      });

      // Save the category and add it to the array
      const savedCategory = await category.save();
      fakeCategories.push(savedCategory);
    }

    console.log(`Generated ${numCategories} fake categories.`);
    return fakeCategories;
  };

  // Call function to generate 10 fake categories
  generateFakeCategories(10).catch((error) =>
    console.error('Error generating fake categories:', error),
  );
});
router.post('/user', (req, res) => {
  // Function to generate fake users
  const generateFakeUsers = async (numUsers) => {
    const fakeUsers = [];
    for (let i = 0; i < numUsers; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const user = new User({
        firstName: firstName,
        _firstName: firstName.toLowerCase(),
        lastName: lastName,
        _lastName: lastName.toLowerCase(),
        email: faker.internet.email(firstName, lastName),
        description: faker.lorem.sentence(),
        reviews: [], // This can be populated later if needed
        stores: [], // Link with Store objects if necessary
        password: faker.internet.password(),
        _isDeleted: faker.datatype.boolean(),
      });

      // Save the user and add to the array
      const savedUser = await user.save();
      fakeUsers.push(savedUser);
    }

    console.log(`Generated ${numUsers} fake users.`);
    return fakeUsers;
  };

  // Call function to generate 10 fake users
  generateFakeUsers(10)
    .then(() => res.json('created'))
    .catch((error) => console.error('Error generating fake users:', error));
});
router.post('/store', (req, res) => {
  const generateFakeStores = async (numStores) => {
    const fakeStores = [];
    for (let i = 0; i < numStores; i++) {
      // Get a random user from the User collection to be the store owner
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]); // Randomly sample 1 user from User collection

      // Generate store data using faker
      const store = new Store({
        name: faker.company.name(),
        _name: faker.company.name(),
        description: faker.lorem.sentence(),
        owner: randomUser.length > 0 ? randomUser[0]._id : null, // Assign a random user as the owner
        storeNumber: faker.number.int({ min: 1000, max: 9999 }),
        _isDeleted: false,
      });

      // Save the store and add it to the array
      const savedStore = await store.save();
      fakeStores.push(savedStore);
    }

    console.log(`Generated ${numStores} fake stores.`);
    return fakeStores;
  };

  // Call function to generate 10 fake stores
  generateFakeStores(10)
    .then(() => res.json('created'))
    .catch((error) => console.error('Error generating fake stores:', error));
});
router.post('/product', (req, res) => {
  // Function to generate fake products and assign random store
  const generateFakeProducts = async (numProducts) => {
    const fakeProducts = [];
    for (let i = 0; i < numProducts; i++) {
      // Get a random store from the Store collection
      const randomStore = await Store.aggregate([{ $sample: { size: 1 } }]); // Randomly sample 1 store from the Store collection

      // Get a random user to assign as the product creator
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]); // Randomly sample 1 user

      // Generate product data using faker
      const product = new Product({
        store: randomStore.length > 0 ? randomStore[0]._id : null, // Assign a random store
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        categories: [], // Link with Category objects if necessary
        createdBy: randomUser.length > 0 ? randomUser[0]._id : null, // Assign a random user as the creator
        _isDeleted: false,
      });

      // Save the product and add it to the array
      const savedProduct = await product.save();
      fakeProducts.push(savedProduct);
    }

    console.log(`Generated ${numProducts} fake products.`);
    return fakeProducts;
  };

  // Call function to generate 10 fake products
  generateFakeProducts(10)
    .then(() => res.json('created'))
    .catch((error) => console.error('Error generating fake products:', error));
});
router.post('/review', (req, res) => {
  // Function to generate fake reviews and assign random user and product
  const generateFakeReviews = async (numReviews) => {
    const fakeReviews = [];
    for (let i = 0; i < numReviews; i++) {
      // Get a random product from the Product collection
      const randomProduct = await Product.aggregate([{ $sample: { size: 1 } }]); // Randomly sample 1 product from the Product collection

      // Get a random user from the User collection
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]); // Randomly sample 1 user from the User collection

      // Generate review data using faker
      const review = new Review({
        review: faker.lorem.sentence(), // Generate a random review text
        product: randomProduct.length > 0 ? randomProduct[0]._id : null, // Assign a random product
        user: randomUser.length > 0 ? randomUser[0]._id : null, // Assign a random user
        rate: faker.number.int({ min: 1, max: 5 }), // Rating from 1 to 5
        _isDeleted: false,
      });

      // Save the review and add it to the array
      const savedReview = await review.save();
      fakeReviews.push(savedReview);
    }

    console.log(`Generated ${numReviews} fake reviews.`);
    return fakeReviews;
  };

  // Call function to generate 10 fake reviews
  generateFakeReviews(10)
    .then(() => res.json('created'))
    .catch((error) => console.error('Error generating fake reviews:', error));
});
router.post('/updateProduct', (req, res) => {
  // Function to update all products with random categories
  const updateProductsWithRandomCategories = async () => {
    // Get all categories
    const categories = await Category.find(); // Fetch all categories from the Category collection
    if (categories.length === 0) {
      console.log('No categories found. Exiting...');
      return;
    }

    // Get all products
    const products = await Product.find(); // Fetch all products from the Product collection
    if (products.length === 0) {
      console.log('No products found. Exiting...');
      return;
    }

    // Loop through each product and assign random categories
    for (let product of products) {
      // Randomly pick between 1 and 3 categories for each product
      const randomCategories = faker.helpers
        .shuffle(categories)
        .slice(0, faker.number.int({ min: 1, max: 3 }));

      // Extract category IDs
      const categoryIds = randomCategories.map((category) => category._id);

      // Update the product with the random categories
      product.categories = categoryIds;

      // Save the updated product
      await product.save();
      console.log(
        `Updated product ${product._id} with categories ${categoryIds}`,
      );
    }

    console.log(`Updated all products with random categories.`);
  };

  // Call the function to update all products
  updateProductsWithRandomCategories()
  .then(() => res.json('updated'))
    .catch((error) => console.error('Error updating products:', error));
});

module.exports = router;
