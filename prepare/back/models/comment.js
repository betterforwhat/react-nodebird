// // 클래스 최신 문법
// const DataTypes = require('sequelize');
// const { Model } = DataTypes;

// module.exports = class Comment extends Model {
//   static init(sequelize) {
//     return super.init({
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       }
//     }, {
//       modelName: 'Comment',
//       tableName: 'comments',
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci',
//       sequelize,
//     });
//   }

//   static assciate(db) {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//   }
// };


// 기존 문법


module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment
}