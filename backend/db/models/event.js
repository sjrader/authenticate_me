'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING(25),
      allowNull: false
      },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
      },
    image: {
      type: DataTypes.STRING(255)
      },
    sport: {
      type: DataTypes.STRING(10),
      allowNull: false
      },
    date: {
      type: DataTypes.DATE,
      allowNull: false
      },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
      },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
      },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false}
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' }),
    Event.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Event;
};