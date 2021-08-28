require ('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {timestamp: false},
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

const m_users = sequelize.define('m_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_user: {type: Sequelize.INTEGER},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    name: {type: Sequelize.STRING},
    token: {type: Sequelize.TEXT},
    is_login: {type: Sequelize.BOOLEAN},
    is_active: {type: Sequelize.BOOLEAN},
    create_user: {type: Sequelize.STRING},
    create_date: {type: Sequelize.DATE},
    update_user: {type: Sequelize.STRING},
    update_date: {type: Sequelize.DATE}
});

const log_inOuts = sequelize.define('log_inOuts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_user: {type: Sequelize.INTEGER},
    status: {type: Sequelize.STRING},
    create_date: {type: Sequelize.DATE}
});

module.exports = {
    m_users, log_inOuts
}