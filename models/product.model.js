const { DataTypes } = require("sequelize");

const createProductModel = (sequelize) => {
    let prodd = sequelize.define("product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        sku: {
            type: DataTypes.STRING
        },
        manufacturer: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        date_added: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_last_updated: {
            type: DataTypes.DATE,
            allowNull: false
        },
        owner_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        updatedAt: 'date_last_updated',
        createdAt: 'date_added',
    },
    {
        initialAutoIncrement: 1,
    });

    return prodd;
}

module.exports = createProductModel;