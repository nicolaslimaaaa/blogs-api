module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
    }, {
        tableName: 'categories',
        timestamps: false,
        underscored: true
    })

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, { foreignKey: 'categoryId', as: 'blogPost', through: PostCategory, otherKey: 'postId' })
      models.BlogPost.belongsToMany(models.Category, { foreignKey: 'postId', as: 'categories', through: PostCategory, otherKey: 'categoryId' })
    }

    return PostCategory;
};