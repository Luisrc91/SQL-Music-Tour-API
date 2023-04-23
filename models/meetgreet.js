"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MeetGreet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event }) {
      // define association here
      MeetGreet.belongsTo(Band, {
        foreignKey: "Band_id",
        as: "band",
      });
      MeetGreet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "Event",
      });
    }
  }
  MeetGreet.init(
    {
      event_id: {
        type: DataTypes.INTEGER,
      },
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meet_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meet_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meet_greed_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "MeetGreet",
      timestamps: false,
    }
  );
  return MeetGreet;
};
