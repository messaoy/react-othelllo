const express = require('express');

const router = express.Router();
const GamesController = require('../controllers/games/GamesController');

router.get('/',
  GamesController.getAllGames);

router.get('/:game_id',
  GamesController.getGameById);

module.exports = router;
