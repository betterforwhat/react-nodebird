import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from '../components/PostImages';
import CommentForm from '../components/CommentForm';
import PostCardContent from '../components/PostCardContent';
import FollowButton from '../components/FollowButton';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST  } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = me?.id;

  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    })
  }, [post.id]);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, []);

  const onUnLike = useCallback(() => {
    console.log('onUnLike');
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  });

  const liked = post?.Likers?.find((v) => v.id === id);

  console.log('liked ', liked);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post?.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover key="more" content={(
            <Button.Group>
              {
                id && post.User.id === id
                  ? <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                  : <Button>신고</Button>
              }
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {
        commentFormOpened && <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments?.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      }
    </div >
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard;