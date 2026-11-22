const jwt = require('jsonwebtoken');
const User = require('../models/User');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const DEFAULT_JWT_EXPIRES_IN = '1d';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  const isInvalidOrPlaceholder =
    !secret ||
    typeof secret !== 'string' ||
    secret.trim() === '' ||
    secret.trim() === 'replace_with_a_long_random_secret';

  if (isInvalidOrPlaceholder) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing or placeholder JWT_SECRET in production configuration');
    }
    throw new Error('JWT_SECRET environment variable must be configured before signing tokens');
  }

  return secret.trim();
}

function signAuthToken(user) {
  const secret = getJwtSecret();
  const expiresIn =
    process.env.JWT_EXPIRES_IN && process.env.JWT_EXPIRES_IN.trim() !== ''
      ? process.env.JWT_EXPIRES_IN.trim()
      : DEFAULT_JWT_EXPIRES_IN;

  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    secret,
    { expiresIn }
  );
}

function formatSafeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

async function register(req, res, next) {
  try {
    const rawName = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const rawEmail = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!rawName || !rawEmail || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required',
      });
    }

    if (rawName.length < 2 || rawName.length > 100) {
      return res.status(400).json({
        message: 'Name must be between 2 and 100 characters',
      });
    }

    if (!EMAIL_REGEX.test(rawEmail)) {
      return res.status(400).json({
        message: 'Please provide a valid email address',
      });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      });
    }

    const existingUser = await User.findOne({ email: rawEmail });
    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      });
    }

    const user = await User.create({
      name: rawName,
      email: rawEmail,
      password,
    });

    const token = signAuthToken(user);

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: formatSafeUser(user),
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      });
    }
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
      });
    }
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = signAuthToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: formatSafeUser(user),
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  register,
  login,
};