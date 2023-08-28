module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }, {
        tableName: 'category',
        timestamps: false,
        underscored: true
    })

    return Category;
};