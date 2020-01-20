const express = require('express');

const router = express.Router();
const UsersController = require('../controllers/users/UsersController');

router.post('/',
  UsersController.userCreate);

router.post('/signin',
  UsersController.userSignIn);

router.get('/:user_id',
  UsersController.getUserById);

router.get('/:user_id/games',
  UsersController.getUserGamesById);

module.exports = router;
