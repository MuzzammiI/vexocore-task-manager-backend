import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validateSignup, validateLogin } from "../utils/validate.js";

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const signup = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    // Use Promise.all to check for both existing email and username concurrently
    const [existingUser, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken, please choose another one." });
    }

    const user = new User({ username, email, password });
    await user.save(); // Password hashing is handled by a pre-save hook in your User model

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    
    // Explicitly select the password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    next(error);
  }
};