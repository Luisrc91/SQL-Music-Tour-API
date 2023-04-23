"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    
    
    static associate({ Event, StageEvents, SetTime }) {
        
      Stage.belongsToMany(Event, {
				through: StageEvents,
				foreignKey: 'stage_id',
				as: 'Events'
			})
			Stage.hasMany(SetTime, {
				foreignKey: 'stage_id',
				as: 'Set_times'
			})
    }
}

  Stage.init(
    {
      stage_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stage_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
         sequelize,
    modelName: 'Stage',
    // tableName: 'stages',
    timestamps: false
    }
  );
  return Stage;
};
