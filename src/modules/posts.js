import * as postsAPI from '../api/posts';
import { reducerUtils, createPromiseThunk, handleAsyncActions } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';  
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 기존 데이터 잠깐 보이는것 해결하기 위한 액션
const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST, meta: id });
  try {
    const payload = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, payload, meta: id });
  } catch (e) {
    dispatch({ type: GET_POST_ERROR, payload: e, error: true, meta: id });
  }
}

export const clearPost = () => ({ type: CLEAR_POST});

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
}

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = (state, action) => {
  const id = action.meta; // post 안의 키 id를 가지고 상태를 바꾸기 위함
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.loading(state.post[id] && state.post[id].data), // && -> 처음 데이터가 없을때 방어코딩
        }
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.success(action.payload),
        }
      }
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.error(action.payload),
        }
      }
    default:
      return state
  }
};

// post & posts 리듀서
export default function posts(state=initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      }
    default:
      return state
  }
}
