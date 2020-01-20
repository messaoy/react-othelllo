const bcrypt = require('bcryptjs');
const { Users, Games } = require('../../models');

const saltRounds = 10;

module.exports = {

  getUserById: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: parseInt(req.params.user_id, 10) } });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  userCreate: async (req, res) => {
    const user = req.body;
    user.password = 'test';
    const foundUser = await Users.findOne({ where: { email: user.email } });
    if (foundUser) { res.status(409).json({ message: 'User already exists' }); }
    try {
      user.password = await bcrypt.hash(user.password, saltRounds);
      const userCreated = await Users.create(user);
      return res.status(201).send(userCreated);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getUserGamesById: async (req, res) => {
    try {
      const userGames = await Games.findAll({ where: { id: parseInt(req.params.user_id, 10) } });
      return res.status(200).send(userGames);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  userSignIn: async (req, res) => {
    const user = req.body;
    const foundUser = await Users.findOne({ where: { email: user.email } });
    if (!foundUser) res.status(401).json({ error: 'User not found' });
    try {
      const allowedUser = await bcrypt.compare(user.password, foundUser.password);
      if (!allowedUser) throw new Error('wrong credentials');
      return res
        .status(200)
        .json({
          email: foundUser.email,
          name: foundUser.name,
          userId: foundUser.id,
        });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  },
};
