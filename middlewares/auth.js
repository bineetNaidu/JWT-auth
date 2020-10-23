import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwtauth;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'dasasdasdasdasdcdssdfw', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

export default requireAuth;
