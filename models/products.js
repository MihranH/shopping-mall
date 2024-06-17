module.exports = function(sequelize, DataTypes) {
    const { Category } = sequelize.models;
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        categoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            },
            field: 'categoryId'
        },
        title: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'title'
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'description'
        },
        sku: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'sku'
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'price'
        },
      }, {
        tableName: 'products'
      });
    Product.belongsTo(Category, { as: 'category' });

    return Product;
};