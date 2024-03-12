module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('products',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        titel:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        imageUrl:{
            type : DataTypes.STRING(255)
        }
    }, {underscored : true })
    return Product;
};
