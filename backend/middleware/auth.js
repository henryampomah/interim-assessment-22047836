const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // HTTP-only cookie

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;