import * as postsAPI from '../api/posts';
import { reducerUtils } from '../lib/asyncUtils';

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
};

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
};

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
}

// post & posts 리듀서
export default function posts(state=initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(), // 로딩 이전 값 유지하고 싶으면 prevState를 넣는다.
      }                                // prevState는 state.posts.data를 의미한다.
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.succses(action.posts),
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      }
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.succses(action.post),
      }
    case GET_POST_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      }  
    default:
      return state
  }
}
