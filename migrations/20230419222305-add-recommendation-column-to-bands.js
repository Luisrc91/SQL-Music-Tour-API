'use strict';
import { DataTypes } from '@sequelize/core';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Bands',
       'recommendation',
        {
        type: DataTypes.STRING,
        allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Bands',
       'recommendation'
       )
  }
}                

