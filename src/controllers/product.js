const Product = require('../models/product');
const Store = require('../models/store');

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.categoryId(productId);
  if (!product || product._isDeleted) {
    return res.status(400).json({ message: 'Product does not exist' });
  }

  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  try {
    const { name, ...body } = req.body;
    const userId = req.user._id;
    const store = await Store.findOne({ owner: userId });
    if (!store) {
      return res
        .status(400)
        .json({ message: `This user doesn't have a store` });
    }
    const product = await Product.findOne({ _id: store._id });
    if (product && product._isDeleted) {
      return res.status(400).json({
        message:
          'There was an issue creating your product, please contact support.',
      });
    }

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProduct = new Product({
      ...body,
      store: store._id,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const body = req.body;
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      body,
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { limit = 20, sort = 'DESC', storeId, filters } = req.query;
    const sorting = sort === 'DESC' ? -1 : 1;
    let findParam = {
      store: storeId,
      _isDeleted: { $eq: false },
    };
    if (filters) {
      const decodedParam = decodeURIComponent(filters);
      const parsedFilters = JSON.parse(decodedParam); // Parse JSON string into an array

      findParam = {
        ...findParam,
        categories: { $in: parsedFilters.map((item) => item.value) },
      };
    }

    const products = await Product.find(findParam)
      .sort({ createdAt: sorting })
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
