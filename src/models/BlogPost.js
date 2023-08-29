module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      published: {
        type: DataTypes.DATE
      },
      updated: {
        type: DataTypes.DATE
      },
    }, {
        tableName: 'blog_posts',
        timestamps: false,
        underscored: true
    })

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }

    return BlogPost;
};