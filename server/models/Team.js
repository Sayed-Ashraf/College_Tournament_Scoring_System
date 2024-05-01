const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn");

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Team",
  }
);

module.exports = Team;
