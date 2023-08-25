module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          display_name: {
            type: DataTypes.STRING
          },
          email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING
          },
          image: {
            type: DataTypes.STRING
          }
    }, {
        tableName: 'users',
        timestamp: false,
        undescored: true
    })

    return User;
};