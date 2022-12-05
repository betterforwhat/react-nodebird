import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_SUCCESS,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
} from '../reducers/user';
import axios from 'axios';

function loadUserAPI(data) {
  console.log('data ', data);
  return axios.get(`/user/${data}`);
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function loadFollowersAPI(data) {
  return axios.delete(`/user/${data}/followers`);
}

function loadFollowingsAPI(data) {
  return axios.delete(`/user/${data}/followings`);
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })

  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    })
  }
}


function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    })

  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    })
  }
}


function* logIn(action) {
  try {
    console.log('saga request');
    const result = yield call(loginAPI, action.data);
    console.log('result ', result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('err ', err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log('result ', result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    console.log('changeNickname ', result)
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    })
  }
}

function* loadFollowers() {
  try {
    const result = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    })
  }
}

function* loadFollowings() {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    })
  }
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);

  // takeEvery
  // while(true) {
  //    yield take('LOG_IN_REQUEST', login);
  // }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUP() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUP),
    fork(watchFollow),
    fork(watchUnfollow),
  ])
}