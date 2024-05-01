const { DataTypes } = require('sequelize')
const sequelize = require('../config/conn');

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    inTeam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    currentTeamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Team",
        key: "id",
      },
    },
  },
  {
    tableName: "User",
  }
);

module.exports =  User;
