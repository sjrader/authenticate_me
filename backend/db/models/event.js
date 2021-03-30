'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING(25),
      allowNull: false
      },
    description: {
      type: DataTypes.TEXT,
      },
    image: {
      type: DataTypes.STRING(255)
      },
    sport: {
      type: DataTypes.STRING,
      allowNull: false
      },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
      },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
      },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' }),
    Event.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Event;
};