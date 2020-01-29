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

```javascript

```

```javascript

```

```javascript

```

```javascript

```
