
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Games', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    board: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    playerBlack: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    playerWhite: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    passWhite: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    passBlack: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    winner: {
      type: Sequelize.STRING,
    },
    partyCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Games'),
};
