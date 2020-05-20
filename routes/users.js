var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
// router.get('/',usersController.search);
router.get('/list',usersController.getAll);

router.get('/reviews', usersController.logUser);

router.post('/reviews', usersController.confirmUser);

router.get('/reviews/:id', usersController.getReviews);

router.get('/reviews/edit/:id', usersController.showEdit);

router.get('/buscar', usersController.buscar);

router.post('/register', usersController.register);


module.exports = router;
