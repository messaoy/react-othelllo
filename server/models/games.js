module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    board: {
      type: DataTypes.TEXT,
    },
    playerBlack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playerWhite: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    passWhite: {
      type: DataTypes.INTEGER,
    },
    passBlack: {
      type: DataTypes.INTEGER,
    },
    winner: {
      type: DataTypes.STRING,
    },
    partyCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    classMethods: {
    },
  });

  return Games;
};
