const Sequelize = require('sequelize');
const UsersModel = require('./models/users');
const PromotionsModel = require('./models/promotions');
const ProgramsModel = require('./models/programs');
const RssFeedsModel = require('./models/rssFeeds');

const sequelize = new Sequelize('zenika_academy', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Users = UsersModel(sequelize, Sequelize);
const Promotions = PromotionsModel(sequelize, Sequelize);
const Programs = ProgramsModel(sequelize, Sequelize);
const RssFeeds = RssFeedsModel(sequelize, Sequelize);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  Users,
  Promotions,
  Programs,
  RssFeeds,
};
