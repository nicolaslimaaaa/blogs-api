'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');

  }
};
