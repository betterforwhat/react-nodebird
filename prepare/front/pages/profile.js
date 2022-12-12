import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';
import axios from 'axios';
import useSWR from 'swr';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';


const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const { data: followersData, error: followersError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingsError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //   });
  // }, []);

  const loadMoreFollowers = useCallback(
    () => {
      setFollowersLimit(prev => prev + 3); 
    },
    [],
  );

  const loadMoreFollowings = useCallback(
    () => {
      setFollowingsLimit(prev => prev + 3); 
    },
    [],
  );

  if (!me) {
    return <div>내 정보 로딩중</div>;
  }

  if (followersError || followingsError) {
    console.error(followersError || followingsError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>
  }

  return (
    <>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsError && !followingsData} />
        <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersError && !followersData} />
      </AppLayout>
    </>
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

  // context.store.dispatch({
  //   type: LOAD_FOLLOWERS_REQUEST,
  // });
  // context.store.dispatch({
  //   type: LOAD_FOLLOWINGS_REQUEST,
  // });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;