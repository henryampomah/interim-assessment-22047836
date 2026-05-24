const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ name: 1 });
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } })
      .sort({ change24h: -1 })
      .limit(10);
    res.json(gainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(newListings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    if (!name || !symbol || price === undefined || price === null || !image || change24h === undefined || change24h === null) {
      return res.status(400).json({ message: 'Name, symbol, price, image, and change24h are required' });
    }
    const crypto = await Crypto.create({ name, symbol, price, image, change24h });
    res.status(201).json({ success: true, data: crypto });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};