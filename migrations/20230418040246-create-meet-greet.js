'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meet_greets', {
      meet_greet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      band_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      meet_start_time: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      meet_end_time: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      // meet_greed_id: {
      //   type: Sequelize.INTEGER
      // },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meet_greets');
  }
};