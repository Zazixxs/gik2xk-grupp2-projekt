module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [4, 200],
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [4, 200]
            }
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [8, 200]
            }
        },
        firstName: DataTypes.STRING(50),
        lastName: DataTypes.STRING(50)
    }, { underscored: true });
};
