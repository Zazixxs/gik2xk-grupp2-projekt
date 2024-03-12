module.exports = (sequelize, DataTypes) => {
    return sequelize.define("ratings",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products", 
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
        ratings:{
            type:DataTypes.DOUBLE,
            allowNull:false
        }
    }, {underscored : true })
};
