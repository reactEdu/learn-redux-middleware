## redux thunk
- npm i redux-thunk
- npm i react-router-dom

### postList 재로딩안하는법
- $방법1. 데이터 불러왔으면 재로딩 안하게 처리

```javascript
const PostListContainer = () => {
  const { data, loading, error }= useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data) return; // 데이터 불러왔으면 재로딩 안함
    dispatch(getPosts());
  }, [dispatch, data]);
```

- $방법2. 기존 데이터 유지하면서 데이터 있으면 로딩중 안보여주기 
  - 데이터 보고 뒤로가기할때 로딩중 안보이게 한다는것

```javascript
//*** modules/posts.js
const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);

//*** asyncUtils.js
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null), 
        } // 3번째 파라미터 keepData로 로딩 이전 값 유지 여부 결정

//*** PostListContainer.js
const PostListContainer = () => {
  const { data, loading, error }= useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // 데이터가 있을때(=뒤로가기로 왔을때) loading 표시 안함
  if(loading && !data) return <div>loading</div>;
```

### 기존 데이터 잠깐 보이는것 해결

```javascript
//*** modules/posts.js
// 기존 데이터 잠깐 보이는것 해결하기 위한 액션
const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const clearPost = () => ({ type: CLEAR_POST});

// post & posts 리듀서
export default function posts(state=initialState, action) {
  switch (action.type) {
    // ...
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      }

//*** PostContainer.js
const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(state => state.posts.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    return () => { // useEffect의 return은 로직 해제 부분
      dispatch(clearPost());
    }
  }, [postId, dispatch]);
```

### 포스트 데이터 상태 구조 바꾸기
- 한번 봤던 포스트는 재로딩 없이 보기 위해서(=캐싱 처리) 데이터 상태 구조를 변경이 필요함
- 데이터를 재사용하기 위해서는 각각의 데이터를 구분할수 있는 값, 즉 키(key)가 존재해야함.
- 아래처럼 각 post가 id를 키를 가지고 있고 하게 변경

```javascript
// 기존 구조
{
  posts: {
    data,
    loading,
    error
  },
  post: {
    data,
    loading,
    error
  }
}

// 변경할 구조
{
  posts: {
    data,
    loading,
    error
  },
  post: {
    '1': { // '1' 부분이 키
      data,
      loading,
      error
    },
    [id]: {
      data,
      loading,
      error
    },
  }
}
```

- Thunk와 Reducer를 수정
  - 유틸함수를 고치기전에 일단 하드코딩으로 변경된 부분 완성
  - getPost: meta값으로 id를 추가
  - getPostReducer: id를 받아 post 내부의 객체에서 로딩, 성공, 에러 처리

```javascript
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
```

- 화면 수정
  - 처음 로드시 에러 막기위해 초기 데이터를 적용
  - data가 있으면 loading중을 표시하지 않음
  - 데이터 있으면 다시 데이터 불러오지 않는 처리를 함

```javascript

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    state => state.posts.post[postId] || reducerUtils.initial() // 처음 로드시 에러 막기위해 초기 데이터를 적용
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(data) return; // 데이터가 있으면 다시 불러오지 않음
    dispatch(getPost(postId));
  }, [postId, dispatch]);
  
  if(loading && !data) return <div>loading</div>; // 데이터가 있으면 loading중을 표시하지 않음
  if(error) return <div>error</div>;
  if(!data) return null;

  return (
    <Post post={data} />
  );
};
```

## createPromiseThunkBlyd, handleAsyncActionsByld 유틸함수 작성

```javascript

```

```javascript

```

```javascript

```
