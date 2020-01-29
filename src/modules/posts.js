import * as postsAPI from '../api/posts';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';  
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => async dispatch => {
  // 요청 시작
  dispatch({ type: GET_POSTS});
  try {
    // API 호출
    const posts = await postsAPI.getPosts();
    // 성공했을 때
    dispatch({ type: GET_POSTS_SUCCESS, posts});
  } catch (e) {
    // 실패했을 때
    dispatch({ type: GET_POSTS_ERROR, error: e});
  }
}

export const getPost = (id) => async dispatch => {
  // 요청 시작
  dispatch({ type: GET_POST});
  try {
    // API 호출
    const post = await postsAPI.getPostById(id);
    // 성공했을 때
    dispatch({ type: GET_POST_SUCCESS, post});
  } catch (e) {
    // 실패했을 때
    dispatch({ type: GET_POST_ERROR, error: e});
  }
}