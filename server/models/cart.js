module.exports = (sequelize, DataTypes) => {
    return sequelize.define("cart",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", 
                key: "id"  
        },
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        payed:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    }, {underscored : true, freezeTableName: true });
};
