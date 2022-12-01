import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, setNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    console.log('nickname ', nickname);
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  console.log('me ', me);
  console.log('nickname vvvv ', nickname);

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;