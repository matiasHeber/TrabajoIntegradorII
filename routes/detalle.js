var express = require('express');
var router = express.Router();

const detalleController = require('../controllers/detalleController')

/* GET home page. */
router.get('/:error?', detalleController.findByPk);

router.post('/review/:id', detalleController.agregarResena)

module.exports = router;
