
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { addCommentDone, addCommentLoading } = useSelector(state => state.post);
  const [commentText, setCommentText] = useInput('');
  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { postId: post.id, content: commentText, userId: me?.id },
    })
  }, [post.id, commentText, me?.id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }} >
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 10 }} type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object,
}

export default CommentForm;