'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    attending: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      },
    notAttending:{
      type: DataTypes.BOOLEAN,
      allowNull: false
      },
    maybeAttending: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      }
  }, {});
  RSVP.associate = function(models) {
    RSVP.belongsTo(models.Event, { foreignKey: 'eventId' }),
    RSVP.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return RSVP;
};