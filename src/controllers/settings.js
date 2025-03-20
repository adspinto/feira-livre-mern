const Settings = require('../models/settings');

const createSettings = async (req, res) => {
  try {
    const body = req.body;
    const newSettings = new Settings(body);
    await newSettings.save();
    res.status(201).json(newSettings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const body = req.body;
    const settings = await Settings.findOneAndUpdate({}, body, { new: true });

    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find()
      .sort({ createdAt: sorting })
      .limit(1);
    res.status(200).json(settings[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createSettings,
  updateSettings,
  getSettings,
};
