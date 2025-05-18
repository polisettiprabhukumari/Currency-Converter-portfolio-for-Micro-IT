const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { from, to, amount } = req.query;
    try {
        const response = await axios.get(`${process.env.EXCHANGE_API}${from}`);
        const rate = response.data.rates[to];
        const result = amount * rate;
        res.json({ rate, result });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange rate' });
    }
});

module.exports = router;
