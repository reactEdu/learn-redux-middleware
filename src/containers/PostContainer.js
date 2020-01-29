import React from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPost } from '../modules/posts';

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(state => state.posts.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);
  
  if(loading) return <div>loading</div>;
  if(error) return <div>error</div>;
  if(!data) return null;

  return (
    <Post post={data} />
  );
};

export default PostContainer;