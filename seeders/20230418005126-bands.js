"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Bands',
      [
        {
          name: "AC DC",
          genre: "classic rock",
          available_start_time: "2020-01-01T01:00:00",
          end_time: "2020-01-01T02:00:00",

        },
        {
          name: "Bruno Mars",
          genre: "pop",
          available_start_time: "2020-01-02T02:00:00",
          end_time: "2020-01-02T04:00:00",
        },
        {
          name: "Blink 182",
          genre: "pop rock",
          available_start_time: "2020-01-03T03:00:00",
          end_time: "2020-01-03T05:00:00",
        },
        {
          name: "Yawming man",
          genre: "desert rock",
          available_start_time: "2020-01-04T04:00:00",
          end_time: "2020-01-04T06:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('Bands', null, {});

  },
};
