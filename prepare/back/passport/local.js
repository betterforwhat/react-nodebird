const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // req.body 
  }, async (email, password, done) => {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      done(null, false, { reason: '존재하지 않는 사용자입니다!' });
      // done 1번째 서버에러, 2번째 성공여부 3번째 클라이언트 에러
    }

  }));
};