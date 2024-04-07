module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {  
    tableName: 'users',
    timestamps: false 
  });
  return User;
};
