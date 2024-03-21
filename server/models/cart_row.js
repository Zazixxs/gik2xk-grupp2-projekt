module.exports = (sequelize, DataTypes) => {
    return sequelize.define("cart_row", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "cart",
                key: "id"
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, { underscored: true });
    
};
