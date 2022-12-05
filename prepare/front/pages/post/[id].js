import React from 'react';
import { useRouter } from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>{id}번 게시글</div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  })

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;