const { DataTypes } = require("sequelize")
const sequelize = require("../config/conn.js")
const User = require("./User.js")
const Team = require("./team.js")
const Event = require("./Event.js");

const Participation = sequelize.define(
  "Participation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Team,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
    },
    points: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Participation",
  }
);

module.exports = Participation;
