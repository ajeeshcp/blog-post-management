module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('Comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    parent_comment_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'comments',
    timestamps: false 
  });
  return Comments;
}
  