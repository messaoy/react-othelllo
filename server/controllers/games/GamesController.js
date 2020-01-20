const { Games, Users } = require('../../models');

module.exports = {

  getAllGames: (req, res) => Games.findAll({ where: { status: 1 }, raw: true })
    .then((games) => res.send(games))
    .catch((e) => res.status(400).send(e)),

  getGameById: async (req, res) => {
    try {
      let users;
      const game = await
      Games.findAll({ where: { id: parseInt(req.params.game_id, 10) }, raw: true });
      if (game[0].playerWhite) {
        users = await Promise
          .all([Users.findAll({ where: { id: game[0].playerBlack }, raw: true }),
            Users.findAll({ where: { id: game[0].playerWhite }, raw: true })]);
      } else {
        users = await Users.findAll({ where: { id: game[0].playerBlack }, raw: true });
      }
      return res.status(200).send({ game, users });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};
