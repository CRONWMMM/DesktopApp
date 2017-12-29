/**
 * Created by CRONWMMM on 2017/12/29.
 */
const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html', {});
});

module.exports = router;