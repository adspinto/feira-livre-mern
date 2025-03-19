const User = require('../models/user.js');
const validator = require('validator');

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select('-password');
  if (!user || user._isDeleted) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (user && user._isDeleted) {
      return res
        .status(400)
        .json({
          message:
            'There was an issue creating your account, please contact support.',
        });
    }

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const _firstName = firstName.toLowerCase();
    const _lastName = lastName.toLowerCase();
    const newUser = new User({
      email,
      firstName,
      lastName,
      _firstName,
      _lastName,
      password,
    }); // Create new user instance
    await newUser.save(); // Save the user to the database
    res.status(201).json(newUser.getData()); // Send the new user back in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const body = req.body;

    if (Object.hasOwn(body._isDeleted)){
      return res.status(400).json({ message: `Can't update an user that doesn't exist` });
    } 

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      body,
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.getData());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { _isDeleted: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
