const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Education = sequelize.define('education',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        institute: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grade: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
    tableName: 'education',
});

module.exports = Education;
