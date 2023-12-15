
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Pass@256@localhost:5432/CurdDB', {
    logging: false, // Set to true to log SQL queries
    
});

module.exports = sequelize;
