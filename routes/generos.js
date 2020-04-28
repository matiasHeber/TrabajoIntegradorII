var express = require('express');
var router = express.Router();

const generosController = require('../controllers/generosController')

/* GET home page. */
router.get('/', generosController.all);

module.exports = router;
