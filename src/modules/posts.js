import * as postsAPI from '../api/posts';
import { reducerUtils, createPromiseThunk } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';  
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

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
        posts: reducerUtils.succses(action.payload),
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload),
      }
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.succses(action.payload),
      }
    case GET_POST_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload),
      }  
    default:
      return state
  }
}
