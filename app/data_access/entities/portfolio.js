const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Portfolio = sequelize.define('portfolio', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
}, {
  tableName: 'portfolio',
});


module.exports = Portfolio;