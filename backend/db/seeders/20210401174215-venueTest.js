'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Venues', [
        {
        name: 'Mucky duck',
        image: 'https://static.wixstatic.com/media/18a41e_b2ed55d5bd2a47c68c1bdd0a674e95dd~mv2.jpg/v1/fill/w_497,h_396,al_c,q_80,usm_0.66_1.00_0.01/18a41e_b2ed55d5bd2a47c68c1bdd0a674e95dd~mv2.webp',
        website: 'https://www.muckyduckpub.com/',
        location: '1315 9th Ave, San Francisco, CA 94122',
        description: `The World Famous Mucky Duck is the inner Sunsets favorite friendly pub.  With over 10 TVs we always have a game on.  Play some pool or shoot darts while you and the friends watch the games.  With some of the best bartenders around and plenty of locals a good time is always to be had.  Think of us as your local bar- even if you're not from here!`,
        nfl: true,
        mlb: true,
        nba: true,
        nhl: false,
        ncaa: false,
        createdAt: new Date(),
        updatedAt: new Date()

      },
        name: 'Mucky duck',
        image: 'https://static.wixstatic.com/media/18a41e_b2ed55d5bd2a47c68c1bdd0a674e95dd~mv2.jpg/v1/fill/w_497,h_396,al_c,q_80,usm_0.66_1.00_0.01/18a41e_b2ed55d5bd2a47c68c1bdd0a674e95dd~mv2.webp',
        website: 'https://www.muckyduckpub.com/',
        location: '1315 9th Ave, San Francisco, CA 94122',
        description: `The World Famous Mucky Duck is the inner Sunsets favorite friendly pub.  With over 10 TVs we always have a game on.  Play some pool or shoot darts while you and the friends watch the games.  With some of the best bartenders around and plenty of locals a good time is always to be had.  Think of us as your local bar- even if you're not from here!`,
        nfl: true,
        mlb: true,
        nba: true,
        nhl: false,
        ncaa: false,
        createdAt: new Date(),
        updatedAt: new Date()
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
