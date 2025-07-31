const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../database.sqlite'),
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'viewer'), allowNull: false },
});

const Case = sequelize.define('Case', {
  type: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('open', 'closed'), defaultValue: 'open' },
  location: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Suspect = sequelize.define('Suspect', {
  name: { type: DataTypes.STRING, allowNull: false },
  alias: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING }, // Path to image
});

Case.belongsTo(User, { as: 'createdBy' });
Suspect.belongsTo(User, { as: 'createdBy' });

sequelize.sync({ force: true }).then(() => {
  User.create({
    username: 'admin',
    password: require('bcryptjs').hashSync('admin123', 10),
    role: 'admin',
  });
});

module.exports = { sequelize, User, Case, Suspect };