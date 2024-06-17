const Sequelize  = require('sequelize');
const { ConnectionString } = require('connection-string');
const { DATABASE_URL } = process.env;

let sequelize;

const uri = new ConnectionString(DATABASE_URL || 'mysql://root@localhost:3306/shopping-mall');
  sequelize = new Sequelize(null, null, null, {
    username: uri.user,
    password: uri.password,
    host: uri.hosts[0].name,
    port: uri.hosts[0].port,
    database: uri.path[0],
    dialect:'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: function (field, next) {
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    timezone: '+04:00'
  });

const db = {};

let modules = [
    require('./categories.js'),
    require('./products.js'),
];

  // Initialize models
  modules.forEach((module) => {
    const model = module(sequelize, Sequelize);
    db[model.name] = model;
  });

  // Apply associations
  Object.keys(db).forEach((key) => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
  });
  sequelize.sync();
    
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;