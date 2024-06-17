module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
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
      }, {
        tableName: 'categories'
      });

    return Category;

};