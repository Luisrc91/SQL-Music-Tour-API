'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meet_greet.init({
    // event_id: {
    //   type: DataTypes.INTEGER,
    // },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    meet_start_time: {
      type:DataTypes.DATE,
      allowNull: false

  
    },  meet_end_time: {
      type:DataTypes.DATE,
      allowNull: false

  
  },  meet_greed_id: {
    type:DataTypes.INTEGER,
    allowNull: false


  },  }, {
    sequelize,
    modelName: 'Meet_greet',
    primaryKey: true,
    autoIncrement: true,
  });
  return Meet_greet;
};