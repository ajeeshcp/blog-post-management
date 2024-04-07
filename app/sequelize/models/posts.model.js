module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(512),
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'posts',
    timestamps: false 
  });
  return Post;
}
  