import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

// fork(비동기) vs call(동기) - generator 실행
// take, takeEvery, takeLatest,    takeLeading
// 1회만,  모든 요청다, 마지막 요청하나만, 처음 요청하나만

// takeLatest 요청은 가지만 응답만 취소

// throttle 제한된 시간에 하나만 가능


export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}