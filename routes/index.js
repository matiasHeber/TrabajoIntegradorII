var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

router.get('/buscador', indexController.search)

router.get('/favoritos', indexController.favoritos)

router.get('/terms', indexController.terms)

module.exports = router;
