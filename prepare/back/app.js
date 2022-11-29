const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

const cors = require('cors');
const app = express();
db.sequelize.sync().then(() => {
  console.log('db 연결 성공');
}).catch((err) => console.error(err));
passportConfig();

app.use(cors({
  origin: 'http://localhost:3060',
  credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});

// const http = require('http');
// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.end('Hello node');
// });

// server.listen(3065, () => {
//   console.log('서버 실행 중');
// });