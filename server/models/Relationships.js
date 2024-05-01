const User = require("./User.js");
const Team = require("./team.js");
const Event = require("./Event.js");
const Participation =  require("./Participation.js");
const Questions = require("./Questions.js");

// User-Team (one-to-many)
User.belongsTo(Team, { foreignKey: "currentTeamId" });
Team.hasMany(User, { foreignKey: "currentTeamId" });

// User-Participation (one-to-many)
User.hasMany(Participation, { foreignKey: "userId" });
Participation.belongsTo(User, { foreignKey: "userId" });

// Event-Participation (one-to-many)
Event.hasMany(Participation, { foreignKey: "eventId" });
Participation.belongsTo(Event, { foreignKey: "eventId" });

// Event-Questions (one-to-many)
Event.hasMany(Questions, { foreignKey: "eventId" });
Questions.belongsTo(Event, { foreignKey: "eventId" });

module.exports = { User, Team, Event, Participation };
