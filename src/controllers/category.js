const Category = require('../models/category');

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category || category._isDeleted) {
    return res.status(400).json({ message: 'Category does not exist' });
  }

  res.status(200).json(category);
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findOne({ name: name });
    if (category && category._isDeleted) {
      return res.status(400).json({
        message:
          'There was an issue creating your category, please contact support.',
      });
    }

    if (category) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({
      description,
      name,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const body = req.body;
    const category = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      body,
      { new: true },
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getCategories = async (req, res) => {
  try {
    const {limit = 20, sort = "DESC"} = req.query
    const sorting = sort === "DESC" ? -1 : 1
    const categories = await Category.find().sort({ createdAt: sorting}).limit(limit);
    res.status(200).json(categories)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
module.exports = {
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
};
