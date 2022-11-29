module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // Mysql에서는 users테이블 생성
    // id가 기본적으로 들어있다
    email: {
      type: DataTypes.STRING(100), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME,
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    // db.User.hasOne(db.UserInfo); 1대1관계
    // userInfo.js에서는 db.UserInfo.belongsTo(db.User); belongsTo가 UserId같은 컬럼이 생김.
  };
  return User
}