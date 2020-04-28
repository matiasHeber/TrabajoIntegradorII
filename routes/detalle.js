var express = require('express');
var router = express.Router();

const detalleController = require('../controllers/detalleController')

/* GET home page. */
router.get('/:idDePelicula?', detalleController.findByPk);

module.exports = router;
