const express = require('express');
const router = express.Router();
const { 
  getAllCryptos, 
  getGainers, 
  getNewListings, 
  addCrypto 
} = require('../controllers/cryptoController');

router.get('/', getAllCryptos);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);
router.post('/', addCrypto); // Admin only in production

module.exports = router;