process.loadEnvFile();

const Sequelize = require("sequelize");
const sequelize = new Sequelize('testdb', 'postgres', 'power123', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models/users.model.js")(sequelize, Sequelize);
db.posts = require("./models/posts.model.js")(sequelize, Sequelize);
db.comments = require("./models/comments.model.js")(sequelize, Sequelize);

module.exports = db;
