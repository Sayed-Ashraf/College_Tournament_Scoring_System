const { DataTypes } = require("sequelize")
const sequelize = require("../config/conn.js")

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType: {
      type: DataTypes.ENUM("Individual", "Team"),
      allowNull: false,
    },
    eventCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "Event",
  }
);

module.exports = Event;
