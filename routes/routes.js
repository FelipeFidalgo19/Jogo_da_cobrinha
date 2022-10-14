const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./../public/index.html');
});
router.get('/control', (req, res) => {
    res.render('./../public/controle/index.html');
});

module.exports = router;