import React from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPost, clearPost } from '../modules/posts';

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(state => state.posts.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    return () => { // useEffect의 return은 로직 해제 부분
      dispatch(clearPost());
    }
  }, [postId, dispatch]);
  
  if(loading) return <div>loading</div>;
  if(error) return <div>error</div>;
  if(!data) return null;

  return (
    <Post post={data} />
  );
};

export default PostContainer;