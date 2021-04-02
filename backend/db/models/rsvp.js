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
    attendStatus: {
      type: DataTypes.STRING(15)
    },
  }, {});
  RSVP.associate = function(models) {
    RSVP.belongsTo(models.Event, { foreignKey: 'eventId' }),
    RSVP.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return RSVP;
};