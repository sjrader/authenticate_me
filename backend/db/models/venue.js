'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
      },
    image: {
      type: DataTypes.STRING(255)
      },
    website: {
      type: DataTypes.STRING(255)
      },
    userId: {
      type: DataTypes.INTEGER
      },
    location: {
      type: DataTypes.STRING(60),
      allowNull: false
      },
    description: {
      type: DataTypes.TEXT
      },
    nfl: {
      type: DataTypes.BOOLEAN,
        allowNull: false
      },
    mlb: {
      type: DataTypes.BOOLEAN,
        allowNull: false
      },
    nba: {
      type: DataTypes.BOOLEAN,
        allowNull: false
      },
    nhl: {
      type: DataTypes.BOOLEAN,
        allowNull: false
      },
    ncaa: {
      type: DataTypes.BOOLEAN,
        allowNull: false
      }
  }, {});
  Venue.associate = function(models) {
    Venue.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Venue;
};