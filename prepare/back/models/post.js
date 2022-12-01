module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser, post.removeUser
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // 관계 설정시 post.addImages, post.Images
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags 
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 관게 설정 시 post.addLikers , post.removeLikers method 생성
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 관계 설정시 단수기 때문에 post.addRetweet 
  };
  return Post
}