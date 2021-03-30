'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255)
      },
      website: {
        type: Sequelize.STRING(255)
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      location: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT
      },
      nfl: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      mlb: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      nba: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      nhl: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      ncaa: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Venues');
  }
};