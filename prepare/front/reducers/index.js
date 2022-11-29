import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// 액션
// const changeNickname = {
//   type: 'CHANGE_NICKNAME',
//   data: 'boogicho',
// };

// action creator 모든 액션을 다만들수 없기때문에 액션생성함수가 필요
// const changeNickname = (data) => {
//   return {
//     type: 'CHANGE_NICKNAME',
//     data,
//   }
// }

// changeNickname('boogicho');
// {
//    type: 'CHANGE_NICKNAME',
//    data: 'boogicho',
// }

// async action creator


// (이전상태, 액션) => 다음상태, 축소(reducer)!!!
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
