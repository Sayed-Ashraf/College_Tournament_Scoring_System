const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('freedb_college_tournament_scoring_system', 'freedb_Sayed_Ashraf', 'zDp#e?3dMyxP7aC', {
    host: 'sql.freedb.tech',
    dialect: 'mysql'
});


module.exports = sequelize; 