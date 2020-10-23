import jwt from 'jsonwebtoken';

export const maxAge = 3 * 24 * 60 * 60; // ? 3 days

export default (id) =>
  jwt.sign({ id }, 'dasasdasdasdasdcdssdfw', {
    expiresIn: maxAge,
  });
