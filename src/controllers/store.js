const Store = require('../models/store.js');
const { getUserIdByToken } = require('../utils');

const getStoreById = async (req, res) => {
  const { storeId } = req.params;
  const store = await Store.findOne({
    _id: storeId,
  });
  if (!store || store._isDeleted) {
    return res.status(400).json({ message: 'Store does not exist' });
  }

  res.status(200).json(store);
};

const createStore = async (req, res) => {
  try {
    const { name, ...body } = req.body;
    const userId = getUserIdByToken(req);
    const store = await Store.findOne({ owner: userId });
    if (store && store._isDeleted) {
      return res.status(400).json({
        message:
          'There was an issue creating your store, please contact support.',
      });
    }

    if (store) {
      return res.status(400).json({ message: 'Store already exists' });
    }

    const _name = name.toLowerCase();

    const newStore = new Store({
      ...body,
      owner: userId,
      _name,
    });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const body = req.body;
    const store = await Store.findOneAndUpdate(
      {
        _id: storeId,
      },
      body,
      { new: true },
    );

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.status(200).json(store.getData());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findOneAndUpdate(
      {
        _id: storeId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
