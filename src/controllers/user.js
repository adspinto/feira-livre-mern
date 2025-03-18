import {User} from '../models/user.js';
import validator from 'validator';
export const getUserById = async (req, res) => {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    res.status(200).json(user)
    
}

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, password, email } = req.body;
         // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const _firstName = firstName.toLowerCase()
        const _lastName = lastName.toLowerCase()
        const newUser = new User({ email, firstName, lastName,_firstName,_lastName, password });  // Create new user instance
        await newUser.save();  // Save the user to the database
        const userObject = newUser.toObject();
        delete userObject.password;
        res.status(201).json(userObject);  // Send the new user back in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
