module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          displayName: {
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
        timestamps: false,
        underscored: true
    })

    User.associate = (models) => {
      User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogPost' })
    }

    return User;
};