import User from '../models/User.js';
import createToken, { maxAge } from '../utils/createToken.js';
import handleErrors from '../utils/handleErrors.js';
// import jwt from 'jsonwebtoken';

export const signup_get = (_, res) => res.render('signup');

export const signup_post = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = createToken(user._id);
    res.cookie('jwtauth', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_get = (_, res) => res.render('login');

export const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwtauth', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = (req, res) => {
  res.cookie('jwtauth', '', { maxAge: 1 });
  res.redirect('/');
};
