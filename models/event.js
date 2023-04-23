"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, MeetGreet, SetTime, StageEvents }) {
      Event.belongsToMany(Stage, {
				through: StageEvents,
				foreignKey: 'event_id',
				as: 'stages'
			})
        // meet and greets 
        Event.hasMany(MeetGreet, {
          foreignKey: 'event_id',
          as: 'Meet_greets'
        })
  
        // set times 
        Event.hasMany(SetTime, {
          foreignKey: 'event_id',
          as: 'Set_times'
        })
      // define association here
    }
  }
  Event.init(
    {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false

      },
      date: {
        type: DataTypes.DATE,
        allowNull: false

      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false

      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false

      },
    },
    {
      sequelize,
			modelName: 'Event',
			timestamps: false,
    }
  );
  return Event;
};
