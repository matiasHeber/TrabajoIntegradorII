var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
// router.get('/',usersController.search);
router.get('/list',usersController.getAll);

router.get('/buscar', usersController.buscar)

router.post('/register', usersController.register)


module.exports = router;
